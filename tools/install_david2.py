"""Install the older David's sheets (Desktop\\david-sling-2-art\\sprites) into assets/sprites under the names the engine
draws, building the few sheets the engine wants that aren't one clip (the jump in the air, the roll's get-up, the sling).

usage: python tools/install_david2.py      (then: python tools/make_manifest.py)

Run it again after Glen repaints a sheet: everything here is rebuilt from his files.
"""
import json, os, shutil
from PIL import Image

ART = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "sprites")
OUT = os.path.join(os.path.dirname(__file__), "..", "assets", "sprites")


def load(name):
    j = json.load(open(os.path.join(ART, name + ".json")))
    sheet = Image.open(os.path.join(ART, name + "_sheet.png")).convert("RGBA")
    w, h = j["frame_w"], sheet.height
    frames = [sheet.crop((i * w, 0, (i + 1) * w, h)) for i in range(j["frames"])]
    return j, frames


def save(name, frames, ax, ay, ms, loop, align="feet", **extra):
    w, h = frames[0].size
    out = Image.new("RGBA", (w * len(frames), h))
    for i, f in enumerate(frames):
        out.paste(f, (i * w, 0))
    out.save(os.path.join(OUT, name + ".png"))
    j = {"frames": len(frames), "frame_w": w, "frame_h": h, "ms_per_frame": ms, "loop": loop,
         "align": align, "anchor_x": ax, "anchor_y": ay, "source": "david2", **extra}
    json.dump(j, open(os.path.join(OUT, name + ".json"), "w"), indent=2)


def same(src, name=None, **over):
    """Copy one of Glen's sheets as it is (optionally under another name, with some fields changed)."""
    j, frames = load(src)
    f = {"ax": j["anchor_x"], "ay": j["anchor_y"], "ms": j["ms_per_frame"], "loop": j["loop"], "align": j.get("align", "feet")}
    f.update(over)
    save(name or src, frames, f["ax"], f["ay"], f["ms"], f["loop"], f["align"])


def pick(src, idx, name, **over):
    """A new sheet from some of a sheet's frames, in this order."""
    j, frames = load(src)
    f = {"ax": j["anchor_x"], "ay": j["anchor_y"], "ms": j["ms_per_frame"], "loop": j["loop"], "align": j.get("align", "feet")}
    f.update(over)
    save(name, [frames[i] for i in idx], f["ax"], f["ay"], f["ms"], f["loop"], f["align"])


def join(parts, name, ms, loop=False):
    """One sheet from frames of several sheets, lined up on their anchors (the feet)."""
    loaded = [(load(src), idx) for src, idx in parts]
    left = max(j["anchor_x"] for (j, _), _ in loaded)
    right = max(j["frame_w"] - j["anchor_x"] for (j, _), _ in loaded)
    up = max(j["anchor_y"] for (j, _), _ in loaded)
    down = max(fr[0].height - j["anchor_y"] for (j, fr), _ in loaded)
    out = []
    for (j, frames), idx in loaded:
        for i in idx:
            c = Image.new("RGBA", (left + right, up + down))
            c.paste(frames[i], (left - j["anchor_x"], up - j["anchor_y"]))
            out.append(c)
    save(name, out, left, up, ms, loop)


# Glen's sheets as they are, under their own names (david_sword_slash, david_shield_block, david_swim, david_hit, ...)
WAITING = set()   # sheets waiting on Glen's Photoshop pass (none now; the run-sling was painted 2026-10-26)
for fn in sorted(os.listdir(ART)):
    if fn.endswith(".json") and fn[:-5] not in WAITING:
        same(fn[:-5])

# the engine's names
same("david_land", "david_jump_land", ms=45)
same("david_land", "david_stop", ms=60)
same("david_kneel", "david_crouch", ms=40)
same("david_sneak", "david_crawl")
same("david_walk", "david_walk_lamp")
pick("david_jump", list(range(2, 12)), "david_jump_air", align="center")   # frames 1-9 are picked by speed: up, the knee tuck, down
j = json.load(open(os.path.join(OUT, "david_jump_air.json")))
j["anchor_x"], j["anchor_y"] = j["frame_w"] // 2, j["frame_h"] // 2     # the engine draws the jump on its middle
json.dump(j, open(os.path.join(OUT, "david_jump_air.json"), "w"), indent=2)
pick("david_roll", [5, 6, 7, 8, 9, 10, 11], "david_roll_getup", align="feet")
# the rope climb: Glen's canvas is 384 tall with David in the middle; the engine stands climbers on their feet
cj = json.load(open(os.path.join(ART, "david_climb.json")))
same("david_climb", ay=cj["anchor_y"] + 128, align="feet")
# the sling: frames 0-5 whirl overhead while B is held, 6-11 are the throw (the stone leaves at frame 7)
join([("david_sling_spin", [0, 2, 4, 6, 8, 10]), ("david_sling_throw", [2, 3, 4, 5, 6, 7])], "david_sling_throw", ms=108)
# in caves the engine draws the Part One boy turning away, walking in and lighting his lamp: until Glen's clips of the older
# David doing those, stand in his idle and walk (the lamplight is drawn by the game either way)
pick("david_idle", [i % 12 for i in range(16)], "david_light_lamp", loop=False)
pick("david_idle", list(range(8)), "david_turn_away", loop=False)
same("david_walk", "david_walk_away")
print("installed")
