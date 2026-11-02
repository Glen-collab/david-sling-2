# Where we left off (Part Two)

Last updated 2026-10-26. Read START_HERE.md and DESIGN.md first.

## Play
- Double-click **`Play David 2.bat`**. It serves the folder on port 8766 and opens Chrome with its own profile (sound on),
  straight into the test stage **9-1 En-Gedi** (`game/index.html#9-1`).
- Keys: arrows move, Z jump (again in the air = flip), Down crouch (walk crouched to sneak), **V or F = sword (X)**,
  **G = shield (Y, hold)**, X = sling, Down + A roll, Up at a cave mouth goes in or out, R back to the campfire, H help.
- Saves use `david2…` localStorage keys (`david2Progress`, `david2Slot`, `david2-padmaps`, ...), never Part One's.

## What's built
- **The engine** is a copy of Part One's `game/` and `assets/` (taken 2026-10-26 at Part One commit 6dbe924). Part One's
  stages are all still in the copy (`#1-1` etc.); Part Two's stages are World 9 for now (`WORLD === 9` switches off the
  lamb, makes Y the shield, and shows Part Two's controls).
- **The older David**: `tools/install_david2.py` copies Glen's sheets from `Desktop\david-sling-2-art\sprites` into
  `assets/sprites` under the engine's names and builds the combined ones (jump in the air, roll get-up, sling = spin +
  throw, cave stand-ins). After Glen repaints a sheet: `python tools/install_david2.py` then `python tools/make_manifest.py`.
  `WAITING` in that file holds sheets not installed yet (`david_run_sling`, until Glen's Photoshop pass).
- **9-1 En-Gedi** (layout in `game/main.js`, `LEVEL_NAME === "9-1"`; rules in `game/engedi.js`):
  - opening narration 1 Samuel 24:1-2; Abishai at the campfires; a viper to try the sword on; ibex up the rocks
  - Saul's men (`setPiece("patrol", c, GR-1, { from, to, wait })`): walk, stop and look at each end; a dashed wedge
    shows where they look; seen standing in it = "!" then back to the campfire (no heart lost). Crouched next to a
    hiding rock (`setPiece("hide", c)`, a front-layer boulder) with the soldier on its far side = hidden.
    The sword passes them by ("David won't strike Saul's men").
  - the spring (pool with stepping stones, the falls), two more soldiers by the sheep pens
  - the cave (`setPiece("cave9")` inside a `caveRoom`): David's men in the back; Saul comes in (24:3-4); creep up
    behind him (walking upright near him or getting in front of him = "Saul stirs", back to the dark); X behind him
    cuts the robe (24:4-7); out at the mouth: 24:8, 24:11, 24:12, 24:16-17; end card with Psalm 57:6.
  - Scripture checked on ebible.org (WEB) 2026-10-26, "the LORD" for "Yahweh". 24:3's reason Saul went in is left out.
- **9-2 The Leap of Faith** (`Play Leap of Faith.bat`; layout in `game/main.js`, rules in `game/leap.js`): Glen's film
  first (`assets/video/leap_film.mp4`: the walk to the edge, the look down, the first step, cut before any stone shows).
  A chasm with a ledge above (too high) and a ledge below (too far). The real way is a hidden bridge straight out from
  the edge: each stone shows itself (golden edge, as in the film) as David walks onto it; a jump finds nothing and he
  falls through (no heart lost, back where he last stood, found stones stay). Across: Glen's sand-toss film
  (`leap_end.mp4`, Glen's 2026-11-02 clip with the young David; the first one had a bearded David and is kept in
  `david-sling-2-art\unused\leap_end_bearded_david.mp4`) shows the whole bridge, then the end card (Psalm 18:36). `?nofilm` skips the opening film.
  Words are draft: 2 Corinthians 5:7 at the edge, Psalm 18:36 on the card (both checked on ebible.org 2026-10-29).
- **Player 2** (2026-11-02, `game/player2.js`; Part Two stages only, WORLD 9): a second controller joins with any button
  (or the number pad: 8 4 5 6 move, 0 = A, . = B, 3 = X, + = Select; or key P hands the one controller to Player 2 and
  the keyboard plays David). Select changes who: `P2_ROSTER` per stage (or `STAGE_INFO.p2`). Never costs David a heart:
  a fall, a cave door or getting far behind brings him back beside David; animals knock him back.
  - armor-bearer (0.7 size): crawls (Down) under rock one tile high, gathers olives (B bends down and reaches), lamp
    lights caves (`p2CaveLights`, caves.js)
  - Jonathan (1.08): B = arrow (Glen's `jonathan_arrow` item), Up + B = high shot, X or Down + B = sword
  - Abishai: B = spear thrust; Down = sneak. Benaiah: B = staff swing, Up + B or X = smash (counts as a charged stone:
    breaks deadfalls), walks boulders along (`setPiece("pushrock", c, r, { w, h })`, they drop into pits)
  - Asahel: sprints after holding a run, long running jump, javelin (B; on the run it's the running throw), slide
    (Down at a run), skids when he lets go at a sprint
  - Attacks are stones (`s.p2`; melee = `s.sword`), so anything a sling stone hits works. Thrown straight ahead with a
    snake or scorpion on the ground in front, it flies low. In En-Gedi, Saul's men see Player 2 too (hidden the same way).
- **9-3 The Training Ground** (`Play Training Ground (2 players).bat`; Glen's fortress set): a station for each Player 2
  (the tunnel, the boulder under the high ledge, the dead branches over the nook, the animals, the gap, the hung gourds),
  toasts at each (only with a Player 2), end card. A test bed to grow; the real worlds come when they're designed.
- Saul (2026-10-30, Glen's clips, sheets in the art folder with `_green` copies for Photoshop): `saul_walk`, `saul_sit`,
  `saul_stand` (the sit backwards, built by install_david2.py), `saul_look_back`, `saul_weep`, `saul_throw` (the harp
  scene, 18:11; not used yet), `saul_sleep` (spear in the ground, water jug: 1 Samuel 26; not used yet), `saul_spear` (Glen's spear on its own, an item in `assets/items`, for the harp-room throw and the sleeping camp; not used yet), and
  `saul_robe_cut`: Glen's two-shot of David cutting the robe, played in place of both of them (`W9.SCENE_*` in engedi.js;
  `vid2sprite.py --fixed X` keeps the camera still for two-character clips). The David in that clip is the younger look.
  A little light (`caveLights()`) shows Saul in the dark cave. Saul's men use Glen's soldier clips.
- Abishai (2026-11-01, Glen's clips; at the En-Gedi campfires): `abishai_idle`, `abishai_talk`, `abishai_walk`
  (spear planted, no high step; Glen's pick over the tilted-spear walk), `abishai_thrust`, `abishai_kneel_point`
  (1 Samuel 26:8), `abishai_sneak`. Thrust and sneak were cut with `--pad 160` and Glen painted the spear back in; the
  sneak he painted is the 72-92 cut (0.9 s loop), and its json and `_green` match that cut.
- The armor-bearer (2026-11-01, Glen's clips; installed, not in the game yet: Player 2 isn't built): `armorbearer_idle`,
  `_walk`, `_run`, `_jump`, `_lamp_up`, `_pickup`, `_crawl` (the tiny tunnels), `_hit`, `_talk`. Cut with `--ref 1:20`
  (his standing frames) so the raised lamp doesn't shrink him. Jump, lamp-up and pick-up play at the clips' slow pace.
- Asahel (2026-11-02, Glen's clips `asahel_clip1-7.mp4`, `asahel_slide.mp4`; installed, not in the game yet; drawn at 1.15):
  `asahel_idle` (clip1), `_walk` (clip2, the springy one), `_walk_calm` (clip4, eyes closed), `_talk` (clip3, 50-122, a
  loop), `_run` (clip5, 24-136, 60 ms), `_sprint` (clip5, 140-232, 48 ms), `_long_jump` (clip5, 232-324, ends crouched
  then standing), `_throw` (clip7, 1-62, padded 120 for the javelin), `_hit` (clip7, 88-134, starts mid-step),
  `_slide` (6 frames from Glen's second clip `asahel_slide2.mp4`, filmed close, so scaled by head size x0.236 to match:
  video 113, 116 dropping, 132, 138 on his side (frame 4 held while he slides), then 132, 116 back up; the clip's running
  frames run off the top and bottom of the video. The first, painted splits version is kept in
  `david-sling-2-art\unused\asahel_slide_painted_splits_version.png`), `_run_throw` (`asahel_throw_a.mp4`, 52-160: runs with the javelin cocked, throws, lunges, stands; 90 ms; Glen took out
  frames 11-12, a re-cock of the arm, so 16 frames),
  `_throw2` (`asahel_throw_b.mp4`, 24-168: a standing wind-up throw; Glen painted the javelins back on his back after the
  throw 2026-11-02; 110 ms), `_skid` (`asahel_skid.mp4`, 78-124, 70 ms: last running stride, skids
  leaning back, comes upright into his idle; after 124 the clip turns him to face us).
- Benaiah (2026-11-02, Glen's nine clips `benaiah_clip1-9.mp4`; installed, not in the game yet; drawn at 1.3):
  `benaiah_idle` (clip1), `_walk` (clip2), `_talk` (clip3, 70-118, played as a loop), `_run` (clip4, 20-88; after that he
  turns to the camera), `_smash` (clip5, staff overhead and down; the staff goes off the top of the video in the overhead
  frames, sheet padded 80 for Glen to paint), `_swing` (`benaiah_swing.mp4`, Glen's harder swing: winds up facing us, whips it round; the first try is kept as
  `benaiah_swing_turning_unused.mp4`),
  `_lift` (clip7, staff dropped on the ground), `_hit` (clip8, 1-76), `_push_start` (clip9, 1-40) and `_push` (clip9 from
  40, a loop at 150 ms). The one-shot moves still play at the clips' slow pace; speed them up when he goes in.
- `david_hold_robe` (2026-11-02, Glen's two-shot `david_hold_robe_talk.mp4` with Saul masked out first
  (`_only.mp4`), mirrored to face right): at the cave mouth David holds up the corner of Saul's robe while he talks (24:11),
  in place of the painted purple triangle. Saul's men are drawn after the front decor now (`drawWorld9Front`): they walk
  the near path and David crouches behind the rocks on the far side.
- Jonathan (2026-11-01, Glen's two long clips, several moves each; installed, not in the game yet): `jonathan_idle`,
  `_talk`, `_walk` (from `jonathan_idle_talk_walk.mp4`), `_run`, `_jump`, `_shoot`, `_shoot2` (from
  `jonathan_run_jump_shoot.mp4`: run 14-110, jump 112-144, shoot 148-250, shoot2 284-350, turned a little toward us).
  Glen painted the jump's head back in and touched up both shots (2026-11-01). Yellow/pink tint on the run's legs
  is in Grok's video. 2026-11-02, Glen's 16:9 clips: `jonathan_stow_bow`, `_sword_draw`, `_sword_slash`, `_sword_sheath`
  (`jonathan_stowbow_sword.mp4`), `_shoot_high` (the arrow signal), `_shoot_straight`, `_gifts` (robe off, offers the
  sword and bow, 1 Samuel 18:4) and `_gives_david` (two-shot, `--fixed 440`). Cut with 60-120 px of room for painting.
  Still to come: hit.
  `jonathan_hit` (2026-11-02, `jonathan_hit.mp4` frames 16-34, the reel back with the bow up, played forward then
  reversed back to stance, as Glen asked; an arrow sits on the string in the clip). `jonathan_arrow` (Glen's arrow on its own, an item in `assets/items`, tilted up ~14 degrees) is what flies when he shoots.
- Stand-ins: David's men are `soldier_sit` and
  `guard_big_idle` darkened; Abishai stands at both En-Gedi campfires (idle, talk while his words are up; `drawCampfirePeople` in world2.js, size 1.2). In caves David uses his idle and walk
  (no lamp in his hand yet).

## Testing (headless)
- `python -m http.server 8766` from the repo root, then `node tools/shot.mjs "?allskills#9-1" case.js out1.png out2.png ...`
- It copies `game/` into `simgame/` (git-ignored) with `simgame/test.js` (the harness: stops the live loop, steps
  `frame()` by hand, stubs `readPad`, collects errors). A case calls `testRun([{ keys: [...], n: frames, fn() {}, snap: true }])`;
  each `snap` saves the next png. Examples of cases are in this session's history (e1..e7, g1, g2).
- Stop the server afterward.

## Next
- Glen plays En-Gedi and says how it feels (soldier speed, sight length, hiding, the cave).
- Art Glen is making: the armor-bearer (reference done: `david-sling-2-art\armor-bearer.png`), then Jonathan, Benaiah,
  Asahel, Abishai. (Photoshop passes on the sling, run-sling and hit are all done.)
- The harp (2026-10-28): Glen's clip zooms in about 31%; it was un-zoomed frame by frame before cutting (copy in
  `david-sling-2-artharp_dezoomed.mp4`), so `david_sit_harp` (sit down, harp out) and `david_play_harp` (a 10-frame
  strum loop) are one size and `SIT_HARP_SIZES` is empty. The sandal soles touch the bottom of the video in the loop.
- Clips that would replace stand-ins: older David lighting the lamp, walking into a cave (back view), holding up the robe
  corner, bowing; 
- Not yet built: wall climbing and swimming in play (the sprites exist), the lamp/olive maze caves, the Steps of Faith,
  Truths, Player 2, the world map for Part Two.
