// World 8, stop 2: Jerusalem (2 Samuel 5:6-10; Joshua 15:63). The same stage as Hebron (hebron.js, "#9-14", saved as
// "hebron"); loaded after hebron.js and before region.js, it adds its rooms to HEB and hooks in beside Hebron's, as
// zk7.js does Ziklag's on Hachilah's.
//   Below Jerusalem (the Jebusites laugh from the walls, 5:6; "let him go up to the watercourse", 5:8) -> the Gorge (the
//   Leap of Faith, leap.js's test stage brought in: a bridge no one can see, found only by walking out on it; Glen 11-25:
//   "let's have it not show up and then after he throws sand on it and it shows up in the cut scene, then we see it")
//   -> the Watercourse (up the shaft into the city, the water rising behind him) -> the Stronghold of Zion (5:7, 9-10).
// Glen 11-25: the leap "before he enters the water shaft"; "use existing [art] now". Still to come: the valley of
//   Rephaim (5:17-25) and the ark (6). Stand-in art throughout.

const JR = {
  WALK: 150,                   // (Glen's fortress wall: the wall-walk behind its battlements, px down from its top; the Jebusites stand there)
  WALL_Y: 236,                 // (px above the ground line: where the Jebusites stand on the wall's battlements)
  GORGE: [24, 22],
  COURSE_GROUND: { IMG: "w8/hebron/chase/near.png", K: 0.62 },        // (Glen 11-27: "have the ground still ... it will look like he is floating": its bottom at the screen's)
  COURSE_AT: 21,               // (Under the Stronghold: the column of the watercourse's mouth in Glen's painting, where David sees it)
  WALL: { AT: 20, BOT: 30, ON: 16 },   // (Glen's wall: its left end's column, its bottom below the ground line (px), how far down from its top edge the Jebusites stand)
  CLIFF: { K: 0.7, LIP_L: 520, LIP_R: 60, TOP: 56, PAD: 70 },   // (his two cliffs: their scale, where each one's lip is in its picture (px), how far down the top is the ground)
  SHAFT_ART: { far: "w8/jerusalem/shaft/far.jpg", pillar: "w8/jerusalem/shaft/pillar.png", near: "w8/jerusalem/shaft/near.png" },
  SHAFT: { PILLAR_K: 0.8, PILLAR_IN: 106, DIM: 0.22 },   // (the pillars' scale, how far in from the room's sides; the cave dimmed so the ledges stand out)             // (the gorge: its first column, how wide; the hidden bridge spans all of it)
  BRIDGE: { K: 0.5, UP: 6, IN: 90 },   // (the bridge (Glen's rock): its scale, and how far its top stands above the ground line, px)
  REVEAL_IN: 6,                // (px: a stone is there only once his middle is this far out over it, and only to a WALK)
  FALL_FADE: 0.9,              // (s: the dark after a fall)
  END_AT: 4,                   // (columns past the bridge: Glen's sand toss plays)
  GLOW_T: 2.2,                 // (s: the bridge glows gold as the film ends)
  // the watercourse: the water starts rising once he's off the floor; it catches him if it's this far over his feet
  WATER: { RATE: 65, START: 90, LAG: 1.2, CATCH: 60, FADE: 0.9 },
  // (Glen 11-27: "too many blocks ... I stayed in the middle and just double jumped the whole time"; "I like the falling
  //  rocks idea. Reminds me of Donkey Kong") the watercourse: three sheer climbs up the pillars (each too tall to jump),
  //  short runs of ledges between them; Jebusites at the top throw rocks that roll down the ledges and drop off their ends
  //  (a stone breaks one); drive them off with the sling to get out at the top. LEDGES: [size, x (px from the room's
  //  left), surface y]; FACES: [x0, x1, top] (px): the climbs (the pillars' inner faces)
  CLIMB: {
    LEDGES: [["l", 0, 140], ["m", 360, 70], ["m", 630, 0], ["m", 884, -70],
             ["l", 1025, -540], ["m", 760, -600], ["m", 480, -660], ["m", 216, -720],
             ["l", 0, -1170], ["l", 360, -1240], ["l", 790, -1240]],
    MID: 6, TOP: 9, JEB: 10,   // (which ledge: halfway (where the water starts you again), the way out, the Jebusites')
    FACES: [[0, 216, 140], [1080, 1296, -540], [0, 216, -1170]],   // (on the tiles: the pillars solid down by the floor)
    JEB_AT: [40, 210], JEB_HP: 3, JEB_K: 0.8,   // (the two Jebusites on their ledge (px in from its left), stones each, their size)
    ROCK: { EVERY: 2.3, FIRST: 1.2, R: 17, ROLL: 210, GRAV: 1500, THROW_VX: 130, THROW_VY: -260 },
  },
  // (Glen 11-27: "Isn't there a battle or something when we get to Zion?") the stronghold taken (1 Chronicles 11:6):
  //  Jebusite spearmen in the street (the wall's guards, the skirmisher's ways: sling or sword, and he runs), archers on
  //  the roofs (the shield turns their arrows; hit them as they rise to draw), slingers on the citadel wall at the end
  //  (the same). All driven off: the stronghold is David's. Columns from the room's left
  ZION: {
    SPEAR: [[16, 4], [23, 3], [30, 3]], SPEAR_HP: 3, SPEAR_K: 0.8,
    HOUSES: [12, 19, 26],              // (a house (the town kit's) at each; an archer behind the 1st and 3rd one's roof)
    ARCHERS: [12, 26], ARCH_HP: 2, ARCH_K: 0.9, ARCH_Y: 14,  // (his clip (waist-up): its foot this far under the roof line)
    WALL: { AT: 32, K: 0.8 },          // (the citadel's wall: his wall from below the city again, smaller, at the room's end)
    SLINGERS: [41, 52], SLING_HP: 2, SLING_K: 0.9, SLING_Y: 14, DOWN: 92,   // (DOWN: px they sink behind cover between shots)
    HIDE: [1.6, 2.6], RISE: 1.1, NEAR: 15,   // (s down behind cover between shots; s up drawing/whirling (hit him then); tiles: in range)
    SHOT: { ARROW: 620, STONE: 520, GRAV_A: 420, GRAV_S: 700, BLOCK: 46 },
  },
};
const jr = { found: {}, stand: null, fade: 0, falls: 0, shown: null, ended: false, film: false, water: null, cp: null, top: null, mid: null, jeb: [],
  ledges: [], rocks: [], throwers: [], rockT: 0, rockSide: 0, foes: [], shots: [], battle: false, won: false };
const jrHas = id => hbHas(id);
const JR_ROOMS = ["jvalley", "jcourse", "gorge", "shaft", "zion"];

HEB.rooms.push(
  // (Glen 11-27: "fortress_wall" with the door, its floor painted in for David to run on) the room his wall's width
  { id: "jvalley", name: "Below Jerusalem", w: 64, bg: "w4_1", mx: 0, my: 4, mw: 2,
    get right() { return jrHas("jr_taunt") ? "jcourse" : null; },
    far: "w8/jerusalem/jvalley/far", fort: "w8/jerusalem/jvalley/fortress_wall.png" },   // (drawn at the ground line: jrValleyWall)
  // (Glen 11-27: "I like this pic because we can see the watercourse in there ... David noticing the water course") his
  //  one painting of the stronghold from below, the watercourse's mouth in the rock under it: not repeated
  { id: "jcourse", name: "Under the Stronghold", w: 60, bg: "w4_1", mx: 2, my: 4, mw: 1, left: "jvalley",
    get right() { return jrHas("jr_course") ? "gorge" : null; },
    art: "w8/jerusalem/course.jpg", ground: null },   // (his ground strip from below the walls laid over its foot: jrCourseGround)
  { id: "gorge", name: "The Gorge Below the City", w: 80, bg: "w4_1", mx: 3, my: 4, mw: 2, left: "jcourse",
    get right() { return jr.ended || jrHas("jr_leap") ? "shaft" : null; },
    far: "w8/jerusalem/gorge/far", floor: "w8/jerusalem/gorge/near.png" },   // (Glen 11-26: his rocky edge as the floor (the gorge cut out of it), his two cliffs at its edges: jrCliffs)
  { id: "shaft", name: "The Watercourse", w: 36, up: 44, bg: "w4_1", mx: 5, my: 2, mw: 1, mh: 3, left: "gorge",
    shaft: true, ground: "pebbles" },   // (Glen 11-26: his cave looking up, stone pillars at its sides, roots at its foot: jrShaftBack)
  { id: "zion", name: "The Stronghold of Zion", w: 60, bg: "w4_1", mx: 6, my: 2, mw: 2,
    far: "w8/jerusalem/zion/far", mid: "w8/jerusalem/zion/mid.png", midY: 386, near: "w8/jerusalem/zion/near.png", nearK: 0.8 },   // (Glen 11-26, Gemini)
);
HEB.spreads.push(
  { id: "js_zion", when: "jx_zion", title: "Jerusalem",
    entry: ["The Jebusites laughed at us from their walls: even the blind and the lame could keep us out. The way in was hidden, under the ground, and I could only find it one step at a time. Now the stronghold of Zion is the LORD's city, and mine to keep for Him.", "2 Samuel 5:6-10"],
    psalm: { ref: "Psalm 122", text: "I was glad when they said to me, “Let’s go to the LORD’s house!” Our feet are standing within your gates, Jerusalem! (122:1-2)" } },
  // (Glen 11-25: his two clips "for the end of the game") the ark comes into the city: his last page
  { id: "js_ark", when: "jx_ark", title: "The Ark Comes Home", final: true,
    entry: ["The ark of the LORD has come into Jerusalem, with shouting and the sound of the trumpet, and I danced before the LORD with all my might. Through the caves and the long years of running, He kept every promise. My heart is steadfast.", "2 Samuel 6:12-15"],
    psalm: { ref: "Psalm 24", text: "Lift up your heads, you gates! Be lifted up, you everlasting doors, and the King of glory will come in. (24:7)" } },
);
// (region.js CRAWLS.jerusalem) its own crawl, once, the first time you're in one of its rooms
HEB.crawlKey = () => { const c = david.x / T, r = HEB.rooms.find(o => c >= o.c0 && c < o.c0 + o.w); return r && JR_ROOMS.includes(r.id) ? "jerusalem" : null; };
// Hebron's hooks, then Jerusalem's
Object.assign(HEB, {
  build: R => { hbBuild(R); jrBuild(R); },
  enter: r => { hbEnter(r); jrEnter(r); },
  update: (dt, r) => { hbUpdate(dt, r); jrUpdate(dt, r); },
  draw: camX => { hbDraw(camX); jrDraw(camX); },
  drawFront: camX => { hbDrawFront(camX); jrDrawFront(camX); },
  drawOver: () => { jrDrawOver(); hbDrawOver(); },
  backdrop: (r, camX) => !!r.shaft && jrShaftBack(r, camX),   // (the watercourse: Glen's tall cave)
  afterMid: (r, camX) => jrAfterMid(r, camX),
  stoneHits: s => jrStoneHits(s) || jrFoeHit(s),
  floor: (r, camX) => r.fort ? jrValleyWall(r, camX) : !!r.ground && r4Floor(r, camX),
  pitFall: () => jrPitFall(),
  pitPic: "w8/jerusalem/gorge_pit.png",   // (Glen 11-27: his dark pit, down every pit on this stage: region.js drawPitPic)
});

// ---------------------------------------------------------------------------------------------------------------------
function jrBuild(R) {
  // (Glen 11-27: back in after the end "it just ends ... nothing to do. David is just there with another guy") once the
  //  stronghold is won, Jerusalem plays again from the walls: its story flags off (jx_: what stays won, the map's tick
  //  and the Journal's pages), back to the valley
  { const S = region.save;
    if ((S.taken || []).includes("jr_end")) {   // (the stronghold won: from the ark films on, or left partway through them)
      for (const [a, b] of [["jr_end", "jx_zion"], ["jr_ark", "jx_ark"]]) if (S.taken.includes(a) && !S.taken.includes(b)) S.taken.push(b);
      S.taken = S.taken.filter(k => !/^jr_/.test(k));
      if (!S.atRoom || JR_ROOMS.includes(S.atRoom)) { S.atRoom = "jvalley"; S.atOff = 3; S.at = 0; }
      regionWrite();
    } }
  jr.found = {}; jr.stand = null; jr.shown = null; jr.ended = false; jr.water = null; jr.cp = null; jr.jeb.length = 0;
  const P = hbPerson;
  ["w8/jerusalem/jvalley/wall.png", "w8/jerusalem/jvalley/fortress_wall.png", "w8/jerusalem/gorge/bridge.png", "w8/jerusalem/gorge/cliff_l.png", "w8/jerusalem/gorge/cliff_r.png", "w8/jerusalem/gorge_pit.png"].forEach(roomImg);   // (drawn by jrAfterMid, not as a room layer)
  // -- Below Jerusalem: the walls, the Jebusites on them
  let c = R("jvalley");
  { const rm = "jvalley", X = k => (c + k) * T;
    ground(c, c + 63);
    for (const [k, spr, dir] of [[30, "gath_guard_laugh", -1], [36, "gath_guard_point", -1], [44, "gath_guard_laugh", -1], [52, "gath_guard_idle", -1]]) {
      const p = P(rm, spr, X(k), dir, null, 0.8); p.y = JR.WALK; jr.jeb.push(p);
    }
  }
  // -- Under the Stronghold: his painting; David sees the watercourse
  c = R("jcourse");
  ground(c, c + 59);
  // -- The Gorge: the Leap of Faith. No bridge you can see
  c = R("gorge");
  { const rm = "gorge", [g0, gw] = JR.GORGE;
    ground(c, c + 79);
    rHole(rm, c + g0, gw).pad = JR.CLIFF.PAD;   // (his dark drawn wider, its ends under the cliffs: no hard stop)
    region.props = region.props.filter(p => !(p.room === rm && /^p_(left|right)$/.test(p.n)));   // (Glen 11-26: his cliffs are its edges, not the pit kit)
    jr.g0 = c + g0; jr.g1 = c + g0 + gw - 1;
    if (jrHas("jr_leap")) for (let k = jr.g0; k <= jr.g1; k++) jrStone(k, true);   // (crossed before: the sand still shows it)
  }
  // -- The Watercourse: up the shaft, ledges zigzagging to the top
  c = R("shaft");
  { const rm = "shaft"; Object.assign(KIT, R4_KIT);   // (World 4's ledges: adullam.js adds them only in its own build)
    ground(c, c + 35);
    ["w4/floor_pebbles.png", ...Object.values(JR.SHAFT_ART)].forEach(roomImg);
    const C = JR.CLIMB, x0 = c * T;
    jr.ledges = C.LEDGES.map(([size, x, y]) => r4L(rm, "pale", size, x0 + x, y));
    jr.mid = jr.ledges[C.MID]; jr.top = jr.ledges[C.TOP];
    for (const [a, b, top] of C.FACES) region.walls.push({ room: rm, x0: x0 + a, x1: x0 + b, top, need: "wallClimb" });
    const solid = (k, w, r0) => { block(c + k, r0, w, GR - r0, 6); for (let i = 0; i < w; i++) for (let q = r0; q < GR; q++) artSolid.add((c + k + i) + "," + q); };
    solid(0, 6, Math.ceil(C.FACES[0][2] / T)); solid(30, 6, 0);   // (the pillars, solid where they stand on the floor)
    const jl = jr.ledges[C.JEB];
    jr.throwers = C.JEB_AT.map((k, i) => ({ x: jl.x + k, y: jl.y, hp: C.JEB_HP, flash: 0, t: i * 0.7, throwT: 0, gone: 0, dir: i ? 1 : -1 }));
    jr.rocks = []; jr.rockT = C.ROCK.FIRST;
  }
  // -- The Stronghold of Zion
  c = R("zion");
  { const rm = "zion", X = k => (c + k) * T;
    ground(c, c + 59);
    campfire(c + 4, GR - 1);   // an olive press (the save point)
    const Z = JR.ZION;
    P(rm, "abishai_idle", X(2), 1); jr.joab = P(rm, "soldier_talk", X(11), 1, null, 0.85);   // (stand-in: Joab)
    for (const k of Z.HOUSES) { rDeco(rm, "t_house", c + k); platAt(c + k - 3, FOOT - KIT.t_house.h + 14, 7); }   // (its flat roof to stand on)
    jrZionFoes(c);
  }
}
// the battle's men (not once the stronghold's been taken): the spearmen (region.js's skirmishers), the archers, the slingers
function jrZionFoes(c) {
  const rm = "zion", X = k => (c + k) * T, Z = JR.ZION;
  region.beasts = region.beasts.filter(b => !(b.room === rm && b.kind === "phil"));
  region.philTold = region.philFled = true;   // (not the Philistines' words)
  if (!jrHas("jr_end")) for (const [k, range] of Z.SPEAR) beast("phil", rm, c + k, { y: GR * T, hy: GR * T, range: range * T, state: "wait", hp: Z.SPEAR_HP, alpha: 1, k: Z.SPEAR_K,
    sk: { wait: "gath_guard_walk", charge: "gath_guard_lunge", run: "gath_guard_walk", drop: "gath_guard_waveoff", flee: "gath_guard_walk", noGear: true,
          tell: "Jebusite spearmen! Three stones (or one charged, or the sword) and he runs." } });
  jr.foes = []; jr.shots = []; jr.battle = false; jr.won = jrHas("jr_end");
  if (jr.won) return;
  for (const k of Z.ARCHERS) jr.foes.push({ kind: "arch", x: X(k) + T / 2, y: FOOT - KIT.t_house.h + 14, hp: Z.ARCH_HP, st: "hide", t: Math.random(), flash: 0, gone: 0 });
  for (const k of Z.SLINGERS) jr.foes.push({ kind: "sling", x: X(k), y: null, hp: Z.SLING_HP, st: "hide", t: Math.random() * 1.5, flash: 0, gone: 0 });
}
// a stone of the bridge: there to stand on (seen: the sand has shown it)
function jrStone(c, seen = false) {
  if (jr.found[c] === undefined) { jr.found[c] = seen ? JR.GLOW_T : -1; platAt(c, GR * T, 1); }
  else if (seen && jr.found[c] < 0) jr.found[c] = 0;
}
const jrGround = c => isSolid(c, GR) || jr.found[c] !== undefined;

function jrEnter(r) {
  if (r.id === "gorge" && !jrHas("jr_leap")) hbTell("gorge", "The watercourse is across the gorge (right). There's no bridge.");
  if (r.id === "shaft" && !jrHas("jr_end")) hbTell("shaft", "Up the watercourse, into the city! Climb fast: the water rises behind you.");
}

function jrUpdate(dt, r) {
  const d = david, free = hbFree();
  for (const k in jr.found) if (jr.found[k] >= 0) jr.found[k] += dt;
  if (jr.fade > 0) jr.fade = Math.max(0, jr.fade - dt);
  // Below Jerusalem: the Jebusites laugh (5:6); David: the watercourse (5:8)
  if (r.id === "jvalley" && !jrHas("jr_taunt") && free && !hb.cine) jrTaunt();
  if (r.id === "jcourse" && !jrHas("jr_course") && !jr.coursing && free && !hb.cine && d.x > (r.c0 + JR.COURSE_AT - 4) * T) jrCourse();
  if (r.id === "gorge") jrGorge(dt, d, free);
  if (r.id === "shaft") jrShaft(dt, d, free);
  if (r.id === "zion" && !jr.won) jrBattle(dt, d);
}

function jrTaunt() {
  rPlay([
    hbCine("Jerusalem", "The city of the Jebusites"),
    { fn() { david.vx = 0; david.facing = 1; } }, { wait: 2 },
    HB_SAY("", "The king and his men went to Jerusalem against the Jebusites, the inhabitants of the land, who spoke to David, saying, “The blind and the lame will keep you out of here,” thinking, “David can’t come in here.” (2 Samuel 5:6)"),
    { fn() { for (const p of jr.jeb) if (p.spr === "gath_guard_idle") p.spr = "gath_guard_laugh"; } }, { wait: 1.2 },
    { fn() { regionAdd("taken", "jr_taunt"); hb.cine = null; toast("The gate is shut. There must be another way in (right)."); } },
  ]);
}

// Under the Stronghold: David sees the water coming out of the rock under the walls (2 Samuel 5:8)
function jrCourse() {
  jr.coursing = true;
  rPlay([
    { fn() { david.vx = 0; david.facing = 1; } }, { wait: 1 },
    HB_SAY("", "Under the walls of the stronghold, water runs out of the rock: the watercourse, the city's way down to its spring."),
    HB_SAY("David", "“Whoever strikes the Jebusites, let him go up to the watercourse…” (2 Samuel 5:8)"),
    { fn() { regionAdd("taken", "jr_course"); toast("Up the watercourse, into the city! The way to it is down through the gorge (right)."); } },
  ]);
}

// ---- the Gorge: the Leap of Faith (leap.js's rules, in a room) --------------------------------------------------------
function jrGorge(dt, d, free) {
  if (jrHas("jr_leap") && !jr.ended) jr.ended = true;
  // Glen's film the first time he comes to the edge: the walk out, the look down, the first step
  if (!jr.film && !jr.ended && free && d.x > (jr.g0 - 3) * T) {
    jr.film = true; d.vx = 0;
    if (!/simgame/.test(location.pathname) || window.JR_FILMS) preFilm.start({ src: "../assets/video/leap_film.mp4", words: [[0.8, 4.4, "The Leap of Faith"]] }, () => toast("Step out in faith. Walk, don't leap."));
    else toast("Step out in faith. Walk, don't leap.");
  }
  if (!d.onGround || d.deadT > 0) return;
  if (d.y > GR * T + 10) { jrFall(); return; }
  // where a fall puts him back: a whole tile of ground ahead and behind
  if (jrGround(Math.floor((d.x + T) / T)) && jrGround(Math.floor((d.x - T) / T))) jr.stand = { x: d.x, y: d.y };
  // walking out: the next stone is there (unseen) once his middle is over it; running or leaping finds nothing
  const c = Math.floor((d.x - d.facing * JR.REVEAL_IN) / T);
  const walking = Math.abs(d.vx) > 20 && Math.abs(d.vx) <= TUNE.WALK_SPEED + 5 && Math.sign(d.vx) === d.facing;
  if (walking && c >= jr.g0 && c <= jr.g1 && jr.found[c] === undefined && jrGround(c - d.facing)) { jrStone(c); chime(Math.abs(c - (d.facing > 0 ? jr.g0 : jr.g1))); }   // (Glen 11-27: the stone clunk on each unseen step "sounds weird": a soft bell instead, a note higher each step out)
  // across: Glen's sand toss shows the whole bridge
  if (!jr.ended && d.x > (jr.g1 + JR.END_AT) * T) {
    jr.ended = true; d.vx = 0;
    const shown = () => {
      for (let k = jr.g0; k <= jr.g1; k++) jrStone(k, true);
      regionAdd("taken", "jr_leap");
      rPlay([HB_SAY("", "“You have enlarged my steps under me, my feet have not slipped.” (Psalm 18:36)"),
        { fn() { toast("The watercourse (right): up into the city."); } }]);
    };
    if (!/simgame/.test(location.pathname) || window.JR_FILMS) preFilm.start({ src: "../assets/video/leap_end.mp4" }, shown); else shown();
  }
}
function jrFall() {
  const d = david, s = jr.stand || { x: (jr.g0 - 2) * T, y: GR * T };
  d.x = s.x; d.y = s.y; d.vx = d.vy = 0; d.fallTop = null; setState("idle"); snapCamera();
  jr.fade = JR.FALL_FADE;
  toast(jr.falls++ === 0 ? "Not by leaping. Walk straight out, one step at a time." : "Step out in faith.");
}
function jrPitFall() {
  const r = region.room;
  if (r && r.id === "gorge") { jrFall(); return true; }
  return false;
}

// ---- the Watercourse: the water rises ---------------------------------------------------------------------------------
function jrShaft(dt, d, free) {
  if (jrHas("jr_end")) return;
  const W_ = JR.WATER;
  if (!jr.water) jr.water = { y: FOOT + W_.START, on: false, t: 0 };
  const w = jr.water;
  if (!w.on && d.y < FOOT - 80) { w.on = true; w.t = 0; toast("The water is rising!"); }
  if (w.on && free) { w.t += dt; if (w.t > W_.LAG) w.y -= W_.RATE * dt; }
  // halfway up: if the water catches him, he starts again from here
  if (d.onGround && jr.mid && d.y <= jr.mid.y + 2) jr.cp = { x: d.x, y: d.y };
  if (w.on) jrRocks(dt, d, w);
  if (w.on && w.y < d.y - W_.CATCH) {   // caught: back down (no heart lost), the water back down too
    const s = jr.cp || { x: hbRoomX("shaft", 3), y: GR * T };
    region.climb = null; jr.rocks.length = 0; jr.rockT = JR.CLIMB.ROCK.FIRST;
    d.x = s.x; d.y = s.y; d.vx = d.vy = 0; d.fallTop = null; setState("idle"); snapCamera();
    w.y = s.y + W_.START; w.t = 0; w.on = !!jr.cp;
    jr.fade = W_.FADE; toast(jr.cp ? "The water caught you! From halfway up again." : "The water caught you! Up again, quickly.");
    return;
  }
  // the top: into the city, once the Jebusites up there have run
  const left = jr.throwers.filter(t => t.hp > 0).length;
  if (free && d.onGround && jr.top && d.y <= jr.top.y + 2 && Math.abs(d.x - (jr.top.x + jr.top.x1) / 2) < 200 && left) {
    if (!jr.topTold) { jr.topTold = true; toast("Drive off the Jebusites first: your sling!"); }
  }
  if (free && d.onGround && jr.top && d.y <= jr.top.y + 2 && Math.abs(d.x - (jr.top.x + jr.top.x1) / 2) < 200 && !left) {
    w.on = false;
    rPlay([{ fn() { regionGo(hbRoomX("zion", 8), 1, () => jrZionBattle()); } }]);
  }
}

// the Jebusites at the top throw rocks down the shaft, in turn: each falls, lands on a ledge and rolls along it the way
//  it was going, off its end and down onto the next, Donkey Kong's barrels; into the water at the bottom. A stone breaks one
function jrRocks(dt, d, w) {
  const R = JR.CLIMB.ROCK, live = jr.throwers.filter(t => t.hp > 0);
  for (const t of jr.throwers) { t.t += dt; t.flash = Math.max(0, t.flash - dt); if (t.throwT > 0) t.throwT -= dt; if (t.hp <= 0) t.gone += dt; }
  if (live.length && (jr.rockT -= dt) <= 0) {
    jr.rockT = R.EVERY * (live.length === 1 ? 1.3 : 1);
    const t = live[jr.rockSide++ % live.length]; t.throwT = 0.5;
    jr.rocks.push({ x: t.x + t.dir * 20, y: t.y - 70, vx: t.dir * R.THROW_VX * (0.8 + Math.random() * 0.4), vy: R.THROW_VY, on: null, spin: 0 });
    sfx("stone_hit", t.x, 0.35, 0.5);
  }
  for (let i = jr.rocks.length - 1; i >= 0; i--) {
    const k = jr.rocks[i];
    if (k.on) {   // rolling along a ledge, then off its end
      k.x += k.vx * dt; k.spin += k.vx * dt / R.R;
      if (k.x < k.on.x - 4 || k.x > k.on.x1 + 4) { k.on = null; k.vy = 0; }
    } else {
      const y0 = k.y; k.vy += R.GRAV * dt; k.x += k.vx * dt; k.y += k.vy * dt; k.spin += k.vx * dt / R.R;
      const L = k.vy > 0 && jr.ledges.find(l => k.x > l.x + 6 && k.x < l.x1 - 6 && y0 <= l.y && k.y >= l.y);
      if (L) { k.on = L; k.y = L.y; k.vx = Math.sign(k.vx || 1) * R.ROLL; sfx("stone_hit", k.x, 0.25, 0.45); }
    }
    const rr = roomById("shaft"), xa = rr.c0 * T + R.R, xb = (rr.c0 + rr.w) * T - R.R;   // (the shaft's sides: back off them)
    if ((k.x < xa && k.vx < 0) || (k.x > xb && k.vx > 0)) { k.vx = -k.vx; k.x = Math.max(xa, Math.min(xb, k.x)); }
    const hy = k.y - R.R;
    if (Math.abs(k.x - d.x) < R.R + 16 && hy > d.y - d.h - R.R && hy < d.y + 4 && d.deadT <= 0) {
      hurtDavid(k.x, "", !!region.climb); jrRockBreak(i); continue;
    }
    if (k.y > w.y + 20 || k.y > FOOT + 400) { jr.rocks.splice(i, 1); continue; }   // (into the water)
  }
}
function jrRockBreak(i) {
  const k = jr.rocks[i]; jr.rocks.splice(i, 1);
  for (let n = 0; n < 7; n++) bits.push({ x: k.x, y: k.y - JR.CLIMB.ROCK.R, vx: Math.random() * 300 - 150, vy: -Math.random() * 280, life: 0.6, color: n % 2 ? "#8a7a68" : "#5e5246" });
}
// (region.js stoneHitsRegion) a stone or an arrow: breaks a rock; hits a Jebusite at the top (3 and he runs)
function jrStoneHits(s) {
  const r = region.room; if (!r || r.id !== "shaft") return false;
  const R = JR.CLIMB.ROCK;
  const i = jr.rocks.findIndex(k => Math.hypot(s.x - k.x, s.y - (k.y - R.R)) < R.R + 10);
  if (i >= 0) { jrRockBreak(i); stoneHit(s, 0.8); return true; }
  for (const t of jr.throwers) {
    if (t.hp <= 0 || Math.abs(s.x - t.x) > 26 || s.y > t.y || s.y < t.y - 130) continue;
    t.hp--; t.flash = 0.3; stoneHit(s); sfx("lion_hit", t.x, 0.5, 1.4);
    const left = jr.throwers.filter(q => q.hp > 0).length;
    toast(t.hp > 0 ? `Got him! (${JR.CLIMB.JEB_HP - t.hp} of ${JR.CLIMB.JEB_HP})` : left ? "He drops his rocks and runs! One more." : "They've run! Up and into the city.");
    return true;
  }
  return false;
}

// ---- the battle for the stronghold (1 Chronicles 11:6; 2 Samuel 5:8) --------------------------------------------------
function jrZionBattle() {
  rPlay([
    hbCine("The Stronghold of Zion", "The Jebusites' last stand"),
    { fn() { david.vx = 0; david.facing = 1; } }, { wait: 1.5 },
    HB_SAY("", "David said, “Whoever strikes the Jebusites first shall be chief and captain.” Joab the son of Zeruiah went up first, and was made chief. (1 Chronicles 11:6)"),
    { fn() { hb.cine = null; jr.battle = true; jr.joab.spr = "soldier_run";
      toast("Take the stronghold! Archers on the roofs: hold your shield (G) toward them. Hit them as they rise."); } },
  ]);
}
const jrSpears = () => region.beasts.filter(b => b.room === "zion" && b.kind === "phil" && !b.dead && b.state !== "flee" && b.state !== "drop");
function jrBattle(dt, d) {
  const Z = JR.ZION, S = Z.SHOT;
  if (jr.joab && jr.joab.spr === "soldier_run") { jr.joab.x = Math.min(jr.joab.x + 160 * dt, d.x - 70); jr.joab.dir = 1; if (jr.joab.x >= d.x - 72) jr.joab.spr = "soldier_talk"; }   // (Joab, up with him)
  // (one at a time: only the nearest of them shoots, so he's never shot from behind while he holds his shield to another)
  let first = null;
  for (const f of jr.foes) if (f.hp > 0 && f.y !== null && Math.abs(f.x - d.x) < Z.NEAR * T && (!first || Math.abs(f.x - d.x) < Math.abs(first.x - d.x))) first = f;
  for (const f of jr.foes) {
    f.t += dt; f.flash = Math.max(0, f.flash - dt);
    if (f.hp <= 0) { f.gone += dt; continue; }
    if (f.kind === "sling" && f.y === null) continue;   // (till the wall's drawn: where its top is)
    const near = f === first;
    if (f.st === "hide" && f.t > (f.wait || Z.HIDE[0]) && near && jr.battle) { f.st = "up"; f.t = 0; }
    else if (f.st === "up" && f.t > Z.RISE) {   // he looses, then down again
      const sx = f.x - 10 * Math.sign(f.x - d.x), sy = f.y - (f.kind === "arch" ? 58 : 70), sp = f.kind === "arch" ? S.ARROW : S.STONE;
      const dx = d.x - sx, dy = d.y - 50 - sy, L = Math.hypot(dx, dy) || 1, g = f.kind === "arch" ? S.GRAV_A : S.GRAV_S;
      const tt = L / sp;   // (aimed with the drop in it)
      jr.shots.push({ kind: f.kind, x: sx, y: sy, vx: dx / tt, vy: dy / tt - g * tt / 2, g, t: 0 });
      sfx("sling_throw_quick", sx, 0.5, f.kind === "arch" ? 1.4 : 1);
      f.st = "hide"; f.t = 0; f.wait = Z.HIDE[0] + Math.random() * (Z.HIDE[1] - Z.HIDE[0]);
    }
  }
  for (let i = jr.shots.length - 1; i >= 0; i--) {
    const a = jr.shots[i]; a.t += dt; a.vy += a.g * dt; a.x += a.vx * dt; a.y += a.vy * dt;
    if (a.dead) { if (a.t > 0.8 || a.y > FOOT) jr.shots.splice(i, 1); continue; }
    const toD = Math.sign(a.x - d.x);
    if (d.shield && toD === d.facing && Math.abs(a.x - d.x) < S.BLOCK && a.y > d.y - d.h - 20 && a.y < d.y + 4) {   // turned by the shield
      a.dead = true; a.t = 0; a.vx = -a.vx * 0.25; a.vy = -200; sfx("stone_hit", a.x, 0.6, 1.6);
      if (!jr.shieldTold) { jr.shieldTold = true; toast("The shield turns it!"); }
      continue;
    }
    if (Math.abs(a.x - d.x) < 18 && a.y > d.y - d.h && a.y < d.y) { hurtDavid(a.x - a.vx * 0.05); jr.shots.splice(i, 1); continue; }
    if (a.y > FOOT || a.t > 4) jr.shots.splice(i, 1);
  }
  // all of them run: the stronghold is David's
  if (jr.battle && !jr.won && jr.foes.every(f => f.hp <= 0) && !jrSpears().length) {
    jr.won = true; jr.battle = false; jr.shots.length = 0;
    rPlay([{ wait: 1 }, HB_SAY("Joab", "“They’ve run! The stronghold is ours!”"), { fn() { jrZion(); } }]);
  }
}
function jrFoeHit(s) {
  const r = region.room; if (!r || r.id !== "zion") return false;
  for (const f of jr.foes) {
    if (f.hp <= 0 || f.y === null || Math.abs(s.x - f.x) > 30 || s.y > f.y + 6 || s.y < f.y - 120) continue;
    if (f.st !== "up") { stoneHit(s, 0.4); if (!jr.coverTold) { jr.coverTold = true; toast("He's down behind cover. Hit him as he rises!"); } return true; }
    f.hp--; f.flash = 0.3; f.st = "hide"; f.t = 0; f.wait = JR.ZION.HIDE[1]; stoneHit(s); sfx("lion_hit", f.x, 0.5, 1.4);
    toast(f.hp > 0 ? "Got him! Once more." : f.kind === "arch" ? "He drops his bow and runs!" : "He drops his sling and runs!");
    return true;
  }
  return false;
}

// ---- the Stronghold of Zion (5:7, 9-10) ------------------------------------------------------------------------------
function jrZion() {
  rPlay([
    hbCine("The Stronghold of Zion", "David's city"),
    { fn() { david.vx = 0; david.facing = 1; } }, { wait: 2 },
    HB_SAY("", "Nevertheless David took the stronghold of Zion. This is David’s city. (2 Samuel 5:7)"),
    HB_SAY("", "David lived in the stronghold, and called it David’s city. David built around from Millo and inward. David grew greater and greater, for the LORD, the God of Armies, was with him. (2 Samuel 5:9-10)"),
    { fn() { regionAdd("taken", "jr_end"); regionAdd("taken", "jx_zion"); regionAdd("taken", "g_exit_open"); hb.cine = null; } }, { wait: 1.2 },
    { fn() { jrArk(); } },
  ]);
}
// ---- the ark comes into the city (6:12-15), the end of the game: Glen's two films, his song under them (the first
//      time it plays in Part Two), carried on into the last Journal page and the card ---------------------------------
function jrArk() {
  rPlay([
    HB_SAY("", "David went and brought up God’s ark from the house of Obed-Edom into David’s city with joy. (2 Samuel 6:12)"),
    { fn() {
      region.wait = 99;   // (held here till the films are done)
      const last = () => { regionAdd("taken", "jr_ark"); regionAdd("taken", "jx_ark"); region.wait = 0; jsceneOpen(true, "js_ark"); };   // (his last page; then the card, and the road)
      if (/simgame/.test(location.pathname) && !window.JR_FILMS) return last();
      songToggle(true);
      preFilm.start({ src: "../assets/video/ark_enter.mp4", words: [[0.6, 5.4, "The ark comes to Jerusalem", "“…with shouting and with the sound of the trumpet.” (2 Samuel 6:15)"]] }, () =>
        preFilm.start({ src: "../assets/video/ark_dance.mp4", words: [[1.0, 6.0, "“David danced before the LORD with all his might.”", "2 Samuel 6:14"]] }, last));
    } },
  ]);
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
function jrDraw(camX) {
  const r = region.room; if (r && r.id === "shaft") { jrDrawShaft(camX); return; }
  if (r && r.id === "zion") { jrDrawBattle(camX); return; }
  if (r && r.id === "jcourse") { jrCourseGround(r, camX); return; }
  if (!r || r.id !== "gorge") return;
  // the bridge, once the sand has shown it: Glen's own rock (gorge/bridge.png), each stone its slice of it, so the
  //  stones join into one span; gold along its top as the film ends
  //  (Glen 11-27: "longer and behind the cliff edge ... fade at the edges so it melts into the cliff") each end, once
  //  found, runs on IN px under its cliff, fading out; the cliffs drawn after it, over it
  const im = roomImg("w8/jerusalem/gorge/bridge.png"); if (!im || !im.naturalWidth) { jrCliffs(camX); return; }
  const k = JR.BRIDGE.K, y = GR * T - JR.BRIDGE.UP, h = im.naturalHeight * k, sw = T / k, iw = im.naturalWidth, IN = JR.BRIDGE.IN, S = 6;
  const shown = c => jr.found[c] !== undefined && jr.found[c] >= 0;
  for (const [c, dir] of [[jr.g0, -1], [jr.g1, 1]]) if (shown(c)) {
    const x0 = dir < 0 ? c * T : (c + 1) * T;
    for (let i = 0; i < IN; i += S) {
      const x = dir < 0 ? x0 - i - S : x0 + i; ctx.globalAlpha = 1 - (i + S / 2) / IN;
      const sx = ((((x / k) % iw) + iw) % iw); ctx.drawImage(im, Math.min(sx, iw - S / k), 0, S / k, im.naturalHeight, Math.round(x - camX), y, S + 0.5, h);
    }
    ctx.globalAlpha = 1;
  }
  for (let c = jr.g0; c <= jr.g1; c++) {
    const age = jr.found[c]; if (age === undefined || age < 0) continue;
    const x = c * T - camX; if (x < -T || x > W + T) continue;
    const sx = Math.min((c * sw) % iw, iw - sw);   // (the same place along his rock as the ends under the cliffs)
    ctx.drawImage(im, sx, 0, sw, im.naturalHeight, Math.round(x), y, T + 1, h);
    if (age < JR.GLOW_T) {   // the golden edge, as in Glen's film
      const g = 1 - age / JR.GLOW_T; ctx.save(); ctx.globalAlpha = g;
      ctx.shadowColor = "#ffb030"; ctx.shadowBlur = 16; ctx.fillStyle = "#ffc45a"; ctx.fillRect(Math.round(x), y + 2, T + 1, 3);
      ctx.globalAlpha = g * 0.3; ctx.shadowBlur = 0; ctx.fillRect(Math.round(x), y + 2, T + 1, h * 0.6); ctx.restore();
    }
  }
  jrCliffs(camX);
}
// the battle in Zion: the archers waist-up over the roofs and the slingers over the citadel's wall (Glen's Philistine
//  archer and slinger clips stand in), only from the roof line or the wall's top up; their arrows and stones
function jrDrawBattle(camX) {
  const Z = JR.ZION;
  for (const f of jr.foes) {
    if (f.y === null) continue;
    const a = f.hp > 0 ? 1 : Math.max(0, 1 - f.gone / 0.8); if (a <= 0) continue;
    const arch = f.kind === "arch", nm = arch ? "phil_bow" : "phil_sling", S = SPR[nm]; if (!S) continue;
    const u = f.st === "up" ? Math.min(1, f.t / Z.RISE) : 0;
    let fr;
    if (arch) fr = f.st === "up" ? [0, 1, 5, 6, 7, 8, 9, 10][Math.min(7, Math.floor(u * 8))] : 11;
    else fr = f.st === "up" ? Math.min(9, Math.floor(u * 10)) : 11;
    const rise = f.hp <= 0 ? f.gone * 140 : f.st === "up" ? Math.max(0, 1 - f.t / 0.25) * Z.DOWN : Z.DOWN;   // (down behind cover between shots; sinking away when he runs)
    const face = david.x < f.x ? -1 : 1;
    ctx.save(); ctx.beginPath(); ctx.rect(f.x - camX - 200, f.y - 400, 400, 400); ctx.clip();
    drawSprite(nm, fr, f.x - camX, f.y + (arch ? Z.ARCH_Y : Z.SLING_Y) + rise, face, arch ? Z.ARCH_K : Z.SLING_K, a, f.flash > 0 ? "brightness(2.2)" : "");
    ctx.restore();
  }
  for (const s_ of jr.shots) {
    const x = s_.x - camX;
    if (s_.kind === "arch") {
      const ang = Math.atan2(s_.vy, s_.vx); ctx.save(); ctx.translate(x, s_.y); ctx.rotate(ang);
      ctx.strokeStyle = "#5a3a1c"; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(-22, 0); ctx.lineTo(12, 0); ctx.stroke();
      ctx.fillStyle = "#9aa0a6"; ctx.beginPath(); ctx.moveTo(18, 0); ctx.lineTo(10, -4); ctx.lineTo(10, 4); ctx.fill();
      ctx.fillStyle = "#e8dcc4"; ctx.fillRect(-24, -4, 7, 3); ctx.fillRect(-24, 1, 7, 3); ctx.restore();
    } else { ctx.fillStyle = "#6e665c"; ctx.beginPath(); ctx.arc(x, s_.y, 6, 0, Math.PI * 2); ctx.fill(); }
  }
}
// Under the Stronghold: real ground over the painting's foot, so he walks on it, not on the picture
function jrCourseGround(r, camX) {
  const G = JR.COURSE_GROUND, im = roomImg(G.IMG); if (!im || !im.naturalWidth) return;
  const w = im.naturalWidth * G.K, h = im.naturalHeight * G.K, x0 = r.c0 * T - camX, x1 = x0 + r.w * T;
  ctx.save(); ctx.beginPath(); ctx.rect(x0, 0, x1 - x0, H); ctx.clip();
  for (let x = x0; x < x1; x += w - 1) if (x + w > 0 && x < W) ctx.drawImage(im, Math.round(x), H - h, Math.ceil(w), h);
  ctx.restore();
}
// the watercourse: the Jebusites at the top (Gath's guards stand in), and their rocks
function jrDrawShaft(camX) {
  const C = JR.CLIMB, R = C.ROCK;
  for (const t of jr.throwers) {
    const a = t.hp > 0 ? 1 : Math.max(0, 1 - t.gone / 1.2); if (a <= 0) continue;
    const spr = t.hp <= 0 ? "gath_guard_walk" : t.throwT > 0 ? "gath_guard_point" : "gath_guard_idle", S = SPR[spr];
    const f = S ? Math.floor(t.t * 10) % S.frames : 0, x = t.x - camX + (t.hp <= 0 ? t.dir * t.gone * 160 : 0);
    drawSprite(spr, f, x, t.y + 4, t.hp <= 0 ? t.dir : t.dir, C.JEB_K, a, t.flash > 0 ? "brightness(2.2)" : "");
  }
  const im = ITEM.boulder_grey;
  for (const k of jr.rocks) {
    const x = k.x - camX, y = k.y - R.R;
    ctx.save(); ctx.translate(x, y); ctx.rotate(k.spin);
    if (im && im.naturalWidth) ctx.drawImage(im, -R.R * 1.1, -R.R * 1.1, R.R * 2.2, R.R * 2.2);
    else { ctx.fillStyle = "#7a6c5e"; ctx.beginPath(); ctx.arc(0, 0, R.R, 0, Math.PI * 2); ctx.fill(); }
    ctx.restore();
  }
}
// (Glen 11-26) his wall, once (the Jebusites on its top edge), and his two cliffs at the gorge's edges
let jrWallTop = null;   // (the wall's top edge down each column, once it's loaded)
function jrWallTops(im) {
  if (jrWallTop) return;
  const c = document.createElement("canvas"); c.width = im.naturalWidth; c.height = im.naturalHeight; const g = c.getContext("2d"); g.drawImage(im, 0, 0);
  const a = g.getImageData(0, 0, c.width, c.height).data; jrWallTop = [];
  for (let x = 0; x < c.width; x++) { let y = 0; while (y < c.height && a[(y * c.width + x) * 4 + 3] < 128) y++; jrWallTop.push(y); }
}
function jrAfterMid(r, camX) {
  if (r.id === "zion") {   // the citadel's wall at the room's end, the slingers on its top edge
    const im = roomImg("w8/jerusalem/jvalley/wall.png"); if (!im || !im.naturalWidth) return;
    const Z = JR.ZION, k = Z.WALL.K, x0 = (r.c0 + Z.WALL.AT) * T, y0 = GR * T + JR.WALL.BOT * k - im.naturalHeight * k;
    ctx.drawImage(im, Math.round(x0 - camX), Math.round(y0), im.naturalWidth * k, im.naturalHeight * k);
    jrWallTops(im);
    for (const f of jr.foes) if (f.kind === "sling" && f.y === null) {
      const i = Math.round((f.x - x0) / k); let t = 1e9; for (let q = i - 30; q <= i + 30; q++) if (jrWallTop[q] !== undefined) t = Math.min(t, jrWallTop[q]);
      f.y = y0 + (t < 1e9 ? t : 0) * k + 6;
    }
    return;
  }
}
// (Glen 11-27) Below Jerusalem: his fortress wall and its gate, its dirt road the floor (over the ground's tiles,
//  under the Jebusites and David); the sky behind it the far picture
function jrValleyWall(r, camX) {
  const im = roomImg(r.fort); if (!im || !im.naturalWidth) return false;
  ctx.drawImage(im, Math.round(r.c0 * T - camX), 0, im.naturalWidth, H);
  return true;
}
function jrCliffs(camX) {   // (over the ground's tiles and the dark of the gorge, under the bridge)
  {
    const C = JR.CLIFF, L = roomImg("w8/jerusalem/gorge/cliff_l.png"), R = roomImg("w8/jerusalem/gorge/cliff_r.png"), y = GR * T - C.TOP * C.K;
    if (L && L.naturalWidth) ctx.drawImage(L, Math.round(jr.g0 * T - C.LIP_L * C.K - camX), Math.round(y), L.naturalWidth * C.K, L.naturalHeight * C.K);
    if (R && R.naturalWidth) ctx.drawImage(R, Math.round((jr.g1 + 1) * T - C.LIP_R * C.K - camX), Math.round(y), R.naturalWidth * C.K, R.naturalHeight * C.K);
  }
}
// the watercourse: his cave looking up (the room's whole height), his stone pillars up its sides, his roots at its foot
function jrShaftBack(r, camX) {
  const A = JR.SHAFT_ART, S = JR.SHAFT, rx = r.c0 * T - camX, rw = r.w * T, top = -(r.up || 0) * T;
  ctx.fillStyle = "#0b0907"; ctx.fillRect(0, camY, W, H);
  const far = roomImg(A.far); if (far && far.naturalWidth) ctx.drawImage(far, Math.round(rx), top, rw, H - top);
  const pi = roomImg(A.pillar);
  if (pi && pi.naturalWidth) { const w = pi.naturalWidth * S.PILLAR_K, h = pi.naturalHeight * S.PILLAR_K;
    for (const x of [rx + S.PILLAR_IN - w / 2, rx + rw - S.PILLAR_IN - w / 2]) for (let y = H - h; y > top - h; y -= h - 2) ctx.drawImage(pi, Math.round(x), Math.round(y), w, h); }
  const ne = roomImg(A.near); if (ne && ne.naturalWidth) ctx.drawImage(ne, Math.round(rx), H - ne.naturalHeight * rw / ne.naturalWidth, rw, ne.naturalHeight * rw / ne.naturalWidth);
  ctx.fillStyle = `rgba(8,6,4,${S.DIM})`; ctx.fillRect(0, camY, W, H);
  return true;
}
function jrDrawFront(camX) {
  const r = region.room, w = jr.water; if (!r || r.id !== "shaft" || !w || jrHas("jr_end")) return;
  const now = performance.now() / 1000, top = w.y;
  if (top > camY + H + 20) return;
  ctx.save();
  ctx.fillStyle = "rgba(38,86,104,0.62)"; ctx.fillRect(0, top, W, camY + H - top + 40);
  ctx.strokeStyle = "rgba(190,225,235,0.75)"; ctx.lineWidth = 3; ctx.beginPath();
  for (let x = 0; x <= W; x += 12) { const yy = top + Math.sin(x / 40 + now * 3) * 4; x ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy); }
  ctx.stroke(); ctx.restore();
}
function jrDrawOver() {
  if (jr.fade > 0) { ctx.fillStyle = `rgba(0,0,0,${Math.min(1, jr.fade / JR.FALL_FADE * 1.4)})`; ctx.fillRect(0, 0, W, H); }
}
