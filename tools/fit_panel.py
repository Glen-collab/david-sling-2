"""Fit a second painting of the same place onto the first (Glen 11-04: the AI redrew the cisterns zoomed out instead of
continuing to the right) and join them into one wide room picture.

python tools/fit_panel.py <first.png> <second.png> <room width px> <out.png> [--blend 160]

Both are taken at the game's screen size (1280 x 720). The second is searched for the scale and shift that best put it
on the first (over the part they share), then everything right of the first is filled from it, with a soft blend where
they meet. Prints the fit, so the game's ledges can be set from where the painting puts them.
"""
import argparse
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument("a"); ap.add_argument("b"); ap.add_argument("w", type=int); ap.add_argument("out")
ap.add_argument("--blend", type=int, default=160)
args = ap.parse_args()
A = Image.open(args.a).convert("RGB").resize((1280, 720), Image.LANCZOS)
Bsrc = Image.open(args.b).convert("RGB")
a = np.asarray(A.convert("L").resize((320, 180))).astype(float)


def place(s, dx, dy, size, im=Bsrc):   # the second painting at scale s (of 1280 wide), its left-top at (dx, dy)
    w, h = round(1280 * s), round(720 * s)
    c = Image.new("RGB", size, (0, 0, 0)); m = Image.new("L", size, 0)
    b = im.resize((w, h), Image.LANCZOS); c.paste(b, (dx, dy)); m.paste(255, (dx, dy, dx + w, dy + h))
    return c, m


best = None
for s in np.arange(1.0, 1.6, 0.02):   # coarse, on a quarter-size copy
    w, h = round(320 * s), round(180 * s)
    b = np.asarray(Bsrc.convert("L").resize((w, h))).astype(float)
    for dy in range(-(h - 180), 1, 2):
        for dx in range(-(w // 2), 40, 2):
            x0, x1 = max(0, dx), min(320, dx + w); y0, y1 = max(0, dy), min(180, dy + h)
            if x1 - x0 < 120: continue
            e = np.abs(a[y0:y1, x0:x1] - b[y0 - dy:y1 - dy, x0 - dx:x1 - dx]).mean()
            if best is None or e < best[0]: best = (e, s, dx * 4, dy * 4)
e, s, dx, dy = best
# fine
fb = None
for s2 in np.arange(s - 0.02, s + 0.021, 0.005):
    w, h = round(640 * s2), round(360 * s2); b = np.asarray(Bsrc.convert("L").resize((w, h))).astype(float)
    a2 = np.asarray(A.convert("L").resize((640, 360))).astype(float)
    for ddy in range(dy // 2 - 6, dy // 2 + 7):
        for ddx in range(dx // 2 - 6, dx // 2 + 7):
            x0, x1 = max(0, ddx), min(640, ddx + w); y0, y1 = max(0, ddy), min(360, ddy + h)
            ee = np.abs(a2[y0:y1, x0:x1] - b[y0 - ddy:y1 - ddy, x0 - ddx:x1 - ddx]).mean()
            if fb is None or ee < fb[0]: fb = (ee, s2, ddx * 2, ddy * 2)
e, s, dx, dy = fb
print(f"second painting: scale {s:.3f}, at x {dx}, y {dy} (mean difference {e:.1f})")
W = args.w
B, M = place(s, dx, dy, (W, 720))
room = np.asarray(B).astype(float)
Aa = np.zeros((720, W, 3)); Aa[:, :1280] = np.asarray(A)
k = np.zeros(W); k[:1280 - args.blend] = 1; k[1280 - args.blend:1280] = np.linspace(1, 0, args.blend)
room = Aa * k[None, :, None] + room * (1 - k[None, :, None])
covered = dx + round(1280 * s)
print(f"the second painting reaches x {covered} of the room's {W}")
Image.fromarray(room.clip(0, 255).astype(np.uint8)).save(args.out)
print("->", args.out)
