"""A long room's floor (the band the game lays along the bottom, 124 px tall) from a tileable floor picture (Glen 11-10).

python tools/make_floor_strip.py <picture> <out.jpg> [--overlap 120]

Scaled to 124 tall; the two ends blended into each other over --overlap px so it repeats with no seam.
"""
import argparse
import numpy as np
from PIL import Image
ap = argparse.ArgumentParser(); ap.add_argument("src"); ap.add_argument("out"); ap.add_argument("--overlap", type=int, default=120)
args = ap.parse_args()
im = Image.open(args.src).convert("RGB"); im = im.resize((round(im.width * 124 / im.height), 124), Image.LANCZOS)
a = np.asarray(im).astype(float); W, ov = a.shape[1], args.overlap
k = np.linspace(0, 1, ov)[None, :, None]
out = a[:, :W - ov].copy(); out[:, :ov] = a[:, :ov] * k + a[:, W - ov:] * (1 - k)
Image.fromarray(out.clip(0, 255).astype(np.uint8)).save(args.out, quality=90)
print(f"-> {args.out}: repeats every {out.shape[1]} px")
