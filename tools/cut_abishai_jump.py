# (Glen 11-08) Abishai's still sheet on green (stand, tucked jump, crouch, knocked back, stand) -> abishai_jump and
# abishai_hit, sized so his standing figure matches abishai_idle. python tools/cut_abishai_jump.py
import json, numpy as np
from PIL import Image; from scipy import ndimage
SRC = 'C:/Users/big_g/Desktop/david-sling-2-art/sprites/abishai_jump/abishai_jump_sheet_src.png'
HEAD_X = [262, 925, 1700, 2400]     # his head's x in the source picture, per figure (the anchor: the walk sheets anchor on the head)
a = np.asarray(Image.open(SRC).convert('RGB')).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
gr = g - np.maximum(r, b); al = np.clip((60 - gr) / 45, 0, 1); a[..., 1] = np.minimum(g, (r + b) / 2 + 2)
lab, n = ndimage.label(ndimage.binary_dilation(al > 0.35, iterations=6))
sz = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
figs = []
for j in range(n):
    if sz[j] < 3000: continue
    ys, xs = np.nonzero(lab == j + 1); figs.append((xs.min(), xs.max() + 1, ys.min(), ys.max() + 1, j + 1))
figs.sort(); print([(f[0], f[1]) for f in figs])
def cut(i):
    x0, x1, y0, y1, l = figs[i]; m = (lab[y0:y1, x0:x1] == l) & (al[y0:y1, x0:x1] > 0)
    return np.dstack([a[y0:y1, x0:x1], al[y0:y1, x0:x1] * 255 * m]), x0
idle = np.asarray(Image.open('assets/sprites/abishai_idle.png').convert('RGBA'))[:, :json.load(open('assets/sprites/abishai_idle.json'))['frame_w']]
ys = np.nonzero(idle[..., 3].max(1) > 40)[0]; game_h = ys.max() - ys.min() + 1
st, _ = cut(0); sc = game_h / st.shape[0]; print('scale', sc, 'idle h', game_h)
def frame(i):
    reg, x0 = cut(i); im = Image.fromarray(reg.clip(0, 255).astype(np.uint8))
    im = im.resize((round(im.width * sc), round(im.height * sc)), Image.LANCZOS)
    return im, round((HEAD_X[i] - x0) * sc)
def sheet(name, idx, ms, loop, note):
    fr = [frame(i) for i in idx]
    L = max(ax for _, ax in fr) + 6; R = max(im.width - ax for im, ax in fr) + 6; H = max(im.height for im, _ in fr) + 4
    out = Image.new('RGBA', ((L + R) * len(fr), H))
    for k, (im, ax) in enumerate(fr): out.alpha_composite(im, (k * (L + R) + L - ax, H - 2 - im.height))
    out.save(f'assets/sprites/{name}.png')
    json.dump({"frames": len(fr), "frame_w": L + R, "frame_h": H, "ms_per_frame": ms, "loop": loop, "align": "feet",
               "anchor_x": L, "anchor_y": H - 2, "source": "abishai_jump/abishai_jump_sheet_src.png", "note": note},
              open(f'assets/sprites/{name}.json', 'w'), indent=2)
    print(name, out.size)
# player2 picks the middle frames by vy: frame 1 going up (tucked), frame 2 coming down (legs down for the landing)
sheet('abishai_jump', [2, 1, 2, 2], 120, False, "Glen 11-08: crouch, tucked (rising), crouch (falling), crouch")
sheet('abishai_hit', [3], 300, False, "Glen 11-08: knocked back, arms out")
