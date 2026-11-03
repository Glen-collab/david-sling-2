"""Cut Glen's break sets (one picture, three stages on green: whole, breaking, broken) into game pictures.

python tools/cut_breakables.py
Reads david-sling-2-art/items/<name>_break_source.jpg, writes assets/items/<name>.png, <name>_breaking.png,
<name>_broken.png. All three share one height and one scale, and each is centered on where the thing stands (the
middle of its bottom), so they swap in place: region.js draws them bottom-center.
"""
import os
import numpy as np
from PIL import Image

ART = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "items")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "items")
NAMES = ["grain_sacks", "water_pitcher", "storage_jar", "clay_lamp"]
# where to split between the stages (source px), where flying bits or dust run from one into the next
SPLITS = {"grain_sacks": [840, 1800], "water_pitcher": [800, 1760], "storage_jar": [840, 1680], "clay_lamp": [800, 1800]}


def key(img):   # green screen to alpha, with the green spill taken off the edges
    a = np.asarray(img.convert("RGB")).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    green = g - np.maximum(r, b)
    alpha = np.clip(1 - (green - 25) / 55, 0, 1)
    # the see-through parts (dust, splash, smoke): take the green screen back out of their color
    # (unmixing it gave purple edges; instead, no more green than red or blue, brightened back, and fainter)
    soft = alpha < 0.98
    hi = np.maximum(r, b)
    lift = np.where(soft, np.clip(g / np.maximum(hi, 1), 1, 1.6), 1)   # what the green was carrying, given back to red and blue
    r = np.clip(r * lift, 0, 255); b = np.clip(b * lift, 0, 255)
    g2 = np.where(soft, np.minimum(g, np.maximum(r, b) * 0.92), np.minimum(g, hi + 8))
    alpha = np.where(soft, alpha ** 1.4, alpha)
    out = np.dstack([r, g2, b, alpha * 255]).astype(np.uint8)
    return out


def segments(al):   # the three stages: runs of columns with something in them, split at the widest gaps
    cols = (al > 60).sum(axis=0) > 2
    runs, x = [], 0
    while x < len(cols):
        if cols[x]:
            s = x
            while x < len(cols) and cols[x]: x += 1
            runs.append([s, x])
        else: x += 1
    while len(runs) > 3:   # merge across the smallest gap
        gaps = [runs[i + 1][0] - runs[i][1] for i in range(len(runs) - 1)]
        i = int(np.argmin(gaps)); runs[i][1] = runs[i + 1][1]; del runs[i + 1]
    return runs


def base_x(al, x0, x1):   # where it stands: the middle of what touches the bottom
    sub = al[:, x0:x1] > 120
    rows = np.where(sub.any(axis=1))[0]
    bot = rows.max(); band = sub[max(0, bot - 40):bot + 1]
    xs = np.where(band.any(axis=0))[0]
    return x0 + (xs.min() + xs.max()) / 2


for n in NAMES:
    a = key(Image.open(os.path.join(ART, n + "_break_source.jpg")))
    al = a[..., 3]
    segs = segments(al)
    if n in SPLITS:
        cuts = [0] + SPLITS[n] + [al.shape[1]]; segs = []
        for x0, x1 in zip(cuts, cuts[1:]):
            xs = np.where(((al[:, x0:x1] > 60).sum(axis=0)) > 2)[0]; segs.append([x0 + xs.min(), x0 + xs.max() + 1])
    assert len(segs) == 3, (n, segs)
    rows = np.where((al > 60).sum(axis=1) > 2)[0]
    top, bot = rows.min(), rows.max() + 1
    half = 0
    bx = [base_x(al, s, e) for s, e in segs]
    for (s, e), b in zip(segs, bx): half = max(half, b - s, e - b)
    half = int(half) + 4
    for (s, e), b, suf in zip(segs, bx, ["", "_breaking", "_broken"]):
        c = np.zeros((bot - top, 2 * half, 4), np.uint8)
        src = a[top:bot, s:e].copy()
        src[al[top:bot, s:e] < 8] = 0
        ox = int(round(half - (b - s)))
        c[:, ox:ox + (e - s)] = src
        Image.fromarray(c).save(os.path.join(OUT, n + suf + ".png"))
    print(n, segs, "->", 2 * half, "x", bot - top)
