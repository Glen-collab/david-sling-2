"""One of Glen's kit pieces on green (11-15: the prayer rock, the threshing floor, the hanging log) keyed, its loose
bits dropped (a light ray, a shadow: anything not touching the piece itself), cropped and scaled.

python tools/cut_piece.py <picture> <name> <width px>  ->  assets/rooms/w4/kit/<name>.png (+ its size in kit.json)
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage
src, name, width = sys.argv[1], sys.argv[2], int(sys.argv[3]); OUT = "assets/rooms/w4/kit"
x = np.asarray(Image.open(src).convert("RGB")).astype(float); r, g, b = x[..., 0], x[..., 1], x[..., 2]
d = g - np.maximum(r, b)
alpha = np.clip((120 - d) / 60, 0, 1)                    # d 120+ gone, 60 or less kept (moss and leaves are about 30-50)
x[..., 1] = g - np.clip(d - 25, 0, None) * (alpha < 0.98)  # the green taken off the rim (moss keeps a little)
lab, n = ndimage.label(ndimage.binary_dilation(alpha > 0.5, iterations=6))
sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1)); keep = [i + 1 for i, s in enumerate(sizes) if s > sizes.max() * 0.15]
alpha = alpha * np.isin(lab, keep)
al = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)))
im = Image.fromarray(np.dstack([x.clip(0, 255), al]).astype(np.uint8))
im = im.crop(im.getchannel("A").point(lambda v: 255 if v > 30 else 0).getbbox())
im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS); im.save(os.path.join(OUT, name + ".png"))
kit = json.load(open(os.path.join(OUT, "kit.json"))); kit[name] = {"w": im.width, "h": im.height}
json.dump(kit, open(os.path.join(OUT, "kit.json"), "w"), indent=1); print(name, kit[name])
