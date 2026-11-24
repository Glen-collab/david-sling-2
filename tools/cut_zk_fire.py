# (11-24) Glen's resaved signal fire (david-sling-2-art/ziph/signal fire.png): four frames side by side, the fire
# catching (1, 2) and burning (3, 4). Cut into h7_zk_fire_1..4.png (Ziklag's fires, zk7.js), each the same size with
# the stone base at the bottom; green left from the green screen taken out (strong green: clear; a green tinge: grayed)
import sys
from PIL import Image
SRC = sys.argv[1] if len(sys.argv) > 1 else "david-sling-2-art/ziph/signal fire.png"
OUT = sys.argv[2] if len(sys.argv) > 2 else "david-sling-2/assets/rooms/w7/kit"
RUNS = [(24, 460), (502, 938), (980, 1416), (1458, 1894)]
im = Image.open(SRC).convert("RGBA")
top, bot = 600, 1272
for i, (x0, x1) in enumerate(RUNS):
    fr = im.crop((x0 - 4, top, x1 + 4, bot))
    px = fr.load()
    for y in range(fr.height):
        for x in range(fr.width):
            r, g, b, a = px[x, y]
            if a == 0: continue
            m = max(r, b)
            if g > m + 25 and g > 90:   # green screen left over
                px[x, y] = (r, g, b, 0); continue
            if g > m:   # a green tinge on an edge: no more green than red or blue
                px[x, y] = (r, m, b, a)
    fr.save(f"{OUT}/h7_zk_fire_{i + 1}.png")
    print("frame", i + 1, fr.size)
