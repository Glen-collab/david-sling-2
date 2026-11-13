"""World 4 (the Cave of Adullam): Glen's kit sheets on green, cut into pieces (Glen 11-13).

python tools/cut_w4_kit.py <sheet.png> <out dir> <names in reading order: rows top to bottom, each left to right> [--scale 0.5] [--ledge]

Like cut_kit.py, but any number of rows (a row: pieces whose middles are within ROW_GAP of each other, by height).
--ledge: also writes each piece's "top": where his feet go, px down from the piece's top (the middle of the piece's
upper edge, its middle 60%), into kit.json beside its size. Merges into an existing kit.json in <out dir>.
"""
import argparse, json, os
import numpy as np
from PIL import Image
from scipy import ndimage

ap = argparse.ArgumentParser(); ap.add_argument("sheet"); ap.add_argument("out"); ap.add_argument("names")
ap.add_argument("--scale", type=float, default=0.5); ap.add_argument("--ledge", action="store_true")
ap.add_argument("--min", type=int, default=1500); ap.add_argument("--row-gap", type=int, default=120)
args = ap.parse_args()
names = args.names.split(",")
a = np.asarray(Image.open(args.sheet).convert("RGB")).astype(float)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
green = g - np.maximum(r, b)
alpha = np.clip((70 - green) / 50, 0, 1)
a2 = a.copy(); a2[..., 1] = np.minimum(g, np.maximum(r, b) + 8)
rgba = np.dstack([a2, alpha * 255]).clip(0, 255).astype(np.uint8)
mask = ndimage.binary_closing(alpha > 0.5, iterations=6)
lab, n = ndimage.label(mask)
objs = ndimage.find_objects(lab); sizes = ndimage.sum(mask, lab, range(1, n + 1))
pieces = [(objs[i], i + 1) for i in range(n) if sizes[i] > args.min]
pieces.sort(key=lambda p: (p[0][0].start + p[0][0].stop) / 2)
rows, cur = [], []
for p in pieces:
    cy = (p[0][0].start + p[0][0].stop) / 2
    if cur and cy - (cur[-1][0][0].start + cur[-1][0][0].stop) / 2 > args.row_gap: rows.append(cur); cur = []
    cur.append(p)
if cur: rows.append(cur)
order = [p for row in rows for p in sorted(row, key=lambda p: p[0][1].start)]
assert len(order) == len(names), f"found {len(order)} pieces in {len(rows)} rows ({[len(r) for r in rows]}), named {len(names)}"
os.makedirs(args.out, exist_ok=True)
kp = os.path.join(args.out, "kit.json")
kit = json.load(open(kp)) if os.path.exists(kp) else {}
for (sl, k), name in zip(order, names):
    y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
    crop = rgba[y0:y1, x0:x1].copy(); L = lab[y0:y1, x0:x1]
    crop[..., 3] = (crop[..., 3] * ((L == k) | (L == 0))).astype(np.uint8)
    p = Image.fromarray(crop); w, h = round(p.width * args.scale), round(p.height * args.scale)
    p = p.resize((w, h), Image.LANCZOS); p.save(os.path.join(args.out, name + ".png"))
    info = {"w": w, "h": h}
    if args.ledge:
        al = np.asarray(p)[..., 3] > 128
        tops = [np.argmax(al[:, x]) for x in range(int(w * 0.2), int(w * 0.8)) if al[:, x].any()]
        info["top"] = int(np.median(tops)) + 2
    kit[name] = info
    print(name, info)
json.dump(kit, open(kp, "w"), indent=1)
