"""(Glen 11-12) David shooting the bow, from his two green-screen clips (david-sling-2-art/w3):
  david_gsword_bow_clip.mp4  (Goliath's sword on his back): a level shot, then nocking again, raising it, shooting up
  david_bow_clip_nosword.mp4 (no sword): the same; the level shot without the sword is the old david_bow (kept)
Each sheet is four frames, like david_bow: three drawing frames, then the release (the arrow already gone: the game
draws its own). The frames come from different moments of the clip, so they're picked by hand (video frames, 0-based):
  david_gsword_bow     150, 158, 166 (nocked, drawing, drawn level) + 44 (just let go)
  david_gsword_bow_up  172, 184, 200 (raising it, drawn up)         + 227
  david_bow_up         174, 186, 198                                + 228
python tools/cut_bow_clips.py   (then: python tools/make_manifest.py)
"""
import os, shutil, subprocess, tempfile, json
import numpy as np
from PIL import Image
from scipy import ndimage
ART = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "w3")
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, "..", "assets", "sprites")
SHEETS = [("david_gsword_bow", "david_gsword_bow_clip.mp4", [150, 158, 166, 44]),
          ("david_gsword_bow_up", "david_gsword_bow_clip.mp4", [172, 184, 200, 227]),
          ("david_bow_up", "david_bow_clip_nosword.mp4", [174, 186, 198, 228])]
tmp = tempfile.mkdtemp()
for name, clip, frames in SHEETS:
    src = os.path.join(ART, clip); pics = []
    for i, f in enumerate(frames):   # each picked frame, then the four as a little clip of their own
        p = os.path.join(tmp, f"{name}_{i:02d}.png"); pics.append(p)
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", src, "-vf", f"select=eq(n\,{f})", "-frames:v", "1", p], check=True)
    mini = os.path.join(tmp, name + ".mp4")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-framerate", "4", "-i", os.path.join(tmp, f"{name}_%02d.png"), "-c:v", "libx264", "-crf", "8", "-pix_fmt", "yuv420p", mini], check=True)
    pre = os.path.join(tmp, name)
    subprocess.run(["python", os.path.join(HERE, "vid2sprite.py"), mini, pre, "--once", "--frames", "4", "--start", "1", "--end", "4", "--ref", "1:4", "--thin", "8"], check=True)
    # the release frame: the arrow already flying off is its own piece (not touching him or the bow): taken out
    sh = Image.open(pre + "_sheet.png").convert("RGBA"); a = np.asarray(sh).copy(); fw = sh.width // 4
    last = a[:, 3 * fw:]; lab, n = ndimage.label(ndimage.binary_dilation(last[..., 3] > 30, iterations=3))
    if n > 1:
        big = 1 + int(np.argmax(ndimage.sum(np.ones_like(lab), lab, range(1, n + 1)))); last[..., 3][lab != big] = 0
    Image.fromarray(a).save(os.path.join(OUT, name + ".png"))
    j = json.load(open(pre + ".json")); j.update({"ms_per_frame": 70, "loop": False, "source": clip, "video_frames": frames})
    json.dump(j, open(os.path.join(OUT, name + ".json"), "w"), indent=2); print(name, j["frame_w"], j["frame_h"])
