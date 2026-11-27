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
  GORGE: [24, 22],
  WALL: { AT: 20, BOT: 30, ON: 16 },   // (Glen's wall: its left end's column, its bottom below the ground line (px), how far down from its top edge the Jebusites stand)
  CLIFF: { K: 0.7, LIP_L: 520, LIP_R: 60, TOP: 56 },   // (his two cliffs: their scale, where each one's lip is in its picture (px), how far down the top is the ground)
  SHAFT_ART: { far: "w8/jerusalem/shaft/far.jpg", pillar: "w8/jerusalem/shaft/pillar.png", near: "w8/jerusalem/shaft/near.png" },
  SHAFT: { PILLAR_K: 0.8, PILLAR_IN: 90, DIM: 0.22 },   // (the pillars' scale, how far in from the room's sides; the cave dimmed so the ledges stand out)             // (the gorge: its first column, how wide; the hidden bridge spans all of it)
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
    far: "w8/jerusalem/jvalley/far", near: "w8/jerusalem/jvalley/near.png", wall: "w8/jerusalem/jvalley/wall.png" },   // (Glen 11-26, Gemini; the wall drawn once: jrAfterMid)
  { id: "gorge", name: "The Gorge Below the City", w: 80, bg: "w4_1", mx: 2, my: 4, mw: 2, left: "jvalley",
    get right() { return jr.ended || jrHas("jr_leap") ? "shaft" : null; },
    far: "w8/jerusalem/gorge/far", floor: "w8/jerusalem/gorge/near.png" },   // (Glen 11-26: his rocky edge as the floor (the gorge cut out of it), his two cliffs at its edges: jrCliffs)
  { id: "shaft", name: "The Watercourse", w: 36, up: 44, bg: "w4_1", mx: 4, my: 2, mw: 1, mh: 3, left: "gorge",
    shaft: true, ground: "pebbles" },   // (Glen 11-26: his cave looking up, stone pillars at its sides, roots at its foot: jrShaftBack)
  { id: "zion", name: "The Stronghold of Zion", w: 60, bg: "w4_1", mx: 5, my: 2, mw: 2,
    far: "w8/jerusalem/zion/far", mid: "w8/jerusalem/zion/mid.png", midY: 386, near: "w8/jerusalem/zion/near.png", nearK: 0.8 },   // (Glen 11-26, Gemini)
);
HEB.spreads.push(
  { id: "js_zion", when: "jr_end", title: "Jerusalem",
    entry: ["The Jebusites laughed at us from their walls: even the blind and the lame could keep us out. The way in was hidden, under the ground, and I could only find it one step at a time. Now the stronghold of Zion is the LORD's city, and mine to keep for Him.", "2 Samuel 5:6-10"],
    psalm: { ref: "Psalm 122", text: "I was glad when they said to me, “Let’s go to the LORD’s house!” Our feet are standing within your gates, Jerusalem! (122:1-2)" } },
  // (Glen 11-25: his two clips "for the end of the game") the ark comes into the city: his last page
  { id: "js_ark", when: "jr_ark", title: "The Ark Comes Home", final: true,
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
  floor: (r, camX) => !!r.ground && r4Floor(r, camX),
  pitFall: () => jrPitFall(),
  pitPic: "w8/jerusalem/gorge_pit.png",   // (Glen 11-27: his dark pit, down every pit on this stage: region.js drawPitPic)
});

// ---------------------------------------------------------------------------------------------------------------------
function jrBuild(R) {
  jr.found = {}; jr.stand = null; jr.shown = null; jr.ended = false; jr.water = null; jr.cp = null; jr.jeb.length = 0;
  const P = hbPerson;
  ["w8/jerusalem/jvalley/wall.png", "w8/jerusalem/gorge/cliff_l.png", "w8/jerusalem/gorge/cliff_r.png", "w8/jerusalem/gorge_pit.png"].forEach(roomImg);   // (drawn by jrAfterMid, not as a room layer)
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
    region.props = region.props.filter(p => !(p.room === rm && /^p_(left|right)$/.test(p.n)));   // (Glen 11-26: his cliffs are its edges, not the pit kit)
    jr.g0 = c + g0; jr.g1 = c + g0 + gw - 1;
    if (jrHas("jr_leap")) for (let k = jr.g0; k <= jr.g1; k++) jrStone(k, true);   // (crossed before: the sand still shows it)
  }
  // -- The Watercourse: up the shaft, ledges zigzagging to the top
  c = R("shaft");
  { const rm = "shaft"; Object.assign(KIT, R4_KIT);   // (World 4's ledges: adullam.js adds them only in its own build)
    ground(c, c + 35);
    ["w4/floor_pebbles.png", ...Object.values(JR.SHAFT_ART)].forEach(roomImg);
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
      const last = () => { regionAdd("taken", "jr_ark"); region.wait = 0; jsceneOpen(true, "js_ark"); };   // (his last page; then the card, and the road)
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
  const r = region.room; if (!r || r.id !== "gorge") return;
  jrCliffs(camX);
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
// (Glen 11-26) his wall, once (the Jebusites on its top edge), and his two cliffs at the gorge's edges
let jrWallTop = null;   // (the wall's top edge down each column, once it's loaded)
function jrAfterMid(r, camX) {
  if (r.id === "jvalley") {
    const im = roomImg(r.wall); if (!im || !im.naturalWidth) return;
    const x0 = (r.c0 + JR.WALL.AT) * T, y0 = GR * T + JR.WALL.BOT - im.naturalHeight;
    ctx.drawImage(im, Math.round(x0 - camX), y0);
    if (!jrWallTop) { const c = document.createElement("canvas"); c.width = im.naturalWidth; c.height = im.naturalHeight; const g = c.getContext("2d"); g.drawImage(im, 0, 0);
      const a = g.getImageData(0, 0, c.width, c.height).data; jrWallTop = [];
      for (let x = 0; x < c.width; x++) { let y = 0; while (y < c.height && a[(y * c.width + x) * 4 + 3] < 128) y++; jrWallTop.push(y); } }
    for (const p of jr.jeb) { const k = Math.round(p.x - x0); let t = 1e9; for (let i = k - 20; i <= k + 20; i++) if (jrWallTop[i] !== undefined) t = Math.min(t, jrWallTop[i]);
      if (t < 1e9) p.y = y0 + t + JR.WALL.ON; }
  }
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
