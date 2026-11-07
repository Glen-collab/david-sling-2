# (Glen 11-07) Jonathan ducking (the feast: Saul's spear, 20:33): his sheet's first three frames (standing, going down,
# down). (The 4th has a spear going over him: the game draws its own.) Lined up by the tunic, feet on the bottom.
import json, numpy as np
from PIL import Image; from scipy import ndimage
src = 'C:/Users/big_g/Desktop/david-sling-2-art/sprites/jonathan_duck/jonathan_duck_sheet.png'
a = np.asarray(Image.open(src).convert('RGB')).astype(float)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
gr = g - np.maximum(r, b); al = np.clip((60 - gr) / 45, 0, 1); a[..., 1] = np.minimum(g, (r + b) / 2 + 2)
rgba = np.dstack([a, al * 255])
lab, n = ndimage.label(al > 0.35); objs = ndimage.find_objects(lab); sz = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
big = sorted([k for k in range(n) if sz[k] > 50000], key=lambda k: objs[k][1].start)[:3]
cx = lambda k: (objs[k][1].start + objs[k][1].stop) / 2
own = {k: [k] for k in big}
for k in range(n):   # (the little pieces: the arrows' feathers) to the nearest frame
    if k not in big and sz[k] > 300 and objs[k][1].stop < objs[big[-1]][1].stop + 50:
        s = min(big, key=lambda s: abs(cx(s) - cx(k)))
        if abs(cx(s) - cx(k)) < 300: own[s].append(k)
SC = 241 / 836   # (his standing height in jonathan_idle)
fr = []
for k in big:
    m = ndimage.binary_dilation(np.isin(lab, [j + 1 for j in own[k]]), iterations=2) & (al > 0)
    ys, xs = np.nonzero(m); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    reg = rgba[y0:y1, x0:x1].copy(); reg[..., 3] *= m[y0:y1, x0:x1]
    tun = (reg[..., 2] > reg[..., 0] + 15) & (reg[..., 3] > 200); fr.append((reg, np.median(np.nonzero(tun)[1])))
L = max(c for _, c in fr); R = max(f.shape[1] - c for f, c in fr); FH = max(f.shape[0] for f, _ in fr)
cw = int(np.ceil((L + R) * SC)) + 2; ch = int(np.ceil(FH * SC)) + 1
sheet = Image.new('RGBA', (cw * len(fr), ch))
for i, (f, c) in enumerate(fr):
    im = Image.fromarray(f.clip(0, 255).astype(np.uint8)); im = im.resize((round(im.width * SC), round(im.height * SC)), Image.LANCZOS)
    sheet.alpha_composite(im, (i * cw + round((L - c) * SC) + 1, ch - im.height))
sheet.save('assets/sprites/jonathan_duck.png')
json.dump({"frames": len(fr), "frame_w": cw, "frame_h": ch, "ms_per_frame": 70, "loop": False, "align": "feet",
           "anchor_x": round(L * SC) + 1, "anchor_y": ch - 1, "source": "jonathan_duck_sheet.png"}, open('assets/sprites/jonathan_duck.json', 'w'), indent=2)
print(len(fr), cw, ch)
