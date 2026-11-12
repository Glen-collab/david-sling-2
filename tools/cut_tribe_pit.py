"""(Glen 11-11) the pit under a broken tablet in the Hall of the Tribes: his Meta picture
(david-sling-2-art/w3/tribes_crumble/pit.png). Only its middle: the stone lips and the shaft (the long slabs either side
stand higher than the lips and aren't the hall's floor). Scaled so the opening between the lips is a tablet wide (216).
  -> assets/rooms/w3/kit/w3_tribe_pit.png; nobgath.js draws it centred on the tablet, its top on the floor line.
python tools/cut_tribe_pit.py
"""
import os
import numpy as np
from PIL import Image
SRC = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "w3", "tribes_crumble", "pit.png")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "rooms", "w3", "kit", "w3_tribe_pit.png")
BOX = (640, 312, 1370, None)   # the lips' top at y 312; the shaft x 650-1365
OPEN = 360                     # the opening between the lips (830-1190)
a = np.asarray(Image.open(SRC).convert("RGB")).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
al = np.clip((70 - (g - np.maximum(r, b))) / 50, 0, 1); a[..., 1] = np.minimum(g, np.maximum(r, b) + 8)
im = Image.fromarray(np.dstack([a, al * 255]).clip(0, 255).astype(np.uint8))
bot = int(np.where(al.max(1) > 0.5)[0].max()) + 1
im = im.crop((BOX[0], BOX[1], BOX[2], bot)); k = 216 / OPEN
im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS); im.save(OUT, optimize=True); print(im.size)
