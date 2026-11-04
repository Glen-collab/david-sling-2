"""Glen's well (2026-11-04): his new well pictures and his climb-out-of-the-well sheet, lined up for the game.

python tools/cut_well_climb.py      (then: python tools/install_david2.py && python tools/make_manifest.py)

In:  david-sling-2-art/items/town_well_source_2.png        the well with the rope tied on (404 x 400)
     david-sling-2-art/items/town_well_source_no_rope.png  the same well, no rope
     david-sling-2-art/sprites/david_ledge_climb_sheet_2.png  16 frames of 404 x 400: David climbing out, the well in every frame
                                                           (his lighter David; david_well_climb.png was the first, darker one)
Out: assets/items/town_well.png, town_well_no_rope.png      (the no-rope one moved to sit exactly on the rope one)
     david-sling-2-art/sprites/david_well_climb_sheet.png + .json   (Glen's file is left as it is)

In Glen's sheet the well slides sideways from frame to frame (up to 36 px, and 8-17 px up and down in the last three), so
David jumps around against it. Each frame is found against the well picture and moved so its well sits exactly where the
picture's does; the frames are then on the picture's own grid, so the game draws the sheet over the well and it matches.
Little leftover specks (bits of other frames) are cleared.
"""
import json, os
import numpy as np
from PIL import Image
from scipy import ndimage

HOME = os.path.expanduser("~")
ART = os.path.join(HOME, "Desktop", "david-sling-2-art")
ITEMS = os.path.join(os.path.dirname(__file__), "..", "assets", "items")
FW = 404
OPEN_X, BOTTOM = 268, 282   # in the well picture: the middle of the hole (where he stands in frame 0) and the well's base
X0, Y0, CW, CH = -20, -60, 450, 350   # the sheet's frames: this much of the picture's grid (they reach above and right of it)
MS = 100

well = Image.open(os.path.join(ART, "items", "town_well_source_2.png")).convert("RGBA")
nr = Image.open(os.path.join(ART, "items", "town_well_source_no_rope.png")).convert("RGBA")
W = np.asarray(well).astype(np.int16)
ys, xs = np.where(W[..., 3] > 250)
pick = np.random.default_rng(0).choice(len(ys), 4000, replace=False); ys, xs = ys[pick], xs[pick]


def find(img, ry, rx):   # where the well picture sits in img: (dx, dy), and how much of it matched
    a = np.asarray(img).astype(np.int16); best = None
    for dy in ry:
        for dx in rx:
            Y, X = ys + dy, xs + dx; m = (Y >= 0) & (Y < a.shape[0]) & (X >= 0) & (X < a.shape[1])
            sc = (np.abs(a[Y[m], X[m], :3] - W[ys[m], xs[m], :3]).sum(1) < 20).sum() / len(ys)
            if best is None or sc > best[0]: best = (sc, dx, dy)
    return best[1], best[2], best[0]


# the wells
os.makedirs(ITEMS, exist_ok=True)
well.save(os.path.join(ITEMS, "town_well.png"))
# the no-rope well: lined up on the rope one by its bottom bricks (the rope's not there, the lid's a touch different)
N = np.asarray(nr).astype(np.int16); best = None
for dy in range(-6, 7):
    for dx in range(-6, 7):
        a = W[200:270, 60:200, :3]; b = N[200 + dy:270 + dy, 60 + dx:200 + dx, :3]
        e = np.abs(a - b).mean()
        if best is None or e < best[0]: best = (e, dx, dy)
_, ndx, ndy = best
fixed = Image.new("RGBA", nr.size, (0, 0, 0, 0)); fixed.alpha_composite(nr, (-ndx, -ndy))
fixed.save(os.path.join(ITEMS, "town_well_no_rope.png"))
print(f"no-rope well moved {-ndx},{-ndy}")

# the climb
# (Glen 11-04) his second pass, a lighter David (the first, david_well_climb.png, had the darker tunic)
SRC = "david_ledge_climb_sheet_2.png"
src = Image.open(os.path.join(ART, "sprites", SRC)).convert("RGBA")
n = src.width // FW
frames = []
for i in range(n):
    f = src.crop((i * FW, 0, (i + 1) * FW, src.height))
    dx, dy, sc = find(f, range(30, 110), range(-50, 51))
    c = Image.new("RGBA", (CW, CH), (0, 0, 0, 0)); c.paste(f, (-dx - X0, -dy - Y0))
    a = np.asarray(c).copy()
    lab, k = ndimage.label(a[..., 3] > 30, structure=np.ones((3, 3)))
    if k:
        sz = ndimage.sum(np.ones(lab.shape), lab, range(1, k + 1))
        a[np.isin(lab, [j + 1 for j in np.where(sz < 300)[0]])] = 0
        a[(a[..., 3] <= 30) & ~ndimage.binary_dilation(lab > 0, iterations=1)] = 0
    frames.append(Image.fromarray(a))
    print(f"frame {i}: well was off by {dx:+d},{dy:+d} (match {sc:.2f})")
sheet = Image.new("RGBA", (CW * n, CH))
for i, f in enumerate(frames): sheet.paste(f, (i * CW, 0))
sheet.save(os.path.join(ART, "sprites", "david_well_climb_sheet.png"))
j = {"frames": n, "frame_w": CW, "frame_h": CH, "ms_per_frame": MS, "loop": False, "align": "well",
     "anchor_x": OPEN_X - X0, "anchor_y": BOTTOM - Y0, "source": SRC + " (Glen, 11-04), lined up on town_well_source_2.png"}
json.dump(j, open(os.path.join(ART, "sprites", "david_well_climb.json"), "w"), indent=2)
print("->", n, "frames,", CW, "x", CH)
