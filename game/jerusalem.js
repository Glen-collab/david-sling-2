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
  WALL_Y: 236,                 // (px above the ground line: where the Jebusites stand on the wall's battlements)
  GORGE: [24, 22],             // (the gorge: its first column, how wide; the hidden bridge spans all of it)
  SLAB_H: 26,                  // (how thick the bridge stones are drawn, once the sand has shown them)
  REVEAL_IN: 6,                // (px: a stone is there only once his middle is this far out over it, and only to a WALK)
  FALL_FADE: 0.9,              // (s: the dark after a fall)
  END_AT: 4,                   // (columns past the bridge: Glen's sand toss plays)
  GLOW_T: 2.2,                 // (s: the bridge glows gold as the film ends)
  // the watercourse: the water starts rising once he's off the floor; it catches him if it's this far over his feet
  WATER: { RATE: 65, START: 90, LAG: 1.2, CATCH: 60, FADE: 0.9 },
  SHAFT_TOP: -1240,            // (px: the highest ledge's surface; the shaft's ledges zigzag up to it from the floor)
};
const jr = { found: {}, stand: null, fade: 0, falls: 0, shown: null, ended: false, film: false, water: null, cp: null, top: null, mid: null, jeb: [] };
const jrHas = id => hbHas(id);
const JR_ROOMS = ["jvalley", "gorge", "shaft", "zion"];

HEB.rooms.push(
  { id: "jvalley", name: "Below Jerusalem", w: 70, bg: "w4_1", mx: 0, my: 4, mw: 2,
    get right() { return jrHas("jr_taunt") ? "gorge" : null; },
    far: "ziph/horesh/far", mid: "w3/gath/mid.png", midP: 1, midX: 900, midY: -44, near: "w3/gath/near.png", nearY: 606, floor: "w3/gath/floor.png" },   // (stand-in: Gath's wall and gate, before Ziph's hills)
  { id: "gorge", name: "The Gorge Below the City", w: 80, bg: "w4_1", mx: 2, my: 4, mw: 2, left: "jvalley",
    get right() { return jr.ended || jrHas("jr_leap") ? "shaft" : null; },
    far: "engedi/rocks/far", mid: "engedi/rocks/mid.png", midY: 0 },   // (stand-in: En-Gedi's rocks)
  { id: "shaft", name: "The Watercourse", w: 36, up: 44, bg: "w4_1", mx: 4, my: 2, mw: 1, mh: 3, left: "gorge",
    pic: "w4/tall_well", k: 0.6, fog: 0.4, tall: true, rock: "pale", ground: "pebbles" },   // (stand-in: World 4's sunlit Old Well Shaft)
  { id: "zion", name: "The Stronghold of Zion", w: 60, bg: "w4_1", mx: 5, my: 2, mw: 2,
    far: "keilah/town/far", mid: "keilah/town/mid.png", midY: 0, near: "keilah/town/near.png" },   // (stand-in: Keilah's town by day)
);
HEB.spreads.push(
  { id: "js_zion", when: "jr_end", title: "Jerusalem", final: true,
    entry: ["The Jebusites laughed at us from their walls: even the blind and the lame could keep us out. The way in was hidden, under the ground, and I could only find it one step at a time. Now the stronghold of Zion is the LORD's city, and mine to keep for Him.", "2 Samuel 5:6-10"],
    psalm: { ref: "Psalm 122", text: "I was glad when they said to me, “Let’s go to the LORD’s house!” Our feet are standing within your gates, Jerusalem! (122:1-2)" } },
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
  backdrop: (r, camX) => !!r.pic && r4Backdrop(r, camX),   // (the watercourse: adullam.js's tall pictures)
  floor: (r, camX) => !!r.ground && r4Floor(r, camX),
  pitFall: () => jrPitFall(),
});

// ---------------------------------------------------------------------------------------------------------------------
function jrBuild(R) {
  jr.found = {}; jr.stand = null; jr.shown = null; jr.ended = false; jr.water = null; jr.cp = null; jr.jeb.length = 0;
  const P = hbPerson;
  // -- Below Jerusalem: the walls, the Jebusites on them
  let c = R("jvalley");
  { const rm = "jvalley", X = k => (c + k) * T;
    ground(c, c + 69);
    for (const [k, spr, dir] of [[30, "gath_guard_laugh", -1], [36, "gath_guard_point", -1], [44, "gath_guard_laugh", -1], [52, "gath_guard_idle", -1]]) {
      const p = P(rm, spr, X(k), dir, null, 0.8); p.y = FOOT - JR.WALL_Y; jr.jeb.push(p);
    }
  }
  // -- The Gorge: the Leap of Faith. No bridge you can see
  c = R("gorge");
  { const rm = "gorge", [g0, gw] = JR.GORGE;
    ground(c, c + 79);
    rHole(rm, c + g0, gw);
    jr.g0 = c + g0; jr.g1 = c + g0 + gw - 1;
    if (jrHas("jr_leap")) for (let k = jr.g0; k <= jr.g1; k++) jrStone(k, true);   // (crossed before: the sand still shows it)
  }
  // -- The Watercourse: up the shaft, ledges zigzagging to the top
  c = R("shaft");
  { const rm = "shaft"; Object.assign(KIT, R4_KIT);   // (World 4's ledges: adullam.js adds them only in its own build)
    ground(c, c + 35);
    ["w4/tall_well", "w4/floor_pebbles.png", "w4/near_pale.png", "w4/ceil_pale.png"].forEach(roomImg);
    const z = r4Zig(rm, "pale", 500, JR.SHAFT_TOP, false, 2);
    jr.top = z[z.length - 1]; jr.mid = z[Math.floor(z.length / 2)];
  }
  // -- The Stronghold of Zion
  c = R("zion");
  { const rm = "zion", X = k => (c + k) * T;
    ground(c, c + 59);
    campfire(c + 4, GR - 1);   // an olive press (the save point)
    P(rm, "abishai_idle", X(20), 1); P(rm, "soldier_talk", X(24), -1, null, 0.85);
  }
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
  if (r.id === "gorge") jrGorge(dt, d, free);
  if (r.id === "shaft") jrShaft(dt, d, free);
}

function jrTaunt() {
  rPlay([
    hbCine("Jerusalem", "The city of the Jebusites"),
    { fn() { david.vx = 0; david.facing = 1; } }, { wait: 2 },
    HB_SAY("", "The king and his men went to Jerusalem against the Jebusites, the inhabitants of the land, who spoke to David, saying, “The blind and the lame will keep you out of here,” thinking, “David can’t come in here.” (2 Samuel 5:6)"),
    { fn() { for (const p of jr.jeb) if (p.spr === "gath_guard_idle") p.spr = "gath_guard_laugh"; } }, { wait: 1.2 },
    HB_SAY("David", "“Whoever strikes the Jebusites, let him go up to the watercourse…” (2 Samuel 5:8)"),
    { fn() { regionAdd("taken", "jr_taunt"); hb.cine = null; toast("The gate is shut. Find the watercourse: down into the gorge (right)."); } },
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
  if (walking && c >= jr.g0 && c <= jr.g1 && jr.found[c] === undefined && jrGround(c - d.facing)) { jrStone(c); sfx("stone_hit", c * T, 0.25, 0.6); }
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
  if (w.on && w.y < d.y - W_.CATCH) {   // caught: back down (no heart lost), the water back down too
    const s = jr.cp || { x: hbRoomX("shaft", 3), y: GR * T };
    d.x = s.x; d.y = s.y; d.vx = d.vy = 0; d.fallTop = null; setState("idle"); snapCamera();
    w.y = s.y + W_.START; w.t = 0; w.on = !!jr.cp;
    jr.fade = W_.FADE; toast(jr.cp ? "The water caught you! From halfway up again." : "The water caught you! Up again, quickly.");
    return;
  }
  // the top: into the city
  if (free && d.onGround && jr.top && d.y <= jr.top.y + 2 && Math.abs(d.x - (jr.top.x + jr.top.x1) / 2) < 200) {
    w.on = false;
    rPlay([{ fn() { regionGo(hbRoomX("zion", 8), 1, () => jrZion()); } }]);
  }
}

// ---- the Stronghold of Zion (5:7, 9-10) ------------------------------------------------------------------------------
function jrZion() {
  rPlay([
    hbCine("The Stronghold of Zion", "David's city"),
    { fn() { david.vx = 0; david.facing = 1; } }, { wait: 2 },
    HB_SAY("", "Nevertheless David took the stronghold of Zion. This is David’s city. (2 Samuel 5:7)"),
    HB_SAY("", "David lived in the stronghold, and called it David’s city. David built around from Millo and inward. David grew greater and greater, for the LORD, the God of Armies, was with him. (2 Samuel 5:9-10)"),
    { fn() { regionAdd("taken", "jr_end"); regionAdd("taken", "g_exit_open"); hb.cine = null; } }, { wait: 1.2 },
    { fn() { jsceneOpen(true, "js_zion"); } },   // (his last page; then the card, and the road)
  ]);
}

// ---------------------------------------------------------------------------------------------------------------------
// drawing
function jrDraw(camX) {
  const r = region.room; if (!r || r.id !== "gorge") return;
  // the bridge, once the sand has shown it (the color of the cliffs)
  const y = GR * T, h = JR.SLAB_H;
  for (let c = jr.g0; c <= jr.g1; c++) {
    const age = jr.found[c]; if (age === undefined || age < 0) continue;
    const x = c * T - camX; if (x < -T || x > W + T) continue;
    ctx.save();
    const g = ctx.createLinearGradient(0, y, 0, y + h);
    g.addColorStop(0, "#d8b07a"); g.addColorStop(0.35, "#c09060"); g.addColorStop(1, "#8a6440");
    ctx.fillStyle = g; ctx.beginPath(); ctx.roundRect(x + 1, y, T - 2, h, 4); ctx.fill();
    ctx.fillStyle = "rgba(255,236,200,0.45)"; ctx.fillRect(x + 3, y + 1, T - 6, 3);
    ctx.fillStyle = "rgba(70,45,25,0.35)";
    if (c % 3 === 0) ctx.fillRect(x + 8, y + 12, 9, 2);
    if (c % 4 === 1) ctx.fillRect(x + 20, y + 8, 2, 10);
    if (age < JR.GLOW_T) {   // the golden edge, as in Glen's film
      const k = 1 - age / JR.GLOW_T;
      ctx.globalAlpha = k; ctx.strokeStyle = "#ffc45a"; ctx.lineWidth = 3; ctx.shadowColor = "#ffb030"; ctx.shadowBlur = 16;
      ctx.beginPath(); ctx.roundRect(x + 1, y, T - 2, h, 4); ctx.stroke();
    }
    ctx.restore();
  }
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
