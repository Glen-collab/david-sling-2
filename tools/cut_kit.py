"""Cut a room kit sheet (Glen 11-04: pieces on green screen, laid out from tools' kit guide) into game-sized pieces.

python tools/cut_kit.py <sheet.png> <out dir> <names, left to right, top row then bottom: a,b,c,...> [--scale 0.512]

Keys out the green (soft edge, the green spill taken off), finds each piece (the big blobs, top row then bottom row,
left to right), crops it, scales it to game size (--scale: game px per sheet px; the guide was drawn at 2x game size),
and writes <name>.png plus kit.json with each piece's size and, for walkway pieces (names starting "walk_"):
  deck: the deck's top, px from the piece's top (his feet go here)
  posts: the posts' middles, px from the piece's left (the pieces join post on post)
  leg: the band of rows near the bottom where only the legs are (repeated down to reach the ground)
"""
import argparse, json, os
import numpy as np
from PIL import Image
from scipy import ndimage

ap = argparse.ArgumentParser(); ap.add_argument("sheet"); ap.add_argument("out"); ap.add_argument("names")
ap.add_argument("--scale", type=float, default=0.512)
ap.add_argument("--keep", action="store_true", help="keep only the biggest pieces, as many as there are names (drops loose sparks and blades)")
args = ap.parse_args()
names = args.names.split(",")
im = Image.open(args.sheet).convert("RGB"); a = np.asarray(im).astype(float)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
green = g - np.maximum(r, b)
alpha = np.clip((70 - green) / 50, 0, 1)                    # soft edge
a2 = a.copy(); a2[..., 1] = np.minimum(g, np.maximum(r, b) + 8)   # the green spill off the edges
rgba = np.dstack([a2, alpha * 255]).clip(0, 255).astype(np.uint8)
mask = ndimage.binary_closing(alpha > 0.5, iterations=6)
lab, n = ndimage.label(mask)
objs = [s for s in ndimage.find_objects(lab)]
sizes = ndimage.sum(mask, lab, range(1, n + 1))
pieces = [(objs[i], i + 1) for i in range(n) if sizes[i] > 1500]
if args.keep: pieces = sorted(pieces, key=lambda p: -sizes[p[1] - 1])[:len(names)]
mid = a.shape[0] / 2
pieces.sort(key=lambda p: (0 if (p[0][0].start + p[0][0].stop) / 2 < mid else 1, p[0][1].start))
assert len(pieces) == len(names), f"found {len(pieces)} pieces, named {len(names)}"
os.makedirs(args.out, exist_ok=True)
kit = {}
for (sl, k), name in zip(pieces, names):
    y0, y1, x0, x1 = sl[0].start, sl[0].stop, sl[1].start, sl[1].stop
    crop = rgba[y0:y1, x0:x1].copy(); L = lab[y0:y1, x0:x1]
    crop[..., 3] = (crop[..., 3] * ((L == k) | (L == 0))).astype(np.uint8)   # this piece only (not a neighbor's edge)
    p = Image.fromarray(crop); w, h = round(p.width * args.scale), round(p.height * args.scale)
    p = p.resize((w, h), Image.LANCZOS); p.save(os.path.join(args.out, name + ".png"))
    info = {"w": w, "h": h}
    if name.startswith("walk_"):
        al = np.asarray(p)[..., 3] > 128
        cols = al.sum(0); rows = al.sum(1)
        # the legs: near the bottom only the posts are there (few columns filled)
        legrow = h - 6
        posts = []; on = False
        for x in range(w):
            if al[legrow, x] and not on: on, s = True, x
            if not al[legrow, x] and on: on = False; posts.append((s + x) // 2)
        if on: posts.append((s + w) // 2)
        # the deck: the planks are the thickest band of full-width rows (the top rail is a thin one above them)
        full = rows > 0.85 * w; best, run, start = (0, 0), 0, 0
        for y in range(h):
            if full[y]: run, start = run + 1, (start if run else y)
            else: run = 0
            if run > best[0]: best = (run, start)
        deck = best[1]
        info.update(deck=deck, posts=posts, leg=[h - 14, h - 4])
    kit[name] = info
    print(name, info)
json.dump(kit, open(os.path.join(args.out, "kit.json"), "w"), indent=1)
