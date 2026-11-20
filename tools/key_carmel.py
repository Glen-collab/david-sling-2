"""Glen 11-20: Carmel's pictures (Nabal's house and the shearing, David's camp in Paran) into far/mid/near layers.
far: 720 high jpg. mid/near: 720-high scale, the green keyed out (with despill), cropped to what's left; prints the
top offset (midY) and height."""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
ART, OUT = sys.argv[1], sys.argv[2]
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
for name in ["nabal", "camp"]:
    d = os.path.join(OUT, name); os.makedirs(d, exist_ok=True)
    far = Image.open(os.path.join(ART, f"{name} far.png")).convert("RGB")
    far.resize((round(far.width * 720 / far.height), 720), Image.LANCZOS).save(os.path.join(d, "far.jpg"), quality=88)
    for lay in ["mid", "near"]:
        im = Image.open(os.path.join(ART, f"{name} {lay}.png"))
        im = im.resize((round(im.width * 720 / im.height), 720), Image.LANCZOS)
        k = key(im)
        if name == "nabal" and lay == "mid":   # its lamp glows were painted lime (no real green in the feast): warmed
            a = np.asarray(k).copy(); r, g, b = [a[..., i].astype(int) for i in range(3)]
            lime = (g > r * 0.9) & (b < g * 0.5) & (g > 110); a[..., 1] = np.where(lime, r * 0.85, g)
            k = Image.fromarray(a.astype(np.uint8))
        bb = k.getchannel("A").getbbox()
        k = k.crop((0, bb[1], k.width, bb[3])); k.save(os.path.join(d, f"{lay}.png"), optimize=True)
        print(name, lay, "top", bb[1], "size", k.size)
