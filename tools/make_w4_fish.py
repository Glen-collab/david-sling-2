"""World 4 (Glen 11-13: "two sprites and one clip of fish we can add in the water to hurt David"): his fish on pink, keyed
and cut into strips of frames, all facing right.

python tools/make_w4_fish.py   (reads Desktop/david-sling-2-art/caves/fish_*, writes assets/sprites/w4_fish_*.png + .json)

- w4_fish_tilapia: his first sheet, 4 frames (a swim: tail straight, up, straight, down)
- w4_fish_perch: his second, 4 frames (0: tail up, 1: straight, 2: curled down, 3: straight)
- w4_fish_biter: his clip, at 12 a second: swimming, then the jaws open (frames listed in the .json: swim, bite)
"""
import os, json, subprocess, tempfile, glob
import numpy as np
from PIL import Image

HERE = os.path.dirname(__file__)
ART = os.path.join(HERE, "..", "..", "david-sling-2-art", "caves")
OUT = os.path.join(HERE, "..", "assets", "sprites")

def key(im):   # off with the pink (his backgrounds: bright pink / magenta), the pink taken out of the edges
    a = np.asarray(im.convert("RGB")).astype(float)
    bg = np.median(np.concatenate([a[:8, :].reshape(-1, 3), a[-8:, :].reshape(-1, 3)]), axis=0)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    pink = (r + b) / 2 - g                      # how pink (the fish are greys and browns; their gills a little pink)
    pbg = (bg[0] + bg[2]) / 2 - bg[1]
    d = np.sqrt(((a - bg) ** 2).sum(-1))
    alpha = np.clip(np.minimum((d - 45) / 60, (pbg - pink) / (pbg * 0.45)), 0, 1)
    alpha = np.maximum(alpha, (d > 150))        # (far from the pink: fish)
    sp = np.clip(pink - 20, 0, None) * (1 - alpha)   # the pink spill at the edges
    a2 = a.copy(); a2[..., 0] -= sp * 0.5; a2[..., 2] -= sp * 0.5
    out = Image.fromarray(np.dstack([a2, alpha * 255]).clip(0, 255).astype(np.uint8))
    m = out.getchannel("A").point(lambda v: 0 if v < 40 else v)   # (the faint haze off)
    out.putalpha(m); return out

def centered(frames):   # (his clip: the fish drifts) each frame moved so its middle (of the fish) is where the first one's is
    cs = [np.argwhere(np.asarray(f.getchannel("A")) > 128).mean(0) for f in frames]
    out = []
    for f, c in zip(frames, cs):
        g = Image.new("RGBA", f.size, (0, 0, 0, 0)); g.paste(f, (round(cs[0][1] - c[1]), round(cs[0][0] - c[0]))); out.append(g)
    return out

def split(im, n):   # n fish side by side: cut at the emptiest column near each nth of the width (a tail can reach over)
    col = np.asarray(im.getchannel("A")).astype(float).sum(0); w = im.width // n; cuts = [0]
    for i in range(1, n): lo, hi = i * w - 90, i * w + 90; cuts.append(lo + int(np.argmin(col[lo:hi])))
    cuts.append(im.width)
    return [im.crop((cuts[i], 0, cuts[i + 1], im.height)).crop((0, 0, max(cuts[j + 1] - cuts[j] for j in range(n)), im.height)) for i in range(n)]

def strip(frames, name, length, extra=None):   # the frames on one strip, the same box (their union), length px nose to tail
    boxes = [f.getchannel("A").point(lambda v: 255 if v > 100 else 0).getbbox() for f in frames]
    x0 = min(b[0] for b in boxes) - 6; y0 = min(b[1] for b in boxes) - 6; x1 = max(b[2] for b in boxes) + 6; y1 = max(b[3] for b in boxes) + 6
    frames = [f.crop((x0, y0, x1, y1)) for f in frames]
    s = length / (x1 - x0); fw, fh = round((x1 - x0) * s), round((y1 - y0) * s)
    sheet = Image.new("RGBA", (fw * len(frames), fh), (0, 0, 0, 0))
    for i, f in enumerate(frames): sheet.paste(f.resize((fw, fh), Image.LANCZOS), (i * fw, 0))
    sheet.save(os.path.join(OUT, name + ".png"))
    meta = {"w": fw, "h": fh, "n": len(frames)}; meta.update(extra or {})
    print(name, meta)   # (sizes: R4.FISH in adullam.js; no .json here: make_manifest.py reads every .json in sprites as a sheet)

for src, name, length in [("fish_tilapia_sheet.png", "w4_fish_tilapia", 200), ("fish_perch_sheet.png", "w4_fish_perch", 240)]:
    im = key(Image.open(os.path.join(ART, src))); fr = split(im, 4)
    # (each fish lined up on its eye: its right end, nose, at the same place)
    rx = [f.getchannel("A").point(lambda v: 255 if v > 100 else 0).getbbox() for f in fr]
    W0 = max(f.width for f in fr) + 200; al = []
    for f, b in zip(fr, rx):
        g = Image.new("RGBA", (W0, f.height), (0, 0, 0, 0)); g.paste(f, (W0 - 20 - b[2], 0)); al.append(g)
    strip(al, name, length)

clip = os.path.join(ART, "fish_biter_clip.mp4")
with tempfile.TemporaryDirectory() as td:
    subprocess.run(["ffmpeg", "-v", "error", "-i", clip, "-vf", "fps=12", os.path.join(td, "f%03d.png")], check=True)
    fr = centered([key(Image.open(p)) for p in sorted(glob.glob(os.path.join(td, "f*.png")))])
n = len(fr)
strip(fr, "w4_fish_biter", 260, {"swim": [0, round(n * 0.55)], "bite": [round(n * 0.62), n]})
