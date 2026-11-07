# (Glen 11-07) single pictures on green -> one-frame sprites (assets/sprites/<name>.png/.json), sized to match the
# sprites they stand beside: Saul face down (19:24), Samuel with his staff, a wolf howling.
# python tools/cut_singles.py        (sizes below: the figure's width or height in the game's sprite px)
import json, numpy as np
from PIL import Image; from scipy import ndimage
A = 'C:/Users/big_g/Desktop/david-sling-2-art/sprites/'
JOBS = [("saul_lie", "saul_lie/saul_lie.png", "w", 250, 0.5),          # as long as he stands tall (saul_weep: 249)
        ("samuel_stand", "samuel_stand/samuel_stand.png", "h", 300, 0.38),   # (anchor: his body, not the staff)   # samuel_anoint 277 to his turban; this counts the staff
        ("wolf_howl", "wolf_howl/wolf_howl.png", "w", 165, 0.55)]       # wolf_sit: 158 across
for name, src, dim, size, ax in JOBS:
    a = np.asarray(Image.open(A + src).convert('RGB')).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    gr = g - np.maximum(r, b); al = np.clip((60 - gr) / 45, 0, 1); a[..., 1] = np.minimum(g, (r + b) / 2 + 2)
    lab, n = ndimage.label(al > 0.35); sz = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
    keep = np.isin(lab, [j + 1 for j in range(n) if sz[j] > 400]); m = ndimage.binary_dilation(keep, iterations=2) & (al > 0)
    ys, xs = np.nonzero(m); reg = np.dstack([a, al * 255 * m])[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
    sc = size / (reg.shape[1] if dim == "w" else reg.shape[0])
    im = Image.fromarray(reg.clip(0, 255).astype(np.uint8)); im = im.resize((round(im.width * sc), round(im.height * sc)), Image.LANCZOS)
    im.save(f'assets/sprites/{name}.png')
    json.dump({"frames": 1, "frame_w": im.width, "frame_h": im.height, "ms_per_frame": 100, "loop": False, "align": "feet",
               "anchor_x": round(im.width * ax), "anchor_y": im.height - 1, "source": src}, open(f'assets/sprites/{name}.json', 'w'), indent=2)
    print(name, im.size)
