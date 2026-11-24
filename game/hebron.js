// World 8, stop 1: Hebron (1 Samuel 31; 2 Samuel 1-3; 5:1-5; 1 Chronicles 12:23-40). HEBRON_PLAN.md. Part Two's tenth
// region on region.js's engine: loaded before region.js, which takes HEB as its REGION when the address is "#9-14"
// (saved as "hebron"). (Part One's world8.js already has a W8: so HEB.)
//   The crawl (Gilboa, off-screen) -> Ziklag by day (cut scene: the messenger, the torn clothes, the lament; then
//   "Shall I go up?") -> the Road Up to Hebron (the families behind him) -> Hebron (anointed over Judah, 2:4) -> the Pool
//   of Gibeon (cut scene) -> the Chase (played as Asahel, after Abner, 2:18-23) -> Hebron again (cut scene: David weeps
//   at Abner's grave, 3:31-38) -> the Feast (the tribes come, 1 Chronicles 12) -> the Gate (anointed over all Israel, 5:1-5).
// Glen 11-24: the crawl + a cut scene to open; the tribes arrive in the middle; show Asahel; Gibeon is the fight, then
//   the anointing; show David weeping (Abner) as a cut scene; tell the Jabesh Gilead errand; the lament a cut scene.
// Stand-in art till Glen's (ART_PROMPTS_HEBRON.md).

const HB = {
  NPC_K: 0.9,
  ELDERS: [[32, "elder_staff_idle", 1.08], [36, "prophet_old", 1.25], [40, "elder_scroll_stand", 1.08], [44, "hanan_idle", 1.1], [48, "trader_idle", 1.05]],   // (each once; Glen's anointing elder pours the oil)
  ANOINT: { K: 1.08, AT: 46, WAIT: 3.0 },   // (his size; px from David to stand so the oil falls on his head; the kneel, s)   // (Glen's two elders, 11-24: the staff, the scroll)
  STAFFMAN_K: 1.1,
  TRIBE_K: 1.1, TRIBE_PAIR: 70,   // (Glen's tribe leaders: their size; px between Reuben's man and Gad's)
  TRIBE_SIZE: { judah: 1.5 },   // (Judah's clip was shot from farther back, his big lion flag measured with him)   // (Glen's walking-stick man, 11-24: staffman_idle/walk/run, cut at David's height; in place of the open-mouthed one)   // the elders of Israel at the gate (column, sprite, size)
  DONKEY_K: 1.25,   // (Glen 11-24: "super small", then at 1.7 "too big: make it between") the tribes' donkeys
  FOLLOW_GAP: 70, FOLLOW_SPEED: 300,          // (the families behind David on the road: px apart, their walking speed)
  ASAHEL: { WALK: 290, RUN: 600, JUMP: 1060 },   // (the chase: David's speeds while you play Asahel, player2.js's)
  // (Glen 11-24: "it was fast and easy. Let's have him go up a hill ... or down a hill") Abner no longer waits for you:
  //  he runs his own pace up over the ridge and down, then up the Hill of Ammah. Fall into a gully, or let him get
  //  LOSE px ahead, and he's away: back to the last stretch you reached (no heart lost)
  ABNER: { SPEED: 455, CLIMB: 0.8, HOP: 90, K: 1, LOSE: 1500, START: 700, NEAR: 560 },   // (px/s on the flat, x on a ledge-hop up, how high he leaps, how far ahead he's lost, how near you start him, how near for a warning)
  WARN: [87, 108, 158],                       // (columns of the chase where Abner looks back: 2:20, 2:21, 2:22 and the end)
  CHASE_H: [0, 462, 312, 162, 12, -138],      // (the chase's heights: the ground (0 = GR*T), then a ledge at a time up, as Ziph's tall hill)
  // where Abner runs: [first col, last col, height] in order; the ledges are built from the same list
  CHASE_ROUTE: [[0, 21, 0], [26, 30, 0], [31, 34, 1], [36, 39, 2], [41, 44, 3], [46, 49, 4], [51, 68, 5], [71, 74, 4], [76, 79, 3],
    [81, 84, 2], [86, 89, 1], [91, 95, 0], [100, 112, 0], [117, 120, 0], [121, 124, 1], [126, 166, 2]],
  CHASE_BACK: [6, 91, 117],                   // (the stretches to go back to when Abner gets away)
  // (Glen 11-24: "a cut scene of ashael climbing up the last ridge and then wham") from the foot of the Hill of Ammah
  //  Asahel goes up by himself, Abner turns, warns him (2:22), and strikes with the back end of the spear (2:23)
  BLOW: { FILM_HIT: 4.05, REACH: 170, FROM: 117, HOP: 0.55, RUN: 620, STOP: 150, GAP: 100, FLASH: 0.3, HIT_FPS: 22, HIT_HOLD: 6, BACK: 110, SPEAR: 230 },
  LAMENT_SECS: 6,                             // (each line of the lament on screen; A for the next)
  TRIBE_SPEED: 140, TABLE: 14,                // (the tribes walking in; the feast table's column in the Feast)
  REACH: 110,                                 // (px: Up by a tribe's leader to welcome them; by the table to set down)
  TINT: { chase: [150, 60, 20, 0.2] },
};
// (Glen 11-24) the tribes come in pairs (1 Chronicles 12:24-37), each leader with a laden donkey and his banner; each
//  brings one of the foods of 12:40 for the feast
// (Glen 11-24: "Here is the twelve tribes- they can usher in the donkey and gifts") his leaders, each with his tribe's
//  banner: tribe_<art>_walk / _stand; [5] the art, [6] a second leader walking with him. Benjamin and Manasseh: the
//  walking-stick man and a drawn banner till theirs come
const HB_TRIBES = [
  ["Judah", "who bore shield and spear: six thousand eight hundred (12:24)", "#c8a030", "bread", "judah"],
  ["Simeon", "mighty men of valor: seven thousand one hundred (12:25)", "#8a3030", "grain_sack", "simeon"],
  ["Levi", "four thousand six hundred, and Zadok, a young man mighty of valor (12:26, 28)", "#e8e0d0", "gift_oil", "levi"],
  ["Benjamin", "Saul's relatives: three thousand (12:29)", "#3a6aa8", "fig_cake", "benjamin"],
  ["Ephraim", "twenty thousand eight hundred, mighty men of valor (12:30)", "#2a7a3a", "raisins", "ephraim"],
  ["Manasseh", "eighteen thousand, mentioned by name, to come and make David king (12:31)", "#6a4a8a", "wineskin"],
  ["Issachar", "men who had understanding of the times, to know what Israel ought to do (12:32)", "#2a2a2a", "bread", "issachar"],
  ["Zebulun", "fifty thousand, not of double heart (12:33)", "#d07a20", "fig_cake", "zebulun"],
  ["Naphtali", "a thousand captains, and thirty-seven thousand with shield and spear (12:34)", "#a8a040", "raisins", "naphtali"],
  ["Dan", "twenty-eight thousand six hundred (12:35)", "#7a5030", "grain_sack", "dan"],
  ["Asher", "forty thousand (12:36)", "#4aa0a0", "gift_oil", "asher"],
  ["Reuben and Gad", "from the other side of the Jordan: one hundred twenty thousand (12:37)", "#a04a70", "wineskin", "reuben", "gad"],
];

const HEB = {
  key: "hebron", name: "Hebron", start: "ziklag", strCap: 10,
  carry: ["gibeah", "ramah", "nobgath", "adullam", "keilah", "ziph", "engedi", "carmel", "w7"],
  rooms: [
    { id: "ziklag", name: "Ziklag", w: 60, bg: "w4_1", mx: 0, my: 1, mw: 2,
      get right() { return hbHas("hb_ask") ? "road" : null; },
      far: "keilah/town/far", mid: "keilah/town/mid.png", midY: 0, near: "w8/hebron/ziklag_near.png", nearK: 0.55 },   // (stand-in: Keilah's town by day; Glen's own near ground, 11-24: "way too big", zoomed out)
    { id: "road", name: "The Road Up to Hebron", w: 120, bg: "w4_1", mx: 2, my: 1, mw: 4, left: "ziklag", right: "hebron",
      far: "keilah/road/far", mid: "keilah/road/mid.png", midY: 0, near: "keilah/road/near.png" },   // (stand-in: Keilah's road, by day)
    { id: "hebron", name: "Hebron", w: 90, bg: "w4_1", mx: 6, my: 1, mw: 3, left: "road",
      get right() { return hbHas("hb_judah") && !hbHas("hb_chase") ? "gibeon" : null; },
      far: "w3/nob/far", mid: "w3/nob/mid.png", midP: 0.6, near: "w3/nob/near.png", nearY: 606, floor: "w3/nob/floor.png" },   // (stand-in: Nob)
    { id: "gibeon", name: "The Pool of Gibeon", w: 60, bg: "w4_1", mx: 9, my: 2, mw: 2,
      get right() { return hbHas("hb_pool") ? "chase" : null; },
      far: "engedi/spring/far", mid: "engedi/spring/mid.png", midY: 0 },   // (stand-in: En-Gedi's spring)
    { id: "chase", name: "The Hill of Ammah", w: 170, bg: "w4_1", mx: 11, my: 2, mw: 5, left: "gibeon",
      far: "ziph/mountain/far", mid: "ziph/mountain/mid.png", midY: 0, near: "ziph/mountain/near.png" },   // (stand-in: Ziph's mountain, at sunset)
    { id: "feast", name: "Hebron: the Tribes Come", w: 110, bg: "w4_1", mx: 6, my: 0, mw: 3,
      get right() { return hbHas("hb_feasted") ? "gate" : null; },
      far: "carmel/camp/far", mid: "carmel/camp/mid.png", midY: 224, near: "carmel/camp/near.png", nearK: 0.4 },   // (stand-in: Carmel's camp)
    { id: "gate", name: "The Gate of Hebron", w: 60, bg: "w4_1", mx: 9, my: 0, mw: 2, left: "feast",
      far: "w3/gath/far", mid: "w3/gath/mid.png", midP: 1, midX: 170, midY: -44, near: "w3/gath/near.png", nearY: 606, floor: "w3/gath/floor.png" },   // (stand-in: Gath's gate)
  ],
  steps: [], entries: [], ownPage: false,   // (the Journal: a page at a time, below; no page of its own)
  // (Glen: "I am using all of the same song") the song on the last page: Verse 4 till Glen's next verse
  verse: ["Save me, O God, by Your great name", "Listen when I pray", "For strangers rise to seek my soul", "And will not walk Your way",
          "The spear stood waiting at his head", "But I would not strike the king", "You are my helper, You sustain me", "To You my thanks I'll bring"],
  // the Journal, a page after each part, a psalm of David's beside it (WEB, "the LORD"; David's words are drafts for Glen)
  spreads: [
    { id: "hs_lament", when: "hb_lament", title: "Ziklag",
      entry: ["Saul and Jonathan are dead. Jonathan, my brother. The men say the throne is mine now. I will not cheer. I tore my clothes, and we wept until evening for the king the LORD anointed.", "2 Samuel 1:11-12"],
      psalm: { ref: "2 Samuel 1", text: ["Saul and Jonathan were lovely and pleasant in their lives. In their death, they were not divided. They were swifter than eagles. They were stronger than lions. (1:23)",
        "I am distressed for you, my brother Jonathan. You have been very pleasant to me. (1:26)"] } },
    { id: "hs_judah", when: "hb_judah", title: "Hebron",
      entry: ["Before I took one step I asked the LORD, and He said, To Hebron. The men of Judah anointed me king over Judah. The rest of Israel still follows Saul's house. I will wait for the LORD.", "2 Samuel 2:1-4"],
      psalm: { ref: "Psalm 27", text: ["I am still confident of this: I will see the goodness of the LORD in the land of the living. Wait for the LORD. Be strong, and let your heart take courage. Yes, wait for the LORD. (27:13-14)"] } },
    { id: "hs_gibeon", when: "hb_grave", title: "Gibeon",
      entry: ["Asahel was as swift as a gazelle, and he would not turn aside. Now Abner is dead too, and I wept at his grave. A prince and a great man has fallen in Israel. War makes graves on both sides.", "2 Samuel 2:23; 3:31-38"],
      psalm: { ref: "Psalm 34", text: ["The LORD is near to those who have a broken heart, and saves those who have a crushed spirit. Many are the afflictions of the righteous, but the LORD delivers him out of them all. (34:18-19)"] } },
    { id: "hs_tribes", when: "hb_feasted", title: "The Tribes",
      entry: ["They came from every tribe, with a perfect heart, to make me king. Bread and figs and raisins on donkeys and camels. Three days we ate together, for there was joy in Israel.", "1 Chronicles 12:38-40"],
      psalm: { ref: "Psalm 16", text: ["The LORD assigned my portion and my cup. You made my lot secure. The lines have fallen to me in pleasant places. Yes, I have a good inheritance. (16:5-6)"] } },
    { id: "hs_end", when: "hb_end", title: "The Gate of Hebron", final: true,
      entry: ["Thirty years old. Long ago old Samuel poured oil on a shepherd boy's head in Bethlehem. Today all Israel did. The LORD kept His word, in His time, not mine.", "2 Samuel 5:3-4"],
      psalm: { ref: "Psalm 23:5", text: "You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over." } },
  ],
  build: R => hbBuild(R), enter: r => hbEnter(r), update: (dt, r) => hbUpdate(dt, r),
  holdDavid: d => hbHold(d), drawDavid: (d, x, y) => hbDrawDavid(d, x, y),
  draw: camX => hbDraw(camX), drawFront: camX => hbDrawFront(camX), drawOver: () => hbDrawOver(),
};

const hb = { told: {}, people: [], follow: [], tribes: [], foods: [], cine: null, lament: null, abner: null, carry: null, table: [], fast: null, grave: null, elder: null };
const hbHas = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function hbTell(k, text) { if (!hb.told[k]) { hb.told[k] = true; toast(text); } }
const HB_SAY = (who, text) => ({ say: [who, text] });
const hbFree = () => !region.script.length && region.wait <= 0 && !region.trans && !(dialog.t > 0);
function hbPerson(room, spr, x, dir = 1, show = null, k = HB.NPC_K) { const p = { room, spr, x, y: FOOT, dir, show, k, t: Math.random() * 3 }; hb.people.push(p); return p; }
const hbRoomX = (id, k) => (roomById(id).c0 + k) * T;
// you play Asahel from the pool of Gibeon to the end of the chase (2:18-23)
const hbAsahel = () => { const r = region.room; return !!r && (r.id === "gibeon" || r.id === "chase") && !hbHas("hb_chase"); };

// ---------------------------------------------------------------------------------------------------------------------
function hbBuild(R) {
  for (const k of ["people", "follow", "tribes", "foods", "table"]) hb[k].length = 0;
  hb.cine = null; hb.lament = null; hb.carry = null; hb.grave = null;
  const P = hbPerson;

  // -- Ziklag by day (2 Samuel 1): the messenger, the lament, "Shall I go up?"
  let c = R("ziklag");
  { const rm = "ziklag", X = k => (c + k) * T;
    ground(c, c + 59);
    for (const [k, img, dir] of [[8, "men_day_sit_beard", 1], [12, "men_day_sit_stripes", 1]]) hb.people.push({ room: rm, img, x: X(k), dir, still: true });
    hb.abiathar = P(rm, "abiathar_stand", X(18), 1);
    hb.msg = P(rm, "villager_man_run", X(64), -1, () => !!hb.msgOn);   // (stand-in: the messenger, running in)
  }
  // -- The Road Up to Hebron (2:2-3): every man with his household
  c = R("road");
  { const rm = "road";
    ground(c, c + 119);
    critter("scorpion", c + 22, GR - 1, 2); rHole(rm, c + 34, 3); rWild("viper", rm, c + 48);
    rBoulder(rm, c + 62); rHole(rm, c + 78, 3); critter("scorpion", c + 92, GR - 1, 2); rWild("wildass", rm, c + 104, { range: 3 });
  }
  // the families behind David (Abigail, Ahinoam, the men's wives and children)
  hb.follow.push({ spr: "abigail_walk", still: "abigail_idle", k: 1 }, { spr: "villager_woman_run", still: "villager_woman_stand", k: HB.NPC_K },
                 { spr: "villager_braidgirl_run", still: "villager_braidgirl_stand", k: 1 }, { spr: "villager_scarfwoman_run", still: "villager_woman_stand", k: HB.NPC_K });
  hb.follow.forEach((f, i) => Object.assign(f, { x: hbRoomX("road", 2) - i * HB.FOLLOW_GAP, t: i * 0.3, moving: false, dir: 1 }));

  // -- Hebron (2:4): the men of Judah; the elder with the horn of oil
  c = R("hebron");
  { const rm = "hebron", X = k => (c + k) * T;
    ground(c, c + 89);
    // (Glen 11-24: "We are still using Samuel as anointing David ... two of the same people here": no one twice on a
    //  screen till his new men come; an elder anoints, not Samuel)
    hb.judah = [P(rm, "villager_man_stand", X(44), -1), P(rm, "elder_scroll_stand", X(48), -1, null, 1.08), P(rm, "staffman_idle", X(58), -1, null, HB.STAFFMAN_K)];
    // (Glen's anointing elder, 11-24: holding the horn of oil; he pours it over David as he kneels: hbAnointNow)
    hb.elder = P(rm, "elder_anoint_idle", X(53), -1, () => !hbHas("hb_chase"), HB.ANOINT.K);
    hb.grave = { room: rm, x: X(70) };
  }
  // -- The Pool of Gibeon (2:12-17): Joab's men on one side, Abner's on the other
  c = R("gibeon");
  { const rm = "gibeon", X = k => (c + k) * T;
    ground(c, c + 59);
    hb.joab = P(rm, "soldier_talk", X(12), 1, null, 0.85);   // (stand-in: Joab)
    P(rm, "abishai_idle", X(16), 1);
    for (const k of [40, 44, 48]) P(rm, "saul_soldier_listen", X(k), -1, () => !hbHas("hb_pool"));   // (Abner's men: Saul's soldiers)
    hb.abnerPool = P(rm, "abner_talk", X(36), -1, () => !hbHas("hb_pool"));
  }
  // -- The Chase (2:18-23): gaps and rocks to leap as Asahel; Abner ahead
  c = R("chase");
  { const rm = "chase";
    ground(c, c + 169);
    // up over the ridge (above the top of the screen) and down, a gully under it; then the Hill of Ammah (2:24)
    for (const [a, b, lv] of HB.CHASE_ROUTE) if (lv) rLedge(rm, c + a, hbChaseY(lv), b - a + 1);
    for (const [k, w] of [[22, 4], [31, 60], [96, 4], [113, 4], [121, 46]]) rHole(rm, c + k, w);
    rBoulder(rm, c + 104);
    hb.abner = { room: rm, x: hbRoomX("chase", 16), y: FOOT, t: 0, st: "wait", warned: 0, dir: 1, back: 0 };
  }
  // -- The Feast (1 Chronicles 12): the table; the tribes come in pairs from the right
  c = R("feast");
  { const rm = "feast";
    ground(c, c + 109);
    campfire(c + 4, GR - 1);   // an olive press (the save point)
    const done = hbHas("hb_feasted");
    HB_TRIBES.forEach(([name, line, color, food, art, art2], i) => hb.tribes.push({ room: rm, name, line, color, food, art, art2, i, wave: i,   // (Glen 11-24: "two people at once ... gets confusing": one tribe at a time)
      slot: hbRoomX("feast", 56), x: hbRoomX("feast", 116), st: done ? "home" : "wait", t: 0 }));
    if (done) for (const t of HB_TRIBES) hb.table.push(t[3]);
  }
  // -- The Gate (5:1-5): the elders of all Israel
  c = R("gate");
  { const rm = "gate", X = k => (c + k) * T;
    ground(c, c + 59);
    // (Glen 11-24: not the open-mouthed staff man; the little one was prophet_old at NPC_K, Ramah draws him at 1.2)
    for (const [k, spr, sz] of HB.ELDERS) P(rm, spr, X(k), -1, null, sz);
    hb.gateElder = P(rm, "elder_anoint_idle", X(27), -1, null, HB.ANOINT.K);
  }
}

// ---------------------------------------------------------------------------------------------------------------------
function hbEnter(r) {
  if (r.id === "road" && hbHas("hb_ask") && !hbHas("hb_road")) {
    regionAdd("taken", "hb_road");
    rPlay([HB_SAY("", "So David went up there with his two wives, Ahinoam the Jezreelitess, and Abigail the wife of Nabal the Carmelite. David brought up his men who were with him, every man with his household. (2 Samuel 2:2-3)"),
      { fn() { toast("Up to Hebron (right). The families follow you."); } }]);
  }
  if (r.id === "gibeon" && !hbHas("hb_pool")) hbPool();
  if (r.id === "chase" && !hbHas("hb_chase")) hbTell("chase", "After Abner (right), up the ledges and over the hill! Don't fall behind, or he gets away.");
  if (r.id === "feast" && !hbHas("hb_tribes")) {
    regionAdd("taken", "hb_tribes");
    rPlay([HB_SAY("", "Then all the tribes of Israel came to David at Hebron. (2 Samuel 5:1)"),
      { fn() { toast("Welcome each tribe at the gate of the camp (Up by its leader). Carry what they bring to the table (left)."); } }]);
  }
}

function hbUpdate(dt, r) {
  const d = david, free = hbFree();
  for (const p of hb.people) p.t += dt;
  if (hb.msgRun) hb.msg.x -= 240 * dt;   // (the messenger running in)
  if (hb.lament) hb.lament.t += dt;
  // play as Asahel (Gibeon, the chase): his speeds while it lasts
  const as = hbAsahel();
  if (as && !hb.fast) { hb.fast = { w: TUNE.WALK_SPEED, r: TUNE.RUN_SPEED, j: TUNE.JUMP_SPEED }; TUNE.WALK_SPEED = HB.ASAHEL.WALK; TUNE.RUN_SPEED = HB.ASAHEL.RUN; TUNE.JUMP_SPEED = HB.ASAHEL.JUMP; }
  else if (!as && hb.fast) { TUNE.WALK_SPEED = hb.fast.w; TUNE.RUN_SPEED = hb.fast.r; TUNE.JUMP_SPEED = hb.fast.j; hb.fast = null; }
  // the start (after the crawl): the cut scene at Ziklag
  if (r.id === "ziklag" && !hbHas("hb_lament") && !hb.cine && free) hbZiklag();
  if (hb.lament && (pressed("a") || pressed("b")) && region.wait > 0.4) region.wait = 0.01;   // (A: the next line)
  // Hebron: the men of Judah (2:4)
  if (r.id === "hebron" && !hbHas("hb_judah") && free && d.x > hbRoomX("hebron", 38)) hbJudah();
  hbFollow(dt, r);
  hbChase(dt, r, free);
  hbFeast(dt, r, free);
  if (r.id === "gate" && hbHas("hb_feasted") && !hbHas("hb_end") && free && d.x > hbRoomX("gate", 20)) hbAnoint();
}
// the elder steps up beside David as he kneels and pours the horn of oil once, then stands holding it
function hbAnointNow(p) { p.x = david.x + HB.ANOINT.AT; p.spr = "elder_anoint"; p.t = 0; p.once = "elder_anoint_idle"; }
function hbHold(d) {
  if (hb.auto) { d.vx = d.vy = 0; return true; }   // (moved in hbChase, on game time)
  if (hb.cine || hb.lament) { d.vx = 0; return true; }
  return false;
}
// Asahel moved by the cut scene: a list of [x, y, "hop" | "run"] legs, from where he is
function hbAutoStep(d, dt) {
  const a = hb.auto;
  const leg = a.legs[a.i]; if (!leg) { d.vx = d.vy = 0; return; }
  if (a.u === 0) { a.x0 = d.x; a.y0 = d.y; }
  const [x, y, kind] = leg, dist = Math.abs(x - a.x0);
  a.u = Math.min(1, a.u + dt / (kind === "hop" ? HB.BLOW.HOP : Math.max(0.05, dist / HB.BLOW.RUN)));
  d.x = a.x0 + (x - a.x0) * a.u;
  d.y = kind === "hop" ? a.y0 + (y - a.y0) * a.u - Math.sin(a.u * Math.PI) * 110 : y;
  d.vx = d.vy = 0; d.facing = x >= a.x0 ? 1 : -1; d.onGround = kind !== "hop" || a.u >= 1;
  a.kind = kind;
  if (a.u >= 1) { a.i++; a.u = 0; if (!a.legs[a.i]) a.kind = null; }
}
const hbAutoTime = legs => { let t = 0, x = david.x; for (const [lx, , k] of legs) { t += k === "hop" ? HB.BLOW.HOP : Math.abs(lx - x) / HB.BLOW.RUN; x = lx; } return t; };
// (the strike shakes the camera with main.js's finalBlow.shake, the final stone's; we wear it off ourselves while it's not on)

// the cut scenes: letterboxed, the place named
const hbCine = (title, sub) => ({ fn() { hb.cine = { at: performance.now() / 1000, title, sub }; david.vx = 0; } });
const hbCineEnd = { fn() { hb.cine = null; } };

// 2 Samuel 1: the messenger; the torn clothes; the lament; then "Shall I go up?" (2:1)
function hbZiklag() {
  const d = david;
  d.x = hbRoomX("ziklag", 30); d.facing = 1; d.vx = 0; snapCamera();
  hb.msg.x = hbRoomX("ziklag", 62); hb.msg.spr = "villager_man_run";
  rPlay([
    hbCine("Ziklag", "Three days after the battle on Mount Gilboa"),
    { wait: 3 },
    HB_SAY("", "After the death of Saul, when David had returned from the slaughter of the Amalekites, and David had stayed two days in Ziklag, on the third day, behold, a man came out of the camp from Saul, with his clothes torn and earth on his head. (2 Samuel 1:1-2)"),
    { fn() { hb.msgOn = true; hb.msgRun = true; } }, { wait: 2.2 },
    { fn() { hb.msgRun = false; hb.msg.spr = "villager_man_stand"; } },
    HB_SAY("David", "“Where do you come from?” (2 Samuel 1:3)"),
    HB_SAY("The messenger", "“I have escaped out of the camp of Israel.” (2 Samuel 1:3)"),
    HB_SAY("David", "“How did it go? Please tell me.” (2 Samuel 1:4)"),
    HB_SAY("The messenger", "“The people have fled from the battle, and many of the people also have fallen and are dead. Saul and Jonathan his son are dead also.” (2 Samuel 1:4)"),
    HB_SAY("", "He held out the crown that was on Saul's head and the bracelet that was on his arm. (2 Samuel 1:10)"),
    { fn() { hb.weep = { t0: performance.now() / 1000 }; } },
    HB_SAY("", "Then David took hold of his clothes and tore them; and all the men who were with him did likewise. They mourned, wept, and fasted until evening for Saul and for Jonathan his son, and for the people of the LORD, and for the house of Israel. (2 Samuel 1:11-12)"),
    { fn() { hb.weep = null; hb.msgOn = false; hb.harp = true; } },
    ...hbLament(),
    { fn() { hb.harp = false; regionAdd("taken", "hb_lament"); } }, { jscene: "hs_lament" },
    { fn() { hb.abiathar.x = david.x - 110; hb.abiathar.spr = "abiathar_ephod"; } },
    HB_SAY("", "After this, David inquired of the LORD, saying, “Shall I go up into any of the cities of Judah?” (2 Samuel 2:1)"),
    HB_SAY("The LORD", "“Go up.” (2 Samuel 2:1)"),
    HB_SAY("David", "“Where shall I go up?” (2 Samuel 2:1)"),
    HB_SAY("The LORD", "“To Hebron.” (2 Samuel 2:1)"),
    { fn() { hb.abiathar.spr = "abiathar_stand"; regionAdd("taken", "hb_ask"); } }, hbCineEnd,
    { fn() { toast("Up to Hebron (right)."); } },
  ].map(s => s.jscene ? { fn() { jsceneOpen(false, s.jscene); } } : s));
}
// the lament (Glen 11-24: "do cut scene for lament"): David at his harp, the song's lines one at a time (2 Samuel 1:17-27;
//  1:20-22 left out). WEB
const HB_LAMENT = [
  ["David lamented with this lamentation over Saul and over Jonathan his son.", "2 Samuel 1:17"],
  ["“Your glory, Israel, was slain on your high places!", "How the mighty have fallen!”", "1:19"],
  ["“Saul and Jonathan were lovely and pleasant in their lives.", "In their death, they were not divided.", "They were swifter than eagles.", "They were stronger than lions.”", "1:23"],
  ["“You daughters of Israel, weep over Saul,", "who clothed you delicately in scarlet,", "who put ornaments of gold on your clothing.”", "1:24"],
  ["“How the mighty have fallen in the middle of the battle!", "Jonathan was slain on your high places.”", "1:25"],
  ["“I am distressed for you, my brother Jonathan.", "You have been very pleasant to me.", "Your love to me was wonderful,", "surpassing the love of women.”", "1:26"],
  ["“How the mighty have fallen,", "and the weapons of war have perished!”", "1:27"],
];
function hbLament() {
  const out = [{ fn() { hb.lament = { i: -1, t: 0 }; if (typeof journalMusic !== "undefined") { hushStage(); journalMusic.currentTime = 0; journalMusic.volume = 0.5; journalMusic.play().catch(() => {}); } } }];
  HB_LAMENT.forEach((_, i) => out.push({ fn() { hb.lament.i = i; hb.lament.t = 0; } }, { wait: HB.LAMENT_SECS }));
  out.push({ fn() { hb.lament = null; if (typeof journalMusic !== "undefined" && !journalMusic.paused) journalMusic.pause(); } });
  return out;
}

// the families behind David on the road (2:2-3), till Hebron
function hbFollow(dt, r) {
  const on = hbHas("hb_ask") && !hbHas("hb_judah") && (r.id === "road" || r.id === "hebron");
  hb.followOn = on; if (!on) return;
  let lead = david.x;
  for (const f of hb.follow) {
    const tx = lead - HB.FOLLOW_GAP * Math.sign(david.facing || 1), dx = tx - f.x;
    if (Math.abs(dx) > 1200) f.x = tx - Math.sign(dx) * 400;   // (left far behind: catch up out of sight)
    const v = Math.abs(dx) > 8 ? Math.sign(dx) * Math.min(HB.FOLLOW_SPEED, Math.abs(dx) * 4) : 0;
    f.x += v * dt; f.moving = Math.abs(v) > 20; if (v) f.dir = Math.sign(v); f.t += dt; lead = f.x;
  }
}

// Hebron: anointed over Judah (2:4-11)
function hbJudah() {
  const d = david;
  rPlay([
    hbCine("Hebron", "The hill country of Judah"),
    { fn() { d.vx = 0; d.facing = 1; } }, { wait: 2.5 },
    HB_SAY("", "They lived in the cities of Hebron. The men of Judah came, and there they anointed David king over the house of Judah. (2 Samuel 2:3-4)"),
    { fn() { hb.kneel = true; hbAnointNow(hb.elder); } }, { wait: HB.ANOINT.WAIT },
    { fn() { hb.kneel = false; regionAdd("taken", "hb_judah"); } },
    HB_SAY("", "They told David, “The men of Jabesh Gilead were those who buried Saul.” David sent messengers to the men of Jabesh Gilead, and said to them, “Blessed are you by the LORD, that you have shown this kindness to your lord, even to Saul, and have buried him. Now may the LORD show loving kindness and truth to you.” (2 Samuel 2:4-6)"),
    HB_SAY("", "Now Abner the son of Ner, captain of Saul’s army, had taken Ishbosheth the son of Saul and brought him over to Mahanaim, and he made him king over all Israel. But the house of Judah followed David. (2 Samuel 2:8-10)"),
    { fn() { jsceneOpen(false, "hs_judah"); } },
    HB_SAY("", "Abner the son of Ner, and the servants of Ishbosheth the son of Saul, went out from Mahanaim to Gibeon. Joab the son of Zeruiah and David’s servants went out, and met them by the pool of Gibeon. (2 Samuel 2:12-13)"),
    hbCineEnd,
    { fn() { regionGo(hbRoomX("gibeon", 8), 1); } },
  ]);
}

// the pool of Gibeon (2:13-17), you are Asahel now
function hbPool() {
  david.x = hbRoomX("gibeon", 20); david.facing = 1; snapCamera();
  rPlay([
    hbCine("The Pool of Gibeon", "You are Asahel, Joab's youngest brother"),
    { wait: 2.5 },
    HB_SAY("", "They sat down, the one on the one side of the pool and the other on the other side of the pool. (2 Samuel 2:13)"),
    HB_SAY("Abner", "“Please let the young men arise and compete before us!” (2 Samuel 2:14)"),
    HB_SAY("Joab", "“Let them arise!” (2 Samuel 2:14)"),
    HB_SAY("", "Twelve of Abner’s men and twelve of David’s servants went over, and they fell down together. The battle was very severe that day; and Abner was beaten, and the men of Israel, before David’s servants. (2 Samuel 2:15-17)"),
    HB_SAY("", "The three sons of Zeruiah were there: Joab, Abishai, and Asahel. Asahel was as light of foot as a wild gazelle. Asahel pursued Abner. (2 Samuel 2:18-19)"),
    { fn() { regionAdd("taken", "hb_pool"); } }, hbCineEnd,
    { fn() { toast("Abner ran (right). After him!"); } },
  ]);
}

// the chase (2:19-23): Abner ahead, up and over the ridge and up the Hill of Ammah; he looks back and warns Asahel;
//  at the last, the end. He runs his own pace: lose him (or fall into a gully) and it's back to the last stretch
function hbChaseY(lv) { return lv ? HB.CHASE_H[lv] : GR * T; }
function hbAbnerY(x) {   // where Abner's feet are at x: on his route, or leaping between two pieces of it
  const col = x / T - roomById("chase").c0, R = HB.CHASE_ROUTE;
  for (let i = 0; i < R.length; i++) {
    const [a, b, lv] = R[i];
    if (col >= a && col <= b + 1) return { y: hbChaseY(lv) + 4, up: false };
    const n = R[i + 1]; if (!n || col <= b + 1 || col >= n[0]) continue;
    const u = (col - b - 1) / (n[0] - b - 1), y0 = hbChaseY(lv) + 4, y1 = hbChaseY(n[2]) + 4;
    return { y: y0 + (y1 - y0) * u - Math.sin(u * Math.PI) * HB.ABNER.HOP, up: y1 < y0 };
  }
  return { y: FOOT, up: false };
}
function hbChase(dt, r, free) {
  if (!finalBlow.on) finalBlow.shake = Math.max(0, finalBlow.shake - dt * 1.8);
  if (r.id === "chase") { if (hb.auto) hbAutoStep(david, dt); if (hb.blow) hb.blow.t += dt; }
  const A = hb.abner; if (!A || r.id !== "chase" || hbHas("hb_chase")) return;
  A.t += dt;
  const d = david, c0 = roomById("chase").c0, end = hbRoomX("chase", HB.WARN[2]), dcol = d.x / T - c0;
  for (let i = 0; i < HB.CHASE_BACK.length; i++) if (dcol >= HB.CHASE_BACK[i] && d.onGround && d.y <= GR * T + 4) A.back = Math.max(A.back, i);
  if (!free) { A.moving = false; return; }
  // lost him: down in a gully, or too far behind
  if ((d.y > GR * T + 2 * T && d.x > hbRoomX("chase", 22)) || (A.st === "run" && A.x - d.x > HB.ABNER.LOSE)) { hbChaseLost(); return; }
  if (A.st === "wait" && A.x - d.x < HB.ABNER.START) A.st = "run";
  if (A.st === "run") {
    const col = A.x / T - c0, stop = A.warned < 2 ? hbRoomX("chase", HB.WARN[A.warned]) : end;
    if (A.x < stop) {
      const p = hbAbnerY(A.x), v = HB.ABNER.SPEED * (p.up ? HB.ABNER.CLIMB : 1);
      A.x = Math.min(stop, A.x + v * dt); A.moving = true; A.dir = 1;
    } else {
      A.moving = false;   // he stops to look back once you're near
      if (A.warned < 2 && Math.abs(d.x - A.x) < HB.ABNER.NEAR) hbWarn(A.warned++);
      else if (A.warned >= 2 && d.onGround && Math.abs(d.x - A.x) < HB.BLOW.REACH && Math.abs(d.y - A.y) < T) { A.st = "turn"; hbFall(); }   // (you've caught up to him, up on the hill)
    }
  }
  A.y = hbAbnerY(A.x).y;
}
function hbChaseLost() {
  const A = hb.abner, d = david, k = HB.CHASE_BACK[A.back];
  toast(d.y > GR * T + 2 * T ? "Asahel fell! Abner is away. Back on his trail." : "Abner is out of sight! Back on his trail.");
  d.x = hbRoomX("chase", k); d.y = GR * T; d.vx = d.vy = 0; d.fallTop = null; d.facing = 1; snapCamera();
  A.x = hbRoomX("chase", HB.CHASE_BACK[A.back] + 8); A.st = "wait"; A.moving = false;
  A.warned = Math.max(A.warned, Math.min(2, A.back));   // (past the ridge: he's said 2:20; on the last stretch, 2:21 too)
}
function hbWarn(i) {
  const A = hb.abner;
  rPlay([{ fn() { A.look = true; } },
    ...(i === 0 ? [HB_SAY("Abner", "“Is that you, Asahel?” (2 Samuel 2:20)"), HB_SAY("Asahel", "“It is.” (2 Samuel 2:20)")]
      : [HB_SAY("Abner", "“Turn away to your right hand or to your left, and grab one of the young men, and take his armor.” (2 Samuel 2:21)"),
         HB_SAY("", "But Asahel would not turn away from following him. (2 Samuel 2:21)")]),
    { fn() { A.look = false; } }]);
}
function hbFall() {
  // (Glen 11-24: "asahel runs up to abner who's back is faced away. Then the game takes over and abner turns to asahel
  //  and says whatever- then cut scene") you climb the Hill of Ammah yourself; Abner waits on top, his back to you
  const A = hb.abner, d = david;
  rPlay([
    hbCine("", ""),   // (no title: it would cover the hilltop)
    { fn() { d.vx = 0; d.facing = 1; } }, { wait: 0.5 },
    { fn() { A.look = true; A.spr = "abner_present"; A.t = 0; } }, { wait: 0.9 },   // he turns (the spear: in Glen's film)
    HB_SAY("Abner", "“Turn away from following me. Why should I strike you to the ground? How then could I look Joab your brother in the face?” (2 Samuel 2:22)"),
    HB_SAY("", "However, he refused to turn away. (2 Samuel 2:23)"),
    // (Glen 11-24: his film of the strike, through Asahel's eyes, made backwards and played forwards: the point toward
    //  him, the spear turned, the back end; then the dark. The game holds still while it plays)
    { fn() { hb.auto = null;
      preFilm.start({ src: "../assets/rooms/w8/hebron/abner_strike.mp4", cues: [[HB.BLOW.FILM_HIT, "stone_hit", 1], [HB.BLOW.FILM_HIT, "lion_hit", 0.7]] }, () => {
        hb.dark = { at: performance.now() / 1000 - 5 }; hb.fallen = true; hb.blow = null; A.spear = null; }); } },
    { wait: 1.2 },
    HB_SAY("", "Therefore Abner with the back end of the spear struck him, and he fell down there and died in the same place. As many as came to the place where Asahel fell down and died stood still. (2 Samuel 2:23)"),
    { fn() { A.st = "gone"; hb.fallen = true; } },
    HB_SAY("", "Then Abner called to Joab, and said, “Shall the sword devour forever?” So Joab blew the trumpet; and all the people stood still and pursued Israel no more, and they fought no more. (2 Samuel 2:26, 28)"),
    HB_SAY("", "They took up Asahel and buried him in the tomb of his father, which was in Bethlehem. (2 Samuel 2:32)"),
    HB_SAY("", "Now there was a long war between Saul’s house and David’s house. David grew stronger and stronger, but Saul’s house grew weaker and weaker. (2 Samuel 3:1)"),
    HB_SAY("", "Abner came to David to Hebron to make peace, and David sent him away, and he went in peace. But Joab and Abishai his brother killed Abner, because he had killed their brother Asahel at Gibeon in the battle. (2 Samuel 3:20-21, 30)"),
    { fn() { regionAdd("taken", "hb_chase"); hb.fallen = false; regionGo(hbRoomX("hebron", 64), 1, () => { hb.dark = null; hbGrave(); }); } },
  ]);
}
// (Glen 11-24: "show David weeping as a cut scene") at Abner's grave in Hebron (3:31-38)
function hbGrave() {
  const d = david;
  rPlay([
    { fn() { hb.cine = { at: performance.now() / 1000, title: "Hebron", sub: "Abner's grave" }; hb.weep = { t0: performance.now() / 1000 }; d.facing = 1; d.vx = 0; } }, { wait: 2.5 },
    HB_SAY("", "David said to Joab and to all the people who were with him, “Tear your clothes, and clothe yourselves with sackcloth, and mourn in front of Abner.” King David followed the bier. (2 Samuel 3:31)"),
    HB_SAY("", "They buried Abner in Hebron; and the king lifted up his voice and wept at Abner’s grave; and all the people wept. (2 Samuel 3:32)"),
    HB_SAY("David", "“Don’t you know that a prince and a great man has fallen today in Israel?” (2 Samuel 3:38)"),
    HB_SAY("", "So all the people and all Israel understood that day that it was not of the king to kill Abner the son of Ner. (2 Samuel 3:37)"),
    { fn() { regionAdd("taken", "hb_grave"); hb.weep = null; } },
    { fn() { jsceneOpen(false, "hs_gibeon"); } },
    HB_SAY("", "The time that David was king in Hebron over the house of Judah was seven years and six months. (2 Samuel 2:11)"),
    hbCineEnd,
    { fn() { regionGo(hbRoomX("feast", 8), 1); } },
  ]);
}

// the feast (1 Chronicles 12:23-40): the tribes come two by two; welcome each (Up by its leader); it unloads one food;
//  carry each to the table. All twelve home and the table full: three days of feasting
function hbFeast(dt, r, free) {
  if (r.id !== "feast" || hbHas("hb_feasted")) return;
  const d = david;
  for (const t of hb.tribes) {
    t.t += dt;
    const ready = t.wave === 0 || hb.tribes.filter(o => o.wave === t.wave - 1).every(o => o.st === "leave" || o.st === "home");
    if (t.st === "wait" && ready && hbHas("hb_tribes") && free) { t.st = "come"; }
    if (t.st === "come") { t.x -= HB.TRIBE_SPEED * dt; if (t.x <= t.slot) { t.x = t.slot; t.st = "here"; } }
    if (t.st === "leave") { t.x += HB.TRIBE_SPEED * dt; if (t.x > hbRoomX("feast", 116)) t.st = "home"; }   // (welcomed: on into the camp)
  }
  if (free && d.onGround && pressed("up")) {
    const t = hb.tribes.find(o => o.st === "here" && Math.abs(o.x - d.x) < HB.REACH);
    const atTable = Math.abs(d.x - hbRoomX("feast", HB.TABLE)) < HB.REACH * 1.4;
    if (t) { t.st = "leave"; hb.foods.push({ name: t.food, x: t.x + 60, y: FOOT, t: 0 }); toast(`Welcome, ${t.name}! ${t.line[0].toUpperCase() + t.line.slice(1)}. They brought ${hbFoodName(t.food)}.`); }
    else if (atTable && hb.carry) { hb.table.push(hb.carry); hb.carry = null; toast(`On the table. ${hb.table.length} of ${HB_TRIBES.length}.`); }
  }
  if (!hb.carry) { const f = hb.foods.find(o => !o.got && Math.abs(o.x - d.x) < 40); if (f) { f.got = true; hb.carry = f.name; toast(`${hbFoodName(f.name)[0].toUpperCase() + hbFoodName(f.name).slice(1)}. To the table (left), and Up.`); } }
  if (free && hb.table.length >= HB_TRIBES.length && !hb.feasting) { hb.feasting = true; hbFeasted(); }
}
const hbFoodName = n => ({ bread: "bread", grain_sack: "a sack of flour", gift_oil: "a jar of oil", fig_cake: "cakes of figs", raisins: "clusters of raisins", wineskin: "wine" }[n] || n);
function hbFeasted() {
  rPlay([
    HB_SAY("", "All these were men of war who could order the battle array, and came with a perfect heart to Hebron to make David king over all Israel; and all the rest also of Israel were of one heart to make David king. (1 Chronicles 12:38)"),
    HB_SAY("", "They were there with David three days, eating and drinking. Those who were near to them brought bread on donkeys, on camels, on mules, and on oxen: supplies of flour, cakes of figs, clusters of raisins, wine, oil, cattle, and sheep in abundance; for there was joy in Israel. (1 Chronicles 12:39-40)"),
    { fn() { regionAdd("taken", "hb_feasted"); } },
    { fn() { jsceneOpen(false, "hs_tribes"); } },
    { fn() { toast("The elders of Israel wait at the gate (right)."); } },
  ]);
}

// the gate (2 Samuel 5:1-5): anointed king over all Israel; the last page of the Journal
function hbAnoint() {
  const d = david;
  rPlay([
    hbCine("The Gate of Hebron", "All the elders of Israel"),
    { fn() { d.vx = 0; d.facing = 1; } }, { wait: 2.5 },
    HB_SAY("The elders of Israel", "“Behold, we are your bone and your flesh. In times past, when Saul was king over us, it was you who led Israel out and in. The LORD said to you, ‘You will be shepherd of my people Israel, and you will be prince over Israel.’” (2 Samuel 5:1-2)"),
    HB_SAY("", "So all the elders of Israel came to the king to Hebron, and King David made a covenant with them in Hebron before the LORD; (2 Samuel 5:3)"),
    { fn() { hb.kneel = true; hbAnointNow(hb.gateElder); } }, { wait: HB.ANOINT.WAIT },
    HB_SAY("", "and they anointed David king over Israel. (2 Samuel 5:3)"),
    { fn() { hb.kneel = false; } },
    HB_SAY("", "David was thirty years old when he began to reign, and he reigned forty years. In Hebron he reigned over Judah seven years and six months, and in Jerusalem he reigned thirty-three years over all Israel and Judah. (2 Samuel 5:4-5)"),
    { fn() { regionAdd("taken", "hb_end"); regionAdd("taken", "g_exit_open"); hb.cine = null; } }, { wait: 1.2 },
    { fn() { jsceneOpen(true, "hs_end"); } },   // (his last page; then the card, and the road)
  ]);
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
function hbDrawDavid(d, x, y) {
  const now = performance.now() / 1000;
  if (hbAsahel()) {   // Asahel, Joab's brother (player2.js's sheets)
    if (hb.fallen) return true;
    if (hb.blow && SPR.asahel_hit) {   // struck: knocked back, and down (the dark comes after)
      const t = hb.blow.t, f = Math.min(HB.BLOW.HIT_HOLD, Math.floor(t * HB.BLOW.HIT_FPS));
      const nx = hb.blow.x0 - HB.BLOW.BACK * Math.min(1, t / 0.35);
      drawSprite("asahel_hit", f, x + (nx - d.x), y, 1); d.x = nx; return true;
    }
    if (hb.auto && hb.auto.kind) {
      const n = hb.auto.kind === "hop" ? "asahel_long_jump" : "asahel_sprint", S = SPR[n];
      const f = hb.auto.kind === "hop" && S ? Math.min(S.frames - 1, Math.floor(hb.auto.u * S.frames)) : frameOf(n, performance.now() / 1000);
      if (S) { drawSprite(n, f, x, y, d.facing); return true; }
    }
    let n = "asahel_idle", f = null;
    if (!d.onGround) { n = "asahel_long_jump"; const S = SPR[n]; if (S) f = Math.max(0, Math.min(S.frames - 1, Math.floor((d.vy / 1200 + 0.5) * S.frames))); }
    else if (d.state === "run") n = "asahel_sprint";
    else if (d.state === "walk" || d.state === "stop") n = "asahel_walk";
    else if (d.h === LOW_H) n = "asahel_slide";
    if (!SPR[n]) return false;
    drawSprite(n, f ?? frameOf(n, d.t), x, y, d.facing); return true;
  }
  if (hb.weep && SPR.david_pray) { drawSprite("david_pray", frameOf("david_pray", now - hb.weep.t0), x, y, d.facing); return true; }
  if (hb.harp && SPR.david_play_harp) { drawSprite("david_play_harp", frameOf("david_play_harp", now), x, y, d.facing); return true; }
  if (hb.kneel && SPR.david_kneel) { drawSprite("david_kneel", Math.min(SPR.david_kneel.frames - 1, 6), x, y, d.facing); return true; }
  return false;
}
function hbDraw(camX) {
  const r = region.room; if (!r) return;
  const now = performance.now() / 1000;
  for (const p of hb.people) if (p.room === r.id && (!p.show || p.show())) {
    if (p.still) { drawManStill(p.img, p.x - camX, FOOT, p.dir); continue; }
    if (p.once && SPR[p.spr] && p.t * 1000 >= SPR[p.spr].ms * SPR[p.spr].frames) { p.spr = p.once; p.once = null; }   // (played once: back to standing)
    if (SPR[p.spr]) drawSprite(p.spr, p.once ? Math.min(SPR[p.spr].frames - 1, Math.floor(p.t * 1000 / SPR[p.spr].ms)) : frameOf(p.spr, p.t), p.x - camX, p.y, p.dir, p.k);
  }
  // Abner's grave (after the chase)
  if (r.id === "hebron" && hbHas("hb_chase") && hb.grave) { const x = hb.grave.x - camX;
    ctx.save(); ctx.fillStyle = "#7a6248"; ctx.beginPath(); ctx.ellipse(x, FOOT + 2, 70, 22, 0, Math.PI, 0); ctx.fill();
    ctx.fillStyle = "#9a8a70"; for (const [dx, s] of [[-40, 12], [-12, 15], [18, 13], [44, 11]]) { ctx.beginPath(); ctx.arc(x + dx, FOOT - 8, s, 0, 7); ctx.fill(); } ctx.restore(); }
  // the families on the road
  if (hb.followOn) for (const f of hb.follow) { const n = f.moving ? f.spr : f.still; if (SPR[n]) drawSprite(n, frameOf(n, f.t), f.x - camX, FOOT, f.dir, f.k); }
  // Abner in the chase
  const A = hb.abner;
  if (A && r.id === "chase" && A.st !== "gone" && !hbHas("hb_chase")) {
    const n = A.spr || (A.look ? "abner_talk" : "abner_walk"), dir = A.look ? -1 : 1;
    const still = !A.moving && !A.look && !A.spr;   // (waiting on the hilltop, his back to you)
    if (SPR[n]) drawSprite(n, still ? 0 : frameOf(n, A.t * (A.moving ? 2.2 : 1)), A.x - camX, A.y, dir, HB.ABNER.K);
    if (A.spear) hbDrawSpear(A, camX);
  }
  // the feast: the tribes, their banners, the foods they unload, the table
  if (r.id === "feast") {
    const tx = hbRoomX("feast", HB.TABLE) - camX;
    ctx.save(); ctx.fillStyle = "#6a4a2a"; ctx.fillRect(tx - 120, FOOT - 46, 240, 12); ctx.fillRect(tx - 110, FOOT - 34, 10, 34); ctx.fillRect(tx + 100, FOOT - 34, 10, 34); ctx.restore();   // (stand-in: a plank table)
    hb.table.forEach((n, i) => drawItem(n, tx - 100 + (i % 6) * 40, FOOT - 46 - Math.floor(i / 6) * 22, 26 / ((ITEM[n] && ITEM[n].naturalHeight) || 26)));
    for (const t of hb.tribes) if ((t.st === "come" || t.st === "here" || t.st === "leave") && !hbHas("hb_feasted")) {
      const x = t.x - camX; if (x < -200 || x > W + 200) continue;
      const moving = t.st !== "here", face = t.st === "leave" ? 1 : -1, don = t.st === "leave" ? "donkey_bare_walk" : "donkey_packs_walk";   // (Glen 11-24: laden till you take the gifts, bare after)
      const own = n => n && SPR["tribe_" + n + "_walk"] ? "tribe_" + n + (moving ? "_walk" : "_stand") : null, lead = own(t.art), lead2 = own(t.art2);
      const tk = n => HB.TRIBE_K * (HB.TRIBE_SIZE[n] || 1);
      if (!lead) {   // (no leader of his own yet: the walking-stick man and a drawn banner)
        ctx.save(); ctx.strokeStyle = "#5a3e20"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(x - 30, FOOT); ctx.lineTo(x - 30, FOOT - 190); ctx.stroke();
        const wave = Math.sin(now * 3 + t.i) * 6; ctx.fillStyle = t.color; ctx.beginPath(); ctx.moveTo(x - 30, FOOT - 188); ctx.lineTo(x - 30 - 56, FOOT - 180 + wave); ctx.lineTo(x - 30, FOOT - 150); ctx.fill();
        ctx.restore();
      }
      const back = lead2 ? HB.TRIBE_PAIR : 0;   // (Reuben and Gad: Gad's man beside Reuben's, the donkey behind them both)
      if (SPR[don]) drawSprite(don, moving ? frameOf(don, t.t) : 0, x + (80 + back) * -face, FOOT, face, HB.DONKEY_K);
      if (lead2) drawSprite(lead2, moving ? frameOf(lead2, t.t + 0.3) : 0, x + back * -face, FOOT, face, tk(t.art2));
      if (lead) drawSprite(lead, moving ? frameOf(lead, t.t) : 0, x, FOOT, face, tk(t.art));
      else if (SPR[moving ? "staffman_walk" : "staffman_idle"]) { const n = moving ? "staffman_walk" : "staffman_idle"; drawSprite(n, frameOf(n, t.t), x, FOOT, face, HB.STAFFMAN_K); }
      if (t.st === "here" && Math.abs(david.x - t.x) < HB.REACH && hbFree()) upHint(x, FOOT - 210);
    }
    for (const f of hb.foods) if (!f.got) drawItem(f.name, f.x - camX, FOOT + 2 + Math.sin(now * 2.5 + f.x) * 3, 30 / ((ITEM[f.name] && ITEM[f.name].naturalHeight) || 30));
    if (hb.carry && Math.abs(david.x - hbRoomX("feast", HB.TABLE)) < HB.REACH * 1.4 && hbFree()) upHint(tx, FOOT - 120);
  }
}
function hbDrawFront(camX) {
  const r = region.room; if (!r) return;
  if (hb.carry && r.id === "feast") drawItem(hb.carry, david.x - camX, david.y - 118, 30 / ((ITEM[hb.carry] && ITEM[hb.carry].naturalHeight) || 30));   // (carried over his head)
  if (r.id === "feast" && hbHas("hb_tribes") && !hbHas("hb_feasted")) {
    const n = hb.tribes.filter(o => o.st === "leave" || o.st === "home").length, all = HB_TRIBES.length;
    ctx.save(); ctx.font = "bold 20px Georgia, serif"; ctx.textAlign = "center"; ctx.fillStyle = "rgba(0,0,0,0.55)"; ctx.fillRect(W / 2 - 280, 52, 560, 34);
    ctx.fillStyle = "#ffe08a"; ctx.fillText(`Tribes welcomed: ${n} of ${all}    On the table: ${hb.table.length} of ${all}`, W / 2, 76); ctx.restore();
  }
}
// Abner's spear (stand-in till Glen's clip, ART_PROMPTS_HEBRON.md 8.4): held upright, then turned and thrust back end first
function hbDrawSpear(A, camX) {
  const x = A.x - camX, L = HB.BLOW.SPEAR;
  ctx.save(); ctx.lineCap = "round";
  let butt, head;
  if (A.spear === "held") { butt = [x - 34, A.y - 6]; head = [x - 34, A.y - 6 - L * 1.15]; }
  else {
    const t = hb.blow ? hb.blow.t : 1, p = Math.min(1, t / 0.12), back = t > 0.7 ? Math.min(1, (t - 0.7) / 0.4) : 0, k = p * (1 - back * 0.6);
    const hy = A.y - 78; butt = [x - 40 - 70 * k, hy]; head = [x - 40 - 70 * k + L, hy - 6];
  }
  ctx.strokeStyle = "#5b3a1c"; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(butt[0], butt[1]); ctx.lineTo(head[0], head[1]); ctx.stroke();
  const ang = Math.atan2(head[1] - butt[1], head[0] - butt[0]);
  ctx.translate(head[0], head[1]); ctx.rotate(ang); ctx.fillStyle = "#b9b4a6"; ctx.strokeStyle = "#5e5a50"; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(30, 0); ctx.lineTo(-4, -9); ctx.lineTo(-4, 9); ctx.closePath(); ctx.fill(); ctx.stroke();
  ctx.restore();
}
function hbDrawOver() {
  const r = region.room; if (!r) return;
  const tn = HB.TINT[r.id]; if (tn) { ctx.save(); ctx.fillStyle = `rgba(${tn[0]},${tn[1]},${tn[2]},${tn[3]})`; ctx.fillRect(0, 0, W, H); ctx.restore(); }
  const now = performance.now() / 1000;
  if (hb.blow) { const t = hb.blow.t; if (t < HB.BLOW.FLASH) { ctx.fillStyle = `rgba(255,250,235,${0.85 * (1 - t / HB.BLOW.FLASH)})`; ctx.fillRect(0, 0, W, H); } }   // wham
  if (hb.dark) { const a = Math.min(0.92, (now - hb.dark.at) / 1.4); ctx.fillStyle = `rgba(0,0,0,${a})`; ctx.fillRect(0, 0, W, H); }
  if (hb.cine) {   // a cut scene: the picture letterboxed, the place named
    const t = now - hb.cine.at, bar = 64 * Math.min(1, t / 0.8);
    ctx.save(); ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, bar); ctx.fillRect(0, H - bar * 0.5, W, bar * 0.5);
    const a = hb.cine.title ? Math.max(0, Math.min(1, t / 0.8, (3.2 - t) / 0.6)) : 0;
    if (a > 0) { ctx.globalAlpha = a; ctx.textAlign = "center"; ctx.fillStyle = "rgba(0,0,0,0.45)"; ctx.fillRect(0, H * 0.3 - 60, W, 104);
      ctx.fillStyle = "#ffe08a"; ctx.font = "bold 54px Georgia, serif"; ctx.fillText(hb.cine.title, W / 2, H * 0.3);
      ctx.fillStyle = "#e9dcc0"; ctx.font = "italic 22px Georgia, serif"; ctx.fillText(hb.cine.sub, W / 2, H * 0.3 + 32); }
    ctx.restore();
  }
  if (hb.lament && hb.lament.i >= 0) {   // the lament: its lines over the darkened scene, David at his harp
    const L = HB_LAMENT[hb.lament.i], t = hb.lament.t, a = Math.min(1, t / 0.5, (HB.LAMENT_SECS - t) / 0.5 + 0.2);
    ctx.save(); ctx.fillStyle = "rgba(8,5,2,0.5)"; ctx.fillRect(0, 0, W, H);
    const lines = L.slice(0, -1), ref = L[L.length - 1], y0 = H * 0.36 - lines.length * 22;
    ctx.fillStyle = "rgba(0,0,0,0.6)"; ctx.fillRect(0, y0 - 52, W, lines.length * 46 + 74);   // (a dark band behind the words)
    ctx.globalAlpha = Math.max(0, a); ctx.textAlign = "center";
    lines.forEach((l, i) => { ctx.fillStyle = "#ffe08a"; ctx.font = "italic 32px Georgia, serif"; ctx.fillText(l, W / 2, y0 + i * 46); });   // (32px: the longest line fits)
    ctx.fillStyle = "#c9b27a"; ctx.font = "italic 20px Georgia, serif"; ctx.fillText("(" + (/^\d+:/.test(ref) ? "2 Samuel " + ref : ref) + ")", W / 2, y0 + lines.length * 46 + 6);
    ctx.globalAlpha = 0.7; ctx.fillStyle = "#e9dcc0"; ctx.font = "16px Georgia, serif"; ctx.fillText("A: next", W / 2, H - 50);
    ctx.restore();
  }
}
