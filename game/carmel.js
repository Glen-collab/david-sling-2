// World 6: Carmel (1 Samuel 25; CARMEL_PLAN.md). Part Two's eighth region, on region.js's engine like engedi_w5.js:
// loaded before region.js, which takes CARMEL as its REGION when the address is "#9-12".
//
// Glen 11-20: "I like the set up ... let's do Nabal's death and David's frustration. let's end with abigail becoming his
// wife." Half one (this first pass): David guards Nabal's flocks, "a wall to us both by night and by day" (25:16):
//
//   David's Camp in the Wilderness of Paran (25:1) -> The Fields of Carmel (stray lambs to carry back to the fold, the
//   jackals) -> The Hill Pastures (lambs on the ledges, a sheep in the thorns, the lion) -> the Fields by night (wolves
//   at the fold till morning) -> back at the camp: ten young men go to Nabal at the shearing (25:5-11), the insult, and
//   David's anger (25:21, 25:13).
//
// Half two, Abigail's gift run and the anger meter, comes next. First pass (11-20): David 1's pastures and camp till
// Glen's own (ART_PROMPTS_CARMEL.md).

const C6 = {
  NPC_K: 0.9,
  PICK: 80,                // px: Down this close to a stray lamb picks it up
  FOLD_R: 150,             // px either side of the fold's middle: a lamb set down in here is home
  FOLD_WALL: 0.42,         // (David 1's fold wall pictures, how big: no longer drawn, Glen's fold below)
  // Glen's fold (assets/rooms/carmel/kit): the back wall's height and how far up (farther off), the front walls' height,
  //  how far below the ground line their foot sits, how far out past FOLD_R, how far they overlap the inside; the sheep
  //  inside: how far they roam (px), how fast
  FOLD_ART: { BACK_H: 92, BACK_UP: 16, SIDE_H: 165, SIDE_DOWN: 8, SIDE_IN: 30, OVER: 26, ROAM: 40, PACE: 0.22 },
  SHEEP_K: 1.35, LAMB_K: 1.6, // the flock and the lambs (lamb sheets are 0.75 in TUNE.SPRITE_SIZE)
  GRACE: 4,                // s after he comes into a room before a hunter goes for a lamb
  WANDER: 12,              // px/s a stray ambles about its spot (was 22; Glen 11-20: slower)
  STEPS: [0.9, 1.4],       // s a stray walks each time (about 2-3 steps)
  REST: [2.5, 5],          // s it stops between walks
  GRAZE: 0.7,              // chance it grazes (not just stands) when it stops
  WALK_MS: 95,             // ms per frame of its walk (the sprite's own is 66)
  THORNS_WALK: 110,         // px/s a sheep cut out of the thorns walks home
  // the hunters: walk and run speeds, how far they see a lamb, how close David can be before they won't try, how long
  //  before they try again, back after being driven off (s), how big
  HUNT: {
    jackal: { walk: 60, run: 330, carry: 260, see: 760, shy: 170, cool: [6, 10], back: 14, hp: 1, k: 1, walkS: "jackal_run", runS: "jackal_run", carryS: "jackal_carry_lamb", box: 70 },
    lion:   { walk: 45, run: 300, carry: 210, see: 820, shy: 200, cool: [4, 7], back: 12, hp: 2, k: 1, walkS: "lion_prowl", runS: "lion_run", carryS: "lion_carry_lamb", dazedS: "lion_dazed", box: 95 },
    wolf:   { walk: 70, run: 300, see: 2000, shy: 0, cool: [0, 0], back: 0, hp: 1, k: 1, walkS: "wolf_walk", runS: "wolf_run", box: 80 },
  },
  FLEE: 1.3,               // s a driven-off hunter runs, fading
  STORM_T: 3, STORM_V: 150, MARCH_N: 4, MARCH_GAP: 300,   // and his men behind: how many groups of three, px apart   // his angry walk off after 25:13: how long (s), how fast (px/s)
  SHEARERS: [[34, 1, 0], [52, -1, 1.1]], SHEARER_K: 1,   // [column in the room, facing, start in the loop (s)]; their size
  // the night at the fold: how long till morning (s), a wolf every WAVE s (from either end, in turn), how dark, the
  //  lights (David, the fold's fire)
  NIGHT: { LEN: 50, WAVE: [4.5, 7], DARK: 0.55, LIT: 260, FIRE: 320 },
  SCATTER: { RUN: 260, FOR: 1.4 },   // a lamb a wolf scatters out of the fold: its run (px/s, s)
};

const CARMEL = {
  key: "carmel", name: "Carmel", start: "camp", carry: ["gibeah", "ramah", "nobgath", "adullam", "keilah", "ziph", "engedi"],
  strCap: 9,
  rooms: [
    // (Glen 11-20: "check the art from David 1 for any assets and backgrounds we can use") his World 1 pastures and his
    //  camp, till the Carmel pictures (ART_PROMPTS_CARMEL.md)
    { id: "camp", name: "David's Camp in Paran", w: 60, mx: 0, my: 1, mw: 2, right: "fields",   // (Glen's, 11-20: the black tents in the hollow)
      far: "carmel/camp/far", mid: "carmel/camp/mid.png", midY: 110, near: "carmel/camp/near.png", nearK: 0.4 },
    { id: "fields", name: "The Fields of Carmel", w: 140, mx: 2, my: 1, mw: 4, left: "camp", right: "hills",
      get bg() { return c6.night ? "w1_4" : "w1_2"; } },   // (David 1's Wandering Flock, 1-2; by night his Lion's Territory, 1-4)
    { id: "hills", name: "The Hill Pastures", w: 110, bg: "w1_3", mx: 6, my: 1, mw: 3, left: "fields" },   // (David 1's Rocky Pastures, 1-3)
    { id: "shearing", name: "Nabal's Shearing", w: 60, mx: 9, my: 1, mw: 2,   // (Glen's, 11-20: the estate, the feast under the awning, the pens)
      far: "carmel/nabal/far", mid: "carmel/nabal/mid.png", midY: -20, near: "carmel/nabal/near.png", nearK: 0.5 },
  ],
  // the Journal: Glen's song, Verse 3, its second half (SONG_PSALM57.md, his words exactly)
  steps: ["c6_fields", "c6_hills", "c6_night", "c6_insult"],
  verse: ["My heart is steadfast, O my God", "My heart is steadfast still", "Though I am hiding in this cave", "I will trust Your perfect will"],
  // (draft words, for Glen, 11-20)
  entries: [
    ["Samuel is dead. All Israel mourned him. We went down into the wilderness of Paran.", "1 Samuel 25:1"],
    ["Nabal's shepherds were out in the fields with us. Not one lamb was lost.", "1 Samuel 25:7"],
    ["By night and by day we were a wall around his flocks.", "1 Samuel 25:16"],
    ["I asked Nabal for a little food. He said, “Who is David?” I put on my sword.", "1 Samuel 25:10–13"],
  ],
  end: ["Blessed is your discretion, and blessed are you, who have kept me today from blood guiltiness.", "1 Samuel 25:33"],
  build: R => c6Build(R), enter: r => c6Enter(r), update: (dt, r) => c6Update(dt, r),
  drawDavid: (d, x, y) => c6DrawDavid(d, x, y), draw: camX => c6Draw(camX), drawFront: camX => c6DrawFront(camX),
  drawOver: () => c6DrawOver(), stoneHits: s => c6StoneHits(s),
};

const c6 = { told: {}, people: [], folds: {}, strays: [], hunters: [], carry: null, night: null, pose: null };
const c6Has = id => typeof region !== "undefined" && region.save && region.save.taken.includes(id);
function c6Tell(k, text) { if (!c6.told[k]) { c6.told[k] = true; toast(text); } }
function c6Person(room, spr, x, dir = 1, show = null, k = C6.NPC_K) { const p = { room, spr, x, y: FOOT, dir, show, k, t: Math.random() * 3 }; c6.people.push(p); return p; }
const c6Room = rm => roomById(rm);
const c6X = (rm, k) => (c6Room(rm).c0 + k) * T;
// a stray lamb at column k of the room (its foot at y; thorns: a sheep caught in a thornbush, cut it free)
function c6Stray(rm, k, y = FOOT, thorns = false) {
  const n = c6.strays.filter(s => s.room === rm).length + 1, x = c6X(rm, k) + T / 2;
  c6.strays.push({ id: "c6_s_" + rm + "_" + n, room: rm, home: rm, x, y, x0: x, y0: y, hx: x, thorns, state: thorns ? "thorns" : "stray", t: Math.random() * 4, dir: Math.random() < 0.5 ? -1 : 1, runT: 0, slot: 0 });
}
function c6Hunter(kind, rm, k, range = 6) {
  const x = c6X(rm, k);
  c6.hunters.push({ kind, room: rm, x, y: FOOT, hx: x, range: range * T, state: "prowl", t: 0, cool: 2 + Math.random() * 3, facing: -1, hp: C6.HUNT[kind].hp, alpha: 1, target: null, night: false });
}
const c6Fold = rm => c6.folds[rm];
const c6RoomStrays = rm => c6.strays.filter(s => s.home === rm);   // (its own pasture's: carried into the next room, still counted at home)
const c6Home = rm => c6RoomStrays(rm).filter(s => s.state === "folded").length;
const c6AllHome = rm => c6RoomStrays(rm).every(s => s.state === "folded");
const c6Night = () => c6Has("c6_hills") && !c6Has("c6_night");

// ---------------------------------------------------------------------------------------------------------------------
// building
function c6Build(R) {
  if (typeof R4_KIT !== "undefined") Object.assign(KIT, R4_KIT);
  if (typeof Z5_KIT !== "undefined") Object.assign(KIT, Z5_KIT);
  if (typeof G5_KIT !== "undefined") { Object.assign(KIT, G5_KIT); Object.keys(G5_KIT).forEach(kitImg); }   // (En-Gedi's sheep pen wall: the fold, till Glen's)
  Object.assign(TUNE.SPRITE_SIZE, { wolf_walk: 1.25, wolf_run: 1.25, wolf_howl: 1.25, wolf_sit: 1.25 });   // (as world2.js, not loaded in Part Two)
  for (const k of ["people", "strays", "hunters"]) c6[k].length = 0;
  c6.folds = {}; c6.carry = null; c6.night = null; c6.pose = null; c6.men = null; c6.sent = false; c6.cut = false;
  ["fold_back", "fold_left", "fold_right"].forEach(n => roomImg("carmel/kit/" + n + ".png"));   // (load the fold before it comes on screen)
  ["w4_z_hide_rock", "w4_tree_oak", "w4_tree_acacia"].forEach(kitImg);

  // -- David's Camp in the Wilderness of Paran (25:1): the men, Abishai at the fire
  let c = R("camp");
  { const rm = "camp", X = k => (c + k) * T;
    ground(c, c + 59);
    campfire(c + 4, GR - 1);
    c6.men = [c6Person(rm, "abishai_idle", X(16), 1), c6Person(rm, "asahel_idle", X(21), -1), c6Person(rm, "abiathar_stand", X(26), -1), c6Person(rm, "soldier_talk", X(31), -1, null, 0.76)];
    c6Talk();
  }

  // -- The Fields of Carmel (Glen 11-20: "more pits or cliffs or up and down ... going back to the sheepfold every time
  //  is kind of monotonous": the fold in the middle) strays out both ways, past pits and up ledges; two jackals
  c = R("fields");
  { const rm = "fields", X = k => (c + k) * T;
    ground(c, c + 139);
    campfire(c + 56, GR - 1);
    c6.folds[rm] = { x: X(70), n: 9 };
    c6.shepherd = rTalker(c6Person(rm, "villager_staffman_stand", X(60), 1), () => c6ShepherdLines("fields"));
    // west: a pit, a lamb up a two-step rise, another pit, one at the far end
    rHole(rm, c + 52, 3);
    rLedge(rm, c + 38, 480, 4); rLedge(rm, c + 32, 390, 4); c6Stray(rm, 33, 390);
    c6Stray(rm, 24);
    rHole(rm, c + 14, 4);
    c6Stray(rm, 6);
    // east: a pit, a three-step climb to a lamb on top, a wide pit, one beyond it
    rHole(rm, c + 86, 3);
    rLedge(rm, c + 96, 480, 4); rLedge(rm, c + 101, 390, 4); rLedge(rm, c + 106, 300, 4); c6Stray(rm, 107, 300);
    c6Stray(rm, 116);
    rHole(rm, c + 122, 4);
    c6Stray(rm, 133);
    c6Hunter("jackal", rm, 28, 7); c6Hunter("jackal", rm, 114, 6);
    region.props.push({ room: rm, n: "w4_tree_oak", x: X(79) - (KIT.w4_tree_oak ? KIT.w4_tree_oak.w / 2 : 0), y: FOOT - (KIT.w4_tree_oak ? KIT.w4_tree_oak.h : 0) + 10, back: true });
  }

  // -- The Hill Pastures: higher, rockier; the fold in the middle, lambs up on the ledges both ways, a sheep in the
  //  thorns, the lion
  c = R("hills");
  { const rm = "hills", X = k => (c + k) * T;
    ground(c, c + 109);
    campfire(c + 63, GR - 1);
    c6.folds[rm] = { x: X(55), n: 7 };
    rTalker(c6Person(rm, "villager_staffman_stand", X(46), 1), () => c6ShepherdLines("hills"));
    // west: a pit, a tall climb, a lamb at the top; one past a second pit
    rHole(rm, c + 40, 3);
    rLedge(rm, c + 30, 480, 4); rLedge(rm, c + 25, 390, 4); rLedge(rm, c + 20, 300, 4); c6Stray(rm, 21, 300);
    rHole(rm, c + 12, 4);
    c6Stray(rm, 5);
    // east: the sheep in the thorns, a pit, ledges up to a lamb, the far one
    c6Stray(rm, 66, FOOT, true);
    rHole(rm, c + 72, 3);
    rLedge(rm, c + 80, 470, 4); rLedge(rm, c + 86, 370, 3); c6Stray(rm, 87, 370);
    rHole(rm, c + 94, 4);
    c6Stray(rm, 103);
    c6Hunter("lion", rm, 84, 8);
  }

  // -- Nabal's Shearing (25:2-11): seen only when the young men go (David stays behind)
  c = R("shearing");
  { const rm = "shearing", X = k => (c + k) * T;
    ground(c, c + 59);
    c6.nabal = c6Person(rm, "nabal_stand", X(27), -1, null, 1);   // (in one frame with the young men: the camera's on col 18)
    // (Glen 11-20: "the same young men talking to Nabal that are talking to David") the camp's own men go
    c6.young = [c6Person(rm, "abishai_idle", X(20), 1, () => !!c6.cut), c6Person(rm, "asahel_idle", X(16), 1, () => !!c6.cut), c6Person(rm, "soldier_talk", X(12), 1, () => !!c6.cut, 0.76)];
    c6.flock = [[X(33), 1], [X(37), -1], [X(41), 1], [X(6), -1], [X(9), 1]];
  }
}

// the shepherds' words: what's left to do, then 25:15-16 once it's all home
function c6ShepherdLines(rm) {
  const S = "One of Nabal's shepherds", left = c6RoomStrays(rm).length - c6Home(rm);
  if (rm === "fields" && c6Has("c6_night")) return [[S, "“The men were very good to us, and we were not harmed, and we didn't miss anything as long as we went with them, when we were in the fields.” (1 Samuel 25:15)"]];
  if (rm === "fields" && c6Night()) return [[S, "They come at night. Stay by the fold till morning: drive the wolves off, and bring back any lamb they scatter."]];
  if (left > 0) return [[S, `${left === 1 ? "One lamb" : left + " lambs"} still out there. Carry ${left === 1 ? "it" : "them"} back to the fold: Down to pick up, Down to set down.`]];
  return [[S, rm === "fields" ? "All home. The hill pastures are next, past the oak: the lion's up there." : "Every one of them home. We'll bring the flock down to the fields for the night."]];
}
// David's men at the camp
function c6Talk() {
  const MEN = "One of David's men";
  const say = {
    0: () => !c6Has("c6_night") ? [["Abishai", "Nabal's shepherds are out in the fields of Carmel with his flocks. Three thousand sheep. We keep them safe out here."]]
      : !c6Has("c6_insult") ? [["Abishai", "It's shearing time at Carmel, a feast day. Send some of the young men up to Nabal. He owes us a little food."]] : [["Abishai", "Every man has his sword on. Four hundred of us."]],
    1: () => [["Asahel", "Jackals come for the little ones. Keep your sling ready."]],
    2: () => [["Abiathar", "Samuel is dead. All Israel came to Ramah to mourn him."]],
    3: () => [[MEN, "Two hundred of us will stay with the baggage."]],
  };
  c6.men.forEach((p, i) => rTalker(p, () => say[i]()));
}

// ---------------------------------------------------------------------------------------------------------------------
function c6Enter(r) {
  if (r.id === "camp" && !c6Has("c6_intro")) {
    regionAdd("taken", "c6_intro");
    rPlay([{ wait: 0.5 },
      { say: ["", "Samuel died; and all Israel gathered themselves together and mourned for him, and buried him at his house at Ramah. Then David arose and went down to the wilderness of Paran. (1 Samuel 25:1)"] },
      { say: ["", "There was a man in Maon whose possessions were in Carmel; and the man was very great. He had three thousand sheep and a thousand goats; and he was shearing his sheep in Carmel. (1 Samuel 25:2)"] },
      { say: ["", "Now the name of the man was Nabal; and the name of his wife Abigail. This woman was intelligent and had a beautiful face; but the man was surly and evil in his doings. (1 Samuel 25:3)"] },
      { say: ["Abishai", "Nabal's shepherds are out in the fields with his flocks, and the wild animals are about. We'll keep them safe."] },
      { fn() { toast("Go right to the fields of Carmel. Carry every stray lamb back to the fold: Down to pick up, Down to set down."); } }]);
  }
  if (r.id === "camp" && c6Has("c6_night") && !c6Has("c6_insult") && !c6.sent) { c6.sent = true; c6SendMen(); }   // (home from the night watch: shearing time)
  if (r.id === "fields" && c6Night() && !c6.night) c6NightStart();
  c6.inT = 0;
  if (r.id === "fields") c6Tell("fields", "The Fields of Carmel. Lambs have wandered off both ways. The fold is in the middle, by the shepherd.");
  if (r.id === "hills" && !c6Has("c6_fields")) c6Tell("hillsearly", "Bring the fields' lambs home first.");
}
function c6NightStart() {
  c6.night = { t: 0, next: 2.5, side: 1, done: false };
  for (const s of c6RoomStrays("fields")) if (s.state !== "folded") c6Folded(s);   // (the flock's all in for the night)
  for (const h of c6.hunters) if (h.room === "fields" && !h.night) h.state = "gone";   // (the jackals have gone; the wolves come)
  rPlay([{ wait: 0.4 }, { say: ["", "They were a wall to us both by night and by day, all the while we were with them keeping the sheep. (1 Samuel 25:16)"] },
    { fn() { toast("Night. Wolves will come for the fold from both sides. Drive them off with sling or sword till morning."); } }]);
}
function c6Folded(s) {
  const F = c6Fold(s.room), n = c6RoomStrays(s.room).filter(o => o.state === "folded").length;
  s.state = "folded"; s.slot = n; s.x = F.x - 90 + (n % 6) * 36 + (n >= 6 ? 18 : 0); s.y = FOOT; s.runT = 0;
}

// ---------------------------------------------------------------------------------------------------------------------
function c6Update(dt, r) {
  const d = david;
  for (const p of c6.people) p.t += dt;
  if (c6.pose) { c6.pose.t += dt; if (c6.pose.walk) david.x += C6.STORM_V * dt; }
  c6.inT = (c6.inT || 0) + dt;
  const free = !region.script.length && region.wait <= 0 && !region.trans;
  // carrying: Down beside a stray picks it up (main.js's pickup); set down (main.js's putdown), it's home if by the fold
  if (c6.carry && !d.carrying && d.state !== "pickup") {
    const s = c6.carry; c6.carry = null;
    s.x = d.x + d.facing * 40; s.y = d.y; s.hx = s.x; s.room = r.id;
    const F = c6Fold(r.id);
    if (F && s.home === r.id && Math.abs(s.x - F.x) < C6.FOLD_R && Math.abs(s.y - FOOT) < 10) { c6Folded(s); c6Arrived(r.id); }
    else { s.state = "stray"; if (F && s.home !== r.id && Math.abs(s.x - F.x) < C6.FOLD_R) toast("This lamb belongs to the flock in " + roomById(s.home).name + "."); }
  }
  if (free && pressed("down") && d.onGround && !d.carrying && !c6.carry && d.deadT <= 0 && Math.abs(d.vx) < 60) {
    const s = c6.strays.filter(o => o.room === r.id && o.state === "stray" && Math.abs(o.x - d.x) < C6.PICK && Math.abs(o.y - d.y) < 60).sort((a, b) => Math.abs(a.x - d.x) - Math.abs(b.x - d.x))[0];
    if (s) { s.state = "carried"; c6.carry = s; setState("pickup"); d.vx = 0; d.facing = Math.sign(s.x - d.x) || d.facing; c6Tell("carry", "Carry it back to the fold, then Down to set it down."); }
    else if (c6.strays.some(o => o.room === r.id && o.state === "thorns" && Math.abs(o.x - d.x) < C6.PICK)) c6Tell("thornsdown", "Caught fast in the thorns. Cut it free with the sword (X).");
  }
  // the strays: amble about their spot; a scattered one runs first
  for (const s of c6.strays) {
    if (s.room !== r.id) continue;
    s.t += dt;
    if (s.state === "stray") {
      if (s.runT > 0) { s.runT -= dt; s.x += s.dir * C6.SCATTER.RUN * dt; s.hx = s.x; }
      else if (Math.abs(s.y - FOOT) < 10) {
        // (Glen 11-20) a few slow steps, then a long stop to graze or stand
        if (s.walkT > 0) { s.walkT -= dt; s.x += s.dir * C6.WANDER * dt; if (s.walkT <= 0) { s.restT = C6.REST[0] + Math.random() * (C6.REST[1] - C6.REST[0]); s.graze = Math.random() < C6.GRAZE; } }
        else if ((s.restT = (s.restT ?? Math.random() * C6.REST[1]) - dt) <= 0) {
          s.walkT = C6.STEPS[0] + Math.random() * (C6.STEPS[1] - C6.STEPS[0]);
          if (Math.abs(s.x - s.hx) > 40) s.dir = Math.sign(s.hx - s.x); else if (Math.random() < 0.5) s.dir *= -1;
        }
      }
      s.x = Math.max((r.c0 + 1) * T, Math.min((r.c0 + r.w - 1) * T, s.x));
      if (holeAt && holeAt(s.x)) { s.x -= s.dir * 40; s.dir *= -1; }
    } else if (s.state === "free") {   // cut out of the thorns: walks home by itself
      const F = c6Fold(r.id); s.dir = Math.sign(F.x - s.x) || 1; s.x += s.dir * C6.THORNS_WALK * dt;
      if (holeAt && holeAt(s.x + s.dir * 30)) { s.state = "stray"; s.hx = s.x; c6Tell("freehole", "It won't cross the gap. Carry it over."); }
      if (Math.abs(s.x - F.x) < C6.FOLD_R - 40) { c6Folded(s); c6Arrived(r.id); }
    }
  }
  // the hunters
  for (const h of c6.hunters) if (h.room === r.id) c6Hunt(h, dt, r);
  if (r.id === "fields" && c6.night) c6NightUpdate(dt, r);
}
const holeAt = x => region.holes && region.holes.some(o => x > o.x0 && x < o.x1);
// a lamb set down in the fold
function c6Arrived(rm) {
  const left = c6RoomStrays(rm).length - c6Home(rm);
  if (c6.night && rm === "fields") { toast(left ? "Back in the fold." : "All back in the fold."); return; }
  if (left > 0) { toast(`Home in the fold. ${left} still out there.`); return; }
  const id = "c6_" + rm; if (c6Has(id)) return;
  regionAdd("taken", id);
  if (rm === "fields") rPlay([{ say: ["One of Nabal's shepherds", "Every one home! Not one missing. The hill pastures are next, to the right. Watch for the lion up there."] }]);
  if (rm === "hills") rPlay([{ say: ["One of Nabal's shepherds", "Not one missing. We'll bring them down to the fold in the fields for the night. They come at night, the wolves."] },
    { fn() { toast("Back to the fields: the night watch at the fold."); } }]);
}

function c6Hunt(h, dt, r) {
  const d = david, H_ = C6.HUNT[h.kind], dx = d.x - h.x;
  h.t += dt; h.cool -= dt;
  if (h.state === "gone") { if (h.night) return; if (h.t > H_.back && !c6.night) Object.assign(h, { state: "prowl", x: h.hx, alpha: 1, t: 0, cool: 2, hp: H_.hp }); return; }
  if (h.state === "flee") { h.x += h.facing * H_.run * 1.1 * dt; h.alpha = Math.max(0, 1 - h.t / C6.FLEE); if (h.t > C6.FLEE) { h.state = "gone"; h.t = 0; } return; }
  if (h.state === "dazed") { if (h.t > 1.0) { h.state = "prowl"; h.t = 0; h.cool = 1.5; } return; }
  const touch = () => { if (Math.abs(dx) < H_.box * 0.6 && Math.abs(d.y - h.y) < 80) hurtDavid(h.x); };
  if (h.state === "prowl") {
    h.x += h.facing * H_.walk * dt;
    if (h.x < h.hx - h.range) h.facing = 1; else if (h.x > h.hx + h.range) h.facing = -1;
    if (h.cool <= 0 && c6.inT > C6.GRACE) {
      const t = c6.strays.filter(s => s.room === r.id && s.state === "stray" && s.runT <= 0 && Math.abs(s.y - FOOT) < 10 && Math.abs(s.x - h.x) < H_.see && Math.abs(s.x - d.x) > H_.shy).sort((a, b) => Math.abs(a.x - h.x) - Math.abs(b.x - h.x))[0];
      if (t) { h.state = "run"; h.target = t; h.t = 0; h.cool = H_.cool[0] + Math.random() * (H_.cool[1] - H_.cool[0]); c6Tell("hunt_" + h.kind, h.kind === "lion" ? "The lion's after a lamb! Sling it, or get between them." : "A jackal's after a lamb! Drive it off: sling or sword."); }
      else h.cool = 1;
    }
    return;
  }
  if (h.state === "run") {
    const t = h.target;
    if (!t || (h.night ? false : t.state !== "stray")) { h.state = "prowl"; h.cool = 2; h.target = null; return; }
    h.facing = Math.sign(t.x - h.x) || h.facing; h.x += h.facing * H_.run * dt;
    touch();
    if (Math.abs(t.x - h.x) < 34) {
      if (h.kind === "wolf") {   // at the fold: one lamb scatters out into the dark, and the wolf's off
        const s = t.state === "folded" ? t : null;
        if (s) { s.state = "stray"; s.dir = h.facing; s.runT = C6.SCATTER.FOR; s.hx = s.x; c6Tell("scatter", "A wolf scattered a lamb! Bring it back to the fold."); }
        h.state = "flee"; h.t = 0; h.facing *= -1;
      } else { h.state = "carry"; t.state = "taken"; h.t = 0; h.facing = Math.sign(h.x - d.x) || 1; c6Tell("carried", "It's got a lamb! Hit it, and it'll drop it."); }
    }
    return;
  }
  if (h.state === "carry") {
    h.x += h.facing * H_.carry * dt; touch();
    const t = h.target;
    if (h.x < (r.c0 + 1) * T || h.x > (r.c0 + r.w - 1) * T) {   // away with it: the lamb turns up again where it strayed
      if (t) Object.assign(t, { state: "stray", x: t.x0, y: t.y0, hx: t.x0, runT: 0 });
      toast("It got away with the lamb... the lamb broke loose and ran back where it was. Go and get it.");
      h.state = "gone"; h.t = 0; h.target = null; h.x = h.hx;
    }
  }
}
function c6StoneHits(s) {
  const r = region.room; if (!r) return false;
  for (const h of c6.hunters) {
    if (h.room !== r.id || h.state === "gone" || h.state === "flee") continue;
    const H_ = C6.HUNT[h.kind];
    if (Math.abs(s.x - h.x) > H_.box || s.y < h.y - 110 || s.y > h.y + 6) continue;
    if (h.cool > 0 && h.state === "dazed") return true;
    h.hp--;
    if (typeof sfx === "function") sfx("stone_hit", h.x, 0.5, 0.9);
    if (h.state === "carry" && h.target) { Object.assign(h.target, { state: "stray", x: h.x, y: FOOT, hx: h.x, runT: 0 }); h.target = null; c6Tell("dropped", "It dropped the lamb!"); }
    if (h.hp > 0) { h.state = H_.dazedS ? "dazed" : "prowl"; h.t = 0; h.cool = 1; c6Tell("hp_" + h.kind, "Again! It's not done yet."); }
    else { h.state = "flee"; h.t = 0; h.facing = Math.sign(h.x - david.x) || 1; h.target = null; h.hp = H_.hp; }
    return true;
  }
  for (const o of c6.strays) {   // the sword cuts a sheep out of the thorns (a stone won't)
    if (o.room !== r.id || o.state !== "thorns" || Math.abs(s.x - o.x) > 70 || s.y < o.y - 110 || s.y > o.y + 6) continue;
    if (!s.sword) { c6Tell("thornsling", "The thorns have it fast. The sword (X) will cut it free."); return true; }
    o.state = "free"; o.hx = o.x; toast("Cut free! It's going home."); return true;
  }
  return false;
}

// the night at the fold: wolves from both ends till morning; then any scattered lamb back before the count
function c6NightUpdate(dt, r) {
  const N = c6.night, F = c6Fold("fields");
  if (region.script.length || region.wait > 0) return;
  N.t += dt;
  if (!N.done && N.t < C6.NIGHT.LEN) {
    N.next -= dt;
    if (N.next <= 0) {
      N.next = C6.NIGHT.WAVE[0] + Math.random() * (C6.NIGHT.WAVE[1] - C6.NIGHT.WAVE[0]); N.side *= -1;
      const t = c6RoomStrays("fields").filter(s => s.state === "folded")[Math.floor(Math.random() * 9)] || c6RoomStrays("fields").find(s => s.state === "folded");
      if (t) {
        const x = N.side > 0 ? Math.min((r.c0 + r.w - 2) * T, david.x + W * 0.7) : Math.max((r.c0 + 1) * T, F.x - W * 0.6);
        c6.hunters.push({ kind: "wolf", room: "fields", x, y: FOOT, hx: x, range: 0, state: "run", t: 0, cool: 0, facing: -N.side, hp: 1, alpha: 1, target: t, night: true });
        c6Tell("wolf", "A wolf! Coming for the fold.");
      }
    }
  }
  for (let i = c6.hunters.length - 1; i >= 0; i--) if (c6.hunters[i].night && c6.hunters[i].state === "gone") c6.hunters.splice(i, 1);
  if (!N.done && N.t >= C6.NIGHT.LEN) {
    if (!c6.hunters.some(h => h.night && h.state !== "gone" && h.state !== "flee") && c6AllHome("fields") && !c6.carry) {
      N.done = true; regionAdd("taken", "c6_night");
      for (const h of c6.hunters) if (h.room === "fields" && !h.night) Object.assign(h, { state: "gone", t: 0 });
      rPlay([{ say: ["", "Morning."] },
        { say: ["One of Nabal's shepherds", "“The men were very good to us, and we were not harmed, and we didn't miss anything as long as we went with them, when we were in the fields.” (1 Samuel 25:15)"] },
        { fn() { c6.night = null; toast("Back to the camp: it's shearing time at Carmel."); } }]);
    } else c6Tell("dawnlast", "Morning's coming. Get every lamb back in the fold for the count.");
  }
}

// ---------------------------------------------------------------------------------------------------------------------
// the young men go to Nabal (25:5-11); David's anger (25:12-13, 21)
function c6SendMen() {
  const d = david, sh = c6Room("shearing");
  d.x = c6.men[0].x + 70; d.facing = -1; d.vx = 0; snapCamera();   // (by Abishai)
  rPlay([
    { say: ["", "David heard in the wilderness that Nabal was shearing his sheep. David sent ten young men. (1 Samuel 25:4-5)"] },
    { say: ["David", "“Go up to Carmel, and go to Nabal, and greet him in my name. Tell him, ‘Long life to you! Peace be to you! Peace be to your house! Peace be to all that you have!’” (1 Samuel 25:5-6)"] },
    { fn() { c6.home = c6.men[0].x + 70; regionGo((sh.c0 + 18) * T, 1, () => { c6.cut = true; c6.pose = { hide: true, t: 0 }; }); }, wait: 1.4 },
    { say: ["David's young men", "“Your shepherds have now been with us, and we didn't harm them. Nothing was missing from them all the time they were in Carmel. Please give whatever comes to your hand to your servants and to your son David.” (1 Samuel 25:7-8)"] },
    { fn() { c6.nabal.spr = "nabal_talk"; c6.nabal.t = 0; } },
    { say: ["Nabal", "“Who is David? Who is the son of Jesse? There are many servants who break away from their masters these days. Shall I then take my bread, my water, and my meat that I have killed for my shearers, and give it to men who I don't know where they come from?” (1 Samuel 25:10-11)"] },
    { fn() { c6.nabal.spr = "nabal_stand"; regionGo(c6.home, 1, () => { c6.cut = false; c6.pose = null; }); }, wait: 1.4 },
    { say: ["", "So David's young men turned on their way and went back, and came and told him all these words. (1 Samuel 25:12)"] },
    { fn() { c6.pose = { angry: true, t: 0 }; } },
    { say: ["David", "“Surely in vain I have kept all that this fellow has in the wilderness, so that nothing was missed of all that pertained to him. He has returned me evil for good.” (1 Samuel 25:21)"] },
    { fn() { c6.pose = { sword: true, t: 0 }; } },
    { say: ["David", "“Every man put on his sword!” (1 Samuel 25:13)"] },
    { say: ["", "Every man put on his sword. David also put on his sword. About four hundred men followed David, and two hundred stayed by the baggage. (1 Samuel 25:13)"] },
    { fn() { david.facing = 1; c6.pose = { walk: true, t: 0 }; }, wait: C6.STORM_T },   // (Glen's clip) he storms off
    { fn() { c6.pose = null; regionAdd("taken", "c6_insult"); toast("(First pass ends here. Next: Abigail, and the gifts.)"); } },
  ]);
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
function c6DrawDavid(d, x, y) {
  if (c6.pose && c6.pose.hide) return true;
  // (Glen's clip, 11-20) he stews, head down (25:21); draws his sword, holds it up and sheathes it (25:13); storms off
  if (c6.pose && c6.pose.angry) { drawSprite("david_stew", frameOf("david_stew", c6.pose.t), x, y, d.facing); return true; }
  if (c6.pose && c6.pose.sword) { drawSprite("david_sword_on", frameOf("david_sword_on", c6.pose.t), x, y, d.facing); return true; }
  if (c6.pose && c6.pose.walk) {   // (Glen's clip) the 400 behind him: his three men, again and again
    if (SPR.men_march) for (let i = 1; i <= C6.MARCH_N; i++) drawSprite("men_march", frameOf("men_march", c6.pose.t + i * 0.3), x - d.facing * (C6.MARCH_GAP * i - 60), y, d.facing);
    drawSprite("david_angry_walk", frameOf("david_angry_walk", c6.pose.t), x, y, d.facing); return true; }
  return false;
}
function c6Draw(camX) {
  const r = region.room; if (!r) return;
  const now = performance.now() / 1000;
  // the fold: the flock grazing, the lambs brought home, the wall in front of them
  const F = c6Fold(r.id);
  if (F) {
    // (Glen's fold, 11-20: "piece them together ... to make it look nice and 3d") his back wall, farther off (smaller,
    //  higher), across the inside; his sheep walking and grazing in there; his two front walls (the gate on the right)
    const A = C6.FOLD_ART, back = roomImg("carmel/kit/fold_back.png"), L = roomImg("carmel/kit/fold_left.png"), Rt = roomImg("carmel/kit/fold_right.png");
    if (back) { const bw = back.naturalWidth * A.BACK_H / back.naturalHeight, x0 = F.x - C6.FOLD_R - A.SIDE_IN, x1 = F.x + C6.FOLD_R + A.SIDE_IN;
      for (let x = x0; x < x1; x += bw - 2) ctx.drawImage(back, Math.round(x - camX), FOOT - A.BACK_UP - A.BACK_H, Math.min(bw, x1 - x + 2), A.BACK_H); }
    for (let i = 0; i < F.n; i++) {
      const u = now * A.PACE + i * 1.7, v = Math.cos(u), walking = Math.abs(v) > 0.55;
      const x = F.x - 120 + i * 30 + (i % 2) * 8 + Math.sin(u) * A.ROAM;
      const n = walking ? "sheep_walk" : i % 3 === 0 ? "sheep_stand" : "sheep_graze";
      if (SPR[n]) drawSprite(n, frameOf(n, now + i * 0.37), x - camX, FOOT - 8 - (i % 2) * 4, walking ? Math.sign(v) : i % 2 ? -1 : 1, C6.SHEEP_K);
    }
    for (const s of c6RoomStrays(r.id)) if (s.state === "folded") { const n = s.slot % 3 === 1 ? "lamb_graze" : "lamb_stand"; drawSprite(n, frameOf(n, now + s.slot * 0.3), s.x - camX, FOOT - 2, s.slot % 2 ? -1 : 1, C6.LAMB_K); }
    if (L) { const w = L.naturalWidth * A.SIDE_H / L.naturalHeight; ctx.drawImage(L, Math.round(F.x - C6.FOLD_R - A.SIDE_IN - w + A.OVER - camX), FOOT + A.SIDE_DOWN - A.SIDE_H, w, A.SIDE_H); }
    if (Rt) { const w = Rt.naturalWidth * A.SIDE_H / Rt.naturalHeight; ctx.drawImage(Rt, Math.round(F.x + C6.FOLD_R + A.SIDE_IN - A.OVER - camX), FOOT + A.SIDE_DOWN - A.SIDE_H, w, A.SIDE_H); }
  }
  // the strays
  for (const s of c6.strays) {
    if (s.room !== r.id || s.state === "folded" || s.state === "carried" || s.state === "taken") continue;
    const x = s.x - camX; if (x < -200 || x > W + 200) continue;
    if (s.state === "thorns") { drawSprite("sheep_thorns", frameOf("sheep_thorns", s.t), x, s.y, 1, C6.SHEEP_K); continue; }
    if (s.state === "free") { drawSprite("sheep_walk", frameOf("sheep_walk", s.t), x, s.y, s.dir, C6.SHEEP_K); continue; }
    // (Glen 11-20: "use more of the standing one") a stray mostly stands; now and then it grazes or wanders a step
    const n = s.runT > 0 ? "lamb_run" : s.walkT > 0 ? "lamb_walk" : s.graze ? "lamb_graze" : "lamb_stand";
    drawSprite(n, frameOf(n, s.t, n === "lamb_walk" ? C6.WALK_MS : 0), x, s.y, s.dir, C6.LAMB_K);
  }
  // the hunters
  for (const h of c6.hunters) {
    if (h.room !== r.id || h.state === "gone") continue;
    const H_ = C6.HUNT[h.kind], x = h.x - camX; if (x < -300 || x > W + 300) continue;
    const n = h.state === "carry" ? H_.carryS : h.state === "dazed" ? H_.dazedS : h.state === "prowl" ? H_.walkS : H_.runS;
    const ms = h.state === "prowl" && n === H_.runS ? SPR[n] && SPR[n].ms * 2.5 : undefined;
    if (SPR[n]) drawSprite(n, frameOf(n, h.t, ms), x, h.y, h.facing, H_.k, h.alpha);
  }
  // Nabal's shearing: his flock waiting
  if (r.id === "shearing" && c6.flock) for (const [x, f] of c6.flock) drawSprite("sheep_graze", frameOf("sheep_graze", now + x * 0.001), x - camX, FOOT, f, C6.SHEEP_K);
  // (Glen's clip, 11-20) his shearers at work on the shearing floor (25:2, "he was shearing his sheep in Carmel")
  if (r.id === "shearing" && SPR.shearer) for (const [k, f, t] of C6.SHEARERS) drawSprite("shearer", frameOf("shearer", now + t), (r.c0 + k) * T - camX, FOOT, f, C6.SHEARER_K);
}
function c6DrawFront(camX) {
  const r = region.room; if (!r) return;
  for (const p of c6.people) {
    if (p.room !== r.id || (p.show && !p.show())) continue;
    const x = p.x - camX; if (x < -300 || x > W + 300) continue;
    if (SPR[p.spr]) drawSprite(p.spr, frameOf(p.spr, p.t), x, p.y, p.dir, p.k, 1, "");
  }
}
const C6_DARK = typeof document !== "undefined" ? document.createElement("canvas") : null;
function c6DrawOver() {
  const r = region.room; if (!r) return;
  // the night at the fold: dark, a light round David and the fold's fire
  if (r.id === "fields" && c6.night && C6_DARK) {
    if (C6_DARK.width !== W || C6_DARK.height !== H) { C6_DARK.width = W; C6_DARK.height = H; }
    const x2 = C6_DARK.getContext("2d"), N = C6.NIGHT, F = c6Fold("fields");
    x2.globalCompositeOperation = "source-over"; x2.clearRect(0, 0, W, H);
    x2.fillStyle = `rgba(6,10,28,${N.DARK})`; x2.fillRect(0, 0, W, H); x2.globalCompositeOperation = "destination-out";
    for (const [lx, ly, rad] of [[david.x - camX, david.y - 90 - camY, N.LIT], [F.x - camX, FOOT - 60 - camY, N.FIRE]]) {
      const g = x2.createRadialGradient(lx, ly, rad * 0.25, lx, ly, rad); g.addColorStop(0, "rgba(0,0,0,1)"); g.addColorStop(1, "rgba(0,0,0,0)");
      x2.fillStyle = g; x2.fillRect(lx - rad, ly - rad, rad * 2, rad * 2);
    }
    ctx.drawImage(C6_DARK, 0, 0);
    // (Glen 11-20: the wolves' glowing eyes didn't work, so they're gone)
  }
  // the count (bottom left: the top is the controls and the hearts)
  let line = null;
  if (r.id === "fields" && c6.night) { const left = Math.max(0, Math.ceil(C6.NIGHT.LEN - c6.night.t)); line = left > 0 ? `Night watch: ${left}s till morning    In the fold: ${c6Home("fields")} / ${c6RoomStrays("fields").length}` : `Morning! In the fold: ${c6Home("fields")} / ${c6RoomStrays("fields").length}`; }
  else if ((r.id === "fields" || r.id === "hills") && !c6Has("c6_" + r.id)) line = `Lambs home in the fold: ${c6Home(r.id)} / ${c6RoomStrays(r.id).length}`;
  if (line) {
    ctx.save(); ctx.font = "bold 16px Georgia, serif";
    const bx = 16, by = H - 70, bw = Math.ceil(ctx.measureText(line).width) + 36;
    ctx.fillStyle = "rgba(20,12,6,0.72)"; ctx.fillRect(bx, by, bw, 36);
    ctx.strokeStyle = "#ffe08a"; ctx.lineWidth = 1.5; ctx.strokeRect(bx, by, bw, 36);
    ctx.fillStyle = "#ffe08a"; ctx.textAlign = "center"; ctx.fillText(line, bx + bw / 2, by + 24); ctx.restore();
  }
}
