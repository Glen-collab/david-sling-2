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
  DROP_FOR: 3.5,           // s a dropped provision waits to be picked back up (then it's back where it was found)
  DROP_AFTER: 0.5,         // s before a dropped one can be picked up again (not straight back into the pack)
  ITEM_W: 74,              // px wide, a provision lying about (stand-in kit pieces)
  CAMP_REACH: 34,          // cols into the camp: walking back past here sets the pack down by the pile
  // Saul's men (as ziph.js's hills: walk, stop and look, turn); the more loads home, the more of them
  SNEAK: { WALK: 62, LOOK: 2.0, TURN: 0.45, SIGHT: 8, SIGHT_LOW: 2.2, SEEN_T: 0.6, NEAR: 30, CAUGHT_FADE: 1.4 },
  // the cave, at the end: walking upright this close to Saul (px) and he stirs; the sword reaches his robe from this close
  SAUL_HEAR: 7 * 36, CUT_REACH: 95, SAUL_AT: 48, SAUL_WALK: 80,
  // Glen's robe-cut two-shot (saul_robe_cut): as engedi.js's #9-1
  SCENE_MS: 160, SCENE_START: 6, SCENE_END: 20, SCENE_DAVID: [198, 196],
  NPC_K: 0.9,
  // the pool (as adullam.js's swimming, Glen's own swim sheets): sideways speed, a stroke (A), Up/Down, sinking, the most
  //  speed, how far under the surface his head is, the leap out (A at the surface), breath (s), and after running out
  SWIM: { X: 170, STROKE: 230, PUSH: 420, SINK: 160, MAXV: 260, FLOAT: 70, LEAP: 1050, LEAP_NEAR: 30, BREATH: 10, AFTER: 3, TREAD: 0.35, FLOAT_NEAR: 60, K: 0.5 },
  POOL_BANK: 330, POOL_LEDGE: 352,
  // (Glen 11-18: "have David go into the cave for the truth ... an up arrow and have him disappear behind the falls") the
  //  cave mouth (column in the pool room), how near for Up; his turn, his walk in (s), inside, and back out
  CAVE: { AT: 96, FALLS: 94.2, REACH: 190, TURN: 0.5, WALK: 1.0, INSIDE: 0.7, OUT: 0.7, RISE: 40, SHRINK: 0.35 },   // px: the bank he comes in on (left), the rocks at the cave mouth (right)
  PALM_TOP: 270,           // px: the crown of a date palm, where David stands among the dates
  FALLS_K: 1.6,            // the waterfall's size
  SHEEP_K: 2.2,            // the flock in the pens
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
    { id: "camp", name: "The Camp in the Cave", w: 60, cave: true, mx: 0, my: 1, mw: 2, right: "pens",
      far: "engedi/camp/far", near: "engedi/camp/near.png" },
    { id: "pens", name: "The Sheep Pens by the Way", w: 110, bg: "w4_1", mx: 2, my: 1, mw: 3, left: "camp", right: "spring",
      far: "engedi/pens/far", mid: "engedi/pens/mid.png", midY: 0, near: "engedi/pens/near.png" },   // (Glen's, 11-18)
    { id: "spring", name: "The Spring", w: 130, bg: "w4_1", mx: 5, my: 1, mw: 4, left: "pens", right: "rocks",
      far: "engedi/spring/far", mid: "engedi/spring/mid.png", midY: 0 },   // (Glen's, 11-18: the oasis; palm fronds hanging over, the pool's edge)
    // (Glen's, 11-18: "the falls piece a whole mid ground and foreground room for the swimming part and the cave mouth")
    //  his long pool, the falls and the cave at its far end; Up at the Spring's falls, swim across, out at the cave
    { id: "pool", name: "The Pool Below the Falls", w: 100, bg: "w4_1", mx: 6, my: 2, mw: 3, outL: ["spring", 58], water: 361,
      far: "engedi/spring/far" },
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
  drawDavid: (d, x, y) => g5DrawDavid(d, x, y), draw: camX => g5Draw(camX), drawFront: camX => g5DrawFront(camX),
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
const g5Done = room => g5RoomFood(room).every(f => g5Has(f.id));
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
  for (const n of ["engedi/camp/far", "engedi/camp/near.png", "engedi/camp_stocked/far", "engedi/pool/pool.png"]) roomImg(n);
  g5.swim = null; g5.breath = G5.SWIM.BREATH;
  for (const k of ["people", "guards", "hides", "food", "pack", "drops"]) g5[k].length = 0;
  g5.saul = null; g5.pose = null; g5.cave = null; g5.caughtT = 0; g5.entry = {}; g5.lastHearts = null;
  ["w4_z_hide_rock", "w4_rubble_sand", "w4_tree_acacia", "w4_tree_dead", "w4_tree_oak", ...Object.values(G5_FOOD).map(f => f[1])].forEach(kitImg);

  // -- The Camp in the Cave (24:3: "David and his men were staying in the innermost parts of the cave")
  let c = R("camp");
  { const rm = "camp", X = k => (c + k) * T;
    ground(c, c + 59);
    g5.men = [g5Person(rm, "soldier_sit", X(5), 1), g5Person(rm, "soldier_talk", X(9), 1), g5Person(rm, "abishai_idle", X(14), 1),
      g5Person(rm, "soldier_sit", X(19), -1), g5Person(rm, "soldier_talk", X(23), -1)];
    g5.abishai = g5.men[2];
    g5.pileX = X(28);
    campfire(c + 36, GR - 1);
    g5.entry.camp = X(54);
  }

  // -- The Sheep Pens by the Way (24:3): stone pens on the road, and Saul's men, more of them every run
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
    rWild("viper", rm, c + 30); rWild("hornet", rm, c + 70, { y: 380, hy: 380 }); rHyrax(rm, c + 118);
    g5Hide(rm, "w4_z_hide_rock", X(22)); g5Hide(rm, "w4_rubble_sand", X(50)); g5Hide(rm, "w4_z_hide_rock", X(72)); g5Hide(rm, "w4_z_hide_rock", X(100)); g5Hide(rm, "w4_rubble_sand", X(116));
    g5Guard(rm, 24, 38, 0); g5Guard(rm, 96, 110, 0, FOOT, -1); g5Guard(rm, 48, 56, 1); g5Guard(rm, 70, 80, 2, FOOT, -1);
    g5.entry.spring = X(4);
    rPath(rm, c + 58, "pool", 2, "The pool goes on behind the falls. Up to go and see.");
  }

  // -- The Pool Below the Falls (Glen's): in off the bank, swim the pool (a water skin on the bottom), out onto the rocks at
  //  the cave mouth behind the falls: the Truth inside
  c = R("pool");
  { const rm = "pool", X = k => (c + k) * T;
    ground(c, c + 99);
    rLedge(rm, c, G5.POOL_BANK, 4);
    rLedge(rm, c + 87, G5.POOL_LEDGE, 13);
    g5Food(rm, "water", 52, GR * T - 4);   // (the Spring's third skin, down on the bottom)
    rRelic("g5_truth_falls", "truth", c + G5.CAVE.AT, onTop(G5.POOL_LEDGE), "A poem by David, when he fled from Saul, in the cave. Be merciful to me, God, be merciful to me, for my soul takes refuge in you. (Psalm 57, heading and verse 1)", "g5_never");   // (inside the cave: found by going in, never lying out on the rocks)
    rRelic("g5_pom_pool", "pomegranate", c + 30, GR - 1);
    g5.entry.pool = X(2);
  }

  // -- The Rocks of the Wild Goats (24:2): tall. The ibex go straight up the rock; David learns the wall climb from them
  c = R("rocks");
  { const rm = "rocks", X = k => (c + k) * T;
    ground(c, c + 63);
    campfire(c + 3, GR - 1); campfire(c + 60, GR - 1);
    // the first cliff: climb either face (Up at it), its top a shelf
    const cliff = (k, w, topRow) => { rock(c + k, topRow, w, GR - topRow); platAt(c + k, topRow * T, w);
      for (let i = 0; i < w; i++) for (let r_ = topRow; r_ < GR; r_++) artSolid.add((c + k + i) + "," + r_);
      g5.cliffs.push({ room: rm, x: (c + k) * T, w: w * T, top: topRow * T });
      region.walls.push({ room: rm, x0: (c + k) * T, x1: (c + k + w) * T, top: topRow * T, need: "wallClimb" }); };
    cliff(14, 7, 6);
    rWild("ibex", rm, c + 17, { y: 6 * T, hy: 6 * T, range: 2 });
    // up from its top, ledge to ledge into the sky
    rLedge(rm, c + 22, 70, 4); g5Food(rm, "eggs", 23, 70 - 4);
    rLedge(rm, c + 27, -80, 4); rLedge(rm, c + 22, -230, 4); rLedge(rm, c + 28, -380, 4); g5Food(rm, "eggs", 29, -380 - 4);
    rLedge(rm, c + 32, -480, 3);
    // the high crag, sheer from the ground: honey in its top, the bees round it (its top on the room's first row: the
    //  engine's solid rock can't go higher than that; the sky ledges above are the way to the eggs)
    cliff(36, 8, 1);
    { const w = KIT.w4_e_hive; region.props.push({ room: rm, n: "w4_e_hive", x: X(40) + T / 2 - w.w / 2, y: T - w.h + 14 }); }
    g5Food(rm, "honey", 38, T - 4); g5Food(rm, "honey", 40, T - 4); g5Food(rm, "honey", 42, T - 4);
    rWild("hornet", rm, c + 40, { y: T - 120, hy: T - 120 });
    for (const k of [0, 1, 2]) rWild("bee", rm, c + 39 + k, { y: T - 34 - k * 14, ph: k * 1.6 });
    rRelic("g5_stone_crag", "stone", c + 43, 0);
    // past the crag: down on the ground again, the eggs on a shelf, an eagle
    rLedge(rm, c + 50, 470, 4); g5Food(rm, "eggs", 51, 470 - 4);
    bird("eagle", rm, X(55), 300);
    g5Hide(rm, "w4_z_hide_rock", X(26)); g5Hide(rm, "w4_rubble_sand", X(32)); g5Hide(rm, "w4_z_hide_rock", X(48)); g5Hide(rm, "w4_z_hide_rock", X(56));
    g5Guard(rm, 23, 34, 0); g5Guard(rm, 46, 58, 2, FOOT, -1);
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
  }
  // trees (Glen's, from Ziph), behind David
  const tree = (rm, n, k, sink = 10) => { const kk = KIT[n]; if (kk) region.props.push({ room: rm, n, x: (roomById(rm).c0 + k) * T - kk.w / 2, y: FOOT - kk.h + sink, back: true }); };
  tree("pens", "w4_tree_oak", 50); tree("wild", "w4_tree_acacia", 68); tree("wild", "w4_tree_acacia", 102); tree("wild", "w4_tree_dead", 30); tree("rocks", "w4_tree_dead", 8);
  g5Talk();
}
// Up by David's men: their next line, as the loads come in
function g5Talk() {
  const MEN = "One of David's men", st = () => g5Stage();
  const say = {
    0: () => st() === 0 ? [[MEN, "There's nothing left to eat in here. Not a crumb."]] : st() === 1 ? [[MEN, "Fresh water! I'd forgotten what it tastes like."]] : st() === 2 ? [[MEN, "Honey! Who climbs up there for honey? You do, apparently."]] : [[MEN, "Salt and figs. We'll eat like kings tonight. Well, like men hiding from one."]],
    1: () => st() === 0 ? [[MEN, "Saul has three thousand men out there, looking for us on the rocks of the wild goats (1 Samuel 24:2)."]] : [[MEN, "Every time you go out, there are more of Saul's men by the pens. Keep low."]],
    2: () => st() === 0 ? [["Abishai", "Six hundred men, and nothing to feed them. The Spring's past the sheep pens. Water there, and dates on the trees."]]
      : st() === 1 ? [["Abishai", "Next, the rocks where the wild goats live. Watch how they go up: they'll show you the way."]]
      : st() === 2 ? [["Abishai", "One more: the wilderness, down toward the Salt Sea. Salt, figs and almonds."]] : [["Abishai", "That's everything. Rest now. We stay deep in the cave, where no one can see us."]],
    3: () => [[MEN, "If Saul's men find this cave, we're trapped in here. So nobody follows you home."]],
    4: () => st() < 3 ? [[MEN, "Bring it all back here, by the fire. We'll share it out."]] : [[MEN, "Shh. Someone's at the cave mouth."]],
  };
  g5.men.forEach((p, i) => rTalker(p, () => say[i]()));
}
// (Glen's pool, 11-18) a pit with his pool drawn over it, in front of David: till swimming, falling in costs a heart
function g5Pool(rm, c, w) {
  const n0 = region.props.length; rHole(rm, c, w); region.props.splice(n0);   // (no pit rims: the pool's own walls)
  g5.pools.push({ room: rm, x: (c + w / 2) * T });
}
function rHyrax(rm, c, o = {}) { if (typeof WILD !== "undefined" && WILD.hyrax) rWild("hyrax", rm, c, o); }

// ---------------------------------------------------------------------------------------------------------------------
function g5Enter(r) {
  const d = david;
  // where he came in: being seen sends him back here (the pack kept)
  g5.entry[r.id] = d.x < (r.c0 + r.w / 2) * T ? (r.c0 + 4) * T : (r.c0 + r.w - 5) * T;
  if (r.id === "pool") { g5.entry.pool = (r.c0 + 2) * T; if (d.x < (r.c0 + 5) * T) { d.y = G5.POOL_BANK; d.vy = 0; snapCamera(); }
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
  roomById("camp").far = g5Stage() >= 3 ? "engedi/camp_stocked/far" : "engedi/camp/far";   // (the men fed: the storeroom)
  // the pack: touching a provision picks it up (its room's run open, not already home)
  for (const f of g5.food) {
    f.t += dt;
    if (f.room !== r.id || g5Has(f.id) || g5.pack.includes(f.id) || g5.drops.some(o => o.id === f.id) || !g5Open(g5RunOf(f.room))) continue;
    if (Math.abs(d.x - f.x) < G5.PACK_REACH && d.y > f.y - 90 && d.y - d.h < f.y + 10 && d.deadT <= 0) {
      g5.pack.push(f.id); sfx("pickup", f.x, 0.6);
      const run = g5RunOf(f.room), left = g5RoomFood(run).filter(o => !g5Has(o.id) && !g5.pack.includes(o.id)).length;
      toast(`David picks up ${G5_FOOD[f.kind][0]}. ${left ? left + " more for this load (" + roomById(run).name + ")." : "That's the whole load: back to the camp!"}`);
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
  if (r.id === "pool" && free && !g5.cave && pressed("up") && d.onGround && Math.abs(d.x - g5CaveX()) < G5.CAVE.REACH && !g5Has("g5_truth_falls")) {
    g5.cave = { t: 0, x0: d.x, taken: false }; d.vx = 0; }
  if (g5.cave) g5CaveUpdate(dt);
  // home: the pack set down by the pile
  if (r.id === "camp" && free && g5.pack.length && d.x < (r.c0 + G5.CAMP_REACH) * T) g5Deliver();
  // the way on is shut till the load before it is home
  const wall = (x, ok, say, dir = 1) => { if (!ok && (dir > 0 ? d.x > x : d.x < x)) { d.x = x; d.vx = 0; g5Tell("wall" + x, say); } };
  if (r.id === "spring") wall((r.c0 + r.w - 2) * T, g5Open("rocks"), "The men are waiting for water and food. Take it back to the camp first.");
  if (r.id === "rocks") wall((r.c0 + r.w - 2) * T, g5Open("wild"), "Take the honey and the eggs back to the men first.");
  if (r.id === "camp" && g5.saul) g5SaulUpdate(dt);
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
    const room = G5_RUNS.find(rm => !g5Done(rm)), left = g5RoomFood(room).filter(o => !g5Has(o.id)).length;
    steps.push({ say: ["Abishai", `Thank you. ${n === 1 ? "That's one more." : "That helps."} There's more out there: ${left} still to find in ${roomById(room).name}.`] });
    steps.push({ fn() { g5.pose = null; } });
  }
  rPlay(steps);
}

// ---------------------------------------------------------------------------------------------------------------------
// the end (24:3-22): Saul walks into the cave, alone. Creep up behind him; the sword only cuts the corner of his robe
function g5SaulComes() {
  const c = roomById("camp").c0;
  return [
    { say: ["", "He came to the sheep pens by the way, where there was a cave; and Saul went in. Now David and his men were staying in the innermost parts of the cave. (1 Samuel 24:3)"] },
    { fn() { g5.saul = { x: (c + G5.SAUL_AT + 8) * T, to: (c + G5.SAUL_AT) * T, y: FOOT, alpha: 0, t: 0, facing: -1, mode: "walk", step: "in" }; }, wait: 2.4 },
    { say: ["David's men", "“Behold, the day of which the LORD said to you, ‘Behold, I will deliver your enemy into your hand, and you shall do to him as it shall seem good to you.’” (1 Samuel 24:4)"] },
    { fn() { g5.saul.step = "creep"; toast("Creep up behind Saul (hold Down). The sword (X) can only cut the corner of his robe."); } },
  ];
}
function g5SaulUpdate(dt) {
  const s = g5.saul, d = david;
  s.t += dt;
  if (s.mode === "walk") {
    s.x += s.facing * G5.SAUL_WALK * dt;
    s.alpha = s.leaving ? Math.max(0, s.alpha - dt / 1.5) : Math.min(1, s.alpha + dt / 0.8);
    if (!s.leaving && s.x <= s.to) { s.x = s.to; s.mode = "sit"; s.t = 0; s.facing = 1; }   // (he sits facing the light, his back to the dark)
    if (s.leaving && s.alpha <= 0) { g5.saul = null; regionAdd("taken", "g5_cut"); toast("Follow Saul out of the cave: go right."); return; }
  }
  if (s.mode === "stand" && SPR.saul_stand && s.t > SPR.saul_stand.frames * SPR.saul_stand.ms / 1000) { s.mode = "walk"; s.t = 0; s.facing = 1; }
  if (s.step !== "creep" || region.script.length || region.wait > 0) return;
  // walking upright close by, or getting out in front of him: he stirs, and David slips back into the dark
  const loud = d.h !== LOW_H && Math.abs(d.vx) > 25 && s.x - d.x < G5.SAUL_HEAR;
  if (loud || d.x > s.x + 20) {
    rPlay([{ say: ["", "Saul stirs... David slips back into the dark. (Creep low: hold Down.)"] },
      { fn() { d.x = g5.pileX - 2 * T; d.facing = 1; d.vx = 0; snapCamera(); } }]);
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
  d.vx = 0; d.facing = 1;
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
const g5CaveX = () => (roomById("pool").c0 + G5.CAVE.AT) * T + T / 2;
function g5CaveUpdate(dt) {
  const C = g5.cave, K = G5.CAVE, d = david;
  if (dialog.t > 0) return;   // (reading the Truth: the walk out waits)
  C.t += dt;
  const walkEnd = K.TURN + K.WALK, inEnd = walkEnd + K.INSIDE;
  if (C.t > K.TURN && C.t <= walkEnd) d.x = C.x0 + (g5CaveX() - C.x0) * Math.min(1, (C.t - K.TURN) / K.WALK);
  if (C.t > walkEnd && !C.taken) {
    C.taken = true; const f = region.relics.find(o => o.id === "g5_truth_falls");
    if (f) takeRelic(f);
  }
  if (C.t > inEnd + K.OUT) { g5.cave = null; d.facing = -1; }
}
// ---- the pool: below the waterline he swims (as adullam.js's r4Hold, without its rock lids)
function g5Swim(d, dt) {
  const r = region.room, S = G5.SWIM;
  if (!r || !r.water || r !== roomAt(d.x) || d.deadT > 0 || region.trans) { g5.swim = null; return false; }
  const wy = r.water, top = wy + S.FLOAT;
  if (g5.leapT > 0) { g5.leapT -= dt; if (d.vy < 0) return false; }
  if (!g5.swim) {
    if (d.y < wy + 40 || d.onGround && d.y < wy + S.FLOAT) { g5.breath = Math.min(S.BREATH, g5.breath + dt * 4); return false; }
    g5.swim = { t: 0 }; d.vy = Math.min(d.vy, 120); setState("idle");
  }
  const sw = g5.swim, dir = (held("right") ? 1 : 0) - (held("left") ? 1 : 0), still = !(dir || held("up") || held("down") || pressed("a"));
  sw.t += dt * (still ? S.TREAD : 1); sw.tt = (sw.tt || 0) + dt;
  d.vx = dir * S.X; if (dir) d.facing = dir;
  d.vy += S.SINK * dt;
  if (pressed("a")) { if (d.y <= top + S.LEAP_NEAR) { g5.swim = null; g5.leapT = 0.5; d.vy = -S.LEAP; d.onGround = false; setState("jump"); return false; } d.vy = -S.STROKE; }
  if (held("up")) d.vy -= S.PUSH * dt; if (held("down")) d.vy += S.PUSH * dt;
  d.vy = Math.max(-S.MAXV, Math.min(S.MAXV, d.vy));
  d.x = Math.max(r.c0 * T + 20, Math.min((r.c0 + r.w) * T - 20, d.x + d.vx * dt));
  d.y += d.vy * dt;
  if (d.y < top) { d.y = top; if (d.vy < 0) d.vy = 0; }
  if (d.y > GR * T) { d.y = GR * T; d.vy = 0; }
  if (still && d.y < top + S.FLOAT_NEAR) { d.vy = 0; d.y += (top - d.y) * Math.min(1, dt * 4); }
  sw.tread = still && d.y <= top + 8;
  d.onGround = d.y >= GR * T - 1; d.fallTop = null; d.shield = false; d.charging = false;
  if (d.y <= top + 6) g5.breath = Math.min(S.BREATH, g5.breath + dt * 4);
  else { g5.breath -= dt; if (g5.breath <= 0) { g5.breath = S.AFTER; hurtDavid(d.x, "", true); toast("Out of breath! Swim up for air."); } }
  return true;
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
      if ((g.facing > 0 && g.x >= g.to) || (g.facing < 0 && g.x <= g.from)) { g.x = Math.max(g.from, Math.min(g.to, g.x)); g.state = "look"; g.t = 0; }
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
  if (g5.pose && g5.pose.hide) return true;   // (in the two-shot with Saul)
  if (g5.cave) {   // his back to us, then into the dark behind the falls, smaller and fading; then out again
    const C = g5.cave, K = G5.CAVE, walkEnd = K.TURN + K.WALK, inEnd = walkEnd + K.INSIDE;
    if (C.t < K.TURN) { const n = SPR.david_back_turn ? "david_back_turn" : "david_turn_away"; if (SPR[n]) drawSprite(n, Math.min(SPR[n].frames - 1, Math.floor(C.t / K.TURN * SPR[n].frames)), x, y, d.facing); }
    else if (C.t < walkEnd) { const u = (C.t - K.TURN) / K.WALK; if (SPR.david_back_walk) drawSprite("david_back_walk", frameOf("david_back_walk", C.t), x, y - u * K.RISE, 1, 1 - u * K.SHRINK, 1 - u * 0.9); }
    else if (C.t > inEnd) { const u = Math.min(1, (C.t - inEnd) / K.OUT); drawSprite("david_idle", 0, x, y, -1, 1, u); }   // (back out of the dark)
    return true;
  }
  if (g5.swim && g5.swim.tread && SPR.david_tread) { drawSprite("david_tread", frameOf("david_tread", g5.swim.tt), x, y, d.facing); return true; }
  if (g5.swim && SPR.david_swim2) { drawSprite("david_swim2", frameOf("david_swim2", g5.swim.t), x, y - 50, d.facing, G5.SWIM.K); return true; }
  if (g5.pose && g5.pose.name && SPR[g5.pose.name]) { drawSprite(g5.pose.name, frameOf(g5.pose.name, g5.pose.t), x, y, d.facing); return true; }
  return false;
}
// (Glen's, 11-18: "here is an animated one") the pool moving: his clip, the green keyed out, the ends crossfaded so it loops
let G5_POOL_V = null;
function g5PoolVideo() {
  if (typeof document === "undefined") return null;
  if (!G5_POOL_V) {
    const v = G5_POOL_V = document.createElement("video");
    Object.assign(v, { muted: true, loop: true, playsInline: true, preload: "auto", src: "../assets/rooms/engedi/pool/pool.webm?v=" + (window.BUILD || 0) });
  }
  const v = G5_POOL_V;
  if (v.paused && !v._trying) { v._trying = true; const p = v.play(); if (p && p.catch) p.catch(() => {}).finally(() => { v._trying = false; }); else v._trying = false; }
  return v;
}
function g5DrawFoodAt(kind, x, y, a = 1, bob = 0) {
  const n = G5_FOOD[kind][1], im = kitImg(n), k = KIT[n]; if (!im || !k) return;
  const w = G5.ITEM_W * (kind === "salt" ? 0.7 : 1), h = w * k.h / k.w;
  ctx.save(); ctx.globalAlpha = a; ctx.drawImage(im, x - w / 2, y - h + bob, w, h); ctx.restore();
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
  if (r.id === "spring") { const im = kitImg("w4_e_falls"), k = KIT.w4_e_falls;
    if (im) { const s = im.naturalWidth / k.w, hh = k.water + 24; ctx.drawImage(im, 0, 0, im.naturalWidth, hh * s, g5.falls - k.fx - camX, FOOT - k.water, k.w, hh); } }
  // the cliffs (Glen's tall picture, as much of it as the cliff is high, from its top shelf down)
  for (const k of g5.cliffs || []) {
    if (k.room !== r.id) continue; const im = kitImg("w4_e_cliff"); if (!im) break;
    const x = k.x - camX - 14, w = k.w + 28, s = w / im.naturalWidth, h = GR * T + 8 - k.top + 18;
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
    if (SPR[p.spr]) drawSprite(p.spr, frameOf(p.spr, p.t), x, p.y, p.dir, p.k, 1, r.id === "camp" && g5.saul ? "brightness(0.6)" : "");
  }
  for (const g of g5.guards) if (g.room === r.id && g5Active(g) && typeof z5DrawMan === "function") z5DrawMan(g, camX);
  const s = g5.saul;
  if (s && (s.outside ? r.id === "pens" : r.id === "camp")) {
    if (s.outside) { s.t += 1 / 60; if (s.mode === "walk") { s.x += s.facing * G5.SAUL_WALK / 60; if (s.leaving) s.alpha = Math.max(0, s.alpha - 1 / 120); } }
    g5DrawSaul(s, camX);
  }
  // the falls (the Spring), in front of David: the Truth is behind the water (Glen's sheet hangs from its top)
  //  (moving water over Glen's painted falls)
  if (r.id === "spring" && SPR.waterfall) { const want = 210, k = want / (SPR.waterfall.h * SCALE * (TUNE.SPRITE_SIZE.waterfall || 1));
    drawSprite("waterfall", frameOf("waterfall", performance.now() / 1000), g5.falls - camX, FOOT + 6 - want, 1, k, 0.75); }
  // the pools (Glen's), over their pits, in front of him: in the water, not behind it
  for (const o of g5.pools || []) if (o.room === r.id) { const im = kitImg("w4_e_pool"), k = KIT.w4_e_pool; if (im) {
    const x = o.x - k.w / 2 - camX, y = GR * T - k.h * 0.34, wx = x + k.w * 0.17, ww = k.w * 0.66;   // (the deep water under it, down out of sight: no black pit)
    const g = ctx.createLinearGradient(0, y + k.h * 0.8, 0, y + k.h + 160); g.addColorStop(0, "rgba(52,150,160,0.95)"); g.addColorStop(1, "rgba(10,40,52,1)");
    ctx.fillStyle = g; ctx.fillRect(wx, y + k.h * 0.8, ww, H - (y + k.h * 0.8) + 400); ctx.drawImage(im, x, y, k.w, k.h); } }
  // the cave behind the falls: an Up arrow at its mouth; while he goes in, the falling water in front of him
  if (r.id === "pool") {
    if (!g5.cave && !g5Has("g5_truth_falls") && !region.script.length && Math.abs(david.x - g5CaveX()) < G5.CAVE.REACH && david.y < r.water) upHint(g5CaveX() - camX, G5.POOL_LEDGE - 115);   // (in the dark of the mouth: higher, it was under the hearts)
    if (g5.cave && SPR.waterfall) { const want = 300, k = want / (SPR.waterfall.h * SCALE * (TUNE.SPRITE_SIZE.waterfall || 1)), fx = (r.c0 + G5.CAVE.FALLS) * T + T / 2;
      ctx.save(); ctx.beginPath(); ctx.rect(fx - camX - 50, 0, 100, G5.POOL_LEDGE + 14); ctx.clip(); ctx.globalCompositeOperation = "screen";   // (only the falling water itself: no mist box round it)
      drawSprite("waterfall", frameOf("waterfall", performance.now() / 1000), fx - camX, G5.POOL_LEDGE + 10 - want, 1, k, 0.7); ctx.restore(); }
  }
  // dropped provisions, bouncing, flashing as their time runs out
  for (const o of g5.drops) { const f = g5.food.find(q => q.id === o.id); if (!f) continue;
    const a = o.t > G5.DROP_FOR - 1.2 ? 0.4 + 0.6 * Math.abs(Math.sin(o.t * 12)) : 1; g5DrawFoodAt(f.kind, o.x - camX, o.y + 4, a); }
}
const G5_DARK = typeof document !== "undefined" ? document.createElement("canvas") : null;
function g5DrawOver() {
  const r = region.room; if (!r) return;
  // in the pool: the water over him (a light tint below the surface), and his breath over his head
  if (r.id === "pool") {
    ctx.save(); ctx.fillStyle = "rgba(40,150,175,0.22)"; ctx.fillRect(0, r.water + 10 - camY, W, H); ctx.restore();
    if (g5.swim || g5.breath < G5.SWIM.BREATH - 0.05) { const k = Math.max(0, g5.breath / G5.SWIM.BREATH), x = david.x - camX - 40, y = david.y - 150 - camY;
      ctx.fillStyle = "rgba(0,0,0,0.5)"; ctx.fillRect(x - 2, y - 2, 84, 12); ctx.fillStyle = k > 0.3 ? "#7fd8ff" : "#ff6a5a"; ctx.fillRect(x, y, 80 * k, 8); }
  }
  // the dark of the cave while Saul's in it: a little light on David and on the king
  if (r.id === "camp" && g5.saul && !g5.saul.outside && G5_DARK) {
    // (soft lights cut out of a dark layer, drawn on its own canvas so two lights that overlap add up, not cancel)
    const L = [[david.x - camX, david.y - 100 - camY, 230], [g5.saul.x - camX, g5.saul.y - 110 - camY, 210]];
    const c = G5_DARK; if (c.width !== W || c.height !== H) { c.width = W; c.height = H; }
    const x2 = c.getContext("2d"); x2.globalCompositeOperation = "source-over"; x2.clearRect(0, 0, W, H);
    x2.fillStyle = "rgba(4,3,2,0.74)"; x2.fillRect(0, 0, W, H); x2.globalCompositeOperation = "destination-out";
    for (const [x, y, rr] of L) { const g = x2.createRadialGradient(x, y, rr * 0.25, x, y, rr); g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(1, "rgba(0,0,0,0)"); x2.fillStyle = g; x2.fillRect(x - rr, y - rr, rr * 2, rr * 2); }
    ctx.drawImage(c, 0, 0);
  }
  // the pack, and what's home
  if (!g5Has("g5_load_wild") || g5.pack.length) {
    const room = G5_RUNS.find(rm => !g5Done(rm)) || "wild", need = g5RoomFood(room).length;
    const have = g5RoomFood(room).filter(f => g5Has(f.id) || g5.pack.includes(f.id)).length;
    // (bottom left: the top is the controls and the hearts)
    const bx = 16, by = H - 92, bw = 340;
    ctx.save(); ctx.fillStyle = "rgba(20,12,6,0.72)"; ctx.fillRect(bx, by, bw, 58);
    ctx.strokeStyle = "#ffe08a"; ctx.lineWidth = 1.5; ctx.strokeRect(bx, by, bw, 58);
    ctx.fillStyle = "#ffe08a"; ctx.font = "bold 16px Georgia, serif"; ctx.textAlign = "center";
    ctx.fillText(`Pack: ${g5.pack.length}    ${roomById(room).name}: ${have} / ${need}`, bx + bw / 2, by + 23);
    ctx.font = "14px Georgia, serif"; ctx.fillStyle = "#f3e6c8";
    const home = g5.food.filter(f => g5Has(f.id)).length;
    ctx.fillText(`Food home at the camp: ${home} / ${g5.food.length}`, bx + bw / 2, by + 45);
    ctx.restore();
  }
}
