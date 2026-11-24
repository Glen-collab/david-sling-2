// World 4, part two: Keilah (1 Samuel 23:1-14; KEILAH_PLAN.md). Part Two's fifth region, on region.js's engine like
// adullam.js: loaded before region.js, which takes KEILAH as its REGION when the address is "#9-9".
//
// First pass (Glen 11-14: "use your discernment for which items we have and backgrounds and then when we get the
// structure, kind of laid out, we can develop more for backgrounds and stuff"): the rooms and the story, built from art
// already in the two games (Gibeah's fields and town, the roads of World 3, Part One's people). His backdrops come later.
//
//   The Forest of Hereth (the news; Ask the LORD at the rock, twice: 23:1-4) -> The Road Down to Keilah (Philistine
//   scouts) -> The Threshing Floors (a tall room, floors on every level: the raiders come for the grain, 23:5) ->
//   Keilah (Abiathar and the ephod, 23:6; Saul is coming, 23:7-8; the two questions, 23:9-12; night) -> Out of Keilah
//   (the run: David runs by himself, as Part One's Rout; jump, roll, get past the hands; the gate closing) -> The
//   Wilderness (23:13-14; the Journal; the land map)

const K4 = {
  // the people standing about (Part One's and Part Two's sprites): their size next to David
  NPC_K: 0.9,
  // (Glen 11-17: "way disproportionate") each one's size beside David (240 px), on top of NPC_K: the villager sheets are
  //  drawn 1.44x David (the girl and woman already smaller by TUNE.SPRITE_SIZE), Abiathar's a little under him. ABIATHAR_HOLD: the frame of his talk clip he stands on (it walks)
  SIZE: { villager_man: 0.77, villager_staffman: 0.77, villager_boy: 0.5, villager_girl: 0.85,   // (abiathar: TUNE.SPRITE_SIZE now, everywhere)
    townsman: 1.2, townswoman: 1.15 },   // (11-17: "these people are small in Keilah": the night street's men and women, 216 and 208 px to David's 240) ABIATHAR_HOLD: 6,
  ASK: { NEAR: 90, KNEEL_MS: 161, ABIATHAR: 170 },
  GATE_REACH: 160, GATE_TURN: 0.75,   // (Glen 11-17) px before an open gate where Up takes him through   // (Glen 11-17: "I can walk right past Abiathar": this close, the ephod scene starts by itself)   // the prayer rock: px from it to kneel (Up); david_kneel's frame time
  // (Glen 11-14: "We can build multiple floors to defend like the caves. That was fun.") the raiders: each wave's count,
  //  one every EVERY s; their walk and their run with a sack (px/s); a grab takes GRAB s; each floor's sacks; the wave's
  //  lost if LOSE sacks get away; REST s between waves; HURT: px from David that knocks him (while they walk at him)
  RAID: { WAVES: [5, 7, 9], EVERY: 2.0, WALK: 120, RUN: 210, GRAB: 1.6, SACKS: 3, LOSE: 5, REST: 3, K: 1.1, HIT: 54, HURT: 40, FADE: 0.8 },
  // (Glen 11-14: "a runner like we did in David 1 but challenging too") the escape: a grab holds him GRAB s; pots fall
  //  every POT s (px/s down: POT_V); the gate shuts SLACK s after the time a clean run takes; under GATE_LOW of it closed
  //  he runs through, past it he has to roll; RUN: his speed (px/s) for the clock
  RUN: { GRAB: 1.0, GRAB_NEAR: 46, STEP_IN: 190, POT: 3.2, POT_V: 480, THROW_AT: 8, POT_FLY: 1.1, POT_G: 900, POT_MISS: 160, SLACK: 7, GATE_LOW: 0.55, BEAM_Y: 130, RUN: 380, FAIL_FADE: 1.2 },
  NIGHT: [38, 48, 92],   // the night wash (as ramah.js)
  NIGHT_ART: [120, 130, 175],   // (11-14) lighter over Glen's own night pictures: they're dark already, the wash only tints the people
};

const KEILAH = {
  key: "keilah", name: "Keilah", start: "hereth", carry: ["gibeah", "ramah", "nobgath", "adullam"],
  strCap: 8,
  rooms: [
    // (stand-ins till Glen's: the hills of World 3's road for the forest, his Fields for the floors, Gibeah's town)
    { id: "hereth", name: "The Forest of Hereth", w: 130, bg: "w4_1", mx: 0, my: 1, mw: 3, right: "road",
      far: "keilah/hereth/far", mid: "keilah/hereth/mid.png", midY: 0, near: "keilah/hereth/near.png", floor: "w3/road/ground.png" },   // (Glen's, 11-14)
    { id: "road", name: "The Road Down to Keilah", w: 150, bg: "w4_1", mx: 3, my: 1, mw: 3, left: "hereth", right: "floors",
      far: "keilah/road/far", mid: "keilah/road/mid.png", midY: 0, near: "keilah/road/near.png" },   // (Glen's, 11-14)
    { id: "floors", name: "The Threshing Floors", w: 110, up: 26, bg: "w4_1", mx: 6, my: 0, mw: 3, mh: 2, left: "road", right: "town",
      far: "keilah/floors/far", mid: "keilah/floors/mid.png", midY: 0, near: "keilah/floors/near.png" },   // (Glen's, 11-14)
    { id: "town", name: "Keilah", w: 110, bg: "w4_3", mx: 9, my: 1, mw: 3, left: "floors", right: "escape", night: () => k4Has("k4_ephod"), nightArt: () => k4Has("k4_ephod"),
      // (Glen's, 11-14) by day his market street; after the ephod, his street at night
      get far() { return k4Has("k4_ephod") ? "keilah/night/far" : "keilah/town/far"; },
      get mid() { return k4Has("k4_ephod") ? "keilah/night/mid.png" : "keilah/town/mid.png"; },
      get near() { return k4Has("k4_ephod") ? "keilah/night/near.png" : "keilah/town/near.png"; }, midY: 0 },
    { id: "escape", name: "Out of Keilah", w: 230, bg: "w4_3", mx: 12, my: 1, mw: 5, left: "town", right: "hills", night: () => true, nightArt: true,
      far: "keilah/night/far", mid: "keilah/night/mid.png", midY: 0, near: "keilah/night/near.png" },   // (Glen's, 11-14)
    { id: "hills", name: "The Wilderness", w: 60, bg: "w4_1", mx: 17, my: 1, mw: 2, left: "escape", night: () => true, nightArt: true,
      far: "keilah/hills/far", mid: "keilah/hills/mid.png", midY: 0, near: "keilah/hills/near.png" },   // (Glen's, 11-14)
  ],
  // the Journal: Glen's song, the Bridge (SONG_PSALM57.md, his words exactly): out of Keilah by night, toward the dawn
  steps: ["k4_asked", "k4_floors", "k4_ephod", "k4_escaped"],
  verse: ["Awake, my glory, awake", "Awake, my harp, awake", "I will awaken the dawn", "I will praise You, Lord",
    "Among the nations I will sing", "Among the people praise Your name", "Your loving kindness reaches heaven", "Your truth will never change"],
  // (draft words, for Glen, 11-15) what David writes after each story moment: what happened, and what he learned or
  //  bore in it; at the end, a line from his own psalms (WEB, checked on ebible.org 11-15)
  entries: [
    ["Keilah was being robbed. Before I moved, I asked the LORD. My men were afraid, so I asked again. I will not go where He doesn't send me.", "1 Samuel 23:1–4"],
    ["We went down and saved Keilah, and brought away the Philistines' livestock. The battle was the LORD's. He gave them into our hand.", "1 Samuel 23:5"],
    ["I saved Keilah, and Keilah would hand me over to Saul. That is hard to bear. But the LORD told me the truth in time.", "1 Samuel 23:9–12"],
    ["Six hundred of us went out by night, wherever we could go. Saul looks for me every day, but God doesn't give me into his hand.", "1 Samuel 23:13–14"],
  ],
  end: ["My times are in your hand. Deliver me from the hand of my enemies, and from those who persecute me.", "Psalm 31:15"],
  build: R => k4Build(R), enter: r => k4Enter(r), update: (dt, r) => k4Update(dt, r), holdDavid: (d, dt) => k4Hold(d, dt),
  drawDavid: (d, x, y) => k4DrawDavid(d, x, y), draw: camX => k4Draw(camX), drawFront: camX => k4DrawFront(camX),
  drawOver: () => k4DrawOver(), stoneHits: s => k4StoneHits(s),
};

const k4 = { told: {}, people: [], rocks: [], floors: [], raiders: [], raid: null, kneel: null, run: null, beams: [], grabbers: [], pots: [], throwers: [], lights: [], herd: [] };
const k4Has = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function k4Tell(k, text) { if (!k4.told[k]) { k4.told[k] = true; toast(text); } }
// someone standing about: their sprite (looped), x, the ground they stand on, facing; show: only when this is true
const k4Size = n => K4.SIZE[n.replace(/_(stand|run|talk|ephod|pray|walk|hide)$/, "")] || 1;
function k4Person(room, spr, x, y = FOOT, dir = 1, show = null, k = K4.NPC_K) { k *= k4Size(spr); const p = { room, spr, x, y, dir, show, k, t: Math.random() * 3 }; k4.people.push(p); return p; }
// (Part Two's own: main.js held("right")) Out of Keilah runs by itself, as Part One's Rout did
function regionAutoRun() {
  return typeof REGION_KEY !== "undefined" && REGION_KEY === "keilah" && !!region.room && region.room.id === "escape" && !!k4.run && k4.run.on && !k4.run.done && !k4.run.fail && david.deadT <= 0 && !(k4.run.grabT > 0);
}

// ---------------------------------------------------------------------------------------------------------------------
// building
// (11-15, tools/cut_piece.py) Glen's prayer rock, threshing floor and the log hung across the night street
const K4_KIT = { w4_prayer_rock: { w: 240, h: 158 }, w4_threshing_floor: { w: 320, h: 151 }, w4_hanging_log: { w: 150, h: 160 } };
function k4Build(R) {
  Object.assign(KIT, K4_KIT);
  // (11-14) Glen's layers, asked for now so none pops in late (Keilah by day and by night both)
  for (const pl of ["hereth", "road", "floors", "town", "night", "hills"]) for (const f of ["far", "mid.png", "near.png"]) roomImg("keilah/" + pl + "/" + f);
  k4.people.length = k4.rocks.length = k4.floors.length = k4.raiders.length = k4.beams.length = k4.grabbers.length = k4.pots.length = k4.throwers.length = k4.lights.length = k4.herd.length = 0;
  k4.raid = null; k4.run = null; k4.kneel = null;
  for (const n of ["raider_run", "raider_grab", "raider_flee", "raider_hit"]) TUNE.SPRITE_SIZE[n] = K4.RAID.K;
  ["w4_town_wall", "w3_cart", "w3_hide_sacks", "w4_hanging_log", "w4_threshing_floor", "t_house", "t_stall", "t_stair", "t_roof_left", "t_roof_mid", "t_roof_right", "t_awning", ...[0, 1, 2, 3].flatMap(i => ["w4_gstage_day_" + i, "w4_gstage_night_" + i])].forEach(kitImg);
  const G = GR * T;

  // -- The Forest of Hereth (22:5; 23:1-4): the 400 camped under the trees; a runner with the news; the rock where David
  //  asks the LORD. His men are afraid (23:3): he asks again. Then on through the woods
  let c = R("hereth");
  { const rm = "hereth", X = k => (c + k) * T;
    ground(c, c + 129);
    campfire(c + 4, GR - 1);   // (the olive press: the save)
    for (const [n, k, dir] of [["soldier_sit", 9, 1], ["soldier_talk", 12, -1], ["soldier_sit", 15, -1], ["soldier3_fear", 19, 1], ["soldier_sit", 23, 1], ["soldier5_fear", 26, -1]])
      k4Person(rm, n, X(k), FOOT, dir).still = /_fear$/.test(n);
    k4.messenger = k4Person(rm, "messenger_talk", X(33), FOOT, -1);
    oliveRow(c + 8, 16, 5);
    // the rock (Ask the LORD): Up by it, David kneels
    k4.rocks.push({ id: "hereth", room: rm, x: X(42) });
    region.props.push({ room: rm, n: "w4_prayer_rock", x: X(42) - KIT.w4_prayer_rock.w / 2, y: FOOT - KIT.w4_prayer_rock.h + 14 });
    // past the rock: the woods, up and down (the way's shut till he's asked: k4Update)
    rOliveTree(rm, c + 52); oliveRow(c + 63, onTop(FOOT - KIT.f_olive.h + 328) - 0.4, 3);
    rBoulder(rm, c + 70);
    rWild("caracal", rm, c + 78, { range: 6 * T });
    if (typeof rHyraxFamily === "function") rHyraxFamily(rm, c + 64, 2);   // (Glen's hyraxes, 11-17: a mother and two little ones)
    { const c1 = rTerrace(rm, c + 82, 2); oliveRow(c + 84, onTop(FOOT - 136) - 0.4, c1 - c - 85); }
    // (Glen 11-16: a ledge was on the wall's top stones) the terrace (to col 101) is the step: one ledge above it
    rLedge(rm, c + 95, 370, 4); rRelic("k4_pom_hereth", "pomegranate", c + 97, onTop(370));
    rWild("hornet", rm, c + 100, { y: 330, hy: 330 });
    rHole(rm, c + 104, 3);
    rOliveTree(rm, c + 110);
    rBreak("basket", rm, c + 122, 16); rBreak("jar", rm, c + 124, 16);
  }

  // -- The Road Down to Keilah: down out of the hills; Philistine scouts on the terraces; smoke ahead
  c = R("road");
  { const rm = "road", X = k => (c + k) * T;
    ground(c, c + 149);
    oliveRow(c + 5, 16, 4);
    { const c1 = rTerrace(rm, c + 12, 3); rPhil(rm, Math.round((c + 12 + c1) / 2), FOOT - 136, 3); }
    rLowWall(rm, c + 36); rPhil(rm, c + 43, G, 5);   // (Glen 11-16: the low wall was half inside the terrace, which runs to col 35)
    rHole(rm, c + 46, 3);
    rLedge(rm, c + 50, 470, 5); rLedge(rm, c + 57, 350, 4); rRelic("k4_stone_road", "stone", c + 59, onTop(350));
    rBoulder(rm, c + 64); rPhil(rm, c + 74, G, 6);
    campfire(c + 82, GR - 1);
    { const c1 = rTerrace(rm, c + 88, 4); rPhil(rm, Math.round((c + 88 + c1) / 2), FOOT - 136, 4); oliveRow(c + 90, onTop(FOOT - 136) - 0.4, 6); }
    // (Glen 11-16: "the wall is over a ledge and the pit") the terrace runs to col 116: the pit and its ledge after it
    rHole(rm, c + 119, 4); rLedge(rm, c + 119, 480, 4);
    rOliveTree(rm, c + 125); rPhil(rm, c + 133, G, 4);
    rWild("viper", rm, c + 141);
    rBreak("jar", rm, c + 146, 16); oliveRow(c + 143, 16, 4);
  }

  // -- The Threshing Floors (23:5): outside the walls, floors on every level of the hillside. The raiders come for the
  //  grain: stop them before they get away with it. A tall room (up), like the caves
  c = R("floors");
  { const rm = "floors", X = k => (c + k) * T;
    ground(c, c + 109);
    campfire(c + 3, GR - 1);
    // the levels: [x0 col, width, top px]; the floors stand on the wide ones
    const L = [[22, 16, 450], [44, 8, 470], [54, 18, 300], [10, 8, 300], [24, 14, 150], [76, 8, 450], [84, 18, 300], [62, 14, -10], [40, 8, -10], [90, 10, 150]];
    for (const [k, w, y] of L) rLedge(rm, c + k, y, w);
    const floor = (k, y, edge) => k4.floors.push({ room: rm, x: X(k), y, sacks: K4.RAID.SACKS, edge: edge.map(X) });
    floor(14, FOOT, [1, 108]);            // the ground's two
    floor(98, FOOT, [1, 108]);
    floor(30, 450, [22, 37]);             // the terraces
    floor(63, 300, [54, 71]);
    floor(93, 300, [84, 101]);
    floor(31, 150, [24, 37]);
    floor(69, -10, [62, 75]);             // the top of the hill
    rRelic("k4_truth_floors", "truth", c + 44, onTop(-10),
      "David inquired of the LORD yet again. The LORD answered him, and said, “Arise, go down to Keilah; for I will deliver the Philistines into your hand.” (1 Samuel 23:4)");
    oliveRow(c + 55, onTop(300) - 0.4, 4); oliveRow(c + 85, onTop(300) - 0.4, 4);
    // the town's gate at the right: once the floors are safe, the livestock in the gate (23:5)
    for (const [n, k] of [["ox_stand", 105], ["sheep2_graze", 104], ["goat_stand", 106], ["sheep_graze", 102]]) k4.herd.push({ room: rm, spr: n, x: X(k), y: FOOT, dir: -1 });   // (Glen's ox, 11-15)   (Glen 11-17: backed up from 101 to 105, his head and nose in the gateway)
  }

  // -- Keilah (23:6-12): the town saved. The people, Abiathar with the ephod (after the floors), the runner, and the
  //  question. By night after it, the doors shut
  c = R("town");
  { const rm = "town", X = k => (c + k) * T;
    ground(c, c + 109);
    rDeco(rm, "t_house", c + 4); rDeco(rm, "t_stall", c + 12); rBreak("pots", rm, c + 15, 16);
    k4Person(rm, "villager_woman_stand", X(9), FOOT, 1, () => !k4Has("k4_ephod"));
    k4Person(rm, "villager_man_stand", X(18), FOOT, -1, () => !k4Has("k4_ephod"));
    campfire(c + 22, GR - 1);
    rTownStair(rm, c + 26); rRoof(rm, X(32), 420, 2); oliveRow(c + 34, onTop(420) - 0.4, 5);
    // (Glen 11-17: a house stood over the stair and the roof, hiding the steps: taken out)
    k4Person(rm, "villager_girl_stand", X(44), FOOT, -1, () => !k4Has("k4_ephod"));
    k4Person(rm, "villager_boy_stand", X(46), FOOT, -1, () => !k4Has("k4_ephod"));
    rAwning(rm, c + 50); rRoof(rm, X(57), 330, 1); rRelic("k4_oil_town", "oil", c + 59, onTop(330));
    k4.abiathar = k4Person(rm, SPR.abiathar_stand ? "abiathar_stand" : "abiathar_talk", X(66), FOOT, -1, () => k4Has("k4_floors"));   // (Glen's picture, 11-17: standing with the ephod, waiting for David)
    k4.rocks.push({ id: "ephod", room: rm, x: X(68) });   // (the ephod: Up by Abiathar)
    for (const k of [72, 76, 80]) k4Person(rm, ["soldier_talk", "soldier2_fear", "soldier4_fear"][k % 3], X(k), FOOT, k % 2 ? 1 : -1).still = k !== 72;
    rDeco(rm, "t_house", c + 86); rDeco(rm, "t_jars", c + 94);
    k4Person(rm, "villager_staffman_stand", X(92), FOOT, -1, () => !k4Has("k4_ephod"));
    k4.lights.push({ room: rm, x: X(22), y: G - 40, r: 300 }, { room: rm, x: X(66), y: G - 120, r: 260 });
    rBreak("basket", rm, c + 100, 16); rBreak("jar", rm, c + 102, 16);
    k4.gateX = X(100);   // (shut till the ephod's question: k4Update)
  }

  // -- Out of Keilah (23:13): the run. Carts to jump, beams to roll under, men to get past, pots from the roofs, gaps; the
  //  gate at the end closing
  c = R("escape");
  { const rm = "escape", X = k => (c + k) * T;
    ground(c, c + 229);
    k4.runStart = X(4); k4.runGate = X(214);
    campfire(c + 2, GR - 1);   // (the olive press: down in the street, back to here)
    const cart = k => { const kk = KIT.w3_cart; region.props.push({ room: rm, n: "w3_cart", x: X(k) - kk.w / 2 + T, y: FOOT - kk.h }); block(c + k, GR - 2, 3, 2, 1); platAt(c + k, FOOT - kk.h + 30, 3); for (let i = 0; i < 3; i++) artSolid.add((c + k + i) + "," + (GR - 2)); };
    const beam = k => k4.beams.push({ room: rm, x: X(k) });
    const man = (k, n) => k4.grabbers.push({ room: rm, x: X(k), x0: X(k), spr: n, state: "wait", t: 0 });
    // (easy at first, then closer together)
    cart(20); man(32, "villager_man"); beam(42); cart(52);
    rHole(rm, c + 62, 3); man(72, "villager_capman"); beam(80); cart(88); man(96, "villager_staffman");
    rHole(rm, c + 104, 4); beam(112); cart(118); man(124, "villager_wrapman");
    beam(132); rHole(rm, c + 138, 3); cart(146); man(152, "villager_man"); beam(158); man(164, "villager_capman");
    cart(172); beam(178); rHole(rm, c + 184, 4); man(192, "villager_staffman"); cart(198); beam(206);
    for (let k = 10; k < 210; k += 16) k4.lights.push({ room: rm, x: X(k), y: G - 260, r: 230 });   // (torches on the walls)
    for (const k of [30, 70, 110, 150, 190]) rDeco(rm, "t_house", c + k);
  }

  // -- The Wilderness (23:13-14): out in the dark hills; the 600 with him. The end
  c = R("hills");
  { const rm = "hills", X = k => (c + k) * T;
    ground(c, c + 59);
    for (const [n, k, dir] of [["soldier_talk", 26, -1], ["soldier1_fear", 30, -1], ["soldier3_fear", 34, 1], ["soldier_sit", 38, -1]]) k4Person(rm, n, X(k), FOOT, dir).still = /_fear$/.test(n);
    k4.endX = X(20);
    campfire(c + 46, GR - 1);
  }
  k4Talk();
}
// (Glen 11-17: "everyone ... can say something instead of just standing there doing nothing") Up by anyone: their next
//  line. Their own words, not Scripture, unless a reference is given. Keyed by room and column
function k4Talk() {
  const MEN = "One of David's men", W = "A woman of Keilah", M = "A man of Keilah", saul = () => k4Has("k4_saul");
  const T_ = {
    "hereth:9": [[MEN, "Four hundred of us, out here under the trees. Gad the prophet told David to come back to Judah (1 Samuel 22:5)."]],
    "hereth:12": () => k4Has("k4_asked") ? [[MEN, "The LORD said go down to Keilah. If the LORD goes with us, I'll go too."]]
      : [[MEN, "Keilah? Against the armies of the Philistines? We're afraid enough right here in Judah (1 Samuel 23:3)."]],
    "hereth:15": [[MEN, "Keep your sling handy. There's more than foxes in these woods."]],
    "hereth:19": [[MEN, "Every twig that snaps, I think it's Saul."]],
    "hereth:23": [[MEN, "We left everything to follow you, David. I'd do it again."]],
    "hereth:26": [[MEN, "I came out here to hide from Saul, not to fight Philistines. But if the LORD says go..."]],
    "hereth:33": () => !k4Has("k4_news") ? null : k4Has("k4_floors") ? [["The runner", "You saved the floors! I ran all the way to tell you, and it was worth every step."]]
      : [["The runner", "The threshing floors, past the woods! Hurry, they're carrying off the grain!"]],
    "town:9": [[W, "The Philistines robbed our threshing floors every harvest. This year we'll have bread! Bless you, David."],
      [W, "My husband says a town with gates and bars is the safest place in all Judah."]],
    "town:18": () => saul() ? [[M, "Saul is coming here? Well... we'll have to do what's best for Keilah."]]
      : [[M, "We watched from the wall. You drove them off and brought their livestock back too (1 Samuel 23:5)."]],
    "town:44": [["A girl of Keilah", "Is that big ox yours now? Can I give him a name?"],
      ["A girl of Keilah", "Mother says you play the harp for the king. Will you play for us tonight?"]],
    "town:46": [["A boy of Keilah", "I saw you sling a stone clear across the floors! Will you teach me?"],
      ["A boy of Keilah", "When I grow up, I'm going to be one of David's men."]],
    "town:92": () => saul() ? [["An old man of Keilah", "Saul is a hard man, son. A frightened town will hand over one man to save itself. Be careful whom you trust."]]
      : [["An old man of Keilah", "I've seen a lot of harvests stolen. Never one given back. The LORD is with you, young man."]],
    "town:66": () => k4Has("k4_ephod") ? [["Abiathar", "The LORD has answered you. The men of Keilah would hand you over. Go, while the gate is still open!"]] : null,
    "town:72": () => saul() ? [[MEN, "Saul, coming here? Behind these walls we're shut in like sheep in a pen."]]
      : [[MEN, "We were afraid to come down to Keilah, and the LORD gave us the victory anyway."]],
    "town:76": [[MEN, "Walls all around us for once. I could sleep for a week."]],
    "town:80": [[MEN, "There were about four hundred of us at the cave. Now there are about six hundred (1 Samuel 22:2; 23:13)."]],
    "hills:26": [[MEN, "Out of Keilah, all six hundred of us. We'll go wherever we can go (1 Samuel 23:13)."]],
    "hills:30": [[MEN, "They would have handed us over to Saul. After all we did for them."]],
    "hills:34": [[MEN, "No walls out here. But no gates to shut us in, either."]],
    "hills:38": [[MEN, "They say Saul looks for you every day. But God hasn't handed you over to him, and He won't."]],
  };
  for (const p of k4.people) { const L = T_[p.room + ":" + Math.round(p.x / T - roomById(p.room).c0)]; if (L) rTalker(p, L); }
  // (Glen 11-17: "coming back to the place should we have these guys talk like 'Saul will find you'") the men who grabbed
  //  at him on the run out (23:12: they would have handed him over), once he's got away. Saul gave up coming (23:13)
  const KM = "A man of Keilah", OUT = [
    [[KM, "You came back? Saul will find you. He's looking for you every day."]],
    [[KM, "We'd have handed you over to him. What else could we do? He'd have torn down our walls."]],
    [[KM, "Saul gave up coming here when he heard you'd gone. Don't give him a reason to come back (1 Samuel 23:13)."]],
    [[KM, "You saved our grain, and we'd have sold you for it. I'm not proud of it."]],
    [[KM, "Go on, get out to the wilderness. The king's men are everywhere."]],
  ];
  k4.grabbers.forEach((g, i) => rTalker(g, () => k4Has("k4_escaped") && !(k4.run && k4.run.on && !k4.run.done) ? OUT[i % OUT.length] : null));
}

// ---------------------------------------------------------------------------------------------------------------------
function k4Enter(r) {
  if (r.id === "hereth" && !k4Has("k4_news")) k4Tell("hereth", "Then David departed, and came into the forest of Hereth. (1 Samuel 22:5)");
  if (r.id === "floors" && !k4Has("k4_floors")) k4RaidStart();
  if (r.id === "town" && k4Has("k4_floors") && !k4Has("k4_abiathar")) k4AbiatharScene();
  if (r.id === "escape" && !k4Has("k4_escaped")) k4RunStart();
  if (r.id === "escape" && k4Has("k4_escaped")) k4Tell("escape2", "Keilah's gate stands open again. Saul gave up coming here (1 Samuel 23:13).");
}

// the news, then the rock: Ask the LORD (23:1-4)
function k4AskScene(rock) {
  const d = david;
  if (rock.id === "hereth") {
    if (!k4Has("k4_news")) { k4Tell("ask_first", "Hear the news first: the runner, by the camp."); return; }
    const second = k4Has("k4_ask1");
    k4.kneel = { t: 0 }; d.facing = Math.sign(rock.x - d.x) || 1;
    if (!second) rPlay([{ wait: 1.4 },
      { say: ["", "Therefore David inquired of the LORD, saying, “Shall I go and strike these Philistines?” (1 Samuel 23:2)"] },
      { say: ["", "The LORD said to David, “Go strike the Philistines, and save Keilah.” (1 Samuel 23:2)"] },
      { fn() { k4.kneel = null; regionAdd("taken", "k4_ask1"); } },
      { say: ["David's men", "Behold, we are afraid here in Judah. How much more then if we go to Keilah against the armies of the Philistines? (1 Samuel 23:3)"] },
      { fn() { toast("His men are afraid. Ask the LORD again: Up at the rock."); } }]);
    else rPlay([{ wait: 1.4 },
      { say: ["", "Then David inquired of the LORD yet again. (1 Samuel 23:4)"] },
      { say: ["", "The LORD answered him, and said, “Arise, go down to Keilah; for I will deliver the Philistines into your hand.” (1 Samuel 23:4)"] },
      { fn() { k4.kneel = null; regionAdd("taken", "k4_asked"); toast("On to Keilah: the way through the woods is open."); } }]);
    return;
  }
  if (rock.id === "ephod") {
    if (!k4Has("k4_saul")) return;
    k4.kneel = { t: 0 }; d.facing = Math.sign(rock.x - d.x) || 1;
    // (Glen's clip, 11-15) Abiathar holds out the ephod, then lifts his hands while David asks; himself again after
    const ab = k4.abiathar, pose = n => ({ fn() { if (SPR[n]) { ab.spr = n; ab.t = 0; } } });
    d.x = ab.x - 130; d.vx = 0; d.facing = 1;   // (a step back, so both are seen: David kneeling, Abiathar with the ephod)
    rPlay([{ say: ["David", "Bring the ephod here. (1 Samuel 23:9)"] }, pose("abiathar_ephod"), { wait: 2.4 }, pose("abiathar_pray"),
      { say: ["David", "O LORD, the God of Israel, your servant has surely heard that Saul seeks to come to Keilah to destroy the city for my sake. (1 Samuel 23:10)"] },
      { say: ["David", "Will the men of Keilah deliver me up into his hand? Will Saul come down, as your servant has heard? (1 Samuel 23:11)"] },
      { say: ["", "The LORD said, “He will come down.” (1 Samuel 23:11)"] },
      { say: ["David", "Will the men of Keilah deliver me and my men into the hand of Saul? (1 Samuel 23:12)"] },
      { say: ["", "The LORD said, “They will deliver you up.” (1 Samuel 23:12)"] },
      pose(SPR.abiathar_stand ? "abiathar_stand" : "abiathar_talk"),
      { fn() { k4.kneel = null; regionAdd("taken", "k4_ephod"); learnSkill("ask");
        toast("Night falls on Keilah. The doors are shutting. Get out before they shut the gate: run!"); } }]);
  }
}
function k4AbiatharScene() {
  rPlay([{ wait: 0.6 },
    { say: ["", "When Abiathar the son of Ahimelech fled to David to Keilah, he came down with an ephod in his hand. (1 Samuel 23:6)"] },
    { say: ["Abiathar", "I escaped from Nob, and I came after you. I brought the ephod."] },   // (draft, for Glen: 22:20-21 kept gentle)
    { say: ["David", "Stay with me. Don’t be afraid, for he who seeks my life seeks your life. You will be safe with me. (1 Samuel 22:23)"] },
    { fn() { regionAdd("taken", "k4_abiathar"); } }, { wait: 1.5 },
    { say: ["", "Saul was told that David had come to Keilah. Saul said, “God has delivered him into my hand, for he is shut in by entering into a town that has gates and bars.” (1 Samuel 23:7)"] },
    { say: ["", "Saul summoned all the people to war, to go down to Keilah to besiege David and his men. (1 Samuel 23:8)"] },
    { fn() { regionAdd("taken", "k4_saul"); toast("David knew that Saul was devising mischief against him (23:9). Go to Abiathar: Up, to ask with the ephod."); } }]);
}

// ---------------------------------------------------------------------------------------------------------------------
function k4Update(dt, r) {
  const d = david;
  for (const p of k4.people) p.t += dt;
  if (k4.kneel) k4.kneel.t += dt;
  // the runner (23:1): when David comes near him
  if (r.id === "hereth" && !k4Has("k4_news") && d.x > k4.messenger.x - 260 && !region.script.length) {
    regionAdd("taken", "k4_news"); d.facing = 1;
    rPlay([{ say: ["A runner", "Behold, the Philistines are fighting against Keilah, and are robbing the threshing floors! (1 Samuel 23:1)"] },
      { fn() { toast("Ask the LORD first: go to the rock and press Up."); } }]);
  }
  // (Glen 11-17: "use the turn and go through sprite like going into the caves") through a gate: into the gateway, his
  //  back to us (Adullam's tunnel turn), then the cut to the far side
  const gw = k4.gateWalk;
  if (gw) {
    gw.t += dt; d.vx = 0; d.x += (gw.at - d.x) * Math.min(1, dt * 6);
    if (!gw.gone && gw.t >= K4.GATE_TURN) { gw.gone = true; const n = roomById(gw.to); regionGo((n.c0 + 2) * T, 1, () => { k4.gateWalk = null; }); }
    return;
  }
  // (Glen 11-17) Abiathar with the ephod, once Saul's coming: walk up to him and the asking starts
  if (r.id === "town" && k4Has("k4_saul") && !k4Has("k4_ephod") && !region.script.length && region.wait <= 0 && !region.trans && d.onGround && Math.abs(d.x - k4.abiathar.x) < K4.ASK.ABIATHAR) {
    const ep = k4.rocks.find(o => o.id === "ephod"); if (ep) { k4AskScene(ep); return; } }
  // Up by the rock (or Abiathar): ask
  if (!region.script.length && region.wait <= 0 && !region.trans && d.onGround && pressed("up")) {
    const rock = k4.rocks.find(o => o.room === r.id && Math.abs(d.x - o.x) < K4.ASK.NEAR + (o.id === "ephod" ? 40 : 0));
    if (rock && !(rock.id === "hereth" && k4Has("k4_asked")) && !(rock.id === "ephod" && k4Has("k4_ephod"))) { k4AskScene(rock); return; }
  }
  // the way on is shut till he's asked (Hereth), till the floors are safe (to the town), till the question (the gate)
  const wall = (x, ok, say) => { if (!ok && d.x > x) { d.x = x; d.vx = Math.min(0, d.vx); k4Tell("wall" + x, say); } };
  if (r.id === "hereth") wall((r.c0 + r.w - 3) * T, k4Has("k4_asked"), "David won't go down to Keilah before he asks the LORD. The rock: Up.");
  // (Glen 11-17: "when this gate and the gate with oxen opens I should have to hit up to go in") the town's two gates
  //  stop him even open: Up at one, open, and through it he goes
  const gate = (x, open, to, say) => {
    if (d.x > x) { d.x = x; d.vx = Math.min(0, d.vx); if (!open) k4Tell("wall" + x, say); }
    if (open && d.onGround && d.x > x - K4.GATE_REACH && pressed("up") && !region.script.length && region.wait <= 0 && !region.trans) { k4.gateWalk = { t: 0, to, at: x + 100 }; d.vx = 0; d.charging = false; return true; }
    return false;
  };
  if (r.id === "floors" && gate((r.c0 + r.w - 9) * T, k4Has("k4_floors"), "town", "The raiders are still at the floors. Save the grain first!")) return;
  if (r.id === "town" && gate(k4.gateX, k4Has("k4_ephod"), "escape", k4Has("k4_saul") ? "Ask the LORD first: Abiathar has the ephod (Up by him)." : "Keilah is safe, and glad of it. Stay a while.")) return;
  if (r.id === "floors") k4RaidUpdate(dt);
  if (r.id === "escape") k4RunUpdate(dt);
  // the end (23:13-14)
  if (r.id === "hills" && k4Has("k4_escaped") && !k4Has("g_exit_open") && d.x > k4.endX && !region.script.length) {
    regionAdd("taken", "g_exit_open");
    rPlay([{ say: ["", "Then David and his men, who were about six hundred, arose and departed out of Keilah and went wherever they could go. (1 Samuel 23:13)"] },
      { say: ["", "Saul was told that David had escaped from Keilah; and he gave up going there. (1 Samuel 23:13)"] },
      { say: ["", "David stayed in the wilderness in the strongholds, and remained in the hill country in the wilderness of Ziph. Saul sought him every day, but God didn’t deliver him into his hand. (1 Samuel 23:14)"] },
      { fn() { jsceneOpen(true); } }]);
  }
}
function k4Hold(d, dt) {
  const R_ = k4.run;
  if (k4.gateWalk) { d.vx = 0; return true; }   // (turning into a gate)
  if (R_ && R_.grabT > 0) { R_.grabT -= dt; d.vx = 0; d.vy = Math.min(TUNE.MAX_FALL, d.vy + TUNE.GRAVITY * dt); collideBody(d, BODY_W, d.h, dt); return true; }
  if (R_ && R_.fail) { d.vx = 0; return true; }
  return false;
}

// ---------------------------------------------------------------------------------------------------------------------
// the threshing floors: waves of raiders (23:5)
function k4RaidStart() {
  if (k4.raid) return;
  k4.raid = { wave: 0, n: 0, t: 1.5, stolen: 0, rest: 0 };
  for (const f of k4.floors) f.sacks = K4.RAID.SACKS;
  k4Tell("raid", "The Philistines are at the threshing floors! Stop the raiders before they carry off the grain: sling, sword or bow.");
}
function k4RaidUpdate(dt) {
  const Rd = k4.raid, A = K4.RAID, d = david; if (!Rd || k4Has("k4_floors")) { k4.raiders.length = 0; return; }
  // more raiders, one at a time
  if (Rd.rest > 0) { Rd.rest -= dt; }
  else if (Rd.n < A.WAVES[Rd.wave]) {
    Rd.t -= dt;
    if (Rd.t <= 0) {
      Rd.t = A.EVERY * (0.8 + Math.random() * 0.4);
      const live = k4.floors.filter(f => f.sacks > 0); if (!live.length) return;
      // (a floor near David, or one far off: both, so he has to choose)
      const f = Rd.n % 2 ? live[Math.floor(Math.random() * live.length)] : live.reduce((a, b) => Math.abs(b.y - d.y) + Math.abs(b.x - d.x) * 0.3 < Math.abs(a.y - d.y) + Math.abs(a.x - d.x) * 0.3 ? b : a);
      const from = Math.abs(f.edge[0] - f.x) > Math.abs(f.edge[1] - f.x) ? f.edge[0] : f.edge[1];
      k4.raiders.push({ x: from, y: f.y, home: from, f, state: "walk", t: 0, alpha: 0, dir: Math.sign(f.x - from) || 1 });
      Rd.n++;
    }
  } else if (!k4.raiders.length) {   // the wave's over
    Rd.wave++; Rd.n = 0; Rd.t = 1; Rd.rest = A.REST;
    if (Rd.wave >= A.WAVES.length) { k4FloorsWon(); return; }
    toast(`More raiders coming! (${Rd.wave + 1} of ${A.WAVES.length})`);
  }
  for (const q of k4.raiders) {
    q.t += dt; q.alpha = Math.min(1, q.alpha + dt * 3);
    if (q.state === "walk") {
      q.x += q.dir * A.WALK * dt;
      if (Math.abs(q.x - q.f.x) < 30) { if (q.f.sacks > 0) { q.state = "grab"; q.t = 0; } else { q.state = "flee"; q.t = 0; q.dir = -q.dir; } }
      if (Math.abs(d.x - q.x) < A.HURT && Math.abs(d.y - q.y) < 40) hurtDavid(q.x);
    } else if (q.state === "grab") {
      if (q.t >= A.GRAB) { if (q.f.sacks > 0) { q.f.sacks--; q.carry = true; } q.state = "run"; q.t = 0; q.dir = Math.sign(q.home - q.x) || -q.dir; }
    } else if (q.state === "run") {
      q.x += q.dir * A.RUN * dt;
      if ((q.dir > 0 && q.x >= q.home) || (q.dir < 0 && q.x <= q.home)) {
        q.gone = true;
        if (q.carry) { Rd.stolen++; toast(`A raider got away with a sack of grain! (${Rd.stolen} of ${A.LOSE} lost)`); }
      }
    } else if (q.state === "hit" || q.state === "flee") {
      if (q.state === "hit" && q.t > 0.5) { q.state = "flee"; q.t = 0; }
      if (q.state === "flee") { q.x += q.dir * A.RUN * dt; q.alpha = Math.max(0, 1 - q.t / A.FADE); if (q.t > A.FADE) q.gone = true; }
    }
  }
  k4.raiders = k4.raiders.filter(q => !q.gone);
  if (Rd.stolen >= A.LOSE) {   // too much got away: this wave again (time, not a life)
    toast("Too much grain was carried off. Try that wave again!");
    k4.raiders.length = 0; Rd.n = 0; Rd.t = 2; Rd.stolen = 0; Rd.rest = A.REST;
    for (const f of k4.floors) f.sacks = A.SACKS;
  }
}
function k4FloorsWon() {
  k4.raiders.length = 0; regionAdd("taken", "k4_floors");
  rPlay([{ say: ["", "David and his men went to Keilah and fought with the Philistines, and brought away their livestock. So David saved the inhabitants of Keilah. (1 Samuel 23:5)"] },
    { fn() { toast("Keilah is saved! Its gate is open: go in."); } }]);
}
function k4StoneHits(s) {
  const r = region.room; if (!r) return false;
  if (r.id === "floors") for (const q of k4.raiders) {
    if (q.state === "hit" || q.state === "flee") continue;
    if (Math.abs(s.x - q.x) < K4.RAID.HIT && s.y < q.y + 4 && s.y > q.y - 230 * SCALE * K4.RAID.K) {
      if (q.carry) { q.carry = false; q.f.sacks = Math.min(K4.RAID.SACKS, q.f.sacks + 1); }   // (he drops it: back on the floor)
      q.state = "hit"; q.t = 0; q.dir = Math.sign(q.x - david.x) || 1; sfx("stone_hit", q.x, 0.4, 1.2);
      if (typeof stoneHit === "function") stoneHit(s, 0.6);
      return true;
    }
  }
  if (r.id === "escape") for (const p of k4.pots) if (!p.broken && Math.abs(s.x - p.x) < 30 && Math.abs(s.y - p.y) < 30) { p.broken = true; return true; }
  return false;
}

// ---------------------------------------------------------------------------------------------------------------------
// Out of Keilah: the run (23:13)
function k4RunStart() {
  const d = david, R_ = K4.RUN;
  k4.run = { on: true, done: false, fail: 0, grabT: 0, potT: 1.5, t: 0, close: (k4.runGate - k4.runStart) / R_.RUN + R_.SLACK, bumps: 0 };
  k4.throwers.length = 0;
  for (const g of k4.grabbers) Object.assign(g, { state: "wait", t: 0, x: g.x0 });
  k4.pots.length = 0;
  k4Tell("run", "Run! David runs by himself: A to jump the carts and gaps, Down + A to roll under the beams, and get past the men before the gate shuts.");
}
function k4RunUpdate(dt) {
  const R_ = k4.run, P = K4.RUN, d = david; if (!R_ || R_.done) return;
  if (d.deadT > 0) { R_.dead = true; return; }
  if (R_.dead) { k4RunStart(); return; }   // (back at the olive press at the street's start: from the top)
  if (R_.fail) {   // caught: back to the start of the street
    R_.fail += dt; region.fade = Math.min(1, R_.fail / (P.FAIL_FADE / 2));
    if (R_.fail > P.FAIL_FADE) { region.fade = 0; d.x = k4.runStart; d.y = FOOT - 4; d.vx = d.vy = 0; snapCamera(); k4RunStart(); }
    return;
  }
  R_.t += dt;
  const shut = Math.min(1, R_.t / R_.close);
  // the men of Keilah: they step out as he comes; one who's near him on the ground grabs and holds him
  for (const g of k4.grabbers) {
    g.t += dt; const dx = g.x - d.x;
    if (g.state === "wait" && dx > 0 && dx < P.STEP_IN) { g.state = "step"; g.t = 0; }
    if (g.state === "step") { g.x -= 60 * dt; if (Math.abs(g.x - d.x) < P.GRAB_NEAR && d.y > FOOT - 90 && d.state !== "roll" && R_.grabT <= 0) {
      g.state = "held"; g.t = 0; R_.grabT = P.GRAB; R_.bumps++; d.vx = 0;
      k4Tell("grab", "A man of Keilah grabs David! Jump over them, or roll past."); } }
    if (g.state === "step" && d.x > g.x + 30) { g.state = "miss"; g.t = 0; }   // (he jumped or rolled past: the man grabs air)
    if (g.state === "held" && R_.grabT <= 0) { g.state = "miss"; g.t = 0; }
  }
  // the beams across the street: roll under (Down + A)
  for (const b of k4.beams) {
    if (b.hit && d.x > b.x + 60) b.hit = false;
    if (!b.hit && Math.abs(d.x - b.x) < 24 && d.y > FOOT - P.BEAM_Y - 20 && d.state !== "roll" && d.state !== "crawl") {
      b.hit = true; R_.bumps++; d.x = b.x - 70; d.vx = 0; sfx("stone_hit", b.x, 0.4, 0.7);   // (time lost, not a heart)
      k4Tell("beam", "A beam across the street! Roll under it: Down + A while running.");
    }
  }
  // (Glen's townswoman, 11-15) a woman steps out ahead and throws a pot at him: aimed at where he'll be, give or take
  R_.potT -= dt;
  if (R_.potT <= 0) { R_.potT = P.POT * (0.7 + Math.random() * 0.6); k4.throwers.push({ x: d.x + 820 + Math.random() * 200, t: 0, thrown: false }); }
  for (const w of k4.throwers) {
    w.t += dt;
    if (!w.thrown && frameOf("townswoman_throw", w.t) >= P.THROW_AT) {
      w.thrown = true; const px = w.x - 40, py = FOOT - 150, T_ = P.POT_FLY;
      const aim = d.x + P.RUN * T_ + (Math.random() * 2 - 1) * P.POT_MISS;
      k4.pots.push({ x: px, y: py, vx: (aim - px) / T_, vy: ((FOOT - 10 - py) - 0.5 * P.POT_G * T_ * T_) / T_, broken: false, t: 0 });
    }
  }
  k4.throwers = k4.throwers.filter(w => w.x > d.x - 900);
  for (const p of k4.pots) {
    if (p.broken) { p.t += dt; continue; }
    if (p.vx != null) { p.x += p.vx * dt; p.y += p.vy * dt; p.vy += P.POT_G * dt; } else p.y += P.POT_V * dt;
    if (Math.abs(p.x - d.x) < 34 && p.y > d.y - 150 && p.y < d.y) { p.broken = true; hurtDavid(p.x); }
    if (p.y >= FOOT - 10) { p.broken = true; for (let i = 0; i < 6; i++) bits.push({ x: p.x, y: FOOT - 10, vx: (Math.random() - 0.5) * 300, vy: -Math.random() * 260, life: 0.6, color: i % 2 ? "#a0623a" : "#6e4024" }); }
  }
  k4.pots = k4.pots.filter(p => !p.broken || p.t < 0.1);
  // the gate
  if (d.x > k4.runGate - 30) {
    if (shut >= 1 || (shut > P.GATE_LOW && d.state !== "roll")) {
      if (shut >= 1) { R_.fail = 0.001; toast("The gate's shut! Back to the street: faster this time."); }
      else { d.x = k4.runGate - 80; d.vx = 0; k4Tell("gate", "The gate's nearly shut! Dive through the gap: Down + A."); }
    } else { R_.done = true; regionAdd("taken", "k4_escaped"); toast("Out of Keilah, into the night!"); }
  }
  R_.shut = shut;
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
function k4DrawDavid(d, x, y) {
  if (k4.gateWalk) {   // (as Adullam's tunnels) his back-turn clip, held on its last frame, his back to us, till the cut
    const n = SPR.david_back_turn ? "david_back_turn" : "david_turn_away", f = SPR[n] ? SPR[n].frames : 8;
    drawSprite(n, Math.min(f - 1, Math.floor(k4.gateWalk.t / K4.GATE_TURN * f)), x, y, d.facing); return true; }
  if (!k4.kneel) return false;
  return drawDavidPray(k4.kneel.t, x, y, d.facing);   // (Glen 11-16: he kneels, then prays with his hands together)
}
function k4Draw(camX) {
  const r = region.room; if (!r) return;
  const now = performance.now() / 1000;
  // the people
  for (const p of k4.people) {
    if (p.room !== r.id || (p.show && !p.show())) continue;
    const x = p.x - camX; if (x < -300 || x > W + 300) continue;
    const S = SPR[p.spr]; if (!S) continue;
    const hold = p.spr === "abiathar_talk" ? Math.min(K4.ABIATHAR_HOLD, S.frames - 1) : null;   // (Glen 11-17: his talk clip walks; he stands)
    drawSprite(p.spr, hold != null ? hold : p.still ? S.frames - 1 : frameOf(p.spr, p.t), x, p.y, p.dir, p.k);
  }
  // the livestock in the gate, once the floors are safe
  if (k4Has("k4_floors")) for (const h of k4.herd) if (h.room === r.id && SPR[h.spr]) drawSprite(h.spr, frameOf(h.spr, now), h.x - camX, h.y, h.dir, h.spr.startsWith("ox_") ? 1.3 : 0.9);
  // the town gate from outside (shut till the floors are safe), and the inner gate (shut till the ephod's question)
  if (r.id === "floors") {
    const gx = (r.c0 + r.w - 9) * T + 100 - camX;
    k4DrawGate(gx, k4Has("k4_floors") ? 0 : 1);
    // (Glen 11-17: "a stone wall on the right of the gate so we don't see the oxen's butt, like it is an actual gated
    //  wall") Keilah's town wall, his coursed stone stacked (tools: w4_town_wall), from the gate's right post on
    const im = kitImg("w4_town_wall"), G = K4_GATE, gw = G.day.w * G.H.day / G.day.h;
    if (im) ctx.drawImage(im, gx + gw / 2 - 26, FOOT + 4 - 480, 460, 480);
  }
  if (r.id === "town") k4DrawGate(k4.gateX + 100 - camX, k4Has("k4_ephod") ? 0 : 1);
  // the threshing floors: a round floor of beaten stone, its grain heaped on it
  if (r.id === "floors") for (const f of k4.floors) {
    const x = f.x - camX; if (x < -300 || x > W + 300) continue;
    // (Glen's floor, 11-15: its stone curb sunk a little, the sacks on its beaten earth, 25 px up)
    const fl = kitImg("w4_threshing_floor"), K = K4_KIT.w4_threshing_floor;
    if (fl) ctx.drawImage(fl, x - K.w / 2, f.y + 8 - K.h, K.w, K.h);
    const taking = k4.raiders.some(q => q.f === f && q.state === "grab" && SPR.raider_pickup) ? 1 : 0;   // (his clip has the sack he picks up: one less on the floor)
    for (let i = 0; i < f.sacks - taking; i++) drawItem(i === 1 ? "grain_sacks" : "grain_sack", x + (i - 1) * 78, f.y - 22, i === 1 ? 0.15 : 0.42);
    if (f.sacks === 0) drawItem("grain_sacks_broken", x, f.y - 22, 0.15);
  }
  // the beams and carts' men (Out of Keilah)
  if (r.id === "escape") {
    for (const b of k4.beams) {
      const x = b.x - camX; if (x < -300 || x > W + 300) continue;
      // (Glen's log, 11-15: hung across the street on ropes from the roofs, seen end on; its ropes' top rows drawn on up)
      const k = K4_KIT.w4_hanging_log, im = kitImg("w4_hanging_log"), bot = FOOT - K4.RUN.BEAM_Y, top = bot - k.h;
      if (im) { ctx.drawImage(im, 0, 0, k.w, 4, x - k.w / 2, top - 700, k.w, 701); ctx.drawImage(im, x - k.w / 2, top, k.w, k.h); }
    }
    // the gate (Glen's stone kit): swinging shut as he runs
    { const sh = k4.run ? (k4.run.done ? 0 : k4.run.shut || 0) : 0; k4DrawGate(k4.runGate - camX, sh); }
  }
}
// (Glen's gate, 11-14: his gate in four stages, day and night, cut by tools/cut_stages.py: 0 shut and barred, 1 swinging
//  shut with a gap left, 2 half open, 3 open) x is the doorway's middle; shut 0 (open) to 1 (shut)
const K4_GATE = { H: { day: 560, night: 520 },   // how tall the gate stands (px)
  day: { w: 276, h: 483 }, night: { w: 404, h: 359 } };
function k4DrawGate(x, shut) {
  if (x < -600 || x > W + 600) return;
  const r = region.room, night = r && (typeof r.nightArt === "function" ? r.nightArt() : r.nightArt), v = night ? "night" : "day";
  const f = shut >= 0.97 ? 0 : shut > K4.RUN.GATE_LOW ? 1 : shut > 0.2 ? 2 : 3;   // (1: the gap to dive through on the run)
  const im = kitImg("w4_gstage_" + v + "_" + f); if (!im) return;
  const G = K4_GATE[v], h = K4_GATE.H[v], w = G.w * h / G.h;
  ctx.drawImage(im, x - w / 2, FOOT - h, w, h);
}
function k4DrawFront(camX) {
  const r = region.room; if (!r) return;
  // (Glen 11-17: "put an arrow above him like the other main characters that talk") Abiathar, waiting with the ephod
  if (r.id === "town" && k4Has("k4_saul") && !k4Has("k4_ephod") && !region.script.length && k4.abiathar) upHint(k4.abiathar.x - camX, FOOT - 175);
  // (Glen 11-17) at an open gate: Up to go through
  { const gx = r.id === "floors" && k4Has("k4_floors") ? (r.c0 + r.w - 9) * T : r.id === "town" && k4Has("k4_ephod") ? k4.gateX : null;
    if (gx != null && !region.script.length && !k4.gateWalk && david.x > gx - K4.GATE_REACH) upHint(gx + 100 - camX, FOOT - 330); }
  if (r.id === "floors") for (const q of k4.raiders) {
    const x = q.x - camX; if (x < -300 || x > W + 300) continue;
    let n = "raider_run", i = frameOf(n, q.t);
    // (Glen's clip, 11-17: he stops, picks up the sack, swings it onto his shoulder, and runs off with it on his back)
    if (q.state === "grab" && SPR.raider_pickup) { n = "raider_pickup"; i = Math.min(SPR.raider_pickup.frames - 1, Math.floor(q.t / K4.RAID.GRAB * SPR.raider_pickup.frames)); }
    else if (q.state === "run" && q.carry && SPR.raider_sack_run) { n = "raider_sack_run"; i = frameOf(n, q.t); }
    else if (q.state === "grab") { n = "raider_grab"; i = Math.min(2, Math.floor(q.t / K4.RAID.GRAB * 3)); }
    else if (q.state === "hit") { n = "raider_hit"; i = 0; }
    else if (q.state === "flee" || q.state === "run") { n = "raider_flee"; i = frameOf(n, q.t); }
    drawSprite(n, i, x, q.y, q.dir, 1, q.alpha);
    if (q.carry && n !== "raider_sack_run") drawItem("grain_sack", x + q.dir * 10, q.y - 120, 0.35, q.alpha);
  }
  if (r.id === "escape") {
    for (const g of k4.grabbers) {
      const x = g.x - camX; if (x < -300 || x > W + 300) continue;
      // (Glen's townsman, 11-15: standing in his doorway, lunging with both arms out, then stumbling and catching himself)
      if (SPR.townsman_grab && SPR.townsman_stumble) {
        const n = g.state === "wait" ? "townsman_stumble" : g.state === "miss" ? "townsman_stumble" : "townsman_grab";
        const i = g.state === "wait" ? SPR.townsman_stumble.frames - 1 : g.state === "miss" ? frameOf(n, g.t) : Math.min(7, frameOf(n, g.t));
        drawSprite(n, i, x, FOOT, -1, K4.NPC_K * K4.SIZE.townsman); continue;
      }
      if (g.state === "miss") continue;
      const n = g.spr + (g.state === "wait" ? "_stand" : "_run"), S = SPR[n] || SPR[g.spr + "_run"]; if (!S) continue;
      drawSprite(SPR[n] ? n : g.spr + "_run", g.state === "wait" ? 0 : frameOf(SPR[n] ? n : g.spr + "_run", g.t), x, FOOT, -1, K4.NPC_K);
    }
    for (const w of k4.throwers) if (SPR.townswoman_throw) drawSprite("townswoman_throw", frameOf("townswoman_throw", w.t), w.x - camX, FOOT, -1, K4.NPC_K * K4.SIZE.townswoman);
    for (const p of k4.pots) if (!p.broken) drawItem("camp_jar_small", p.x - camX, p.y, 0.4);
  }
}
// the night (ramah.js's wash): moonlit over the room, clear round the lamps, the torches and David
const K4_DARK = typeof document !== "undefined" ? document.createElement("canvas") : null;
function k4DrawOver() {
  const r = region.room; if (!r || !K4_DARK) return;
  const n = typeof r.night === "function" ? r.night() : r.night; if (!n) return;
  if (K4_DARK.width !== W) { K4_DARK.width = W; K4_DARK.height = H; }
  const g = K4_DARK.getContext("2d");
  g.globalCompositeOperation = "source-over"; g.clearRect(0, 0, W, H);
  const na = typeof r.nightArt === "function" ? r.nightArt() : r.nightArt;
  g.fillStyle = `rgb(${na ? K4.NIGHT_ART : K4.NIGHT})`; g.fillRect(0, 0, W, H);
  const lamps = k4.lights.filter(l => l.room === r.id).map(l => [l.x, l.y, l.r]);
  // (no torch glow) round David, and round the men of Keilah on the run so you can see them coming (11-15)
  const seen = [[david.x, david.y - 60, 140], ...(r.id === "escape" ? [...k4.grabbers, ...k4.throwers].map(m => [m.x, FOOT - 90, 120]) : [])];
  g.globalCompositeOperation = "destination-out";
  for (const [x, y, rad] of [...lamps, ...seen]) {
    const sx = x - camX, sy = y - camY; if (sx < -rad || sx > W + rad || sy < -rad || sy > H + rad) continue;
    const rg = g.createRadialGradient(sx, sy, 4, sx, sy, rad); rg.addColorStop(0, "rgba(0,0,0,0.95)"); rg.addColorStop(0.5, "rgba(0,0,0,0.6)"); rg.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = rg; g.fillRect(sx - rad, sy - rad, rad * 2, rad * 2);
  }
  ctx.save(); ctx.globalCompositeOperation = "multiply"; ctx.drawImage(K4_DARK, 0, 0);
  ctx.globalCompositeOperation = "lighter";
  for (const [x, y, rad] of lamps) {
    const sx = x - camX, sy = y - camY; if (sx < -rad || sx > W + rad || sy < -rad || sy > H + rad) continue;
    const rg = ctx.createRadialGradient(sx, sy, 2, sx, sy, rad * 0.6); rg.addColorStop(0, "rgba(255,170,80,0.22)"); rg.addColorStop(1, "rgba(255,150,60,0)");
    ctx.fillStyle = rg; ctx.fillRect(sx - rad, sy - rad, rad * 2, rad * 2);
  }
  ctx.restore();
  // the gate's clock, while he runs
  const R_ = k4.run;
  if (r.id === "escape" && R_ && !R_.done) {
    ctx.save(); ctx.fillStyle = "rgba(20,12,6,0.7)"; ctx.fillRect(W / 2 - 160, 18, 320, 34);
    ctx.fillStyle = "#c0392b"; ctx.fillRect(W / 2 - 150, 28, 300 * (R_.shut || 0), 14);
    ctx.strokeStyle = "#ffe08a"; ctx.strokeRect(W / 2 - 150, 28, 300, 14);
    ctx.fillStyle = "#ffe08a"; ctx.font = "bold 14px Georgia, serif"; ctx.textAlign = "center"; ctx.fillText("The gate is closing", W / 2, 66);
    ctx.restore();
  }
}
