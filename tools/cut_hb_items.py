"""Glen 11-25 (Gemini): Hebron's items, each alone on green, keyed as key_w7.py and cut to what's left, about 200 high:
the crown and bracelet (2 Samuel 1:10), the sack of flour, the jars of wine and oil (the two jars split at the gap).
py tools/cut_hb_items.py ../david-sling-2-art/w8/hebron assets/items"""
import sys, os
from PIL import Image
ART, OUT = sys.argv[1], sys.argv[2]
src = open(os.path.join(os.path.dirname(__file__), "key_w7.py"), encoding="utf-8").read()
ns = {}; exec(src.split("d = os.path.join")[0].replace("ART, OUT = sys.argv[1], sys.argv[2]", "ART = OUT = ''"), ns); key = ns["key"]
def cut(im, name, H=200):
    k = key(im); k = k.crop(k.getchannel("A").getbbox()); k = k.resize((round(k.width * H / k.height), H), Image.LANCZOS)
    k.save(os.path.join(OUT, name + ".png"), optimize=True); print(name, k.size)
cut(Image.open(os.path.join(ART, "crown.jpg")).convert("RGB"), "hb_crown", 120)
cut(Image.open(os.path.join(ART, "bracelet.jpg")).convert("RGB"), "hb_bracelet", 160)
cut(Image.open(os.path.join(ART, "flour sack.jpg")).convert("RGB"), "hb_flour")
jars = Image.open(os.path.join(ART, "wine and oil jars.jpg")).convert("RGB")
cut(jars.crop((0, 0, 480, jars.height)), "hb_wine"); cut(jars.crop((480, 0, jars.width, jars.height)), "hb_oil")
