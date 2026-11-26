"""Glen 11-25: Abner's grave (Gemini), the mound and its two standing stones cut from his strip (his ground under it
left off: the game's own floor is there). Keyed as key_w7.py, scaled 2x (his is 1024 wide), the bottom faded out.
py tools/cut_grave.py "../david-sling-2-art/w8/hebron/abner grave.jpg" assets/rooms/w8/hebron/grave.png"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
src = open(os.path.join(os.path.dirname(__file__), "key_w7.py"), encoding="utf-8").read()
ns = {}; exec(src.split("d = os.path.join")[0].replace("ART, OUT = sys.argv[1], sys.argv[2]", "ART = OUT = ''"), ns); key = ns["key"]
BOX = (222, 135, 760, 300)   # (the mound, the stones and the grass at its foot)
im = Image.open(sys.argv[1]).convert("RGB").crop(BOX); im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
k = key(im); a = np.asarray(k).copy(); h, w = a.shape[:2]
F = 40; a[h - F:, :, 3] = (a[h - F:, :, 3] * np.linspace(1, 0, F)[:, None]).astype(np.uint8)   # (into the floor)
S = 60; ramp = np.minimum(np.linspace(0, 1, S), 1); a[:, :S, 3] = (a[:, :S, 3] * ramp[None, :]).astype(np.uint8); a[:, w - S:, 3] = (a[:, w - S:, 3] * ramp[::-1][None, :]).astype(np.uint8)
k = Image.fromarray(a); bb = k.getchannel("A").getbbox(); k = k.crop(bb); k.save(sys.argv[2], optimize=True); print(k.size)
