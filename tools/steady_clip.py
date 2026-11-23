"""Undo a camera move (pan, tilt, zoom) in a green-screen clip, by tracking a part of the character that stays put.

usage:
  python tools/steady_clip.py <clip.mp4> <out.mp4> [--track left|right|bottom] [--frac F] [--canvas S]

  --track   which part of the character stays still: the leftmost (default), rightmost or bottom F of him
            (Saul waking, 11-23: his feet, on the left, stay on the ground while he sits up and the camera zooms in).
  --frac    how much of him to track (default 0.25).
  --canvas  the steadied video is S times the clip's size (default 1.6), so nothing is cut off when the camera has
            zoomed in and we zoom back out.

Each frame is matched to the one before it (Lucas-Kanade flow on corners in the tracked part, a similarity fitted with
RANSAC), the moves are chained back to frame 1, and every frame is warped into frame 1's camera, with green outside.
Then run tools/vid2sprite.py on the result. Needs opencv-python-headless, numpy and ffmpeg.
"""
import argparse, subprocess
import cv2, numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("clip"); ap.add_argument("out")
ap.add_argument("--track", choices=["left", "right", "bottom"], default="left")
ap.add_argument("--pan", default="", help="instead of tracking: where a still thing is (video x) at some frames, 'frame:x,frame:x,...' (1-based; between them it's eased, after the last it holds). The camera only pans. (The young man, 11-23: the spear's tip as it lies on the ground.)")
ap.add_argument("--frac", type=float, default=0.25); ap.add_argument("--canvas", type=float, default=1.6)
args = ap.parse_args()

cap = cv2.VideoCapture(args.clip); fps = cap.get(cv2.CAP_PROP_FPS)
frames = []
while True:
    ok, f = cap.read()
    if not ok: break
    frames.append(f)
h, w = frames[0].shape[:2]

def mask_of(f):
    b, g, r = [f[..., i].astype(int) for i in range(3)]
    m = ((g - np.maximum(r, b)) < 40).astype(np.uint8)   # not green screen
    return cv2.erode(m, np.ones((5, 5), np.uint8))

def region(f):
    m = mask_of(f); ys, xs = np.nonzero(m)
    x0, x1, y0, y1 = xs.min(), xs.max(), ys.min(), ys.max()
    sel = np.zeros_like(m)
    if args.track == "left": sel[:, x0:int(x0 + (x1 - x0) * args.frac)] = 1
    elif args.track == "right": sel[:, int(x1 - (x1 - x0) * args.frac):x1 + 1] = 1
    else: sel[int(y1 - (y1 - y0) * args.frac):y1 + 1, :] = 1
    return m * sel

def fit_st(src, dst, iters=400, tol=3.0):
    """scale + shift only (the camera zooms and pans; it doesn't roll): dst = s * src + t, RANSAC"""
    best, rng = None, np.random.default_rng(1)
    for _ in range(iters):
        i, j = rng.choice(len(src), 2, replace=False)
        d = np.linalg.norm(src[i] - src[j])
        if d < 8: continue
        s = np.linalg.norm(dst[i] - dst[j]) / d; t = dst[i] - s * src[i]
        n = (np.linalg.norm(s * src + t - dst, axis=1) < tol).sum()
        if best is None or n > best[0]: best = (n, s, t)
    n, s, t = best
    ok = np.linalg.norm(s * src + t - dst, axis=1) < tol   # refit on the inliers
    A = np.c_[np.r_[src[ok][:, 0], src[ok][:, 1]], np.r_[np.ones(ok.sum()), np.zeros(ok.sum())], np.r_[np.zeros(ok.sum()), np.ones(ok.sum())]]
    s, tx, ty = np.linalg.lstsq(A, np.r_[dst[ok][:, 0], dst[ok][:, 1]], rcond=None)[0]
    return np.array([[s, 0, tx], [0, s, ty], [0, 0, 1]]), ok.sum()

if args.pan:
    keys = sorted((int(a) - 1, float(b)) for a, b in (k.split(":") for k in args.pan.split(",")))
    fx, xx = np.array([k[0] for k in keys]), np.array([k[1] for k in keys])
    ref = xx[-1]
    Ms = [np.array([[1, 0, ref - np.interp(i, fx, xx)], [0, 1, 0], [0, 0, 1]]) for i in range(len(frames))]
# every frame matched straight to frame 1 (no drift), on the tracked part (his feet), ORB so the zoom doesn't matter
if not args.pan:
  orb = cv2.ORB_create(2000, scaleFactor=1.15, nlevels=10)
  bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
  g0 = cv2.cvtColor(frames[0], cv2.COLOR_BGR2GRAY); k0, d0 = orb.detectAndCompute(g0, region(frames[0]))
  Ms, last = [], np.eye(3)
  for i, f in enumerate(frames):
      if i == 0: Ms.append(np.eye(3)); continue
      g = cv2.cvtColor(f, cv2.COLOR_BGR2GRAY); k, d = orb.detectAndCompute(g, region(f))
      if d is None: Ms.append(last); continue
      m = bf.match(d, d0)
      if len(m) < 8: Ms.append(last); continue
      src = np.float32([k[x.queryIdx].pt for x in m]); dst = np.float32([k0[x.trainIdx].pt for x in m])
      M, n = fit_st(src, dst)
      if n < 6: M = last
      Ms.append(M); last = M
  # smooth it (a real camera move is smooth; the jitter is the tracking)
  P = np.array([[M[0, 0], M[0, 2], M[1, 2]] for M in Ms])
  r = 6; Q = np.array([np.median(P[max(0, i - r):i + r + 1], axis=0) for i in range(len(P))])
  Q = np.array([Q[max(0, i - r):i + r + 1].mean(axis=0) for i in range(len(Q))])
  Ms = [np.array([[s, 0, tx], [0, s, ty], [0, 0, 1]]) for s, tx, ty in Q]

S = args.canvas; cw, ch = int(w * S) // 2 * 2, int(h * S) // 2 * 2
off = np.array([[1, 0, (cw - w) / 2], [0, 1, (ch - h) / 2], [0, 0, 1]])
for i in range(0, len(frames), max(1, len(frames) // 12)):
    s = np.sqrt(abs(np.linalg.det(Ms[i][:2, :2])))
    print(f"frame {i + 1}: zoom x{1 / s:.3f}, shift {Ms[i][0, 2]:.0f},{Ms[i][1, 2]:.0f}")
p = subprocess.Popen(["ffmpeg", "-v", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24", "-s", f"{cw}x{ch}", "-r", str(fps),
                      "-i", "-", "-c:v", "libx264", "-crf", "8", "-pix_fmt", "yuv444p", args.out], stdin=subprocess.PIPE)
for f, Mi in zip(frames, Ms):
    out = cv2.warpAffine(f, (off @ Mi)[:2], (cw, ch), flags=cv2.INTER_LINEAR, borderMode=cv2.BORDER_CONSTANT, borderValue=(0, 255, 0))
    p.stdin.write(out.tobytes())
p.stdin.close(); p.wait()
