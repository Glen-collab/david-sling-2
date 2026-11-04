"""Paint a clip's wall and floor green when the camera moves (so paint_still_green can't): the floor is the rows
the non-green spans nearly edge to edge, and the wall is whatever non-green touches the frame's left edge.

python tools/drop_props.py <clip.mp4> <out.mp4> [--floor 0.7]

For Glen's jump-off-the-wall clip (2026-11-03): once David is off the wall he never touches the left edge.
"""
import argparse, glob, os, subprocess, tempfile
import numpy as np
from PIL import Image
from scipy import ndimage

ap = argparse.ArgumentParser(); ap.add_argument("clip"); ap.add_argument("out"); ap.add_argument("--floor", type=float, default=0.7)
args = ap.parse_args()
tmp = tempfile.mkdtemp()
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", args.clip, os.path.join(tmp, "f%04d.png")], check=True)
files = sorted(glob.glob(os.path.join(tmp, "f*.png")))
green = None
for f in files:
    a = np.asarray(Image.open(f).convert("RGB")).astype(np.int16)
    scr = (a[..., 1] > a[..., 0] + 40) & (a[..., 1] > a[..., 2] + 40)
    if green is None: green = np.median(a[scr], axis=0)
    m = ~scr
    floor = m.mean(axis=1) > args.floor   # rows the floor runs across
    m2 = m.copy(); m2[floor] = False
    lab, k = ndimage.label(ndimage.binary_opening(m2, iterations=1))
    left = set(np.unique(lab[:, :3])) - {0}
    drop = floor[:, None] | np.isin(lab, list(left))
    drop = ndimage.binary_dilation(drop, iterations=2) & m & (np.isin(lab, list(left)) | floor[:, None] | (lab == 0))
    o = a.copy(); o[drop] = green
    Image.fromarray(o.astype(np.uint8)).save(f)
fps = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate", "-of", "csv=p=0", args.clip],
                     capture_output=True, text=True).stdout.strip().split("\n")[0]
subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", fps, "-i", os.path.join(tmp, "f%04d.png"), "-c:v", "libx264", "-crf", "12",
                "-pix_fmt", "yuv420p", args.out], check=True)
print("->", args.out)
