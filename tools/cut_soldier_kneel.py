# (Glen 11-07) Saul's soldier going down on his knees, hands raised (19:20): 6 frames on green, left to right.
# Frames 2 and 3 touch (3's spear, laid down, runs under 2's feet): split along that spear. Frames lined up by the blue
# tunic's middle, feet on the cell's bottom. -> assets/sprites/saul_soldier_kneel.png/.json
import json, sys, numpy as np
from PIL import Image; from scipy import ndimage
src = 'C:/Users/big_g/Desktop/david-sling-2-art/sprites/saul_soldier_kneel/saul_soldier_kneel_sheet.png'
a = np.asarray(Image.open(src).convert('RGB')).astype(float); H, W = a.shape[:2]
r, g, b = a[..., 0], a[..., 1], a[..., 2]
gr = g - np.maximum(r, b); al = np.clip((60 - gr) / 45, 0, 1); a[..., 1] = np.minimum(g, (r + b) / 2 + 2)
rgba = np.dstack([a, al * 255])
lab, n = ndimage.label(al > 0.35); sz = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
big = sorted([j + 1 for j in np.argsort(sz)[::-1][:5]], key=lambda k: ndimage.find_objects((lab == k).astype(int))[0][1].start)
masks = []
for k in big:
    m = ndimage.binary_dilation(lab == k, iterations=2) & (al > 0)
    sy, sx = ndimage.find_objects((lab == k).astype(int))[0]
    if sx.stop - sx.start > 700:   # frames 2 and 3: 3's spear is the band along (670,862)-(1334,547); right of x 905 is 3
        yy, xx = np.mgrid[:H, :W]; (x0, y0), (x1, y1) = (650, 872), (1334, 547)
        d = np.abs((y1 - y0) * xx - (x1 - x0) * yy + x1 * y0 - y1 * x0) / np.hypot(x1 - x0, y1 - y0)
        three = (xx > 905) | ((d < 18) & (xx > 600) & (xx < 1340))
        masks += [m & ~three, m & three]
    else: masks.append(m)
SC = float(sys.argv[1]) if len(sys.argv) > 1 else 0.3
fr = []
for m in masks:
    ml, mn = ndimage.label(m); ms = ndimage.sum(m, ml, range(1, mn + 1)); m = np.isin(ml, [j + 1 for j in range(mn) if ms[j] > 1500])   # (specks: a spear tip from the next frame)
    ys, xs = np.nonzero(m); y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
    reg = rgba[y0:y1, x0:x1].copy(); reg[..., 3] *= m[y0:y1, x0:x1]
    tun = (reg[..., 2] > reg[..., 0] + 15) & (reg[..., 3] > 200); cx = np.median(np.nonzero(tun)[1])   # the tunic's middle
    fr.append((reg, cx))
L = max(cx for _, cx in fr); R = max(f.shape[1] - cx for f, cx in fr); FH = max(f.shape[0] for f, _ in fr)
cw = int(np.ceil((L + R) * SC)) + 2; ch = int(np.ceil(FH * SC)) + 1
sheet = Image.new('RGBA', (cw * len(fr), ch))
for i, (f, cx) in enumerate(fr):
    im = Image.fromarray(f.clip(0, 255).astype(np.uint8)); im = im.resize((round(im.width * SC), round(im.height * SC)), Image.LANCZOS)
    sheet.alpha_composite(im, (i * cw + round((L - cx) * SC) + 1, ch - im.height))
sheet.save('assets/sprites/saul_soldier_kneel.png')
json.dump({"frames": len(fr), "frame_w": cw, "frame_h": ch, "ms_per_frame": 170, "loop": False, "align": "feet",
           "anchor_x": round(L * SC) + 1, "anchor_y": ch - 1, "source": "saul_soldier_kneel_sheet.png"}, open('assets/sprites/saul_soldier_kneel.json', 'w'), indent=2)
print(len(fr), cw, ch)
