"""(Glen 11-14: "here is a pit asset to use for the pits"; then "another pit to match the more orange ground in the lamp
hall and one for the darker rooms") his pits, cropped and halved: assets/rooms/w4/pit_<name>.png (sandstone: the light
floors; orange: the Lamp Hall's; dark: the dark rooms'). All three the same shape. Their slices (in the png's px): the
left stone lip 0..L, the back wall L..R (stretched to the hole's width), the right lip R..end; RIM: the back wall's top.
The magenta fringe his cut-outs left on their edges: greyed and faded.

python tools/make_w4_pit.py
"""
import os
import numpy as np
from PIL import Image
HERE = os.path.dirname(__file__)
ART = os.path.join(HERE, "..", "..", "david-sling-2-art", "caves")
OUT = os.path.join(HERE, "..", "assets", "rooms", "w4")
X0, Y0, X1, Y1, K = 50, 248, 1330, 1760, 0.5
for n in ("sandstone", "orange", "dark"):
    a = np.asarray(Image.open(os.path.join(ART, f"pit_{n}.png")).convert("RGBA")).astype(float)
    r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
    mag = (r > g + 12) & (b > g + 12)
    m = np.minimum(r, b)
    for c in (0, 2): a[..., c] = np.where(mag, np.minimum(a[..., c], g + 8), a[..., c])
    a[..., 3] = np.where(mag, al * 0.35, al)
    im = Image.fromarray(a.clip(0, 255).astype(np.uint8)).crop((X0, Y0, X1, Y1))
    im = im.resize((round(im.width * K), round(im.height * K)), Image.LANCZOS)
    im.save(os.path.join(OUT, f"pit_{n}.png")); print(n, im.size)
print("L", round((370 - X0) * K), "R", round((1010 - X0) * K), "RIM", round((315 - Y0) * K))
