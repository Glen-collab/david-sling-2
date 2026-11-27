"""Glen 11-26 (Gemini): Jerusalem's rooms, far/mid/near, keyed as key_hebron.py (whose key/wrap/up it borrows).
The gorge's mid is two cliffs: cut apart (cliff_l, cliff_r), drawn at the hole's edges by jerusalem.js. The watercourse
is tall: far (the cave, looking up), mid (a stone pillar: the shaft's sides), near (roots and rocks at its foot).
The valley of Rephaim is keyed for the boss to come.
   py tools/key_jerusalem.py ../david-sling-2-art/w8/jerusalem assets/rooms/w8/jerusalem"""
import sys, os
import numpy as np
from PIL import Image
ART, OUT = sys.argv[1], sys.argv[2]; ARGV = sys.argv[:]
src = open(os.path.join(os.path.dirname(__file__), "key_hebron.py"), encoding="utf-8").read()
ns = {"__file__": os.path.join(os.path.dirname(__file__), "key_hebron.py")}; sys.argv = [sys.argv[0], "", ""]; exec(src.split("ROOMS = {")[0], ns); key, wrap, up = ns["key"], ns["wrap"], ns["up"]
def crop(k): bb = k.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox(); return k.crop((0, bb[1], k.width, bb[3])), bb[1]
def fadeTop(k, F=50):
    a = np.asarray(k).copy(); a[:F, :, 3] = (a[:F, :, 3] * np.linspace(0, 1, F)[:, None] ** 1.5).astype(np.uint8); return Image.fromarray(a)
def open_(room, lay, alt=""):   # (Glen's wide ones, 11-26, when he sent one: longer before they repeat)
    f = os.path.join(ART, f"{room} {lay}{alt}.jpg"); f = f if alt and os.path.exists(f) else os.path.join(ART, f"{room} {lay}.jpg")
    return Image.open(f).convert("RGB")
WIDE = {("jvalley", "near"), ("gorge", "mid"), ("gorge", "near"), ("zion", "mid"), ("zion", "near"), ("rephaim", "mid"), ("rephaim", "near")}
# (not the wall's wide one: its wall is far off and low, and the Jebusites stand on the near one)
def out(room): d = os.path.join(OUT, room); os.makedirs(d, exist_ok=True); return d
for room, lays in {"jvalley": ["far", "mid", "near"], "gorge": ["far", "near"], "zion": ["far", "mid", "near"], "rephaim": ["far", "mid", "near"]}.items():
    d = out(room)
    for lay in lays:
        im = up(open_(room, lay, " wide" if (room, lay) in WIDE else ""))
        if lay == "far": wrap(im).save(os.path.join(d, "far.jpg"), quality=88); continue
        if (room, lay) == ("jvalley", "mid"):   # (the wall: drawn once, not repeated: its right end goes off into the distance)
            k, top = crop(key(im)); k.save(os.path.join(d, "wall.png"), optimize=True); print(room, "wall top", top, "size", k.size); continue
        k, top = crop(wrap(key(im), 120))
        if lay == "near" and room != "zion": k = fadeTop(k)
        k.save(os.path.join(d, f"{lay}.png"), optimize=True); print(room, lay, "top", top, "size", k.size)
# the gorge's cliffs, apart
d = out("gorge"); k = key(up(open_("gorge", "mid", " wide"))); a = np.asarray(k)
cols = np.where(a[..., 3].max(0) > 40)[0]; gap = np.where(np.diff(cols) > 20)[0][0]; xl, xr = cols[gap] + 1, cols[gap + 1]
for nm, box in (("cliff_l", (0, 0, xl + 4, k.height)), ("cliff_r", (xr - 4, 0, k.width, k.height))):
    c, top = crop(k.crop(box))
    # (Glen 11-27: "fade the cliff edge to melt into the regular road") its outer end fades out over the floor, and its
    #  top (the flat ledge behind, a hard block) fades in
    a = np.asarray(c).astype(np.float32).copy(); w = a.shape[1]; S, F = 170, 70
    ramp = np.clip(np.arange(w) / S, 0, 1) if nm == "cliff_l" else np.clip((w - 1 - np.arange(w)) / S, 0, 1)
    a[..., 3] *= (ramp ** 1.3)[None, :]
    a[:F, :, 3] *= (np.linspace(0, 1, F) ** 1.5)[:, None]
    c = Image.fromarray(a.clip(0, 255).astype(np.uint8))
    c.save(os.path.join(d, nm + ".png"), optimize=True); print("gorge", nm, "top", top, "size", c.size)
# the watercourse
d = out("shaft")
up(open_("shaft", "far"), 1296 / 576).save(os.path.join(d, "far.jpg"), quality=86)
k = key(up(open_("shaft", "mid"), 1.25)); bb = k.getchannel("A").point(lambda v: 255 if v > 24 else 0).getbbox()
k = k.crop((bb[0], 0, bb[2], int(k.height * 0.8)))   # (its foot darkens: off, then its ends crossfaded top to bottom so it repeats up the shaft)
k = wrap(k.transpose(Image.Transpose.ROTATE_90), 80).transpose(Image.Transpose.ROTATE_270)
k.save(os.path.join(d, "pillar.png"), optimize=True); print("shaft pillar", k.size)
k = key(up(open_("shaft", "near", " 2"), 1296 / 576)); k, top = crop(k)
a = np.asarray(k).astype(np.int16).copy(); e = a[..., 3] < 250   # (the thin roots' edges keyed purple: no more blue or red than a brown root has)
a[..., 2][e] = np.minimum(a[..., 2], a[..., 1])[e]; a[..., 0][e] = np.minimum(a[..., 0], (a[..., 1] * 1.35).astype(np.int16))[e]; k = Image.fromarray(a.clip(0, 255).astype(np.uint8)); k.save(os.path.join(d, "near.png"), optimize=True); print("shaft near top", top, "size", k.size)
