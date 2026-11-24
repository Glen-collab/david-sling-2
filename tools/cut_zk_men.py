# (11-24) Glen's night stills of David's men (david-sling-2-art/w7/ziklag/man_*.png, green screen, 1920 x 1280): three
# sitting with their heads down, two lying asleep. Keyed and cropped to assets/items/zk_man_*.png (drawn by zk7.js)
import os
from PIL import Image
ART = "../david-sling-2-art/w7/ziklag"; OUT = "assets/items"
for n in ["man_sit_old", "man_sit_beard", "man_sit_stripes", "man_lie_1", "man_lie_2"]:
    im = Image.open(os.path.join(ART, n + ".png")).convert("RGBA"); px = im.load(); W, H = im.size
    for y in range(H):
        for x in range(W):
            r, g, b, a = px[x, y]
            m = max(r, b)
            if g > m + 60: px[x, y] = (r, g, b, 0)                                        # the green screen
            elif g > m + 15: px[x, y] = (r, m, b, int(a * max(0, 1 - (g - m - 15) / 45)))  # an edge: fading, no green
            elif g > m: px[x, y] = (r, m, b, a)                                            # a green tinge
    bb = im.split()[3].point(lambda v: 255 if v > 40 else 0).getbbox()
    im.crop(bb).save(os.path.join(OUT, "zk_" + n + ".png")); print(n, bb[2] - bb[0], bb[3] - bb[1])
