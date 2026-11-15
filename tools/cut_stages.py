"""Glen's gate in stages (11-14: a sheet of four on green, shut -> open) cut into four frames of one size, lined up
on the ground and the doorway's middle, so the game can step through them as the gate closes.

python tools/cut_stages.py <sheet> <name>  ->  assets/rooms/w4/kit/<name>_0..3.png (0 = shut ... 3 = open)
"""
import json, os, sys
import numpy as np
from PIL import Image, ImageFilter
src, name = sys.argv[1], sys.argv[2]; OUT = "assets/rooms/w4/kit"; N = 4
x = np.asarray(Image.open(src).convert("RGB")).astype(float); H, W = x.shape[:2]
r, g, b = x[..., 0], x[..., 1], x[..., 2]; d = g - np.maximum(r, b)
alpha = np.clip((150 - d) / 70, 0, 1)
x[..., 1] = g - np.clip(d, 0, None)   # (no green anywhere in his gate: taken off everywhere, the seam between the leaves too)
al = np.asarray(Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)))
rgba = np.dstack([x.clip(0, 255), al]).astype(np.uint8)
solid = rgba[..., 3] > 40
cuts = []
cw = W // N
for i in range(N):
    m = solid[:, i * cw:(i + 1) * cw]; xs = np.where(m.sum(0) > 60)[0]; ys = np.where(m.sum(1) > 4)[0]
    x0, x1, y0, y1 = i * cw + xs[0], i * cw + xs[-1] + 1, ys[0], ys[-1] + 1
    # the two pillars' feet: the doorway's middle is between them (the bottom row's solid spans)
    row = solid[y1 - 30, x0:x1]; cuts.append((x0, x1, y0, y1, x0 + (np.where(row)[0][0] + np.where(row)[0][-1]) / 2))
hmax = max(c[3] - c[2] for c in cuts); half = int(max(max(c[4] - c[0], c[1] - c[4]) for c in cuts)) + 4
S = 0.5
for i, (x0, x1, y0, y1, mid) in enumerate(cuts):
    can = Image.new("RGBA", (half * 2, hmax))
    can.paste(Image.fromarray(rgba[y0:y1, x0:x1]), (int(half - (mid - x0)), hmax - (y1 - y0)))
    can.resize((round(can.width * S), round(can.height * S)), Image.LANCZOS).save(os.path.join(OUT, f"{name}_{i}.png"))
kit = json.load(open(os.path.join(OUT, "kit.json"))); kit[name] = {"w": round(half * 2 * S), "h": round(hmax * S), "frames": N}
json.dump(kit, open(os.path.join(OUT, "kit.json"), "w"), indent=1); print(name, kit[name], [round(c[4]) for c in cuts])
