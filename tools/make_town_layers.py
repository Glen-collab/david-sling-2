"""A town room's three layers from Glen's pictures (11-10, Nob): far (sky and hills), mid (the place itself on green,
drawn full height and scrolling a little slower than the room), near (a row of things on green, in front, faster).

python tools/make_town_layers.py <far.png> <mid.png> <near.png> <out dir> [--near-h 110] [--overlap 40]
  far  -> far.jpg, 720 tall
  mid  -> mid.png, 720 tall, green keyed; anything poking up over the wall's top is cut off (--cut-above, auto)
  near -> near.png, green keyed, the dirt along its bottom trimmed (--near-bottom, auto), --near-h tall
"""
import argparse, os
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument("far"); ap.add_argument("mid"); ap.add_argument("near"); ap.add_argument("out")
ap.add_argument("--near-h", type=int, default=110); ap.add_argument("--overlap", type=int, default=40)
ap.add_argument("--cut-above", type=int, default=-1, help="mid: clear everything above this row (source px); -1: the wall's top, found")
ap.add_argument("--near-bottom", type=int, default=-1, help="near: the row where its dirt starts (source px); -1: found")
ap.add_argument("--mid-h", type=int, default=720, help="mid: the picture's height in the game (shorter: smaller houses), at the bottom of a 720 layer")
ap.add_argument("--mid-whole", action="store_true", help="mid: keep the whole picture (a gate painted in it), no repeat cut")
a = ap.parse_args(); os.makedirs(a.out, exist_ok=True)

def key(im):
    x = np.asarray(im.convert("RGB")).astype(float); r, g, b = x[..., 0], x[..., 1], x[..., 2]
    spill = g - np.maximum(r, b); al = np.clip(1 - (spill - 25) / 50, 0, 1)
    x[..., 1] = np.minimum(g, np.maximum(r, b) + 8)
    return np.dstack([x, al * 255])
def period(x, rows=None, win=600, step=4):   # (11-10) the two columns that match best near each end: one clean repeat between them
    b = x[rows[0]:rows[1], :, :3] if rows else x[..., :3]; W = x.shape[1]; best = (1e18, 0, W - 1)
    for x1 in range(0, win, step):
        for x2 in range(W - win, W - 6 - a.overlap, step):
            d = np.abs(b[:, x1:x1 + 6] - b[:, x2:x2 + 6]).mean()
            if d < best[0]: best = (d, x1, x2)
    return x[:, best[1]:best[2] + a.overlap]   # (+ the overlap, faded back into the start by blend)
def blend(x, ov):
    W = x.shape[1]; k = np.linspace(0, 1, ov)[None, :, None]
    out = x[:, :W - ov].copy(); out[:, :ov] = x[:, :ov] * k + x[:, W - ov:] * (1 - k); return out
def save(x, p, mode="RGBA"):
    Image.fromarray(x.clip(0, 255).astype(np.uint8)).convert(mode).save(p, **({"quality": 90} if p.endswith(".jpg") else {}))
def scale(x, h):
    im = Image.fromarray(x.clip(0, 255).astype(np.uint8)); w = round(im.width * h / im.height)
    return np.asarray(im.resize((w, h), Image.LANCZOS)).astype(float)

far = np.asarray(Image.open(a.far).convert("RGB")).astype(float); far = scale(blend(far, 240), 720)   # (the sky: all of it, a long soft fade; a short repeat would show its clouds twice)
save(far, os.path.join(a.out, "far.jpg"), "RGB")

mid = key(Image.open(a.mid)); op = mid[..., 3] > 128
if a.cut_above < 0:   # the wall's top: in most columns, the first solid row
    tops = [np.argmax(op[:, c]) for c in range(op.shape[1]) if op[:, c].any()]
    a.cut_above = int(np.percentile(tops, 75)) - 4
mid[:a.cut_above, :, 3] = 0
if not a.mid_whole: mid = period(mid, (a.cut_above, mid.shape[0]))
m = scale(blend(mid, a.overlap), a.mid_h); can = np.zeros((720, m.shape[1], 4)); can[720 - a.mid_h:] = m
save(can, os.path.join(a.out, "mid.png"))

near = key(Image.open(a.near)); op = near[..., 3] > 128
if a.near_bottom < 0:   # where the dirt starts: the first row that's solid all the way across
    full = np.nonzero(op.mean(1) > 0.97)[0]; a.near_bottom = int(full[0]) + 6
near = period(near[:a.near_bottom], None, 900); top = int(np.nonzero((near[..., 3] > 40).any(1))[0][0])
save(scale(blend(near[top:], a.overlap), a.near_h), os.path.join(a.out, "near.png"))
print("->", a.out, "cut above", a.cut_above, "near bottom", a.near_bottom)
