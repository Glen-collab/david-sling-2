"""Glen 11-25 (Gemini): Hebron's road, town and gate into far/mid/near layers, keyed as key_w7.py.
Every picture is scaled to 720 high (his are 1024 x 341, so a little soft). far: jpg. mid/near: keyed, cropped to what's
left (prints the size: midY = 640 - height puts its foot where Ziklag's is). near: the top edge faded in (FADE) unless
it's paving.   py tools/key_hebron.py ../david-sling-2-art/w8/hebron assets/rooms/w8/hebron"""
import sys, os
import numpy as np
from PIL import Image, ImageFilter
ART, OUT = sys.argv[1], sys.argv[2]
src = open(os.path.join(os.path.dirname(__file__), "key_w7.py"), encoding="utf-8").read()
ns = {}; exec(src.split("d = os.path.join")[0].replace("ART, OUT = sys.argv[1], sys.argv[2]", "ART = OUT = ''"), ns); key = ns["key"]
def wrap(im, o=180):   # (RGB, or RGBA once keyed)   # (Gemini's aren't made to repeat: the right end crossfaded into the left, so the seam doesn't show)
    a = np.asarray(im).astype(np.float32); w = a.shape[1]; t = np.linspace(0, 1, o)[None, :, None]
    if a.shape[2] == 4: a[..., :3] *= a[..., 3:] / 255   # (keyed: blended premultiplied, so the clear parts add no color)
    out = a[:, :w - o].copy(); out[:, :o] = a[:, w - o:] * (1 - t) + a[:, :o] * t
    if a.shape[2] == 4: out[..., :3] /= np.maximum(out[..., 3:], 1) / 255
    return Image.fromarray(out.clip(0, 255).astype(np.uint8))
def up(im): im = im.resize((round(im.width * 720 / im.height), 720), Image.LANCZOS); return im.filter(ImageFilter.UnsharpMask(2, 60, 2))
ROOMS = { "road": ["far", "mid", "near"], "hebron": ["far", "mid", "near"], "gate": ["mid"], "gibeon": ["far", "mid"],
          "chase": ["far", "mid", "near"], "feast": ["far", "mid"] }
for room, lays in ROOMS.items():
    d = os.path.join(OUT, room); os.makedirs(d, exist_ok=True)
    for lay in lays:
        im = up(Image.open(os.path.join(ART, f"{room} {lay}.jpg")).convert("RGB"))
        if lay == "far": wrap(im).save(os.path.join(d, "far.jpg"), quality=88); continue
        k = key(im)
        if room != "gate": k = wrap(k, 120)   # (after the keying, so no green is mixed into the seam)
        if room == "feast":   # (the thin flagpoles key away with the green: the flags left floating are taken out)
            from scipy import ndimage
            a = np.asarray(k).copy(); lab, n = ndimage.label(a[..., 3] > 40); sz = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
            for i, z in enumerate(sz):
                if z < 6000: a[lab == i + 1, 3] = 0
            k = Image.fromarray(a)
        bb = k.getchannel("A").getbbox(); k = k.crop((0, bb[1], k.width, bb[3]))
        if lay == "near" and room != "hebron":
            a = np.asarray(k).copy(); FADE = 50; a[:FADE, :, 3] = (a[:FADE, :, 3] * np.linspace(0, 1, FADE)[:, None] ** 1.5).astype(np.uint8); k = Image.fromarray(a)
        k.save(os.path.join(d, f"{lay}.png"), optimize=True); print(room, lay, "top", bb[1], "size", k.size)
