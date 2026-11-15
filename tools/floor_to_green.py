"""A green-screen clip shot with a strip of ground under the figure (Glen's Erem clips, 11-15): the ground painted green
so vid2sprite can key it. Only ground-coloured pixels below --top that join up with the frame's left or right edge go
(the figure lying or sitting on it keeps his own warm skin and brown sandals: they don't reach the edges).

python tools/floor_to_green.py <clip.mp4> <out.mp4> --top Y [--kind dirt|slate]
"""
import argparse, glob, os, subprocess, tempfile
import numpy as np
from PIL import Image
from scipy import ndimage

ap = argparse.ArgumentParser(); ap.add_argument("clip"); ap.add_argument("out")
ap.add_argument("--top", type=int, required=True); ap.add_argument("--kind", default="dirt")
ap.add_argument("--edge", type=int, default=6)
ap.add_argument("--seeds", default="edges", help="edges: the ground touching the left/right edge; bottom: touching the bottom row (a figure lying across the whole frame)")
a = ap.parse_args()
tmp = tempfile.mkdtemp()
subprocess.run(["ffmpeg", "-v", "error", "-i", a.clip, os.path.join(tmp, "f_%04d.png")], check=True)

def ground(x):
    r, g, b = x[..., 0], x[..., 1], x[..., 2]
    mx, mn = np.maximum(np.maximum(r, g), b), np.minimum(np.minimum(r, g), b)
    grn = (g - np.maximum(r, b)) > 60
    if a.kind == "slate": c = (mx - mn < 30) & (mx < 150)
    else: c = (r >= g) & (g >= b - 6) & (r - b > 28) & (mx > 115)   # warm tan dirt in the light (11-15: his tunic and feet in shade are darker; they stay)
    return c & ~grn

for f in sorted(glob.glob(os.path.join(tmp, "f_*.png"))):
    x = np.asarray(Image.open(f).convert("RGB")).astype(int)
    H, W = x.shape[:2]
    cand = ground(x); cand[: a.top] = False
    lab, n = ndimage.label(cand)
    edge = set(np.unique(lab[-a.edge:, :])) if a.seeds == "bottom" else set(np.unique(lab[a.top:, : a.edge])) | set(np.unique(lab[a.top:, -a.edge:]))
    edge.discard(0)
    m = np.isin(lab, list(edge))
    # the band's last specks (pebbles, dark cracks) between dirt: closed over, then a 2 px rim taken too
    m = ndimage.binary_closing(m, iterations=1); m[: a.top] = False
    m = ndimage.binary_dilation(m, iterations=1) & ~(np.arange(H)[:, None] < a.top)
    x[m] = (0, 255, 0)
    Image.fromarray(x.astype(np.uint8)).save(f)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", "24", "-i", os.path.join(tmp, "f_%04d.png"), "-c:v", "libx264", "-crf", "10", "-pix_fmt", "yuv444p", a.out], check=True)
print("->", a.out)
