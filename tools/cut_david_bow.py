# (Glen 11-07) David drawing and shooting the bow: his sheet on black (stand, draw x3, release, the arrow). The game
# uses the draw and release frames (2-5). Black keyed out (the gaps in the bow too), the purple fringe browned; lined
# up by his feet. -> assets/sprites/david_bow
import json, numpy as np
from PIL import Image; from scipy import ndimage
src = 'C:/Users/big_g/Desktop/david-sling-2-art/sprites/david_bow/david_bow_sheet.png'
a = np.asarray(Image.open(src).convert('RGB')).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
mx = a.max(2); al = np.clip((mx - 14) / 30, 0, 1)
pur = (b > g + 12) & (r > g + 12); a[..., 2][pur] = g[pur]; a[..., 0][pur] = np.minimum(r, g * 1.5)[pur]
rgba = np.dstack([a, al * 255])
lab, n = ndimage.label(mx > 40); objs = ndimage.find_objects(lab); sz = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
big = sorted([k for k in range(n) if sz[k] > 50000], key=lambda k: objs[k][1].start)   # the 5 David frames
own = {k: [k] for k in big}
for k in range(n):   # (bits of bowstring) to the frame they sit in
    if k in big or sz[k] < 60: continue
    c = (objs[k][1].start + objs[k][1].stop) / 2
    for f in big:
        if objs[f][1].start <= c < objs[f][1].stop and objs[k][0].start >= objs[f][0].start - 5: own[f].append(k); break
SC = 241 / (objs[big[0]][0].stop - objs[big[0]][0].start)   # (his height standing, like david_idle)
fr = []
for k in big[1:]:
    m = ndimage.binary_dilation(np.isin(lab, [j + 1 for j in own[k]]), iterations=2) & (al > 0)
    ys, xs = np.nonzero(m); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    reg = rgba[y0:y1, x0:x1].copy(); reg[..., 3] *= m[y0:y1, x0:x1]
    feet = np.nonzero(reg[-int(reg.shape[0] * 0.06):, :, 3] > 150)[1]; fr.append((reg, (feet.min() + feet.max()) / 2))
L = max(c for _, c in fr); R = max(f.shape[1] - c for f, c in fr); FH = max(f.shape[0] for f, _ in fr)
cw = int(np.ceil((L + R) * SC)) + 2; ch = int(np.ceil(FH * SC)) + 1
sheet = Image.new('RGBA', (cw * len(fr), ch))
for i, (f, c) in enumerate(fr):
    im = Image.fromarray(f.clip(0, 255).astype(np.uint8)); im = im.resize((round(im.width * SC), round(im.height * SC)), Image.LANCZOS)
    sheet.alpha_composite(im, (i * cw + round((L - c) * SC) + 1, ch - im.height))
sheet.save('assets/sprites/david_bow.png')
json.dump({"frames": len(fr), "frame_w": cw, "frame_h": ch, "ms_per_frame": 70, "loop": False, "align": "feet",
           "anchor_x": round(L * SC) + 1, "anchor_y": ch - 1, "source": "david_bow_sheet.png"}, open('assets/sprites/david_bow.json', 'w'), indent=2)
print(len(fr), cw, ch)
