"""An outdoor room's near layer (Glen 11-10: Part One's far/mid/near) from his green-screen strip of bushes, rocks and walls.

python tools/make_near_layer.py <picture.png> <out.png> --top Y --bottom Y [--height 200] [--overlap 100]

Keyed, cut from --top to --bottom (the bottom: where his strip's own dirt starts, so it stands on the game's ground),
scaled to --height and its two ends blended so it repeats. In a room: near: "<out>", nearY: its bottom (default GR*T+20).
"""
import argparse
import numpy as np
from PIL import Image
ap = argparse.ArgumentParser(); ap.add_argument("src"); ap.add_argument("out")
ap.add_argument("--top", type=int, required=True); ap.add_argument("--bottom", type=int, required=True)
ap.add_argument("--height", type=int, default=200); ap.add_argument("--overlap", type=int, default=100)
a = ap.parse_args()
im = np.asarray(Image.open(a.src).convert("RGB")).astype(float); r, g, b = im[..., 0], im[..., 1], im[..., 2]
alpha = np.clip(1 - (g - np.maximum(r, b) - 25) / 50, 0, 1); im[..., 1] = np.minimum(g, np.maximum(r, b) + 8)
k = Image.fromarray(np.dstack([im, alpha * 255]).astype(np.uint8), "RGBA").crop((0, a.top, im.shape[1], a.bottom))
k = k.resize((round(k.width * a.height / k.height), a.height), Image.LANCZOS)
x = np.asarray(k).astype(float); W = x.shape[1]; ov = a.overlap; t = np.linspace(0, 1, ov)[None, :, None]
out = x[:, :W - ov].copy(); out[:, :ov] = x[:, :ov] * t + x[:, W - ov:] * (1 - t)
Image.fromarray(out.clip(0, 255).astype(np.uint8), "RGBA").save(a.out); print("->", a.out, out.shape[1], "x", a.height)
