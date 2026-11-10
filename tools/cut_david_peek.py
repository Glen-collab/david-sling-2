# David hiding behind the stone Ezel, peeking (Glen's still, 11-10: the top right of david_ezel_poses.png).
# One frame. Cut at the stone's left edge: the game draws its own stone in front, so the hand on it is hidden anyway.
# Run from the repo: python tools/cut_david_peek.py
import json, os
import numpy as np
from PIL import Image

SRC = "../david-sling-2-art/reference/david_ezel_poses.png"
X0, X1, Y0, Y1 = 1100, 1322, 178, 646   # David only: right edge = where the stone starts; top just under the bow tip
K = 0.38                                 # sheet px per picture px (a squat about two thirds of his standing height)
a = np.asarray(Image.open(SRC).convert("RGB"))[Y0:Y1, X0:X1].astype(np.float32)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
spill = g - np.maximum(r, b)
alpha = np.clip(1 - (spill - 25) / 50, 0, 1)
a[..., 1] = np.minimum(g, np.maximum(r, b) + 8)
img = Image.fromarray(np.dstack([a, alpha * 255]).astype(np.uint8), "RGBA")
os.makedirs("../david-sling-2-art/sprites/david_peek", exist_ok=True)
img.save("../david-sling-2-art/sprites/david_peek/david_peek_full_size.png")
W, H = round(img.width * K), round(img.height * K)
img = img.resize((W, H), Image.LANCZOS)
img.save("assets/sprites/david_peek.png")
json.dump({"frames": 1, "frame_w": W, "frame_h": H, "ms_per_frame": 100, "loop": False, "align": "feet",
           "anchor_x": W, "anchor_y": H - 2, "source": "david_ezel_poses.png (Glen's still)"},
          open("assets/sprites/david_peek.json", "w"), indent=2)
print(W, "x", H)
