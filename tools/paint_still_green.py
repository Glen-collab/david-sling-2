"""Paint whatever never moves in a still-camera clip green, so vid2sprite keeps only the character.

python tools/paint_still_green.py <clip.mp4> <out.mp4> [--tol 38] [--ref A:B] [--track]

For clips where the character climbs over or jumps off a prop (Glen's wall clips, 2026-11-03): the prop is the same in
every frame, so each frame's pixels that match the background (and aren't green already) become green screen. Where
the character covers the prop, the pixels differ and stay.
  --ref A:B  build the background from only these frames (1-based): ones where the camera is still and the character
             moves around (not the stretch where he sits still on the wall, or he'd be painted out too).
  --track    the camera tilts up or down in some frames: find each frame's shift against the background first.
Prints where the prop sits (video px).
"""
import argparse, glob, os, subprocess, tempfile
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument("clip"); ap.add_argument("out")
ap.add_argument("--tol", type=float, default=38); ap.add_argument("--ref", default=""); ap.add_argument("--track", action="store_true")
args = ap.parse_args()
tmp = tempfile.mkdtemp()
subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", args.clip, os.path.join(tmp, "f%04d.png")], check=True)
files = sorted(glob.glob(os.path.join(tmp, "f*.png")))
frames = np.stack([np.asarray(Image.open(f).convert("RGB")) for f in files]).astype(np.int16)
r0, r1 = (int(v) for v in args.ref.split(":")) if args.ref else (1, len(files))
med = np.median(frames[r0 - 1:r1], axis=0)
r, g, b = med[..., 0], med[..., 1], med[..., 2]
screen = (g > r + 40) & (g > b + 40)
green = np.median(med[screen], axis=0)
ys, xs = np.where(~screen)
print(f"still prop: x {xs.min()}-{xs.max()}, y {ys.min()}-{ys.max()} (video px)")
H = med.shape[0]


def shifted(img, dy):   # the background moved down by dy (green fills what comes in)
    o = np.empty_like(img); o[...] = green
    if dy >= 0: o[dy:] = img[:H - dy]
    else: o[:H + dy] = img[-dy:]
    return o


def is_screen(a):
    return (a[..., 1] > a[..., 0] + 40) & (a[..., 1] > a[..., 2] + 40)


strip = slice(0, max(8, med.shape[1] // 10))   # the left edge: the prop, not the character, for finding the shift
for f, fr in zip(files, frames):
    dy = 0
    if args.track:
        a = is_screen(fr[:, strip]); best = None
        for d in range(-H // 3, H // 3 + 1, 2):
            m = (a != is_screen(shifted(med, d)[:, strip])).mean()
            if best is None or m < best[0]: best = (m, d)
        dy = best[1]
    bg = shifted(med, dy)
    still = ~is_screen(bg)
    same = (np.abs(fr - bg).sum(axis=2) < args.tol) & still
    o = fr.copy(); o[same] = green
    Image.fromarray(o.astype(np.uint8)).save(f)
fps = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries", "stream=r_frame_rate", "-of", "csv=p=0", args.clip],
                     capture_output=True, text=True).stdout.strip().split("\n")[0]
subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", fps, "-i", os.path.join(tmp, "f%04d.png"), "-c:v", "libx264", "-crf", "12",
                "-pix_fmt", "yuv420p", args.out], check=True)
print("->", args.out)
