"""World 4 (Glen 11-13: "can you blend these so they don't always have the cave mouth in the middle?"): his three 4:1
cave panoramas cut into pieces (left arch, wall, the tunnel in the middle, wall, right arch) and joined back in other
orders, cross-faded where they meet, so each room gets its own picture.

python tools/make_w4_panos.py   (reads Desktop/david-sling-2-art/caves/set9_pano_*.png, writes assets/rooms/w4/pano_*.jpg)
"""
import os
import numpy as np
from PIL import Image

HERE = os.path.dirname(__file__)
ART = os.path.join(HERE, "..", "..", "david-sling-2-art", "caves")
OUT = os.path.join(HERE, "..", "assets", "rooms", "w4")
EDGE = (14, 34)   # the dark rim round his pictures (top and sides, bottom)
FADE = 140   # px the pieces overlap and cross-fade (in plain wall)

# the pieces, by x at 3200 wide (the same in all three of his pictures: arch, wall, tunnel, wall, arch)
CUT = {"L": (0, 600), "W1": (560, 1380), "C": (1340, 1900), "W2": (1860, 2640), "R": (2600, 3200)}
ORDERS = {
    "mid":   ["L", "W1", "C", "W2", "R"],        # as he painted it
    "wall":  ["L", "W1", "W2", "R"],             # no tunnel in the middle
    "left":  ["W2", "C", "W1", "W2", "R"],       # the tunnel near the left
    "right": ["L", "W1", "W2", "C", "W1"],       # the tunnel near the right
}

def join(im, order, ext=None):   # ext: his middle piece (("E", x0, x1) in the order: that much of it)
    a = np.asarray(im.convert("RGB")).astype(float)[EDGE[0]:-EDGE[1], EDGE[0]:-EDGE[0]]   # (off with his picture's dark rim)
    e = np.asarray(ext.convert("RGB")).astype(float)[EDGE[0]:EDGE[0] + a.shape[0]] if ext else None
    piece = lambda k: e[:, k[1]:k[2]] if isinstance(k, tuple) else a[:, CUT[k][0]:CUT[k][1]]
    out = piece(order[0])
    for k in order[1:]:
        p = piece(k); f = FADE * 2 if isinstance(k, tuple) or k == "E" else FADE   # (wider where his middle piece joins: its floor sits lower)
        t = np.linspace(0, 1, f)[None, :, None]
        out = np.concatenate([out[:, :-f], out[:, -f:] * (1 - t) + p[:, :f] * t, p[:, f:]], axis=1)
    return Image.fromarray(out.clip(0, 255).astype(np.uint8))

# (Glen 11-13: "Make the rooms long" ... "Here are three middle extensions") the long rooms' pictures: his middle pieces between
SETS = [("set9_pano_limestone_pools.png", "set9_ext_limestone_columns.png", "lime"), ("set9_pano_dark_stalagmites.png", "set9_ext_dark_wall.png", "dark"),
        ("set9_pano_lake_cutaway.png", "set9_ext_lake_terraces.png", "lake")]
LONG = {   # name: (set, order)
    "camp":    ("lime", ["W2", "C", "W1", ("E", 0, 1500), "R"]),
    "spring":  ("lime", ["L", "W1", ("E", 1700, 3100), "C", "W1"]),
    "warren":  ("dark", ["L", "W1", ("E", 0, 1600), "C", "W2", "R"]),
    "narrows": ("dark", ["L", "W1", ("E", 1600, 2700), "W2", "R"]),
    "river":   ("lake", ["W2", "C", "W1", ("E", 0, 1300), "R"]),
    "flooded": ("lake", ["L", "W1", ("E", 1400, 2400), "W2", "R"]),
    "deep":    ("lake", ["L", "W1", ("E", 1700, 3000), "W2", "C", "W1"]),
}
for src, ext, name in SETS:
    im, ex = Image.open(os.path.join(ART, src)), Image.open(os.path.join(ART, ext))
    for room, (st, order) in LONG.items():
        if st == name: p = join(im, order, ex); p.save(os.path.join(OUT, f"pano_{room}.jpg"), quality=88); print(room, p.size)

# the Cave Mouth: his hills picture whole (floor to roof, no repeats)
Image.open(os.path.join(ART, "set5_far_cave_mouth_hills.png")).convert("RGB").save(os.path.join(OUT, "pano_mouth.jpg"), quality=88)
# (Glen 11-13) his tall pictures for the climbing rooms (1:2); the well's twice, one over the other (water at both ends)
for src, n in [("set10_tall_limestone_columns.png", "roost"), ("set10_tall_dark_moss.png", "ledges")]:
    Image.open(os.path.join(ART, src)).convert("RGB").save(os.path.join(OUT, f"tall_{n}.jpg"), quality=88)
w = Image.open(os.path.join(ART, "set10_tall_wet_terraces.png")).convert("RGB")
ww = Image.new("RGB", (w.width, w.height * 2)); ww.paste(w, (0, 0)); ww.paste(w, (0, w.height)); ww.save(os.path.join(OUT, "tall_well.jpg"), quality=88)
print("mouth, tall")
