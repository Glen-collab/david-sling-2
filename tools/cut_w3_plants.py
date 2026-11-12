"""(Glen 11-12) his plants on white (david-sling-2-art/w3/plants) -> assets/rooms/w3/kit (w3_<name>.png).
White is keyed out by how white a pixel is; the bright green fringe left from an earlier green screen is taken off
the edges (only near the outside, so green leaves stay).
python tools/cut_w3_plants.py   (prints each piece's size for nobgath.js R3_KIT)"""
import os
import numpy as np
from PIL import Image
from scipy import ndimage
ART = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "w3", "plants")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "rooms", "w3", "kit")
# name: the height it's saved at (game px; David is 112 on screen, the kit is drawn 1:1)
PLANTS = {"tamarisk": 300, "broom": 150, "caper": 170, "nettle": 80, "gourd": 48, "tumbleweed": 96}
ALL = {"tamarisk", "broom", "tumbleweed", "gourd"}   # (no bright green of their own: the screen's green comes out everywhere, between the branches too)
for name, h in PLANTS.items():
    a = np.asarray(Image.open(os.path.join(ART, name + ".png")).convert("RGB")).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    wht = np.minimum(np.minimum(r, g), b); al = np.clip((250 - wht) / 22, 0, 1)            # white -> clear
    bg = ndimage.binary_dilation(al < 0.5, iterations=10)                                   # near the outside
    neon = (g - np.maximum(r, b) > 45) & (g > 120)
    if name in ALL:
        neon = (g - np.maximum(r, b) > 30) & (g > 90); al[neon] = 0
        a[..., 1] = np.minimum(g, np.maximum(r, b) + 8)   # (what's left: no green tinge)
    else: al[bg & neon] = 0
    m = al > 0.1; lab, n = ndimage.label(ndimage.binary_dilation(m, iterations=4))
    sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1)); keep = np.isin(lab, 1 + np.where(sizes > 0.002 * m.size)[0]); al[~keep] = 0
    ys, xs = np.where(al > 0.1); a = np.dstack([a, al * 255])[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    im = Image.fromarray(a.clip(0, 255).astype(np.uint8)); k = h / im.height
    im = im.resize((round(im.width * k), h), Image.LANCZOS); im.save(os.path.join(OUT, f"w3_{name}.png"), optimize=True)
    print(f"w3_{name}: {{ w: {im.width}, h: {im.height} }},")
