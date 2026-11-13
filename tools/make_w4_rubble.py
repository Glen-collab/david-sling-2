"""World 4 (Glen 11-13: "Here is rubble for the mouth of the cave doors"): his four rubble piles on green, keyed and cut
to the kit: w4_rubble_dark, w4_rubble_dark2, w4_rubble_sand, w4_rubble_pale (assets/rooms/w4/kit). Prints their sizes
for R4_KIT in adullam.js.

python tools/make_w4_rubble.py
"""
import os
import numpy as np
from PIL import Image

HERE = os.path.dirname(__file__)
SRC = os.path.join(HERE, "..", "..", "david-sling-2-art", "caves", "set11_rubble_piles.png")
KIT = os.path.join(HERE, "..", "assets", "rooms", "w4", "kit")
WIDTH = 300   # each pile this wide in the kit

a = np.asarray(Image.open(SRC).convert("RGB")).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
alpha = np.clip((g - np.maximum(r, b) - 25) / 45, 0, 1); alpha = 1 - alpha       # (green: gone)
a[..., 1] = np.minimum(g, np.maximum(r, b) + 6)                                      # (the green spill off the edges)
im = Image.fromarray(np.dstack([a, alpha * 255]).clip(0, 255).astype(np.uint8))
rows = (np.asarray(im.getchannel("A")) > 128).sum(1) > 5
bands, y = [], 0
while y < len(rows):   # the piles, top to bottom: runs of rows with something in them
    if rows[y]:
        s = y
        while y < len(rows) and rows[y]: y += 1
        if y - s > 60: bands.append((s, y))
    y += 1
for (y0, y1), n in zip(bands, ["dark", "dark2", "sand", "pale"]):
    p = im.crop((0, y0, im.width, y1)); p = p.crop(p.getchannel("A").point(lambda v: 255 if v > 128 else 0).getbbox())
    h = round(p.height * WIDTH / p.width); p = p.resize((WIDTH, h), Image.LANCZOS)
    p.save(os.path.join(KIT, f"w4_rubble_{n}.png")); print(f"w4_rubble_{n}: {{ w: {WIDTH}, h: {h} }}")
