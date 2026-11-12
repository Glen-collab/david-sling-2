"""(Glen 11-12) the road animals, from his green-screen clips (david-sling-2-art/w3/animals) -> assets/sprites.
Each sheet: clip, video frames (1-based, inclusive), loop or once, height (David is 240), extra vid2sprite options.
Every sheet faces right (--mirror for the clips that face left).
python tools/cut_w3_animals.py [name ...]   (then: python tools/make_manifest.py)"""
import os, sys, subprocess, shutil, json, tempfile
ART = os.path.join(os.path.expanduser("~"), "Desktop", "david-sling-2-art", "w3", "animals")
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, "..", "assets", "sprites")
SHEETS = [
  # name               clip                         start end  mode    height extra
  ("viper_coil",      "viper_clip.mp4",              50,  72, "loop",   46, ["--fixed", "640", "--frames", "10"]),
  ("viper_strike",    "viper_clip.mp4",              72, 100, "once",   46, ["--fixed", "640", "--frames", "10"]),
  ("ostrich_walk",    "ostrich_clip.mp4",             1,  86, "loop",  290, []),
  ("ostrich_run",     "ostrich_clip.mp4",            96, 145, "loop",  290, []),
  ("wildass_walk",    "wildass_clip.mp4",             1, 108, "loop",  200, ["--mirror"]),
  ("wildass_kick",    "wildass_clip.mp4",           110, 145, "once",  200, ["--mirror", "--frames", "10"]),
  ("caracal_walk",    "caracal_clip.mp4",             1,  68, "loop",  110, ["--mirror"]),
  ("caracal_run",     "caracal_clip.mp4",            74, 145, "loop",  110, ["--mirror"]),
  ("stork_peck",      "stork_walk_clip.mp4",        100, 145, "once",  200, ["--frames", "10"]),
  ("stork_walk",      "stork_walk_clip.mp4",          1,  72, "loop",  200, []),
  ("stork_fly",       "stork_fly_clip.mp4",          48, 145, "loop",  200, ["--align", "center", "--ref", "1:20"]),
  ("locusts_fly",     "locusts_clip.mp4",             1,  70, "loop",   70, ["--align", "center"]),
  ("locusts_scatter", "locusts_clip.mp4",            72, 145, "once",   70, ["--align", "center", "--ref", "1:3", "--frames", "10"]),
  ("flies_fly",       "flies_clip.mp4",               1,  70, "loop",   80, ["--align", "center"]),
  ("flies_scatter",   "flies_clip.mp4",              72, 145, "once",   80, ["--align", "center", "--ref", "1:3", "--frames", "10"]),
  ("partridge_idle",  "reel_partridge_hyrax_hoopoe_ibex_owl.mp4", 1, 48, "loop", 70, []),
  ("partridge_run",   "reel_partridge_hyrax_hoopoe_ibex_owl.mp4", 60, 140, "loop", 70, []),
  ("hyrax_walk",      "hyrax_clip.mp4",               1,  90, "loop",   66, ["--mirror"]),
  ("hoopoe_walk",     "hoopoe_clip.mp4",              1, 145, "loop",   72, []),
  ("ibex_walk",       "ibex_clip.mp4",                1,  90, "loop",  210, []),
  ("ibex_run",        "ibex_clip.mp4",               96, 145, "loop",  210, []),
  ("owl_perch",       "owl_clip.mp4",                 1,  60, "loop",  110, []),
  # (Glen 11-12) Abiathar, the priest who got away (david-sling-2-art/w3/abiathar): his walk; hiding, crouched with the
  #  ephod; telling it, facing David (the clips' pointing and covering his face zoom in past his knees: not used)
  ("abiathar_walk",   "../abiathar/abiathar_clip1.mp4", 1, 145, "loop", 236, []),
  ("abiathar_hide",   "../abiathar/abiathar_clip2.mp4", 16, 48, "loop", 208, ["--ref", "1:30"]),
  ("abiathar_talk",   "../abiathar/abiathar_clip3.mp4", 124, 145, "loop", 230, ["--ref", "1:20"]),
  ("owl_fly",         "owl_clip.mp4",                76, 145, "loop",  110, ["--align", "center", "--ref", "1:3"]),
]
want = set(sys.argv[1:]); tmp = tempfile.mkdtemp()
for name, clip, a, b, mode, h, extra in SHEETS:
    if want and name not in want: continue
    pre = os.path.join(tmp, name)
    cmd = ["python", os.path.join(HERE, "vid2sprite.py"), os.path.join(ART, clip), pre, "--" + mode, "--start", str(a), "--end", str(b), "--height", str(h)] + extra
    if "--ref" not in extra: cmd += ["--ref", "1:%d" % min(8, b - a)]
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode: print(name, "FAILED", r.stderr[-600:]); continue
    shutil.copy(pre + "_sheet.png", os.path.join(OUT, name + ".png"))
    j = json.load(open(pre + ".json")); j["source"] = clip; json.dump(j, open(os.path.join(OUT, name + ".json"), "w"), indent=2)
    if os.path.exists(pre + "_preview.gif"): shutil.copy(pre + "_preview.gif", os.path.join(tmp, "..", name + "_preview.gif"))
    print(name, j["frames"], "frames", j["frame_w"], "x", j["frame_h"], j["ms_per_frame"], "ms")
