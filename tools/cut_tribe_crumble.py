"""(Glen 11-11) the Hall of the Tribes' tablets breaking: his Meta sheets (david-sling-2-art/w3/tribes_crumble/<tribe>.png),
three frames left to right: whole, cracked, broken apart. Keys out the green, splits at the emptiest columns between
the frames, and writes each frame at the size of the game's tablets (the whole tablet's width -> 216 px), all three
on one canvas so they line up: the tablet's top-left in the same place in each.
  w3_tribe_<name>.png (whole: replaces the old one), w3_tribe_<name>_c1.png (cracked), w3_tribe_<name>_c2.png (broken)
python tools/cut_tribe_crumble.py
"""
import os, glob
import numpy as np
from PIL import Image

ART = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "w3", "tribes_crumble")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "rooms", "w3", "kit")
TW = 216   # the tablet's width in the game
PAD = 80   # game px of room left and above the tablet's corner in the _c1/_c2 frames (nobgath.js R3.TRIBES.PAD)


def key(a):
    a = a.astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    alpha = np.clip((70 - (g - np.maximum(r, b))) / 50, 0, 1)
    a2 = a.copy(); a2[..., 1] = np.minimum(g, np.maximum(r, b) + 8)
    return np.dstack([a2, alpha * 255]).clip(0, 255).astype(np.uint8)


for path in sorted(glob.glob(os.path.join(ART, "*.png"))):
    name = os.path.basename(path)[:-4]
    if "_" in name: continue   # (a spare: levi_9stones)
    rgba = key(np.asarray(Image.open(path).convert("RGB")))
    occ = (rgba[..., 3] > 40).sum(0); Wd = rgba.shape[1]
    cut = lambda lo, hi: lo + int(np.argmin(occ[lo:hi]))
    s1, s2 = cut(int(Wd * 0.28), int(Wd * 0.38)), cut(int(Wd * 0.61), int(Wd * 0.70))
    frames = [rgba[:, a:b] for a, b in ((0, s1), (s1, s2), (s2, Wd))]
    # the whole tablet: its box sets the scale and the anchor (top-left) for all three
    m = frames[0][..., 3] > 40; ys, xs = np.where(m); x0, y0, x1 = xs.min(), ys.min(), xs.max()
    k = TW / (x1 - x0 + 1)
    # each frame: line its tablet up by its own top-left of the main body (the column-median edge), then crop a shared box
    outs = []
    for i, f in enumerate(frames):
        a = f[..., 3] > 40; rows = a.sum(1); cols = a.sum(0)
        fy0 = int(np.argmax(rows > rows.max() * 0.5)); fx0 = int(np.argmax(cols > cols.max() * 0.5))
        ox, oy = fx0, fy0   # (this frame's tablet corner)
        p = round(PAD / k)
        im = Image.fromarray(f).crop((ox - p, oy - p, ox + (x1 - x0) + p, f.shape[0]))
        outs.append(im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS))
    whole = Image.fromarray(frames[0]).crop((x0, y0, x1 + 1, ys.max() + 1)); whole = whole.resize((TW, round(whole.height * k)), Image.LANCZOS)
    whole.save(os.path.join(OUT, f"w3_tribe_{name}.png"), optimize=True)
    for i in (1, 2): outs[i].save(os.path.join(OUT, f"w3_tribe_{name}_c{i}.png"), optimize=True)
    print(name, "cuts", s1, s2, "whole", whole.size, "frames", outs[1].size)
