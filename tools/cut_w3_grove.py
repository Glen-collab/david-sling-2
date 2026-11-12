"""(Glen 11-12) the Tall Trees (nobgath.js room "grove"), from his tree pieces (david-sling-2-art/w3/props, already clear):
  trunk_column_bare.png  w3_trunk_bare: the trees too tall to climb (their limbs only up top: placed by the game)
  trunk_column-1.png     w3_trunk_d: the one to climb: its branches on the lower half only (the bare trunk above them),
                         and w3_trunk_d.json, its branches as ledges (measured: where the picture reaches past the trunk)
  trunk-limb.png         w3_limb (thin end left, thick end right)    trunk-top-of-tree.png  w3_crown
  trunk_rope_only.png    w3_rope_hang
python tools/cut_w3_grove.py   (prints sizes for nobgath.js R3_KIT)"""
import os, json
import numpy as np
from PIL import Image
ART = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "w3", "props")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "rooms", "w3", "kit")
H = 1000                      # the trees' height in the game (px); David is 112
BOX = (53, 208, 1945, 4058)   # the columns' box (both pictures line up)
SPLIT = 1690                  # the climbing tree: its branches from here down (picture px)
S = H / (BOX[3] - BOX[1])
ld = lambda n: Image.open(os.path.join(ART, n)).convert("RGBA")
def save(im, name, k=None, size=None):
    if size is None: size = (round(im.width * k), round(im.height * k))
    im = im.resize(size, Image.LANCZOS); im.save(os.path.join(OUT, name + ".png"), optimize=True)
    print(f"{name}: {{ w: {im.width}, h: {im.height} }},"); return im
bare, col = ld("trunk_column_bare.png"), ld("trunk_column-1.png")
a = np.asarray(bare)[...,3]; ys, xs = np.where(a > 40)
bb = bare.crop((xs.min(), BOX[1], xs.max() + 1, BOX[3])); save(bb, "w3_trunk_bare", S)
print("  bare trunk middle (px from its left):", round(((1000 - xs.min())) * S))
d = Image.new("RGBA", bare.size); d.alpha_composite(bare); low = col.crop((0, SPLIT, col.width, col.height)); d.alpha_composite(low, (0, SPLIT))
dd = d.crop(BOX); save(dd, "w3_trunk_d", S)
# its ledges: rows where the picture reaches well past the trunk (the bare one), grouped into branches
A = np.asarray(dd)[...,3] > 60; Bm = np.asarray(bare.crop(BOX))[...,3] > 60
rows = []
for y in range(A.shape[0]):
    ra, rb = np.where(A[y])[0], np.where(Bm[y])[0]
    if not len(ra) or not len(rb): rows.append((None, None)); continue
    l = ra.min() if ra.min() < rb.min() - 50 else None; r = ra.max() if ra.max() > rb.max() + 50 else None
    rows.append((l and (l, rb.min()), r and (rb.max(), r)))
ledges = []
for side in (0, 1):
    cur = None
    for y, rr in enumerate(rows):
        v = rr[side]
        if v and cur is None: cur = [y, v[0], v[1], y]
        elif v and cur: cur[1] = min(cur[1], v[0]); cur[2] = max(cur[2], v[1]); cur[3] = y
        elif not v and cur:
            if cur[3] - cur[0] > 20: ledges.append({ "side": "LR"[side], "top": round(cur[0] * S), "x0": round(cur[1] * S), "x1": round(cur[2] * S) })
            cur = None
ledges.sort(key=lambda q: -q["top"])
mid = round((1000 - BOX[0]) * S)
json.dump({ "mid": mid, "ledges": ledges }, open(os.path.join(OUT, "w3_trunk_d.json"), "w"), indent=1)
print("  trunk_d middle", mid, "ledges", ledges)
lim = ld("trunk-limb.png"); save(lim, "w3_limb", 0.32)
cr = ld("trunk-top-of-tree.png"); cr = cr.crop(cr.getbbox())
c = np.asarray(cr).astype(float); r, g, b = c[..., 0], c[..., 1], c[..., 2]   # (bright green specks left from his green screen: out)
c[..., 3][(g - np.maximum(r, b) > 70) & (g > 150)] = 0; c[..., 1] = np.minimum(g, np.maximum(r, b) + 60)
save(Image.fromarray(c.clip(0, 255).astype(np.uint8)), "w3_crown", 0.8)
# the hive alone, off Part One's beehive_tree (the tree left behind): hung under the honey tree's limb
hv = Image.open(os.path.join(os.path.dirname(__file__), "..", "assets", "items", "beehive_tree.png")).convert("RGBA").crop((106, 60, 169, 151))
h = np.asarray(hv).copy(); h[:20, :26, 3] = 0; h[:20, 37:, 3] = 0   # (the bit of branch and leaf above it: only its hanging cord stays)
save(Image.fromarray(h), "w3_hive", 1.0)
rp = ld("trunk_rope_only.png"); rp = rp.crop(rp.getbbox()); save(rp, "w3_rope_hang", 0.3)
