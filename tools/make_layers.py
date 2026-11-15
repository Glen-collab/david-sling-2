"""An outdoor room's three layers from Glen's pictures (Keilah, 11-14: "the layered look like we did for David 1"):
far (the full picture, sky and all), mid (keyed: the sky out) and near (keyed: everything above its strip out).
Magenta (#FF00FF) or green (#00FF00) key: magenta where the scene is full of leaves.

python tools/make_layers.py <far> <mid> <near> <out dir> --key magenta [--mid-h 560] [--near-h 640] [--near-bottom 0.95]

  far  -> far.jpg, 720 tall, ends blended so it repeats
  mid  -> mid.png, keyed, cropped to what's painted, --mid-h tall at the bottom of a 640-tall layer (the room's midY)
  near -> near.png, keyed, cut at --near-bottom (a fraction of the picture's height: where its own ground meets the game's),
          --near-h tall (room: near, nearY = its bottom; default GR*T+20)
"""
import argparse, os
import numpy as np
from PIL import Image, ImageFilter

ap = argparse.ArgumentParser(); ap.add_argument("far"); ap.add_argument("mid"); ap.add_argument("near"); ap.add_argument("out")
ap.add_argument("--key", default="magenta"); ap.add_argument("--mid-h", type=int, default=560)
ap.add_argument("--near-h", type=int, default=220); ap.add_argument("--near-bottom", type=float, default=1.0)
ap.add_argument("--overlap", type=int, default=140)
a = ap.parse_args(); os.makedirs(a.out, exist_ok=True)

def key(im):
    x = np.asarray(im.convert("RGB")).astype(float); r, g, b = x[..., 0], x[..., 1], x[..., 2]
    d = (np.minimum(r, b) - g) if a.key == "magenta" else (g - np.maximum(r, b))
    alpha = np.clip((150 - d) / 70, 0, 1)        # d 150+ (the screen): gone; d 80 or less (thistles, pink stone): kept
    # the fringe (within 10 px of the screen): its key color taken out (11-14: a pink rim round the leaves)
    m = Image.fromarray(((alpha < 0.9) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(21))
    near = np.asarray(m) > 0
    if a.key == "magenta":
        ex = np.clip(np.minimum(r, b) - g, 0, None) * near
        x[..., 0] = r - ex; x[..., 2] = b - ex
    else:
        ex = np.clip(g - np.maximum(r, b), 0, None) * near
        x[..., 1] = g - ex
    al = Image.fromarray((alpha * 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3))   # one px eaten off the rim
    return Image.fromarray(np.dstack([x.clip(0, 255), np.asarray(al)]).astype(np.uint8), "RGBA")

def blend(im, ov):   # the ends faded into each other: it repeats with no seam
    x = np.asarray(im).astype(float); w = x.shape[1]; k = np.linspace(0, 1, ov)[None, :, None]
    out = x[:, :w - ov].copy(); out[:, :ov] = x[:, :ov] * k + x[:, w - ov:] * (1 - k)
    return Image.fromarray(out.clip(0, 255).astype(np.uint8), im.mode)

far = Image.open(a.far).convert("RGB"); far = far.resize((round(far.width * 720 / far.height), 720), Image.LANCZOS)
blend(far, a.overlap).save(os.path.join(a.out, "far.jpg"), quality=90)

mid = key(Image.open(a.mid)); bb = mid.getchannel("A").point(lambda v: 255 if v > 20 else 0).getbbox()
mid = mid.crop((0, bb[1], mid.width, mid.height))
mid = mid.resize((round(mid.width * a.mid_h / mid.height), a.mid_h), Image.LANCZOS)
can = Image.new("RGBA", (mid.width, 640)); can.paste(mid, (0, 640 - mid.height))
blend(can, a.overlap).save(os.path.join(a.out, "mid.png"))

nr = key(Image.open(a.near)); bot = round(nr.height * a.near_bottom)
bb = nr.getchannel("A").point(lambda v: 255 if v > 20 else 0).getbbox()
nr = nr.crop((0, bb[1], nr.width, bot))
nr = nr.resize((round(nr.width * a.near_h / nr.height), a.near_h), Image.LANCZOS)
blend(nr, a.overlap).save(os.path.join(a.out, "near.png"))
print("->", a.out, "far", far.size, "mid", can.size, "near", nr.size)
