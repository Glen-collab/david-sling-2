# (Glen 11-24) his stills of David's men, side on, on green screen (david-sling-2-art/men/<day|night>_<sit|lie>_<who>.png,
# 1920 x 1280): "don't limit these profile views to just this level". Keyed, cropped and brought to one size (a sitting
# man SIT_H tall, a lying man LIE_W long: the stills were shot at different distances), into assets/items/men_*.png.
# The game draws them with region.js drawManStill.
#   python tools/cut_men_stills.py          (then python tools/make_manifest.py)
import glob, os
from PIL import Image

ART = os.path.join(os.path.dirname(__file__), "..", "..", "david-sling-2-art", "men")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "items")
SIT_H, LIE_W = 600, 900

for path in sorted(glob.glob(os.path.join(ART, "*.png"))):
    n = os.path.basename(path)[:-4]
    im = Image.open(path).convert("RGBA"); px = im.load(); W, H = im.size
    for y in range(H):
        for x in range(W):
            r, g, b, a = px[x, y]
            m = max(r, b)
            if g > m + 60: px[x, y] = (r, g, b, 0)                                        # the green screen
            elif g > m + 15: px[x, y] = (r, m, b, int(a * max(0, 1 - (g - m - 15) / 45)))  # an edge: fading, no green
            elif g > m: px[x, y] = (r, m, b, a)                                            # a green tinge
    bb = im.split()[3].point(lambda v: 255 if v > 40 else 0).getbbox()
    im = im.crop(bb)
    k = LIE_W / im.width if "_lie_" in n else SIT_H / im.height
    im = im.resize((round(im.width * k), round(im.height * k)), Image.LANCZOS)
    im.save(os.path.join(OUT, "men_" + n + ".png")); print(n, im.size)
