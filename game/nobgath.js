// World 3, Nob and Gath (1 Samuel 21; DESIGN.md "World 3"). Part Two's third region, on region.js's engine like
// ramah.js: loaded before region.js, which takes NOBGATH as its REGION when the address is "#9-7".
//
// First pass (Glen 11-10: "get the art in for background and rooms"): the rooms, built from Glen's World 3 pictures,
// a mix of the two styles: outside, Mario-style layers (far, mid, the ground; a near layer where there's art for one);
// inside, Castlevania rooms (Nob's sanctuary court, the tall cracked-wall shaft under it, Achish's hall).
// The people stand in their places; the story (the bread, the sword, the mash at Gath's door) comes next.
//
//   The Road to Nob -> Nob, the sanctuary court (the holy bread, Goliath's sword behind the ephod; a door down to the
//   cracked wall) -> The Road Down to Gath (Glen's sea and sycamore hills) -> Gath (his city, the gate) -> Achish's court

const R3 = {
  NPC_K: 1.2,        // the people's size here (as the prophets at Naioth)
  // (Glen 11-10: "test your might") Goliath's sword at a cracked wall: Up (or X) by it, then mash A and B while he
  // lifts the sword; the power bar decides the swing. Below GOLD: a dent (3-5 swings to break it); at GOLD: one swing
  MIGHT: {
    TIME: 2.4,         // seconds of mashing before he swings
    NEED: 26,          // presses to fill the bar (with no drain): GOLD wants about 11 a second
    DRAIN: 0.3,        // bar lost per second on its own
    GOLD: 0.9,         // the gold line: break it in one swing
    HP: 100,           // a wall's strength
    DMG: [20, 34],     // a swing's damage, from an empty bar to a full one (20: five swings; 34: three)
    HIT: 6,            // david_gsword_smash: the frame the blade lands
    REST: 0.5,         // after the blow, the blade on the ground this long
    REACH: 2.2,        // tiles from the wall to start it
    HOLE: 5,           // rows broken open at the bottom when it falls (David walks through)
  },
  GSWORD_K: 1.0,     // David with Goliath's sword, next to his usual size
  // (Glen 11-10, "like Metal Gear Solid") the streets of Gath: guards walk and look; crouch behind his hiding pieces
  // (hold Down), or step into the curtained alcove (Up) and stand with your back to the street. Seen: back to the gate
  SNEAK: {
    WALK: 58,          // a guard's walk, px/s
    LOOK: 2.2,         // he stops and looks this long at each end of his beat
    TURN: 0.45,        // ...then turns around
    SIGHT: 7.5,        // tiles he sees a standing David
    SIGHT_LOW: 2.2,    // ...and a crouching one out in the open
    SEEN_T: 0.6,       // the "!" before he calls out (hide in time and he lets it go)
    NEAR: 14,          // px past a hiding piece's edge that still counts as behind it
    CAUGHT_FADE: 1.2,  // seconds of the fade back to the gate
  },
  CARRY: { RUN_MS: 70, JUMP_LAST: 9, LAND_MS: 45,
    WHIRL: [4, 6], FLING: 9, LAST: 13, WHIRL_MS: 80 },   // the sling with the sword on his back (Glen's sheet): frames 4-6 whirl, the sling overhead (11-12: Glen redrew 3-6 with his feet together), 9 lets go   // the sword on his back: run frame time, the last jump frame used, landing frame time
  // (Glen 11-11) the holy bread (21:1-7): his Grok clip of the three of them, cut in two (nob_bread_give, nob_bread_eat),
  //  played in Nob's court in place of Ahimelech, David and Doeg, mirrored so Doeg slips off left, back toward Saul (22:9)
  BREAD: { K: 1.0, TRIGGER: 22, DAVID_DX: 131 },   // size (David's own); columns into the painted court that start it; David in the clip, left of Ahimelech (sheet px)
  // (Glen 11-11) Gath (21:10-15): at the gate the guard knows him, and he acts mad (mash, scribbling on the doors);
  //  in Achish's court, mad again before the king, then once more to get past the elite guards ("Get this crazy
  //  person out of here!"). Mash sizes: [presses to fill, seconds, drain a second] (drill.js startMash)
  // (Glen 11-12) the court on a later visit: the two guards' beats (columns), their pace (px/s); how far a guard sees
  //  ahead (px), and how close is caught anyway (px)
  COURT2: { A: [13, 23], B: [22, 33], SPEED: 75, SEE: 240, NEAR: 50 },
  MAD: { GATE_AT: 14, COURT_AT: 26, GATE: [30, 7, 0.08], KING: [36, 7, 0.10], GUARDS: [40, 7, 0.10] },
  // (Glen 11-11) the Hall of the Tribes, off Nob: his twelve tablets set in the floor, out of order. Walk them in the
  //  order Jacob blessed his sons (Genesis 49:3-27): the blessing's words show at the top, find the picture. A right
  //  one glows and stays safe; a wrong one cracks and drops him back to the door (time, not a heart)
  TRIBES: { AT: 10, STEP: 6, W: 3, SHAKE: 0.35, PROUD: 6, PAD: 80,
    // (Glen's Meta frames, cut_tribe_crumble.py: _c1 cracked, _c2 broken; the rest break in drawn pieces till theirs come)
    C1: ["asher", "benjamin", "dan", "gad", "issachar", "joseph", "judah", "levi", "naphtali", "reuben", "simeon", "zebulun"],
    C2: ["asher", "benjamin", "dan", "gad", "issachar", "joseph", "judah", "levi", "naphtali", "reuben", "simeon", "zebulun"],   // (Glen 11-11: SHAKE, held on a wrong one this long, then down with it)
    FLOOR: ["judah", "gad", "reuben", "joseph", "levi", "asher", "dan", "zebulun", "benjamin", "simeon", "naphtali", "issachar"] },   // (left to right)
  // (Glen 11-12: "make the bow more fun") things hanging high in the trees: only an arrow knocks them down; they grow back
  //  each time he comes back. HIT: how close an arrow has to pass; OLIVES: a cluster's worth
  HANG: { HIT: 40, OLIVES: 5, G: 1500, STEM: 46 },
  // (Glen 11-12, his props for the road down to Gath, cut_w3_props.py) the fallen dead tree: solid ROWS high (David jumps
  //  ~185 px, more with the flip), split by Goliath's sword; SINK: drawn this far into the ground; APART: the halves after
  LOG: { ROWS: 11, SINK: 14, APART: 30 },
  THORN: { K: 0.85, HURT_W: 0.36, HURT_H: 0.7 },   // a thorn bush: its size, and the part of it that hurts (of its width, height)
  VINE: { EVERY: 3.2, SPEED: 230, BOUNCE: 330, SPIN: 4 },   // the vine balls rolling down the road at him
  LADDER: { FRAME_MS: 140, HIT: 40 },
  TOWER: { SINK: 14, RIM: 26 },   // the tall lookout (w3_towertall): into the ground; its top, where he stands, down from the picture's top
  COIL: 0.5,
  // (Glen 11-12) the Tall Trees: the trees' middles (columns), how high their top limbs are (px over the ground), the swing
  //  ropes' anchors over the gaps (px over the limbs) and length; where the climbing tree's rope hangs (px right of its
  //  middle); the bare trunk's middle in its picture; the extra limb on the climbing tree (px over the ground)
  //  The swing ropes hang from out of sight: their ends HANG px under the limbs; they sway SWAY px, swing REACH px at
  //  most, and their bottom GRAB px can be caught
  //  (Glen 11-12: "I can double jump to the swinging rope": their ends HANG over the limbs now, out of reach from the
  //  climbing tree's branches; TOP past a jump and a flip, 320 px, from its highest branch)
  GROVE: { A: 18, B: 42, C: 72, D: 100, TOP: 960, HANG: -100, SWAY: 60, REACH: 380, GRAB: 300, ROPE_X: 120, BARE_MID: 50, EXTRA: 360, FALL: 420,
    BRIDGE: 1.45 },   // (BRIDGE: the rope bridge's pieces' size, about: they're sized to fit the gap exactly)
  KNOT: { X: 80, Y: -40 },   // (w3_knot_branch: its rope's middle from its left, px; its top from the rope's top, px)
  NETTLE_K: 1,   // (his nettles' size; the thorns are THORN.K)
  // (Glen 11-12) Nob after Gath, empty: how dark (0-1, as in Goliath's yard), its fog; the dark music's volume and fade (s);
  //  columns into the painted court where the story is told (by the altar)
  MOURN: { K: 0.9, DARK: 0.62, VOL: 0.4, FADE: 2.5, AT: 10 },
  // Goliath's yard: his bridge's planks this far down each piece (cut_w3_props.py), the gap broken out of it (px); the dark
  //  and the fog: how dark at the start and at his door, how thick the fog
  YARD: { PLANK: { w3_bridge_l: 118, w3_bridge_m1: 103, w3_bridge_m2: 101, w3_bridge_r: 117 }, GAP: 300, DARK0: 0.12, DARK1: 0.5, FOG: 0.3 },         // his rope coiled up (and dropping): its size (the hanging rope is drawn at R3_ROPE.K)   // the rope ladder: each unrolling frame; how close an arrow has to pass the knot
  TREE_SINK: 6,      // the climbing tree, into the ground
  // the swinging ropes (Glen 11-12): their tie (AY, above the top of the screen), length, how far they swing on their own
  //  (A0, radians), the pull of a swing (G), Left/Right pumping it (PUMP), its slowing (DAMP); his hands this far above his
  //  feet (HANDS); a catch this near the rope (GRAB); climbing it (CLIMB px/s); letting go: the throw (BOOST) and hop (JUMP)
  // (Glen 11-12: "it should start slow and we have to [press] left and right in the same direction to get it to swing
  //  more") A0: its sway on its own, small; CATCH: how much of his jump carries into it; PUMP: each push with the swing
  SWING: { AY: -90, LEN: 530, A0: 0.1, CATCH: 0.25, G: 2400, PUMP: 1.9, DAMP: 0.08, HANDS: 104, GRAB: 34, CLIMB: 170, BOOST: 1.05, JUMP: 520, COOL: 0.4, MAX: 0.95 },   // (Glen 11-12: "too fast and wild": A0, PUMP, BOOST, MAX down)
  CROWN: { TOP: 110, X0: 150, X1: 340, ROPE_X: 330 },   // the climbing tree's crown: a ledge TOP px down its picture, from X0 to X1; the rope tied at ROPE_X
  TABLE_K: 0.6,      // the holy bread table (w3_holy_bread_table2 is 611 x 130 at 1)
};

const NOBGATH = {
  key: "nobgath", name: "Nob and Gath", start: "nobroad", carry: ["gibeah", "ramah"],
  strCap: 8,
  rooms: [
    { id: "nobroad",  name: "The Road to Nob",       w: 150, bg: "w4_1", mx: 0, my: 1, mw: 2, right: "nob",
      far: "gibeah/fields_far", mid: "gibeah/fields_mid.png", midY: 24, near: "w3/near_nob.png" },   // (Glen's near layer, 11-10: olive bushes, boulders, a dry-stone wall)
    { id: "nob",      name: "Nob",                   w: 110, bg: "w4_1", mx: 2, my: 1, mw: 2, left: "nobroad", right: "gathroad",
      far: "w3/nob/far", mid: "w3/nob/mid.png", midP: 0.6, near: "w3/nob/near.png", nearY: 606, floor: "w3/nob/floor.png" },   // (Glen 11-10: his far hills, his court wall on green (the tiled roofs cut off), his row of jars and baskets in front)   // (Glen's sanctuary court, the linen hangings and the bronze altar, with his tileable court either side (11-10): one copy, the room's width; the painted court from column 29)
    { id: "crack",    name: "Beneath Nob",           w: 66, up: 30, cave: true, mx: 2, my: 2, mw: 2, mh: 2,
      strip: "w3/crack_strip", floor: "w3/crack_dirt.png", band: [0.04, 0.72] },   // (his cracked wall, a storey repeating up: Castlevania)
    { id: "tribes",   name: "The Hall of the Tribes", w: 96, bg: "w4_4", mx: 4, my: 2, mw: 2,
      strip: "gibeah/halls_strip", floor: "gibeah/halls_floor" },   // (11-11: Saul's halls stand in till Glen paints Nob's own)
    { id: "gathroad", name: "The Road Down to Gath", w: 130, up: 24, bg: "w4_1", mx: 4, my: 1, mw: 2, left: "nob", right: "grove",
      far: "w3/road/far", mid: "w3/road/mid.png", midY: 0, near: "w3/near_gath.png", floor: "w3/road/ground.png" },   // (+ his near layer: sycamore shrubs, a broken jar, a mud-brick stub)
    // (Glen 11-12) the tall trees: trunks too tall to climb, then one that can be, and the way back across their tops
    { id: "grove",    name: "The Tall Trees",        w: 132, up: 42, bg: "w4_1", mx: 6, my: 1, mw: 2, left: "gathroad", right: "gath",
      far: "w3/road/far", mid: "w3/road/mid.png", midY: 0, near: "w3/near_gath.png", floor: "w3/road/ground.png" },
    { id: "gath",     name: "Gath",                  w: 44, bg: "w4_1", mx: 8, my: 1, mw: 1, left: "grove",
      far: "w3/gath/far", mid: "w3/gath/mid.png", midP: 1, midX: 170, midY: -44, near: "w3/gath/near.png", nearY: 606, floor: "w3/gath/floor.png" },   // (Glen 11-10: his dunes and sea far off; his walls and gate fixed to the room, the gate on the door at column 22; his broken jar and bricks in front)   // (his city of Gath, one copy the room's width: its own gate is the door in, at column 22)
    { id: "streets",  name: "The Streets of Gath",   w: 116, bg: "w4_1", mx: 9, my: 1, mw: 2, leftDoor: "d_streetin", right: "giantyard",
      far: "w3/street/far", mid: "w3/street/mid.png", midP: 0.6, midY: -40, near: "w3/street/near.png", nearY: 606, floor: "w3/street/floor.png" },   // (Glen 11-10: his rooftops and sea far off, his houses and awnings, his baskets, jars and sacks in front, their dirt the floor)   // (Glen's street, 11-10, two copies; the sneak: hide behind his stalls and baskets)
    // (Glen 11-12: "make Goliath's house further back ... challenges and pitfalls ... eerie fog") past the cracked wall at
    //  the end of the streets: the giant's yard, darker and foggier the further in, his house at the end
    { id: "giantyard", name: "Goliath's Yard",       w: 96, bg: "w4_1", mx: 9, my: 2, mw: 2, left: "streets", dark: true,
      far: "w3/street/far", mid: "w3/street/mid.png", midP: 0.6, midY: -40, near: "w3/street/near.png", nearY: 606, floor: "w3/street/floor.png" },
    { id: "court",    name: "The Court of Achish",   w: 48, bg: "w4_4", mx: 11, my: 1, mw: 1,
      strip: "w3/court_strip", floor: "w3/court_floor" },
    { id: "goliath",  name: "Goliath's House",       w: 36, bg: "w4_4", mx: 11, my: 2, mw: 1,
      art: "w3/goliath_room.jpg" },   // (Glen 11-10: the giant's room, everything huge: a secret behind the cracked wall at the end of the streets)   // (Glen's hall, 11-10: his painted wall, two column-to-column bays repeating; his slabs and red rug)
  ],
  // the Journal: Glen's song, Verse 3 (SONG_PSALM57.md, his words exactly)
  steps: ["r3_bread", "r3_sword", "r3_gath", "r3_mad"],
  verse: ["They laid a net before my feet", "They dug a pit to bring me down", "But those who plotted against me", "Will fall into their own ground",
    "My heart is steadfast, O my God", "My heart is steadfast still", "Though I am hiding in this cave", "I will trust Your perfect will"],
  // (draft words, for Glen) what David writes after each story moment, and at the end
  entries: [
    ["I came to Nob hungry. Ahimelech the priest gave me the holy bread, for there was no other.", "1 Samuel 21:6"],
    ["The sword of Goliath was there, wrapped in a cloth behind the ephod. There is none like it.", "1 Samuel 21:9"],
    ["I fled to Achish, king of Gath. His servants knew me: \"Isn't this David?\" I was very afraid.", "1 Samuel 21:11-12"],
    ["I acted mad before them, and scribbled on the doors of the gate. Achish sent me away, and I escaped.", "1 Samuel 21:13-15"],
  ],
  end: ["In God I put my trust. I will not be afraid. What can man do to me?", "Psalm 56:11"],
  quiet: () => r3Mourning(), bowAim: (d, dir) => r3BowAim(d, dir),   // (region.js regionStageQuiet: no stage music or birds in an empty Nob)
  drawFront: camX => { r3DrawGuards(camX); r3YardFog(camX); }, holdDavid: (d, dt) => r3SwingHold(d, dt), stoneHits: s => r3StoneHits(s), pitFall: () => r3TrialFall(), build: r3Build, enter: r3Enter, update: r3Update, draw: r3Draw, drawBack: r3DrawWalls, drawOver: r3DrawMight, drawDavid: r3DrawDavid,
};

const R3_KIT = {   // (cut_w3_props.py prints these; into region.js's KIT when the region's built: region.js loads after this file)
  w3_deadtree: { w: 562, h: 382 }, w3_log_l: { w: 189, h: 138 }, w3_log_r: { w: 215, h: 138 }, w3_palm: { w: 362, h: 564 }, w3_palm_b: { w: 343, h: 575 },
  w3_dates_1: { w: 26, h: 35 }, w3_dates_2: { w: 27, h: 33 }, w3_dates_3: { w: 24, h: 29 }, w3_climbtree: { w: 451, h: 613 },
  w3_tamarisk: { w: 374, h: 300 }, w3_broom: { w: 302, h: 150 }, w3_caper: { w: 121, h: 170 }, w3_nettle: { w: 59, h: 80 }, w3_gourd: { w: 85, h: 48 }, w3_tumbleweed: { w: 100, h: 96 },   // (Glen 11-12, tools/cut_w3_plants.py)
  w3_knot_branch: { w: 113, h: 122 },
  w3_trunk_bare: { w: 109, h: 1000 }, w3_trunk_d: { w: 491, h: 1000 }, w3_limb: { w: 270, h: 48 }, w3_crown: { w: 429, h: 371 }, w3_rope_hang: { w: 118, h: 527 }, w3_hive: { w: 63, h: 91 },   // (tools/cut_w3_grove.py)
  w3_thorns: { w: 175, h: 174 }, w3_vineball: { w: 114, h: 114 }, w3_towertall: { w: 251, h: 555 },
  w3_palace_door: { w: 534, h: 357 }, w3_goliath_door: { w: 764, h: 471 },
  w3_bridge_l: { w: 88, h: 157 }, w3_bridge_m1: { w: 113, h: 126 }, w3_bridge_m2: { w: 120, h: 124 }, w3_bridge_r: { w: 91, h: 156 }, w3_climbtree_tall: { w: 466, h: 1354 },
  w3_ladder_1: { w: 117, h: 165 }, w3_ladder_2: { w: 117, h: 323 }, w3_ladder_3: { w: 108, h: 363 }, w3_ladder_4: { w: 80, h: 397 },
  w3_rope_1: { w: 134, h: 215 }, w3_rope_2: { w: 94, h: 363 }, w3_rope_3: { w: 67, h: 329 }, w3_rope_4: { w: 46, h: 389 } };
const R3_LADDER_KNOT = [53, 53, 52, 39];   // (w3_ladder.json: each frame's knot, from its left)
const R3_CLIMBTREE = [{ side: "L", top: 1234, x0: 15, x1: 253 }, { side: "R", top: 1189, x0: 213, x1: 464 }, { side: "L", top: 1089, x0: 1, x1: 253 }, { side: "R", top: 979, x0: 213, x1: 465 }, { side: "L", top: 851, x0: 50, x1: 253 }, { side: "L", top: 720, x0: 1, x1: 253 }, { side: "R", top: 610, x0: 213, x1: 465 }, { side: "L", top: 483, x0: 50, x1: 253 }, { side: "L", top: 382, x0: 69, x1: 253 }, { side: "R", top: 323, x0: 213, x1: 406 }];   // (w3_climbtree_tall.json: its branches, low to high, tree px; Glen 11-12: "way taller so the screen has to go up")   // (w3_climbtree.json: its branches, tree px)
const R3_DATES = [{ n: "w3_dates_1", x: 144, y: 255 }, { n: "w3_dates_2", x: 196, y: 256 }, { n: "w3_dates_3", x: 206, y: 197 }];   // (w3_palm_b.json)
const R3_ROPE_KNOT = [72, 44, 39, 29];   // (w3_rope.json)
const R3_TRUNK_D = { "mid": 246, "ledges": [  {   "side": "L",   "top": 930,   "x0": 0,   "x1": 211  },  {   "side": "L",   "top": 916,   "x0": 0,   "x1": 213  },  {   "side": "R",   "top": 881,   "x0": 288,   "x1": 491  },  {   "side": "R",   "top": 760,   "x0": 273,   "x1": 421  },  {   "side": "L",   "top": 522,   "x0": 73,   "x1": 220  },  {   "side": "R",   "top": 390,   "x0": 266,   "x1": 385  } ]};   // (Glen's climbing tree in the Tall Trees: cut_w3_grove.py's w3_trunk_d.json)
const r3 = { t: 0, hangs: [], thorns: [], vines: [], vineZones: [], gourds: [], quivers: [], honey: [], vineT: 0, ladders: [], swings: [], swing: null, people: [], told: {}, walls: [], might: null, chips: [], hides: [], guards: [], inDoor: null, caughtT: 0, scene: null, mad: null };
const r3Has = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function r3Tell(k, text) { if (!r3.told[k]) { r3.told[k] = true; toast(text); } }
// someone standing in a room: [sprite, x, facing, size]; drawn by r3Draw, looping their sheet
// something hanging up high (R3.HANG): "olives" (a cluster) or "pom"; hy is where its stem is tied
function r3Hang(room, kind, x, hy, img = null) { const y = img ? hy : hy + R3.HANG.STEM; r3.hangs.push({ room, kind, x, hy, y, y0: y, img, state: "hang", vy: 0 }); if (img) kitImg(img); }   // (img: its own picture, its bottom at hy, no stem drawn)
function r3HangReset(room) { for (const h of r3.hangs) if (h.room === room) Object.assign(h, { y: h.y0, state: "hang", vy: 0 }); }
function r3StoneHits(s) {   // (region.js stoneHitsRegion) an arrow cuts a hanging thing down; a stone's too clumsy for it
  const r = region.room; if (!r) return false;
  if (r3PropsHit(s)) return true;
  for (const h of r3.hangs) {
    if (h.room !== r.id || h.state !== "hang" || r3SegDist(s, h.x, h.y - (h.img ? KIT[h.img].h / 2 : 18)) > R3.HANG.HIT) continue;
    if (!s.bow) { r3Tell("hangstone", hasSkill("bow") ? "Too high and small for a stone. Jonathan's bow: hold Up and press X." : "Too high and small for a stone."); return false; }
    h.state = "fall"; h.vy = 0; sfx("stone_hit", h.x, 0.35, 1.6); s.life = 0;
    for (let i = 0; i < 6; i++) bits.push({ x: h.x, y: h.y - 20, vx: (Math.random() - 0.5) * 160, vy: -Math.random() * 120, life: 0.7, color: i % 2 ? "#5d7a3a" : "#8a6a3c" });   // (leaves and stem)
    return true;
  }
  return false;
}
function r3SegDist(s, px, py) {   // how near this frame's stretch of flight passed (an arrow goes 36 px a frame: it'd skip over a small thing)
  const ax = s.x - (s.vx || 0) / 60, ay = s.y - (s.vy || 0) / 60, dx = s.x - ax, dy = s.y - ay, L = dx * dx + dy * dy || 1;
  const u = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / L));
  return Math.hypot(ax + u * dx - px, ay + u * dy - py);
}
// (Glen 11-12) thorn bushes on the road: they hurt; the sword (X) cuts them; they grow back each visit
// (Glen 11-12: his nettles, art "w3_nettle": they sting the same, the sword clears them; Proverbs 24:31)
function r3Thorn(room, x, art = "w3_thorns") { r3.thorns.push({ room, x, cut: false, t: 0, art }); kitImg(art); }
const r3ThornBox = b => { const k = KIT[b.art], s = b.art === "w3_thorns" ? R3.THORN.K : R3.NETTLE_K; return { w: k.w * s, h: k.h * s }; };
// the vine balls (tumbleweeds of old vines): roll down the road at him between x0 and x1; anything breaks them
// (one zone a room: each its own; art: Glen's tumbleweed on the road to Gath, 11-12, Psalm 83:13)
function r3VineZone(room, x0, x1, art = "w3_vineball") { r3.vineZones.push({ room, x0, x1, art }); kitImg(art); }
// the rope ladder (Glen 11-12): rolled up, tied at the top; an arrow through the knot and it unrolls, and there's a ladder
function r3RopeLadder(id, room, x, top, kind = "ladder", tied = false) {   // (kind "rope": his rope, Glen 11-12: climbed like World 2's)
  // (tied, Glen 11-12: "no point in shooting the rope ... I couldn't see it until I was at the top") already down, knotted
  //  round a branch (his trunk_rope picture's knot: w3_knot_branch)
  const o = { id, room, x, top, state: tied || r3Has(id) ? "down" : "up", t: 0, kind, tied }; r3.ladders.push(o);
  if (tied) kitImg("w3_knot_branch");
  for (let i = 1; i <= 4; i++) kitImg(`w3_${kind}_${i}`);
  if (o.state === "down") r3LadderClimb(o);
}
function r3LadderClimb(o) {   // the climbable part (main.js ladders, as region.js rLadder, but drawn here: his rope ladder)
  const c = Math.round(o.x / T) - 1;
  ladders.push({ c, r: o.top / T, bot: GR, rungs: [], top: { dir: 0, y: o.top }, room: o.room, x: (c + 1) * T, topY: o.top, botY: GR * T, rope: o.kind === "rope" });
}
function r3PropsUpdate(dt) {   // the thorns, the vine balls, the ladders: in the room he's in
  const r = region.room, d = david; if (!r) return;
  for (const b of r3.thorns) {
    if (b.room !== r.id) continue; if (b.cut) { b.t += dt; continue; }
    const { w, h } = r3ThornBox(b), nettle = b.art === "w3_nettle";
    if (Math.abs(d.x - b.x) < w * R3.THORN.HURT_W && d.y > FOOT - h * R3.THORN.HURT_H) {
      if (nettle) r3Tell("nettles", "Nettles! They sting. “Its surface was covered with nettles” (Proverbs 24:31). Clear them with your sword (X).");
      else r3Tell("thorns", "Thorns! Cut them down with your sword (X).");
      hurtDavid(b.x, nettle ? "nettles" : "thorns"); }
  }
  const z = r3.vineZones.find(q => q.room === r.id), V = R3.VINE;
  for (const q of r3.quivers) if (q.room === r.id && !q.got && Math.abs(d.x - q.x) < 34 && Math.abs(d.y - q.y) < 60 && hasSkill("bow") && arrowCount() < BOW_ARROWS.MAX) {
    q.got = true; arrowSet(arrowCount() + BOW_ARROWS.BUNDLE); if (typeof chime === "function") chime(3); toast(`Arrows! (${arrowCount()})`); }
  for (const q of r3.honey) if (q.room === r.id && !q.got && Math.abs(d.x - q.x) < 40 && Math.abs(d.y - q.y) < 60) {   // (Glen 11-12) honey: all his strength back
    q.got = true; d.hearts = d.maxHearts; sfx("heal", undefined, 0.8);
    toast("Wild honey! Strength restored. Jonathan tasted honey, \u201cand his eyes brightened\u201d (1 Samuel 14:27).");
  }
  // (Glen 11-12) wild gourds on the road: they look like food. "There is death in the pot!" (2 Kings 4:40)
  for (const o of r3.gourds) if (o.room === r.id && Math.abs(d.x - o.x) < 40 && d.onGround) r3Tell("gourds", "Wild gourds. They look like food, but they're poison: “There is death in the pot!” (2 Kings 4:40) David leaves them be.");
  const busy = r3.might || region.script.length || region.wait > 0;   // (none while he's swinging the big sword, or in a scene)
  if (z && z.room === r.id && d.x > z.x0 && d.x < z.x1 + 200 && !busy) {
    r3.vineT -= dt;
    const vx = Math.min(d.x + W * 0.62, z.x1);
    if (r3.vineT <= 0 && vx - d.x > 360) { r3.vineT = V.EVERY * (0.8 + Math.random() * 0.5); r3.vines.push({ x: vx, y: GR * T, vy: -200, rot: 0 }); }   // (never right on top of him)
  }
  for (const v of r3.vines) {
    v.x -= V.SPEED * dt; v.vy += 1800 * dt; v.y += v.vy * dt; v.rot -= V.SPIN * dt;
    if (v.y >= GR * T) { v.y = GR * T; v.vy = -V.BOUNCE * (0.55 + Math.random() * 0.45); }
    if (!busy && Math.hypot(d.x - v.x, (d.y - 50) - (v.y - 50)) < 62) hurtDavid(v.x, "vines");
  }
  const vc = z && z.art === "w3_tumbleweed" ? ["#8a5a2a", "#c89a5a"] : ["#6b6a2c", "#a7a76a"];
  for (const v of r3.vines) if (z && !v.dead && v.x < z.x0 - 30) { v.dead = true; for (let i = 0; i < 10; i++) bits.push({ x: v.x, y: v.y - 55, vx: (Math.random() - 0.3) * 300, vy: -Math.random() * 360, life: 0.8, color: vc[i % 2] }); }   // (into the tower: broken up)
  r3.vines = r3.vines.filter(v => !v.dead);
  for (const o of r3.ladders) {
    if (o.room !== r.id) continue;
    if (o.kick && o.state === "up" && d.onGround && Math.abs(d.y - o.top) < 12 && Math.abs(d.x - o.x) < 3 * T) { o.state = "drop"; o.t = 0; regionAdd("taken", o.id); sfx("sling_throw_quick", o.x, 0.5, 0.7); continue; }   // (he kicks it loose)
    if (o.state === "up" && !o.kick && Math.abs(d.x - o.x) < 330 && hasSkill("bow")) r3Tell(o.kind, o.kind === "rope" ? "A rope, coiled and tied up in the tree. Shoot the knot loose: hold Up and press X." : "A rope ladder, rolled up and tied at the top. Shoot the knot loose: hold Up and press X.");
    if (o.state === "drop" && (o.t += dt) * 1000 >= R3.LADDER.FRAME_MS * 3) { o.state = "down"; r3LadderClimb(o); if (typeof chime === "function") chime(5); toast(o.kick ? (o.kind === "rope" ? "David kicks the rope loose: the way down." : "David kicks the far ladder loose: the way down.") : o.kind === "rope" ? "The rope's down! Up to climb it (or jump and grab it)." : "The ladder's down! Up to climb it."); }
  }
}
function r3PropsHit(s) {   // (r3StoneHits) the sword cuts thorns; anything breaks a vine ball; an arrow cuts the ladder's knot loose
  const r = region.room;
  if (s.sword) for (const b of r3.thorns) {
    if (b.room !== r.id || b.cut) continue; const { w, h } = r3ThornBox(b);
    if (Math.abs(s.x - b.x) < w * 0.55 && s.y > FOOT - h - 20) {
      b.cut = true; b.t = 0; sfx("stone_hit", b.x, 0.4, 1.7);
      for (let i = 0; i < 14; i++) bits.push({ x: b.x + (Math.random() - 0.5) * w * 0.6, y: FOOT - h * Math.random(), vx: (Math.random() - 0.5) * 360, vy: -Math.random() * 380, life: 0.9, color: i % 3 ? "#7a5a3a" : "#8a9a52" });
      return true;
    }
  }
  for (const v of r3.vines) if (!v.dead && Math.hypot(s.x - v.x, s.y - (v.y - 55)) < 64) {
    v.dead = true; sfx("stone_hit", v.x, 0.35, 1.5);
    for (let i = 0; i < 14; i++) bits.push({ x: v.x, y: v.y - 55, vx: (Math.random() - 0.5) * 380, vy: -Math.random() * 420, life: 0.9, color: i % 2 ? "#6b6a2c" : "#a7a76a" });
    return true;
  }
  if (s.bow) for (const o of r3.ladders) if (o.room === r.id && o.state === "up" && r3SegDist(s, o.x, o.top + 14) < R3.LADDER.HIT) {
    o.state = "drop"; o.t = 0; regionAdd("taken", o.id); sfx("sling_throw_quick", o.x, 0.6, 0.6); s.life = 0; return true;
  }
  return false;
}
// (Glen 11-12) a bundle of arrows on the ground: walk over it (when he isn't full); back each time he comes in
function r3Quiver(room, x, y = FOOT) { r3.quivers.push({ room, x, y, got: false }); }   // (y: its ledge's top, up a tree)
// (Glen 11-12: "I can't shoot the arrow straight") shooting up: an arrow goes for a rope's or a ladder's knot overhead,
//  if one's close (ramah.js r2LooseArrow asks); null: the usual angle
function r3BowAim(d, dir) {
  const r = region.room; if (!r) return null;
  for (const o of r3.ladders) {
    if (o.room !== r.id || o.state !== "up") continue;
    const dx = o.x - d.x, dy = d.y - R2.ARROW.UP_DY - (o.top + 14);
    if (dy > 40 && Math.hypot(dx, dy) < 900 && (Math.abs(dx) < 60 || Math.sign(dx) === dir)) return Math.max(0.3, Math.min(1.52, Math.atan2(dy, Math.abs(dx))));
  }
  return null;
}
function r3PropsReset(room) { for (const q of r3.quivers.concat(r3.honey)) if (q.room === room) q.got = false; r3PropsReset0(room); }
function r3PropsReset0(room) { for (const b of r3.thorns) if (b.room === room) b.cut = false; r3.vines.length = 0; r3.vineT = 1.2; }
function r3PropsDraw(camX) {
  const r = region.room; if (!r) return;
  for (const q of r3.quivers) if (q.room === r.id && !q.got && hasSkill("bow") && ITEM.arrow && ITEM.arrow.naturalWidth) {   // three arrows, fanned
    const im = ITEM.arrow, w = 64, h = im.naturalHeight * w / im.naturalWidth, x = q.x - camX, y = q.y - 12 + Math.sin(r3.t * 3 + q.x) * 2;
    for (const a of [-0.5, -0.38, -0.26]) { ctx.save(); ctx.translate(x, y); ctx.rotate(a); ctx.drawImage(im, -w / 2, -h / 2, w, h); ctx.restore(); }
  }
  for (const q of r3.honey) if (q.room === r.id) {   // the hive on its limb, and (till he takes it) the honey
    const hv = kitImg("w3_hive"), hk = KIT.w3_hive; if (hv) ctx.drawImage(hv, q.x - camX + 60, q.y + 4, hk.w, hk.h);   // (hung under the limb)
    const hn = ITEM.honey; if (!q.got && hn && hn.naturalWidth) ctx.drawImage(hn, q.x - camX - 24, q.y - 52 + Math.sin(r3.t * 3) * 2, 48, 51);
  }
  for (const o of r3.gourds) { const im = kitImg("w3_gourd"), k = KIT.w3_gourd; if (o.room === r.id && im) ctx.drawImage(im, o.x - camX - k.w / 2, FOOT - k.h + 2, k.w, k.h); }
  for (const b of r3.thorns) {
    const tk = KIT[b.art], ti = kitImg(b.art);
    if (b.room !== r.id || !ti) continue; const { w, h } = r3ThornBox(b), x = b.x - camX; if (x < -w || x > W + w) continue;
    if (b.cut) {   // falling away, then the stumps
      if (b.t < 0.5) { ctx.save(); ctx.globalAlpha = 1 - b.t / 0.5; ctx.drawImage(ti, x - w / 2, FOOT - h + 8 + b.t * 120, w, h * (1 - b.t)); ctx.restore(); }
      else { ctx.save(); ctx.globalAlpha = 0.85; ctx.drawImage(ti, 0, tk.h * 0.78, tk.w, tk.h * 0.22, x - w / 2, FOOT - h * 0.22 + 8, w, h * 0.22); ctx.restore(); }
      continue;
    }
    ctx.drawImage(ti, x - w / 2, FOOT - h + 8, w, h);
  }
  const vz = r3.vineZones.find(q => q.room === r.id), va = vz ? vz.art : "w3_vineball", vi = kitImg(va), vk = KIT[va];
  if (vi) for (const v of r3.vines) { ctx.save(); ctx.translate(v.x - camX, v.y - vk.h / 2 + 4); ctx.rotate(v.rot); ctx.drawImage(vi, -vk.w / 2, -vk.h / 2, vk.w, vk.h); ctx.restore(); }
  for (const o of r3.ladders) {
    if (o.room !== r.id) continue;
    const i = o.state === "up" ? 0 : o.state === "down" ? 3 : Math.min(3, 1 + Math.floor(o.t * 1000 / R3.LADDER.FRAME_MS)), n = `w3_${o.kind}_${i + 1}`, k = KIT[n], im = kitImg(n);
    if (o.kind === "rope" && i === 3 && o.tied) {   // the rope from his knot on the branch (the rope's own knot left off)
      const kb = KIT.w3_knot_branch, ki = kitImg("w3_knot_branch"), kx = o.x - camX - R3.KNOT.X, ky = o.top + R3.KNOT.Y;
      r3DrawRopeLong(o.x - camX, ky + kb.h - 30, FOOT - (ky + kb.h - 30) + 14, true);
      if (ki) ctx.drawImage(ki, kx, ky, kb.w, kb.h);
      continue;
    }
    if (o.kind === "rope" && i === 3) { r3DrawRopeLong(o.x - camX, o.top - 10, FOOT - o.top + 14); continue; }
    const s = o.kind === "rope" ? R3.COIL : (FOOT - o.top) / KIT[`w3_${o.kind}_4`].h, knot = o.kind === "rope" ? R3_ROPE_KNOT : R3_LADDER_KNOT; if (!im) continue;
    ctx.drawImage(im, o.x - camX - knot[i] * s, o.top - 10, k.w * s, k.h * s);
  }
}
// (Glen 11-12) the swinging ropes: Donkey Kong style. Each hangs from AY and swings on its own; jump into one and he
//  catches it; Left / Right swing him, Up / Down climb it; A lets go with the swing's speed
// (o: a long rope from out of sight above, the Tall Trees: a0 its sway, max its farthest swing (radians), grab how much of
//  it from the bottom up he can catch and climb, px)
function r3Swing(room, ax, ay = R3.SWING.AY, len = R3.SWING.LEN, o = {}) { r3.swings.push(Object.assign({ room, ax, ay, len, ang: 0, w: 0, ph: Math.random() * 6, cool: 0 }, o)); }
const r3SwingLow = q => q.grab ? q.len - q.grab : q.len * 0.45;   // (the top of the part he can hold)
const r3SwingTip = (q, l = q.len) => [q.ax + Math.sin(q.ang) * l, q.ay + Math.cos(q.ang) * l];
function r3SwingUpdate(dt) {
  const r = region.room, d = david, S = R3.SWING; if (!r) return;
  for (const q of r3.swings) {
    if (q.room !== r.id) continue;
    q.cool = Math.max(0, q.cool - dt);
    if (r3.swing && r3.swing.q === q) continue;
    const w0 = Math.sqrt(S.G / q.len), a0 = q.a0 ?? S.A0, want = a0 * Math.sin(r3.t * w0 + q.ph);   // (on its own: back and forth, settling back to its sway after he lets go)
    q.ang += (want - q.ang) * Math.min(1, dt * 6); q.w = a0 * w0 * Math.cos(r3.t * w0 + q.ph);
    // a catch: in the air, his hands near the rope, below its top part
    if (r3.swing || d.onGround || q.cool > 0 || d.deadT > 0 || d.state === "climb" || region.wait > 0) continue;
    const hx = d.x, hy = d.y - S.HANDS, ux = Math.sin(q.ang), uy = Math.cos(q.ang);
    const along = (hx - q.ax) * ux + (hy - q.ay) * uy, off = Math.abs((hx - q.ax) * uy - (hy - q.ay) * ux);
    if (along > r3SwingLow(q) && along < q.len + 10 && off < S.GRAB) {
      r3.swing = { q, hold: Math.min(q.len - 6, along) };
      q.w += d.vx / r3.swing.hold * S.CATCH;   // (a little of his jump carries into the swing)
      d.vx = d.vy = 0; setState("swing"); sfx("jump", d.x, 0.3, 0.7);
      r3Tell("swing", "Swinging! Left and Right to swing higher, Up and Down to climb. A to let go.");
    }
  }
}
function r3SwingHold(d, dt) {   // (region.js regionClimbHold) on a swinging rope he goes where it goes
  const sw = r3.swing; if (!sw) return false;
  const q = sw.q, S = R3.SWING;
  if (d.deadT > 0 || !region.room || region.room.id !== q.room) { r3.swing = null; return false; }
  const dir = (held("right") ? 1 : 0) - (held("left") ? 1 : 0);
  if (dir) { d.facing = dir; if (Math.sign(q.w) === dir || Math.abs(q.w) < 0.08) q.w += dir * S.PUMP * dt; }   // (only pushing the way it's going adds)   // (pump with the swing, as on a swing set)
  sw.hold = Math.max(r3SwingLow(q), Math.min(q.len - 6, sw.hold + ((held("down") ? 1 : 0) - (held("up") ? 1 : 0)) * S.CLIMB * dt));
  q.w += -(S.G / sw.hold) * Math.sin(q.ang) * dt; q.w *= 1 - S.DAMP * dt; q.ang += q.w * dt;
  const mx = q.max ?? S.MAX; if (Math.abs(q.ang) > mx) { q.ang = Math.sign(q.ang) * mx; q.w *= -0.3; }
  const [hx, hy] = r3SwingTip(q, sw.hold);
  d.x = hx; d.y = hy + S.HANDS; d.vx = d.vy = 0; d.onGround = false; d.swordT = -1; d.shield = false; d.charging = false; d.throwT = -1;
  if (d.state !== "swing") setState("swing");
  if (pressed("a")) {   // let go: off with the rope's speed, and a hop
    const v = q.w * sw.hold;
    d.vx = v * Math.cos(q.ang) * S.BOOST + d.facing * 120; d.vy = Math.min(0, -v * Math.sin(q.ang)) - S.JUMP;
    q.cool = S.COOL; r3.swing = null; d.flipUsed = false; setState("jump"); sfx("jump", d.x, 0.5, 1.1);
  }
  return true;
}
// (Glen 11-12: "the rope looks goofy so big ... longer without making it thicker") his hanging rope at its own thickness
//  (K), its plain middle repeated for the length; the knots at either end as they are. x: the rope's line; from y0, len long
const R3_ROPE = { K: 0.9, TOP: 72, BOT: 336,
  // (Glen 11-12: "longer and more natural with physics") each swinging rope is drawn as a chain of LINKS points that hang
  //  and pull on each other (Verlet); the game's swing (the straight line it pivots on) leads it: FOLLOW, how hard each
  //  point is drawn toward that line (most near the top, least at the loose end); SLACK, a little give in it
  LINKS: 18, FOLLOW: 7, LOOSE: 0.25, DAMP: 0.985, ITER: 10 };   // (w3_rope_4: the top knot ends at 72, the bottom one starts at 336)
function r3DrawRopeLong(x, y0, len, noKnot = false) {   // (noKnot: no knot at the top: it's tied to something drawn over it)
  const im = kitImg("w3_rope_4"), k = KIT.w3_rope_4, R = R3_ROPE, s = R.K; if (!im) return false;
  const w = k.w * s, x0 = x - R3_ROPE_KNOT[3] * s, top = noKnot ? 0 : R.TOP * s, bot = (k.h - R.BOT) * s, mid = (R.BOT - R.TOP) * s;
  if (!noKnot) ctx.drawImage(im, 0, 0, k.w, R.TOP, x0, y0, w, top);
  ctx.save(); ctx.beginPath(); ctx.rect(x0 - 2, y0 + top - 1, w + 4, Math.max(0, len - top - bot) + 2); ctx.clip();
  for (let y = y0 + top; y < y0 + len - bot; y += mid - 1) ctx.drawImage(im, 0, R.TOP, k.w, R.BOT - R.TOP, x0, y, w, mid);
  ctx.restore();
  ctx.drawImage(im, 0, R.BOT, k.w, k.h - R.BOT, x0, y0 + len - bot, w, bot);
  return true;
}
// the rope as a chain: top tied; the rest falls, pulls on its neighbors, and is drawn toward the swing's line (where the
//  game says the rope is); while he holds it, the point at his hands goes where his hands are
function r3RopeChain(q, dt) {
  const R = R3_ROPE, n = R.LINKS, L = q.len + 34, seg = L / n;
  if (!q.pts) { q.pts = []; for (let i = 0; i <= n; i++) { const [x, y] = r3SwingTip(q, i * seg - 20); q.pts.push({ x, y, ox: x, oy: y }); } }
  const P = q.pts, held = r3.swing && r3.swing.q === q ? r3.swing.hold + 20 : -1, g = 1600 * dt * dt;
  for (let i = 1; i <= n; i++) { const p = P[i], vx = (p.x - p.ox) * R.DAMP, vy = (p.y - p.oy) * R.DAMP; p.ox = p.x; p.oy = p.y; p.x += vx; p.y += vy + g; }
  for (let i = 1; i <= n; i++) {   // drawn toward the swing's line: firmly near the top, loosely at the end (it trails and bends)
    const f = held >= 0 && i * seg > held ? 0.02 : 1 - (1 - R.LOOSE) * (i / n);
    const [tx, ty] = r3SwingTip(q, i * seg - 20), k = Math.min(1, R.FOLLOW * f * dt);
    P[i].x += (tx - P[i].x) * k; P[i].y += (ty - P[i].y) * k;
  }
  for (let it = 0; it < R.ITER; it++) {
    const [ax, ay] = r3SwingTip(q, -20); P[0].x = ax; P[0].y = ay;
    if (held >= 0) { const [hx, hy] = r3SwingTip(q, held - 20), j = Math.min(n, Math.round(held / seg)); P[j].x = hx; P[j].y = hy; }
    for (let i = 0; i < n; i++) {
      const a = P[i], b = P[i + 1], dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 1, e = (d - seg) / d / 2;
      if (i > 0) { a.x += dx * e; a.y += dy * e; b.x -= dx * e; b.y -= dy * e; } else { b.x -= dx * e * 2; b.y -= dy * e * 2; }
    }
  }
}
function r3DrawRopeChain(q, camX) {   // his rope picture along the chain: the top knot, the twisted middle piece by piece, the end knot
  const im = kitImg("w3_rope_4"), k = KIT.w3_rope_4, R = R3_ROPE, s = R.K, P = q.pts; if (!im || !P) return false;
  const w = k.w * s, ox = R3_ROPE_KNOT[3] * s, mid = R.BOT - R.TOP;
  const piece = (a, b, sy, sh, len) => {   // a piece of the picture from a to b
    const ang = Math.atan2(b.x - a.x, b.y - a.y);
    ctx.save(); ctx.translate(a.x - camX, a.y); ctx.rotate(-ang); ctx.drawImage(im, 0, sy, k.w, sh, -ox, 0, w, len + 1.5); ctx.restore();
  };
  let along = 0;
  for (let i = 0; i < P.length - 1; i++) {
    const a = P[i], b = P[i + 1], len = Math.hypot(b.x - a.x, b.y - a.y);
    if (i === 0) piece(a, b, 0, R.TOP, R.TOP * s);   // (the knot it's tied with, at the top)
    else { const sy = R.TOP + (along / s) % (mid - len / s); piece(a, b, sy, len / s, len); }
    along += len;
  }
  const a = P[P.length - 2], b = P[P.length - 1]; piece(b, { x: b.x + (b.x - a.x), y: b.y + (b.y - a.y) }, R.BOT, k.h - R.BOT, (k.h - R.BOT) * s);   // (the knot at the end)
  return true;
}
// (Glen 11-12: "eerie fog") Goliath's yard: the world darkens the further in (behind David), and fog drifts over everything
const r3YardK = camX => { const r = region.room; return r && r.id === "giantyard" ? Math.max(0, Math.min(1, (camX + W / 2 - r.c0 * T) / (r.w * T))) : r && r.id === "goliath" ? 1 : r3Mourning() ? R3.MOURN.K : -1; };
function r3YardDark(camX) {
  const k = r3YardK(camX), Y = R3.YARD; if (k < 0) return;
  ctx.fillStyle = r3Mourning() ? `rgba(14,16,30,${R3.MOURN.DARK})` : `rgba(16,12,28,${Y.DARK0 + (Y.DARK1 - Y.DARK0) * k})`; ctx.fillRect(0, camY, W, H);
}
function r3YardFog(camX) {
  const k = r3YardK(camX), Y = R3.YARD; if (k < 0) return;
  ctx.save(); ctx.fillStyle = `rgba(16,12,28,${0.12 * k})`; ctx.fillRect(0, 0, W, H);
  const t = r3.t;
  for (let i = 0; i < 7; i++) {   // big soft wisps drifting low over the ground
    const x = ((i * 337 + t * (14 + i * 4) - camX * 0.3) % (W + 600) + W + 600) % (W + 600) - 300, y = H * 0.62 + Math.sin(t * 0.3 + i) * 40 + (i % 3) * 50;
    const g = ctx.createRadialGradient(x, y, 10, x, y, 260); g.addColorStop(0, `rgba(205,205,220,${(0.05 + Y.FOG * k) * 0.55})`); g.addColorStop(1, "rgba(205,205,220,0)");
    ctx.fillStyle = g; ctx.save(); ctx.translate(x, y); ctx.scale(1.8, 0.55); ctx.translate(-x, -y); ctx.fillRect(x - 300, y - 300, 600, 600); ctx.restore();
  }
  const gb = ctx.createLinearGradient(0, H * 0.72, 0, H); gb.addColorStop(0, "rgba(200,200,215,0)"); gb.addColorStop(1, `rgba(200,200,215,${0.08 + Y.FOG * 0.6 * k})`);
  ctx.fillStyle = gb; ctx.fillRect(0, H * 0.72, W, H * 0.28); ctx.restore();
}
function r3SwingDraw(camX) {   // the ropes (his rope picture, turned with the swing)
  const r = region.room; if (!r) return;
  const im = kitImg("w3_rope_4"), k = KIT.w3_rope_4;
  for (const q of r3.swings) {
    if (q.room !== r.id) continue;
    const x = q.ax - camX; if (x < -q.len || x > W + q.len) continue;
    if (q.pts && r3DrawRopeChain(q, camX)) continue;   // (Glen 11-12: bending, with physics)
    ctx.save(); ctx.translate(x, q.ay); ctx.rotate(-q.ang);
    if (!r3DrawRopeLong(0, -20, q.len + 34)) { ctx.strokeStyle = "#a88a5a"; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, q.len); ctx.stroke(); }
    ctx.restore();
  }
}
function r3HangUpdate(dt) {
  const r = region.room, d = david; if (!r) return;
  for (const h of r3.hangs) {
    if (h.room !== r.id) continue;
    if (h.state === "fall") { h.vy += R3.HANG.G * dt; h.y += h.vy * dt; if (h.y >= GR * T) { h.y = GR * T; h.state = "ground"; sfx("stone_hit", h.x, 0.25, 0.7); } }
    else if (h.state === "ground" && Math.abs(d.x - h.x) < 40 && Math.abs(d.y - h.y) < 60) {
      h.state = "taken"; if (typeof chime === "function") chime(4);
      if (h.kind === "pom") { d.hearts = Math.min(d.maxHearts, d.hearts + RTUNE.HP_PER_HEART); toast("A pomegranate, shot down from the fig! A heart back."); }
      else if (h.kind === "dates") { d.hearts = Math.min(d.maxHearts, d.hearts + RTUNE.HP_PER_HEART / 2); toast("Dates from the palm! Half a heart back."); }
      else { d.olives += R3.HANG.OLIVES; d.gathered = (d.gathered || 0) + R3.HANG.OLIVES; toast(`A cluster of olives: ${R3.HANG.OLIVES} more!`); }
    }
  }
}
function r3HangDraw(camX) {
  const r = region.room; if (!r) return;
  for (const h of r3.hangs) {
    if (h.room !== r.id || h.state === "taken") continue;
    const x = h.x - camX; if (x < -60 || x > W + 60) continue;
    if (h.img) { const k = KIT[h.img], im = kitImg(h.img); if (im) ctx.drawImage(im, x - k.w / 2, h.y - k.h, k.w, k.h); continue; }
    if (h.state === "hang") {   // the stem, and a little sway
      const sw = Math.sin(r3.t * 1.7 + h.x) * 4;
      ctx.strokeStyle = "#5a4326"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, h.hy); ctx.quadraticCurveTo(x + sw, h.hy + 20, x + sw, h.y - 22); ctx.stroke();
      r3HangPic(h, x + sw, h.y);
    } else r3HangPic(h, x, h.y);
  }
}
function r3HangPic(h, x, y) {   // its bottom at y
  if (h.kind === "pom") { const im = ITEM.pomegranate; if (im && im.naturalWidth) { const s = 40 / im.naturalHeight; ctx.drawImage(im, x - im.naturalWidth * s / 2, y - 40, im.naturalWidth * s, 40); } return; }
  const g = ITEM.olive_green, p = ITEM.olive_purple, spots = [[0, -38], [-12, -28], [12, -28], [-6, -16], [8, -14], [0, -4]];
  spots.forEach(([dx, dy], i) => { const im = i % 2 ? p : g; if (im && im.naturalWidth) ctx.drawImage(im, x + dx - 12, y + dy - 12, 24, 24 * im.naturalHeight / im.naturalWidth);
    else { ctx.fillStyle = i % 2 ? "#4a2a52" : "#6f8a2a"; ctx.beginPath(); ctx.arc(x + dx, y + dy, 7, 0, 7); ctx.fill(); } });
}
function r3Person(room, name, x, facing = 1, k = R3.NPC_K, tag = null) { r3.people.push({ room, name, x, facing, k, ph: Math.random() * 3, tag }); }
// (Glen 11-11: "this guy is walking in place") someone on a walk sheet: up and down between x0 and x1, v px a second
function r3Walker(room, name, x0, x1, v, tag = null) { r3Person(room, name, x0, 1, R3.NPC_K, tag); Object.assign(r3.people[r3.people.length - 1], { walk: { x0, x1, v } }); }
function r3Prop(room, n, x, s = 1, y = null) {   // one of Glen's World 3 pieces standing on the ground (x: its middle)
  const k = KIT[n]; region.props.push({ room, n, x: x - k.w * s / 2, y: y ?? FOOT - k.h * s, s, back: true });
}

// ---------------------------------------------------------------------------
// building
// ---------------------------------------------------------------------------
function r3Build(R) {
  Object.assign(KIT, R3_KIT);
  r3.hangs.length = 0; r3.thorns.length = 0; r3.vines.length = 0; r3.vineZones.length = 0; r3.gourds.length = 0; r3.quivers.length = 0; r3.honey.length = 0; r3.ladders.length = 0; r3.swings.length = 0; r3.swing = null; r3.people.length = 0; r3.walls.length = 0; r3.hides.length = 0; r3.guards.length = 0; r3.inDoor = null; r3.caughtT = 0; r3.scene = null; r3.mad = null;

  // -- The Road to Nob (21:1): out of Gibeah's country, fields and hills, on to the priests' town
  let c = R("nobroad");
  { const X = k => (c + k) * T;
    ground(c, c + 149);
    campfire(c + 4, GR - 1);
    oliveRow(c + 10, 16, 5);
    rDeco("nobroad", "f_olive", c + 20); rDeco("nobroad", "f_rock", c + 30);
    // (Glen 11-12) the bow up high: olives hanging in the olive tree, a pomegranate in the fig; crows on the tree and the
    //  wall, a raven on the tower (they come at him when he's near). r3Hang: [room, kind, x, y of where it hangs from]
    r3Hang("nobroad", "olives", X(18) + 10, FOOT - 330); r3Hang("nobroad", "olives", X(22) - 10, FOOT - 300);
    r3Hang("nobroad", "pom", X(58) + 20, FOOT - 210);
    bird("crow", "nobroad", X(20) - 40, FOOT - 470); bird("crow", "nobroad", X(37), FOOT - 83);
    rLowWall("nobroad", c + 36);
    { const c1 = rTerrace("nobroad", c + 44, 1); oliveRow(c + 45, onTop(FOOT - 136) - 0.4, c1 - c - 46); }
    rDeco("nobroad", "f_fig", c + 58); rBreak("jar", "nobroad", c + 62, 16);
    rDeco("nobroad", "fg_grass", c + 66, true, 1.35);
    { // (Glen 11-11) the watchtower: in the way now, to climb or jump over, and sunk into the ground (its round base
      //  stood on the dirt). Its top: TOWER_SINK px down from the art's; a boulder before it to jump from
      const k = KIT.f_tower_low, y = FOOT - k.h + 22, top = y + 8,   // (Glen 11-12: its base down over the ground's edge, in front of it)
       _ = 0, r0 = Math.ceil(top / T);   // (f_tower_low: Glen's tower, its bottom 86 px cut off)
      region.props.push({ room: "nobroad", n: "f_tower_low", x: (c + 74) * T + T / 2 - k.w / 2, y });
      block(c + 71, r0, 7, GR - r0, 6); for (let i = 0; i < 7; i++) for (let r = r0; r < GR; r++) artSolid.add((c + 71 + i) + "," + r);
      platAt(c + 71, top, 7); oliveRow(c + 72, onTop(top) - 0.4, 5);
      region.walls.push({ room: "nobroad", x0: (c + 71) * T, x1: (c + 78) * T, top: r0 * T, need: "wallClimb" });
      rBoulder("nobroad", c + 64);
    }
    bird("raven", "nobroad", X(75), FOOT - KIT.f_tower_low.h + 30);
    // (Glen 11-12, his animals: wildlife.js) a partridge in the grass, hyraxes by the rocks, a hoopoe, a caracal on the
    //  prowl, and an ibex that charges along the open ground before the watchtower (too tough to stop: jump it)
    rWild("partridge", "nobroad", c + 14, { range: 1 }); rWild("hyrax", "nobroad", c + 32, { range: 1 }); rWild("hyrax", "nobroad", c + 33, { range: 1, facing: 1 });
    rWild("hoopoe", "nobroad", c + 54, { range: 1 }); rWild("caracal", "nobroad", c + 24, { range: 3, tree: FOOT - 190, facing: -1 });   // (up in the olive tree)
    r3Quiver("nobroad", X(12) + 10); r3Quiver("nobroad", X(61));
    rWild("ibex", "nobroad", c + 66, { range: 2 });   // (between the fig and the watchtower: a charge ends at a wall, never the ravine)
    // (Glen 11-12, his plants) a tamarisk by the road (Saul sat under one at Gibeah, 1 Samuel 22:6), a broom bush, a caper
    //  hanging down the terrace wall, nettles before the fig
    rDeco("nobroad", "w3_tamarisk", c + 7); rDeco("nobroad", "w3_broom", c + 49);
    region.props.push({ room: "nobroad", n: "w3_caper", x: X(44) - 10, y: FOOT - 136 - 12 });
    r3Thorn("nobroad", X(55), "w3_nettle"); r3Thorn("nobroad", X(56) + 10, "w3_nettle");
    oliveRow(c + 80, 16, 4);
    rRelic("r3_stone_road", "stone", c + 84, 16);
    // (Glen 11-12: "Mario and Donkey Kong style Tarzan swinging from rope to rope over a pit") a ravine before Nob, three
    //  ropes hanging from the branches overhead: jump and catch one, Left / Right to swing, A to let go
    // (Glen 11-12: "I can clear it in one rope ... make the pit twice as long") 48 wide now, five ropes
    rHole("nobroad", c + 94, 48);
    for (const k of [98, 107, 116, 125, 134]) r3Swing("nobroad", X(k) + T / 2);
    oliveRow(c + 143, 16, 3);
  }

  // -- The Tall Trees (Glen 11-12): three trunks too tall to climb (their limbs only up top), then the last one, which can
  //    be: its branches part way, then his rope (shoot it loose). On top: a jar and a pomegranate. Back across the tops:
  //    a swing rope to the third tree (arrows), a rope bridge to the second (honey, the hornets and bees), a swing to the
  //    first (arrows), then down. Glen's pieces: cut_w3_grove.py
  c = R("grove");
  { const X = k => (c + k) * T, G = R3.GROVE, top = Math.round((FOOT - G.TOP) / T) * T, tY = FOOT - KIT.w3_trunk_bare.h + 6;
    ground(c, c + 131);
    campfire(c + 4, GR - 1); oliveRow(c + 8, 16, 4); r3Quiver("grove", X(12));   // (an arrow for the rope, whatever he came with)
    const limb = (cx, side, y = top, len = 1) => {   // a limb out of a trunk at y (its top), side -1 left / 1 right: a ledge
      const k = KIT.w3_limb, w = k.w * len, x = side > 0 ? cx - 6 : cx - w + 6;
      region.props.push({ room: "grove", n: "w3_limb", x, y: y - 10, s: len, flip: side > 0 });
      platAt(Math.ceil(x / T), y, Math.max(1, Math.floor((x + w) / T) - Math.ceil(x / T)));
      return side > 0 ? x + w : x;   // (its tip)
    };
    const crown = cx => { const k = KIT.w3_crown; region.props.push({ room: "grove", n: "w3_crown", x: cx - k.w / 2, y: tY - k.h + 70 }); };
    const tall = cx => { region.props.push({ room: "grove", n: "w3_trunk_bare", x: cx - G.BARE_MID, y: tY }); crown(cx); };
    const xA = X(G.A) + T / 2, xB = X(G.B) + T / 2, xC = X(G.C) + T / 2, xD = X(G.D) + T / 2;
    for (const x of [xA, xB, xC]) tall(x);
    // the one to climb: his branchy column (branches on the lower half), one more limb where the gap's too big, his rope
    { const J = R3_TRUNK_D, x0 = xD - J.mid;
      region.props.push({ room: "grove", n: "w3_trunk_d", x: x0, y: tY }); crown(xD);
      for (const b of J.ledges) { const a = Math.ceil((x0 + b.x0 + 8) / T), z = Math.floor((x0 + b.x1 - 8) / T); if (z > a) platAt(a, tY + b.top + 4, z - a); }
      limb(xD, -1, FOOT - G.EXTRA, 0.7); }
    const dL = limb(xD, -1); limb(xD, 1);
    rBreak("jar", "grove", Math.floor((xD + 60) / T), onTop(top)); rRelic("r3_pom_grove", "pomegranate", Math.floor((xD - 120) / T), onTop(top));
    r3RopeLadder("r3_rope_grove", "grove", Math.round((xD + G.ROPE_X) / T) * T, top, "rope"); r3.ladders[r3.ladders.length - 1].kick = true;
    // the third tree (arrows), a swing over from the climbing one, hung from a long limb of its own
    const cR = limb(xC, 1), cL = limb(xC, -1); r3Quiver("grove", xC + 120, top);
    const hang = ax => { const ay = -(roomById("grove").up + 3) * T, len = top + G.HANG - ay;   // (Glen 11-12: "the rope extending off screen")
      r3Swing("grove", ax, ay, len, { a0: Math.asin(G.SWAY / len), max: Math.asin(G.REACH / len), grab: G.GRAB }); };
    hang((cR + dL) / 2);
    // a rope bridge from the third tree to the second
    { // (Glen 11-12: "wider and longer ... the pieces to fit nice") its posts on the two limbs, as many plank pieces as
      //  fit between, all of it sized so it ends right at the far post
      const Y = R3.YARD, bR = limb(xB, 1), x0 = bR - 60, x1 = cL + 60, kw = n => KIT[n].w - 4;
      const mids = n => Array.from({ length: n }, (_, i) => i % 2 ? "w3_bridge_m1" : "w3_bridge_m2");
      const len = list => list.reduce((a, n) => a + kw(n), 0), ends = ["w3_bridge_l", "w3_bridge_r"];
      let n = 1; while (len([...ends, ...mids(n + 1)]) * G.BRIDGE <= x1 - x0) n++;
      const list = ["w3_bridge_l", ...mids(n), "w3_bridge_r"], s = (x1 - x0) / len(list);
      let x = x0; for (const p of list) { region.props.push({ room: "grove", n: p, x, y: top - Y.PLANK[p] * s, s }); x += kw(p) * s; }
      platAt(Math.floor(x0 / T), top, Math.ceil((x1 - x0) / T)); }
    // the second tree: the wild honey, its hive, the hornets, the bees (Part One's)
    const bL = limb(xB, -1); r3.honey.push({ room: "grove", x: xB + 150, y: top, got: false });
    for (const k of [0, 1, 2]) rWild("hornet", "grove", Math.round(xB / T) + 2 + k * 2, { y: top - 120 - k * 40 });
    for (const k of [0, 1, 2, 3]) rWild("bee", "grove", Math.round(xB / T) + 4, { y: top - 30 - k * 12, ph: k * 1.6 });
    // the first tree (arrows), a swing over from the second
    const aR = limb(xA, 1), aL = limb(xA, -1); r3Quiver("grove", xA + 120, top);
    r3RopeLadder("r3_rope_grove_down", "grove", Math.round((aL + 50) / T) * T, top, "rope", true);   // (the way down)
    r3.groveTop = top; r3.groveFoot = xD - 70;
    hang((aR + bL) / 2);
    campfire(c + 126, GR - 1);
  }

  // -- Nob, the sanctuary court (21:1-9): Ahimelech, the holy bread (two rows of six, Leviticus 24:5-6), Goliath's
  //    sword wrapped in a cloth behind the ephod; Doeg the Edomite watching (21:7). A door down to the cracked wall
  c = R("nob");
  { const X = k => (c + k) * T;
    const P = 29;   // (the painted court starts here: his tileable court before and after it)
    // (Glen 11-12) back after Gath: Doeg told Saul, and the priests were killed (1 Samuel 22:9-19). No one is left; the
    //  fire is cold; the ephod is gone with Abiathar, the one who got away (23:6). Dark, quiet, Saul's dark music low
    const mourn = r3.mourn = r3Has("r3_mad");
    ground(c, c + 109);
    if (!mourn) campfire(c + 3, GR - 1);
    oliveRow(c + 8, 16, 5); rBreak("jar", "nob", c + 27, 16);
    rKitDoor("d_nobtribes", "nob", c + 16, "door", "d_tribesout", "w3_nob_hallhouse");   // (Glen 11-11: his priests' house, the door into the Hall of the Tribes)
//    (the olive trees over the strip's joins: gone with the layers, 11-10)   // (olive trees over the two joins, his tileable court to his painted one: the walls are different stone)
    if (!mourn) r3Walker("nob", "nob_priest2_walk", X(17), X(26), 60);
    // (the painted court: the altar about columns P+11-17, a table P+24-33, another P+35-44, crates P+45-51; Glen's pieces in front)
    if (!mourn) { r3Prop("nob", "w3_holy_bread_table2", X(P + 28), R3.TABLE_K);
    region.props[region.props.length - 1].draw = () => !!r3.scene; }   // (out of the way while the clip's own table is there)
    if (!mourn) r3Prop("nob", "w3_ephod_stand", X(P + 40));
    if (!hasSkill("heavySword")) { r3Prop("nob", "w3_goliath_sword", X(P + 37) + 10); r3.swordProp = region.props[region.props.length - 1]; }
    r3.swordX = X(P + 37) + 10;
    r3Prop("nob", "w3_oil_lamp", X(P + 43));
    if (!mourn) r3Person("nob", "ahimelech_idle", X(P + 34), -1, R3.NPC_K, "ahimelech");
    r3.breadX = X(P + 34); r3.breadAt = X(P + R3.BREAD.TRIGGER); r3.mournAt = X(P + R3.MOURN.AT);
    if (!mourn) { r3Walker("nob", "nob_priest2_lamp", X(P + 15), X(P + 23), 45); r3Person("nob", "nob_priest1_talk", X(P + 43), -1); }
    if (!r3Has("r3_bread") && !mourn) r3Person("nob", "doeg_idle", X(P + 6), 1, R3.NPC_K, "doeg");   // (21:7: "detained before the LORD"; gone after the bread, off to tell Saul)
    rKitDoor("d_nobdown", "nob", c + P + 60, "stairs", "d_crackup", "w3_nob_stairhouse");   // (Glen 11-11: his cellar house over the stair down)
    oliveRow(c + 92, 16, 5); rRelic("r3_stone_nob", "stone", c + 100, 16);
  }

  // -- Beneath Nob: the cracked wall, a tall shaft of walkways and ladders (Castlevania). Goliath's sword will break
  //    its cracked walls (DESIGN.md: the heavy sword); for now, a climb with finds at the top
  c = R("crack");
  { const cr = roomById("crack"), X = k => (c + k) * T;
    ground(c, c + cr.w - 1); rock(c, TOP_ROW, cr.w, -cr.up - TOP_ROW);
    rKitDoor("d_crackup", "crack", c + 4, "door", "d_nobdown", "hall_door");
    campfire(c + 9, GR - 1);
    // (Glen 11-10) a cracked wall across the room's far end, floor to ceiling: Goliath's sword breaks a way through
    //  the bottom of it ("test your might"). Behind it, a little chamber
    r3Wall("r3_wall_crack", "crack", c + cr.w - 13, 6);
    rRelic("r3_oil_crack", "oil", c + cr.w - 4, 16); oliveRow(c + cr.w - 6, 16, 2);
    const rows = [380, 170, -40, -250, -460, -670].map((y, k) => {
      const row = []; let col = 3 + [6, 18, 4, 16, 8, 12][k];
      for (let i = 0; col + 13 + 5 * ((i + k) % 2) < cr.w - 15; i++, col += 26) row.push([col, (i + k) % 2]);   // (none past the cracked wall)
      return [y, row];
    });
    const walks = r2Walks("crack", rows, { floor: [{ x0: X(1), x1: X(cr.w - 1), y: GR * T }], ladders: true });
    const mid = u => Math.round((u.x0 + u.x1) / 2 / T);
    walks.forEach((u, i) => {
      if (i % 3 === 1) oliveRow(mid(u) - 2, u.y / T - 1.4, 4);
      if (i % 4 === 2) rBreak("jar", "crack", mid(u) + 3, onTop(u.y));
      const half = Math.floor((u.x1 - u.x0) / T / 2) - 2;
      if (i % 3 === 2 && half >= 2) beast("rat2", "crack", mid(u), { y: u.y, hy: u.y, range: half * T, state: "walk" });
    });
    const top = walks.filter(u => u.k === walks[walks.length - 1].k);
    if (top[0]) rRelic("r3_pom_crack", "pomegranate", mid(top[0]), onTop(top[0].y));
    if (top[1]) rRelic("r3_truth_crack", "truth", mid(top[1]), onTop(top[1].y),
      "Be merciful to me, God, for man wants to swallow me up. All day long he attacks and oppresses me. (Psalm 56:1)");
  }

  // -- The Hall of the Tribes (Genesis 49): twelve tablets in the floor; walk them in the order of Jacob's blessing
  c = R("tribes");
  { const tr = roomById("tribes"), K = R3.TRIBES, done = r3Has("r3_tribes");
    ground(c, c + tr.w - 1);
    rKitDoor("d_tribesout", "tribes", c + 3, "door", "d_nobtribes", "hall_door");
    r3.trial = { start: (c + 6) * T, next: done ? 12 : 0, tiles: K.FLOOR.map((name, i) => {
      const tc = c + K.AT + i * K.STEP; pitFloor(tc, K.W); platAt(tc, GR * T, K.W);
      kitImg("w3_tribe_pit"); kitImg("w3_tribe_" + name); for (const c of ["C1", "C2"]) if (K[c].includes(name)) kitImg("w3_tribe_" + name + "_" + c.toLowerCase());   // (asked for now, so they're there when he walks in; Glen's cracked and broken frames, cut_tribe_crumble.py)
      return { name, c: tc, x0: tc * T, x1: (tc + K.W) * T, lit: done, glow: 0, crack: 0, open: false, fall: 0 };
    }) };
    rRelic("r3_truth_tribes", "truth", c + tr.w - 12, 16, "All these are the twelve tribes of Israel, and this is what their father spoke to them, and blessed them. (Genesis 49:28)", "r3_tribes");
    rRelic("r3_pom_tribes", "pomegranate", c + tr.w - 7, 16, null, "r3_tribes");
    rRelic("r3_hall_key", "key", c + tr.w - 4, 16, "The priests' key! It opens the chest behind the ephod, back in the sanctuary court.", "r3_tribes");   // (Glen 11-11: the hall has to give you something)
  }

  // -- The Road Down to Gath (21:10): west to the coast, the sea far off, sycamores on the low hills. Glen's three layers
  c = R("gathroad");
  { const X = k => (c + k) * T;
    ground(c, c + 129);
    campfire(c + 4, GR - 1);
    // (Glen 11-12, his props: cut_w3_props.py) two date palms (the second's dates hang for the bow), the lookout with its
    //  rope ladder rolled up at the top (shoot the knot), thorns to cut, vine balls rolling down at him, the fallen dead
    //  tree across the road (Goliath's sword), and the tall tree with branches to climb, Mario style
    rDeco("gathroad", "w3_palm", c + 9);
    { const k = KIT.w3_palm_b, px = X(19) + T / 2 - k.w / 2, py = FOOT - k.h;
      region.props.push({ room: "gathroad", n: "w3_palm_b", x: px, y: py });
      for (const q of R3_DATES) r3Hang("gathroad", "dates", px + q.x, py + q.y, q.n); }
    oliveRow(c + 12, 16, 6);
    rDeco("gathroad", "f_rock", c + 26); rBreak("jar", "gathroad", c + 30, 16);
    // (Glen 11-12, his animals: wildlife.js) a horned viper in the road, a hoopoe, locusts over the terrace, an ostrich
    //  on the open ground before the lookout, a stork, a wild donkey past the fallen tree, another viper
    rWild("hoopoe", "gathroad", c + 7, { range: 1 }); rWild("wildass", "gathroad", c + 14, { range: 2 }); rWild("viper", "gathroad", c + 23);   // (the wild donkey under the palms)
    rWild("locusts", "gathroad", c + 42, { y: FOOT - 230 });
    rWild("ostrich", "gathroad", c + 58, { range: 5 }); bird("stork", "gathroad", X(53), FOOT);
    rWild("viper", "gathroad", c + 111);
    { const c1 = rTerrace("gathroad", c + 36, 2); oliveRow(c + 37, onTop(FOOT - 136) - 0.4, c1 - c - 38); }
    rDeco("gathroad", "f_olive", c + 50);
    { // (Glen 11-12: "I can just run past this tower ... this rope is pointless") his tall lookout, across the road: solid,
      //  too tall to jump. Going on means the rope ladder (Jonathan's bow cuts its knot loose); coming back from Gath, the
      //  wooden ladder on its far side. The stone of remembrance on top. (open ground before it to shoot from)
      const k = KIT.w3_towertall, y = FOOT - k.h + R3.TOWER.SINK, top = y + R3.TOWER.RIM, r0 = Math.ceil(top / T);
      region.props.push({ room: "gathroad", n: "w3_towertall", x: X(69) + T / 2 - k.w / 2, y });
      block(c + 67, r0, 5, GR - r0, 6); for (let i = 0; i < 5; i++) artSolid.add((c + 67 + i) + "," + r0);
      platAt(c + 66, top, 7); rRelic("r3_stone_gathroad", "stone", c + 69, onTop(top));
      r3RopeLadder("r3_ladder_lookout", "gathroad", X(67), top);
      // (Glen 11-12: the wooden ladder on the far side looked like a free way up) the far side has its own rope ladder,
      //  rolled up: he kicks it loose when he's up on top (the way down to Gath, and back up coming home)
      r3RopeLadder("r3_ladder_lookout_far", "gathroad", X(72), top); r3.ladders[r3.ladders.length - 1].kick = true; }
    for (const k of [78, 82, 86]) r3Thorn("gathroad", X(k));
    r3VineZone("gathroad", X(75), X(90), "w3_tumbleweed");   // (past the tower: they break on it. Glen's tumbleweeds, Psalm 83:13)
    rDeco("gathroad", "w3_broom", c + 33); rDeco("gathroad", "w3_tamarisk", c + 61);
    r3Quiver("gathroad", X(16)); r3Quiver("gathroad", X(57)); r3Quiver("gathroad", X(112));
    r3.gourds.push({ room: "gathroad", x: X(28) + 6 }, { room: "gathroad", x: X(29) + 20 });
    r3Thorn("gathroad", X(110), "w3_nettle");
    r3Wall("r3_log_gathroad", "gathroad", c + 92, 16, "log");
    { const k = KIT.w3_climbtree_tall, tx = X(116) + T / 2 - k.w / 2, ty = FOOT - k.h + R3.TREE_SINK;   // its branches: ledges
      region.props.push({ room: "gathroad", n: "w3_climbtree_tall", x: tx, y: ty });
      for (const b of R3_CLIMBTREE) { const c0 = Math.ceil((tx + b.x0) / T), c1 = Math.floor((tx + b.x1) / T); platAt(c0, ty + b.top + 4, c1 - c0); }
      // (its top branch is only to look at: from it the crown would be a jump; the rope is the way up there)
      const tb = R3_CLIMBTREE[R3_CLIMBTREE.length - 1], tc = Math.floor((tx + (tb.x0 + tb.x1) / 2) / T);
      rRelic("r3_pom_tree", "pomegranate", tc, onTop(ty + tb.top + 4));
      // (Glen 11-12) the crown: too high to jump to from the top branch; his rope's coiled up there: shoot it down, climb up
      const C = R3.CROWN, cy = ty + C.TOP, k0 = Math.ceil((tx + C.X0) / T), k1 = Math.floor((tx + C.X1) / T);
      platAt(k0, cy, k1 - k0 + 1);
      rRelic("r3_truth_tree", "truth", k0 + 1, onTop(cy), "He makes my feet like deer's feet, and sets me on my high places. (Psalm 18:33)");
      r3RopeLadder("r3_rope_tree", "gathroad", Math.round((tx + C.ROPE_X) / T) * T, cy, "rope", true);   // (tied on, already down)
      bird("eagle", "gathroad", tx + 200, cy); }   // (Glen 11-12: the challenge is the climb: an eagle guards the crown)
    campfire(c + 125, GR - 1);
    r3Person("gathroad", "gath_guard_idle", X(128), -1);   // (the first of Achish's men, on the road in)
  }

  // -- Gath (21:10-12): Glen's city behind, its gate at the end of the road. The guards, and Achish's servants who
  //    know him ("Isn't this David the king of the land?" 21:11). The gate's doors are where he'll scribble (21:13)
  c = R("gath");
  { const X = k => (c + k) * T;
    ground(c, c + 43);
    campfire(c + 3, GR - 1);
    r3Person("gath", "gath_servants_whisper", X(11), -1, R3.NPC_K, "servants");
    r3Person("gath", "gath_guard_idle", X(18), -1, R3.NPC_K, "guard1");
    rDoor("d_gathgate", "gath", c + 22, "door", "d_streetin"); region.doors[region.doors.length - 1].noArt = true;   // (the gate in his picture)
    r3Person("gath", "gath_guard_idle", X(27), -1, R3.NPC_K, "guard2");
    r3Person("gath", "gath_guard_idle", X(38), -1);
    r3.gateAt = X(R3.MAD.GATE_AT); r3.gateX = X(22);
  }

  // -- The streets of Gath (DESIGN.md: "watched or not"): his street, guards looking up and down it, his stalls,
  //    baskets, cart, jars, washing and crates to duck behind. Achish's house at the far end
  c = R("streets");
  { const X = k => (c + k) * T;
    ground(c, c + 115);
    rDoor("d_streetin", "streets", c + 3, "door", "d_gathgate"); region.doors[region.doors.length - 1].noArt = true;   // (back out through the gate)
    campfire(c + 7, GR - 1);
    const hide = [["w3_hide_alcove", 14], ["w3_hide_sacks", 23], ["w3_hide_cart", 33], ["w3_hide_jar", 44], ["w3_hide_rug", 54], ["w3_hide_wood", 65],
      ["w3_hide_alcove", 76], ["w3_hide_sacks", 86]];   // (Glen 11-10: his second hiding sheet, each one big enough to crouch behind)
    for (const [n, k] of hide) r3Hide("streets", n, X(k), n === "w3_hide_alcove" ? "door" : "crouch");
    r3Guard("streets", "gath_guard", c + 19, c + 41, -1); r3Guard("streets", "gath_guard", c + 47, c + 71, 1); r3Guard("streets", "gath_elite", c + 74, c + 96, -1);
    r3.streetStart = X(6);
    oliveRow(c + 38, 16, 4); oliveRow(c + 70, 16, 4); rRelic("r3_truth_streets", "truth", c + 48, 16,
      "When I am afraid, I will put my trust in you. In God, whose word I praise, in God I have put my trust. I will not be afraid. (Psalm 56:3-4)");
    rKitDoor("d_palace", "streets", c + 99, "door", "d_courtin", "w3_palace_door");   // (Achish's palace: Glen's carved doorway, 11-12)
    // (Glen 11-10) past the king's door, a cracked wall across the lane: Goliath's sword breaks through, on to his yard
    r3Wall("r3_wall_streets", "streets", c + 108, 4);
  }

  // -- Goliath's yard (Glen 11-12): a pit, a giant's step, the rope bridge broken in the middle (a swinging rope over the
  //    gap), thorns, the vine balls rolling down from his house, a second step, and his door (his dark doorway, the giant's
  //    spear, shield and helmet against it). Darker and foggier the further in (r3YardDark)
  c = R("giantyard");
  { const X = k => (c + k) * T, Y = R3.YARD;
    ground(c, c + 95);
    rHole("giantyard", c + 8, 4);
    rTerrace("giantyard", c + 15, 2);
    rHole("giantyard", c + 27, 29);
    // the bridge: its post on this side, three plank pieces, the gap, three more, the far post. Its planks level with the ground
    const seg = (n, x) => { const k = KIT[n]; region.props.push({ room: "giantyard", n, x, y: GR * T - Y.PLANK[n] }); return x + k.w - 4; };
    const walk = (x0, x1) => { const a = Math.floor(x0 / T), b = Math.ceil(x1 / T); platAt(a, GR * T, b - a); };
    let x = X(26) + 6; const b0 = x; x = seg("w3_bridge_l", x); x = seg("w3_bridge_m1", x); x = seg("w3_bridge_m2", x); x = seg("w3_bridge_m1", x); walk(b0 + 40, x - 6);
    const gap0 = x; x += Y.GAP; const gap1 = x;
    r3Swing("giantyard", (gap0 + gap1) / 2);
    const b1 = x; x = seg("w3_bridge_m2", x); x = seg("w3_bridge_m1", x); x = seg("w3_bridge_m2", x); const pr = x; x = seg("w3_bridge_r", x); walk(b1 + 6, pr + 40);
    r3Thorn("giantyard", X(61)); r3Thorn("giantyard", X(64));
    r3VineZone("giantyard", X(57), X(72));
    r3Quiver("giantyard", X(4));
    rWild("flies", "giantyard", c + 76, { y: FOOT - 90 }); bird("owl", "giantyard", X(15) + T / 2, FOOT - 134);   // (Glen 11-12: flies round his door; an owl on the giant's step)
    rTerrace("giantyard", c + 67, 1);
    rKitDoor("d_goliath", "giantyard", c + 85, "door", "d_goliathout", "w3_goliath_door");
    oliveRow(c + 3, 16, 3); rRelic("r3_stone_yard", "stone", c + 17, onTop(FOOT - 136));
  }

  // -- Goliath's house (Glen's picture, 11-10): the giant's bed, his jar, his sandals, his bronze helmet (17:5). A Truth
  //    and a pomegranate for breaking in with his own sword
  c = R("goliath");
  { ground(c, c + 35);
    rDoor("d_goliathout", "goliath", c + 27, "door", "d_goliath"); region.doors[region.doors.length - 1].noArt = true;   // (his painted doorway)
    rRelic("r3_truth_goliath", "truth", c + 18, 16,
      "You come to me with a sword, with a spear, and with a javelin; but I come to you in the name of the LORD of Armies. (1 Samuel 17:45)");
    rRelic("r3_pom_goliath", "pomegranate", c + 8, 16);
  }

  // -- The court of Achish (21:14-15): his elite guard either side, the king on his throne
  c = R("court");
  { const X = k => (c + k) * T;
    ground(c, c + 47);
    rKitDoor("d_courtin", "court", c + 5, "door", "d_palace", "hall_door");
    // (Glen 11-12: "coming back ... everyone is standing and no one talks") after he's acted mad and got away, the king's
    //  guard patrols the hall: get past while their backs are turned to the Truth behind the throne (Psalm 34, written
    //  about this day). Seen: act mad again, and they throw him out into the street
    if (!r3Has("r3_mad")) { r3Person("court", "gath_elite_idle", X(16), 1, R3.NPC_K, "elite1"); r3Person("court", "gath_elite_idle", X(24), 1, R3.NPC_K, "elite2"); }
    else {
      const P = R3.COURT2; r3Walker("court", "gath_elite_walk", X(P.A[0]), X(P.A[1]), P.SPEED, "elite1"); r3Walker("court", "gath_elite_walk", X(P.B[0]), X(P.B[1]), P.SPEED * 1.25, "elite2");
      r3Who("elite2").x = X(P.B[1]); r3Who("elite2").facing = -1;
      rRelic("r3_truth_court", "truth", c + 45, 16, "I sought the LORD, and he answered me, and delivered me from all my fears. (Psalm 34:4, by David, when he pretended to be insane before Abimelech)");
    }
    r3.courtAt = X(R3.MAD.COURT_AT);
    r3Prop("court", "w3_throne_dais", X(37));
    r3.people.push({ room: "court", name: "achish_idle", x: X(35), facing: 1, k: R3.NPC_K, ph: 0, y: GR * T - 33, tag: "achish" });   // (standing on his dais by the throne; his sheets face left)
    r3Person("court", "gath_elite_idle", X(42), -1);
  }
}

function r3Enter(r) {
  if (r.id === "nob" && r3.mourn) r3Tell("nobempty", "Nob is silent. The fires are cold, and no one is here.");
  else if (r.id === "nob") r3Tell("nob", "Nob, the town of the priests. Ahimelech is at the sanctuary.");
  if (r.id === "tribes") r3TrialMend();
  r3HangReset(r.id); r3PropsReset(r.id); r3.swing = null;   // (they grow back each time)
  if (r.id === "nobroad") kitImg("w3_rope_4");
  if (r.id === "nobroad" && hasSkill("bow")) r3Tell("bowup", "Birds in the trees, and olives hanging high. Jonathan's bow: hold Up and press X to shoot up high.");
  if (r.id === "tribes" && !r3Has("r3_tribes")) r3Tell("tribes", "The Hall of the Tribes: a tablet for each of Jacob's twelve sons. Step on them in the order Jacob blessed them.");
  if (r.id === "crack") r3Tell("crack", "Under Nob: cracked walls. A heavy sword could break them...");
  if (r.id === "streets") r3Tell("streets", "The streets of Gath. Achish's men are everywhere: keep out of sight.");
  if (r.id === "court" && r3Has("r3_mad")) r3Tell("court2", "Achish's court again. His guards are walking their rounds: slip past while their backs are turned (crouch to keep low).");
  if (r.id === "goliath") r3Tell("goliath", "Goliath's house. Everything in it is made for a giant.");
  if (r.id === "grove") r3.canopySafe = null;
  if (r.id === "grove") r3Tell("grove", "The Tall Trees. Their branches are far out of reach... except, maybe, on the last one.");
  if (r.id === "giantyard") r3Tell("giantyard", "Goliath's yard. Something heavy has been dragged this way...");
  if (r.id === "gath") r3Tell("gath", "Gath, Goliath's own city. Achish's men are watching the road.");
}
// (Glen 11-12: "somber dark eerie music, quiet and no one around") Saul's dark music, low, in Nob once it's empty; the
//  stage's music and the birds stay out (NOBGATH.quiet)
let r3MournSong = null, r3MournVol = 0;
// (Glen 11-12: "beneath Nob and the hall of the tribes should also be dark and eerie as death is all around there now")
const R3_MOURN_ROOMS = ["nob", "crack", "tribes"];
const r3Mourning = () => !!r3.mourn && R3_MOURN_ROOMS.includes((region.room || {}).id);
function r3MournMusic(dt) {
  const want = r3Mourning() && !regionHushed() && david.deadT <= 0 ? R3.MOURN.VOL : 0;
  if (!r3MournSong && want > 0) r3MournSong = Object.assign(new Audio(`../assets/audio/saul_dark.mp3?v=${window.BUILD || 0}`), { loop: true, volume: 0, _music: true });
  if (r3MournSong) r3MournVol = fadeLoop(r3MournSong, r3MournVol, want, dt, R3.MOURN.FADE);
}
function r3MournScene() {   // 1 Samuel 22, the WEB's words (checked on ebible.org 11-12)
  rPlay([
    { say: ["", "Doeg the Edomite had seen David at Nob. He told Saul, “I saw the son of Jesse coming to Nob, to Ahimelech.” (1 Samuel 22:9)"] },
    { say: ["", "The king sent for Ahimelech and all the priests who were in Nob. Saul's own servants would not put out their hand against the priests of the LORD. (1 Samuel 22:11, 17)"] },
    { say: ["", "But Doeg the Edomite turned, and he attacked the priests, and he killed on that day eighty-five people who wore a linen ephod. (1 Samuel 22:18)"] },
    { say: ["", "Only one escaped: Abiathar, Ahimelech's son. He fled after David, with the ephod in his hand. (1 Samuel 22:20; 23:6)"] },
    { say: ["David", "I knew on that day, when Doeg the Edomite was there, that he would surely tell Saul. I am responsible for the death of all the persons of your father's house. (1 Samuel 22:22)"] },
    { say: ["David", "Stay with me. Don't be afraid, for he who seeks my life seeks your life. You will be safe with me. (1 Samuel 22:23)"] },
    { fn() { regionAdd("taken", "r3_mourn"); } },
  ]);
}
function r3Update(dt) {
  r3.t += dt; if (r3.scene) r3.scene.t += dt;
  r3MournMusic(dt);
  if (r3.mad) { r3.mad.t += dt; region.wait = Math.max(region.wait, 0.05); }   // (acting mad: he's held while the mash runs)
  const d = david, r = region.room; if (!r) return;
  for (const q of r3.chips) { q.t += dt; q.x += q.vx * dt; q.y += q.vy * dt; q.vy += 1400 * dt; }
  r3.chips = r3.chips.filter(q => q.t < q.life);
  for (const w of r3.walls) w.shake = Math.max(0, w.shake - dt);
  if (r.id === "tribes") r3TrialUpdate(dt);
  r3HangUpdate(dt); r3PropsUpdate(dt); r3SwingUpdate(dt);
  for (const q of r3.swings) if (q.room === r.id) r3RopeChain(q, dt);
  for (const p of r3.people) if (p.walk && !r3.scene) {   // the walkers
    p.x += p.facing * p.walk.v * dt;
    if (p.x > p.walk.x1) { p.x = p.walk.x1; p.facing = -1; } else if (p.x < p.walk.x0) { p.x = p.walk.x0; p.facing = 1; }
  }
  if (r3.might) { r3MightUpdate(dt); return; }
  if (r3SneakUpdate(dt)) return;
  const free = !region.script.length && region.wait <= 0 && !region.trans && !(dialog && dialog.t > 0) && d.onGround && d.deadT <= 0;
  // Gath: the guard knows him at the gate (21:11); Achish's court (21:14-15)
  if (r.id === "gath" && !r3Has("r3_gath") && free && d.x > r3.gateAt) { r3GateScene(); return; }
  if (r.id === "court" && !r3Has("r3_mad") && free && d.x > r3.courtAt) { r3CourtScene(); return; }
  if (r.id === "court" && r3Has("r3_mad") && free) {   // (a later visit) the guards on their beat
    const C = R3.COURT2, crouch = david.h === LOW_H;
    for (const tag of ["elite1", "elite2"]) {
      const g = r3Who(tag); if (!g) continue; const dx = d.x - g.x;
      const sees = Math.abs(dx) < C.NEAR || (Math.sign(dx) === g.facing && Math.abs(dx) < C.SEE * (crouch ? 0.55 : 1) && Math.abs(d.y - GR * T) < 90);
      if (sees) { r3CourtCaught(g); return; }
    }
    const k = r3Who("achish"); if (k && Math.abs(d.x - k.x) < 4 * T) r3Tell("achish2", "Achish: “Him again? Do I lack madmen? Guards!”");
  }
  // (Glen 11-12: "like Mario ... when you fall you die, we have to start over") up on the treetops, a fall to the ground
  //  costs a heart and puts him back at the foot of the climbing tree. (A rope or ladder down is fine)
  //  (Glen 11-12: "it should be a height thing", and "I end up at the fourth one": back on the last top he stood on)
  if (r.id === "grove" && r3.groveTop != null) {
    if (d.onGround && Math.abs(d.y - r3.groveTop) < 4) r3.canopySafe = { x: d.x, y: d.y };
    const f = region.fell;
    if (f && f.from < r3.groveTop + 60 && d.y >= GR * T - 2 && r3.canopySafe && d.deadT <= 0) {
      moveParty(r3.canopySafe.x, r3.canopySafe.y); snapCamera(); toast("You fell from the treetops! Back up where you were.");
    }
  }
  // Nob, empty after Gath: by the altar, what happened (22:9-23), once
  if (r.id === "nob" && r3.mourn && !r3Has("r3_mourn") && free && d.x > r3.mournAt) { r3MournScene(); return; }
  // Nob: the holy bread, the first time he walks up to Ahimelech (21:1-6)
  if (r.id === "nob" && !r3Has("r3_bread") && free && d.x > r3.breadAt && d.x < r3.breadX) { r3BreadScene(); return; }
  // Nob: Goliath's sword, wrapped in a cloth behind the ephod (21:8-9)
  if (r.id === "nob" && !hasSkill("heavySword") && Math.abs(d.x - r3.swordX) < 2.5 * T) {
    if (!r3Has("r3_hall_key")) r3Tell("swordlock", "Something long, wrapped in a cloth, locked in a chest behind the ephod. The priests keep its key in the Hall of the Tribes (their house, back near the gate).");
    else { r3Tell("sword", "Something long, wrapped in a cloth, behind the ephod. Up: ask the priest."); if (free && pressed("up")) r3SwordScene(); }
  }
  // a cracked wall: Up or X beside it, facing it, with Goliath's sword: test your might
  const w = r3.walls.find(w => w.room === r.id && !w.broken && Math.abs(d.x - (d.facing > 0 ? w.x0 : w.x1)) < R3.MIGHT.REACH * T && Math.sign((w.x0 + w.x1) / 2 - d.x) === d.facing);
  if (w && free) {
    const log = w.kind === "log";
    if (!hasSkill("heavySword")) r3Tell(log ? "lognosword" : "wallnosword", log ? "A great dead tree has fallen across the road. Something heavy could split it." : "Cracked stone, glowing in the cracks. Something heavy could break it.");
    else { r3Tell(log ? "logsword" : "wallsword", (log ? "A fallen tree across the road." : "A cracked wall.") + " Up (or X) by it, then mash A and B to swing Goliath's sword!"); if (pressed("up") || pressed("x")) r3MightStart(w); }
  }
}

// ---------------------------------------------------------------------------
// Goliath's sword (21:8-9) and the cracked walls ("test your might")
// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
// The Hall of the Tribes (Genesis 49): Jacob's blessing, son by son, in the order he spoke it. (World English Bible)
// ---------------------------------------------------------------------------
const TRIBE_ORDER = [
  ["reuben", "Reuben", "“Boiling over like water, you shall not excel.” (Genesis 49:4)"],
  ["simeon", "Simeon", "“Simeon and Levi are brothers. Their swords are weapons of violence.” (49:5)"],
  ["levi", "Levi", "“I will divide them in Jacob.” (49:7) Levi's sons became the priests, who wore the breastplate."],
  ["judah", "Judah", "“Judah is a lion’s cub.” (49:9)"],
  ["zebulun", "Zebulun", "“He will be for a haven of ships.” (49:13)"],
  ["issachar", "Issachar", "“Issachar is a strong donkey.” (49:14)"],
  ["dan", "Dan", "“Dan will be a serpent on the trail.” (49:17)"],
  ["gad", "Gad", "“A troop will press on Gad, but he will press on their heel.” (49:19) Look for the army's tent."],
  ["asher", "Asher", "“Asher’s food will be rich.” (49:20)"],
  ["naphtali", "Naphtali", "“Naphtali is a doe set free.” (49:21)"],
  ["joseph", "Joseph", "“Joseph is a fruitful vine, a fruitful vine by a spring.” (49:22)"],
  ["benjamin", "Benjamin", "“Benjamin is a ravenous wolf.” (49:27)"],
];
function r3TrialUpdate(dt) {
  const tr = r3.trial, K = R3.TRIBES, d = david; if (!tr) return;
  for (const t of tr.tiles) {
    if (t.glow > 0) t.glow = Math.max(0, t.glow - dt);
    if (t.open) t.fall += dt;
    else if (t.crack > 0 && (t.crack += dt) > K.SHAKE) {   // it gives way
      t.open = true; t.fall = 0; sfx("stone_hit", t.x0, 0.5, 0.5); r3TrialCrumble(t);
      for (let x = t.c; x < t.c + K.W; x++) { oneway[GR][x] = false; onewayTop.delete(GR * COLS + x); }
    }
  }
  if (tr.next >= 12 || !d.onGround || d.deadT > 0 || Math.abs(d.y - GR * T) > 2) return;
  const t = tr.tiles.find(t => d.x > t.x0 && d.x < t.x1); if (!t || t.lit || t.crack > 0) return;
  if (t.name === TRIBE_ORDER[tr.next][0]) {   // the right one
    t.lit = true; t.glow = 1.2; chime(tr.next); tr.next++;
    if (tr.next === 12) {
      regionAdd("taken", "r3_tribes"); for (const u of tr.tiles) u.glow = 2.5;
      setTimeout(() => chime(5), 200); setTimeout(() => chime(7), 400);
      toast("“All these are the twelve tribes of Israel... He blessed everyone according to his own blessing.” (Genesis 49:28) A key waits at the end of the hall.");
    }
  } else {   // the wrong one: it cracks under him, he can't get off it, down they go
    t.crack = 0.001; sfx("stone_hit", t.x0, 0.35, 0.8);
    d.x = (t.x0 + t.x1) / 2; d.vx = 0; region.wait = K.SHAKE + 1.2;
  }
}
// (Glen 11-11: "crumble more") the tablet in pieces, each its own way down, and dust off the broken edges
function r3TrialCrumble(t) {
  t.pieces = [];
  for (let j = 0; j < 2; j++) for (let i = 0; i < 3; i++)
    t.pieces.push({ i, j, dx: (i - 1) * (20 + Math.random() * 50), dy: Math.random() * 40, spin: (Math.random() - 0.5) * 5, late: Math.random() * 0.12 });
  for (let k = 0; k < 22; k++) r3.chips.push({ x: t.x0 + Math.random() * (t.x1 - t.x0), y: GR * T - 4, vx: (Math.random() - 0.5) * 260, vy: -80 - Math.random() * 260, t: 0, life: 0.6 + Math.random() * 0.5, r: 3 + Math.random() * 7 });
}
function r3TrialMend() {   // every broken tablet back in the floor (after a fall, and coming back into the hall)
  const tr = r3.trial; if (!tr) return;
  for (const t of tr.tiles) if (t.open || t.crack > 0) { t.open = false; t.crack = 0; t.fall = 0; t.pieces = null; platAt(t.c, GR * T, R3.TRIBES.W); }
}
function r3TrialFall() {   // main.js pitFall: down through a wrong tablet, back to the door, no heart lost
  const tr = r3.trial, r = region.room; if (!tr || !r || r.id !== "tribes") return false;
  const d = david, K = R3.TRIBES;
  r3TrialMend(); region.wait = 0;
  d.x = tr.start; d.y = GR * T; d.vx = d.vy = 0; d.facing = 1; d.inv = 0.6; setState("idle"); snapCamera();
  toast(`Not that one: back to the door. Listen again: ${TRIBE_ORDER[tr.next][1]}.`);
  return true;
}
function r3TrialDraw(camX) {
  const tr = r3.trial, K = R3.TRIBES; if (!tr) return;
  for (const t of tr.tiles) {
    const x = t.x0 - camX, w = t.x1 - t.x0; if (x > W || x + w < 0) continue;
    const im = kitImg("w3_tribe_" + t.name);
    if (t.open) {   // the hole, and the tablet dropping away
      const pit = kitImg("w3_tribe_pit");
      if (pit) { const s = w / 216, pw = pit.naturalWidth * s; ctx.drawImage(pit, Math.round(x + w / 2 - pw / 2), GR * T - 6, pw, pit.naturalHeight * s); }   // (Glen's pit, cut_tribe_pit.py: its opening a tablet wide)
      else {
      if (!t.jag) { t.jag = []; for (let k = 0; k <= 10; k++) t.jag.push(Math.random()); }   // (its broken edge: fixed once)
      const g = ctx.createLinearGradient(0, GR * T, 0, H); g.addColorStop(0, "#1a120c"); g.addColorStop(0.35, "#050302"); g.addColorStop(1, "#000");
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(x - 8, H); ctx.lineTo(x - 8, GR * T + 6);
      t.jag.forEach((v, k) => ctx.lineTo(x - 8 + (w + 16) * k / 10, GR * T - 4 + v * 14 + (k === 0 || k === 10 ? 10 : 0)));
      ctx.lineTo(x + w + 8, H); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "rgba(90,64,40,0.9)";   // the broken stone lips, either side
      for (const s of [-1, 1]) { const ex = s < 0 ? x - 8 : x + w + 8; ctx.beginPath(); ctx.moveTo(ex, GR * T - 2); ctx.lineTo(ex - s * 16, GR * T + 4 + t.jag[s < 0 ? 1 : 9] * 10); ctx.lineTo(ex, GR * T + 26); ctx.closePath(); ctx.fill(); }
      }
      const c2 = K.C2.includes(t.name) && kitImg("w3_tribe_" + t.name + "_c2");
      if (c2 && c2.naturalWidth && t.fall < 1.0) {   // (Glen's broken frame, dropping away)
        ctx.save(); ctx.globalAlpha = Math.max(0, 1 - t.fall / 1.0);
        const s = w / 216; ctx.drawImage(c2, Math.round(x - K.PAD * s), GR * T - K.PROUD - K.PAD * s + t.fall * t.fall * 1000, c2.naturalWidth * s, c2.naturalHeight * s); ctx.restore();   // (the kit is at 216 a tablet)
      } else if (im && t.pieces && t.fall < 1.1 && !(c2 && c2.naturalWidth)) {
        const pw = im.width / 3, ph = im.height / 2, sw = (w - 12) / 3, sh = sw * ph / pw;
        for (const p of t.pieces) { const f = Math.max(0, t.fall - p.late);
          ctx.save(); ctx.globalAlpha = Math.max(0, 1 - f / 1.0);
          ctx.translate(x + 6 + (p.i + 0.5) * sw + p.dx * f, GR * T - K.PROUD + (p.j + 0.5) * sh + p.dy * f + f * f * 1100); ctx.rotate(p.spin * f);
          ctx.drawImage(im, p.i * pw, p.j * ph, pw, ph, -sw / 2, -sh / 2, sw, sh); ctx.restore(); }
      }
      continue;
    }
    if (!im) continue;
    const j = t.crack > 0 ? (Math.random() - 0.5) * 6 : 0, h = w * im.height / im.width;
    const c1 = t.crack > 0 && K.C1.includes(t.name) && kitImg("w3_tribe_" + t.name + "_c1");
    if (c1 && c1.naturalWidth) { const s = w / 216; ctx.drawImage(c1, Math.round(x + j - K.PAD * s), GR * T - K.PROUD - K.PAD * s, c1.naturalWidth * s, c1.naturalHeight * s); }   // (Glen's cracked frame)
    else ctx.drawImage(im, Math.round(x + j), GR * T - K.PROUD, w, h);
    if (t.lit) {   // the blessing on it: gold
      ctx.save(); ctx.globalCompositeOperation = "lighter"; ctx.fillStyle = `rgba(255,190,70,${0.32 + Math.min(1, t.glow) * 0.3})`;
      ctx.beginPath(); ctx.roundRect(x + 3, GR * T - K.PROUD + 3, w - 6, h - 6, 10); ctx.fill(); ctx.restore();
      ctx.strokeStyle = "rgba(255,215,120,0.9)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.roundRect(x + 3, GR * T - K.PROUD + 3, w - 6, h - 6, 10); ctx.stroke();
    }
  }
}
function r3TrialBanner() {   // the next son's blessing, at the top
  const tr = r3.trial; if (!tr || tr.next >= 12) return;
  const [, name, words] = TRIBE_ORDER[tr.next];
  ctx.save(); ctx.textAlign = "center";
  ctx.font = "19px Georgia, serif"; const wd = Math.min(W - 40, Math.max(560, ctx.measureText(words).width + 60));
  ctx.fillStyle = "rgba(25,14,6,0.78)"; ctx.beginPath(); ctx.roundRect(W / 2 - wd / 2, 14, wd, 84, 12); ctx.fill();
  ctx.fillStyle = "#e9dcc4"; ctx.font = "15px sans-serif";
  ctx.fillText(`Jacob blesses his sons (Genesis 49)     ${tr.next} of 12`, W / 2, 36);
  ctx.fillStyle = "#ffe08a"; ctx.font = "bold 24px Georgia, serif"; ctx.fillText(name, W / 2, 63);
  ctx.fillStyle = "#fff6e2"; ctx.font = "19px Georgia, serif"; ctx.fillText(words, W / 2, 88);
  ctx.restore();
}
function r3BreadScene() {
  const B = R3.BREAD, give = SPR.nob_bread_give, eat = SPR.nob_bread_eat;
  const long = give && eat ? (give.frames * give.ms + eat.frames * eat.ms) / 1000 : 0;
  david.facing = 1;
  rPlay([
    { say: ["Ahimelech", "Why are you alone, and no one with you? (1 Samuel 21:1)"] },
    { say: ["David", "The king has sent me on a matter. Now, what do you have on hand? Give me five loaves of bread, or whatever is here. (1 Samuel 21:2-3)"] },
    { say: ["Ahimelech", "There is no common bread on hand, but there is holy bread. (1 Samuel 21:4)"] },
    { fn() { if (long) { r3.scene = { id: "bread", t: 0 }; region.pose = { hide: true }; } }, wait: long },
    { fn() {
      r3.scene = null; region.pose = null;
      r3.people = r3.people.filter(p => p.tag !== "doeg");   // (Doeg's gone: off to Saul, 22:9)
      david.x = r3.breadX - B.DAVID_DX * SCALE * B.K; david.facing = -1;   // (where he stands in the clip)
      david.hearts = david.maxHearts; breadSet(BREAD_GIVEN);   // (main.js: five loaves to carry; one is eaten when a hit would finish him)
      regionAdd("taken", "r3_bread");
      toast(`The holy bread (1 Samuel 21:6): strength restored, and ${BREAD_GIVEN} loaves to carry. When you're about to fall, David eats one. And the man who was watching is gone...`);
    } },
  ]);
}
// ---------------------------------------------------------------------------
// Gath (1 Samuel 21:10-15): David acting mad
// ---------------------------------------------------------------------------
const r3Who = tag => r3.people.find(p => p.tag === tag);
function r3Anim(tag, name, facing) { const p = r3Who(tag); if (p && SPR[name]) { p.name = name; p.ph = -r3.t; if (facing) p.facing = facing; } }   // (from its first frame)
function r3MadMash(title, [need, time, drain], pose, then) {   // David acting mad (pose: his sheet) while you mash; then
  david.vx = 0; r3.mad = { pose, t: 0 };
  startMash({ title, need, time, drain, onDone() { r3.mad = null; region.wait = 0; then(); } });
}
function r3GateScene() {
  const d = david; d.facing = 1;
  rPlay([
    { fn() { r3Anim("guard1", "gath_guard_point"); }, wait: 0.8 },
    { say: ["A guard of Gath", "Isn't this David, the king of the land? Didn't they sing about him in their dances: \"Saul has struck down his thousands, and David his ten thousands\"? (1 Samuel 21:11)"] },
    { say: ["", "David took these words to heart, and was very afraid of Achish the king of Gath. (1 Samuel 21:12)"] },
    { fn() {
      regionAdd("taken", "r3_gath"); d.x = r3.gateX - 10; d.facing = 1;   // (at the doors)
      r3MadMash("Act mad! Scribble on the gate!", R3.MAD.GATE, "david_mad_scribble", () => {
        r3Anim("guard1", "gath_guard_laugh"); r3Anim("guard2", "gath_guard_laugh");
        rPlay([
          { say: ["", "He scribbled on the doors of the gate, and let his spit run down his beard. (1 Samuel 21:13)"], wait: 0.3 },
          { say: ["A guard of Gath", "Ha! Look at him! That's no king, that's a madman. Let him in. Achish can laugh at him too."] },
          { fn() { r3Anim("guard1", "gath_guard_idle"); r3Anim("guard2", "gath_guard_idle"); } },
        ]);
      });
    } },
  ]);
}
function r3CourtCaught(g) {   // seen in the court on a later visit: act mad again, then out the door into the street
  david.facing = Math.sign(g.x - david.x) || 1; const w = g.walk; g.walk = null; g.name = "gath_elite_block"; g.facing = david.x < g.x ? 1 : -1;   // (the block sheet faces left)
  rPlay([
    { say: ["A royal guard", "The madman's back! Seize him!"] },
    { fn() { r3MadMash("Act mad! Get out of here!", R3.MAD.GUARDS, "david_mad_stagger", () => {
      g.walk = w; g.name = "gath_elite_walk";
      rPlay([
        { say: ["", "The guards throw David out into the street."] },
        { fn() { const s = roomById("streets"); moveParty((s.c0 + 97) * T, GR * T); david.facing = -1; snapCamera(); } },
      ]);
    }); } },
  ]);
}
function r3CourtScene() {
  const d = david; d.facing = 1;
  r3Anim("elite1", "gath_elite_idle", -1); r3Anim("elite2", "gath_elite_idle", -1);   // (they turn to him)
  rPlay([
    { say: ["", "Achish's servants brought David before the king. So he changed his behavior before them, and acted mad in their hands. (1 Samuel 21:13)"] },
    { fn() { r3MadMash("Act mad before the king!", R3.MAD.KING, "david_mad_stagger", () => {
      r3Anim("achish", "achish_exasperated");
      rPlay([
        { say: ["Achish", "Look, the man is mad! Why have you brought him to me? Do I lack madmen, that you've brought this fellow to play the madman in front of me? Shall this fellow come into my house? (1 Samuel 21:14-15)"] },
        { fn() { r3Anim("achish", "achish_point"); r3Anim("elite1", "gath_elite_block", -1); r3Anim("elite2", "gath_elite_block", -1); } },
        { say: ["", "The king's guards close in. Keep it up, all the way out the door!"] },
        { fn() { r3MadMash("Get past the guards! Keep acting crazy!", R3.MAD.GUARDS, "david_mad_stagger", () => {
          rPlay([
            { say: ["A royal guard", "Get this crazy person out of here!"] },
            { fn() { regionAdd("taken", "r3_mad"); } },
            { say: ["", "So David departed from there, and escaped to the cave of Adullam. (1 Samuel 22:1)"] },
            { fn() { regionAdd("taken", "g_exit_open"); jsceneOpen(true); } },
          ]);
        }); } },
      ]);
    }); } },
  ]);
}
function r3SwordScene() {
  david.facing = 1;
  rPlay([
    { say: ["David", "Isn't there here under your hand spear or sword? For I have brought neither my sword nor my weapons with me, because the king's business required haste. (1 Samuel 21:8)"] },
    { say: ["Ahimelech", "The sword of Goliath the Philistine, whom you killed in the valley of Elah, behold, it is here wrapped in a cloth behind the ephod. If you would take that, take it; for there is no other except that here. (1 Samuel 21:9)"] },
    { say: ["David", "There is none like that. Give it to me. (1 Samuel 21:9)"] },
    { fn() { regionAdd("taken", "r3_sword"); learnSkill("heavySword"); const i = region.props.indexOf(r3.swordProp); if (i >= 0) region.props.splice(i, 1); } },
  ]);
}
function r3Wall(id, room, c, w, kind = "crack") {   // a cracked wall from column c, w wide, floor to the room's top: solid till it's broken
  const up = roomById(room).up || 0, broken = r3Has(id);   // (kind "log", Glen 11-12: a fallen dead tree across the road, R3.LOG.ROWS high)
  const o = { id, room, c, w, x0: c * T, x1: (c + w) * T, up, hp: R3.MIGHT.HP, hits: 0, broken, shake: 0, kind };
  r3.walls.push(o);
  if (kind === "log") { ["w3_deadtree", "w3_log_l", "w3_log_r"].forEach(kitImg); block(c, GR - R3.LOG.ROWS, w, R3.LOG.ROWS, 6); for (let k = 0; k < w; k++) artSolid.add((c + k) + "," + (GR - R3.LOG.ROWS)); if (broken) r3WallOpen(o); return; }
  for (let i = 1; i <= 5; i++) kitImg("w3_crackwall-" + i);
  block(c, -up, w, GR + up, 6); if (broken) r3WallOpen(o);   // (material 6: solid, but no dirt fill drawn: only his wall shows)
  for (let k = 0; k < w; k++) artSolid.add((c + k) + "," + -up);
}
function r3WallOpen(o) {   // the hole at the bottom: broken through, the rest stays (a log: all of it, split and fallen apart)
  const h = o.kind === "log" ? R3.LOG.ROWS : R3.MIGHT.HOLE;
  for (let x = o.c; x < o.c + o.w; x++) for (let y = GR - h; y < GR; y++) solid[y][x] = 0;
}
function r3MightStart(w) {
  const d = david; d.vx = 0; d.facing = Math.sign((w.x0 + w.x1) / 2 - d.x) || 1;
  r3.might = { w, phase: "mash", t: 0, level: 0, presses: 0, flash: 0, gold: false };
  sfx("sling_charge", d.x, 0.6, 0.7);
}
function r3MightUpdate(dt) {
  const m = r3.might, M = R3.MIGHT, d = david; m.t += dt; m.flash = Math.max(0, m.flash - dt);
  region.wait = Math.max(region.wait, 0.05);   // (David holds still: region.js regionHoldDavid)
  if (m.phase === "mash") {
    for (const b of ["a", "b"]) { const n = (pressed(b) ? 1 : 0) + (typeof p2 !== "undefined" && p2.on && pressed2(b) ? 1 : 0); if (n) { m.level += n / M.NEED; m.presses += n; m.flash = 0.1; } }
    m.level = Math.max(0, Math.min(1, m.level - M.DRAIN * dt));
    if (m.t >= M.TIME) { m.phase = "smash"; m.t = 0; m.power = m.level; m.gold = m.level >= M.GOLD; }
  } else if (m.phase === "smash") {
    const S = SPR.david_gsword_smash, f = Math.floor(m.t * 1000 / S.ms);
    if (f >= M.HIT && !m.hit) {
      m.hit = true; const w = m.w, per = M.DMG[0] + (M.DMG[1] - M.DMG[0]) * m.power, dmg = m.gold ? w.hp : per;
      w.hp -= dmg; w.hits++; w.shake = 0.35; sfx("stone_hit", w.x0, 1, m.gold ? 0.5 : 0.75);
      const cx = d.facing > 0 ? w.x0 : w.x1, cy = GR * T - 90;
      for (let i = 0; i < (m.gold ? 30 : 12); i++) r3.chips.push({ x: cx, y: cy + (Math.random() - 0.5) * 120, vx: -d.facing * (60 + Math.random() * 280) * (Math.random() < 0.3 ? -1 : 1), vy: -150 - Math.random() * 450, t: 0, life: 0.9 + Math.random() * 0.5, r: 4 + Math.random() * 8 });
      if (w.hp <= 0.5) {
        w.broken = true; regionAdd("taken", w.id); r3WallOpen(w); sfx("thunder", w.x0, 0.5, 1.4);
        if (typeof chime === "function") chime(m.gold ? 7 : 5);
        toast(w.kind === "log" ? (m.gold ? "GOLD STANDARD! One swing, and the tree splits in two!" : "The tree split in two!") : m.gold ? "GOLD STANDARD! One swing, and the wall's down!" : "The wall gave way!");
      } else toast(`Crack! ${Math.max(1, Math.ceil(w.hp / per))} more like that... or mash harder for gold.`);
    }
    if (m.t * 1000 >= S.ms * S.frames) { m.phase = "rest"; m.t = 0; }
  } else if (m.phase === "rest" && m.t >= M.REST) { r3.might = null; region.wait = 0; }
}
// David with Goliath's sword (region.js drawDavid hook): lifted while you mash, the smash, the blade on the ground
function r3DrawDavid(d, x, y) {
  const m = r3.might;
  if (r3.swing && SPR.david_climb) {   // on a swinging rope: his rope climb (his back to us), turned with the rope, hands on it
    const n = "david_climb", S = R3.SWING, sc = SCALE * (TUNE.SPRITE_SIZE[n] || 1);
    ctx.save(); ctx.translate(x, y - S.HANDS); ctx.rotate(-r3.swing.q.ang);
    drawSprite(n, 0, (SPR[n].ax - RTUNE.ROPE_IN_HANDS) * sc, S.HANDS, 1); ctx.restore(); return true;
  }
  if (r3.mad && SPR[r3.mad.pose]) {   // acting mad: wilder as the bar fills
    const k = typeof mash !== "undefined" ? mash.level : 0.5, sh = (Math.random() - 0.5) * 3 * k;
    drawSprite(r3.mad.pose, frameOf(r3.mad.pose, r3.mad.t * (0.7 + k * 1.3)), x + sh, y, d.facing, R3.GSWORD_K); return true;
  }
  if (r3.inDoor) {   // in the alcove, his back to the street, in its shadow
    // (Glen 11-11, his clip) he walks in, turns, and crouches down to hide (david_hide_crouch, once, then held);
    //  the cloaked back walk's first frame if the sheet's missing
    const c = SPR.david_hide_crouch;
    ctx.save(); ctx.filter = "brightness(0.62)";
    if (c) drawSprite("david_hide_crouch", Math.min(c.frames - 1, Math.floor((r3.t - r3.inDoorAt) * 1000 / c.ms)), x, y, d.facing, 0.92);
    else if (SPR.david_back_walk) drawSprite("david_back_walk", 0, x, y, 1, 0.92);
    ctx.restore(); return true;
  }
  if (!m) return r3DrawCarry(d, x, y);
  const n = m.phase === "mash" ? "david_gsword_hold" : m.phase === "smash" ? "david_gsword_smash" : "david_gsword_rest";
  if (!SPR[n]) return false;
  const fr = m.phase === "smash" ? Math.min(SPR[n].frames - 1, Math.floor(m.t * 1000 / SPR[n].ms)) : frameOf(n, m.t * (m.phase === "mash" ? 0.6 + m.level * 1.6 : 1));
  const sh = m.phase === "mash" ? (Math.random() - 0.5) * 4 * m.level : 0;   // (straining: he shakes as the bar fills)
  drawSprite(n, fr, x + sh, y, d.facing, R3.GSWORD_K);
  return true;
}
// ---------------------------------------------------------------------------
// the streets of Gath: the sneak (Glen 11-10, "like Metal Gear Solid")
// ---------------------------------------------------------------------------
function r3Hide(room, n, x, kind) {   // one of his hiding pieces, in front of David (he crouches behind it, or stands in it)
  const k = KIT[n]; region.props.push({ room, n, x: x - k.w / 2, y: FOOT - k.h, front: kind === "crouch", back: kind !== "crouch" });   // (the alcove behind him: he stands in its doorway)
  r3.hides.push({ room, n, x, x0: x - k.w / 2, x1: x + k.w / 2, kind });
}
function r3Guard(room, name, c0, c1, facing) {   // a guard walking his beat, c0 to c1, stopping to look at each end
  r3.guards.push({ room, name, from: c0 * T, to: c1 * T, x: (facing > 0 ? c0 : c1) * T, y: GR * T, facing, state: "walk", t: Math.random() * 2, seen: 0 });
}
function r3Hidden() {   // in the alcove; or crouched behind a piece
  const d = david, S = R3.SNEAK;
  if (r3.inDoor) return true;
  return d.h === LOW_H && r3.hides.some(h => h.room === region.room.id && h.kind === "crouch" && d.x > h.x0 - S.NEAR && d.x < h.x1 + S.NEAR);
}
function r3Sees(g) {
  const d = david, dx = d.x - g.x, S = R3.SNEAK;
  if (g.room !== region.room.id || d.deadT > 0 || r3.caughtT > 0 || Math.sign(dx) !== g.facing || Math.abs(d.y - g.y) > 90) return false;
  if (g.state === "turn" || r3Hidden()) return false;
  return Math.abs(dx) < (d.h === LOW_H ? S.SIGHT_LOW : S.SIGHT) * T;
}
function r3SneakUpdate(dt) {   // true: David's held (in the alcove, or caught)
  const d = david, r = region.room, S = R3.SNEAK;
  if (r3.caughtT > 0) {
    const before = r3.caughtT; r3.caughtT -= dt; region.wait = Math.max(region.wait, 0.05);
    if (before > S.CAUGHT_FADE / 2 && r3.caughtT <= S.CAUGHT_FADE / 2) {   // in the dark: back by the gate, the guards back on their beats
      r3.inDoor = null; d.h = STAND_H; moveParty(r3.streetStart, GR * T); d.facing = 1; snapCamera();
      for (const g of r3.guards) { g.seen = 0; g.state = "walk"; g.t = 0; g.x = g.facing > 0 ? g.from : g.to; }
    }
    if (r3.caughtT <= 0) region.wait = 0;
    return true;
  }
  if (r.id !== "streets") { r3.inDoor = null; return false; }
  for (const g of r3.guards) {
    g.t += dt;
    if (g.state === "walk") {
      g.x += g.facing * S.WALK * dt;
      if ((g.facing > 0 && g.x >= g.to) || (g.facing < 0 && g.x <= g.from)) { g.x = Math.max(g.from, Math.min(g.to, g.x)); g.state = "look"; g.t = 0; }
    } else if (g.state === "look" && g.t > S.LOOK) { g.state = "turn"; g.t = 0; }
    else if (g.state === "turn" && g.t > S.TURN) { g.facing *= -1; g.state = "walk"; g.t = 0; }
    if (r3Sees(g)) { g.seen += dt; if (g.seen > S.SEEN_T) { r3Caught(g); return true; } } else g.seen = Math.max(0, g.seen - dt * 2);
  }
  if (!r3.told.sneak && r3.guards.some(g => g.room === "streets" && Math.abs(d.x - g.x) < 12 * T)) {
    r3.told.sneak = true; toast("Achish's guards! When one looks your way, crouch behind something (hold Down), or step into an alcove (Up). Go when his back is turned.");
  }
  if (r3.inDoor) {   // standing in the alcove: any direction, or jump, steps back out
    region.wait = Math.max(region.wait, 0.05);
    if (pressed("down") || pressed("left") || pressed("right") || pressed("a")) { r3.inDoor = null; region.wait = 0; }
    return true;
  }
  const free = !region.script.length && region.wait <= 0 && !region.trans && !(dialog && dialog.t > 0) && d.onGround && d.deadT <= 0;
  const al = r3.hides.find(h => h.room === "streets" && h.kind === "door" && Math.abs(d.x - h.x) < (h.x1 - h.x0) / 2);
  if (al && free && pressed("up")) { r3.inDoor = al; r3.inDoorAt = r3.t; d.x = al.x; d.vx = 0; return true; }
  return false;
}
function r3Caught(g) {
  r3.caughtT = R3.SNEAK.CAUGHT_FADE; g.seen = 0; david.vx = 0;
  toast(g.name === "gath_elite" ? "One of the king's own guard saw you! Back to the gate." : "A guard saw you! Back to the gate. Hide while one looks your way.");
}
function r3DrawSneak(camX, idle) {
  const r = region.room, d = david; if (r.id !== "streets") return;
  r3DrawSneakBadges(camX, idle);
}
// (Glen 11-12: "have all the guards walk in front of the objects so it looks like I am hiding") the guards: drawn after
//  David and the stalls and sacks he hides behind (region.js drawRegionFront: REGION.drawFront)
function r3DrawGuards(camX) {
  const r = region.room, S = R3.SNEAK; if (!r || r.id !== "streets") return;
  for (const g of r3.guards) {
    const x = g.x - camX; if (x < -400 || x > W + 400) continue;
    if (g.state !== "turn") {   // where he's looking: a soft wedge (a help for little players), red when he's noticed you
      const reach = S.SIGHT * T, col = g.seen > 0 ? "255,70,40" : "255,214,90", gr = ctx.createLinearGradient(x, 0, x + g.facing * reach, 0);
      gr.addColorStop(0, `rgba(${col},0.38)`); gr.addColorStop(1, `rgba(${col},0.04)`);
      ctx.save(); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x + g.facing * 20, g.y - 120); ctx.lineTo(x + g.facing * reach, g.y - 165); ctx.lineTo(x + g.facing * reach, g.y); ctx.lineTo(x + g.facing * 20, g.y - 70); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    const elite = g.name === "gath_elite", n = g.seen > 0 && !elite && SPR.gath_guard_point ? "gath_guard_point" : g.name + (g.state === "walk" ? "_walk" : "_idle");
    if (SPR[n]) drawSprite(n, n.endsWith("point") ? Math.min(SPR[n].frames - 1, Math.floor(g.seen / S.SEEN_T * 6)) : frameOf(n, Math.max(0, g.t)), x, g.y, g.facing, R3.NPC_K);
    if (g.seen > 0) { ctx.save(); ctx.fillStyle = "#ffdc4a"; ctx.strokeStyle = "#3a2400"; ctx.lineWidth = 5; ctx.font = "bold 44px sans-serif"; ctx.textAlign = "center"; ctx.strokeText("!", x, g.y - 175); ctx.fillText("!", x, g.y - 175); ctx.restore(); }
  }
}
function r3DrawSneakBadges(camX, idle) {
  const d = david;
  if (!idle || r3.inDoor) return;
  for (const h of r3.hides) {   // next to a real hiding place: a little badge (Down: crouch behind it; Up: step in)
    if (h.room !== "streets" || d.x < h.x0 - 20 || d.x > h.x1 + 20) continue;
    const bx = h.x - camX, by = FOOT - KIT[h.n].h - 30;
    if (h.kind === "door") upHint(bx, by);
    else if (d.h !== LOW_H) { const bob = Math.sin(performance.now() / 180) * 4;
      ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = "rgba(255,255,255,0.92)"; ctx.beginPath(); ctx.roundRect(bx - 22, by - 24 + bob, 44, 34, 10); ctx.fill();
      ctx.fillStyle = "#4a3a2a"; ctx.font = "bold 22px sans-serif"; ctx.textAlign = "center"; ctx.fillText("↓", bx, by + 2 + bob); ctx.restore(); }
  }
}

// (Glen 11-10) with Goliath's sword, it's on his back: his walk, run, jump, flip and landing clips. Standing still (no
//  (Glen 11-10, his straight-up jump and standing clips too)
function r3DrawCarry(d, x, y) {
  if (!hasSkill("heavySword") || d.swordT >= 0 || d.shield || (typeof w9 !== "undefined" && w9.pose)) return false;   // (his sword, his shield, a scene: drawn as usual)
  const K = R3.GSWORD_K, t = d.t, mid = y - d.h / 2 - 6;   // (the in-air sheets are centered, like his own)
  if (d.throwT >= 0) return d.state !== "roll" && d.state !== "flip" && r3DrawCarryThrow(d, x, y, K);
  const has = n => !!SPR[n], one = (n, ms) => Math.min(SPR[n].frames - 1, Math.floor(t * 1000 / ms));
  switch (d.state) {
    case "idle": if (!has("david_gsword_idle")) return false;
      drawSprite("david_gsword_idle", frameOf("david_gsword_idle", t), x, y, d.facing, K); return true;
    case "walk": if (!has("david_gsword_walk")) return false;
      drawSprite("david_gsword_walk", frameOf("david_gsword_walk", t * Math.max(0.6, Math.abs(d.vx) / TUNE.WALK_SPEED)), x, y, d.facing, K); return true;
    case "run": if (!has("david_gsword_run")) return false;
      drawSprite("david_gsword_run", frameOf("david_gsword_run", t, R3.CARRY.RUN_MS), x, y, d.facing, K); return true;
    case "jump": { if (!has("david_gsword_jump")) return false;   // rising to falling: straight up, tucked, feet down
      const k = Math.max(0, Math.min(1, (d.vy + TUNE.JUMP_SPEED) / (2 * TUNE.JUMP_SPEED)));
      drawSprite("david_gsword_jump", 1 + Math.round(k * (R3.CARRY.JUMP_LAST - 1)), x, mid, d.facing, K); return true; }
    case "flip": if (!has("david_gsword_flip")) return false;
      drawSprite("david_gsword_flip", one("david_gsword_flip", 60), x, mid, d.facing, K); return true;   // (60 ms: his own flip's length)
    case "land": if (!has("david_gsword_land")) return false;
      drawSprite("david_gsword_land", one("david_gsword_land", R3.CARRY.LAND_MS), x, y, d.facing, K); return true;
  }
  return false;
}
// (Glen 11-11) the sling with the sword on his back: charging on the run (his legs keep going, the sling whirling), or
//  standing (and in the air, and the throw from a run): the whirl, then the fling on the frame the stone leaves
const R3_RUN_SLING_STONE = [[-6, 231], [132, 195], [-51, 203], [115, 206], [-78, 213], [96, 214], [-84, 196], [108, 208], [-36, 216], [130, 200]];
function r3DrawCarryThrow(d, x, y, K) {
  const C = R3.CARRY, run = "david_gsword_run_sling", st = "david_gsword_sling_throw";
  let gx, gy;
  if (d.charging && d.onGround && Math.abs(d.vx) > TUNE.RUN_THROW_SPEED && SPR[run]) {
    const i = frameOf(run, d.t * Math.max(0.7, Math.abs(d.vx) / TUNE.RUN_SPEED));
    drawSprite(run, i, x, y, d.facing, K);
    const p = R3_RUN_SLING_STONE[i] || R3_RUN_SLING_STONE[0], sc = SCALE * K;
    gx = x + d.facing * p[0] * sc; gy = y - p[1] * sc;
  } else {
    if (!SPR[st]) return false;
    let i;
    if (d.charging) i = C.WHIRL[0] + Math.floor(d.charge * 1000 / C.WHIRL_MS) % (C.WHIRL[1] - C.WHIRL[0] + 1);
    else {   // the throw: the whirl to the fling by the moment main.js lets the stone go, then on to standing
      const dur = d.runThrow ? TUNE.RUN_THROW_TIME : TUNE.THROW_TIME, rel = (d.runThrow || d.aimingUp ? 9.5 : 7) / 12;
      const u = Math.min(1, d.throwT / dur);
      i = u < rel ? C.WHIRL[0] + Math.floor(u / rel * (C.FLING - C.WHIRL[0])) : C.FLING + Math.floor((u - rel) / (1 - rel) * (C.LAST - C.FLING + 0.99));
      i = Math.min(C.LAST, i);
    }
    drawSprite(st, i, x, y, d.facing, K);
    gx = x - d.facing * 8; gy = y - 230 * SCALE * K;   // (whirling over his head)
  }
  if (d.charging && d.charge >= TUNE.CHARGE_TIME && hasSkill("charge")) {   // the gold glow, as without the sword
    ctx.save(); ctx.globalCompositeOperation = "lighter";
    const g = ctx.createRadialGradient(gx, gy, 2, gx, gy, 30);
    g.addColorStop(0, "rgba(255,215,100,0.85)"); g.addColorStop(1, "rgba(255,180,40,0)");
    ctx.fillStyle = g; ctx.fillRect(gx - 34, gy - 34, 68, 68); ctx.restore();
  }
  return true;
}
// the walls (behind David): Glen's five stages (11-10), one more broken with each hit: 1 whole, 2-4 a hit each,
//  5 broken through (or straight to 5 with a gold swing). Whole stage 1 repeats above it on up the shaft
function r3DrawLog(w, camX) {   // (Glen 11-12) the dead tree across the road; split, the two halves of his cracked log
  const mid = (w.x0 + w.x1) / 2 - camX, sh = w.shake > 0 ? Math.sin(r3.t * 90) * 6 * w.shake / 0.35 : 0;
  if (!w.broken) { const k = KIT.w3_deadtree, im = kitImg("w3_deadtree"); if (im) ctx.drawImage(im, mid - k.w / 2 + sh, FOOT - k.h + R3.LOG.SINK, k.w, k.h); return; }
  const L = KIT.w3_log_l, R = KIT.w3_log_r, il = kitImg("w3_log_l"), ir = kitImg("w3_log_r");
  if (il) ctx.drawImage(il, mid - L.w - R3.LOG.APART, FOOT - L.h + R3.LOG.SINK, L.w, L.h);
  if (ir) ctx.drawImage(ir, mid + R3.LOG.APART, FOOT - R.h + R3.LOG.SINK, R.w, R.h);
}
function r3WallStage(w) { return w.broken ? 5 : Math.min(4, 1 + w.hits); }
function r3DrawWalls(camX) {
  const r = region.room; if (!r) return;
  const k = KIT["w3_crackwall-1"], top = kitImg("w3_crackwall-1");
  for (const w of r3.walls) {
    if (w.kind === "log") { if (w.room === r.id) r3DrawLog(w, camX); continue; }
    const im = kitImg("w3_crackwall-" + r3WallStage(w)) || top;
    if (w.room !== r.id || !im) continue;
    const ww = w.w * T, s = ww / k.w, ph = k.h * s, sh = w.shake > 0 ? Math.sin(r3.t * 90) * 6 * w.shake / 0.35 : 0;
    const x = w.x0 - camX + sh; if (x > W || x + ww < 0) continue;
    let y = FOOT - ph; ctx.drawImage(im, x, y, ww, ph);
    if (top) for (y -= ph - 6; y > camY - ph; y -= ph - 6) ctx.drawImage(top, x, y, ww, ph);   // (the wall goes on up)
  }
}
// over everything: the chips of stone, and the power bar ("test your might")
function r3DrawMight() {
  if (region.room && region.room.id === "tribes") r3TrialBanner();
  if (r3.caughtT > 0) { const k = 1 - Math.abs(r3.caughtT - R3.SNEAK.CAUGHT_FADE / 2) / (R3.SNEAK.CAUGHT_FADE / 2); ctx.fillStyle = `rgba(0,0,0,${k})`; ctx.fillRect(0, 0, W, H); }
  for (const q of r3.chips) { ctx.globalAlpha = Math.max(0, 1 - q.t / q.life); ctx.fillStyle = "#e3d3b0"; ctx.fillRect(q.x - camX - q.r / 2, q.y - camY - q.r / 2, q.r, q.r); }
  ctx.globalAlpha = 1;
  const m = r3.might; if (!m) return;
  const M = R3.MIGHT, cx = W / 2, top = 150, bh = 330, bw = 46, bx = W - 170;
  ctx.save(); ctx.textAlign = "center"; ctx.lineJoin = "round";
  if (m.phase === "mash") {
    ctx.font = "bold 44px Georgia, serif"; ctx.fillStyle = "#ffd76a"; ctx.strokeStyle = "#2a1a0a"; ctx.lineWidth = 7;
    ctx.strokeText("TEST YOUR MIGHT!", cx, 110); ctx.fillText("TEST YOUR MIGHT!", cx, 110);
    ctx.font = "bold 20px sans-serif"; ctx.fillStyle = "#fff"; ctx.lineWidth = 5; ctx.strokeText("Mash A and B!", cx, 142); ctx.fillText("Mash A and B!", cx, 142);
  }
  // the bar: filling up from the bottom, the gold line near the top
  const lv = m.phase === "mash" ? m.level : m.power;
  ctx.fillStyle = "rgba(10,8,6,0.7)"; ctx.fillRect(bx - 10, top - 10, bw + 20, bh + 44);
  const g = ctx.createLinearGradient(0, top + bh, 0, top); g.addColorStop(0, "#7a2a14"); g.addColorStop(0.5, "#d0602a"); g.addColorStop(0.85, "#f0b040"); g.addColorStop(1, "#fff2a0");
  ctx.fillStyle = g; ctx.fillRect(bx, top + bh * (1 - lv), bw, bh * lv);
  if (m.flash > 0) { ctx.fillStyle = "rgba(255,255,255,0.35)"; ctx.fillRect(bx, top + bh * (1 - lv), bw, bh * lv); }
  const gy = top + bh * (1 - M.GOLD); ctx.fillStyle = "#ffd700"; ctx.fillRect(bx - 14, gy - 2, bw + 28, 4);
  ctx.font = "bold 13px sans-serif"; ctx.fillText("GOLD", bx + bw / 2, gy - 8);
  ctx.strokeStyle = "#ffd76a"; ctx.lineWidth = 2; ctx.strokeRect(bx, top, bw, bh);
  if (m.phase === "mash") { const left = Math.max(0, 1 - m.t / M.TIME); ctx.fillStyle = left > 0.3 ? "#7fdc7a" : "#ff6a4a"; ctx.fillRect(bx, top + bh + 14, bw * left, 8); }
  if (m.gold && m.phase !== "mash") {
    ctx.font = "bold 52px Georgia, serif"; ctx.fillStyle = "#ffd700"; ctx.strokeStyle = "#3a2400"; ctx.lineWidth = 8;
    ctx.globalAlpha = Math.min(1, m.t * 4); ctx.strokeText("GOLD STANDARD!", cx, 130); ctx.fillText("GOLD STANDARD!", cx, 130);
  }
  ctx.restore();
}

function r3Draw(camX) {
  const r = region.room; if (!r) return;
  if (r.id === "tribes") r3TrialDraw(camX);
  r3YardDark(camX); r3HangDraw(camX); r3PropsDraw(camX); r3SwingDraw(camX);
  const d = david, idle = !r3.might && !region.script.length && !(dialog && dialog.t > 0) && d.onGround;
  if (idle && r.id === "nob" && !hasSkill("heavySword") && r3Has("r3_hall_key") && Math.abs(d.x - r3.swordX) < 2.5 * T) upHint(r3.swordX - camX, GR * T - 250);   // (Up: ask for it)
  for (const w of r3.walls) if (idle && w.room === r.id && !w.broken && hasSkill("heavySword") && Math.abs(d.x - (d.facing > 0 ? w.x0 : w.x1)) < R3.MIGHT.REACH * T) upHint((w.x0 + w.x1) / 2 - camX, GR * T - 300);
  r3DrawSneak(camX, idle);
  if (r3.scene && r3.scene.id === "bread") {   // his clip, the three of them; Ahimelech's head on his own spot
    const g = SPR.nob_bread_give, e = SPR.nob_bread_eat, tg = g.frames * g.ms / 1000, t = r3.scene.t;
    const [n, f] = t < tg ? ["nob_bread_give", Math.floor(t * 1000 / g.ms)] : ["nob_bread_eat", Math.min(e.frames - 1, Math.floor((t - tg) * 1000 / e.ms))];
    drawSprite(n, Math.min(SPR[n].frames - 1, f), r3.breadX - camX, GR * T, -1, R3.BREAD.K);
  }
  for (const p of r3.people) {
    if (r3.scene && (p.tag === "ahimelech" || p.tag === "doeg")) continue;   // (they're in the clip)
    if (p.room !== r.id || !SPR[p.name]) continue;
    const x = p.x - camX; if (x < -300 || x > W + 300) continue;
    drawSprite(p.name, frameOf(p.name, r3.t + p.ph), x, p.y ?? GR * T, p.facing * (R3_FACE_LEFT.has(p.name) ? -1 : 1), p.k);
  }
}
const R3_FACE_LEFT = new Set(["gath_elite_walk"]);   // (sheets drawn facing left: a walker's facing is the way he walks)
