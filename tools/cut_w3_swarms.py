"""(Glen 11-12) his swarms (david-sling-2-art/w3/animals): locust_swarm / fly_swarm (three frames side by side, 1280 x 200)
and locust_single / fly_single (one bug). -> assets/rooms/w3/kit w3_<bug>_swarm.png (the frames, side by side, kept),
w3_<bug>_single.png (cropped). The green screen's fringe is taken off. wildlife.js draws the swarm with singles round it.
python tools/cut_w3_swarms.py"""
import os
import numpy as np
from PIL import Image
ART = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "w3", "animals")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "rooms", "w3", "kit")
def clean(im):
    a = np.asarray(im.convert("RGBA")).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    a[..., 3][(g - np.maximum(r, b) > 40) & (g > 90)] = 0; a[..., 1] = np.minimum(g, np.maximum(r, b) + 10)
    return Image.fromarray(a.clip(0, 255).astype(np.uint8))
for bug, ks, k1 in [("locust", 0.5, 0.42), ("fly", 0.45, 0.42)]:
    sw = clean(Image.open(os.path.join(ART, bug + "_swarm.png"))); sw = sw.resize((round(sw.width * ks), round(sw.height * ks)), Image.LANCZOS)
    sw.save(os.path.join(OUT, f"w3_{bug}_swarm.png"), optimize=True); print(f"w3_{bug}_swarm: {{ w: {sw.width}, h: {sw.height} }},  (3 frames)")
    s1 = clean(Image.open(os.path.join(ART, bug + "_single.png"))); s1 = s1.crop(s1.getbbox()); s1 = s1.resize((max(1, round(s1.width * k1)), max(1, round(s1.height * k1))), Image.LANCZOS)
    s1.save(os.path.join(OUT, f"w3_{bug}_single.png"), optimize=True); print(f"w3_{bug}_single: {{ w: {s1.width}, h: {s1.height} }},")
