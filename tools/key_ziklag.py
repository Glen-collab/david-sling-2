"""Glen 11-25: Ziklag by day, half rebuilt (Hebron's first room) into far/mid layers, keyed as key_w7.py.
far: 720 high jpg. mid: 720-high scale, keyed, cropped to what's left (prints its top: midY).
py tools/key_ziklag.py ../david-sling-2-art/w8/hebron assets/rooms/w8/hebron"""
import sys, os
sys.path.insert(0, os.path.dirname(__file__))
from PIL import Image
ART, OUT = sys.argv[1], sys.argv[2]
import importlib.util
src = open(os.path.join(os.path.dirname(__file__), "key_w7.py"), encoding="utf-8").read()
ns = {}; exec(src.split("d = os.path.join")[0].replace("ART, OUT = sys.argv[1], sys.argv[2]", "ART = OUT = ''"), ns); key = ns["key"]
d = os.path.join(OUT, "ziklag"); os.makedirs(d, exist_ok=True)
far = Image.open(os.path.join(ART, "ziklag far.png")).convert("RGB")
far.resize((round(far.width * 720 / far.height), 720), Image.LANCZOS).save(os.path.join(d, "far.jpg"), quality=88)
im = Image.open(os.path.join(ART, "ziklag mid.png")); im = im.resize((round(im.width * 720 / im.height), 720), Image.LANCZOS)
k = key(im); bb = k.getchannel("A").getbbox(); k = k.crop((0, bb[1], k.width, bb[3]))
k.save(os.path.join(d, "mid.png"), optimize=True); print("mid top", bb[1], "size", k.size)
