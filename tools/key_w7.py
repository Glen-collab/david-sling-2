"""Glen 11-21: the Place of the Wagons (World 7) into far/mid/near layers (the keying as key_carmel.py).
far: 720 high jpg. mid: 720-high scale, keyed, cropped to what's left (prints its top: midY).
near: Glen's is mostly ground (the green only its top seventh), so it's keyed and cropped, then scaled to NEAR_H high.
python tools/key_w7.py <art folder> assets/rooms/w7"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
ART, OUT = sys.argv[1], sys.argv[2]; NEAR_H = 230
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
d = os.path.join(OUT, "wagons"); os.makedirs(d, exist_ok=True)
far = Image.open(os.path.join(ART, "wagons far.png")).convert("RGB")
far.resize((round(far.width * 720 / far.height), 720), Image.LANCZOS).save(os.path.join(d, "far.jpg"), quality=88)
for lay in ["mid", "near"]:
    im = Image.open(os.path.join(ART, f"wagons {lay}.png"))
    im = im.resize((round(im.width * 720 / im.height), 720), Image.LANCZOS)
    k = key(im); bb = k.getchannel("A").getbbox(); k = k.crop((0, bb[1], k.width, bb[3]))
    if lay == "near":   # (its top edge was a straight line: faded in over FADE px)
        k = k.resize((round(k.width * NEAR_H / k.height), NEAR_H), Image.LANCZOS)
        a = np.asarray(k).copy(); FADE = 70; a[:FADE, :, 3] = (a[:FADE, :, 3] * np.linspace(0, 1, FADE)[:, None] ** 1.5).astype(np.uint8)
        k = Image.fromarray(a)
    k.save(os.path.join(d, f"{lay}.png"), optimize=True); print(lay, "top", bb[1], "size", k.size)
