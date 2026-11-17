"""Glen's Goliath's-yard wall (11-16): three green-screen pieces -> w3_ywall_left/mid/right, the height of a terrace
wall (its capstone at the top of the image, FOOT - H). The joining sides are cut to the wall's body (inside the
capstone's overhang) so the pieces butt together with no green gap.
python tools/cut_yard_wall.py"""
import numpy as np
from PIL import Image
from scipy import ndimage
SRC, OUT, H = "../david-sling-2-art/w3/source/yard_wall_", "assets/rooms/w3/kit/w3_ywall_", 143
LIFT = 1.0   # (11-16: his second set, evenly lit; 1.45 for the first, dusk-lit set, kept as *_dusk.png)
for part in ("left", "mid", "right"):
    x = np.asarray(Image.open(SRC + part + ".png").convert("RGB")).astype(int)
    r, g, b = x[..., 0], x[..., 1], x[..., 2]
    green = (g - np.maximum(r, b)) > 50
    a = (~green).astype(np.uint8) * 255
    a = ndimage.binary_opening(a > 0, iterations=2)
    lab, n = ndimage.label(a); sizes = ndimage.sum(a, lab, range(1, n + 1)); a = np.isin(lab, 1 + np.flatnonzero(sizes > 2000))
    ys, xs = np.nonzero(a); y0, y1 = ys.min(), ys.max() + 1
    row = np.flatnonzero(a[y0 + int(0.35 * (y1 - y0))])   # a row through the body, above the pillar stubs
    bx0, bx1 = row.min(), row.max() + 1
    x0 = xs.min() if part == "left" else bx0 + 3
    x1 = xs.max() + 1 if part == "right" else bx1 - 3
    rgb = x.copy(); rim = a & ~ndimage.binary_erosion(a, iterations=4); rgb[..., 1] = np.where(rim & (g > np.maximum(r, b)), np.maximum(r, b), g)   # (green spill only at the edge: his moss stays)
    # (the pieces are lit from one side: each column's light evened out so they repeat without seams, then lifted to
    #  read in the game's dusk)
    lum = rgb[..., :3].mean(-1); cm = np.array([lum[y0:y1, i][a[y0:y1, i]].mean() if a[y0:y1, i].sum() > 50 else np.nan for i in range(x.shape[1])])
    ok = ~np.isnan(cm); cm = np.interp(np.arange(len(cm)), np.flatnonzero(ok), cm[ok]); cm = ndimage.uniform_filter1d(cm, 61)
    tgt = np.median(cm[x0:x1]); rgb = np.clip(rgb * (tgt / cm)[None, :, None] * LIFT, 0, 255)
    im = Image.fromarray(np.dstack([rgb, a * 255]).astype(np.uint8)[y0:y1, x0:x1])
    w = round(im.width * H / im.height); im = im.resize((w, H), Image.LANCZOS)
    im.save(OUT + part + ".png"); print(part, w, H)
