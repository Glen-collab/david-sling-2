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
def despill(k):   # (the green screen leaves a green line along the edges: the outer 4px no greener than red)
    from scipy import ndimage
    a = np.asarray(k).astype(np.float32).copy(); e = ndimage.minimum_filter(a[..., 3], size=9) < 250
    a[..., 1][e] = np.minimum(a[..., 1], np.maximum(a[..., 0], a[..., 2]) * 0.95)[e]; return Image.fromarray(a.clip(0, 255).astype(np.uint8))
def out(room): d = os.path.join(OUT, room); os.makedirs(d, exist_ok=True); return d
for room, lays in {"jvalley": ["far", "mid", "near"], "gorge": ["far", "near"], "zion": ["far", "mid", "near"], "rephaim": ["far", "mid", "near"]}.items():
    d = out(room)
    for lay in lays:
        im = up(open_(room, lay, " wide" if (room, lay) in WIDE else ""))
        if lay == "far": wrap(im).save(os.path.join(d, "far.jpg"), quality=88); continue
        if (room, lay) == ("jvalley", "mid"):   # (the wall: drawn once, not repeated: its right end goes off into the distance)
            k, top = crop(despill(key(im))); k.save(os.path.join(d, "wall.png"), optimize=True); print(room, "wall top", top, "size", k.size); continue
        k, top = crop(wrap(key(im) if room == "rephaim" else despill(key(im)), 120))   # (not his green trees and grass)
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
    from scipy import ndimage   # (the green screen left a green line on its edges: the outer 4px no greener than the rock is)
    e = ndimage.minimum_filter(a[..., 3], size=9) < 250
    a[..., 1][e] = np.minimum(a[..., 1], a[..., 0] * 0.86)[e]
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
# (Glen 11-27: the bridge "looks too fake") his rocky edge's flat top and cracked blocks, no loose rocks on top: the
#  bridge, once the sand shows it (jerusalem.js jrDraw draws each stone's own slice of it, so they join up)
k = key(up(open_("gorge", "near", " wide"))); al = np.asarray(k)[..., 3]; r0 = int(np.where(al.mean(1) > 200)[0][0]) - 30
b = despill(k).crop((0, r0 + 45, k.width, k.height)); b = wrap(b, 120)
a = np.asarray(b).astype(np.float32).copy(); F = 26; a[-F:, :, 3] *= np.linspace(1, 0, F)[:, None] ** 0.8; a[:3, :, 3] *= np.array([0.5, 0.8, 0.95])[:, None]
Image.fromarray(a.clip(0, 255).astype(np.uint8)).save(os.path.join(out("gorge"), "bridge.png"), optimize=True); print("gorge bridge", b.size)
# (Glen 11-27: "tileable_wall" and "fortress_wall" with the door, the floor in them for David to run on) Below
#  Jerusalem is his fortress wall, its gate at the right: drawn at the ground line (its dirt's top is y 612, the
#  game's ground line). The faint haze in the sky off (not the flag)
for nm in ("fortress_wall", "tileable_wall"):
    a = np.asarray(Image.open(os.path.join(ART, nm + ".png")).convert("RGBA")).copy(); s = a[:150, :, 3]; s[s < 90] = 0
    Image.fromarray(a).save(os.path.join(out("jvalley"), nm + ".png"), optimize=True); print("jvalley", nm, a.shape[1], "x", a.shape[0])
# (Glen 11-27: "jvalley mid" resaved on white, a side put on the wall's left end) keyed off its white, not green:
#  py "<scratchpad>/wallkey.py" logic, kept here
def keyWhite(im):
    from scipy import ndimage
    a = np.asarray(im).astype(np.float32); d = 255 - a.min(2); bg = d < 40
    lab, n = ndimage.label(bg); edge = set(np.unique(np.r_[lab[0], lab[-1], lab[:, 0], lab[:, -1]])) - {0}
    bg = np.isin(lab, list(edge)); dist = ndimage.distance_transform_edt(~bg)   # (only the white that reaches the picture's edge)
    al = np.clip(dist / 2.5, 0, 1) * np.clip((d - 12) / 40, 0, 1) ** 0.5; al[dist > 3] = 1
    a4 = np.dstack([a, al * 255]); inner = ndimage.grey_erosion(a4[..., :3], size=(5, 5, 1)); e = (dist > 0) & (dist < 4)
    a4[..., :3][e] = np.minimum(a4[..., :3][e], inner[e] * 1.05); a4[:, :6, 3] = 0
    return Image.fromarray(a4.clip(0, 255).astype(np.uint8))
im = Image.open(os.path.join(ART, "jvalley mid.jpg")).convert("RGB"); im = im.resize((round(im.width * 720 / im.height), 720), Image.LANCZOS)
k, top = crop(keyWhite(im)); k.save(os.path.join(out("jvalley"), "wall.png"), optimize=True); print("jvalley wall (white key) top", top, "size", k.size)
# (Glen 11-27: "gorge_bridge" resaved "so it looks more like a bridge", already clear around it) cropped, its green line
#  off; drawn at its own size (JR.BRIDGE.K 1), one span from under the left cliff (overrides the bridge above)
b = np.asarray(Image.open(os.path.join(ART, "gorge_bridge.png")).convert("RGBA")).astype(np.float32); ys = np.where(b[..., 3].max(1) > 24)[0]; b = b[ys.min():ys.max() + 1]
b[..., 1] = np.minimum(b[..., 1], np.maximum(b[..., 0], b[..., 2]) * 0.97)
Image.fromarray(b.clip(0, 255).astype(np.uint8)).save(os.path.join(out("gorge"), "bridge.png"), optimize=True); print("gorge bridge (Glen's)", b.shape[1], "x", b.shape[0])
