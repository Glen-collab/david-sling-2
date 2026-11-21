"""Glen 11-21: Nabal's new mid (zoomed out, as the camp's) and the feast table for in front of Nabal.
Keys the green the same way key_carmel.py does (its key() copied: that script runs everything on import)."""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
ART, OUT = sys.argv[1], sys.argv[2]
def key(im):
    a = np.asarray(im.convert("RGB")).astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    m = np.maximum(r, b); gx = g - m
    alpha = np.clip(1 - (gx - 40) / 60, 0, 1)
    alpha[(g > 150) & (r < 120) & (b < 120)] = 0
    al = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3))
    a3 = np.maximum(alpha, 0.05)
    r2, g2, b2 = r / a3, (g - (1 - a3) * 255) / a3, b / a3
    soft = alpha < 0.98
    r, g, b = np.where(soft, r2, r), np.where(soft, g2, g), np.where(soft, b2, b)
    g = np.minimum(g, np.maximum(r, b))
    rgb = np.stack([r, g, b], -1).clip(0, 255).astype(np.uint8)
    out = Image.fromarray(rgb).convert("RGBA"); out.putalpha(al); return out
def crop(k, full_w=False):
    bb = k.getchannel("A").getbbox()
    return k.crop((0 if full_w else bb[0], bb[1], k.width if full_w else bb[2], bb[3])), bb
im = Image.open(os.path.join(ART, "nabal mid.png")); im = im.resize((round(im.width * 720 / im.height), 720), Image.LANCZOS)
k, bb = crop(key(im), True); k.save(os.path.join(OUT, "nabal", "mid.png"), optimize=True); print("mid top", bb[1], "size", k.size)
im = Image.open(os.path.join(ART, "feast table.png")); im = im.resize((round(im.width * 720 / im.height), 720), Image.LANCZOS)
k, bb = crop(key(im)); k.save(os.path.join(OUT, "kit", "feast_table.png"), optimize=True); print("table size", k.size)
