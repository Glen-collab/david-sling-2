"""A long room's repeating backdrop and floor from one of Glen's room pictures (11-10: Michal's house, Naioth).

python tools/make_room_strip.py <picture> <out_strip.jpg> <out_floor.jpg> --junction J [--ground 616] [--crop l,t,r,b] [--overlap 160]

The wall (everything above --junction, the picture's own line where the wall meets the floor) is scaled so that line
lands at --ground in the game's 720-tall screen (the game's ground is at 612); the floor below it is squeezed or
stretched into the rest of the 720, at the same width. The two ends are blended into each other over --overlap px (0: no blend, the seam hidden behind a column) so
copies laid end to end show no seam (as make_strip.py). The floor file is the strip's bottom 124 rows: the game lays it
over the ground tiles.
"""
import argparse
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument("src"); ap.add_argument("out"); ap.add_argument("floor")
ap.add_argument("--junction", type=int, required=True); ap.add_argument("--ground", type=int, default=616)
ap.add_argument("--crop", default=""); ap.add_argument("--overlap", type=int, default=160)
ap.add_argument("--scale", type=float, default=0, help="a smaller scale than fills the screen (the furniture to the people's size): the wall is made taller with copies of --course")
ap.add_argument("--course", default="", help="y0:y1 in the picture, a band of plain wall (between two mortar lines) copied in under the ceiling")
ap.add_argument("--floor-patch", default="", help="x0,y0,x1,y1: a clean bit of the picture's floor, tiled under the picture (with --scale, where the picture has too little floor)")
ap.add_argument("--shift", type=int, default=0, help="roll the strip right by this many px, so the picture starts there in the room (a seam behind a column)")
args = ap.parse_args()
im = Image.open(args.src).convert("RGB")
J = args.junction
if args.crop:
    l, t, r, b = (int(v) for v in args.crop.split(",")); im = im.crop((l, t, r, b)); J -= t
s = args.scale or args.ground / J; W = round(im.width * s)
if args.scale:   # the picture smaller, with plain courses of wall copied in under its ceiling to fill the height
    c0, c1 = (int(v) - (t if args.crop else 0) for v in args.course.split(":"))
    top = im.crop((0, 0, im.width, c1)).resize((W, round(c1 * s)), Image.LANCZOS)
    course = im.crop((0, c0, im.width, c1)).resize((W, round((c1 - c0) * s)), Image.LANCZOS)
    rest = im.crop((0, c1, im.width, J)).resize((W, round((J - c1) * s)), Image.LANCZOS)
    wall = Image.new("RGB", (W, args.ground)); y = args.ground - rest.height; wall.paste(rest, (0, y))
    while y > top.height: y -= course.height; wall.paste(course, (0, y))
    wall.paste(top, (0, y - top.height))   # (the ceiling's beams on top; any of it above the screen is cut off)
else:
    wall = im.crop((0, 0, im.width, J)).resize((W, args.ground), Image.LANCZOS)
if args.floor_patch:
    x0, y0, x1, y1 = (int(v) for v in args.floor_patch.split(","))
    if args.crop: x0 -= l; x1 -= l; y0 -= t; y1 -= t
    col = np.asarray(im.crop((x0, y0, x1, y1))).reshape(-1, 3).mean(0)   # (the floor's own color: plain flagstones in it)
    from PIL import ImageDraw
    floor = Image.new("RGB", (W, 720 - args.ground), tuple(int(v) for v in col)); dr = ImageDraw.Draw(floor)
    line = tuple(int(v * 0.8) for v in col); hi = tuple(min(255, int(v * 1.06)) for v in col)
    y, h, k = 0, 18, 0
    while y < floor.height:
        dr.rectangle((0, y + 1, W, y + h - 2), fill=tuple(int(v * (1.02 if k % 2 else 0.97)) for v in col)); dr.line((0, y, W, y), fill=line, width=2)
        tw = h * 4; off = (k % 2) * tw // 2
        for x in range(-off, W, tw): dr.line((x, y, x, y + h), fill=line, width=2); dr.line((x + 2, y + 2, x + tw - 4, y + 2), fill=hi)
        y += h; h += 6; k += 1
    below = im.crop((0, J, im.width, im.height)); below = below.resize((W, max(1, round(below.height * s))), Image.LANCZOS)
    floor.paste(below, (0, 0))   # (what little floor the picture has, then the tiles)
else:
    floor = im.crop((0, J, im.width, im.height)).resize((W, 720 - args.ground), Image.LANCZOS)
full = Image.new("RGB", (W, 720)); full.paste(wall, (0, 0)); full.paste(floor, (0, args.ground))
a = np.asarray(full).astype(float); ov = args.overlap
k = np.linspace(0, 1, max(ov, 1))[None, :max(ov, 1), None]
out = a[:, :W - ov].copy()
if ov: out[:, :ov] = a[:, :ov] * k + a[:, W - ov:] * (1 - k)
out = np.roll(out, args.shift % out.shape[1], axis=1)
img = Image.fromarray(out.clip(0, 255).astype(np.uint8))
img.save(args.out, quality=90); img.crop((0, 720 - 124, img.width, 720)).save(args.floor, quality=90)
print(f"-> {args.out}: repeats every {img.width} px (wall scale {s:.3f}); floor {args.floor}")
