# (Glen 11-09) Michal at the window, seen from outside, letting the rope down: his clip michal_window.mp4 (the whole
# stone arch, Michal and the rope on green). Keyed, cropped to one still box (the arch never moves), scaled so the
# arch is 2x the window kit's width (tw_win_arch_lit_with-rope, 165 wide), and laid out as a sprite sheet.
#   python tools/cut_michal_window.py <frames dir of the clip's pngs> [frames]
import sys, os, json, glob
import numpy as np
from PIL import Image
src = sys.argv[1]; N = int(sys.argv[2]) if len(sys.argv) > 2 else 24
files = sorted(glob.glob(os.path.join(src, "f*.png")))
X0, X1, Y0, Y1 = 72, 784, 76, 1104          # the arch (and the rope out the bottom), the same in every frame
W = 330; sc = W / (X1 - X0); H = round((Y1 - Y0) * sc)
pick = [files[round(12 + i * (len(files) - 13) / (N - 1))] for i in range(N)]
sheet = Image.new("RGBA", (W * N, H))
for k, f in enumerate(pick):
    a = np.asarray(Image.open(f).convert("RGB"))[Y0:Y1, X0:X1].astype(np.float32)
    r, g, b = a[..., 0], a[..., 1], a[..., 2]
    spill = g - np.maximum(r, b)
    alpha = np.clip(1 - (spill - 25) / 50, 0, 1)          # soft key on how much greener than red/blue
    a[..., 1] = np.minimum(g, np.maximum(r, b) + 8)        # despill
    rgba = np.dstack([a, alpha * 255]).astype(np.uint8)
    sheet.alpha_composite(Image.fromarray(rgba, "RGBA").resize((W, H), Image.LANCZOS), (k * W, 0))
out = "assets/sprites/michal_window"
sheet.save(out + ".png")
json.dump({"frames": N, "frame_w": W, "frame_h": H, "ms_per_frame": round(10000 / N), "loop": False, "align": "feet",
           "anchor_x": 0, "anchor_y": 0, "source": "michal_window.mp4", "arch_w": W}, open(out + ".json", "w"), indent=2)
os.makedirs("../david-sling-2-art/sprites/michal_window", exist_ok=True)
sheet.save("../david-sling-2-art/sprites/michal_window/michal_window_sheet.png")
print(N, "frames of", W, "x", H)
