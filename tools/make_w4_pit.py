"""(Glen 11-14: "here is a pit asset to use for the pits on this opening level") his sandstone pit, cropped and halved:
assets/rooms/w4/pit.png. Its slices (in the png's px): the left stone lip 0..L, the back wall L..R (stretched to the
hole's width), the right lip R..end; RIM: where the back wall's top is (the floor line).

python tools/make_w4_pit.py
"""
import os
from PIL import Image
HERE = os.path.dirname(__file__)
SRC = os.path.join(HERE, "..", "..", "david-sling-2-art", "caves", "pit_sandstone.png")
OUT = os.path.join(HERE, "..", "assets", "rooms", "w4", "pit.png")
X0, Y0, X1, Y1, K = 50, 255, 1330, 1760, 0.5
im = Image.open(SRC).convert("RGBA").crop((X0, Y0, X1, Y1))
im = im.resize((round(im.width * K), round(im.height * K)), Image.LANCZOS)
im.save(OUT); print(im.size, "L", round((370 - X0) * K), "R", round((1010 - X0) * K), "RIM", round((315 - Y0) * K))
