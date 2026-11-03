"""Paint whatever never moves in a still-camera clip green, so vid2sprite keeps only the character.

python tools/paint_still_green.py <clip.mp4> <out.mp4> [--tol 38]

For clips where the character climbs over a prop (Glen's wall climb, 2026-11-03): the wall is the same in every
frame, so each frame's pixels that match the clip's median (and aren't green already) become green screen. Where
the character covers the wall, the pixels differ from the median and stay. Prints where the prop sits (video px).
"""
import argparse, glob, os, subprocess, tempfile
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument("clip"); ap.add_argument("out"); ap.add_argument("--tol", type=float, default=38)
args = ap.parse_args()
tmp = tempfile.mkdtemp()
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", args.clip, os.path.join(tmp, "f%04d.png")], check=True)
files = sorted(glob.glob(os.path.join(tmp, "f*.png")))
frames = np.stack([np.asarray(Image.open(f).convert("RGB")) for f in files]).astype(np.int16)
med = np.median(frames, axis=0)
r, g, b = med[..., 0], med[..., 1], med[..., 2]
screen = (g > r + 40) & (g > b + 40)
green = np.median(med[screen], axis=0)
still = ~screen
ys, xs = np.where(still)
print(f"still prop: x {xs.min()}-{xs.max()}, y {ys.min()}-{ys.max()} (video px)")
for f, fr in zip(files, frames):
    same = (np.abs(fr - med).sum(axis=2) < args.tol) & still
    o = fr.copy(); o[same] = green
    Image.fromarray(o.astype(np.uint8)).save(f)
fps = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate", "-of", "csv=p=0", args.clip],
                     capture_output=True, text=True).stdout.strip().split("\n")[0]
subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", fps, "-i", os.path.join(tmp, "f%04d.png"), "-c:v", "libx264", "-crf", "12",
                "-pix_fmt", "yuv420p", args.out], check=True)
print("->", args.out)
