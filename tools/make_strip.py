"""Make a repeating strip for a long room (Glen 11-04: "the continuous tiling room, and then add onto the art we have").

python tools/make_strip.py <picture> <out.jpg> [--crop y0:y1] [--width W] [--overlap 160]

The picture is scaled to the game's height (720, or the --crop band's height kept as is), then its two ends are blended
into each other over --overlap px so copies laid end to end show no seam. Prints the repeat width.
"""
import argparse
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument("src"); ap.add_argument("out")
ap.add_argument("--crop", default=""); ap.add_argument("--width", type=int, default=0); ap.add_argument("--overlap", type=int, default=160)
ap.add_argument("--from-room", default="", help="w:h the source is first resized to (a room painting's size), before --crop")
args = ap.parse_args()
im = Image.open(args.src).convert("RGB")
if args.from_room:
    w, h = (int(v) for v in args.from_room.split(":")); im = im.resize((w, h), Image.LANCZOS)
else:
    im = im.resize((round(im.width * 720 / im.height), 720), Image.LANCZOS)
if args.crop:
    y0, y1 = (int(v) for v in args.crop.split(":")); im = im.crop((0, y0, args.width or im.width, y1))
a = np.asarray(im).astype(float); W, ov = a.shape[1], args.overlap
k = np.linspace(0, 1, ov)[None, :, None]
out = a[:, :W - ov].copy()
out[:, :ov] = a[:, :ov] * k + a[:, W - ov:] * (1 - k)   # the start fades in from the old end: the repeat joins
Image.fromarray(out.clip(0, 255).astype(np.uint8)).save(args.out, quality=90)
print(f"-> {args.out}: repeats every {out.shape[1]} px, {out.shape[0]} tall")
