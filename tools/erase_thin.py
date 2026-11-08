# (Glen 11-08) Erase thin props (a ladder's rails and rungs, a rope) from a green-screen clip before vid2sprite:
# anything thinner than K px that isn't touching the body is painted back to the green.
# python tools/erase_thin.py in.mp4 out.mp4 [K=11] [KEEP=6]
import sys, os, subprocess, tempfile, glob, numpy as np
from PIL import Image; from scipy import ndimage
src, dst = sys.argv[1], sys.argv[2]; K = int(sys.argv[3]) if len(sys.argv) > 3 else 11; KEEP = int(sys.argv[4]) if len(sys.argv) > 4 else 6
tmp = tempfile.mkdtemp(); subprocess.run(["ffmpeg", "-v", "error", "-i", src, f"{tmp}/f%04d.png"], check=True)
files = sorted(glob.glob(f"{tmp}/f*.png")); green = None
for f in files:
    a = np.asarray(Image.open(f).convert("RGB")).astype(int); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    bgm = (g - np.maximum(r, b)) > 60
    if green is None: green = np.median(a[bgm], axis=0).astype(np.uint8)
    fg = ~bgm
    body = ndimage.binary_opening(fg, structure=np.ones((K, K)))
    lab, n = ndimage.label(body)
    if n:
        sz = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1)); body = lab == (1 + int(np.argmax(sz)))
    keep = fg & ndimage.binary_dilation(body, iterations=KEEP)
    out = a.astype(np.uint8).copy(); out[bgm | (ndimage.binary_dilation(fg & ~keep, iterations=3) & ~keep)] = green   # (and the rails' soft green edges)
    Image.fromarray(out).save(f)
subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", "24", "-i", f"{tmp}/f%04d.png", "-c:v", "libx264", "-crf", "8", "-pix_fmt", "yuv444p", dst], check=True)
print(len(files), "frames ->", dst)
