"""An outdoor room's three layers from Glen's pictures (11-10: the road down to Gath): far (sky), mid (hills on green)
and ground (on green), each scaled for the game and blended end to end so it repeats with no seam.

python tools/make_outdoor_layers.py <far.png> <mid.png> <ground.png> <out dir> [--mid-h 560] [--ground-crop 260]

  far    -> far.jpg, 720 tall (the room's sky and distance)
  mid    -> mid.png, green keyed, the hills --mid-h tall at the bottom of a 640-tall layer (drawn at the room's midY)
  ground -> ground.png, green keyed, cut from --ground-crop px down, scaled so the flat dirt top lands 108 px above the
            bottom (the game's ground line): the room's floor (r.floor), its grass standing up over the ground tiles
"""
import argparse, os
import numpy as np
from PIL import Image

ap = argparse.ArgumentParser(); ap.add_argument("far"); ap.add_argument("mid"); ap.add_argument("ground"); ap.add_argument("out")
ap.add_argument("--mid-h", type=int, default=300); ap.add_argument("--ground-crop", type=int, default=260)
ap.add_argument("--ground-top", type=int, default=385, help="the flat dirt's top in the ground picture (px down)")
ap.add_argument("--overlap", type=int, default=120)
args = ap.parse_args(); os.makedirs(args.out, exist_ok=True)

def key(im):
    a = np.asarray(im.convert("RGB")).astype(float); r, g, b = a[..., 0], a[..., 1], a[..., 2]
    spill = g - np.maximum(r, b); alpha = np.clip(1 - (spill - 25) / 50, 0, 1)
    a[..., 1] = np.minimum(g, np.maximum(r, b) + 8)
    return Image.fromarray(np.dstack([a, alpha * 255]).astype(np.uint8), "RGBA")

def blend(im, ov):   # the ends faded into each other: it repeats with no seam
    a = np.asarray(im).astype(float); W = a.shape[1]; k = np.linspace(0, 1, ov)[None, :, None]
    out = a[:, :W - ov].copy(); out[:, :ov] = a[:, :ov] * k + a[:, W - ov:] * (1 - k)
    return Image.fromarray(out.clip(0, 255).astype(np.uint8), im.mode)

far = Image.open(args.far).convert("RGB"); far = far.resize((round(far.width * 720 / far.height), 720), Image.LANCZOS)
blend(far, args.overlap).save(os.path.join(args.out, "far.jpg"), quality=90)
mid = key(Image.open(args.mid)); bb = mid.getbbox(); mid = mid.crop((0, bb[1], mid.width, bb[3]))
mid = mid.resize((round(mid.width * args.mid_h / mid.height), args.mid_h), Image.LANCZOS)
can = Image.new("RGBA", (mid.width, 640)); can.paste(mid, (0, 640 - mid.height)); mid = can   # (the hills at the bottom of a 640-tall layer, as fields_mid: drawn at midY)
blend(mid, args.overlap).save(os.path.join(args.out, "mid.png"))
gr = key(Image.open(args.ground)); gr = gr.crop((0, args.ground_crop, gr.width, gr.height))
k = 108 / (gr.height + args.ground_crop - args.ground_top); gr = gr.resize((round(gr.width * k), round(gr.height * k)), Image.LANCZOS)
blend(gr, args.overlap).save(os.path.join(args.out, "ground.png"))
print("->", args.out, "far", far.size, "mid", mid.size, "ground", gr.size)
