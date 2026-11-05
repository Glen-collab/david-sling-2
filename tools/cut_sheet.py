"""Cut a creature sprite sheet (Glen 11-05: Grok sheets on green, a row per move, frames not evenly spaced) into the
game's sprite sheets (one row of frames + a .json, like tools/vid2sprite.py makes).

python tools/cut_sheet.py <sheet.png> <out dir> <prefix> <row names, top to bottom: walk,hang,drop,dust> [--scale 0.33]
    [--ms 90,160,70,90] [--loop 1,1,0,0] [--skip 0]

Keys out the green, finds the rows (bands of rows with nothing between them), and in each row the frames: the big
blobs, with the little ones (dust, sparks, a thread) joined to the nearest big one. Every frame of a row goes in a cell
the size of the biggest, standing on the cell's bottom, centred. --skip: names to leave out ("-" in the names list).
"""
import argparse, json, os
import numpy as np
from PIL import Image
from scipy import ndimage

ap = argparse.ArgumentParser(); ap.add_argument("sheet"); ap.add_argument("out"); ap.add_argument("prefix"); ap.add_argument("names")
ap.add_argument("--scale", type=float, default=0.33); ap.add_argument("--ms", default=""); ap.add_argument("--loop", default="")
ap.add_argument("--big", type=int, default=3000, help="a blob this big (sheet px) is a frame of its own")
ap.add_argument("--even", default="", help="row:n,... cut that row into n equal cells instead (frames that touch)")
ap.add_argument("--drop", default="", help="row:k,... leave out frame k (0 = first) of that row (a stray streak)")
args = ap.parse_args()
names = args.names.split(","); ms = [int(v) for v in args.ms.split(",")] if args.ms else [90] * len(names)
loop = [v == "1" for v in args.loop.split(",")] if args.loop else [True] * len(names)
a = np.asarray(Image.open(args.sheet).convert("RGB")).astype(float)
r, g, b = a[..., 0], a[..., 1], a[..., 2]
green = g - np.maximum(r, b)
alpha = np.clip((60 - green) / 45, 0, 1)
a[..., 1] = np.minimum(g, (r + b) / 2 + 2)   # (no green left in soft dust and blur)
rgba = np.dstack([a, alpha * 255]).clip(0, 255).astype(np.uint8)
solid = alpha > 0.35
# the rows: bands with something in them, split where a run of empty rows is
rows = solid.sum(1) > 2
bands, y = [], 0
while y < len(rows):
    if rows[y]:
        y0 = y
        while y < len(rows) and (rows[y] or rows[y:y + 10].any()): y += 1
        if y - y0 > 30: bands.append((y0, y))
    y += 1
print("rows found:", len(bands), bands)
assert len(bands) == len(names), f"found {len(bands)} rows, named {len(names)}"
os.makedirs(args.out, exist_ok=True)
for (y0, y1), name, m, lp in zip(bands, names, ms, loop):
    if name == "-": continue
    even = dict(v.split(":") for v in args.even.split(",") if v); drop = [v.split(":") for v in args.drop.split(",") if v]
    band = solid[y0:y1]
    if name in even:   # equal cells across the whole sheet's width
        n_ = int(even[name]); cw = band.shape[1] / n_; frames = []
        for k in range(n_):
            x0_, x1_ = round(k * cw), round((k + 1) * cw); m_ = band[:, x0_:x1_]
            ys, xs = np.nonzero(m_)
            if not len(xs): continue
            fy0, fy1, fx0, fx1 = ys.min(), ys.max() + 1, x0_ + xs.min(), x0_ + xs.max() + 1
            frames.append((rgba[y0 + fy0:y0 + fy1, fx0:fx1].copy(), (fx0 + fx1) / 2, fy1))
        lab = None
    if name not in even:
     lab, n = ndimage.label(ndimage.binary_closing(band, iterations=3))
     sizes = ndimage.sum(band, lab, range(1, n + 1)); objs = ndimage.find_objects(lab)
     seeds = [i for i in range(n) if sizes[i] >= args.big]
     seeds.sort(key=lambda i: (objs[i][1].start + objs[i][1].stop) / 2)
     cx = lambda i: (objs[i][1].start + objs[i][1].stop) / 2
     own = {s: [s] for s in seeds}
     for i in range(n):
         if i in own: continue
         s = min(seeds, key=lambda s: abs(cx(s) - cx(i)))
         if abs(cx(s) - cx(i)) < 260: own[s].append(i)
     frames = []
     for s in seeds:
         m_ = np.isin(lab, [i + 1 for i in own[s]])
         ys, xs = np.nonzero(m_)
         fy0, fy1, fx0, fx1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
         crop = rgba[y0 + fy0:y0 + fy1, fx0:fx1].copy()
         crop[..., 3] = (crop[..., 3] * ndimage.binary_dilation(m_[fy0:fy1, fx0:fx1], iterations=4)).astype(np.uint8)
         frames.append((crop, (fx0 + fx1) / 2, fy1))
    for rn, k in sorted(drop, key=lambda v: -int(v[1])):
        if rn == name: frames.pop(int(k))
    # cells: as big as the biggest frame; each frame's own bottom and middle kept where they were relative to the row
    fw = max(f[0].shape[1] for f in frames); bottom = max(f[2] for f in frames); top = min(f[2] - f[0].shape[0] for f in frames)
    fh = bottom - top
    sheet = Image.new("RGBA", (fw * len(frames), fh))
    for k, (crop, mx, fb) in enumerate(frames):
        sheet.paste(Image.fromarray(crop), (k * fw + round(fw / 2 - crop.shape[1] / 2), fb - top - crop.shape[0]))
    W, H = round(sheet.width * args.scale), round(sheet.height * args.scale)
    fw2 = round(fw * args.scale); W = fw2 * len(frames)
    sheet = sheet.resize((W, H), Image.LANCZOS)
    out = f"{args.prefix}_{name}"
    sheet.save(os.path.join(args.out, out + ".png"))
    json.dump({"frames": len(frames), "frame_w": fw2, "frame_h": H, "ms_per_frame": m, "loop": lp, "align": "feet",
               "anchor_x": fw2 // 2, "anchor_y": H - 1, "source": os.path.basename(args.sheet)}, open(os.path.join(args.out, out + ".json"), "w"), indent=2)
    print(out, len(frames), "frames", fw2, "x", H)
