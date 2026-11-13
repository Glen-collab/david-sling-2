"""(Glen 11-13: "Here is a good swipe with the sword") David's sword stroke while swimming, from his clip
(david-sling-2-art/video/david_swim_sword.mp4, the stroke at START-END s), at the same scale as david_swim2 (his swim,
tools/vid2sprite.py) so he doesn't change size when he swings. His clip has a fish drawn in dark green lines where the
sword goes: those (green over the rest) go with the green.

python tools/make_swim_sword.py   -> assets/sprites/david_swim_sword.png + .json (then tools/make_manifest.py)
"""
import os, json, glob, subprocess, tempfile
import numpy as np
from PIL import Image

HERE = os.path.dirname(__file__)
ART = os.path.join(HERE, "..", "..", "david-sling-2-art", "video")
OUT = os.path.join(HERE, "..", "assets", "sprites")
START, END, N = 3.55, 5.45, 12

def frames(clip, start, end, n):
    with tempfile.TemporaryDirectory() as td:
        subprocess.run(["ffmpeg", "-v", "error", "-ss", str(start), "-t", str(end - start), "-i", clip, "-vf", f"fps={n / (end - start)}", os.path.join(td, "f%03d.png")], check=True)
        return [np.asarray(Image.open(p).convert("RGB")).astype(float) for p in sorted(glob.glob(os.path.join(td, "f*.png")))][:n]

def key(a):   # green (and anything green over red and blue: his fish's lines) out
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    al = np.clip(1 - (g - np.maximum(r, b) - 12) / 40, 0, 1)
    a = a.copy(); a[..., 1] = np.minimum(g, np.maximum(r, b) + 6)
    return np.dstack([a, al * 255])

# the scale of his swim sheet: its first frame's David next to the same video frame's
sw = json.load(open(os.path.join(OUT, "david_swim2.json")))
crop = os.path.join(ART, "david_swim2_crop.mp4")
with tempfile.TemporaryDirectory() as td:
    vf = sw["video_frames"][0]
    subprocess.run(["ffmpeg", "-v", "error", "-i", crop, "-vf", f"select=eq(n\\,{vf - 1})", "-vframes", "1", os.path.join(td, "v.png")], check=True)
    v = key(np.asarray(Image.open(os.path.join(td, "v.png")).convert("RGB")).astype(float))
sheet = np.asarray(Image.open(os.path.join(OUT, "david_swim2.png")))
f0 = sheet[:, :sw["frame_w"], 3] > 128
vw = np.where((v[..., 3] > 128).any(0))[0]; fw = np.where(f0.any(0))[0]
K = (fw[-1] - fw[0]) / (vw[-1] - vw[0]); print("scale", round(K, 3))

from scipy import ndimage
def solo(f):   # only David (and his sword): the bits of his fish's lines left over, not joined to him, go
    lab, n = ndimage.label(f[..., 3] > 40)
    if n > 1:
        size = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
        keep = np.isin(lab, [i + 1 for i, z in enumerate(size) if z >= 0.02 * size.max()])
        f[..., 3] *= keep
    return f
fr = [solo(key(a)) for a in frames(os.path.join(ART, "david_swim_sword.mp4"), START, END, N)]
m = np.any([f[..., 3] > 128 for f in fr], axis=0)
ys, xs = np.where(m); x0, x1, y0, y1 = max(0, xs.min() - 8), xs.max() + 8, max(0, ys.min() - 8), ys.max() + 8   # (his feet at the clip's edge)
# where his body is (the first frame's middle, on the strip): the anchor that lines up with the swim's
b0 = np.argwhere(fr[0][..., 3] > 128); cy, cx = b0.mean(0)
W, H = round((x1 - x0) * K), round((y1 - y0) * K)
out = Image.new("RGBA", (W * len(fr), H))
for i, f in enumerate(fr):
    out.paste(Image.fromarray(f[y0:y1, x0:x1].clip(0, 255).astype(np.uint8)).resize((W, H), Image.LANCZOS), (i * W, 0))
out.save(os.path.join(OUT, "david_swim_sword.png"))
meta = {"frames": len(fr), "frame_w": W, "frame_h": H, "ms_per_frame": round((END - START) * 1000 / len(fr)), "loop": False,
        "align": "center", "anchor_x": round((cx - x0) * K), "anchor_y": round((cy - y0) * K), "source": "david_swim_sword.mp4"}
json.dump(meta, open(os.path.join(OUT, "david_swim_sword.json"), "w"), indent=2); print(meta)
