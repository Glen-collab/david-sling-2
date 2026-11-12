"""(Glen 11-12: "fallen logs ... with both of their individual halves so it looks more real instead of a straight slice")
david-sling-2-art/w3/props: log_full + log_half_left/right (the branchy dead one), log_full-2 + -left/-right (a plain log).
Each set is cropped to its whole log's box, so the halves sit where they are in the whole one.
-> assets/rooms/w3/kit w3_logA, w3_logA_l, w3_logA_r, w3_logB, w3_logB_l, w3_logB_r.  python tools/cut_w3_logs.py"""
import os
import numpy as np
from PIL import Image
ART = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "w3", "props")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "rooms", "w3", "kit")
def clean(im):   # (any green fringe off, and the stray specks far from the log)
    a = np.asarray(im.convert("RGBA")).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    a[..., 3][(g - np.maximum(r, b) > 40) & (g > 90)] = 0; a[..., 3][a[..., 3] < 24] = 0
    return Image.fromarray(a.clip(0, 255).astype(np.uint8))
for name, files, k in [("w3_logA", ["log_full", "log_half_left", "log_half_right"], 0.52), ("w3_logB", ["log_full-2", "log_full-2-left", "log_full-2-right"], 0.9)]:
    ims = [clean(Image.open(os.path.join(ART, f + ".png"))) for f in files]
    box = ims[0].getbbox()
    for im, suf in zip(ims, ["", "_l", "_r"]):
        p = im.crop(box); p = p.resize((round(p.width * k), round(p.height * k)), Image.LANCZOS)
        p.save(os.path.join(OUT, name + suf + ".png"), optimize=True); print(f"{name}{suf}: {{ w: {p.width}, h: {p.height} }},")
