// World 5, part one: Ziph (1 Samuel 23:15-29; ZIPH_PLAN.md). Part Two's sixth region, on region.js's engine like
// keilah.js: loaded before region.js, which takes ZIPH as its REGION when the address is "#9-10".
//
// First pass (11-15): all five rooms in Glen's own layers (ART_PROMPTS_ZIPH.md), his kit, his Erem (erem_*: lying hurt,
// waking, sitting, drinking, talking, getting up, standing in the wind) and his Ziphite lookout (ziphite_point, _run).
//
//   The Hills of Ziph (Saul seeks him every day: sneak past his men, rock to rock) -> The Woods of Horesh (Jonathan's
//   last visit, 23:16-18; the stranger with no name) -> The Hill of Hachilah (the Ziphites' lookouts and signal fires,
//   23:19-23) -> The Wilderness of Maon (the Arabah: a breather, 23:24-25) -> The Mountain (surrounded: hold out till
//   the messenger comes, 23:26-28; Sela Hammahlekoth; on to En-Gedi, 23:29; the Journal; the land map)

const Z5 = {
  RUBBLE_DOWN: 46,
  EREM_LIMP: 95,   // px/s: the stranger limping over to the men's fire (Glen 11-17)   // px the hiding rubble is sunk into the near ground (Glen 11-17)
  NPC_K: 0.9,
  // Saul's men in the hills (as nobgath.js's Gath streets): walk, stop and look, turn
  SNEAK: { WALK: 62, LOOK: 2.0, TURN: 0.45, SIGHT: 8, SIGHT_LOW: 2.2, SEEN_T: 0.6, NEAR: 30, CAUGHT_FADE: 1.4, K: 1.15 },
  // the Ziphites' lookouts: how far they see (tiles), the "!" before they run, their run to the fire (px/s); a fire lit
  //  brings Saul's men (back to the press)
  LOOK: { SIGHT: 9, SIGHT_LOW: 2.2, SPOT_T: 0.9, RUN: 230, K: 0.95, FIRE_K: 0.55, HIT: 60, FADE: 1.0 },
  // the mountain: END s till the messenger; the two fronts close from the room's ends to GAP tiles either side of the
  //  middle; a scout comes through a cleft every SCOUT s and walks SCOUT_FOR s; a front pushes him back PUSH px (a heart)
  CLEFT_K: 1.3,   // the clefts on the mountain (w4_arch_sand), how big
  // (Glen 11-17: "the soldiers were way too slow and I wasn't sure what was going on with the cave mouths ... faster and
  //  more diving and running and hiding") 40 s, not 55; every SURGE s both lines rush in RUSH cols over RUSH_T s; a cleft
  //  shows dust and a "!" WARN s before its scout runs out (SCOUT_RUN px/s for SCOUT_DASH s), one every SCOUT s
  // (Glen 11-17: "too short ... waiting for the 'hold on' to fill up and the soldiers are walking in place") a wider
  //  mountain (260 cols), and the lines close at a steady pace the whole END s, meeting GAP cols either side of the
  //  middle just as the messenger comes; a rush only gets them there sooner (RUSH_SHARE of the way is theirs)
  ESCAPE_ROCK: { K: 0.78, DOWN: 48 },   // (Glen 11-17) the split rock: its size, and px sunk into the near ground
  SIEGE: { END: 60, GAP: 7, RUSH_SHARE: 0.15, SCOUT: 3.6, SCOUT_FOR: 6, SCOUT_BEAT: 4, PUSH: 150, HURT_COOL: 1.2, K: 1.15,
    SURGE: 6, RUSH: 3, RUSH_T: 0.8, WARN: 1.0, SCOUT_RUN: 270, SCOUT_DASH: 0.9 },
};

const ZIPH = {
  key: "ziph", name: "Ziph", start: "hills", carry: ["gibeah", "ramah", "nobgath", "adullam", "keilah"],
  strCap: 8,
  rooms: [
    { id: "hills", name: "The Hills of Ziph", w: 160, bg: "w4_1", mx: 0, my: 1, mw: 4, right: "horesh",
      far: "ziph/hills/far", mid: "ziph/hills/mid.png", midY: 0, near: "ziph/hills/near.png" },   // (Glen's, 11-15)
    { id: "horesh", name: "The Woods of Horesh", w: 120, bg: "w4_1", mx: 4, my: 1, mw: 3, left: "hills", right: "hachilah",
      far: "ziph/horesh/far", mid: "ziph/horesh/mid.png", midY: 0, near: "ziph/horesh/near.png" },   // (Glen's, 11-15)
    { id: "hachilah", name: "The Hill of Hachilah", w: 150, up: 24, bg: "w4_1", mx: 7, my: 0, mw: 4, mh: 2, left: "horesh", right: "maon",
      far: "ziph/hachilah/far", mid: "ziph/hachilah/mid.png", midY: 0, near: "ziph/hachilah/near.png" },   // (Glen's, 11-15: dusk)
    { id: "maon", name: "The Wilderness of Maon", w: 100, bg: "w4_1", mx: 11, my: 1, mw: 3, left: "hachilah", right: "mountain",
      far: "ziph/maon/far", mid: "ziph/maon/mid.png", midY: 0, near: "ziph/maon/near.png" },   // (Glen's, 11-15)
    { id: "mountain", name: "The Mountain", w: 260, bg: "w4_1", mx: 14, my: 1, mw: 6, left: "maon",   /* (Glen 11-17: "too short ... a longer / wider level") */
      far: "ziph/mountain/far", mid: "ziph/mountain/mid.png", midY: 0, near: "ziph/mountain/near.png" },   // (Glen's, 11-15)
  ],
  // the Journal: Glen's song, the Final Chorus, its first half (SONG_PSALM57.md, his words exactly)
  steps: ["z5_jonathan", "z5_ziphites", "z5_surrounded", "z5_rescued"],
  verse: ["Be exalted, O God, above the heavens", "Let Your glory fill the earth", "Be exalted, O God, above the heavens", "Let all creation know Your worth"],
  // (draft words, for Glen, 11-15: ZIPH_PLAN.md)
  entries: [
    ["Jonathan came to me in the woods. He didn't bring an army. He brought God's promise, and it was enough.", "1 Samuel 23:16–18"],
    ["The people of Ziph went to Saul to hand me over. I never did them wrong.", "1 Samuel 23:19–20"],
    ["Saul on one side of the mountain, and we on the other. There was nowhere left to run.", "1 Samuel 23:26"],
    ["A messenger came, and Saul turned back. I didn't win that day. I was rescued.", "1 Samuel 23:27–28"],
  ],
  // (Glen's brief, 11-15; in, 11-16) Erem: a line in the margin once David has found him, not an entry
  aside: { when: "z5_erem", text: "We found a man in the woods who doesn't know his own name. He walks with us now." },
  end: ["Behold, God is my helper. The Lord is the one who sustains my soul.", "Psalm 54:4"],
  build: R => z5Build(R), enter: r => z5Enter(r), update: (dt, r) => z5Update(dt, r), holdDavid: (d, dt) => z5Hold(d, dt),
  drawDavid: (d, x, y) => z5DrawDavid(d, x, y), draw: camX => z5Draw(camX), drawFront: camX => z5DrawFront(camX),
  drawOver: () => z5DrawOver(), stoneHits: s => z5StoneHits(s),
};

const z5 = { told: {}, people: [], guards: [], hides: [], lookouts: [], clefts: [], scouts: [], caughtT: 0, back: null, siege: null, pose: null };
const z5Has = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function z5Tell(k, text) { if (!z5.told[k]) { z5.told[k] = true; toast(text); } }
function z5Person(room, spr, x, dir = 1, show = null, k = Z5.NPC_K) { const p = { room, spr, x, y: FOOT, dir, show, k, t: Math.random() * 3 }; z5.people.push(p); return p; }
function z5Hide(room, n, x, foot = FOOT) {   // a rock to crouch behind (in front of David); foot: what it stands on (a ledge's top + 4)
  // (Glen 11-17: "put the rubble in the foreground and lower ... so it looks like it is on his path") the rubble sunk into
  //  the near ground, over David's feet, so its foot is on the path in front of him, not on the ground behind
  const k = KIT[n]; region.props.push({ room, n, x: x - k.w / 2, y: foot - k.h + (k.top || 0) * 0.3 + (n === "w4_rubble_sand" ? Z5.RUBBLE_DOWN : 0), front: true });
  z5.hides.push({ room, x, x0: x - k.w / 2, x1: x + k.w / 2, y: foot - 4 });
}
function z5Guard(room, c0, c1, facing) {   // one of Saul's men walking his beat, c0 to c1 (columns), looking at each end
  z5.guards.push({ room, from: c0 * T, to: c1 * T, x: (facing > 0 ? c0 : c1) * T, y: FOOT, facing, state: "walk", t: Math.random() * 2, seen: 0 });
}

// ---------------------------------------------------------------------------------------------------------------------
// building
// (Glen's, 11-15: tools/cut_piece.py) the stronghold, his hiding rock, the rock of escape, the signal fire (lit, and its
//  cold heap: the flames taken out)
const Z5_KIT = { w4_z_stronghold: { w: 460, h: 252 }, w4_z_hide_rock: { w: 150, h: 151 }, w4_z_escape_rock: { w: 300, h: 245 },
  w4_z_fire: { w: 210, h: 229 }, w4_z_fire_out: { w: 210, h: 229 } };
function z5Build(R) {
  if (typeof R4_KIT !== "undefined") Object.assign(KIT, R4_KIT);   // (adullam.js's rocks and rubble: hiding places)
  Object.assign(KIT, Z5_KIT);
  for (const pl of ["hills", "horesh", "hachilah", "maon", "mountain"]) for (const f of ["far", "mid.png", "near.png"]) roomImg("ziph/" + pl + "/" + f);
  for (const k of ["people", "guards", "hides", "lookouts", "clefts", "scouts"]) z5[k].length = 0;
  z5.siege = null; z5.pose = null; z5.caughtT = 0; z5.back = {};
  [...Object.keys(Z5_KIT), "w4_rubble_sand", "w4_arch_sand", "w4_rocks_sand"].forEach(kitImg);
  const G = GR * T;

  // -- The Hills of Ziph (23:14): Saul seeks him every day. His men walk the hills: rock to rock, crouch when one looks
  let c = R("hills");
  { const rm = "hills", X = k => (c + k) * T;
    ground(c, c + 159);
    campfire(c + 4, GR - 1);
    z5.back.hills = X(5);
    const hold = k => region.props.push({ room: rm, n: "w4_z_stronghold", x: X(k) - KIT.w4_z_stronghold.w / 2, y: FOOT - KIT.w4_z_stronghold.h + 10 });
    hold(10); hold(108);   // (23:14: "in the strongholds")
    z5Person(rm, "soldier_sit", X(8), 1); z5Person(rm, "soldier_talk", X(13), -1);
    z5Hide(rm, "w4_z_hide_rock", X(22)); z5Guard(rm, 28, 44, -1); z5Hide(rm, "w4_rubble_sand", X(38));
    rLedge(rm, c + 48, 470, 4); rLedge(rm, c + 54, 380, 4); rRelic("z5_pom_hills", "pomegranate", c + 56, onTop(380));
    rHole(rm, c + 60, 3);
    z5Hide(rm, "w4_z_hide_rock", X(68)); z5Guard(rm, 72, 92, 1); z5Hide(rm, "w4_z_hide_rock", X(82)); z5Hide(rm, "w4_rubble_sand", X(96));
    rWild("viper", rm, c + 100); rHyraxFamily(rm, c + 65, 1);
    campfire(c + 104, GR - 1); z5.back.hills2 = X(105);
    z5Hide(rm, "w4_z_hide_rock", X(112)); z5Guard(rm, 116, 136, -1); z5Guard(rm, 124, 146, 1); z5Hide(rm, "w4_rubble_sand", X(128)); z5Hide(rm, "w4_z_hide_rock", X(142));
    rWild("partridge", rm, c + 150);
    rBreak("jar", rm, c + 154, 16);
  }

  // -- The Woods of Horesh (23:15-18): Jonathan comes. Then the stranger under the trees
  c = R("horesh");
  { const rm = "horesh", X = k => (c + k) * T;
    ground(c, c + 119);
    campfire(c + 4, GR - 1);
    rWild("hoopoe", rm, c + 14);
    z5.jonathan = z5Person(rm, "jonathan_idle", X(40), -1, () => !z5Has("z5_jonathan_gone"));
    z5.jonathan.k = Z5.NPC_K * 1.12;   // (Glen 11-17: "I like the size of Jonathan in the hug": standing and talking, matched to it)
    rLedge(rm, c + 54, 470, 4); rRelic("z5_truth_horesh", "truth", c + 56, onTop(470),
      "Jonathan, Saul’s son, arose and went to David into the woods, and strengthened his hand in God. (1 Samuel 23:16)");
    // the stranger (Glen's Erem: stand-in clips till his own)
    z5.erem = z5Person(rm, "erem_lie", X(80), 1, () => !z5Has("z5_erem"));   // (Glen's clips face right; lying, his head to the left)
    z5.erem.k = 1.05;   // (sitting: a little bigger, to be seen among the roots)
    campfire(c + 100, GR - 1);
    z5.eremSeat = X(100);   // (Glen 11-17: after the talk he limps off toward the olive press and fades: that's all we see of him)
    z5Person(rm, "soldier_sit", X(104), -1); z5Person(rm, "soldier_talk", X(107), -1);
    rHyrax(rm, c + 112); rHyraxFamily(rm, c + 44, 2, 1);
  }

  // -- The Hill of Hachilah (23:19-23): the Ziphites watch for Saul. A lookout who sees David runs to light his fire
  c = R("hachilah");
  { const rm = "hachilah", X = k => (c + k) * T;
    ground(c, c + 149);
    campfire(c + 4, GR - 1); z5.back.hachilah = X(5);
    // (Glen 11-15: "the ziphites hunched whispering to Saul's men for now, since it is the wording that matters") a
    //  Ziphite and one of Saul's men, there only while the words of 23:19-22 are up
    z5.whisper = false;
    //  (Glen's sheet 11-15: ziphite_whisper, bending to the soldier's ear and holding there; the soldier is the same
    //  listener, saul_soldier_listen)
    z5Person(rm, "ziphite_whisper", X(11), 1, () => z5.whisper, Z5.LOOK.K).once = true;
    z5Person(rm, "saul_soldier_listen", X(11) + 62 * Z5.LOOK.K + 8, 1, () => z5.whisper, Z5.SNEAK.K).once = true;   // (Glen's, 11-15: bows his head to listen; drawn facing left)
    // (Glen 11-17: "go above and below screen so it is a lot harder to get through with lookouts. It was pretty fast and
    //  easy") a tall hill: the ground, a long gully under the middle (fall in and it's back to the fire), and the way on
    //  up over the top of the screen and back down. A lookout and his signal fire on every level; rocks to crouch behind
    const H = [GR * T, 462, 312, 162, 12, -138];   // the levels' tops: the ground, then up a ledge at a time
    const look = (k, fire, facing, who = "watcher", lv = 0) => z5.lookouts.push({ room: rm, who, x: X(k), x0: X(k), fire: X(fire), facing, f0: facing, y: H[lv] + 4, state: "watch", t: Math.random() * 2, seen: 0, alpha: 1 });
    const hide = (n, k, lv = 0) => z5Hide(rm, lv ? "w4_z_hide_rock" : n, X(k), H[lv] + 4);   // (Glen 11-17: up on the ledges, boulders only: the rubble sinks in and hangs under them)
    const ledge = (k, w, lv) => rLedge(rm, c + k, H[lv], w);
    // the ground: the first lookout, as before
    hide("w4_z_hide_rock", 17); hide("w4_rubble_sand", 23); look(29, 34, -1);
    // up: three steps to the first height, a lookout there between his fire and the climb on
    ledge(33, 4, 1); ledge(38, 4, 2); ledge(43, 15, 3);
    hide("w4_z_hide_rock", 46, 3); hide("w4_rubble_sand", 51, 3); look(54, 57, -1, "watcher", 3);
    oliveRow(c + 44, onTop(H[3]) - 0.4, 3);
    // on up, over the top of the screen: the high ridge, two lookouts back to back
    ledge(58, 4, 4); ledge(63, 22, 5);
    rRelic("z5_stone_hach", "stone", c + 64, onTop(H[5]));
    hide("w4_z_hide_rock", 68, 5); look(73, 66, 1, "pointer", 5); hide("w4_rubble_sand", 77, 5); look(81, 84, -1, "watcher", 5);
    oliveRow(c + 69, onTop(H[5]) - 0.4, 3);
    // and down the far side, a ledge at a time, to the ground
    ledge(86, 4, 4); ledge(91, 9, 3); hide("w4_rubble_sand", 94, 3); look(98, 92, 1, "pointer", 3);
    ledge(101, 4, 2); ledge(106, 4, 1);
    rHole(rm, c + 36, 72);   // (the gully: the ledges are the only way over)
    campfire(c + 110, GR - 1); z5.back.hachilah2 = X(111);
    // the last stretch: a lookout on the ground, then one up on a rock shelf over the way out
    hide("w4_rubble_sand", 115); hide("w4_z_hide_rock", 120); look(126, 131, -1);
    ledge(128, 4, 1); ledge(133, 12, 2); hide("w4_z_hide_rock", 136, 2); look(142, 144, -1, "watcher", 2);
    rBreak("basket", rm, c + 147, 16); rHyrax(rm, c + 139, { range: 2 });
  }

  // -- The Wilderness of Maon (23:24-25): the Arabah, white and hot. A breather: a spring, a Truth
  c = R("maon");
  { const rm = "maon", X = k => (c + k) * T;
    ground(c, c + 99);
    campfire(c + 4, GR - 1);
    z5.runner = z5Person(rm, "soldier_talk", X(16), -1);
    rWild("ostrich", rm, c + 30); rHole(rm, c + 40, 3);
    rLedge(rm, c + 46, 460, 5); rLedge(rm, c + 54, 360, 4);
    rRelic("z5_truth_maon", "truth", c + 56, onTop(360), "Behold, God is my helper. The Lord is the one who sustains my soul. (Psalm 54:4)");
    rWild("wildass", rm, c + 66);
    rBoulder(rm, c + 74); rHyraxFamily(rm, c + 84, 3);
    // (Glen 11-17: "he shouldn't be in this place ... that is about all we should see of him") Erem stays in Horesh
    rBreak("jar", rm, c + 94, 16);
  }

  // -- The Mountain (23:26-28): Saul on this side, David on that. Surrounded. Hold out till the messenger comes
  c = R("mountain");
  { const rm = "mountain", X = k => (c + k) * T;
    ground(c, c + 259);
    campfire(c + 4, GR - 1); z5.back.mountain = X(5);
    z5.siegeAt = X(14); z5.siegeL = X(8); z5.siegeR = X(250); z5.siegeMid = X(129);
    // (Glen 11-16: "try the art we have") a cleft: Adullam's dark sandstone opening, a rock heap either side; the
    //  scouts step out of the dark
    const cleft = x => { const a = KIT.w4_arch_sand, r = KIT.w4_rocks_sand, s = Z5.CLEFT_K;
      region.props.push({ room: rm, n: "w4_arch_sand", x: x - a.w * s / 2, y: FOOT - a.h * s + 12, s });
      for (const side of [-1, 1]) region.props.push({ room: rm, n: "w4_rocks_sand", x: x + side * (a.w * s / 2 + 10) - r.w * 0.8 / 2, y: FOOT - r.h * 0.8 + 8, s: 0.8 }); };
    for (const k of [34, 62, 92, 118, 140, 166, 196, 226]) { z5.clefts.push({ room: rm, x: X(k) }); cleft(X(k)); }
    for (const k of [24, 46, 74, 84, 104, 152, 178, 186, 208, 238]) z5Hide(rm, k % 3 === 1 ? "w4_rubble_sand" : "w4_z_hide_rock", X(k));
    rLedge(rm, c + 52, 470, 4); rLedge(rm, c + 78, 430, 5); rLedge(rm, c + 110, 470, 4); rLedge(rm, c + 156, 450, 5); rLedge(rm, c + 214, 470, 4);
    // (Glen 11-17: "after the soldiers leave there are no more anything ... an ibex ... some birds and our little hyrax
    //  family. Something to dodge or do") out once Saul's men have gone (need: z5_rescued), on the way to En-Gedi
    const after = { need: "z5_rescued" };
    rWild("ibex", rm, c + 150, Object.assign({ range: 3 }, after)); rWild("ibex", rm, c + 204, Object.assign({ range: 3, facing: -1 }, after));
    rWild("partridge", rm, c + 140, Object.assign({ range: 2 }, after)); rWild("hoopoe", rm, c + 172, Object.assign({ range: 1 }, after)); rWild("partridge", rm, c + 222, Object.assign({ range: 2 }, after));
    rWild("caracal", rm, c + 190, Object.assign({ range: 3 }, after));
    { const n0 = region.beasts.length; rHyraxFamily(rm, c + 162, 2); rHyrax(rm, c + 236); for (const b of region.beasts.slice(n0)) b.need = "z5_rescued"; }
    z5.rockX = X(129);   // Sela Hammahlekoth: the rock of escape
    // (Glen 11-17: "the rock is too high. And ... we can use it for somewhere to hide behind") his split rock, in front of
    //  the path, sunk into the ground, smaller: crouch behind it like the others
    { const k = Z5_KIT.w4_z_escape_rock, s = Z5.ESCAPE_ROCK.K, w = k.w * s, h = k.h * s;
      region.props.push({ room: rm, n: "w4_z_escape_rock", x: z5.rockX - w / 2, y: FOOT - h + Z5.ESCAPE_ROCK.DOWN, w, h, front: true });
      z5.hides.push({ room: rm, x: z5.rockX, x0: z5.rockX - w / 2, x1: z5.rockX + w / 2, y: FOOT - 4 }); }
    z5.endX = X(246);
  }
  z5Talk();
}
// (Glen 11-17: "everyone ... can say something instead of just standing there doing nothing") Up by David's men: their
//  next line (their own words; a reference only where it's the verse). Keyed by room and column
function z5Talk() {
  const MEN = "One of David's men", jon = () => z5Has("z5_jonathan");
  const T_ = {
    "hills:8": [[MEN, "Strongholds in the rocks, and Saul looking for us every day (1 Samuel 23:14)."],
      [MEN, "Keep low going past Saul's men. David won't lift a hand against the king's soldiers, and neither will we."]],
    "hills:13": [[MEN, "The Ziphites keep watching us from their hilltops. I don't trust them."]],
    "horesh:104": () => jon() ? [[MEN, "Jonathan came all the way out here to find you? Now that's a friend."]]
      : [[MEN, "Woods at last. Shade, and a little rest."]],
    "horesh:107": () => jon() ? [[MEN, "He said you'll be king over Israel, and he'll be next to you (1 Samuel 23:17). The king's own son!"]]
      : [[MEN, "Someone's coming through the trees up ahead. One man, alone. Not one of Saul's, I think."]],
    "maon:16": () => z5Has("z5_warned") ? [[MEN, "Drink at the spring while you can. Saul isn't far behind us."]] : null,
  };
  for (const p of z5.people) { const L = T_[p.room + ":" + Math.round(p.x / T - roomById(p.room).c0)]; if (L) rTalker(p, L); }
}
function rHyrax(rm, c, o = {}) { if (typeof WILD !== "undefined" && WILD.hyrax) rWild("hyrax", rm, c, o); }
// (Glen 11-17: "they are cute ... big and little like momma and babies") a mother and her little ones trotting near her
function rHyraxFamily(rm, c, babies = 2, facing = -1) {
  rHyrax(rm, c, { range: 2, facing });
  for (let i = 0; i < babies; i++) rHyrax(rm, c + (i + 1) * 1.3 * -facing, { range: 2, facing, size: 0.55 + i * 0.05 });
}

// ---------------------------------------------------------------------------------------------------------------------
function z5Enter(r) {
  if (r.id === "hills" && !z5Has("z5_jonathan")) z5Tell("hills", "David stayed in the wilderness in the strongholds. Saul sought him every day, but God didn’t deliver him into his hand. (1 Samuel 23:14)");
  if (r.id === "hachilah" && !z5Has("z5_ziph_told")) {
    regionAdd("taken", "z5_ziph_told");
    rPlay([{ fn() { z5.whisper = true; for (const p of z5.people) if (p.room === "hachilah") p.t = 0; } }, { wait: 0.8 },
      { say: ["", "Then the Ziphites came up to Saul to Gibeah, saying, “Doesn’t David hide himself with us in the strongholds in the woods, in the hill of Hachilah, which is on the south of the desert? (1 Samuel 23:19)"] },
      { say: ["The Ziphites", "Now therefore, O king, come down. According to all the desire of your soul to come down; and our part will be to deliver him up into the king’s hand. (1 Samuel 23:20)"] },
      { say: ["Saul", "Please go make yet more sure, and know and see his place where his haunt is, and who has seen him there; for I have been told that he is very cunning. (1 Samuel 23:22)"] },
      { fn() { z5.whisper = false; toast("The Ziphites are watching for Saul. If a lookout sees David, he'll run to light his signal fire. Stay hidden, or stop him first: sling or sword."); } }]);
  }
  if (r.id === "maon" && !z5Has("z5_ziphites")) {
    regionAdd("taken", "z5_ziphites");
    rPlay([{ wait: 0.4 },
      { say: ["", "They arose, and went to Ziph before Saul; but David and his men were in the wilderness of Maon, in the Arabah on the south of the desert. (1 Samuel 23:24)"] }]);
  }
  if (r.id === "mountain" && z5Has("z5_rescued")) z5Tell("mount2", "Sela Hammahlekoth: the rock of escape. Saul turned back here.");
}

// ---------------------------------------------------------------------------------------------------------------------
function z5Update(dt, r) {
  const d = david;
  for (const p of z5.people) {
    p.t += dt;
    if (p.leaving) { p.x -= 70 * dt; p.fade = (p.fade || 0) + dt / 2.5; if (p.fade >= 1) { p.leaving = false; regionAdd("taken", "z5_jonathan_gone"); } }   // (Jonathan, home)
  }
  if (z5.pose) z5.pose.t += dt;
  { const E = z5.erem;   // (the stranger limping off toward the olive press, fading as he goes)
    if (E && E.walkTo != null) {
      E.x = Math.min(E.walkTo, E.x + Z5.EREM_LIMP * dt);
      E.alpha = Math.max(0, Math.min(1, (E.walkTo - E.x) / ((E.walkTo - E.walkFrom) * 0.6)));   // (the last 60% of the way)
      if (E.x >= E.walkTo) { E.walkTo = null; regionAdd("taken", "z5_erem"); }
    } }
  const free = !region.script.length && region.wait <= 0 && !region.trans;
  // Jonathan (23:16-18): when David comes near him
  if (r.id === "horesh" && free && !z5Has("z5_jonathan") && d.x > z5.jonathan.x - 230) z5JonathanScene();
  // the stranger: after Jonathan's gone, when David comes near him
  if (r.id === "horesh" && free && z5Has("z5_jonathan") && !z5Has("z5_erem") && !z5.erem.going && d.x > z5.erem.x - 210) { z5.erem.going = true; z5EremScene(); }
  // the runner in Maon (23:25)
  if (r.id === "maon" && free && !z5Has("z5_warned") && d.x > z5.runner.x - 200) {
    regionAdd("taken", "z5_warned"); d.facing = 1;
    rPlay([{ say: ["One of David's men", "Saul and his men are coming this way to look for you!"] },
      { say: ["", "When David was told, he went down to the rock, and stayed in the wilderness of Maon. When Saul heard that, he pursued David in the wilderness of Maon. (1 Samuel 23:25)"] },
      { fn() { toast("Drink at the spring and rest. Then on to the mountain."); } }]);
  }
  // the way on is shut till Jonathan and the stranger are met (Horesh)
  const wall = (x, ok, say) => { if (!ok && d.x > x) { d.x = x; d.vx = Math.min(0, d.vx); z5Tell("wall" + x, say); } };
  if (r.id === "horesh") wall((r.c0 + r.w - 3) * T, z5Has("z5_erem"), "Someone is in the woods. Go and see.");
  if (r.id === "mountain") z5SiegeUpdate(dt);
  if (r.id === "hachilah") z5LookUpdate(dt);
  // the end (23:28-29)
  if (r.id === "mountain" && z5Has("z5_rescued") && !z5Has("g_exit_open") && d.x > z5.endX && free) {
    regionAdd("taken", "g_exit_open");
    rPlay([{ say: ["", "David went up from there and lived in the strongholds of En Gedi. (1 Samuel 23:29)"] },
      { fn() { jsceneOpen(true); } }]);
  }
}
function z5Hold(d, dt) {
  // caught (Saul's men in the hills, a lit signal fire, a scout on the mountain): a fade, then back to the press
  if (z5.caughtT > 0) {
    const before = z5.caughtT; z5.caughtT -= dt;
    region.fade = Math.max(0, Math.min(1, z5.caughtT > Z5.SNEAK.CAUGHT_FADE / 2 ? (Z5.SNEAK.CAUGHT_FADE - z5.caughtT) * 2 / Z5.SNEAK.CAUGHT_FADE : z5.caughtT * 2 / Z5.SNEAK.CAUGHT_FADE));
    if (before > Z5.SNEAK.CAUGHT_FADE / 2 && z5.caughtT <= Z5.SNEAK.CAUGHT_FADE / 2) {
      d.h = STAND_H; d.x = z5.caughtTo; d.y = FOOT - 4; d.vx = d.vy = 0; d.facing = 1; snapCamera();
      for (const g of z5.guards) { g.seen = 0; g.state = "walk"; g.t = 0; g.x = g.facing > 0 ? g.from : g.to; }
      for (const l of z5.lookouts) if (l.state !== "down") Object.assign(l, { state: "watch", t: 0, seen: 0, x: l.x0, facing: l.f0, lit: false });
    }
    if (z5.caughtT <= 0) region.fade = 0;
    d.vx = 0; return true;
  }
  if (z5.pose && z5.pose.hold) { d.vx = 0; return false; }
  const r = region.room;
  if (r && r.id === "hills") z5SneakUpdate(dt);
  return false;
}
function z5Caught(say) {
  const r = region.room, d = david;
  // back to the nearest press behind him in this room
  const opts = Object.entries(z5.back || {}).filter(([k, x]) => k.startsWith(r.id) && x <= d.x + 10).map(([, x]) => x);
  z5.caughtTo = opts.length ? Math.max(...opts) : (r.c0 + 4) * T;
  z5.caughtT = Z5.SNEAK.CAUGHT_FADE; d.vx = 0; toast(say);
}

// ---------------------------------------------------------------------------------------------------------------------
// the hills: Saul's men on their beats (as nobgath.js's streets of Gath)
function z5Hidden() {
  const d = david, S = Z5.SNEAK;
  return d.h === LOW_H && z5.hides.some(h => h.room === region.room.id && d.x > h.x0 - S.NEAR && d.x < h.x1 + S.NEAR && Math.abs(d.y - (h.y ?? GR * T)) < 40);
}
function z5Sees(g, sight, low) {
  const d = david, dx = d.x - g.x;
  if (g.room !== region.room.id || d.deadT > 0 || z5.caughtT > 0 || Math.sign(dx) !== g.facing || Math.abs(d.y - g.y) > 110) return false;
  if (g.state === "turn" || z5Hidden()) return false;
  return Math.abs(dx) < (d.h === LOW_H ? low : sight) * T;
}
function z5SneakUpdate(dt) {
  const S = Z5.SNEAK, d = david;
  for (const g of z5.guards) {
    g.t += dt;
    if (g.state === "walk") {
      g.x += g.facing * S.WALK * dt;
      if ((g.facing > 0 && g.x >= g.to) || (g.facing < 0 && g.x <= g.from)) { g.x = Math.max(g.from, Math.min(g.to, g.x)); g.state = "look"; g.t = 0; }
    } else if (g.state === "look" && g.t > S.LOOK) { g.state = "turn"; g.t = 0; }
    else if (g.state === "turn" && g.t > S.TURN) { g.facing *= -1; g.state = "walk"; g.t = 0; }
    if (z5Sees(g, S.SIGHT, S.SIGHT_LOW)) { g.seen += dt; if (g.seen > S.SEEN_T) { g.seen = 0; z5Caught("One of Saul's men saw David! Back to the olive press. Crouch behind a rock (hold Down) while one looks your way."); return; } }
    else g.seen = Math.max(0, g.seen - dt * 2);
  }
  if (z5.guards.some(g => g.room === "hills" && Math.abs(d.x - g.x) < 13 * T))
    z5Tell("sneak", "Saul's men are searching the hills. Never strike them: when one looks your way, crouch behind a rock (hold Down). Go when his back is turned.");
}

// ---------------------------------------------------------------------------------------------------------------------
// the woods of Horesh: Jonathan (23:16-18), then the stranger
function z5JonathanScene() {
  const d = david, J = z5.jonathan;
  regionAdd("taken", "z5_jonathan_met");
  d.facing = 1; d.vx = 0;
  rPlay([{ fn() { z5.pose = { hold: true, t: 0 }; d.x = J.x - 150; J.spr = "jonathan_talk"; } },
    { say: ["", "David saw that Saul had come out to seek his life. David was in the wilderness of Ziph in the woods. (1 Samuel 23:15)"] },
    { say: ["", "Jonathan, Saul’s son, arose and went to David into the woods, and strengthened his hand in God. (1 Samuel 23:16)"] },
    { say: ["Jonathan", "Don’t be afraid, for the hand of Saul my father won’t find you; and you will be king over Israel, and I will be next to you; and Saul my father knows that also. (1 Samuel 23:17)"] },
    { fn() { if (SPR.dj_embrace) z5.pose = { hold: true, t: 0, embrace: true }; } },
    { wait: SPR.dj_embrace ? SPR.dj_embrace.frames * SPR.dj_embrace.ms / 1000 + 0.6 : 0.5 },
    { fn() { z5.pose = { hold: true, t: 0 }; J.spr = "jonathan_idle"; } },
    { say: ["", "They both made a covenant before the LORD. Then David stayed in the woods and Jonathan went to his house. (1 Samuel 23:18)"] },
    { fn() {
      z5.pose = null; regionAdd("taken", "z5_jonathan"); J.spr = "jonathan_walk"; J.dir = -1; J.leaving = true;
      if (!skills.has("courage")) { learnSkill("courage"); z5Courage(true); }   // (once: main.js counts it on later loads)
      toast("Jonathan strengthened David's hand in God: one more heart.");
    } }]);
}
function z5Courage(fill) {   // Jonathan's last gift: one more heart (main.js keeps it from then on: hasSkill("courage"))
  david.maxHearts += HPU; if (fill) david.hearts = david.maxHearts;
}
function z5EremScene() {
  const d = david, E = z5.erem;
  d.vx = 0;
  // (Glen's clips, 11-15: he takes the water from his right and talks to his right, so David kneels on that side)
  const pose = (n, once) => ({ fn() { E.spr = n; E.t = 0; E.once = once; } });
  const len = n => SPR[n] ? SPR[n].frames * SPR[n].ms / 1000 : 0.5;
  // (Glen's brief, his words: Desktop\EREM_THE_WANDERER.md; David's "the LORD")
  rPlay([{ fn() { z5.pose = { hold: true, t: 0 }; d.x = E.x + 190; d.facing = -1; } },
    { say: ["", "A man lies under the trees, hurt and worn out."] },
    pose("erem_wake", true), { wait: len("erem_wake") },
    { say: ["", "David kneels and gives him water."] },
    { fn() { z5.pose = { hold: true, t: 0, kneel: true }; } }, pose("erem_drink", true), { wait: len("erem_drink") },
    pose("erem_talk", false),
    { say: ["David", "What is your name?"] },
    { say: ["Stranger", "I don't know."] },
    { say: ["David", "You don't know your own name?"] },
    { say: ["Stranger", "I remember places. I remember faces. I remember things that happened long ago. But I cannot remember who I am."] },
    { say: ["David", "Then perhaps the LORD will reveal it to you in time."] },
    { say: ["Stranger", "Until then, I am at your service."] },
    // (Glen 11-17, his new clip: sitting, up into a crouch, standing; then "he can walk and fade out to the olive press")
    { fn() { z5.pose = { hold: true, t: 0 }; E.spr = "erem_rise"; E.t = 0; E.once = true; E.k = Z5.NPC_K; } }, { wait: len("erem_rise") },
    { fn() { z5.pose = null; E.spr = "erem_limp"; E.t = 0; E.once = false; E.dir = 1; E.walkFrom = E.x; E.walkTo = z5.eremSeat; toast("The man with no name walks with David's men now."); } }]);
}

// ---------------------------------------------------------------------------------------------------------------------
// the hill of Hachilah: the Ziphites' lookouts (23:19-23)
function z5LookUpdate(dt) {
  const L = Z5.LOOK, d = david;
  if (z5.caughtT > 0) return;
  for (const l of z5.lookouts) {
    l.t += dt;
    if (l.state === "down") { l.x += l.dir * 300 * dt; l.alpha = Math.max(0, 1 - l.t / L.FADE); continue; }
    if (l.state === "watch") {
      if (l.t > 3.5 + (l.x0 % 7) * 0.3) { l.facing *= -1; l.t = 0; }   // (he looks one way, then the other)
      if (z5Sees({ room: l.room, x: l.x, y: l.y - 4, facing: l.facing, state: "watch" }, L.SIGHT, L.SIGHT_LOW)) {
        l.seen += dt; if (l.seen > 0.15) { l.state = "spot"; l.t = 0; z5Tell("spot", "A lookout has seen David! Stop him before he lights his fire: sling or sword."); }
      } else l.seen = Math.max(0, l.seen - dt);
    } else if (l.state === "spot") {
      if (l.t > L.SPOT_T) { l.state = "run"; l.t = 0; l.facing = Math.sign(l.fire - l.x) || 1; }
    } else if (l.state === "run") {
      l.x += l.facing * L.RUN * dt;
      if (Math.abs(l.x - l.fire) < 20) { l.state = "lit"; l.t = 0; l.lit = true; sfx("war_horn", l.fire, 0.35, 1.2); }
    } else if (l.state === "lit" && l.t > 1.6) {
      z5Caught("The signal fire is lit! Saul's men come running. Back to the olive press: stay out of the lookouts' sight.");
    }
  }
  if (z5.lookouts.some(l => l.room === "hachilah" && l.state !== "down" && Math.abs(d.x - l.x) < 14 * T))
    z5Tell("look", "A Ziphite lookout, by his signal fire. Crouch behind the rocks (hold Down) while he looks your way.");
}
function z5StoneHits(s) {
  const r = region.room; if (!r) return false;
  if (r.id === "hachilah") for (const l of z5.lookouts) {
    if (l.state === "down" || l.state === "lit") continue;
    if (Math.abs(s.x - l.x) < Z5.LOOK.HIT && s.y < l.y + 4 && s.y > l.y - 300 * SCALE * Z5.LOOK.K) {
      l.state = "down"; l.t = 0; l.dir = Math.sign(l.x - david.x) || 1; l.facing = l.dir; sfx("stone_hit", l.x, 0.4, 1.1);
      z5Tell("down", "The lookout runs off, unhurt. His fire stays dark.");
      if (!s.sword && typeof stoneHit === "function") stoneHit(s, 0.6);
      return true;
    }
  }
  // Saul's men: never struck
  const men = [...z5.guards.filter(g => g.room === r.id), ...z5.scouts.filter(g => g.room === r.id)];
  for (const g of men) if (Math.abs(s.x - g.x) < 46 && s.y < FOOT + 4 && s.y > FOOT - 240) { z5Tell("nostrike", "David won't strike Saul's men. Hide from them instead."); return true; }
  return false;
}

// ---------------------------------------------------------------------------------------------------------------------
// the mountain (23:26-28): the two fronts close in; scouts come through the clefts; then the messenger
function z5SiegeStart() {
  z5.siege = { t: 0, scoutT: 2.5, hurtT: 0, done: false, mess: null, surgeT: Z5.SIEGE.SURGE, rush: 0, extra: 0 };
  for (const k of z5.clefts) k.warn = 0;
  z5.scouts.length = 0;
  regionAdd("taken", "z5_surrounded");
  rPlay([{ say: ["", "Saul went on this side of the mountain, and David and his men on that side of the mountain; and David hurried to get away for fear of Saul, for Saul and his men surrounded David and his men to take them. (1 Samuel 23:26)"] },
    // (Glen 11-16) surrounded, he kneels and prays: Psalm 54, which he wrote about the Ziphites (WEB, ebible.org)
    { fn() { z5.pose = { hold: true, t: 0, pray: true }; david.vx = 0; } }, { wait: 1.4 },
    { say: ["David", "Save me, God, by your name. Vindicate me in your might. Hear my prayer, God. Listen to the words of my mouth. (Psalm 54:1-2)"] },
    { say: ["David", "For strangers have risen up against me. Violent men have sought after my soul. They haven’t set God before them. (Psalm 54:3)"] },
    { fn() { z5.pose = null; } },
    { fn() { toast("Surrounded! Too many to fight. Keep away from Saul's lines, and hide from the scouts who come through the rocks (hold Down behind a rock). Hold on."); } }]);
}
function z5SiegeEdges() {   // where the two fronts are now (px)
  const S = z5.siege, P = Z5.SIEGE; if (!S) return null;
  let u = Math.min(1, S.t / P.END);   // (steady, all the way: Glen 11-17)
  if (S.back) u = Math.max(0, u - S.back);   // (after the messenger: they draw back)
  const gap = P.GAP * T, spanL = z5.siegeMid - gap - z5.siegeL, spanR = z5.siegeR - (z5.siegeMid + gap);
  const ex = S.back ? 0 : Math.min(S.extra || 0, P.RUSH_SHARE * spanL);   // (what their rushes have gained: a share of the way, never past it)
  const k = 1 - P.RUSH_SHARE;
  return [Math.min(z5.siegeMid - gap, z5.siegeL + spanL * k * u + ex), Math.max(z5.siegeMid + gap, z5.siegeR - spanR * k * u - ex)];
}
function z5SiegeUpdate(dt) {
  const d = david, P = Z5.SIEGE;
  if (z5Has("z5_rescued")) { z5.siege = null; z5.scouts.length = 0; return; }
  if (!z5.siege) { if (d.x > z5.siegeAt && !region.script.length) z5SiegeStart(); return; }
  const S = z5.siege;
  if (d.deadT > 0) { z5.siege = null; z5.scouts.length = 0; return; }   // (back at the press: it starts again as he comes on)
  if (region.script.length && !S.mess) return;
  S.t += dt; S.hurtT -= dt;
  if (S.mess) { S.mess.t += dt; S.back = Math.min(1, (S.back || 0) + dt * 0.18); return; }
  // a rush: both lines charge in a few steps at once, every SURGE s
  S.surgeT -= dt;
  if (S.surgeT <= 0) { S.surgeT = P.SURGE * (0.85 + Math.random() * 0.3); S.rush = P.RUSH_T; z5Tell("rush", "They're charging! Keep moving: get between the lines."); if (typeof sfx === "function") sfx("war_horn", d.x, 0.25, 1.4); }
  if (S.rush > 0) { S.rush -= dt; S.extra += P.RUSH * T / P.RUSH_T * dt; }
  const [L, R_] = z5SiegeEdges();
  // a front's reach: knocked back toward the middle, a heart
  if (S.hurtT <= 0 && (d.x < L + 40 || d.x > R_ - 40)) {
    S.hurtT = P.HURT_COOL; const left = d.x < L + 40;
    hurtDavid(left ? L - 60 : R_ + 60); d.x = left ? L + P.PUSH : R_ - P.PUSH;
    z5Tell("front", "Saul's lines! Keep between them: they're closing in from both sides.");
  }
  if (d.x < L + 10) d.x = L + 10; if (d.x > R_ - 10) d.x = R_ - 10;
  // scouts through the clefts (only the ones still between the fronts)
  S.scoutT -= dt;
  if (S.scoutT <= 0) {
    S.scoutT = P.SCOUT * (0.8 + Math.random() * 0.4);
    const open = z5.clefts.filter(k => k.x > L + 3 * T && k.x < R_ - 3 * T && Math.abs(k.x - d.x) > 3 * T && !(k.warn > 0));
    if (open.length) {
      const k = open.reduce((a, b) => Math.abs(b.x - d.x) < Math.abs(a.x - d.x) ? b : a);   // (the nearest one: he has to hide)
      k.warn = P.WARN;   // (dust and a "!" at its mouth first: someone's coming)
      z5Tell("scout", "Dust in the rocks: a scout is coming through! Crouch behind a rock (hold Down) till he goes.");
    }
  }
  for (const k of z5.clefts) if (k.warn > 0 && (k.warn -= dt) <= 0) {
    k.warn = 0;
    z5.scouts.push({ room: "mountain", x: k.x, from: k.x - P.SCOUT_BEAT * T, to: k.x + P.SCOUT_BEAT * T, y: FOOT, facing: Math.sign(d.x - k.x) || 1, state: "dash", t: 0, life: 0, seen: 0, alpha: 0 });
  }
  for (const g of z5.scouts) {
    g.t += dt; g.life += dt; g.alpha = Math.min(1, g.life * 5, Math.max(0, (P.SCOUT_FOR - g.life) * 2));
    if (g.state === "dash") {   // (he runs out of the cleft toward where David was)
      g.x += g.facing * P.SCOUT_RUN * dt;
      if (g.t > P.SCOUT_DASH) { g.state = "look"; g.t = 0; g.from = Math.min(g.from, g.x); g.to = Math.max(g.to, g.x); }
    } else if (g.state === "walk") {
      g.x += g.facing * Z5.SNEAK.WALK * 1.2 * dt;
      if ((g.facing > 0 && g.x >= g.to) || (g.facing < 0 && g.x <= g.from)) { g.state = "look"; g.t = 0; }
    } else if (g.state === "look" && g.t > 1.4) { g.state = "turn"; g.t = 0; }
    else if (g.state === "turn" && g.t > Z5.SNEAK.TURN) { g.facing *= -1; g.state = "walk"; g.t = 0; }
    if (g.alpha > 0.6 && z5Sees(g, Z5.SNEAK.SIGHT, Z5.SNEAK.SIGHT_LOW)) {
      g.seen += dt;
      if (g.seen > Z5.SNEAK.SEEN_T && S.hurtT <= 0) { g.seen = 0; S.hurtT = P.HURT_COOL; hurtDavid(g.x); g.life = Math.max(g.life, P.SCOUT_FOR - 0.6); toast("A scout saw David and called out! Hide quicker next time."); }
    } else g.seen = Math.max(0, g.seen - dt * 2);
  }
  z5.scouts = z5.scouts.filter(g => g.life < P.SCOUT_FOR);
  // the messenger (23:27)
  // (Glen 11-17: "someone running up to Saul ... otherwise we are just reading. Maybe the guards can cross in front of
  //  David as he's hiding and someone comes running up behind") David drops low; Saul comes up and his men march past in
  //  front of him; the messenger gallops in behind them to Saul; then they all turn back
  if (S.t >= P.END && !S.mess) {
    S.mess = { t: 0, x: d.x, cx: camX };   // (cx: where the screen was: the scene is played on it) z5.scouts.length = 0; z5.pose = { hold: true, t: 0, hide: true }; d.vx = 0;
    toast("Hide! Saul's men are coming through!");
    rPlay([{ wait: 3.4 },
      { say: ["A messenger, to Saul", "Hurry and come, for the Philistines have made a raid on the land! (1 Samuel 23:27)"] },
      { fn() { if (z5.siege && z5.siege.mess) z5.siege.mess.go = z5.siege.mess.t; } },
      { wait: 2.6 },
      { say: ["", "So Saul returned from pursuing David, and went against the Philistines. Therefore they called that place Sela Hammahlekoth. (1 Samuel 23:28)"] },
      { fn() { regionAdd("taken", "z5_rescued"); z5.siege = null; z5.pose = null; toast("Rescued! David didn't win the day. God turned Saul back. On to En-Gedi: go right."); } }]);
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
function z5DrawDavid(d, x, y) {
  if (z5.pose && z5.pose.embrace) return true;   // (he's in the two-shot, drawn with Jonathan)
  if (z5.pose && z5.pose.pray) return drawDavidPray(z5.pose.t, x, y, d.facing);
  if (z5.pose && z5.pose.hide && SPR.david_kneel_down && SPR.david_kneel_low) {   // (11-17) low, hiding, while Saul's men march past
    const kd = SPR.david_kneel_down, kdT = kd.frames * kd.ms / 1000, t = z5.pose.t;
    if (t < kdT) drawSprite("david_kneel_down", frameOf("david_kneel_down", t), x, y, d.facing); else drawSprite("david_kneel_low", frameOf("david_kneel_low", t - kdT), x, y, d.facing);
    return true; }   // (Psalm 54 on the mountain: Glen's praying clip)
  if (z5.pose && z5.pose.kneel && SPR.david_kneel) { drawSprite("david_kneel", Math.min(SPR.david_kneel.frames - 1, Math.floor(z5.pose.t * 1000 / 161)), x, y, d.facing); return true; }
  return false;
}
function z5Draw(camX) {
  const r = region.room; if (!r) return;
  const now = performance.now() / 1000;
  // the signal fires: a heap of brush, burning once lit
  if (r.id === "hachilah") for (const l of z5.lookouts) {
    const x = l.fire - camX; if (x < -400 || x > W + 400) continue;
    const im = kitImg(l.lit ? "w4_z_fire" : "w4_z_fire_out"), k = Z5_KIT.w4_z_fire; if (!im) continue;
    const fl = l.lit ? 1 + Math.sin(now * 17 + l.x0) * 0.03 + Math.sin(now * 29) * 0.02 : 1;   // (lit: the flames flicker)
    ctx.drawImage(im, x - k.w / 2, l.y + 6 - k.h * fl, k.w, k.h * fl);
  }
  // (the rock of escape: a hiding piece now, built with the room. Glen 11-17: "why did the rock break?" It's split by
  //  name, Sela Hammahlekoth, and is there from the start rather than popping in after)
}
// the people: drawn in front of the near layer (11-15: Horesh's roots hid the stranger sitting under them)
function z5DrawPeople(camX) {
  const r = region.room;
  for (const p of z5.people) {
    if (p.room !== r.id || (p.show && !p.show())) continue;
    if (p === z5.jonathan && z5.pose && z5.pose.embrace) {   // the two-shot, between them
      drawSprite("dj_embrace", Math.min(SPR.dj_embrace.frames - 1, Math.floor(z5.pose.t * 1000 / SPR.dj_embrace.ms)), (david.x + p.x) / 2 - camX + 40, p.y, 1, Z5.NPC_K);
      continue;
    }
    const x = p.x - camX; if (x < -300 || x > W + 300) continue;
    const S = SPR[p.spr]; if (!S) continue;
    const i = p.hold != null ? p.hold : p.once ? Math.min(S.frames - 1, Math.floor(p.t * 1000 / S.ms)) : frameOf(p.spr, p.t);
    drawSprite(p.spr, i, x, p.y, p.dir, p.k, p.leaving ? Math.max(0, 1 - (p.fade || 0)) : p.alpha ?? 1, p.filter || "");
  }
}
function z5DrawMan(g, camX, n0) {   // one of Saul's men (walking, looking, turning), with his sight wedge
  const x = g.x - camX; if (x < -400 || x > W + 400) return;
  const S = Z5.SNEAK, a = g.alpha == null ? 1 : g.alpha;
  if (g.state !== "turn" && a > 0.3) {
    const reach = S.SIGHT * T, col = g.seen > 0 ? "255,70,40" : "255,214,90", gr = ctx.createLinearGradient(x, 0, x + g.facing * reach, 0);
    gr.addColorStop(0, `rgba(${col},${0.34 * a})`); gr.addColorStop(1, `rgba(${col},0.03)`);
    ctx.save(); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x + g.facing * 20, g.y - 120); ctx.lineTo(x + g.facing * reach, g.y - 165); ctx.lineTo(x + g.facing * reach, g.y); ctx.lineTo(x + g.facing * 20, g.y - 70); ctx.closePath(); ctx.fill(); ctx.restore();
  }
  const n = g.state === "walk" || g.state === "dash" ? "saul_soldier_walk" : g.state === "turn" ? "saul_soldier_turn" : "saul_soldier_look";
  if (SPR[n]) drawSprite(n, g.state === "dash" ? frameOf(n, g.t * 3) : g.state === "walk" ? frameOf(n, g.t) : Math.min(SPR[n].frames - 1, Math.floor(g.t * 1000 / SPR[n].ms)), x, g.y, g.facing, Z5.SNEAK.K, a);
  if (g.seen > 0) { ctx.save(); ctx.fillStyle = "#ffdc4a"; ctx.strokeStyle = "#3a2400"; ctx.lineWidth = 5; ctx.font = "bold 44px sans-serif"; ctx.textAlign = "center"; ctx.strokeText("!", x, g.y - 270); ctx.fillText("!", x, g.y - 270); ctx.restore(); }
}
function z5DrawFront(camX) {
  const r = region.room; if (!r) return;
  z5DrawPeople(camX);
  const now = performance.now() / 1000;
  if (r.id === "hills") for (const g of z5.guards) if (g.room === "hills") z5DrawMan(g, camX);
  if (r.id === "hachilah") for (const l of z5.lookouts) {
    const x = l.x - camX; if (x < -400 || x > W + 400) continue;
    // (Glen's Ziphites, 11-15/16) each lookout one man all through. The watcher: looking about (ziphite_watch: shading his
    //  eyes, arms crossed), his hand to his brow when he sees David, then his run (ziphite_watch_run). The pointer:
    //  standing, pointing at David (ziphite_spot, once, through SPOT_T), then his run (ziphite_dash)
    {
      const run = l.state === "run" || l.state === "down", pt = l.who === "pointer";
      const n = run ? (pt ? "ziphite_dash" : "ziphite_watch_run") : pt ? "ziphite_spot" : "ziphite_watch";
      if (SPR[n]) {
        const i = run ? frameOf(n, l.t)
          : pt ? (l.state === "spot" ? Math.min(SPR[n].frames - 1, Math.floor(l.t * 1000 / SPR[n].ms)) : 0)
          : l.state === "spot" ? 4 : frameOf(n, now + l.x0 * 0.003);
        drawSprite(n, i, x, l.y, l.facing, Z5.LOOK.K, l.alpha);
      }
    }
    if (l.state === "watch") {   // where he's looking
      const reach = Z5.LOOK.SIGHT * T, col = l.seen > 0 ? "255,70,40" : "255,214,90", gr = ctx.createLinearGradient(x, 0, x + l.facing * reach, 0);
      gr.addColorStop(0, `rgba(${col},0.3)`); gr.addColorStop(1, `rgba(${col},0.03)`);
      ctx.save(); ctx.fillStyle = gr; ctx.beginPath(); ctx.moveTo(x + l.facing * 30, l.y - 220); ctx.lineTo(x + l.facing * reach, l.y - 260); ctx.lineTo(x + l.facing * reach, l.y); ctx.lineTo(x + l.facing * 30, l.y - 120); ctx.closePath(); ctx.fill(); ctx.restore();
    }
    if (l.state === "spot" || l.state === "run") { ctx.save(); ctx.fillStyle = "#ffdc4a"; ctx.strokeStyle = "#3a2400"; ctx.lineWidth = 5; ctx.font = "bold 44px sans-serif"; ctx.textAlign = "center"; ctx.strokeText("!", x, l.y - 300); ctx.fillText("!", x, l.y - 300); ctx.restore(); }
  }
  if (r.id === "mountain") {
    for (const g of z5.scouts) z5DrawMan(g, camX);
    // a cleft about to let a scout out: dust in its mouth, a "!" over it
    for (const k of z5.clefts) if (k.warn > 0) {
      const x = k.x - camX, a = 0.5 + 0.5 * Math.sin(now * 14), gr = ctx.createRadialGradient(x, FOOT - 60, 10, x, FOOT - 60, 130);
      gr.addColorStop(0, "rgba(214,184,140,0.6)"); gr.addColorStop(1, "rgba(214,184,140,0)"); ctx.fillStyle = gr; ctx.fillRect(x - 130, FOOT - 190, 260, 190);
      ctx.save(); ctx.globalAlpha = 0.6 + 0.4 * a; ctx.fillStyle = "#ffdc4a"; ctx.strokeStyle = "#3a2400"; ctx.lineWidth = 5; ctx.font = "bold 48px sans-serif"; ctx.textAlign = "center";
      ctx.strokeText("!", x, FOOT - 250); ctx.fillText("!", x, FOOT - 250); ctx.restore();
    }
    const E = z5SiegeEdges();
    const moving = E && z5.lastEdges ? Math.abs(E[0] - z5.lastEdges[0]) + Math.abs(E[1] - z5.lastEdges[1]) > 0.05 : true; z5.lastEdges = E;
    if (E) {   // the two fronts: Saul's men in a line, dust in front of them (standing, not walking in place, when they've stopped)
      for (const [edge, dir] of [[E[0], 1], [E[1], -1]]) {
        for (let i = 0; i < 5; i++) {
          const x = edge - dir * (40 + i * 70) - camX; if (x < -300 || x > W + 300) continue;
          if (!moving && SPR.saul_soldier_look) drawSprite("saul_soldier_look", frameOf("saul_soldier_look", now * 0.5 + i * 0.37), x, FOOT - (i % 2) * 6, dir, Z5.SIEGE.K * (1 - i * 0.04));
          else if (SPR.saul_soldier_walk) drawSprite("saul_soldier_walk", frameOf("saul_soldier_walk", now * (z5.siege && z5.siege.rush > 0 ? 3 : 1.4) + i * 0.37), x, FOOT - (i % 2) * 6, dir, Z5.SIEGE.K * (1 - i * 0.04));
        }
        const x = edge - camX; const g = ctx.createRadialGradient(x, FOOT - 40, 10, x, FOOT - 40, 160);
        g.addColorStop(0, "rgba(214,184,140,0.45)"); g.addColorStop(1, "rgba(214,184,140,0)"); ctx.fillStyle = g; ctx.fillRect(x - 160, FOOT - 200, 320, 200);
      }
      // Saul himself, behind his men on the left; at the end (Glen 11-17) the scene played out where David can see it
      const M = z5.siege && z5.siege.mess, K = Z5.SIEGE.K;
      if (!M) { if (SPR.saul_walk) drawSprite("saul_walk", frameOf("saul_walk", now), E[0] - 360 - camX, FOOT, 1, K); }
      else {
        const t = M.t, go = M.go, dx = M.x, back = go != null ? t - go : -1;
        // Saul: walks up behind his men, stops, turns to the messenger; then away
        const cx = M.cx, s0 = cx - 160, sAt = cx + 330;
        if (back < 0) { const u = Math.min(1, t / 1.6), sx = s0 + (sAt - s0) * u;
          if (u < 1 && SPR.saul_walk) drawSprite("saul_walk", frameOf("saul_walk", t), sx - camX, FOOT, 1, K);
          else if (SPR.saul_stand) drawSprite("saul_stand", 0, sx - camX, FOOT, t > 2.4 ? -1 : 1, K); }
        else if (SPR.saul_walk) drawSprite("saul_walk", frameOf("saul_walk", t), sAt - back * 130 - camX, FOOT, -1, K);
        // his men: three march right past in front of David, hiding; called back, they turn and go
        for (let i = 0; i < 3; i++) {
          const x0 = cx - 120 - i * 120, until = back < 0 ? t : go, x = x0 + until * 150 - (back > 0 ? back * 180 : 0);
          if (SPR.saul_soldier_walk) drawSprite("saul_soldier_walk", frameOf("saul_soldier_walk", t * 1.4 + i * 0.37), x - camX, FOOT + 4 - (i % 2) * 6, back > 0 ? -1 : 1, K * (1 - i * 0.03));
        }
        // the messenger: in at a gallop from behind them, to Saul; then off again
        if (SPR.messenger_gallop) {
          const mAt = sAt - 170, m0 = cx - 700, arrive = 0.9 + (mAt - m0) / 520;
          if (t < 0.9) {} else if (back < 0.6 && t < arrive) drawSprite("messenger_gallop", frameOf("messenger_gallop", t), m0 + (t - 0.9) * 520 - camX, FOOT, -1, 0.85);
          else if (back < 0.6) drawSprite(SPR.messenger_talk ? "messenger_talk" : "messenger_gallop", frameOf("messenger_talk", t), mAt - camX, FOOT, -1, 0.85);
          else drawSprite("messenger_gallop", frameOf("messenger_gallop", t), mAt - (back - 0.6) * 520 - camX, FOOT, 1, 0.85);
        }
      }
    }
  }
}
// the mountain's clock
const Z5_WASH = typeof document !== "undefined" ? document.createElement("canvas") : null;
function z5DrawOver() {
  const r = region.room; if (!r || !Z5_WASH) return;
  // the clock (no number: a sun going down), while Saul's men close in
  const S = z5.siege;
  if (r.id === "mountain" && S && !S.mess) {
    ctx.save(); ctx.fillStyle = "rgba(20,12,6,0.7)"; ctx.fillRect(W / 2 - 160, 18, 320, 34);
    ctx.fillStyle = "#e0a23a"; ctx.fillRect(W / 2 - 150, 28, 300 * Math.min(1, S.t / Z5.SIEGE.END), 14);
    ctx.strokeStyle = "#ffe08a"; ctx.strokeRect(W / 2 - 150, 28, 300, 14);
    ctx.fillStyle = "#ffe08a"; ctx.font = "bold 14px Georgia, serif"; ctx.textAlign = "center"; ctx.fillText("Hold on", W / 2, 66);
    ctx.restore();
  }
}
