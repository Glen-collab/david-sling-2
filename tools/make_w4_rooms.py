"""World 4 (the Cave of Adullam, Glen 11-13): his cave pictures into the game's rooms.

python tools/make_w4_rooms.py   (reads Desktop/david-sling-2-art/caves, writes assets/rooms/w4)

- the Lamp Hall: his set 1 as Mario-style layers (far wall jpg; mid columns and near rubble keyed off green, png),
  each 720 tall; a floor from the far wall's bottom
- tall rooms (the Bat Roost, the Crumbling Ledges, the Old Well Shaft): the picture scaled to the room's width
  (1296 px), jpg; its bottom 124 rows as the floor (adullam.js draws the picture, its bottom on the screen's)
- the stairs up into a tunnel, keyed, into the kit
The one-screen rooms go through tools/make_room_strip.py (see the commands at the bottom, printed).
"""
import os
import numpy as np
from PIL import Image

ART = os.path.join(os.path.dirname(__file__), "..", "..", "david-sling-2-art", "caves")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "rooms", "w4")
os.makedirs(os.path.join(OUT, "lamp"), exist_ok=True)

def key(im):   # green off, soft edge, spill off (as cut_kit.py)
    a = np.asarray(im.convert("RGB")).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    alpha = np.clip((70 - (g - np.maximum(r, b))) / 50, 0, 1)
    a2 = a.copy(); a2[..., 1] = np.minimum(g, np.maximum(r, b) + 8)
    return Image.fromarray(np.dstack([a2, alpha * 255]).clip(0, 255).astype(np.uint8))

src = lambda n: Image.open(os.path.join(ART, n))
# the Lamp Hall
far = src("set1_far_wall.png").convert("RGB").resize((1280, 720), Image.LANCZOS)
far.save(os.path.join(OUT, "lamp", "far.jpg"), quality=90)
far.crop((0, 720 - 124, 1280, 720)).save(os.path.join(OUT, "lamp", "floor.jpg"), quality=90)
key(src("set1_mid_columns.png")).resize((1280, 720), Image.LANCZOS).save(os.path.join(OUT, "lamp", "mid.png"))
# (Glen 11-13 look: the rubble at full size was half the screen) only its band of rocks, smaller: 768 wide
nr = key(src("set1_near_rubble.png")).crop((0, 440, 2048, 1100)); nr.resize((768, round(660 * 768 / 2048)), Image.LANCZOS).save(os.path.join(OUT, "lamp", "near.png"))
# the tall rooms
for name, f in [("roost", "set6_wall_limestone_ledges.png"), ("ledges", "set6_wall_dark_ledges_grass.png"), ("well", "set6_shaft_sunlit_ropes.png")]:
    im = src(f).convert("RGB"); h = round(im.height * 1296 / im.width); im = im.resize((1296, h), Image.LANCZOS)
    im.save(os.path.join(OUT, name + "_tall.jpg"), quality=88)
    im.crop((0, h - 124, 1296, h)).save(os.path.join(OUT, name + "_floor.jpg"), quality=88)
    print(name, 1296, h, "up rows:", (h - 720) / 36)
# the stairs up into the tunnel (Glen's set 2), keyed and cropped
st = key(src("set2_stairs_to_tunnel.png")); bb = st.getchannel("A").point(lambda v: 255 if v > 128 else 0).getbbox()
st = st.crop(bb); s = 0.36; st = st.resize((round(st.width * s), round(st.height * s)), Image.LANCZOS)
st.save(os.path.join(OUT, "kit", "w4_stairs_tunnel.png")); print("w4_stairs_tunnel", st.size, "bbox", bb)
