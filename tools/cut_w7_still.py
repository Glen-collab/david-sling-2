"""Glen 11-23: a still on green (Abner asleep against a cart wheel) keyed and cropped into assets/items.
python tools/cut_w7_still.py <picture> <out.png> [height]   (the key: key_w7.py's)"""
import sys
import numpy as np
from PIL import Image, ImageFilter
def key(im):
    a = np.asarray(im.convert("RGB")).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = np.maximum(r, b)
    gx = g - m                                  # how much greener than anything else
    alpha = np.clip(1 - (gx - 40) / 60, 0, 1)   # >100 over: gone; <40: kept
    alpha[(g > 150) & (r < 120) & (b < 120)] = 0
    al = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3))
    # the soft edges (the lamp glows) unmixed from the green behind them, then any green left clamped
    a3 = np.maximum(alpha, 0.05)
    r2, g2, b2 = r / a3, (g - (1 - a3) * 255) / a3, b / a3
    soft = alpha < 0.98
    r, g, b = np.where(soft, r2, r), np.where(soft, g2, g), np.where(soft, b2, b)
    g = np.minimum(g, np.maximum(r, b))
    rgb = np.stack([r, g, b], -1).clip(0, 255).astype(np.uint8)
    out = Image.fromarray(rgb).convert("RGBA"); out.putalpha(al); return out
src, out = sys.argv[1], sys.argv[2]; H = int(sys.argv[3]) if len(sys.argv) > 3 else 400
k = key(Image.open(src)); k = k.crop(k.getchannel("A").getbbox())
k = k.resize((round(k.width * H / k.height), H), Image.LANCZOS); k.save(out, optimize=True); print(out, k.size)
