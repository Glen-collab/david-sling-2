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
  ASK: { NEAR: 90, KNEEL_MS: 161 },   // the prayer rock: px from it to kneel (Up); david_kneel's frame time
  // (Glen 11-14: "We can build multiple floors to defend like the caves. That was fun.") the raiders: each wave's count,
  //  one every EVERY s; their walk and their run with a sack (px/s); a grab takes GRAB s; each floor's sacks; the wave's
  //  lost if LOSE sacks get away; REST s between waves; HURT: px from David that knocks him (while they walk at him)
  RAID: { WAVES: [5, 7, 9], EVERY: 2.0, WALK: 120, RUN: 210, GRAB: 1.6, SACKS: 3, LOSE: 5, REST: 3, K: 1.1, HIT: 54, HURT: 40, FADE: 0.8 },
  // (Glen 11-14: "a runner like we did in David 1 but challenging too") the escape: a grab holds him GRAB s; pots fall
  //  every POT s (px/s down: POT_V); the gate shuts SLACK s after the time a clean run takes; under GATE_LOW of it closed
  //  he runs through, past it he has to roll; RUN: his speed (px/s) for the clock
  RUN: { GRAB: 1.0, GRAB_NEAR: 46, STEP_IN: 190, POT: 3.2, POT_V: 480, SLACK: 7, GATE_LOW: 0.55, BEAM_Y: 130, RUN: 380, FAIL_FADE: 1.2 },
  NIGHT: [38, 48, 92],   // the night wash (as ramah.js)
};

const KEILAH = {
  key: "keilah", name: "Keilah", start: "hereth", carry: ["gibeah", "ramah", "nobgath", "adullam"],
  strCap: 8,
  rooms: [
    // (stand-ins till Glen's: the hills of World 3's road for the forest, his Fields for the floors, Gibeah's town)
    { id: "hereth", name: "The Forest of Hereth", w: 130, bg: "w4_1", mx: 0, my: 1, mw: 3, right: "road",
      far: "w3/road/far", mid: "w3/road/mid.png", midY: 0, near: "w3/near_gath.png", floor: "w3/road/ground.png" },
    { id: "road", name: "The Road Down to Keilah", w: 150, bg: "w4_1", mx: 3, my: 1, mw: 3, left: "hereth", right: "floors",
      far: "gibeah/fields_far", mid: "gibeah/fields_mid.png", midY: 24, near: "w3/near_nob.png" },
    { id: "floors", name: "The Threshing Floors", w: 110, up: 26, bg: "w4_1", mx: 6, my: 0, mw: 3, mh: 2, left: "road", right: "town",
      far: "gibeah/fields_far", mid: "gibeah/fields_mid.png", midY: 24 },
    { id: "town", name: "Keilah", w: 110, bg: "w4_3", mx: 9, my: 1, mw: 3, left: "floors", right: "escape", night: () => k4Has("k4_ephod"),
      far: "gibeah/fields_far", mid: "gibeah/town_mid.png", midY: 12 },
    { id: "escape", name: "Out of Keilah", w: 230, bg: "w4_3", mx: 12, my: 1, mw: 5, left: "town", right: "hills", night: () => true,
      far: "gibeah/fields_far", mid: "gibeah/town_mid.png", midY: 12 },
    { id: "hills", name: "The Wilderness", w: 60, bg: "w4_1", mx: 17, my: 1, mw: 2, left: "escape", night: () => true,
      far: "w3/road/far", mid: "w3/road/mid.png", midY: 0, floor: "w3/road/ground.png" },
  ],
  // the Journal: Glen's song, the Bridge (SONG_PSALM57.md, his words exactly): out of Keilah by night, toward the dawn
  steps: ["k4_asked", "k4_floors", "k4_ephod", "k4_escaped"],
  verse: ["Awake, my glory, awake", "Awake, my harp, awake", "I will awaken the dawn", "I will praise You, Lord",
    "Among the nations I will sing", "Among the people praise Your name", "Your loving kindness reaches heaven", "Your truth will never change"],
  // (draft words, for Glen) what David writes
  entries: [
    ["The Philistines were robbing Keilah's threshing floors. I asked the LORD, and my men were afraid, so I asked again. \"Arise, go down to Keilah.\"", "1 Samuel 23:1-4"],
    ["We went down and fought the Philistines, and brought away their livestock. The LORD saved Keilah.", "1 Samuel 23:5"],
    ["Abiathar came with the ephod. Saul was coming. I asked the LORD, and He told me the truth: they would hand me over.", "1 Samuel 23:6-12"],
    ["Six hundred of us went out of Keilah, wherever we could go. God didn't deliver me into Saul's hand.", "1 Samuel 23:13-14"],
  ],
  end: ["Saul sought him every day, but God didn't deliver him into his hand.", "1 Samuel 23:14"],
  build: R => k4Build(R), enter: r => k4Enter(r), update: (dt, r) => k4Update(dt, r), holdDavid: (d, dt) => k4Hold(d, dt),
  drawDavid: (d, x, y) => k4DrawDavid(d, x, y), draw: camX => k4Draw(camX), drawFront: camX => k4DrawFront(camX),
  drawOver: () => k4DrawOver(), stoneHits: s => k4StoneHits(s),
};

const k4 = { told: {}, people: [], rocks: [], floors: [], raiders: [], raid: null, kneel: null, run: null, beams: [], grabbers: [], pots: [], lights: [], herd: [] };
const k4Has = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function k4Tell(k, text) { if (!k4.told[k]) { k4.told[k] = true; toast(text); } }
// someone standing about: their sprite (looped), x, the ground they stand on, facing; show: only when this is true
function k4Person(room, spr, x, y = FOOT, dir = 1, show = null, k = K4.NPC_K) { const p = { room, spr, x, y, dir, show, k, t: Math.random() * 3 }; k4.people.push(p); return p; }
// (Part Two's own: main.js held("right")) Out of Keilah runs by itself, as Part One's Rout did
function regionAutoRun() {
  return typeof REGION_KEY !== "undefined" && REGION_KEY === "keilah" && !!region.room && region.room.id === "escape" && !!k4.run && k4.run.on && !k4.run.done && !k4.run.fail && david.deadT <= 0 && !(k4.run.grabT > 0);
}

// ---------------------------------------------------------------------------------------------------------------------
// building
function k4Build(R) {
  k4.people.length = k4.rocks.length = k4.floors.length = k4.raiders.length = k4.beams.length = k4.grabbers.length = k4.pots.length = k4.lights.length = k4.herd.length = 0;
  k4.raid = null; k4.run = null; k4.kneel = null;
  for (const n of ["raider_run", "raider_grab", "raider_flee", "raider_hit"]) TUNE.SPRITE_SIZE[n] = K4.RAID.K;
  ["w3_cart", "w3_hide_sacks", "c_beam", "t_house", "t_stall"].forEach(kitImg);
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
    region.props.push({ room: rm, n: "f_rock", x: X(42) - KIT.f_rock.w / 2, y: FOOT - KIT.f_rock.h + 10 });
    // past the rock: the woods, up and down (the way's shut till he's asked: k4Update)
    rOliveTree(rm, c + 52); oliveRow(c + 63, onTop(FOOT - KIT.f_olive.h + 328) - 0.4, 3);
    rBoulder(rm, c + 70);
    rWild("caracal", rm, c + 78, { range: 6 * T });
    { const c1 = rTerrace(rm, c + 82, 2); oliveRow(c + 84, onTop(FOOT - 136) - 0.4, c1 - c - 85); }
    rLedge(rm, c + 92, 470, 4); rLedge(rm, c + 97, 360, 4); rRelic("k4_pom_hereth", "pomegranate", c + 99, onTop(360));
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
    rLowWall(rm, c + 30); rPhil(rm, c + 40, G, 5);
    rHole(rm, c + 46, 3);
    rLedge(rm, c + 50, 470, 5); rLedge(rm, c + 57, 350, 4); rRelic("k4_stone_road", "stone", c + 59, onTop(350));
    rBoulder(rm, c + 64); rPhil(rm, c + 74, G, 6);
    campfire(c + 82, GR - 1);
    { const c1 = rTerrace(rm, c + 88, 4); rPhil(rm, Math.round((c + 88 + c1) / 2), FOOT - 136, 4); oliveRow(c + 90, onTop(FOOT - 136) - 0.4, 6); }
    rHole(rm, c + 106, 4); rLedge(rm, c + 106, 480, 4);
    rOliveTree(rm, c + 114); rPhil(rm, c + 128, G, 5);
    rWild("viper", rm, c + 136);
    rBreak("jar", rm, c + 142, 16); oliveRow(c + 140, 16, 5);
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
    for (const [n, k] of [["sheep2_graze", 104], ["goat_stand", 106], ["sheep_graze", 102]]) k4.herd.push({ room: rm, spr: n, x: X(k), y: FOOT, dir: -1 });
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
    rDeco(rm, "t_house", c + 30);
    k4Person(rm, "villager_girl_stand", X(44), FOOT, -1, () => !k4Has("k4_ephod"));
    k4Person(rm, "villager_boy_stand", X(46), FOOT, -1, () => !k4Has("k4_ephod"));
    rAwning(rm, c + 50); rRoof(rm, X(57), 330, 1); rRelic("k4_oil_town", "oil", c + 59, onTop(330));
    k4.abiathar = k4Person(rm, "abiathar_talk", X(66), FOOT, -1, () => k4Has("k4_floors"));
    k4.rocks.push({ id: "ephod", room: rm, x: X(68) });   // (the ephod: Up by Abiathar)
    for (const k of [72, 76, 80]) k4Person(rm, ["soldier_talk", "soldier2_fear", "soldier4_fear"][k % 3], X(k), FOOT, k % 2 ? 1 : -1).still = k !== 72;
    rDeco(rm, "t_house", c + 86); rDeco(rm, "t_jars", c + 94);
    k4Person(rm, "villager_staffman_stand", X(92), FOOT, -1, () => !k4Has("k4_ephod"));
    k4.lights.push({ room: rm, x: X(22), y: G - 40, r: 300 }, { room: rm, x: X(66), y: G - 120, r: 260 });
    rBreak("basket", rm, c + 100, 16); rBreak("jar", rm, c + 102, 16);
    k4.gateX = X(107);   // (shut till the ephod's question: k4Update)
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
    rPlay([{ say: ["David", "Bring the ephod here. (1 Samuel 23:9)"] }, { wait: 1.0 },
      { say: ["David", "O LORD, the God of Israel, your servant has surely heard that Saul seeks to come to Keilah to destroy the city for my sake. (1 Samuel 23:10)"] },
      { say: ["David", "Will the men of Keilah deliver me up into his hand? Will Saul come down, as your servant has heard? (1 Samuel 23:11)"] },
      { say: ["", "The LORD said, “He will come down.” (1 Samuel 23:11)"] },
      { say: ["David", "Will the men of Keilah deliver me and my men into the hand of Saul? (1 Samuel 23:12)"] },
      { say: ["", "The LORD said, “They will deliver you up.” (1 Samuel 23:12)"] },
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
  // Up by the rock (or Abiathar): ask
  if (!region.script.length && region.wait <= 0 && !region.trans && d.onGround && pressed("up")) {
    const rock = k4.rocks.find(o => o.room === r.id && Math.abs(d.x - o.x) < K4.ASK.NEAR + (o.id === "ephod" ? 40 : 0));
    if (rock && !(rock.id === "hereth" && k4Has("k4_asked")) && !(rock.id === "ephod" && k4Has("k4_ephod"))) { k4AskScene(rock); return; }
  }
  // the way on is shut till he's asked (Hereth), till the floors are safe (to the town), till the question (the gate)
  const wall = (x, ok, say) => { if (!ok && d.x > x) { d.x = x; d.vx = Math.min(0, d.vx); k4Tell("wall" + x, say); } };
  if (r.id === "hereth") wall((r.c0 + r.w - 3) * T, k4Has("k4_asked"), "David won't go down to Keilah before he asks the LORD. The rock: Up.");
  if (r.id === "floors") wall((r.c0 + r.w - 3) * T, k4Has("k4_floors"), "The raiders are still at the floors. Save the grain first!");
  if (r.id === "town") wall(k4.gateX, k4Has("k4_ephod"), k4Has("k4_saul") ? "Ask the LORD first: Abiathar has the ephod (Up by him)." : "Keilah is safe, and glad of it. Stay a while.");
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
    if (g.state === "held" && R_.grabT <= 0) g.state = "done";
  }
  // the beams across the street: roll under (Down + A)
  for (const b of k4.beams) {
    if (b.hit && d.x > b.x + 60) b.hit = false;
    if (!b.hit && Math.abs(d.x - b.x) < 24 && d.y > FOOT - P.BEAM_Y - 20 && d.state !== "roll" && d.state !== "crawl") {
      b.hit = true; R_.bumps++; d.x = b.x - 70; d.vx = 0; sfx("stone_hit", b.x, 0.4, 0.7);   // (time lost, not a heart)
      k4Tell("beam", "A beam across the street! Roll under it: Down + A while running.");
    }
  }
  // pots thrown down from the roofs, ahead of him
  R_.potT -= dt;
  if (R_.potT <= 0) { R_.potT = P.POT * (0.7 + Math.random() * 0.6); k4.pots.push({ x: d.x + 260 + Math.random() * 260, y: -40, broken: false, t: 0 }); }
  for (const p of k4.pots) {
    if (p.broken) { p.t += dt; continue; }
    p.y += P.POT_V * dt;
    if (Math.abs(p.x - d.x) < 34 && p.y > d.y - 150 && p.y < d.y) { p.broken = true; hurtDavid(p.x); }
    if (p.y >= FOOT - 10) { p.broken = true; for (let i = 0; i < 6; i++) bits.push({ x: p.x, y: FOOT - 10, vx: (Math.random() - 0.5) * 300, vy: -Math.random() * 260, life: 0.6, color: i % 2 ? "#a0623a" : "#6e4024" }); }
  }
  k4.pots = k4.pots.filter(p => !p.broken || p.t < 0.1);
  // the gate
  if (d.x > k4.runGate - 30) {
    if (shut >= 1 || (shut > P.GATE_LOW && d.state !== "roll")) {
      if (shut >= 1) { R_.fail = 0.001; toast("The gate's shut! Back to the street: faster this time."); }
      else { d.x = k4.runGate - 80; d.vx = 0; k4Tell("gate", "The gate's half shut! Roll under it: Down + A."); }
    } else { R_.done = true; regionAdd("taken", "k4_escaped"); toast("Out of Keilah, into the night!"); }
  }
  R_.shut = shut;
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
function k4DrawDavid(d, x, y) {
  if (!k4.kneel || !SPR.david_kneel) return false;
  drawSprite("david_kneel", Math.min(SPR.david_kneel.frames - 1, Math.floor(k4.kneel.t * 1000 / K4.ASK.KNEEL_MS)), x, y, d.facing);
  return true;
}
function k4Draw(camX) {
  const r = region.room; if (!r) return;
  const now = performance.now() / 1000;
  // the people
  for (const p of k4.people) {
    if (p.room !== r.id || (p.show && !p.show())) continue;
    const x = p.x - camX; if (x < -300 || x > W + 300) continue;
    const S = SPR[p.spr]; if (!S) continue;
    drawSprite(p.spr, p.still ? S.frames - 1 : frameOf(p.spr, p.t), x, p.y, p.dir, p.k);
  }
  // the livestock in the gate, once the floors are safe
  if (k4Has("k4_floors")) for (const h of k4.herd) if (h.room === r.id && SPR[h.spr]) drawSprite(h.spr, frameOf(h.spr, now), h.x - camX, h.y, h.dir, 0.9);
  // the threshing floors: a round floor of beaten stone, its grain heaped on it
  if (r.id === "floors") for (const f of k4.floors) {
    const x = f.x - camX; if (x < -300 || x > W + 300) continue;
    ctx.save(); ctx.fillStyle = "rgba(120,98,70,0.85)"; ctx.beginPath(); ctx.ellipse(x, f.y - 6, 120, 16, 0, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = "rgba(70,55,38,0.9)"; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
    for (let i = 0; i < f.sacks; i++) drawItem(i === 1 ? "grain_sacks" : "grain_sack", x + (i - 1) * 62, f.y - 4, i === 1 ? 0.15 : 0.42);
    if (f.sacks === 0) drawItem("grain_sacks_broken", x, f.y - 4, 0.15);
  }
  // the beams and carts' men (Out of Keilah)
  if (r.id === "escape") {
    for (const b of k4.beams) {
      const x = b.x - camX; if (x < -300 || x > W + 300) continue;
      // (a timber hung across the street on ropes from the roofs: Gibeah's cellar beam)
      const k = KIT.c_beam, im = kitImg("c_beam"), bot = FOOT - K4.RUN.BEAM_Y;
      ctx.save(); ctx.strokeStyle = "#3b2a1c"; ctx.lineWidth = 4; ctx.beginPath();
      ctx.moveTo(x - 70, bot - k.h * 0.6); ctx.lineTo(x - 90, bot - 700); ctx.moveTo(x + 70, bot - k.h * 0.6); ctx.lineTo(x + 90, bot - 700); ctx.stroke(); ctx.restore();
      if (im) ctx.drawImage(im, x - k.w / 2, bot - k.h, k.w, k.h);
    }
    // the gate: two leaves swinging shut
    { const x = k4.runGate - camX, sh = k4.run ? (k4.run.done ? 0 : k4.run.shut || 0) : 0;
      if (x > -400 && x < W + 400) {
        ctx.save(); ctx.fillStyle = "#5c5246"; ctx.fillRect(x - 120, FOOT - 420, 40, 420); ctx.fillRect(x + 80, FOOT - 420, 40, 420); ctx.fillRect(x - 120, FOOT - 460, 240, 50);
        const leaf = 80 * sh; ctx.fillStyle = "#4a3221"; ctx.fillRect(x - 80, FOOT - 300 + (1 - sh) * 0, leaf, 300); ctx.fillRect(x + 80 - leaf, FOOT - 300, leaf, 300);
        ctx.restore(); } }
  }
}
function k4DrawFront(camX) {
  const r = region.room; if (!r) return;
  if (r.id === "floors") for (const q of k4.raiders) {
    const x = q.x - camX; if (x < -300 || x > W + 300) continue;
    let n = "raider_run", i = frameOf(n, q.t);
    if (q.state === "grab") { n = "raider_grab"; i = Math.min(2, Math.floor(q.t / K4.RAID.GRAB * 3)); }
    else if (q.state === "hit") { n = "raider_hit"; i = 0; }
    else if (q.state === "flee" || q.state === "run") { n = "raider_flee"; i = frameOf(n, q.t); }
    drawSprite(n, i, x, q.y, q.dir, 1, q.alpha);
    if (q.carry) drawItem("grain_sack", x + q.dir * 10, q.y - 120, 0.35, q.alpha);
  }
  if (r.id === "escape") {
    for (const g of k4.grabbers) {
      const x = g.x - camX; if (x < -300 || x > W + 300 || g.state === "done") continue;
      const n = g.spr + (g.state === "wait" ? "_stand" : "_run"), S = SPR[n] || SPR[g.spr + "_run"]; if (!S) continue;
      drawSprite(SPR[n] ? n : g.spr + "_run", g.state === "wait" ? 0 : frameOf(SPR[n] ? n : g.spr + "_run", g.t), x, FOOT, -1, K4.NPC_K);
    }
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
  g.fillStyle = `rgb(${K4.NIGHT})`; g.fillRect(0, 0, W, H);
  const lamps = k4.lights.filter(l => l.room === r.id).map(l => [l.x, l.y, l.r]);
  lamps.push([david.x, david.y - 60, 140]);
  g.globalCompositeOperation = "destination-out";
  for (const [x, y, rad] of lamps) {
    const sx = x - camX, sy = y - camY; if (sx < -rad || sx > W + rad || sy < -rad || sy > H + rad) continue;
    const rg = g.createRadialGradient(sx, sy, 4, sx, sy, rad); rg.addColorStop(0, "rgba(0,0,0,0.95)"); rg.addColorStop(0.5, "rgba(0,0,0,0.6)"); rg.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = rg; g.fillRect(sx - rad, sy - rad, rad * 2, rad * 2);
  }
  ctx.save(); ctx.globalCompositeOperation = "multiply"; ctx.drawImage(K4_DARK, 0, 0);
  ctx.globalCompositeOperation = "lighter";
  for (const [x, y, rad] of lamps.slice(0, -1)) {
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
