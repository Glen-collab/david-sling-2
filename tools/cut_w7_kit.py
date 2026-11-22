"""Glen 11-21: World 7's kit (the Place of the Wagons) cut from his five pictures on green -> assets/items/w7_*.png
(each piece: a box in his picture, keyed as key_carmel.py, cropped, scaled to at most MAXD px).
The tipped cart came out upside down: flipped (Glen: "Just flip it right side up").
python tools/cut_w7_kit.py <art folder>"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter, ImageOps
ART = sys.argv[1]; MAXD = 640
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
P = {
 "kit cart and pieces.png": {"w7_cart": (100, 90, 1790, 870), "w7_wheel": (50, 890, 390, 1220), "w7_sack": (420, 895, 715, 1220),
   "w7_bundle": (740, 915, 975, 1220), "w7_amphora": (1020, 890, 1225, 1220), "w7_rope": (1275, 915, 1605, 1205), "w7_sack2": (1625, 945, 1875, 1220)},
 "kit cart wrong and pieces.png": {"w7_sack3": (80, 70, 425, 455), "w7_hay": (10, 515, 455, 825), "w7_rope2": (45, 875, 375, 1185),
   "w7_stones": (1620, 150, 1875, 325), "w7_yoke": (1415, 385, 1900, 795), "w7_amphora2": (1535, 840, 1815, 1230)},
 "kit baggage.png": {"w7_baggage": (40, 260, 1895, 1185)},
 "kit embers.png": {"w7_stone_row": (40, 625, 535, 775), "w7_firering": (590, 190, 1375, 965), "w7_coals": (1475, 645, 1865, 845)},
 "kit tipped cart (upside down).png": {"w7_box": (215, 55, 1705, 1230)},
}
for f, pieces in P.items():
    im = Image.open(os.path.join(ART, f)).convert("RGB")
    for name, box in pieces.items():
        k = key(im.crop(box)); k = k.crop(k.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox())
        if name == "w7_box": k = ImageOps.flip(k)
        s = min(1, MAXD / max(k.size)); k = k.resize((round(k.width * s), round(k.height * s)), Image.LANCZOS)
        k.save(f"assets/items/{name}.png", optimize=True); print(name, k.size)
