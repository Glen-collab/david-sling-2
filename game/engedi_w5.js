// World 5, part two: En-Gedi (1 Samuel 23:29; 24; ENGEDI_PLAN.md). Part Two's seventh region, on region.js's engine like
// ziph.js: loaded before region.js, which takes ENGEDI as its REGION when the address is "#9-11".
// (The old Part One-engine test, #9-1, is engedi.js: its own W9/w9, untouched.)
//
// Glen's mission (11-18): "David finds provisions and food for his men. Each level we can take a bunch and he has to go
// back to his camp to deliver them before bringing more ... Each time he goes out he has to dodge Saul's soldiers and
// other enemies. When he returns the last time is when we do the robe cut." And: "if you are seen keep the pack unless
// you have to start the room over."
//
//   The Camp (the cave by the sheep pens, 24:3: the men in its innermost parts) <- The Sheep Pens by the Way <- The
//   Spring (water, dates) <- The Rocks of the Wild Goats (tall: the wall climb, honey, partridge eggs) <- The Wilderness
//   (salt, figs, almonds). Each supply room opens once the one before it is home. Then Saul walks into the cave.
//
// First pass (11-18): stand-in pictures (Adullam's camp, Keilah's and Ziph's outdoors) and stand-in provisions (the
// Adullam camp kit) till Glen's own.

const G5 = {
  PACK_REACH: 44,          // px: touching a provision picks it up
  SPARE: 1,                // provisions each load can do without (one dropped on the way home is all right)
  DROP_FOR: 3.5,           // s a dropped provision waits to be picked back up (then it's back where it was found)
  DROP_AFTER: 0.5,         // s before a dropped one can be picked up again (not straight back into the pack)
  ITEM_W: 74,              // px wide, a provision lying about (stand-in kit pieces)
  CAMP_REACH: 34,          // cols into the camp: walking back past here sets the pack down by the pile
  // Saul's men (as ziph.js's hills: walk, stop and look, turn); the more loads home, the more of them
  SNEAK: { WALK: 62, LOOK: 2.0, TURN: 0.45, SIGHT: 8, SIGHT_LOW: 2.2, SEEN_T: 0.6, NEAR: 30, CAUGHT_FADE: 1.4 },
  // the cave, at the end: walking upright this close to Saul (px) and he stirs; the sword reaches his robe from this close
  SAUL_HEAR: 7 * 36, CUT_REACH: 95, SAUL_AT: 27, SAUL_WALK: 80,   // (SAUL_AT: his column in the cave by the pens)
  INNER: { IN: 5, DARK: 0.93, LIT: [[230, 100], [210, 110]], GLOW: 170 },   // where David comes in, how dark, the lights on him and the king, the way out's glow
  // Glen's robe-cut two-shot (saul_robe_cut): as engedi.js's #9-1
  SCENE_MS: 160, SCENE_START: 6, SCENE_END: 20, SCENE_DAVID: [198, 196],
  NPC_K: 0.9,
  // the Spring's falls and cave mouth (cut from the pool's picture): its size, the falls' middle and the water line (px in the cut)
  SPRING_FALLS2: { K: 0.85, W: 742, H: 488, FX: 413, BASE: 350, CLIP: "falls3", UP: 10 },   // (Glen 11-19, his locked-camera one: the stream runs out over the path in front)   // (his clip's size, its falls' middle and the foot of its rocks, px)
  SPRING_FALLS: { K: 0.8, FX: 470, WATER: 372, SRC_X: 2900 },   // (SRC_X: where it was cut from the pool's picture, px)
  SIT_K: 0.92, OLD_K: 0.76,   // (Glen 11-18: the sitting men's clips and the old man in blue, heads too big beside David)
  // the pool (as adullam.js's swimming, Glen's own swim sheets): sideways speed, a stroke (A), Up/Down, sinking, the most
  //  speed, how far under the surface his head is, the leap out (A at the surface), breath (s), and after running out
  SWIM: { X: 170, STROKE: 230, PUSH: 420, SINK: 160, MAXV: 260, FLOAT: 110, LEAP: 1120, LEAP_NEAR: 30, BREATH: 10, AFTER: 3, TREAD: 0.35, FLOAT_NEAR: 60, K: 0.5,
    // the sheets: treading, swimming along the top, under; the clip's waterline row in each top sheet; how high under
    LOOK: { TREAD: "david_tread2", SURF: "david_surf", UNDER: "david_swim_under", TREAD_WL: 50, SURF_WL: 16, UNDER_Y: 60 } },
  // the pool's clip drawn again over whatever's in the water: how strong, px below the surface it starts, its fade in
  WATER_OVER: { A: 0.4, TOP: 0, FADE: 40 },
  POOL_BANK: 330, POOL_LEDGE: 312,   // (Glen 11-18: the ledge on the painted rocks left of the falls, not on the water)
  // (Glen 11-18: "have David go into the cave for the truth ... an up arrow and have him disappear behind the falls") the
  //  cave mouth (column in the pool room), how near for Up; his turn, his walk in (s), inside, and back out
  // the cave behind the falls: its ledges [column, px, width], bats [column, px], the Truth's shelf [column, px]
  //  (Glen 11-19: "no topsoil ... one big death pit": solid only at its two ends, water down below: GROUND [left, right]
  //  columns of rock, WATER px its surface, DIE: px under it he's gone)
  // the back way: the crack's column in the Wilderness, its picture (Glen's hidden mouth, smaller: K, the crack across it,
  //  its floor px in it), the flooded cave's fish
  BACK: { MOUTH: 146, PIC: "engedi/secret/thorns.png", W: 960, H: 600, K: 0.85, MID: 0.61, FLOOR: 480, FISH: [["biter", 14, 30, 20], ["tilapia", 24, 44, -40], ["biter", 36, 56, 30], ["perch", 46, 60, -20]] },
  // the Fork in the Dark: its two mouths (cols: to the Spring, to the camp), how big they're drawn, and its bats
  FORK: { SPRING: 13, CAMP: 31, MW: 190, MH: 345, BATS: [[9, 130], [22, 110], [35, 140]] },
  HOLLOW: { LEDGES: [[56, 520, 4], [48, 460, 4], [40, 410, 4], [33, 370, 5], [25, 430, 4], [17, 480, 4]], BATS: [[50, 120], [36, 110], [22, 130]], TRUTH: [35, 370],
    GROUND: [11, 63], WATER: 628, DIE: 40 },
  // the pool's fish (adullam.js's, its R4.FISH sizes): [kind, from column, to column, px off the middle of the water]
  FISH: [["tilapia", 12, 30, -40], ["biter", 22, 44, 30], ["perch", 40, 58, -20], ["biter", 56, 76, 20], ["tilapia", 66, 84, -50]],
  // the hidden mouth: Glen's picture over the room (its size, how much smaller, its floor px in it), the mouth's column
  // his crawl out of the hidden mouth (crawl_out.webm): its length (s), the fade back to play, how long to wait for it to load
  CRAWL: { LEN: 6.0, FADE: 0.5, WAIT: 2.5 },
  // his clean picture of the mouth (16:9, the clips' own framing): drawn this wide (px: David in the clips 423 of 540 tall
  //  becomes David's 112), MID: the mouth's middle across it, FEET: his feet's line down it, SINK px into the ground;
  //  ALIGN: each clip on it [scale, x, y as parts of the picture] (measured: the climb in is framed the same, the crawl out a
  //  little closer)
  MOUTH_PIC: { W: 254, FADE: 0.16, MID: 0.51, FEET: 0.885, SINK: 4, ALIGN: { crawl_in: [1, 0, 0], crawl_out: [1.07, -17 / 480, -1 / 270] } },
  HIDEOUT: { W: 2736, H: 912, K: 0.6, FLOOR: 766, MOUTH: 24 },
  CAVE: { WATER_H: 380, AT: 88, FALLS: 93.7, REACH: 72, TURN: 0.5, WALK: 1.0, INSIDE: 0.7, OUT: 0.7, RISE: 40, SHRINK: 0.35 },   // px: the bank he comes in on (left), the rocks at the cave mouth (right)
  PALM_TOP: 270,           // px: the crown of a date palm, where David stands among the dates
  FALLS_K: 1.6,            // the waterfall's size
  SHEEP_K: 1.35,           // the flock in the pens (Glen 11-18: smaller, about waist high on David)
};
// the provisions (stand-ins from Adullam's camp kit till Glen's sheet): name, kit piece
const G5_FOOD = {
  water: ["a water skin", "w4_waterskin"], dates: ["dates", "w4_basket"], honey: ["honey out of the rock", "w4_pot"],
  eggs: ["partridge eggs", "w4_bowl"], salt: ["salt", "w4_jar_big"], figs: ["figs", "w4_basket"], almonds: ["almonds", "w4_bag"],
};
const G5_RUNS = ["spring", "rocks", "wild"];
// (Glen's, 11-18: tools/cut_piece.py) the date palm, the tall cliff, the beehive in the rock, the sheep pen wall, the pool
const G5_KIT = { w4_e_palm: { w: 470, h: 533 }, w4_e_cliff: { w: 300, h: 1037 }, w4_e_hive: { w: 230, h: 210 }, w4_e_penwall: { w: 250, h: 78 }, w4_e_pool: { w: 270, h: 66 },
  w4_e_falls: { w: 1100, h: 350, fx: 836, water: 185 } };   // (his falls with the cave behind: fx, the falls' middle; water, its surface, px down)   // the supply rooms, in order

const ENGEDI = {
  key: "engedi", name: "En-Gedi", start: "camp", carry: ["gibeah", "ramah", "nobgath", "adullam", "keilah", "ziph"],
  strCap: 8,
  rooms: [
    // (Glen's, 11-18: the cave mouth bright on the right, the floor with the fire; "stocked", his storeroom cave, once
    //  every load is home: g5Update)
    { id: "camp", name: "The Camp in the Cave", w: 60, cave: true, mx: 0, my: 1, mw: 2, outR: ["hideout", 25],   // (out of its bright end: at the hidden mouth outside)
      far: "engedi/camp/far", near: "engedi/camp/near.png", nearK: 0.62 },
    // (Glen 11-19: "a break from the camp in the cave to the sheep pens ... David leaving the small cave mouth that looks
    //  hidden", his two pictures, the pens' sky and near strip) back into the camp by Up at the mouth only
    // (Glen 11-19: "Saul is clearly right there with all the provisions around ... it was super dark like a real cave")
    //  the robe is cut back here, in the dark (his #9-1 test cave's look), not in the stocked camp; out its right end, the camp
    // (Glen 11-19: "Did Saul go that deep in? No ... a second hidden cave mouth ... the one Saul came into", above the
    //  Hidden Cave Mouth) the robe is cut here, near the mouth; in from the camp going right, out its bright end at the pens
    { id: "inner", name: "Cave Mouth", w: 40, cave: true, mx: 2, my: 0, mw: 1, outL: ["camp", 55], outR: ["pens", 8],
      strip: "w4/narrows_strip", floor: "w4/narrows_floor", ledgeDark: 0.5 },
    { id: "hideout", name: "The Hidden Cave Mouth", w: 46, bg: "w4_1", mx: 2, my: 1, mw: 1, right: "pens",
      far: "engedi/pens/far", mid: "engedi/hideout/mid.png", midY: -100, near: "engedi/pens/near.png" },
    { id: "pens", name: "The Sheep Pens by the Way", w: 110, bg: "w4_1", mx: 3, my: 1, mw: 2, left: "hideout", right: "spring",
      far: "engedi/pens/far", mid: "engedi/pens/mid.png", midY: 0, near: "engedi/pens/near.png" },   // (Glen's, 11-18)
    { id: "spring", name: "The Spring", w: 130, bg: "w4_1", mx: 5, my: 1, mw: 4, left: "pens", right: "rocks",
      far: "engedi/spring/far", mid: "engedi/spring/mid.png", midY: 0 },   // (Glen's, 11-18: the oasis; palm fronds hanging over, the pool's edge)
    // (Glen's, 11-18: "the falls piece a whole mid ground and foreground room for the swimming part and the cave mouth")
    //  his long pool, the falls and the cave at its far end; Up at the Spring's falls, swim across, out at the cave
    { id: "pool", name: "The Pool Below the Falls", w: 100, bg: "w4_1", mx: 6, my: 2, mw: 3, outL: ["spring", 58], water: 361,
      far: "engedi/spring/far" },
    // (Glen 11-19: "go behind the waterfall and enter another cave to find the truth ... a tighter and smaller cave and it
    //  can double back in our map to go back to the camp") in behind the pool's falls (its right end), out at the camp
    { id: "hollow", name: "The Cave Behind the Falls", w: 72, cave: true, mx: 1, my: 2, mw: 5, outL: ["camp", 6], outR: ["pool", 87],
      strip: "w4/narrows_strip", floor: "w4/narrows_floor", ledgeDark: 0.5 },
    // (Glen 11-19: "from the wilderness have another cave ... with a swim ... a room that goes to another cave above water room
    //  that just happens to go back to camp") in at a hidden crack at the Wilderness's far end, swim the flooded cave, out on
    //  its far ledge into the Cave Behind the Falls (its right end), and through it to the camp: the back way home
    { id: "backway", name: "The Flooded Cave", w: 70, cave: true, mx: 11, my: 2, mw: 3, water: 361, outL: ["wild", 145], outR: ["fork", 2],
      strip: "w4/flooded_strip", floor: "w4/flooded_floor", ledgeDark: 0.5 },
    // (Glen 11-19: "one more room that is dark like that but a pass through with two cave mouths to go through. One will put
    //  him at the entrance of the spring cave mouth and the other will put him into the camp in the cave")
    { id: "fork", name: "The Fork in the Dark", w: 40, cave: true, mx: 14, my: 2, mw: 2, outL: ["backway", 66],
      strip: "w4/narrows_strip", floor: "w4/narrows_floor", ledgeDark: 0.5 },   // (dry and dark: the Flooded Cave's walls have its water painted in)
    { id: "rocks", name: "The Rocks of the Wild Goats", w: 64, up: 40, bg: "w4_1", mx: 9, my: 0, mw: 2, mh: 2, left: "spring", right: "wild",
      far: "engedi/rocks/far", mid: "engedi/rocks/mid.png", midY: 0, near: "engedi/rocks/near.png" },   // (Glen's, 11-18)
    { id: "wild", name: "The Wilderness of En-Gedi", w: 150, bg: "w4_1", mx: 11, my: 1, mw: 4, left: "rocks",
      far: "engedi/wild/far", mid: "engedi/wild/mid.png", midY: 0, near: "engedi/wild/near.png" },   // (Glen's, 11-18)
  ],
  // the Journal: Glen's song, the Final Chorus, its second half (SONG_PSALM57.md, his words exactly)
  steps: ["g5_load_spring", "g5_load_rocks", "g5_load_wild", "g5_cut"],
  verse: ["My heart is steadfast, O my God", "My heart is steadfast in You", "I will sing, I will praise Your name", "For Your mercy carries me through"],
  // (draft words, for Glen, 11-18: ENGEDI_PLAN.md)
  entries: [
    ["Six hundred men in a cave, and nothing to eat. So I went out for water and dates, past Saul's own soldiers.", "1 Samuel 23:29"],
    ["The wild goats showed me the way up the rocks. There was honey up there, out of the rock.", "Psalm 81:16"],
    ["Saul brought three thousand men to hunt us. Every time I went out, there were more of them.", "1 Samuel 24:2"],
    ["Saul walked into our cave alone. I cut the corner of his robe and let him go. Even that troubled my heart.", "1 Samuel 24:4–6"],
  ],
  end: ["May the LORD judge between me and you, and may the LORD avenge me of you; but my hand will not be on you.", "1 Samuel 24:12"],
  build: R => g5Build(R), enter: r => g5Enter(r), update: (dt, r) => g5Update(dt, r), holdDavid: (d, dt) => g5Hold(d, dt),
  drawDavid: (d, x, y) => g5DrawDavid(d, x, y), drawBack: camX => g5DrawBack(camX), draw: camX => g5Draw(camX), drawFront: camX => g5DrawFront(camX), afterFar: (r, o, w, k, fy) => g5FarIbex(r, o, w, k, fy),
  drawOver: () => g5DrawOver(), stoneHits: s => g5StoneHits(s),
};

const g5 = { told: {}, people: [], guards: [], hides: [], food: [], pack: [], drops: [], caughtT: 0, entry: {}, saul: null, pose: null, lastHearts: null };
const g5Has = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function g5Tell(k, text) { if (!g5.told[k]) { g5.told[k] = true; toast(text); } }
function g5Person(room, spr, x, dir = 1, show = null, k = G5.NPC_K) { const p = { room, spr, x, y: FOOT, dir, show, k, t: Math.random() * 3 }; g5.people.push(p); return p; }
function g5Hide(room, n, x, foot = FOOT) {   // a rock to crouch behind (in front of David), as ziph.js's
  const k = KIT[n]; region.props.push({ room, n, x: x - k.w / 2, y: foot - k.h + (k.top || 0) * 0.3 + (n === "w4_rubble_sand" ? 46 : 0), front: true });
  g5.hides.push({ room, x, x0: x - k.w / 2, x1: x + k.w / 2, y: foot - 4 });
}
// one of Saul's men on his beat, c0 to c1 (columns in the room); run: how many loads must be home before he's out here
function g5Guard(room, c0, c1, run = 0, y = FOOT, facing = 1) {
  const r = roomById(room).c0;
  g5.guards.push({ room, run, from: (r + c0) * T, to: (r + c1) * T, x: (r + (facing > 0 ? c0 : c1)) * T, y, facing, f0: facing, state: "walk", t: Math.random() * 2, seen: 0 });
}
function g5Food(room, kind, c, y = FOOT - 4) {   // a provision lying at column c (of the room), its foot at y
  const n = g5.food.filter(f => f.room === room).length + 1;
  g5.food.push({ id: "g5_f_" + room + "_" + n, room, kind, x: (roomById(room).c0 + c) * T + T / 2, y, t: Math.random() * 6 });
}
const G5_RUN_OF = { pool: "spring" };   // (the pool's water skin is part of the Spring's load)
const g5RunOf = room => G5_RUN_OF[room] || room;
const g5RoomFood = room => g5.food.filter(f => g5RunOf(f.room) === room);
// (Glen 11-19: "a surplus so if I do drop some on the last trip that is ok") each load has SPARE more than it needs
const g5Need = room => Math.max(1, g5RoomFood(room).length - G5.SPARE);
const g5Home = room => g5RoomFood(room).filter(f => g5Has(f.id)).length;
const g5Done = room => g5Home(room) >= g5Need(room);
const g5Stage = () => G5_RUNS.filter(g5Done).length;   // loads home (0-3)
const g5Open = room => { const i = G5_RUNS.indexOf(room); return i <= 0 || g5Done(G5_RUNS[i - 1]); };
const g5Active = g => g5Stage() >= g.run && !g5Has("g5_cut");

// ---------------------------------------------------------------------------------------------------------------------
// building
function g5Build(R) {
  if (typeof R4_KIT !== "undefined") Object.assign(KIT, R4_KIT);   // (adullam.js's camp things: the stand-in provisions)
  if (typeof Z5_KIT !== "undefined") Object.assign(KIT, Z5_KIT);   // (ziph.js's hiding rock and trees)
  Object.assign(KIT, G5_KIT); Object.keys(G5_KIT).forEach(kitImg);
  g5.cliffs = []; g5.pools = [];
  for (const pl of ["engedi/pens", "engedi/spring", "engedi/rocks", "engedi/wild"]) for (const f of ["far", "mid.png", "near.png"]) roomImg(pl + "/" + f);
  for (const n of ["engedi/camp/far", "engedi/camp/near.png", "engedi/camp_stocked/far", "engedi/pool/pool.png", "engedi/spring/falls_cave.png", "engedi/spring/falls3_still.png", "engedi/hideout/mouth.png", "engedi/hideout/mid.png", "engedi/hideout/mouth_small.png", "engedi/secret/thorns.png"]) roomImg(n);
  g5.swim = null; g5.breath = G5.SWIM.BREATH; g5.fish = [];
  for (const k of ["people", "guards", "hides", "food", "pack", "drops"]) g5[k].length = 0;
  g5.saul = null; g5.pose = null; g5.cave = null; g5.crawl = null; g5.prevRoom = null; g5.caughtT = 0; g5.entry = {}; g5.lastHearts = null;
  ["w4_z_hide_rock", "w4_rubble_sand", "w4_tree_acacia", "w4_tree_dead", "w4_tree_oak", ...Object.values(G5_FOOD).map(f => f[1])].forEach(kitImg);

  // -- The Camp in the Cave (24:3: "David and his men were staying in the innermost parts of the cave")
  let c = R("camp");
  { const rm = "camp", X = k => (c + k) * T;
    ground(c, c + 59);
    g5.men = [g5Person(rm, () => g5Stage() > 0 ? "man_eat" : "man_hungry", X(5), 1, null, G5.SIT_K), g5Person(rm, "abiathar_stand", X(9), 1), g5Person(rm, "abishai_idle", X(14), 1),
      g5Person(rm, "asahel_idle", X(19), -1), g5Person(rm, "soldier_talk", X(23), -1, null, G5.OLD_K)];   // (Glen 11-18: not the same man twice; Abiathar came with the ephod at Keilah, 23:6)
    g5.abishai = g5.men[2];
    g5.pileX = X(28);
    campfire(c + 36, GR - 1);
    // (Glen's clips, 11-18) two of the men by the fire: hungry, heads down, till the first load is home; then bread and figs
    g5Person(rm, "men_hungry", X(40), 1, () => g5Stage() === 0, G5.SIT_K); g5Person(rm, "men_eat", X(40), 1, () => g5Stage() > 0, G5.SIT_K);   // (back in the dark while Saul sits by the fire)
    g5.entry.camp = X(54);
  }

  // -- The Cave by the Sheep Pens (24:3, where Saul went in): only bare rock and the dark
  c = R("inner");
  ground(c, c + 39);

  // -- The Sheep Pens by the Way (24:3): stone pens on the road, and Saul's men, more of them every run
  // -- The Hidden Cave Mouth (Glen's, 11-19): out of the camp beside it; Up at it to go back in
  c = R("hideout");
  { const rm = "hideout", H5 = G5.HIDEOUT;
    ground(c, c + 45);
    g5.entry.hideout = (c + H5.MOUTH + 2) * T;
  }

  c = R("pens");
  { const rm = "pens", X = k => (c + k) * T;
    ground(c, c + 109);
    campfire(c + 4, GR - 1); campfire(c + 104, GR - 1);
    // (Glen's pen wall over the low wall's stone: the same hop up, the same top)
    const pen = k => { rLowWall(rm, c + k); const p = region.props[region.props.length - 1], w = KIT.w4_e_penwall; Object.assign(p, { n: "w4_e_penwall", x: (c + k) * T + 2.5 * T - w.w / 2, y: FOOT - w.h + 4 }); };
    pen(26); pen(60); pen(88);
    for (const k of [28, 62, 90]) g5.hides.push({ room: rm, x: X(k + 2), x0: X(k) - 20, x1: X(k + 5) + 20, y: FOOT - 4 });   // (crouched by a pen wall)
    g5Hide(rm, "w4_z_hide_rock", X(18)); g5Hide(rm, "w4_rubble_sand", X(46)); g5Hide(rm, "w4_z_hide_rock", X(76)); g5Hide(rm, "w4_rubble_sand", X(100));
    g5.flock = [["sheep_graze", X(32), 1], ["sheep2_graze", X(37), -1], ["sheepblack_graze", X(66), 1], ["sheep_graze", X(71), -1], ["sheep2_graze", X(94), 1]];
    g5Guard(rm, 34, 56, 0); g5Guard(rm, 66, 84, 1, FOOT, -1); g5Guard(rm, 10, 24, 2); g5Guard(rm, 92, 104, 2, FOOT, -1);
    critter("scorpion", c + 52);
    g5.entry.pens = X(4);
  }

  // -- The Spring (the oasis: falls, pools, palms): water skins, dates
  c = R("spring");
  { const rm = "spring", X = k => (c + k) * T;
    ground(c, c + 129);
    campfire(c + 4, GR - 1); campfire(c + 125, GR - 1);
    // (Glen's date palms: up the stones to the crown, the dates in the fronds)
    const palm = k => { const w = KIT.w4_e_palm; region.props.push({ room: rm, n: "w4_e_palm", x: X(k) - w.w / 2, y: FOOT - w.h + 8 });
      const top = G5.PALM_TOP; platAt(c + k - 2, top, 4); return top; };
    const b1 = palm(18), b2 = palm(98);
    rLedge(rm, c + 10, 460, 3); rLedge(rm, c + 13, 360, 3); rLedge(rm, c + 92, 460, 3); rLedge(rm, c + 95, 360, 3);
    g5Food(rm, "dates", 18, b1 - 4); g5Food(rm, "dates", 98, b2 - 4);
    g5Pool(rm, c + 40, 5);
    g5.falls = X(62);
    g5Food(rm, "water", 54); g5Food(rm, "water", 70);
    rLedge(rm, c + 74, 460, 4); rLedge(rm, c + 80, 360, 4);
    g5Pool(rm, c + 86, 5);
    rLedge(rm, c + 110, 450, 5); g5Food(rm, "dates", 112, 450 - 4);
    rWild("viper", rm, c + 30); rWild("hornet", rm, c + 70, { y: 380, hy: 380 }); if (typeof rHyraxFamily === "function") rHyraxFamily(rm, c + 106, 2); else rHyrax(rm, c + 106);   // (Glen 11-19: out from behind the rubble and the olive press, in the open)
    g5Hide(rm, "w4_z_hide_rock", X(22)); g5Hide(rm, "w4_rubble_sand", X(50)); g5Hide(rm, "w4_z_hide_rock", X(72)); g5Hide(rm, "w4_z_hide_rock", X(100)); g5Hide(rm, "w4_rubble_sand", X(116));
    g5Guard(rm, 24, 38, 0); g5Guard(rm, 96, 110, 0, FOOT, -1); g5Guard(rm, 48, 56, 1); g5Guard(rm, 70, 80, 2, FOOT, -1);
    g5.entry.spring = X(4);
    rPath(rm, c + 58, "pool", 2, "The pool goes on behind the falls. Up to go and see.", "none");   // (Glen 11-19: "it is just the waterfall", no trail drawn over it)
  }

  // -- The Pool Below the Falls (Glen's): in off the bank, swim the pool (a water skin on the bottom), out onto the rocks at
  //  the cave mouth behind the falls: the Truth inside
  c = R("pool");
  { const rm = "pool", X = k => (c + k) * T;
    ground(c, c + 99);
    rLedge(rm, c, G5.POOL_BANK, 4);
    rLedge(rm, c + 84, G5.POOL_LEDGE, 6);   // (the rocks just left of the falls, columns 84-89)
    g5Food(rm, "water", 52, GR * T - 4);   // (the Spring's third skin, down on the bottom)
   // (inside the cave: found by going in, never lying out on the rocks)
    rRelic("g5_pom_pool", "pomegranate", c + 30, GR - 1);
    g5.entry.pool = X(2);
    for (const [kind, k0, k1, dy] of G5.FISH) g5FishAt(kind, c, k0, k1, dy);   // (Glen 11-19: "add those killer fish too")
  }

  // -- The Cave Behind the Falls (Glen 11-19): tight and dark, in from behind the pool's falls; ledges up and down, bats,
  //  the Truth on the high shelf; at its far (left) end the way through into the camp
  c = R("hollow");
  { const rm = "hollow", L = G5.HOLLOW;
    ground(c, c + L.GROUND[0]); ground(c + L.GROUND[1], c + 71);
    for (const [k, y, w] of L.LEDGES) rLedge(rm, c + k, y, w);
    for (const [k, y] of L.BATS) rBat(rm, c + k, y);
    rRelic("g5_truth_falls", "truth", c + L.TRUTH[0], onTop(L.TRUTH[1]), "A poem by David, when he fled from Saul, in the cave. Be merciful to me, God, be merciful to me, for my soul takes refuge in you. (Psalm 57, heading and verse 1)");
  }

  // -- The Rocks of the Wild Goats (24:2): tall. The ibex go straight up the rock; David learns the wall climb from them
  c = R("rocks");
  { const rm = "rocks", X = k => (c + k) * T;
    ground(c, c + 63);
    campfire(c + 3, GR - 1); campfire(c + 60, GR - 1);
    // the first cliff: climb either face (Up at it), its top a shelf
    const cliff = (k, w, topRow) => { block(c + k, topRow, w, GR - topRow, 6); platAt(c + k, topRow * T, w);
      for (let i = 0; i < w; i++) for (let r_ = topRow; r_ < GR; r_++) artSolid.add((c + k + i) + "," + r_);
      g5.cliffs.push({ room: rm, x: (c + k) * T, w: w * T, top: topRow * T });
      region.walls.push({ room: rm, x0: (c + k) * T, x1: (c + k + w) * T, top: topRow * T, need: "wallClimb" }); };
    cliff(12, 11, 6);   // (Glen 11-18, 11-19: wider, over the painted rock behind it)
    rWild("ibex", rm, c + 17, { y: 6 * T, hy: 6 * T, range: 2 });
    // up from its top, ledge to ledge into the sky
    rLedge(rm, c + 22, 70, 4); g5Food(rm, "eggs", 23, 70 - 4);
    rLedge(rm, c + 27, -80, 4); rLedge(rm, c + 22, -230, 4); rLedge(rm, c + 28, -380, 4); g5Food(rm, "eggs", 29, -380 - 4);
    rLedge(rm, c + 32, -480, 3);
    // the high crag, sheer from the ground: honey in its top, the bees round it (its top on the room's first row: the
    //  engine's solid rock can't go higher than that; the sky ledges above are the way to the eggs)
    cliff(35, 10, 1);   // (Glen 11-19: wider, over the painted rocks behind it)
    { const w = KIT.w4_e_hive; region.props.push({ room: rm, n: "w4_e_hive", x: X(40) + T / 2 - w.w / 2, y: T - w.h + 14 }); }
    g5Food(rm, "honey", 38, T - 4); g5Food(rm, "honey", 40, T - 4); g5Food(rm, "honey", 42, T - 4);
    rWild("hornet", rm, c + 40, { y: T - 120, hy: T - 120 });
    for (const k of [0, 1, 2]) rWild("bee", rm, c + 39 + k, { y: T - 34 - k * 14, ph: k * 1.6 });
    rRelic("g5_stone_crag", "stone", c + 43, 0);
    // past the crag: down on the ground again, the eggs on a shelf, an eagle
    rLedge(rm, c + 50, 470, 4); g5Food(rm, "eggs", 51, 470 - 4);
    rLedge(rm, c + 54, 150, 3); bird("eagle", rm, X(55) + T / 2, 152);   // (Glen 11-19: up high on its own perch, its feet on the plank: the 78 up was off a flying shot)
    g5Hide(rm, "w4_z_hide_rock", X(26)); g5Hide(rm, "w4_rubble_sand", X(32)); g5Hide(rm, "w4_z_hide_rock", X(48)); g5Hide(rm, "w4_z_hide_rock", X(56));
    g5Guard(rm, 23, 34, 0); g5Guard(rm, 46, 58, 0, FOOT, -1);   // (Glen 11-19: a soldier by the eagle's rocks from the first: they're worth hiding behind)
    g5.goatAt = X(9);
    g5.entry.rocks = X(4);
  }

  // -- The Wilderness of En-Gedi (down toward the Salt Sea): salt on the shore, figs, almonds
  c = R("wild");
  { const rm = "wild", X = k => (c + k) * T;
    ground(c, c + 149);
    campfire(c + 4, GR - 1);
    rHole(rm, c + 20, 3); rHole(rm, c + 48, 4); rHole(rm, c + 90, 3); rHole(rm, c + 118, 4);
    rLedge(rm, c + 42, 430, 4); rLedge(rm, c + 50, 320, 4); g5Food(rm, "figs", 44, 430 - 4); g5Food(rm, "figs", 52, 320 - 4);
    g5Food(rm, "almonds", 68); g5Food(rm, "almonds", 102);
    g5Food(rm, "salt", 138); g5Food(rm, "salt", 143);
    critter("scorpion", c + 30); critter("scorpion", c + 72); critter("scorpion", c + 108);
    rWild("viper", rm, c + 60); rWild("locusts", rm, c + 82, { y: 420 }); rWild("ibex", rm, c + 128, { range: 3 });
    rRelic("g5_pom_wild", "pomegranate", c + 53, onTop(320));
    g5Hide(rm, "w4_z_hide_rock", X(28)); g5Hide(rm, "w4_rubble_sand", X(38)); g5Hide(rm, "w4_z_hide_rock", X(64)); g5Hide(rm, "w4_z_hide_rock", X(80));
    g5Hide(rm, "w4_rubble_sand", X(100)); g5Hide(rm, "w4_z_hide_rock", X(112)); g5Hide(rm, "w4_z_hide_rock", X(132));
    g5Guard(rm, 24, 40, 0); g5Guard(rm, 70, 86, 0, FOOT, -1); g5Guard(rm, 104, 124, 0);
    g5.entry.wild = X(4);
    rPath(rm, c + G5.BACK.MOUTH, "backway", 2, "A way in, hidden behind the thorns. Cool air comes out of it. Up to go in.", "none");
  }

  // -- The Flooded Cave (Glen 11-19): the back way from the Wilderness; in on the left bank, the fish, out on the far ledge
  c = R("backway");
  { const rm = "backway", B = G5.BACK;
    ground(c, c + 69);
    rLedge(rm, c, G5.POOL_BANK, 4);
    rLedge(rm, c + 62, G5.POOL_LEDGE, 8);
    for (const [kind, k0, k1, dy] of B.FISH) g5FishAt(kind, c, k0, k1, dy, rm);
  }
  // -- The Fork in the Dark (Glen 11-19): out of the Flooded Cave, two mouths: Up at one to the Spring (by its falls),
  //  Up at the other into the camp
  c = R("fork");
  { const rm = "fork", F = G5.FORK;
    ground(c, c + 39);
    for (const [k, y] of F.BATS) rBat(rm, c + k, y);
    rPath(rm, c + F.SPRING, "spring", 58, "Daylight, and the sound of falling water. This way comes out at the Spring. Up to go.", "none");
    rPath(rm, c + F.CAMP, "camp", 6, "Woodsmoke, and men's voices far off. This way goes to the camp. Up to go.", "none");
  }
  // trees (Glen's, from Ziph), behind David
  const tree = (rm, n, k, sink = 10) => { const kk = KIT[n]; if (kk) region.props.push({ room: rm, n, x: (roomById(rm).c0 + k) * T - kk.w / 2, y: FOOT - kk.h + sink, back: true }); };
  tree("pens", "w4_tree_oak", 50); tree("wild", "w4_tree_acacia", 68); tree("wild", "w4_tree_acacia", 102); tree("wild", "w4_tree_dead", 30); tree("rocks", "w4_tree_dead", 8);
  // (Glen 11-19: "put ravens in the trees and vultures here and there") ravens in the dead trees' branches, vultures on the
  //  acacias' flat tops and on the ground; px from the tree's middle, and up from his feet
  const G5_TREE_BIRDS = { dead: [["raven", 46, 250], ["raven", -58, 205]], acacia: [["vulture", -140, 266], ["vulture", 110, 282]] };
  const perch = (rm, kind, k) => { for (const [b, dx, up] of G5_TREE_BIRDS[kind]) bird(b, rm, (roomById(rm).c0 + k) * T + dx, FOOT - up); };
  perch("wild", "dead", 30); perch("rocks", "dead", 8); perch("wild", "acacia", 68); perch("wild", "acacia", 102);
  bird("vulture", "wild", (roomById("wild").c0 + 88) * T, FOOT); bird("vulture", "wild", (roomById("wild").c0 + 122) * T, FOOT);
  g5Talk();
}
// Up by David's men: their next line, as the loads come in
function g5Talk() {
  const MEN = "One of David's men", st = () => g5Stage();
  const say = {
    0: () => st() === 0 ? [[MEN, "There's nothing left to eat in here. Not a crumb."]] : st() === 1 ? [[MEN, "Fresh water! I'd forgotten what it tastes like."]] : st() === 2 ? [[MEN, "Honey! Who climbs up there for honey? You do, apparently."]] : [[MEN, "Salt and figs. We'll eat like kings tonight. Well, like men hiding from one."]],
    1: () => st() === 0 ? [["Abiathar", "Saul has three thousand men out there, looking for us on the rocks of the wild goats (1 Samuel 24:2)."]] : [["Abiathar", "Every time you go out, there are more of Saul's men by the pens. Keep low."]],
    2: () => st() === 0 ? [["Abishai", "Six hundred men, and nothing to feed them. The Spring's past the sheep pens. Water there, and dates on the trees."]]
      : st() === 1 ? [["Abishai", "Next, the rocks where the wild goats live. Watch how they go up: they'll show you the way."]]
      : st() === 2 ? [["Abishai", "One more: the wilderness, down toward the Salt Sea. Salt, figs and almonds."]] : [["Abishai", "That's everything. Rest now. We stay deep in the cave, where no one can see us."]],
    3: () => [["Asahel", "If Saul's men find this cave, we're trapped in here. So nobody follows you home."]],
    4: () => st() < 3 ? [[MEN, "Bring it all back here, by the fire. We'll share it out."]] : [[MEN, "Shh. Someone's at the cave mouth."]],
  };
  g5.men.forEach((p, i) => rTalker(p, () => say[i]()));
}
// (Glen's pool, 11-18) a pit with his pool drawn over it, in front of David: till swimming, falling in costs a heart
function g5Pool(rm, c, w) {
  const n0 = region.props.length; rHole(rm, c, w); region.props.splice(n0);   // (no pit rims: the pool's own walls)
  g5.pools.push({ room: rm, x: (c + w / 2) * T, x0: c * T, x1: (c + w) * T });
}
function rHyrax(rm, c, o = {}) { if (typeof WILD !== "undefined" && WILD.hyrax) rWild("hyrax", rm, c, o); }

// ---------------------------------------------------------------------------------------------------------------------
function g5Enter(r) {
  const d = david;
  // (Glen 11-19: "this cave is pretty cool and has a great effect coming out") out of the camp: his clip of David
  //  squeezing out of the hidden mouth, then play from there
  const from = g5.prevRoom; g5.prevRoom = r.id;
  if (r.id === "hideout" && from === "camp") { const v = g5Video("crawl_out"); if (v) { v.loop = false; try { v.currentTime = 0; } catch (e) {} } g5.crawl = { t: 0, clip: "crawl_out" }; }
  // where he came in: being seen sends him back here (the pack kept)
  g5.entry[r.id] = d.x < (r.c0 + r.w / 2) * T ? (r.c0 + 4) * T : (r.c0 + r.w - 5) * T;
  if (r.id === "backway") { for (const f of g5.fish) if (f.room === r.id) Object.assign(f, { gone: false, x: (f.x0 + f.x1) / 2, y: f.y0, state: "swim" });
    g5.swim = null; g5.breath = G5.SWIM.BREATH;
    if (d.x < (r.c0 + 5) * T) { d.y = G5.POOL_BANK; d.vy = 0; snapCamera(); g5Tell("backway", "Water all the way across. Swim it: watch your breath, and the fish."); } }
  if (r.id === "hollow" && d.x > (r.c0 + 60) * T) { d.y = FOOT; d.vy = 0; snapCamera(); }
  if (r.id === "backway" && d.x > (r.c0 + 60) * T) { d.y = G5.POOL_LEDGE; d.vy = 0; snapCamera(); }   // (back from the Fork: on the far ledge)
  if (r.id === "inner") { d.facing = 1; if (g5.saul && g5.saul.step === "wait") g5SaulInner(); }
  if (r.id === "fork") g5Tell("fork", "Two ways on in the dark. One smells of water and palms, the other of smoke.");
  if (r.id === "pool") { for (const f of g5.fish) if (f.room === r.id) Object.assign(f, { gone: false, x: (f.x0 + f.x1) / 2, y: f.y0, state: "swim" });
    g5.entry.pool = (r.c0 + 2) * T; if (d.x < (r.c0 + 5) * T) { d.y = G5.POOL_BANK; d.vy = 0; snapCamera(); }
    if (d.x > (r.c0 + 80) * T) { d.y = G5.POOL_LEDGE; d.vy = 0; d.x = (r.c0 + 87) * T; snapCamera(); }   // (back out of the cave behind the falls: on the rocks)
    g5.swim = null; g5.breath = G5.SWIM.BREATH; g5Tell("swim", "Into the water! A for a stroke up, Up and Down. Watch your breath: come up for air."); }
  if (r.id === "camp" && !g5Has("g5_intro")) {
    regionAdd("taken", "g5_intro");
    rPlay([{ wait: 0.5 },
      { say: ["", "David went up from there and lived in the strongholds of En Gedi. (1 Samuel 23:29)"] },
      { say: ["Abishai", "Six hundred men in a cave, and nothing to eat. Someone has to go out for food, and Saul's men are everywhere."] },
      { say: ["David", "Then I'll go. Stay deep in the cave. No one goes out but me."] },
      { fn() { toast("Bring food back to the men. Out past the sheep pens to the Spring: go right. Bring it all back here."); } }]);
  }
  if (r.id === "pens" && !g5Has("g5_saul_told")) {
    regionAdd("taken", "g5_saul_told");
    rPlay([{ wait: 0.3 },
      { say: ["", "When Saul had returned from following the Philistines, he was told, “Behold, David is in the wilderness of En Gedi.” (1 Samuel 24:1)"] },
      { say: ["", "Then Saul took three thousand chosen men out of all Israel, and went to seek David and his men on the rocks of the wild goats. (1 Samuel 24:2)"] },
      { fn() { toast("Saul's men are searching. Never strike them: when one looks your way, crouch behind a rock or a pen wall (hold Down)."); } }]);
  }
  if (r.id === "rocks" && !hasSkill("wallClimb") && !g5Has("g5_goats")) {
    regionAdd("taken", "g5_goats");
    rPlay([{ wait: 0.4 },
      { say: ["", "The wild goats go straight up the rock, where no man could climb."] },
      { say: ["David", "Then I'll go where they go."] },
      { fn() { learnSkill("wallClimb"); toast("The wall climb! Up at a sheer rock face to climb it. Up and Down; A pushes off."); } }]);
  }
  if (G5_RUNS.includes(r.id) && !g5Open(r.id)) g5Tell("shut" + r.id, "The men are waiting. Take what you have back to the camp first.");
}

// ---------------------------------------------------------------------------------------------------------------------
function g5Update(dt, r) {
  const d = david;
  for (const p of g5.people) p.t += dt;
  if (g5.pose) g5.pose.t += dt;
  const free = !region.script.length && region.wait <= 0 && !region.trans;
  // (the men fed: the storeroom; Glen 11-19: but while Saul's in the cave, the bare cave: "Saul would have noticed")
  roomById("camp").far = g5Stage() >= 3 ? "engedi/camp_stocked/far" : "engedi/camp/far";
  roomById("camp").outR = g5SaulIn() ? ["inner", G5.INNER.IN] : ["hideout", 25];   // (Glen 11-19: while Saul's in the cave, right goes through the dark to the mouth he came into)
  // the pack: touching a provision picks it up (its room's run open, not already home)
  for (const f of g5.food) {
    f.t += dt;
    if (f.room !== r.id || g5Has(f.id) || g5.pack.includes(f.id) || g5.drops.some(o => o.id === f.id) || !g5Open(g5RunOf(f.room))) continue;
    if (Math.abs(d.x - f.x) < G5.PACK_REACH && d.y > f.y - 90 && d.y - d.h < f.y + 10 && d.deadT <= 0) {
      g5.pack.push(f.id); sfx("pickup", f.x, 0.6);
      const run = g5RunOf(f.room), got = g5RoomFood(run).filter(o => g5Has(o.id) || g5.pack.includes(o.id)).length, left = Math.max(0, g5Need(run) - got);
      const all = got >= g5RoomFood(run).length;
      toast(`David picks up ${G5_FOOD[f.kind][0]}. ${left ? left + " more for this load (" + roomById(run).name + ")." : all ? "That's all of it, the spare too: back to the camp!" : "That's enough for this load: back to the camp! (One more is out there, a spare.)"}`);
    }
  }
  // a hit: one provision falls out and bounces (a few seconds to grab it back); a death: the pack's gone, all back in place
  if (d.deadT > 0) { if (g5.pack.length || g5.drops.length) { g5.pack.length = 0; g5.drops.length = 0; g5Tell("lost" + Math.random(), "The pack is lost. Everything's back where David found it."); } }
  else if (g5.lastHearts != null && d.hearts < g5.lastHearts - 0.001 && g5.pack.length) {
    const id = g5.pack.splice(Math.floor(Math.random() * g5.pack.length), 1)[0];
    g5.drops.push({ id, x: d.x, y: d.y - 80, vx: (Math.random() < 0.5 ? -1 : 1) * 160, vy: -420, floor: Math.min(d.y, FOOT - 4), t: 0 });
    g5Tell("drop", "Something fell out of the pack! Grab it quick, before it's lost.");
  }
  g5.lastHearts = d.hearts;
  for (const o of g5.drops) {
    o.t += dt; o.vy += 1400 * dt; o.x += o.vx * dt; o.y += o.vy * dt; o.vx *= 0.98;
    if (o.y > o.floor) { o.y = o.floor; o.vy = -Math.abs(o.vy) * 0.35; if (Math.abs(o.vy) < 60) o.vy = 0; o.vx *= 0.6; }
    if (o.t > G5.DROP_AFTER && Math.abs(d.x - o.x) < G5.PACK_REACH && d.y > o.y - 90 && d.y - d.h < o.y + 10) { g5.pack.push(o.id); o.t = 99; sfx("pickup", o.x, 0.6); }
  }
  g5.drops = g5.drops.filter(o => o.t < G5.DROP_FOR);
  // the cave behind the falls (the pool): Up at its mouth and he goes in
  if (r.id === "pool" && free && !g5.cave && pressed("up") && d.onGround && Math.abs(d.x - g5CaveX()) < G5.CAVE.REACH) {
    g5.cave = { t: 0, x0: d.x, taken: false }; d.vx = 0; }
  if (g5.cave) g5CaveUpdate(dt);
  if (r.id === "hollow" && d.deadT <= 0 && d.y > G5.HOLLOW.WATER + G5.HOLLOW.DIE) {   // (the dark water under the cave: a death)
    for (let i = 0; i < 14; i++) bits.push({ x: d.x, y: G5.HOLLOW.WATER, vx: (Math.random() - 0.5) * 260, vy: -Math.random() * 320, life: 0.8, color: i % 2 ? "#9fc4d0" : "#3d6470" });
    d.hearts = 0.01; d.inv = 0; hurtDavid(d.x, "", true); }
  if (r.water && typeof r4Fish === "function") r4Fish(dt, r, g5.fish, !!g5.swim, G5.SWIM.FLOAT);
  // home: the pack set down by the pile
  if (r.id === "camp" && free && g5.pack.length && d.x < (r.c0 + G5.CAMP_REACH) * T) g5Deliver();
  // the way on is shut till the load before it is home
  const wall = (x, ok, say, dir = 1) => { if (!ok && (dir > 0 ? d.x > x : d.x < x)) { d.x = x; d.vx = 0; g5Tell("wall" + x, say); } };
  if (r.id === "spring") wall((r.c0 + r.w - 2) * T, g5Open("rocks"), "The men are waiting for water and food. Take it back to the camp first.");
  if (r.id === "rocks") wall((r.c0 + r.w - 2) * T, g5Open("wild"), "Take the honey and the eggs back to the men first.");
  if (r.id === "inner" && g5.saul && !g5.saul.outside) g5SaulUpdate(dt);
  if (r.id === "camp" && g5SaulIn() && g5.saul.step === "wait") g5Tell("goinner", "Saul has gone into the cave by the sheep pens. Go right, through the dark toward its mouth.");
}
function g5Deliver() {
  const d = david, before = g5Stage(), n = g5.pack.length;
  const ids = g5.pack.splice(0);
  for (const id of ids) regionAdd("taken", id);
  const after = g5Stage();
  for (const room of G5_RUNS) if (g5Done(room)) regionAdd("taken", "g5_load_" + room);
  d.vx = 0;
  const steps = [{ fn() { g5.pose = { hold: true, t: 0 }; } }];
  if (after > before) {
    const line = [["Abishai", "Water from the spring, and dates! The men will drink tonight."],
      ["Abishai", "Honey out of the rock! “I will satisfy you with honey out of the rock.” (Psalm 81:16)"],
      ["Abishai", "Salt and figs and almonds. That's enough for everyone. Well done."]][after - 1];
    steps.push({ say: line });
    if (after < 3) steps.push({ fn() { g5.pose = null; toast(`${["", "Next: the Rocks of the Wild Goats, past the Spring.", "Last: the Wilderness, past the Rocks."][after]} Saul's men are closer now: more of them search the way.`); } });
    else steps.push({ fn() { g5.pose = null; } }, { wait: 1.2 }, ...g5SaulComes());
  } else {
    const room = G5_RUNS.find(rm => !g5Done(rm)), left = g5Need(room) - g5Home(room);
    steps.push({ say: ["Abishai", `Thank you. ${n === 1 ? "That's one more." : "That helps."} There's more out there: ${left} still to find in ${roomById(room).name}.`] });
    steps.push({ fn() { g5.pose = null; } });
  }
  rPlay(steps);
}

// ---------------------------------------------------------------------------------------------------------------------
// the end (24:3-22): Saul walks into the cave, alone. Creep up behind him; the sword only cuts the corner of his robe
function g5SaulComes() {
  const c = roomById("inner").c0;
  return [
    { say: ["", "He came to the sheep pens by the way, where there was a cave; and Saul went in. Now David and his men were staying in the innermost parts of the cave. (1 Samuel 24:3)"] },
    { fn() { g5.saul = { x: (c + G5.SAUL_AT + 8) * T, to: (c + G5.SAUL_AT) * T, y: FOOT, alpha: 0, t: 0, facing: -1, mode: "walk", step: "wait" };
      toast("Saul has gone into the cave by the sheep pens. Go right, through the dark toward its mouth."); } },
  ];
}
// into the dark: the king comes in from the light and sits, his back to them
function g5SaulInner() {
  rPlay([{ wait: 0.6 },
    { fn() { g5.saul.step = "in"; }, wait: 2.4 },
    { say: ["David's men", "“Behold, the day of which the LORD said to you, ‘Behold, I will deliver your enemy into your hand, and you shall do to him as it shall seem good to you.’” (1 Samuel 24:4)"] },
    { fn() { g5.saul.step = "creep"; toast("Creep up behind Saul (hold Down). The sword (X) can only cut the corner of his robe."); } }]);
}
const g5SaulIn = () => !!(g5.saul && !g5.saul.outside);
function g5SaulUpdate(dt) {
  const s = g5.saul, d = david;
  if (s.step === "wait") return;
  s.t += dt;
  if (s.mode === "walk") {
    s.x += s.facing * G5.SAUL_WALK * dt;
    s.alpha = s.leaving ? Math.max(0, s.alpha - dt / 1.5) : Math.min(1, s.alpha + dt / 0.8);
    if (!s.leaving && s.x <= s.to) { s.x = s.to; s.mode = "sit"; s.t = 0; s.facing = 1; }   // (he sits facing the light, his back to the dark)
    if (s.leaving && s.alpha <= 0) { g5.saul = null; regionAdd("taken", "g5_cut"); toast("Follow Saul out of the cave: go right."); return; }
  }
  if (s.mode === "stand" && SPR.saul_stand && s.t > SPR.saul_stand.frames * SPR.saul_stand.ms / 1000) { s.mode = "walk"; s.t = 0; s.facing = 1; }
  if (s.step !== "creep" || region.script.length || region.wait > 0) return;
  // (Glen 11-19: creeping right he walked straight past Saul's back and got sent back) creeping in, he stops at Saul's
  //  back, in reach of the robe
  const stopAt = s.x - G5.CUT_REACH * 0.6;
  if (d.onGround && d.x > stopAt && d.x < s.x + 20) { d.x = stopAt; d.vx = 0; d.facing = 1; g5Tell("cutnow", "Right behind the king. X: cut the corner of his robe."); }
  // walking upright close by, or getting out in front of him: he stirs, and David slips back into the dark
  const loud = d.h !== LOW_H && Math.abs(d.vx) > 25 && s.x - d.x < G5.SAUL_HEAR;
  if (loud || d.x > s.x + 20) {
    rPlay([{ say: ["", "Saul stirs... David slips back into the dark. (Creep low: hold Down.)"] },
      { fn() { d.x = (roomById("inner").c0 + G5.INNER.IN) * T; d.facing = 1; d.vx = 0; snapCamera(); } }]);
    return;
  }
  if (pressed("b")) g5Tell("notking", "Not at the king.");
  if (pressed("x") && d.x < s.x && s.x - d.x < G5.CUT_REACH && d.facing > 0) g5CutRobe();
}
function g5CutRobe() {
  const s = g5.saul, d = david; s.step = "cut";
  const off = k => k * SCALE * (TUNE.SPRITE_SIZE.saul_robe_cut || 1);   // where David is in the two-shot, from Saul's head (sheet px)
  const len = (G5.SCENE_END - G5.SCENE_START) * G5.SCENE_MS / 1000;
  d.x = s.x - off(G5.SCENE_DAVID[0]); d.facing = 1; d.vx = 0;
  rPlay([
    { fn() { g5.pose = { hide: true, t: 0 }; s.mode = "scene"; s.t = 0; }, wait: len * 0.55 },
    { fn() { sfx("paper_rip", undefined, 0.5, 0.8); }, wait: len * 0.45 + 0.3 },
    { say: ["", "Then David arose and cut off the skirt of Saul’s robe secretly. Afterward, David’s heart struck him because he had cut off Saul’s skirt. (1 Samuel 24:4-5)"] },
    { fn() { g5.pose = null; s.mode = "sit"; s.t = 99; d.x = s.x - off(G5.SCENE_DAVID[1]); d.facing = -1; } },
    { say: ["David", "“The LORD forbid that I should do this thing to my lord, the LORD’s anointed, to stretch out my hand against him, since he is the LORD’s anointed.” (1 Samuel 24:6)"] },
    { say: ["", "So David checked his men with these words, and didn’t allow them to rise against Saul. Saul rose up out of the cave, and went on his way. (1 Samuel 24:7)"] },
    { fn() { s.leaving = true; s.mode = SPR.saul_stand ? "stand" : "walk"; s.t = 0; s.facing = 1; } },
  ]);
}
// out by the pens: David calls after the king (24:8-22)
function g5CallScene() {
  const d = david, c = roomById("pens").c0;
  regionAdd("taken", "g5_called");
  g5.saul = { x: (c + 22) * T, y: FOOT, alpha: 1, t: 0, facing: 1, mode: "walk", outside: true, step: "call" };
  d.vx = 0; d.facing = 1; if (d.x < (c + 8) * T) { d.x = (c + 8) * T; snapCamera(); }   // (Glen 11-19: he was almost off the screen's edge)
  const S = g5.saul, mode = m => ({ fn() { S.mode = m; S.t = 0; } });
  rPlay([{ wait: 0.8 },
    { say: ["David", "“My lord the king!” (1 Samuel 24:8)"] },
    { fn() { S.mode = "look"; S.t = 0; S.facing = -1; g5.pose = { hold: true, t: 0, name: "david_kneel_hold" }; } },
    { say: ["", "When Saul looked behind him, David bowed with his face to the earth, and showed respect. (1 Samuel 24:8)"] },
    { fn() { g5.pose = { hold: true, t: 0, name: "david_hold_robe" }; } },
    { say: ["David", "“Some urged me to kill you, but I spared you. I said, ‘I will not stretch out my hand against my lord, for he is the LORD’s anointed.’” (1 Samuel 24:10)"] },
    { say: ["David", "“Moreover, my father, behold, yes, see the skirt of your robe in my hand; for in that I cut off the skirt of your robe and didn’t kill you, know and see that there is neither evil nor disobedience in my hand.” (1 Samuel 24:11)"] },
    { say: ["David", "“May the LORD judge between me and you, and may the LORD avenge me of you; but my hand will not be on you.” (1 Samuel 24:12)"] },
    { say: ["Saul", "“Is that your voice, my son David?” (1 Samuel 24:16)"] },
    mode("weep"),
    { say: ["", "Saul lifted up his voice and wept. (1 Samuel 24:16)"] },
    { say: ["Saul", "“You are more righteous than I; for you have done good to me, whereas I have done evil to you.” (1 Samuel 24:17)"] },
    { say: ["Saul", "“Now, behold, I know that you will surely be king, and that the kingdom of Israel will be established in your hand.” (1 Samuel 24:20)"] },
    { fn() { g5.pose = null; S.mode = "walk"; S.t = 0; S.facing = 1; S.leaving = true; } },
    { say: ["", "David swore to Saul. Saul went home, but David and his men went up to the stronghold. (1 Samuel 24:22)"] },
    { fn() { regionAdd("taken", "g_exit_open"); jsceneOpen(true); } }]);
}

// ---------------------------------------------------------------------------------------------------------------------
function g5Hold(d, dt) {
  // (Glen 11-19: "David climbing into the rocks ... it can replace the walking with his back to us just for this cave")
  //  Up at the hidden mouth: his clip of crawling in, then into the camp
  const hr = region.room;
  if (hr && hr.id === "hideout" && !g5.crawl && !region.trans && d.onGround && d.deadT <= 0 && pressed("up") && Math.abs(d.x - (hr.c0 + G5.HIDEOUT.MOUTH) * T - T / 2) < PATH.REACH) {
    const v = g5Video("crawl_in"); if (v) { v.loop = false; try { v.currentTime = 0; } catch (e) {} }
    g5.crawl = { t: 0, clip: "crawl_in" }; d.vx = 0; return true;
  }
  if (g5.crawl) {   // his clips of coming out of the hidden mouth, and going back in
    const C = g5.crawl, K = G5.CRAWL, v = g5Video(C.clip), going = C.clip === "crawl_in"; d.vx = d.vy = 0; d.facing = 1;
    const ready = v && v.readyState >= 2 && v.videoWidth; C.w = (C.w || 0) + dt; if (ready) C.t += dt;   // (its time from when it's playing)
    if (!C.end && ((ready && (v.ended || v.currentTime > K.LEN - 0.1)) || C.t > K.LEN + 1 || (!ready && C.w > K.WAIT) || pressed("a"))) {
      C.end = C.t;
      if (going) { const n = roomById("camp"); regionGo((n.c0 + 55) * T, -1, () => { g5.crawl = null; region.cutIn = false; }); }
    }
    region.cutIn = !C.end || going;
    if (!going && C.end) { g5.crawl = null; region.cutIn = false; }   // (straight into play: his clip ends where he stands)
    return true;
  }
  // seen by Saul's men: a fade, then back where he came into the room. The pack is kept (Glen 11-18)
  if (g5.caughtT > 0) {
    const before = g5.caughtT, F = G5.SNEAK.CAUGHT_FADE; g5.caughtT -= dt;
    region.fade = Math.max(0, Math.min(1, g5.caughtT > F / 2 ? (F - g5.caughtT) * 2 / F : g5.caughtT * 2 / F));
    if (before > F / 2 && g5.caughtT <= F / 2) {
      d.h = STAND_H; d.x = g5.caughtTo; d.y = FOOT - 4; d.vx = d.vy = 0; d.facing = g5.caughtTo < (region.room.c0 + region.room.w / 2) * T ? 1 : -1; snapCamera();
      for (const g of g5.guards) { g.seen = 0; g.state = "walk"; g.t = 0; g.facing = g.f0; g.x = g.facing > 0 ? g.from : g.to; }
    }
    if (g5.caughtT <= 0) region.fade = 0;
    d.vx = 0; return true;
  }
  if (g5.pose && g5.pose.hold) { d.vx = 0; return false; }
  if (g5.cave) { d.vx = d.vy = 0; d.charging = false; return true; }   // (walking into the cave behind the falls)
  if (g5Swim(d, dt)) return true;
  if (g5.saul && g5.saul.outside && g5.saul.step === "call") { d.vx = 0; return false; }
  const r = region.room;
  if (r && !region.script.length) g5SneakUpdate(dt, r);
  if (r && r.id === "pens" && g5Has("g5_cut") && !g5Has("g5_called") && !region.script.length) g5CallScene();
  return false;
}
function g5FishAt(kind, c, k0, k1, dy, room = "pool") {
  const r = roomById(room), y = (r.water + G5.SWIM.FLOAT + GR * T) / 2 + dy;
  g5.fish.push({ room, kind, x: (c + (k0 + k1) / 2) * T, y, y0: y, x0: (c + k0) * T, x1: (c + k1) * T, dir: (k0 & 1) ? -1 : 1, t: k0 * 0.37, state: "swim", st: 0, turn: 0 });
}
const g5CaveX = () => (roomById("pool").c0 + G5.CAVE.AT) * T + T / 2;
const g5FallsX = () => (roomById("pool").c0 + G5.CAVE.FALLS) * T + T / 2;
function g5CaveUpdate(dt) {
  const C = g5.cave, K = G5.CAVE, d = david;
  if (dialog.t > 0) return;   // (reading the Truth: the walk out waits)
  C.t += dt;
  const walkEnd = K.TURN + K.WALK, inEnd = walkEnd + K.INSIDE;
  if (C.t > K.TURN && C.t <= walkEnd) d.x = C.x0 + (g5FallsX() - C.x0) * Math.min(1, (C.t - K.TURN) / K.WALK);   // (in under the falling water itself)
  if (C.t > walkEnd && !C.gone) {   // (Glen 11-19: on in, behind the falls, into the cave there)
    C.gone = true; const n = roomById("hollow");
    regionGo((n.c0 + n.w - 4) * T, -1, () => { g5.cave = null; david.y = FOOT; david.vy = 0; david.facing = -1; });
  }
  if (C.gone) C.t = Math.min(C.t, walkEnd + 0.01);
}
// ---- the pool: below the waterline he swims (as adullam.js's r4Hold, without its rock lids)
function g5Swim(d, dt) {
  const r = region.room, S = G5.SWIM;
  if (!r || !r.water || r !== roomAt(d.x) || d.deadT > 0 || region.trans) { g5.swim = null; return false; }
  const wy = r.water, top = wy + S.FLOAT;
  if (g5.leapT > 0) { g5.leapT -= dt;   // (the leap out is always a full one: letting go of A doesn't cut it short, Glen 11-18: up onto the rocks)
    if (g5.leapV != null) { g5.leapV += TUNE.GRAVITY * dt; if (g5.leapV < 0 && d.vy > g5.leapV + 40) d.vy = g5.leapV; }
    if (d.vy < 0) return false; }
  if (!g5.swim) {
    if (d.y < wy + 40 || d.onGround && d.y < wy + S.FLOAT) { g5.breath = Math.min(S.BREATH, g5.breath + dt * 4); return false; }
    g5.swim = { t: 0 }; d.vy = Math.min(d.vy, 120); setState("idle");
  }
  const sw = g5.swim, dir = (held("right") ? 1 : 0) - (held("left") ? 1 : 0), still = !(dir || held("up") || held("down") || pressed("a"));
  sw.t += dt * (still ? S.TREAD : 1); sw.tt = (sw.tt || 0) + dt;
  d.vx = dir * S.X; if (dir) d.facing = dir;
  d.vy += S.SINK * dt;
  if (pressed("a")) { if (d.y <= top + S.LEAP_NEAR) { g5.swim = null; g5.leapT = 0.5; d.vy = g5.leapV = -S.LEAP; d.onGround = false; setState("jump"); return false; } d.vy = -S.STROKE; }
  if (held("up")) d.vy -= S.PUSH * dt; if (held("down")) d.vy += S.PUSH * dt;
  d.vy = Math.max(-S.MAXV, Math.min(S.MAXV, d.vy));
  d.x = Math.max(r.c0 * T + 20, Math.min((r.c0 + r.w) * T - 20, d.x + d.vx * dt));
  d.y += d.vy * dt;
  if (d.y < top) { d.y = top; if (d.vy < 0) d.vy = 0; }
  if (d.y > GR * T) { d.y = GR * T; d.vy = 0; }
  if (!held("down") && d.vy >= 0 && d.y < top + S.FLOAT_NEAR) { d.vy = 0;   // (near the top he floats, still or swimming along it: Down to dive)
    d.y += (top - d.y) * Math.min(1, dt * 4); }
  sw.tread = still && d.y <= top + 8;
  d.onGround = d.y >= GR * T - 1; d.fallTop = null; d.shield = false; d.charging = false; d.throwT = -1; d.thrown = false; d.harp = false;   // (Glen 11-19: a sling throw going as he went in never ended under water, and held up his sword the whole swim)
  if (d.y <= top + 6) g5.breath = Math.min(S.BREATH, g5.breath + dt * 4);
  else { g5.breath -= dt; if (g5.breath <= 0) { g5.breath = S.AFTER; hurtDavid(d.x, "", true); toast("Out of breath! Swim up for air."); } }
  if (typeof updateSword === "function" && regionSword()) { updateSword(d, dt, false); if (typeof r4SwimEdge === "function") r4SwimEdge(d); }   // (Glen 11-19: his swipe in the water, as Adullam's)
  return true;
}
// ---- (Glen 11-19: "a couple in motion ... just stand and walk a little") ibex far off on the far picture's ledges: a few
//  steps, a stop, a turn. x0, x1, y: the ledge in the picture's own px (2160 x 720)
const G5_FAR_IBEX = { rocks: [{ x0: 50, x1: 290, y: 346 }, { x0: 1153, x1: 1342, y: 365 }, { x0: 740, x1: 880, y: 292 }], H: 40, SPEED: 14 };
function g5FarIbex(r, o, w, k, fy) {
  const L = G5_FAR_IBEX[r.id]; if (!L || !SPR.ibex_far) return;
  const now = performance.now() / 1000, dt = Math.min(0.1, now - (g5.farT || now)); g5.farT = now;
  g5.farIbex = g5.farIbex || {};
  const list = g5.farIbex[r.id] = g5.farIbex[r.id] || L.map((l, i) => ({ l, x: l.x0 + (l.x1 - l.x0) * (0.3 + 0.4 * i), f: i ? -1 : 1, stop: 1 + i * 2, t: 0 }));
  const sk = G5_FAR_IBEX.H / (SPR.ibex_far.h * SCALE * (TUNE.SPRITE_SIZE.ibex_far || 1));
  for (const b of list) {
    b.t += dt;
    if (b.stop > 0) { b.stop -= dt; if (b.stop <= 0 && Math.random() < 0.35) b.f = -b.f; }
    else { b.x += b.f * G5_FAR_IBEX.SPEED * dt;
      if (b.x < b.l.x0 || b.x > b.l.x1) { b.x = Math.max(b.l.x0, Math.min(b.l.x1, b.x)); b.f = -b.f; b.stop = 1.5 + Math.random() * 2; }
      else if (Math.random() < dt * 0.15) b.stop = 2 + Math.random() * 3; }
    const fr = b.stop > 0 ? 0 : frameOf("ibex_far", b.t);
    for (let x0 = o - w; x0 < W + w; x0 += w) { const sx = x0 + b.x * k; if (sx > -60 && sx < W + 60) drawSprite("ibex_far", fr, sx, fy + b.l.y * k, b.f, sk); }
  }
}
function g5Hidden() {
  const d = david, S = G5.SNEAK;
  return d.h === LOW_H && g5.hides.some(h => h.room === region.room.id && d.x > h.x0 - S.NEAR && d.x < h.x1 + S.NEAR && Math.abs(d.y - h.y) < 40);
}
function g5Sees(g) {
  const d = david, dx = d.x - g.x, S = G5.SNEAK;
  if (g.room !== region.room.id || d.deadT > 0 || g5.caughtT > 0 || Math.sign(dx) !== g.facing || Math.abs(d.y - g.y) > 110) return false;
  if (g.state === "turn" || g5Hidden()) return false;
  return Math.abs(dx) < (d.h === LOW_H ? S.SIGHT_LOW : S.SIGHT) * T;
}
function g5SneakUpdate(dt, r) {
  const S = G5.SNEAK, d = david;
  for (const g of g5.guards) {
    if (g.room !== r.id || !g5Active(g)) continue;
    g.t += dt;
    if (g.state === "walk") {
      g.x += g.facing * S.WALK * dt;
      const pit = region.holes.find(h => h.room === g.room && g.x > h.x0 - 30 && g.x < h.x1 + 30);   // (Glen 11-19: "he walks over the pit") a pit's edge: turn back there
      if (pit) { g.x = g.facing > 0 ? pit.x0 - 30 : pit.x1 + 30; g.state = "look"; g.t = 0; }
      else if ((g.facing > 0 && g.x >= g.to) || (g.facing < 0 && g.x <= g.from)) { g.x = Math.max(g.from, Math.min(g.to, g.x)); g.state = "look"; g.t = 0; }
    } else if (g.state === "look" && g.t > S.LOOK) { g.state = "turn"; g.t = 0; }
    else if (g.state === "turn" && g.t > S.TURN) { g.facing *= -1; g.state = "walk"; g.t = 0; }
    if (g5Sees(g)) {
      g.seen += dt;
      if (g.seen > S.SEEN_T) {
        g.seen = 0; g5.caughtTo = g5.entry[r.id] ?? (r.c0 + 4) * T; g5.caughtT = S.CAUGHT_FADE; d.vx = 0;
        toast(g5.pack.length ? "One of Saul's men saw David! Back to the way in. He still has his pack." : "One of Saul's men saw David! Back to the way in. Crouch behind a rock (hold Down) while one looks your way.");
        return;
      }
    } else g.seen = Math.max(0, g.seen - dt * 2);
  }
}
function g5StoneHits(s) {
  const r = region.room; if (!r) return false;
  for (const g of g5.guards) if (g.room === r.id && g5Active(g) && Math.abs(s.x - g.x) < 46 && s.y < g.y + 4 && s.y > g.y - 240) { g5Tell("nostrike", "David won't strike Saul's men. Hide from them instead."); return true; }
  const k = g5.saul; if (k && k.alpha > 0.5 && Math.abs(s.x - k.x) < 60 && s.y > k.y - 260 && s.y < k.y + 4) { g5Tell("notking", "Not at the king."); return true; }
  return false;
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
function g5DrawDavid(d, x, y) {
  if (g5.crawl) { const v = g5Video(g5.crawl.clip), on = v && v.readyState >= 2 && v.videoWidth;   // (he's in the clip, once it's playing)
    if (g5.crawl.clip === "crawl_in" ? on || g5.crawl.end : on && !g5.crawl.end) return true; }
  if (g5.pose && g5.pose.hide) return true;   // (in the two-shot with Saul)
  if (g5.cave) {   // his back to us, then into the dark behind the falls, smaller and fading; then out again
    const C = g5.cave, K = G5.CAVE, walkEnd = K.TURN + K.WALK, inEnd = walkEnd + K.INSIDE;
    if (C.t < K.TURN) { const n = SPR.david_back_turn ? "david_back_turn" : "david_turn_away"; if (SPR[n]) drawSprite(n, Math.min(SPR[n].frames - 1, Math.floor(C.t / K.TURN * SPR[n].frames)), x, y, d.facing); }
    else if (C.t < walkEnd) { const u = (C.t - K.TURN) / K.WALK; if (SPR.david_back_walk) drawSprite("david_back_walk", frameOf("david_back_walk", C.t), x, y - u * K.RISE, 1, 1 - u * K.SHRINK, 1 - u * 0.9); }
    else if (C.t > inEnd) { const u = Math.min(1, (C.t - inEnd) / K.OUT); drawSprite("david_idle", 0, x, y, -1, 1, u); }   // (back out of the dark)
    return true;
  }
  if (g5.swim) {   // (Glen's 11-19 clips: treading, the crawl along the top, the breaststroke under; the clips' own waterline on ours)
    const S = G5.SWIM, L = S.LOOK, wy = y - (d.y - region.room.water), up = d.y <= region.room.water + S.FLOAT + 8;
    const atTop = (n, wl) => drawSprite(n, frameOf(n, g5.swim.tt), x, wy + (SPR[n].ay - wl) * SCALE, d.facing);
    if (d.swordT >= 0 && SPR.david_swim_swipe) { const n = SPR.david_swim_swipe.frames; drawSprite("david_swim_swipe", Math.min(n - 1, Math.floor(d.swordT / W9.SWORD_TIME * n)), x, up ? wy + 60 : y - L.UNDER_Y, d.facing); return true; }   // (Glen 11-19: the sword swiped forward in the water)
    if (up && g5.swim.tread && SPR[L.TREAD]) { atTop(L.TREAD, L.TREAD_WL); return true; }
    if (up && SPR[L.SURF]) { atTop(L.SURF, L.SURF_WL); return true; }
    if (SPR[L.UNDER]) { drawSprite(L.UNDER, frameOf(L.UNDER, g5.swim.t), x, y - L.UNDER_Y, d.facing); return true; }
  }
  if (g5.swim && g5.swim.tread && SPR.david_tread) { drawSprite("david_tread", frameOf("david_tread", g5.swim.tt), x, y, d.facing); return true; }
  if (g5.swim && SPR.david_swim2) { drawSprite("david_swim2", frameOf("david_swim2", g5.swim.t), x, y - 50, d.facing, G5.SWIM.K); return true; }
  if (g5.pose && g5.pose.name && SPR[g5.pose.name]) { drawSprite(g5.pose.name, frameOf(g5.pose.name, g5.pose.t), x, y, d.facing); return true; }
  return false;
}
// (Glen's, 11-18: "here is an animated one") the pool moving: his clip, the green keyed out, the ends crossfaded so it loops
const G5_VIDS = {};
const g5PoolVideo = () => g5Video("pool");
// (Glen's clips, keyed to webm with alpha, looping, muted: pool = the whole pool; falls = just the falling water, 11-18)
function g5Video(name) {
  if (typeof document === "undefined") return null;
  if (!G5_VIDS[name]) {
    const v = G5_VIDS[name] = document.createElement("video");
    Object.assign(v, { muted: true, loop: true, playsInline: true, preload: "auto", src: `../assets/rooms/engedi/pool/${name}.webm?v=` + (window.BUILD || 0) });
  }
  const v = G5_VIDS[name];
  if (v.paused && !v._trying) { v._trying = true; const p = v.play(); if (p && p.catch) p.catch(() => {}).finally(() => { v._trying = false; }); else v._trying = false; }
  return v;
}
function g5DrawFoodAt(kind, x, y, a = 1, bob = 0) {
  const n = G5_FOOD[kind][1], im = kitImg(n), k = KIT[n]; if (!im || !k) return;
  const w = G5.ITEM_W * (kind === "salt" ? 0.7 : 1), h = w * k.h / k.w;
  ctx.save(); ctx.globalAlpha = a; ctx.drawImage(im, x - w / 2, y - h + bob, w, h); ctx.restore();
}
// (Glen 11-19: "the ibex goes behind the cave ... have him come in front") the back way's thorn-hidden cave, drawn behind
//  the props and the animals
function g5DrawBack(camX) {
  const r = region.room; if (!r) return;
  if (r.id === "inner" && typeof CAVE_BG !== "undefined") {   // (his #9-1 test cave: the cave's own three pictures, and its white rock teeth)
    const rel = camX - r.c0 * T, g = ctx.createLinearGradient(0, 0, 0, H); g.addColorStop(0, "#1c140d"); g.addColorStop(1, "#0b0705");
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    const far = CAVE_BG.far; if (far.naturalWidth) { const w = far.naturalWidth * H / far.naturalHeight; ctx.drawImage(far, -rel * 0.08 - 40, 0, w, H); }
    drawLayerRepeating(CAVE_BG.mid, rel, 0.35, H, H, true);
    drawLayerRepeating(CAVE_BG.near, rel, 0.65, GR * T + 40, 260, true);
    for (let k = 0, cc = r.c0 + 3; cc < r.c0 + r.w - 2; cc += 5 + (k * 7) % 4, k++) for (const [n, top] of [["stalactite", true], ["stalagmite", false]]) {
      if (!top && !(k % 2)) continue; const img = ITEM[n]; if (!img || !img.naturalWidth) continue;
      const h = top ? 60 + (k * 37) % 50 : 50 + (k * 23) % 40, w = img.naturalWidth * h / img.naturalHeight, x = cc * T + (top ? 10 : 50) - camX - w / 2;
      if (x < W && x + w > 0) ctx.drawImage(img, x, top ? 3 * T - 4 : GR * T + 4 - h, w, h); }
  }
  // (Glen 11-19: "the hornet goes behind the waterfall and hits me") the Spring's falls, behind the beasts
  if (r.id === "spring" && g5SpringFalls2(r)) {}   // (Glen 11-19: "the view to go into the pool": his moving falls)
  else if (r.id === "spring") { const im = roomImg("engedi/spring/falls_cave.png"), F = G5.SPRING_FALLS;
    if (im) { const x = g5.falls - F.FX * F.K - camX, y = FOOT + 6 - F.WATER * F.K, w = im.naturalWidth * F.K, h = im.naturalHeight * F.K;
      // (Glen 11-19: "the water doesn't move") the same spot cut from the pool's moving clip, in the picture's faded outline
      const v = g5PoolVideo(), oc = G5_FALLS_CUT;
      if (v && v.readyState >= 2 && !v.paused && oc && v.videoWidth) {
        const iw = im.naturalWidth, ih = im.naturalHeight, sx = v.videoWidth / 3600, sy = v.videoHeight / 722, o = oc.getContext("2d");
        if (oc.width !== iw || oc.height !== ih) { oc.width = iw; oc.height = ih; }
        o.globalCompositeOperation = "source-over"; o.clearRect(0, 0, iw, ih);
        o.drawImage(v, F.SRC_X * sx, 0, iw * sx, ih * sy, 0, 0, iw, ih);
        o.globalCompositeOperation = "destination-in"; o.drawImage(im, 0, 0);
        ctx.drawImage(oc, x, y, w, h);
      } else ctx.drawImage(im, x, y, w, h); } }
  if (r.id === "fork") { const F = G5.FORK;   // its two mouths: dark openings in the rock, the far end's light in each
    const now = performance.now() / 1000;
    for (const [k, rgb, fire] of [[F.SPRING, "200,230,170", false], [F.CAMP, "255,170,90", true]]) {
      const x = (r.c0 + k) * T + T / 2 - camX, y = FOOT; if (x < -F.MW || x > W + F.MW) continue;
      const flick = fire ? 0.08 * Math.sin(now * 7) + 0.05 * Math.sin(now * 13) : 0;
      // (the light far back in two of the wall picture's own arches: soft, low, clipped to the arch)
      const yb = y - 48; ctx.save(); ctx.beginPath(); ctx.moveTo(x - F.MW / 2, yb); ctx.lineTo(x - F.MW / 2, y - F.MH + F.MW / 2); ctx.arc(x, y - F.MH + F.MW / 2, F.MW / 2, Math.PI, 0); ctx.lineTo(x + F.MW / 2, yb); ctx.closePath(); ctx.clip();   // (down to the arch's own sill)
      ctx.globalCompositeOperation = "lighter";
      const g = ctx.createRadialGradient(x, y - 95, 4, x, y - 110, F.MH * 0.8);
      g.addColorStop(0, `rgba(${rgb},${0.42 + flick})`); g.addColorStop(0.4, `rgba(${rgb},0.12)`); g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g; ctx.fillRect(x - F.MW, y - F.MH, F.MW * 2, F.MH); ctx.restore();
      const gl = ctx.createRadialGradient(x, y - 20, 10, x, y - 20, F.MW * 1.3);   // (its light spilling onto the floor)
      gl.addColorStop(0, `rgba(${rgb},0.16)`); gl.addColorStop(1, `rgba(${rgb},0)`); ctx.fillStyle = gl; ctx.fillRect(x - F.MW * 1.3, y - F.MH, F.MW * 2.6, F.MH + 40);
    }
    return; }
  if (r.id !== "wild") return;
  const B = G5.BACK, im = roomImg(B.PIC);
  if (im) { const w = B.W * B.K, h = B.H * B.K; g5DrawFaded(G5_CRACK, im, (r.c0 + B.MOUTH) * T + T / 2 - B.MID * w - camX, FOOT + 4 - B.FLOOR * B.K, w, h, 0.14); }
}
function g5Draw(camX) {
  const r = region.room; if (!r) return;
  const now = performance.now() / 1000;
  // the pool: Glen's animated clip (keyed, looping: pool.webm), his still picture till it's playing
  if (r.id === "pool") {
    const v = g5PoolVideo();
    if (v && v.readyState >= 2 && !v.paused) ctx.drawImage(v, r.c0 * T - camX, 0, 3600, 722);   // (its 698 stretched a hair to the screen's foot: no ground under it)
    else { const im = roomImg("engedi/pool/pool.png"); if (im) ctx.drawImage(im, r.c0 * T - camX, 0, 3600, 720); }
  }
  // the falls and the cave behind them (Glen's, 11-18), down to the water's surface: the pool under it is the ground
  //  (Glen 11-19: the pool room's own falls and cave mouth, cut from its picture, a little bigger: its falls painted in)
  if (r.id === "hollow") {   // the dark water down in the pit, between the rock at its ends
    const L = G5.HOLLOW, x0 = (r.c0 + L.GROUND[0] + 1) * T - camX, x1 = (r.c0 + L.GROUND[1]) * T - camX, y = L.WATER - camY;
    const g = ctx.createLinearGradient(0, y, 0, y + 120); g.addColorStop(0, "rgba(40,78,92,0.95)"); g.addColorStop(1, "rgba(4,14,20,1)");
    ctx.save(); ctx.fillStyle = g; const F = 48;   // (its ends fade into the rock, not a square edge)
    ctx.fillRect(x0 + F, y, x1 - x0 - 2 * F, H - y + 200);
    for (let i = 0; i < F; i += 4) { ctx.globalAlpha = (i + 2) / F; ctx.fillRect(x0 + i, y + (F - i) * 0.15, 4, H - y + 200); ctx.fillRect(x1 - i - 4, y + (F - i) * 0.15, 4, H - y + 200); }
    ctx.restore(); g5WaterTop(x0 + F / 2, x1 - F / 2, y, now, camX, 0.25); }
  if (r.id === "hideout") { const im = roomImg("engedi/hideout/mouth.png"), K = G5.HIDEOUT;
    if (im) ctx.drawImage(im, r.c0 * T - camX, FOOT + 4 - K.FLOOR * K.K, K.W * K.K, K.H * K.K); }
  if (r.id === "camp" && !g5.crawl) g5Video("crawl_out");   // (loading in the camp, ready for the way out)
  if (r.id === "hideout" && !g5.crawl) g5Video("crawl_in");   // (and at the mouth, ready for the way back in)
  if (r.id === "hideout") {   // (Glen 11-19: his clean picture of the mouth, at the size that makes David in his clips David's size;
    //  the clips play on it in place, his crawling in and out; its sides faded into the rocks behind)
    const M = G5.MOUTH_PIC, im = roomImg("engedi/hideout/mouth_small.png"), mx = (r.c0 + G5.HIDEOUT.MOUTH) * T + T / 2 - camX;
    const w = Math.round(M.W), h = Math.round(w * 9 / 16), x = mx - M.MID * w, y = FOOT + M.SINK - M.FEET * h;
    const C = g5.crawl, v = C && g5Video(C.clip), on = v && v.readyState >= 2 && v.videoWidth && !(C.end && C.clip === "crawl_out");
    const oc = G5_MOUTH; if (oc && (im || on)) {
      if (oc.width !== w || oc.height !== h) { oc.width = w; oc.height = h; }
      const o = oc.getContext("2d"); o.globalCompositeOperation = "source-over"; o.clearRect(0, 0, w, h);
      if (on) { const A = M.ALIGN[C.clip]; o.drawImage(v, A[1] * w, A[2] * h, w * A[0], h * A[0]); } else o.drawImage(im, 0, 0, w, h);
      const g = o.createLinearGradient(0, 0, w, 0), f = M.FADE; g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(f, "#000"); g.addColorStop(1 - f, "#000"); g.addColorStop(1, "rgba(0,0,0,0)");
      o.globalCompositeOperation = "destination-in"; o.fillStyle = g; o.fillRect(0, 0, w, h);
      ctx.drawImage(oc, Math.round(x), Math.round(y));
    }
    if (!g5.crawl && !region.script.length && Math.abs(david.x - camX - mx) < PATH.REACH && david.onGround) { upHint(mx, FOOT - 200); g5Tell("mouth", "The way back into the camp. Up to go in."); }
  }
  // the cliffs (Glen's tall picture, as much of it as the cliff is high, from its top shelf down)
  for (const k of g5.cliffs || []) {
    if (k.room !== r.id) continue; const im = kitImg("w4_e_cliff"); if (!im) break;
    const x = k.x - camX - 24, w = k.w + 48, s = w / im.naturalWidth, h = GR * T + 8 - k.top + 18;
    if (x > W || x + w < 0) continue;
    ctx.drawImage(im, 0, 0, im.naturalWidth, Math.min(im.naturalHeight, h / s), x, k.top - 18, w, Math.min(h, im.naturalHeight * s));
  }
  // the provisions, lying about (a soft glow so they read as something to take)
  for (const f of g5.food) {
    if (f.room !== r.id || g5Has(f.id) || g5.pack.includes(f.id) || g5.drops.some(o => o.id === f.id)) continue;
    const x = f.x - camX; if (x < -100 || x > W + 100) continue;
    const open = g5Open(g5RunOf(f.room)), bob = Math.sin(f.t * 2.4) * 3;
    if (open) { const g = ctx.createRadialGradient(x, f.y - 26, 4, x, f.y - 26, 60); g.addColorStop(0, "rgba(255,226,140,0.45)"); g.addColorStop(1, "rgba(255,226,140,0)"); ctx.fillStyle = g; ctx.fillRect(x - 60, f.y - 90, 120, 100); }
    g5DrawFoodAt(f.kind, x, f.y + 4, open ? 1 : 0.55, bob);
  }
  // the pile at the camp: everything brought home, heaped by the fire
  if (r.id === "camp") {
    const home = g5.food.filter(f => g5Has(f.id));
    home.forEach((f, i) => { const col = i % 6, row = Math.floor(i / 6); g5DrawFoodAt(f.kind, g5.pileX - 150 + col * 58 + row * 22 - camX, FOOT + 2 - row * 34, 1); });
  }
  // the flock in the pens
  if (r.id === "pens" && g5.flock) for (const [n, x, f] of g5.flock) if (SPR[n]) drawSprite(n, frameOf(n, now + x * 0.001), x - camX, FOOT, f, G5.SHEEP_K);
}
function g5DrawSaul(s, camX) {
  const x = s.x - camX;
  if (s.mode === "scene" && SPR.saul_robe_cut) {   // Glen's two-shot, turned round: the cave mouth is on the right here
    drawSprite("saul_robe_cut", Math.min(G5.SCENE_END, G5.SCENE_START + frameOf("saul_robe_cut", s.t, G5.SCENE_MS)), x, s.y, -1, 1, s.alpha); return;
  }
  const n = { sit: "saul_sit", stand: "saul_stand", walk: "saul_walk", look: "saul_look_back", weep: "saul_weep" }[s.mode] || "saul_sit";
  if (SPR[n]) drawSprite(n, frameOf(n, s.t), x, s.y, s.facing, 1, s.alpha);
}
function g5DrawFront(camX) {
  const r = region.room; if (!r) return;
  // the people
  for (const p of g5.people) {
    if (p.room !== r.id || (p.show && !p.show())) continue;
    const x = p.x - camX; if (x < -300 || x > W + 300) continue;
    const n = typeof p.spr === "function" ? p.spr() : p.spr;   // (Glen's sitting man: hungry, then eating, 11-18)
    if (SPR[n]) drawSprite(n, frameOf(n, p.t), x, p.y, p.dir, p.k, 1, "");
  }
  for (const g of g5.guards) if (g.room === r.id && g5Active(g) && typeof z5DrawMan === "function") z5DrawMan(g, camX);
  const s = g5.saul;
  if (s && s.step !== "wait" && (s.outside ? r.id === "pens" : r.id === "inner")) {
    if (s.outside) { s.t += 1 / 60; if (s.mode === "walk") { s.x += s.facing * G5.SAUL_WALK / 60; if (s.leaving) s.alpha = Math.max(0, s.alpha - 1 / 120); } }
    g5DrawSaul(s, camX);
  }
  // the falls (the Spring), in front of David: the Truth is behind the water (Glen's sheet hangs from its top)
  //  (moving water over Glen's painted falls)
  //  (Glen 11-19: none now: the Spring's falls picture has its own water)
  // the pools (Glen's), over their pits, in front of him: in the water, not behind it
  // (Glen 11-18: not his pool piece, its painted bottom looked goofy over a pit) just water, filling the pit to the brim and
  //  on down, out of sight: a bright surface, deeper and darker below
  for (const o of g5.pools || []) if (o.room === r.id) {
    const x = o.x0 - camX, w = o.x1 - o.x0, y = GR * T + 10 - camY; if (x > W || x + w < 0) continue;
    const g = ctx.createLinearGradient(0, y, 0, y + 220); g.addColorStop(0, "rgba(70,170,180,0.96)"); g.addColorStop(0.35, "rgba(30,105,120,0.98)"); g.addColorStop(1, "rgba(8,34,46,1)");
    ctx.fillStyle = g; ctx.fillRect(x, y, w, H - y + 400);
    g5WaterTop(x, x + w, y + 2, performance.now() / 1000, camX, 0.6); }   // (Glen 11-19: the surface one soft line, not dashes)
  // the cave behind the falls: an Up arrow at its mouth; while he goes in, the falling water in front of him
  if (r.id === "pool") {
    g5Video("falls");   // (loaded and running while he's in the pool room, ready for the cave)
    if (!g5.cave && !region.script.length && Math.abs(david.x - g5CaveX()) < G5.CAVE.REACH && david.y < r.water) {   // (Glen 11-18: lost in the white water: over the dark of the mouth, left of the falls, ringed dark)
      const ax = (r.c0 + 91) * T - camX, ay = G5.POOL_LEDGE - 60;
      ctx.save(); ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.beginPath(); ctx.roundRect(ax - 27, ay - 29 + Math.sin(performance.now() / 180) * 4, 54, 44, 13); ctx.fill(); ctx.restore();
      upHint(ax, ay); }
    if (g5.cave) { const C = g5.cave, K = G5.CAVE, end = K.TURN + K.WALK + K.INSIDE + K.OUT, fade = Math.min(1, C.t / K.TURN, (end - C.t) / K.OUT);
      g5FallsOver((r.c0 + G5.CAVE.FALLS) * T + T / 2 - camX, r.water + 8, G5.CAVE.WATER_H, Math.max(0, fade)); }
  }
  if (r.water && typeof r4DrawFish === "function") r4DrawFish(camX, g5.fish);
  // dropped provisions, bouncing, flashing as their time runs out
  for (const o of g5.drops) { const f = g5.food.find(q => q.id === o.id); if (!f) continue;
    const a = o.t > G5.DROP_FOR - 1.2 ? 0.4 + 0.6 * Math.abs(Math.sin(o.t * 12)) : 1; g5DrawFoodAt(f.kind, o.x - camX, o.y + 4, a); }
}
// David 1's waterfall (just the water), shrunk: a band round the falling sheet, its sides and foot faded out soft (Glen
//  11-18: the hard box cut round it showed an edge), laid over him with "screen" so only the white water shows
const G5_WF = typeof document !== "undefined" ? document.createElement("canvas") : null;
function g5FallsOver(x, bottom, want, alpha) {
  const v = g5Video("falls");   // Glen's clip of just the falling water (falls.webm), when it's playing
  if (v && v.readyState >= 2 && v.videoWidth) {
    const w = want * v.videoWidth / v.videoHeight;
    ctx.save(); ctx.globalAlpha = alpha * 0.95; ctx.drawImage(v, Math.round(x - w / 2), Math.round(bottom - want), w, want); ctx.restore(); return; }
  const s = SPR.waterfall; if (!s || !G5_WF || !s.img.complete || !s.img.naturalWidth) return;
  const sc = want / s.h, x0 = s.ax - 75, bw = 150, w = Math.ceil(bw * sc), h = Math.ceil(want), c = G5_WF;
  if (c.width !== w || c.height !== h) { c.width = w; c.height = h; }
  const cx = c.getContext("2d"), i = frameOf("waterfall", performance.now() / 1000);
  cx.globalCompositeOperation = "source-over"; cx.clearRect(0, 0, w, h);
  cx.drawImage(s.img, i * s.w + x0, 0, bw, s.h, 0, 0, w, h);
  cx.globalCompositeOperation = "destination-in";
  const gx = cx.createLinearGradient(0, 0, w, 0);
  gx.addColorStop(0, "rgba(0,0,0,0)"); gx.addColorStop(0.32, "#000"); gx.addColorStop(0.68, "#000"); gx.addColorStop(1, "rgba(0,0,0,0)");
  cx.fillStyle = gx; cx.fillRect(0, 0, w, h);
  const gy = cx.createLinearGradient(0, 0, 0, h);
  gy.addColorStop(0, "rgba(0,0,0,0)"); gy.addColorStop(0.12, "#000"); gy.addColorStop(0.85, "#000"); gy.addColorStop(1, "rgba(0,0,0,0)");
  cx.fillStyle = gy; cx.fillRect(0, 0, w, h);
  ctx.save(); ctx.globalCompositeOperation = "screen"; ctx.globalAlpha = alpha;
  ctx.drawImage(c, Math.round(x - (s.ax - x0) * sc), Math.round(bottom - want)); ctx.restore();
}
// Glen's falls among mossy rocks (11-19, keyed, steadied and looped: falls2.webm), at the Spring where he goes into the pool
function g5SpringFalls2(r) {
  const F = G5.SPRING_FALLS2, v = g5Video(F.CLIP), still = roomImg("engedi/spring/" + F.CLIP + "_still.png");
  const playing = v && v.readyState >= 2 && !v.paused && v.videoWidth, src = playing ? v : still; if (!src) return false;
  const w = F.W * F.K, h = F.H * F.K, x = g5.falls - F.FX * F.K - camX, y = FOOT - F.UP - F.BASE * F.K;
  ctx.drawImage(src, x, y, w, h); return true;
}
const G5_FALLS_CUT = typeof document !== "undefined" ? document.createElement("canvas") : null;
// a picture with its left and right sides faded out (fade: part of its width), through canvas oc
function g5DrawFaded(oc, src, x, y, w, h, fade) {
  if (!oc) return; w = Math.round(w); h = Math.round(h);
  if (oc.width !== w || oc.height !== h) { oc.width = w; oc.height = h; }
  const o = oc.getContext("2d"); o.globalCompositeOperation = "source-over"; o.clearRect(0, 0, w, h); o.drawImage(src, 0, 0, w, h);
  const g = o.createLinearGradient(0, 0, w, 0); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(fade, "#000"); g.addColorStop(1 - fade, "#000"); g.addColorStop(1, "rgba(0,0,0,0)");
  o.globalCompositeOperation = "destination-in"; o.fillStyle = g; o.fillRect(0, 0, w, h);
  ctx.drawImage(oc, Math.round(x), Math.round(y));
}
const G5_CRACK = typeof document !== "undefined" ? document.createElement("canvas") : null;
const G5_MOUTH = typeof document !== "undefined" ? document.createElement("canvas") : null;
const G5_WATER = typeof document !== "undefined" ? document.createElement("canvas") : null;
const G5_DARK = typeof document !== "undefined" ? document.createElement("canvas") : null;
// (Glen 11-19: "a dotted line for the water line. It looks weird") the surface of drawn water: one soft, slowly rolling
//  line of light with a faint glow under it, not a row of dashes
function g5WaterTop(x0, x1, y, t, camX, a) {
  const wave = x => y + Math.sin(t * 1.6 + (x + camX) * 0.018) * 1.6 + Math.sin(t * 2.3 + (x + camX) * 0.041) * 0.8;
  ctx.save();
  const g = ctx.createLinearGradient(0, y - 2, 0, y + 14); g.addColorStop(0, `rgba(190,230,235,${a * 0.5})`); g.addColorStop(1, "rgba(190,230,235,0)");
  ctx.fillStyle = g; ctx.fillRect(x0, y - 2, x1 - x0, 16);
  ctx.strokeStyle = `rgba(215,242,245,${a})`; ctx.lineWidth = 1.5; ctx.beginPath();
  for (let x = x0; x <= x1; x += 8) { const yy = wave(x); if (x === x0) ctx.moveTo(x, yy); else ctx.lineTo(x, yy); }
  ctx.stroke(); ctx.restore();
}
function g5DrawOver() {
  const r = region.room; if (!r) return;
  // in the pool: the water over him (a light tint below the surface), and his breath over his head
  if (r.water) {
    const v = r.id === "pool" ? g5PoolVideo() : null, O = G5.WATER_OVER;
    if (r.id !== "pool") {   // (the flooded cave: no picture of its water, so its water drawn: dark green-blue, a glint along the top)
      const y0 = r.water - camY + 6, g = ctx.createLinearGradient(0, y0, 0, H);
      g.addColorStop(0, "rgba(40,110,120,0.5)"); g.addColorStop(1, "rgba(6,30,38,0.8)");
      ctx.save(); ctx.fillStyle = g; ctx.fillRect(0, y0, W, H); ctx.restore();
      g5WaterTop(0, W, y0, performance.now() / 1000, camX, 0.35);
    } else
    if (v && v.readyState >= 2 && !v.paused && G5_WATER) {   // (Glen 11-19: the pool's own clip again, over him, see-through: anything in it looks in it)
      const y0 = r.water - camY + O.TOP, oc = G5_WATER, o = oc.getContext("2d");
      if (oc.width !== W || oc.height !== H) { oc.width = W; oc.height = H; }
      o.globalCompositeOperation = "source-over"; o.clearRect(0, 0, W, H);
      o.drawImage(v, r.c0 * T - camX, 0, 3600, 722);
      const g = o.createLinearGradient(0, y0, 0, y0 + O.FADE); g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(1, "rgba(0,0,0,1)");
      o.globalCompositeOperation = "destination-in"; o.fillStyle = g; o.fillRect(0, 0, W, H);
      ctx.save(); ctx.globalAlpha = O.A; ctx.drawImage(oc, 0, 0); ctx.restore();
    } else { const y0 = r.water - camY, g = ctx.createLinearGradient(0, y0, 0, y0 + 70);   // (Glen 11-18: the tint's hard top edge was a line across him at the surface: faded in)
      g.addColorStop(0, "rgba(40,150,175,0)"); g.addColorStop(1, "rgba(40,150,175,0.22)");
      ctx.save(); ctx.fillStyle = g; ctx.fillRect(0, y0, W, H); ctx.restore(); }
    // his air, only while it's running down (Glen 11-18: shown full at the surface it read as a stray blue line)
    if (g5.breath < G5.SWIM.BREATH - 0.05) { const k = Math.max(0, g5.breath / G5.SWIM.BREATH), x = david.x - camX - 40, y = david.y - 150 - camY;
      ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(x - 2, y - 2, 84, 12); ctx.fillStyle = k > 0.3 ? "#7fd8ff" : "#ff6a5a"; ctx.fillRect(x, y, 80 * k, 8);
      ctx.save(); ctx.textAlign = "right"; hudText("Air", x - 6, y + 9, 14); ctx.restore(); }
  }
  // the dark of the cave while Saul's in it: a little light on David and on the king
  if (r.id === "inner" && G5_DARK) {   // (Glen 11-19: "super dark like a real cave", as his #9-1 test cave)
    // (soft lights cut out of a dark layer, drawn on its own canvas so two lights that overlap add up, not cancel)
    const I = G5.INNER, s = g5.saul, L = [[david.x - camX, david.y - I.LIT[0][1] - camY, I.LIT[0][0]], [(r.c0 + r.w) * T - camX, FOOT - 70 - camY, I.GLOW]];   // (the mouth Saul came in by: its daylight)
    if (s && s.step !== "wait" && s.alpha > 0) L.push([s.x - camX, s.y - I.LIT[1][1] - camY, I.LIT[1][0] * s.alpha]);
    const c = G5_DARK; if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
    const x2 = c.getContext("2d"); x2.globalCompositeOperation = "source-over"; x2.clearRect(0, 0, W, H);
    x2.fillStyle = `rgba(4,3,2,${G5.INNER.DARK})`; x2.fillRect(0, 0, W, H); x2.globalCompositeOperation = "destination-out";
    for (const [x, y, rr] of L) { const g = x2.createRadialGradient(x, y, rr * 0.25, x, y, rr); g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(1, "rgba(0,0,0,0)"); x2.fillStyle = g; x2.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
    ctx.drawImage(c, 0, 0);
  }
  // the pack, and what's home
  if (!g5Has("g5_load_wild") || g5.pack.length) {
    const room = G5_RUNS.find(rm => !g5Done(rm)) || "wild", need = g5Need(room);
    const have = g5RoomFood(room).filter(f => g5Has(f.id) || g5.pack.includes(f.id)).length;
    // (bottom left: the top is the controls and the hearts)
    const line1 = `Pack: ${g5.pack.length}    ${roomById(room).name}: ${Math.min(have, need)} / ${need}${have > need ? " +" + (have - need) : ""}`;
    ctx.save(); ctx.font = "bold 16px Georgia, serif";   // (Glen 11-19: the box as wide as its words)
    const home = g5.food.filter(f => g5Has(f.id)).length, line2 = `Food home at the camp: ${home} / ${G5_RUNS.reduce((a, rm) => a + g5Need(rm), 0)}  (a spare in each load)`;
    const w1 = ctx.measureText(line1).width; ctx.font = "14px Georgia, serif"; const w2 = ctx.measureText(line2).width; ctx.font = "bold 16px Georgia, serif";
    const bx = 16, by = H - 92, bw = Math.max(340, Math.ceil(Math.max(w1, w2)) + 36);
    ctx.fillStyle = "rgba(20,12,6,0.72)"; ctx.fillRect(bx, by, bw, 58);
    ctx.strokeStyle = "#ffe08a"; ctx.lineWidth = 1.5; ctx.strokeRect(bx, by, bw, 58);
    ctx.fillStyle = "#ffe08a"; ctx.font = "bold 16px Georgia, serif"; ctx.textAlign = "center";
    ctx.fillText(line1, bx + bw / 2, by + 23);
    ctx.font = "14px Georgia, serif"; ctx.fillStyle = "#f3e6c8";
    ctx.fillText(line2, bx + bw / 2, by + 45);
    ctx.restore();
  }
}
