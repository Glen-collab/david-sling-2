"""(Glen 11-12) his green-screen props for World 3's roads (david-sling-2-art/w3/props) -> assets/rooms/w3/kit:
  logs.png        w3_deadtree (the fallen dead tree: Goliath's sword splits it), w3_log_l / w3_log_r (the cracked log,
                  cut at its crack: what's left after)
  date_palms.png  w3_palm (the left one, scenery), w3_palm_b (the right one, its date clusters taken out) + w3_dates_1..4
                  (the clusters, hung back on it for the bow to shoot down)
  climb_trees.png w3_climbtree (the left one: its branches are ledges, Mario style) + w3_climbtree.json (the ledges)
  thorns_vines.png w3_thorns (cut with the sword), w3_vineball (rolls down the road at him)
python tools/cut_w3_props.py   (prints each piece's size for region.js KIT)
"""
import os, json
import numpy as np
from PIL import Image
from scipy import ndimage
ART = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "w3", "props")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "rooms", "w3", "kit")

def key(name):
    a = np.asarray(Image.open(os.path.join(ART, name)).convert("RGB")).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    al = np.clip((60 - (g - np.maximum(r, b))) / 45, 0, 1); a[..., 1] = np.minimum(g, np.maximum(r, b) + 6)
    return np.dstack([a, al * 255])

F = 2048 / 2000   # (the boxes below were measured on a 2000-wide view of his 2048-wide pictures)
def piece(rgba, box):   # the box, trimmed to what's in it
    box = [round(v * F) for v in box]
    p = rgba[box[1]:box[3], box[0]:box[2]].copy(); m = p[..., 3] > 25; ys, xs = np.where(m)
    return p[ys.min():ys.max() + 1, xs.min():xs.max() + 1], (box[0] + xs.min(), box[1] + ys.min())

def save(p, name, k):
    im = Image.fromarray(p.clip(0, 255).astype(np.uint8)); im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    im.save(os.path.join(OUT, name + ".png"), optimize=True); print(f"{name}: {{ w: {im.width}, h: {im.height} }}"); return im

# the logs
L = key("logs.png")
save(piece(L, (30, 170, 1090, 925))[0], "w3_deadtree", 0.52)
log, (lx, ly) = piece(L, (1070, 590, 1975, 920)); CUT = round(1492 * F) - lx
save(log[:, :CUT], "w3_log_l", 0.45); save(log[:, CUT:], "w3_log_r", 0.45)

# the palms: the right one's dates come off (dark, below the crown), hung back as their own pieces
P = key("date_palms.png")
save(piece(P, (200, 15, 960, 1115))[0], "w3_palm", 0.52)
pb, (bx, by) = piece(P, (1080, 15, 1790, 1115)); lum = pb[..., :3].mean(2)
H, Wd = pb.shape[:2]; ys, xs = np.mgrid[0:H, 0:Wd]
dark = (lum < 45) & (pb[..., 3] > 100)   # (the dates near black; the trunk's brown is 60-80)
lab, n = ndimage.label(dark); objs = ndimage.find_objects(lab); sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
# the clusters: middling dark pieces beside the trunk under the crown (the big dark one is the trunk's top in shadow)
keep = [i + 1 for i in range(n) if 800 < sizes[i] < 3000 and objs[i][0].start + by > 330 * F and objs[i][0].stop + by < 540 * F]
K = 0.52; dates = []
for j, lb in enumerate(sorted(keep, key=lambda q: objs[q - 1][1].start)):
    m = ndimage.binary_dilation(lab == lb, iterations=2) & (pb[..., 3] > 25) & (lum < 90); yy, xx = np.where(m)
    cl = np.zeros_like(pb); cl[m] = pb[m]; c = cl[yy.min():yy.max() + 1, xx.min():xx.max() + 1]
    save(c, f"w3_dates_{j + 1}", K)
    dates.append({"n": f"w3_dates_{j + 1}", "x": round((xx.min() + xx.max()) / 2 * K), "y": round(yy.max() * K), "top": round(yy.min() * K)})   # (its middle, its bottom, its top: in the palm's px)
    pb[..., 3][m] = 0
save(pb, "w3_palm_b", K)

# the climbing tree: its branches (to the sides of the trunk, below the crown) are ledges
C = key("climb_trees.png"); KC = 0.55
tr, _ = piece(C, (150, 10, 975, 1115)); im = save(tr, "w3_climbtree", KC)
a = np.asarray(im)[..., 3] > 100; Hh, Ww = a.shape
base = a[int(Hh * 0.93):]; cols = np.where(base.sum(0) > 0)[0]; t0, t1 = cols.min(), cols.max()   # the trunk at the bottom
crown = int(Hh * 0.40)
ledges = []
for side, xr in (("L", range(0, t0 - 6)), ("R", range(t1 + 6, Ww))):
    xr = list(xr); band = a[:, xr]; rows = band.sum(1) > 12
    y = crown
    while y < Hh:
        if rows[y]:
            y2 = y
            while y2 < Hh and rows[y2]: y2 += 1
            xs_ = np.where(band[y:y2].any(0))[0]; x0, x1 = xr[xs_.min()], xr[xs_.max()]
            if y2 - y > 6: ledges.append({"side": side, "top": int(y), "x0": int(x0 if side == "L" else t1 - 10), "x1": int(t0 + 10 if side == "L" else x1)})
            y = y2
        y += 1
ledges.sort(key=lambda q: -q["top"])
json.dump({"w": Ww, "h": Hh, "trunk": [int(t0), int(t1)], "crown": crown, "ledges": ledges}, open(os.path.join(OUT, "w3_climbtree.json"), "w"), indent=1)
print("ledges", ledges, "trunk", t0, t1)
json.dump({"dates": dates}, open(os.path.join(OUT, "w3_palm_b.json"), "w"), indent=1); print("dates", dates)

# thorns and the vine ball
T_ = key("thorns_vines.png")
save(piece(T_, (30, 80, 1010, 1050))[0], "w3_thorns", 0.18)
save(piece(T_, (1030, 110, 1980, 1060))[0], "w3_vineball", 0.12)

# the rope ladder (Glen 11-12): rolled up, dropping (2), hanging. Each lined up by the knot it hangs from (the top's
#  middle); all at one scale, the hanging one's height = KIT h of w3_ladder_4. w3_ladder.json: each frame's knot x
R_ = key("rope_ladder.png"); KR = 0.36; knots = []
for i, box in enumerate([(90, 105, 425, 575), (585, 105, 925, 1000), (1100, 105, 1405, 1105), (1585, 0, 1835, 1090)]):
    p, _ = piece(R_, box); im = save(p, f"w3_ladder_{i + 1}", KR)
    top = np.asarray(im)[:12, :, 3] > 100; xs_ = np.where(top.any(0))[0]; knots.append(int((xs_.min() + xs_.max()) / 2))
json.dump({"knot": knots}, open(os.path.join(OUT, "w3_ladder.json"), "w")); print("knots", knots)

# the rope (Glen 11-12): coiled, dropping (2), hanging straight. Lined up by the knot at its top, like the ladder
R2_ = key("rope_drop.png"); knots = []
for i, box in enumerate([(115, 120, 485, 715), (650, 60, 915, 1050), (1145, 40, 1340, 940), (1650, 30, 1790, 1100)]):
    p, _ = piece(R2_, box); im = save(p, f"w3_rope_{i + 1}", KR)
    top = np.asarray(im)[:12, :, 3] > 100; xs_ = np.where(top.any(0))[0]; knots.append(int((xs_.min() + xs_.max()) / 2))
json.dump({"knot": knots}, open(os.path.join(OUT, "w3_rope.json"), "w")); print("rope knots", knots)

# the tall lookout (Glen 11-12, his tower with a shaft that repeats): whole, at the game's size. (Its shaft from 1000 to
#  1258 repeats, for a taller one later)
TT = key("tower_tall.png"); p, _ = piece(TT, (0, 0, 2000 / F * 1152 / 2048, 2000)); save(p, "w3_towertall", 0.3)
a_ = np.asarray(Image.open(os.path.join(OUT, "w3_towertall.png")))[..., 3] > 100; rows = np.where(a_.any(1))[0]
mid = a_.shape[1] // 2; print("tower top row at middle", int(np.where(a_[:, mid])[0].min()), "body", [int(v) for v in np.where(a_[a_.shape[0] // 2])[0][[0, -1]]])
