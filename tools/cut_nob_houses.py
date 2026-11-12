"""(Glen 11-11) Nob's two doorway buildings, from his green-screen pictures (david-sling-2-art/w3):
  nob_stair_house.png -> w3_nob_stairhouse  (the stair down to Beneath Nob)
  nob_hall_house.png  -> w3_nob_hallhouse   (the door into the Hall of the Tribes)
Keys out the green (as cut_kit.py), crops each around its doorway (the doorway in the middle: the game stands a kit door
on its middle), scales to game size and writes them into assets/rooms/w3/kit. For the hall house, the linen awnings
off the sides are taken off (they ran off his picture's edges), and the low walls end at a block joint.

python tools/cut_nob_houses.py
"""
import os
import numpy as np
from PIL import Image

ART = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "w3")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "rooms", "w3", "kit")
SCALE = 0.443   # game px per picture px: the arch as tall as the old stair_down's, David through the door


def key(path):
    a = np.asarray(Image.open(path).convert("RGB")).astype(float)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    alpha = np.clip((70 - (g - np.maximum(r, b))) / 50, 0, 1)
    a2 = a.copy(); a2[..., 1] = np.minimum(g, np.maximum(r, b) + 8)   # the green spill off the edges
    return np.dstack([a2, alpha * 255]).clip(0, 255).astype(np.uint8)


def save(rgba, box, name):
    im = Image.fromarray(rgba).crop(box)
    bb = im.split()[3].point(lambda v: 255 if v > 20 else 0).getbbox()   # trim the empty rows, keep it centred
    im = im.crop((0, bb[1], im.width, bb[3]))
    im = im.resize((round(im.width * SCALE), round(im.height * SCALE)), Image.LANCZOS)
    im.save(os.path.join(OUT, name + ".png"), optimize=True)
    print(name, im.size)


# the stair house: the whole building, the arch's middle at x 1000
s = key(os.path.join(ART, "nob_stair_house.png"))
save(s, (200, 0, 1800, s.shape[0]), "w3_nob_stairhouse")

# the hall house: the awnings off the sides (above the low walls, outside the building), the low walls to a joint
h = key(os.path.join(ART, "nob_hall_house.png"))
H, Wd = h.shape[:2]
ys, xs = np.mgrid[0:H, 0:Wd]
h[(ys > 380) & (ys < 735) & ((xs < 440) | (xs > 1560)), 3] = 0   # (the roof beams above stay)
save(h, (235, 0, 1765, H), "w3_nob_hallhouse")
