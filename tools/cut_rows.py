"""Cut a green-screen sheet of pieces laid out in rows (Glen's gate kit, 11-14) into PNGs, read top row to bottom,
left to right in each row. Full size; writes <out>/kit.json with each piece's size.

python tools/cut_rows.py <sheet> <out dir> <name,name,...>
"""
import json, os, sys
import numpy as np
from PIL import Image
from scipy import ndimage
src, out, names = sys.argv[1], sys.argv[2], sys.argv[3].split(",")
a = np.asarray(Image.open(src).convert("RGB")).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
alpha = np.clip((70 - (g - np.maximum(r, b))) / 50, 0, 1)
a[..., 1] = np.minimum(g, np.maximum(r, b) + 8)
rgba = np.dstack([a, alpha * 255]).clip(0, 255).astype(np.uint8)
lab, n = ndimage.label(ndimage.binary_closing(alpha > 0.5, iterations=4))
objs = ndimage.find_objects(lab); sizes = ndimage.sum(alpha > 0.5, lab, range(1, n + 1))
ps = [objs[i] for i in range(n) if sizes[i] > 3000]
ps.sort(key=lambda s: (s[0].start + s[0].stop) / 2)
rows = []
for s in ps:
    c = (s[0].start + s[0].stop) / 2
    if rows and abs(c - rows[-1][0]) < 60: rows[-1][1].append(s)
    else: rows.append([c, [s]])
ps = [s for _, row in rows for s in sorted(row, key=lambda s: s[1].start)]
assert len(ps) == len(names), f"found {len(ps)} pieces, named {len(names)}"
os.makedirs(out, exist_ok=True); kit = {}
p = os.path.join(out, "kit.json")
if os.path.exists(p): kit = json.load(open(p))
for s, nm in zip(ps, names):
    m = (lab[s] > 0)[..., None]; piece = rgba[s] * m
    Image.fromarray(piece.astype(np.uint8), "RGBA").save(os.path.join(out, nm + ".png"))
    kit[nm] = {"w": s[1].stop - s[1].start, "h": s[0].stop - s[0].start}; print(nm, kit[nm])
json.dump(kit, open(p, "w"), indent=1)
