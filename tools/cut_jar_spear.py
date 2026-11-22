"""Glen's Saul's jar and spear (11-21, one picture on green): keyed, split, cropped -> assets/items/saul_jar.png, saul_spear.png
python tools/cut_jar_spear.py "<picture>"   (the jar is the left half, the spear the right)"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage
x = np.asarray(Image.open(sys.argv[1]).convert("RGB")).astype(float); r, g, b = x[..., 0], x[..., 1], x[..., 2]
d = g - np.maximum(r, b); alpha = np.clip((110 - d) / 50, 0, 1)
x[..., 1] = g - np.clip(d - 10, 0, None) * (alpha < 0.98)   # despill the rim
mid = x.shape[1] // 2
for name, sl, h in [("saul_jar", slice(0, mid), 400), ("saul_spear", slice(mid, None), 700)]:
    a = alpha[:, sl].copy(); lab, n = ndimage.label(a > 0.5)
    big = np.argmax(ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))) + 1
    a *= ndimage.binary_dilation(lab == big, iterations=3)
    im = Image.fromarray(np.dstack([x[:, sl].clip(0, 255), a * 255]).astype(np.uint8))
    im = im.crop(im.getchannel("A").point(lambda v: 255 if v > 20 else 0).getbbox())
    im = im.resize((round(im.width * h / im.height), h), Image.LANCZOS); im.save(f"assets/items/{name}.png"); print(name, im.size)
