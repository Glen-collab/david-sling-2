# (Glen 11-10) a green-screen floor strip -> a repeating room floor (PNG, the green made clear above its top edge).
# usage: python tools/make_dirt_floor.py <src> <out.png> [--height 118] [--overlap 160]
import sys, argparse
import numpy as np
from PIL import Image
ap = argparse.ArgumentParser(); ap.add_argument("src"); ap.add_argument("out")
ap.add_argument("--height", type=int, default=118); ap.add_argument("--overlap", type=int, default=160)
o = ap.parse_args()
a = np.array(Image.open(o.src).convert("RGB")).astype(float)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
green = np.clip((g - np.maximum(r, b) - 40) / 60, 0, 1)            # how green each pixel is
alpha = 1 - green
a[..., 1] = np.minimum(g, np.maximum(r, b) * 1.05)                 # no green spill on the edge
top = int(np.argmax(alpha.mean(1) > 0.02)) - 2                     # the first row with dirt in it
a, alpha = a[top:], alpha[top:]
w, ov = a.shape[1], o.overlap                                      # tileable: fade the right end into the left
t = np.linspace(0, 1, ov)[None, :, None]
a[:, :ov] = a[:, w - ov:] * (1 - t) + a[:, :ov] * t
alpha[:, :ov] = alpha[:, w - ov:] * (1 - t[..., 0]) + alpha[:, :ov] * t[..., 0]
a, alpha = a[:, :w - ov], alpha[:, :w - ov]
im = Image.fromarray(np.dstack([a, alpha * 255]).clip(0, 255).astype(np.uint8), "RGBA")
s = o.height / im.height
im = im.resize((round(im.width * s), o.height), Image.LANCZOS)
im.save(o.out); print(o.out, im.size)
