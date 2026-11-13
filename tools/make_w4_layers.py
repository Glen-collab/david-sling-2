"""World 4 (Glen 11-13 play: "the backgrounds seem way too blown up for how big David is ... a lot of the rooms didn't have
a floor for that parallax feel"): the cave's layers in front of his pictures, now that the pictures sit small and far off.

python tools/make_w4_layers.py   (reads Desktop/david-sling-2-art/caves and assets/rooms/w4/kit, writes assets/rooms/w4)

- near_<rock>.png: a band of rubble for each rock color (his rock piles and ledge pieces from set7, lying low, in shadow),
  scrolling a little slower than David, just behind him, along the floor
- ceil_<rock>.png: stalactites hanging along the top (his set7 stalactite, in shadow)
- kit/w4_arch*.png: tunnel mouths cut out of his pictures (soft edges), standing in the room where Up takes him in:
  w4_arch (his four arches, the third), w4_arch_sand (the same, lit like the upper caves), w4_tunnel_lit (set2's lit tunnel)
"""
import os, random
import numpy as np
from PIL import Image, ImageFilter, ImageEnhance

HERE = os.path.dirname(__file__)
ART = os.path.join(HERE, "..", "..", "david-sling-2-art", "caves")
OUT = os.path.join(HERE, "..", "assets", "rooms", "w4")
KIT = os.path.join(OUT, "kit")

def shade(im, k, warm=(1, 1, 1)):   # darker (in the shade), alpha kept
    a = np.asarray(im).astype(float); a[..., :3] *= np.array(warm) * k
    return Image.fromarray(a.clip(0, 255).astype(np.uint8))

BAND_W = 1600
for rock in ["sand", "pale", "red", "dark", "moss"]:
    rnd = random.Random(rock)
    # the rubble along the floor
    band = Image.new("RGBA", (BAND_W, 170), (0, 0, 0, 0))
    pieces = [Image.open(os.path.join(KIT, f"w4_{n}.png")) for n in [f"rocks_{rock}", f"ledge_{rock}_l", f"ledge_{rock}_m", f"rocks_{rock}"]]
    x = -60
    while x < BAND_W:
        p = rnd.choice(pieces); s = rnd.uniform(0.55, 1.0)
        p = p.resize((round(p.width * s), round(p.height * s)), Image.LANCZOS)
        if rnd.random() < 0.5: p = p.transpose(Image.FLIP_LEFT_RIGHT)
        for dx in (0, BAND_W) if x + p.width > BAND_W else (0,):   # (wraps round: it repeats)
            band.alpha_composite(p, (x - dx, band.height - p.height - rnd.randint(0, 10)))
        x += round(p.width * rnd.uniform(0.45, 0.75))
    shade(band, 0.55).save(os.path.join(OUT, f"near_{rock}.png"))
    # the stalactites along the top
    st = Image.open(os.path.join(KIT, "w4_stalactite.png"))
    ceil = Image.new("RGBA", (BAND_W, 260), (0, 0, 0, 0)); x = 0
    while x < BAND_W:
        s = rnd.uniform(0.6, 1.5); p = st.resize((round(st.width * s), round(st.height * s)), Image.LANCZOS)
        if rnd.random() < 0.5: p = p.transpose(Image.FLIP_LEFT_RIGHT)
        for dx in (0, BAND_W) if x + p.width > BAND_W else (0,):
            ceil.alpha_composite(p, (x - dx, -rnd.randint(10, 40)))
        x += round(p.width * rnd.uniform(0.6, 1.6))
    warm = {"sand": (1.05, 0.95, 0.8), "pale": (1, 1, 0.95), "red": (1.1, 0.85, 0.7), "dark": (0.8, 0.8, 0.85), "moss": (0.85, 1, 0.85)}[rock]
    shade(ceil, 0.45, warm).save(os.path.join(OUT, f"ceil_{rock}.png"))
    print("near/ceil", rock)

def cutout(src, box, feather, h, name, look=None):   # a soft-edged piece of one of his pictures, h px tall
    im = Image.open(os.path.join(ART, src)).convert("RGB").crop(box)
    w0, h0 = im.size
    m = Image.new("L", (w0, h0), 0); a = np.zeros((h0, w0))
    yy, xx = np.mgrid[0:h0, 0:w0]
    # an arch: round over the top, straight sides, soft all round but the bottom (which stands on the floor)
    cx, r = w0 / 2, w0 / 2 - feather
    top = r + feather
    inside = np.where(yy < top, np.hypot(xx - cx, yy - top) < r, np.abs(xx - cx) < r)
    m = Image.fromarray((inside * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(feather / 2))
    if look: im = look(im)
    im.putalpha(m)
    s = h / h0; im = im.resize((round(w0 * s), h), Image.LANCZOS)
    im.save(os.path.join(KIT, name + ".png")); print(name, im.size)
    return im.size

sizes = {}
arch = (1060, 360, 1500, 920)   # (his four arches at 2048 wide: the third, with its rim of rock)
sizes["w4_arch"] = cutout("set3_far_four_arches.png", arch, 40, 250, "w4_arch", lambda im: ImageEnhance.Brightness(im).enhance(1.6))
sizes["w4_arch_sand"] = cutout("set3_far_four_arches.png", arch, 40, 250, "w4_arch_sand",
    lambda im: Image.fromarray((np.asarray(im).astype(float) * [3.0, 2.5, 1.9]).clip(0, 255).astype(np.uint8)))
sizes["w4_tunnel_lit"] = cutout("set2_far_tunnels.png", (1060, 360, 1560, 800), 40, 230, "w4_tunnel_lit", lambda im: ImageEnhance.Brightness(im).enhance(1.5))
print(sizes)

# (Glen 11-13: "Here are some cave floors and detail") his floors on green, keyed and cropped to the rock: the ground
#  David walks on, scrolling with him (floor_<look>.png, FLOOR_W wide); his rock pile, the near layer in the dark rooms
FLOOR_W = 1600
def keyed(n):
    a = np.asarray(Image.open(os.path.join(ART, n)).convert("RGB")).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    alpha = np.clip((70 - (g - np.maximum(r, b))) / 50, 0, 1)
    a2 = a.copy(); a2[..., 1] = np.minimum(g, np.maximum(r, b) + 8)
    im = Image.fromarray(np.dstack([a2, alpha * 255]).clip(0, 255).astype(np.uint8))
    bb = im.getchannel("A").point(lambda v: 255 if v > 128 else 0).getbbox(); return im.crop(bb)
for n, src, w in [("limestone", "set8_floor_limestone.png", FLOOR_W), ("sandstone", "set8_floor_sandstone.png", FLOOR_W),
                  ("dark", "set8_floor_dark.png", FLOOR_W), ("pebbles", "set8_floor_pebbles.png", 2200)]:
    im = keyed(src); h = round(im.height * w / im.width); im = im.resize((w, h), Image.LANCZOS)
    im.save(os.path.join(OUT, f"floor_{n}.png")); print("floor", n, im.size)
im = keyed("set8_near_rockpile.png"); w = 1300; h = round(im.height * w / im.width)
shade(im.resize((w, h), Image.LANCZOS), 0.7).save(os.path.join(OUT, "near_pile.png")); print("near_pile", (w, h))
