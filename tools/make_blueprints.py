"""Blueprints for painting a region's rooms with GPT / Meta / Grok (Glen 2026-11-04: "make the blueprints for the rooms
to test it"). Each room is cut into screen-sized panels (1280 x 720, 16:9, the size of the game's screen), drawn in flat
colors from the room's real layout, so whatever gets painted over them lines up with what David can stand on.

python tools/make_blueprints.py <rooms.json> <out dir>

rooms.json comes from the game itself (a headless run that dumps each room's tiles, doors and seals: see
dump_rooms.js in the commit that added this). Per room it writes:
  <room>_1of3.png ...   the panels to hand to the image AI, left to right
  <room>_overview.png   the whole room with the panels outlined (for us, not the AI)
  <room>_wide.png       the whole room in one picture, at its real size (for one wide painting)
and gibeah_grid.png, the map screen's grid of rooms (each square = one screen).

Colors (no legend in the pictures, so the AI doesn't paint one):
  light blue  open space (sky, or the inside of a room or cave)     grey        ground and solid floors
  dark grey   rock (the watchtower: climbable later)                 brick grey  a stone wall
  pale grey   a ledge he can jump up through (a beam, a shelf, a rooftop edge)
  black       a doorway or stairway        dark blue   a pit / water in the floor
  magenta     a passage that's sealed until later (paint it open: the game draws the seal on top)
The panels overlap by OVER px so the paintings can be blended where they meet.
"""
import json, math, os, sys
from PIL import Image, ImageDraw

SW, SH, OVER = 1280, 720, 320
SKY, GROUND, ROCK, LEDGE, DOOR, PIT, SEAL = (159, 211, 240), (138, 138, 138), (90, 90, 96), (190, 190, 190), (0, 0, 0), (20, 40, 110), (255, 0, 255)
src, out = sys.argv[1], sys.argv[2]
D = json.load(open(src)); T, ROWS, GR = D["T"], D["ROWS"], D["GR"]
os.makedirs(out, exist_ok=True)


def room_picture(r):
    W = r["w"] * T
    im = Image.new("RGB", (W, ROWS * T), SKY); d = ImageDraw.Draw(im)
    rows = r["rows"]
    for y, row in enumerate(rows):
        for c, ch in enumerate(row):
            x0, y0 = c * T, y * T
            if ch == "1": d.rectangle([x0, y0, x0 + T - 1, y0 + T - 1], fill=GROUND)
            elif ch == "2": d.rectangle([x0, y0, x0 + T - 1, y0 + T - 1], fill=ROCK)
            elif ch == "3":   # a stone wall: grey with brick joints
                d.rectangle([x0, y0, x0 + T - 1, y0 + T - 1], fill=GROUND)
                d.line([x0, y0 + T // 2, x0 + T, y0 + T // 2], fill=(100, 100, 100), width=2)
                d.line([x0 + (T // 2 if y % 2 else 0), y0, x0 + (T // 2 if y % 2 else 0), y0 + T // 2], fill=(100, 100, 100), width=2)
                d.line([x0 + (0 if y % 2 else T // 2), y0 + T // 2, x0 + (0 if y % 2 else T // 2), y0 + T], fill=(100, 100, 100), width=2)
            elif ch == "-": d.rectangle([x0, y0, x0 + T - 1, y0 + T // 2], fill=LEDGE)   # a thin shelf, its top is where he stands
    # pits: an open column in the floor
    for c in range(r["w"]):
        if rows[GR][c] == "0": d.rectangle([c * T, GR * T, c * T + T - 1, ROWS * T], fill=PIT)
    for o in r["doors"]:
        x = o["c"] * T + T // 2
        if o["kind"] in ("door", "stairs"): d.rectangle([x - 46, GR * T - 170, x + 46, GR * T - 1], fill=DOOR)
        if o["kind"] == "rope": d.rectangle([x - 50, 0, x + 50, 40], fill=DOOR)   # the bottom of the well shaft, up in the ceiling
    if r.get("crack"):
        k = r["crack"]; d.rectangle([k["c"] * T, k["r"] * T, (k["c"] + k["w"]) * T - 1, (k["r"] + k["h"]) * T - 1], fill=SEAL)
    return im


rooms = D["rooms"]
for r in rooms:
    im = room_picture(r); W = im.width
    im.save(os.path.join(out, f"{r['id']}_wide.png"))   # (Glen 11-04) the whole room in one picture, for one wide painting
    n = max(1, math.ceil((W - OVER) / (SW - OVER)))
    starts = [round(i * (W - SW) / (n - 1)) if n > 1 else 0 for i in range(n)]
    if W < SW:   # a room narrower than the screen: centered on a full screen of solid rock
        pan = Image.new("RGB", (SW, SH), ROCK); pan.paste(im, ((SW - W) // 2, 0)); pan.save(os.path.join(out, f"{r['id']}_1of1.png"))
        starts = [0]; r["panels"] = 1
    else:
        for i, x in enumerate(starts):
            im.crop((x, 0, x + SW, SH)).save(os.path.join(out, f"{r['id']}_{i + 1}of{n}.png"))
        r["panels"] = n
    ov = im.copy(); d = ImageDraw.Draw(ov)
    for i, x in enumerate(starts):
        col = [(255, 80, 0), (0, 160, 0), (0, 80, 255), (200, 0, 200)][i % 4]
        d.rectangle([x + 2 + i * 3, 2 + i * 3, min(W, x + SW) - 3 - i * 3, SH - 3 - i * 3], outline=col, width=5)
        d.text((x + 14, 12 + i * 14), f"panel {i + 1}", fill=col)
    ov.thumbnail((2400, 400)); ov.save(os.path.join(out, f"{r['id']}_overview.png"))
    print(f"{r['id']}: {r['w']} tiles = {W} px -> {r['panels']} panel(s)")

# the map grid: each square one screen, like the map screen (and Castlevania's)
C = 120
cols = max(r["mx"] + r["mw"] for r in rooms); rws = max(r["my"] + 1 for r in rooms)
g = Image.new("RGB", (cols * C + 40, rws * C + 40), (245, 240, 228)); d = ImageDraw.Draw(g)
for x in range(cols + 1): d.line([20 + x * C, 20, 20 + x * C, 20 + rws * C], fill=(215, 205, 190))
for y in range(rws + 1): d.line([20, 20 + y * C, 20 + cols * C, 20 + y * C], fill=(215, 205, 190))
for r in rooms:
    x0, y0 = 20 + r["mx"] * C, 20 + r["my"] * C
    d.rectangle([x0 + 3, y0 + 3, x0 + r["mw"] * C - 3, y0 + C - 3], fill=(60, 70, 90) if r["cave"] else (190, 140, 80), outline=(40, 30, 20), width=3)
    d.text((x0 + 10, y0 + 10), r["name"], fill=(255, 255, 255))
    d.text((x0 + 10, y0 + 28), f"{r['mw']} wide, {r['panels']} panel(s)", fill=(255, 255, 255))
g.save(os.path.join(out, "gibeah_grid.png"))
json.dump(D, open(os.path.join(out, "rooms.json"), "w"))
