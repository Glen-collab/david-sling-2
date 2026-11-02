// Part Two: Player 2 (Glen 2026-11-02). One second player beside David, in the Part Two stages (World 9 for now).
// Who it is depends on the stage (STAGE_INFO.p2, or P2_ROSTER below); Select on Player 2's controller changes who.
//   - Jonathan: the bow (B; hold Up for the high shot) and his sword (X, or Down + B)
//   - the armor-bearer: small and quick, crawls through tunnels too low for David (hold Down), gathers olives,
//     and his lamp lights the caves
//   - Abishai: the spear (B), and crouch-walks to hide (hold Down)
//   - Benaiah: the strongest: the staff (B), the overhead smash that breaks things (Up + B, or X), pushes boulders
//   - Asahel: the fastest: sprints, long jumps, javelins (B), slides under things (Down while running)
// Player 2 never loses David a heart: a fall or getting far behind just brings him back beside David.
// Controls: a second controller; or the keyboard's number pad (8 4 5 6 = move, 0 = A, . = B, 2 = X, + = Select);
// or key P hands the one controller to Player 2 while the keyboard plays David (main.js pollInput).
// Attacks reuse the stone code: a melee swing is a short invisible "stone" (s.sword), arrows and javelins are real ones
// (s.p2), so everything that a sling stone can hit (snakes, jackals, scorpions, gourds, deadfalls...) works for them.

const P2 = {
  FAR: 0.62,          // more than this much of the screen from David, for FAR_T seconds: back beside him
  FAR_T: 1.6,
  HIT_T: 0.55,        // knocked back this long when an animal gets him
  INV_T: 1.3,         // ...and safe this long after
  KNOCK: 300,
  RUN_DELAY: 0.55,    // as David: hold a direction this long to run
  ACCEL: 2600, FRICTION: 2400,
  PUSH_T: 0.45,       // Benaiah leaning on a boulder this long moves it one tile
  ARROW_SPEED: 1150, JAVELIN_SPEED: 1000,
};

// Each character: body box (w, h, crouching h), speeds, jump, sprite sheets, and what B (act), Up+B (actUp) and X (act2) do.
// at: when in the move the arrow or javelin leaves (0-1); from-to: when a swing can hit; reach: px in front.
const P2_CHARS = {
  armorbearer: {
    name: "the armor-bearer", w: 26, h: 66, lowH: 30, walk: 250, run: 400, jump: 900, crawl: 140, lamp: 170,
    idle: "armorbearer_idle", walkA: "armorbearer_walk", runA: "armorbearer_run", jumpA: "armorbearer_jump", hit: "armorbearer_hit",
    crawlA: "armorbearer_crawl", talk: "armorbearer_talk",
    act: { sheet: "armorbearer_pickup", time: 0.75, kind: "gather" },
  },
  jonathan: {
    name: "Jonathan", w: 30, h: 100, walk: 270, run: 440, jump: 1000,
    idle: "jonathan_idle", walkA: "jonathan_walk", runA: "jonathan_run", jumpA: "jonathan_jump", hit: "jonathan_hit", talk: "jonathan_talk",
    act: { sheet: "jonathan_shoot", time: 0.8, at: 0.66, kind: "arrow", ang: 0 },
    actUp: { sheet: "jonathan_shoot_high", time: 0.8, at: 0.5, kind: "arrow", ang: -0.75 },
    act2: { sheet: "jonathan_sword_slash", time: 0.5, from: 0.22, to: 0.55, kind: "melee", reach: [30, 95], y: [-105, -22] },
  },
  abishai: {
    name: "Abishai", w: 30, h: 108, lowH: 64, walk: 260, run: 400, jump: 950, crawl: 130,
    idle: "abishai_idle", walkA: "abishai_walk", runA: "abishai_walk", jumpA: null, airFrame: ["abishai_walk", 3], hit: null,
    crawlA: "abishai_sneak", talk: "abishai_talk",
    act: { sheet: "abishai_thrust", time: 0.6, from: 0.3, to: 0.65, kind: "melee", reach: [40, 135], y: [-80, -24] },
  },
  benaiah: {
    name: "Benaiah", w: 36, h: 118, lowH: 70, walk: 240, run: 380, jump: 900, crawl: 0, strong: true,
    idle: "benaiah_idle", walkA: "benaiah_walk", runA: "benaiah_run", jumpA: null, airFrame: ["benaiah_run", 2], hit: "benaiah_hit",
    crouch: ["benaiah_lift", 5], talk: "benaiah_talk", pushA: "benaiah_push",
    act: { sheet: "benaiah_swing", time: 0.85, from: 0.3, to: 0.62, kind: "melee", reach: [30, 120], y: [-95, -24] },
    actUp: { sheet: "benaiah_smash", time: 0.9, from: 0.52, to: 0.66, kind: "melee", heavy: true, reach: [40, 110], y: [-60, -8] },
  },
  asahel: {
    name: "Asahel", w: 28, h: 104, lowH: 50, walk: 290, run: 520, sprint: 650, jump: 1060, crawl: 0, longJump: 1.35,
    idle: "asahel_idle", walkA: "asahel_walk", runA: "asahel_run", sprintA: "asahel_sprint", jumpA: "asahel_long_jump", hit: "asahel_hit",
    crouch: ["asahel_slide", 3], talk: "asahel_talk", slideA: "asahel_slide", skidA: "asahel_skid",
    act: { sheet: "asahel_throw2", time: 0.85, at: 0.72, kind: "javelin", ang: -0.12 },
    actRun: { sheet: "asahel_run_throw", time: 0.65, at: 0.55, kind: "javelin", ang: -0.08 },
  },
};
P2_CHARS.benaiah.act2 = P2_CHARS.benaiah.actUp;
P2_CHARS.jonathan.actDown = P2_CHARS.jonathan.act2;
Object.assign(TUNE.SPRITE_SIZE, Object.fromEntries(Object.keys(SPR).filter(n => n.startsWith("jonathan_")).map(n => [n, 1.08])));      // a little taller than David
Object.assign(TUNE.SPRITE_SIZE, Object.fromEntries(Object.keys(SPR).filter(n => n.startsWith("armorbearer_")).map(n => [n, 0.7])));   // a young boy

// who can be Player 2 in each stage (first = who joins); the stage can say in STAGE_INFO.p2
const P2_ROSTER = {
  "9-1": ["armorbearer", "abishai", "benaiah", "asahel"],                 // En-Gedi: Saul's men are about, so no Jonathan
  "9-2": ["armorbearer", "jonathan", "abishai", "benaiah", "asahel"],
  "9-3": ["armorbearer", "jonathan", "abishai", "benaiah", "asahel"],
  "9-4": ["jonathan", "armorbearer"],
};
const p2Roster = () => STAGE_INFO.p2 || P2_ROSTER[LEVEL_NAME] || ["armorbearer"];

const p2 = { on: false, who: null, x: 0, y: 0, vx: 0, vy: 0, onGround: false, facing: 1, holdT: 0, t: 0, act: null, hitT: 0, inv: 0,
  low: false, slideT: 0, skidT: 0, farT: 0, pushT: 0, fell: false, toldJoin: false };
const P2C = () => P2_CHARS[p2.who];

// ---------------------------------------------------------------------------
// boulders Benaiah can push: setPiece("pushrock", c, r, { w, h }) in a layout (material 4, drawn as the half-buried
// boulders). Pushed off an edge it drops, and can fill a pit or make a step.
// ---------------------------------------------------------------------------
const pushRocks = setPieces.filter(p => p.kind === "pushrock").map(p => ({ c: p.c, r: p.r, w: p.w || 3, h: p.h || 3, told: false }));
for (const k of pushRocks) block(k.c, k.r, k.w, k.h, 4);
function rockAt(c, r) { return pushRocks.find(k => c >= k.c && c < k.c + k.w && r >= k.r && r < k.r + k.h); }
function moveRock(k, dir) {
  const nc = dir > 0 ? k.c + k.w : k.c - 1;
  for (let r = k.r; r < k.r + k.h; r++) if (isSolid(nc, r) || r < 0) return false;
  for (let r = k.r; r < k.r + k.h; r++) { solid[r][dir > 0 ? k.c : k.c + k.w - 1] = 0; solid[r][nc] = 4; }
  k.c += dir;
  // over a drop: it falls until it lands (it can fill a pit)
  for (;;) {
    const below = k.r + k.h; if (below >= ROWS) break;
    let free = true; for (let c = k.c; c < k.c + k.w; c++) if (isSolid(c, below)) free = false;
    if (!free) break;
    for (let c = k.c; c < k.c + k.w; c++) { solid[k.r][c] = 0; solid[below][c] = 4; }
    k.r++;
  }
  for (let n = 0; n < 12; n++) bits.push({ x: (k.c + (dir > 0 ? 0 : k.w)) * T, y: (k.r + k.h) * T - 4, vx: -dir * Math.random() * 160, vy: -Math.random() * 200, life: 0.5, color: "#c9a86a" });
  sfx("stone_hit", k.c * T, 0.5, 0.55);
  return true;
}

// ---------------------------------------------------------------------------
// joining, leaving, changing who
// ---------------------------------------------------------------------------
function p2Place(x, y) {   // beside David, on his ground
  Object.assign(p2, { x, y, vx: 0, vy: 0, onGround: false, act: null, hitT: 0, low: false, slideT: 0, skidT: 0, farT: 0, fell: false });
  for (let k = 0; k < 14; k++) bits.push({ x, y: y - 40, vx: (Math.random() - 0.5) * 360, vy: -Math.random() * 380, life: 0.6, color: "#fff7c2" });
}
function p2BesideDavid() { p2Place(david.x - david.facing * 60, david.y); p2.inv = P2.INV_T; }
function p2Join() {
  const r = p2Roster(); p2.on = true; p2.who = r[0]; p2BesideDavid(); p2.facing = david.facing;
  toast(`Player 2 is ${P2C().name}!` + (r.length > 1 ? " Select changes who you play." : ""));
}
function p2Switch() {
  const r = p2Roster(); if (r.length < 2) return;
  p2.who = r[(r.indexOf(p2.who) + 1) % r.length]; p2.act = null; p2.low = false; p2.slideT = 0;
  for (let k = 0; k < 16; k++) bits.push({ x: p2.x, y: p2.y - 50, vx: (Math.random() - 0.5) * 300, vy: -Math.random() * 360, life: 0.55, color: "#ffe6a0" });
  toast(`Player 2 is ${P2C().name}.`);
}

// ---------------------------------------------------------------------------
// the update (main.js frame, beside updateLamb)
// ---------------------------------------------------------------------------
function updateP2(dt) {
  if (WORLD !== 9) return;
  updateP2Stage(dt);
  if (!p2.on) { if (["left", "right", "up", "down", "a", "b", "x"].some(pressed2)) p2Join(); return; }
  if (pressed2("select")) p2Switch();
  if (david.deadT > 0 || inCutscene() || (typeof drill !== "undefined" && drill.on)) { p2.vx = 0; return; }   // (a drill: Player 2's hands are busy)
  const C = P2C(); p2.t += dt;
  p2.inv = Math.max(0, p2.inv - dt);
  // too far from David (left behind, run off ahead, or he went into a cave): back beside him
  const inCaveD = david.x >= MAIN_COLS * T, inCaveP = p2.x >= MAIN_COLS * T;
  if (inCaveD !== inCaveP || p2.fell || p2.y > ROWS * T + 200) { p2BesideDavid(); return; }
  if (Math.abs(p2.x - david.x) > W * P2.FAR || Math.abs(p2.y - david.y) > H * 0.8) { p2.farT += dt; if (p2.farT > P2.FAR_T) { p2BesideDavid(); return; } } else p2.farT = 0;

  const dir = (held2("right") ? 1 : 0) - (held2("left") ? 1 : 0);
  if (p2.hitT > 0) {   // knocked back
    p2.hitT -= dt; p2.vx *= 0.92;
  } else {
    // crouch / crawl (Down on the ground); Asahel's slide is Down while running
    const wantLow = held2("down") && p2.onGround && !p2.act;
    if (C.slideA && wantLow && Math.abs(p2.vx) > C.run * 0.8 && p2.slideT <= 0) p2.slideT = 0.55;
    const stuckLow = p2.low && !p2Headroom(C.h);
    p2.low = (wantLow || stuckLow || p2.slideT > 0) && !!(C.lowH);
    if (dir !== 0 && !p2.act) { p2.facing = dir; p2.holdT += dt; } else p2.holdT = 0;
    let target = dir * (p2.holdT > P2.RUN_DELAY ? (C.sprint && p2.holdT > 1.6 ? C.sprint : C.run) : C.walk);
    if (p2.low) target = dir * (C.crawl || 0);
    if (p2.act && p2.onGround) target = 0;
    if (p2.slideT > 0) { p2.slideT -= dt; target = p2.vx * 0.985; }
    const acc = p2.onGround ? (dir ? P2.ACCEL : P2.FRICTION) : P2.ACCEL * 0.6;
    if (p2.slideT > 0) p2.vx = target;
    else if (!p2.onGround && dir && Math.sign(p2.vx) === dir && Math.abs(p2.vx) > Math.abs(target)) { /* in the air: a running jump keeps its speed */ }
    else if (p2.vx < target) p2.vx = Math.min(target, p2.vx + acc * dt); else p2.vx = Math.max(target, p2.vx - acc * dt);
    // Asahel skids when he lets go at a sprint
    if (C.skidA && p2.onGround && !dir && Math.abs(p2.vx) > C.run * 0.9 && p2.skidT <= 0) p2.skidT = SPR[C.skidA].frames * 0.07;
    if (p2.skidT > 0) p2.skidT -= dt;
    // jump (A): a tap is a short hop; Asahel's running jump carries farther
    if (pressed2("a") && p2.onGround && !p2.low) {
      p2.vy = -C.jump; p2.onGround = false; sfx("jump", p2.x, 0.35, 1.15);
      if (C.longJump && Math.abs(p2.vx) > C.run * 0.8) p2.vx *= C.longJump;
    }
    if (!held2("a") && p2.vy < -C.jump * 0.45) p2.vy = -C.jump * 0.45;
    p2Moves(C, dt);
  }
  p2.vy = Math.min(TUNE.MAX_FALL, p2.vy + TUNE.GRAVITY * dt);
  const h = p2.low ? C.lowH : C.h, wasPush = p2.pushing;
  p2.pushing = false;
  if (C.strong && p2.onGround && dir && !p2.act) p2TryPush(dir, dt, C);
  else p2.pushT = 0;
  if (!p2.pushing && wasPush) p2.pushT = 0;
  collideBody(p2, C.w, h, dt);
  if (!C.strong) for (const k of pushRocks) {   // only Benaiah can move them (said once)
    if (!k.told && p2.onGround && dir && rockAt(Math.floor((p2.x + dir * (C.w / 2 + 4)) / T), Math.floor((p2.y - 20) / T)) === k) { k.told = true; toast("Too heavy. Benaiah could move it."); }
  }
  p2Hurts();
  p2Gather(C);   // anyone gathers the olives he walks over
}
function p2Headroom(h) {
  const C = P2C(), c0 = Math.floor((p2.x - C.w / 2 + 2) / T), c1 = Math.floor((p2.x + C.w / 2 - 2) / T);
  for (let c = c0; c <= c1; c++) for (let r = Math.floor((p2.y - h) / T); r <= Math.floor((p2.y - 1) / T); r++) if (isSolid(c, r)) return false;
  return true;
}
function p2TryPush(dir, dt, C) {
  const c = Math.floor((p2.x + dir * (C.w / 2 + 3)) / T), r = Math.floor((p2.y - 20) / T), k = rockAt(c, r);
  if (!k) { p2.pushT = 0; return; }
  p2.pushing = true; p2.pushT += dt;
  if (p2.pushT >= P2.PUSH_T) { p2.pushT = 0; if (!moveRock(k, dir) && !k.stuckTold) { k.stuckTold = true; } }
}

// B, Up + B, Down + B, X: the moves
function p2Moves(C, dt) {
  if (!p2.act && !p2.low) {
    let m = null;
    if (pressed2("x") && C.act2) m = C.act2;
    else if (pressed2("b")) m = held2("up") && C.actUp ? C.actUp : held2("down") && C.actDown ? C.actDown : Math.abs(p2.vx) > C.run * 0.7 && C.actRun ? C.actRun : C.act;
    if (m) { p2.act = { m, t: 0, done: false }; if (m.kind === "melee") sfx("sling_throw", p2.x, 0.4, m.heavy ? 0.6 : 0.9); }
  }
  if (!p2.act) return;
  const a = p2.act, m = a.m; a.t += dt;
  const u = a.t / m.time;
  if ((m.kind === "arrow" || m.kind === "javelin") && !a.done && u >= m.at) {
    a.done = true;
    // aimed ahead (not the high shot) with something small on the ground in front (a snake, a scorpion): it flies low and
    // level, as a kid would want
    const low = (m.ang || 0) > -0.3 && p2LowTarget(), ang = low ? 0 : m.ang || 0, y0 = low ? p2.y - 34 : p2.y - (m.kind === "arrow" ? 78 : 86);
    const sp = m.kind === "arrow" ? P2.ARROW_SPEED : P2.JAVELIN_SPEED;
    stones.push({ x: p2.x + p2.facing * 40, y: y0, vx: Math.cos(ang) * sp * p2.facing + p2.vx * 0.3, vy: Math.sin(ang) * sp,
      life: 1.6, p2: m.kind, grav: m.kind === "arrow" ? 0.35 : 0.6 });
    sfx(m.kind === "arrow" ? "arrow_single" : "sling_throw", p2.x, 0.5, m.kind === "arrow" ? 1 : 0.7);
  }
  if (m.kind === "melee" && u >= m.from && u <= m.to) {
    const k = (u - m.from) / (m.to - m.from), reach = m.reach[0] + (m.reach[1] - m.reach[0]) * Math.min(1, k * 1.6);
    const ex = p2.x + p2.facing * reach, ey = p2.y + m.y[0] + (m.y[1] - m.y[0]) * k;
    stones.push({ x: ex, y: ey, vx: p2.facing, vy: 0, life: 0.034, sword: true, p2: "melee", charged: !!m.heavy });
    if (m.heavy && !a.dust && k > 0.6) { a.dust = true; for (let n = 0; n < 14; n++) bits.push({ x: ex, y: p2.y - 4, vx: (Math.random() - 0.5) * 420, vy: -Math.random() * 380, life: 0.6, color: "#c9a86a" }); sfx("stone_hit", ex, 0.6, 0.5); }
    if (typeof patrols !== "undefined") for (const p of patrols) if (!p2.toldSpare && Math.abs(ex - p.x) < 50 && ey > p.y - 130 && ey < p.y) {
      p2.toldSpare = true; toast("We don't strike Saul's men. Hide from them instead.");
    }
  }
  if (m.kind === "gather" && !a.done && u > 0.4) { a.done = true; p2Gather(C, 70); }
  if (a.t >= m.time) p2.act = null;
}

function p2LowTarget() {
  const ahead = x => (x - p2.x) * p2.facing > 0 && Math.abs(x - p2.x) < 11 * T;
  for (const sn of snakes) if (!sn.gone && sn.kind !== "whip" && ahead(snakeMid(sn)) && Math.abs(sn.y - p2.y) < 40) return true;
  if (typeof critters !== "undefined") for (const k of critters) if (!k.gone && (k.kind === "scorpion" || k.kind === "rat" || k.kind === "hedgehog") && ahead(k.x) && Math.abs(k.y - p2.y) < 40) return true;
  return false;
}
// olives: anyone gathers what he walks over; the armor-bearer bending down (B) reaches farther
function p2Gather(C, reach = 26) {
  for (const o of olives) if (!o.taken && Math.abs(o.x - p2.x) < reach && o.y > p2.y - C.h - 10 && o.y < p2.y + 8) {
    o.taken = true;
    if (o.kind === "golden") { david.lives++; sfx("extra_life"); toast("A golden olive! +1 life"); }
    else { david.olives++; david.gathered++; sfx("olive_pickup", o.x, 0.45, 1.05); if (david.olives >= TUNE.OLIVES_PER_LIFE) { david.olives -= TUNE.OLIVES_PER_LIFE; david.lives++; sfx("extra_life"); } }
    for (let k = 0; k < 4; k++) bits.push({ x: o.x, y: o.y, vx: (Math.random() - 0.5) * 160, vy: -Math.random() * 220, life: 0.35, color: o.kind === "golden" ? "#ffd84a" : "#d7e6a0" });
  }
}

// animals that bite: a knock back, no heart lost
function p2Hurts() {
  if (p2.inv > 0 || p2.hitT > 0) return;
  const C = P2C(), x0 = p2.x - C.w / 2, x1 = p2.x + C.w / 2, y0 = p2.y - (p2.low ? C.lowH : C.h), y1 = p2.y;
  const hit = from => { p2.hitT = P2.HIT_T; p2.inv = P2.INV_T; p2.act = null; p2.vx = Math.sign(p2.x - from || -p2.facing) * P2.KNOCK; p2.vy = -420; p2.onGround = false; sfx("stone_hit", p2.x, 0.4, 0.7); };
  if (typeof critters !== "undefined") for (const k of critters) {
    if (k.gone || !CHASERS.has(k.kind)) continue;
    const b = critterBox(k);
    if (x1 > b.x0 && x0 < b.x1 && y1 > b.y0 && y0 < b.y1) { hit(k.x); return; }
  }
  for (const s of snakes) if (!s.gone && s.kind !== "whip" && Math.abs(snakeMid(s) - p2.x) < 34 && Math.abs(s.y - p2.y) < 30) { hit(snakeMid(s)); return; }
  if (typeof critters !== "undefined") for (const k of critters) if (!k.gone && k.kind === "scorpion") {
    const b = critterBox(k); if (x1 > b.x0 && x0 < b.x1 && y1 > b.y0 && y0 < b.y1) { hit(k.x); return; }
  }
}

// En-Gedi (engedi.js): Saul's men see Player 2 as they see David; crouched behind a rock hides him
function p2SeenBy(p) {
  if (!p2.on || WORLD !== 9 || cave.room || w9.caughtT > 0) return false;
  const dx = p2.x - p.x; if (Math.sign(dx) !== p.facing || Math.abs(p2.y - p.y) > 90) return false;
  if (p2.low && hides.some(hx => Math.abs(hx - p2.x) < W9.HIDE_NEAR)) return false;
  return Math.abs(dx) < (p2.low ? W9.SIGHT_LOW : W9.SIGHT);
}
// caves.js: the armor-bearer's lamp
function p2CaveLights() { return p2.on && P2C().lamp ? [[p2.x, p2.y - 50, P2C().lamp]] : []; }

// ---------------------------------------------------------------------------
// drawing (main.js, beside drawLamb)
// ---------------------------------------------------------------------------
function p2Sheet() {   // [sheet, frame]
  const C = P2C(), now = p2.t;
  if (p2.act) { const m = p2.act.m, n = SPR[m.sheet].frames; return [m.sheet, Math.min(n - 1, Math.floor(p2.act.t / m.time * n))]; }
  if (p2.hitT > 0 && C.hit) { const n = SPR[C.hit].frames; return [C.hit, Math.min(n - 1, Math.floor((1 - p2.hitT / P2.HIT_T) * n))]; }
  if (p2.slideT > 0) return [C.slideA, p2.slideT > 0.45 ? 1 : p2.slideT > 0.12 ? 3 : 4];
  if (!p2.onGround) {
    if (C.jumpA) { const n = SPR[C.jumpA].frames; return [C.jumpA, Math.max(1, Math.min(n - 2, Math.round((n - 1) / 2 + p2.vy / 1000 * (n / 3))))]; }
    return C.airFrame;
  }
  if (p2.low) {
    if (C.crawlA) return [C.crawlA, Math.abs(p2.vx) > 10 ? frameOf(C.crawlA, now) : 0];
    return C.crouch;
  }
  if (p2.pushing && C.pushA) return [C.pushA, frameOf(C.pushA, now)];
  if (p2.skidT > 0 && C.skidA) { const n = SPR[C.skidA].frames; return [C.skidA, Math.min(n - 1, Math.floor((1 - p2.skidT / (n * 0.07)) * n))]; }
  const sp = Math.abs(p2.vx);
  if (sp > (C.sprint ? C.run + 40 : 1e9) && C.sprintA) return [C.sprintA, frameOf(C.sprintA, now)];
  if (sp > (C.walk + C.run) / 2) return [C.runA, frameOf(C.runA, now)];
  if (sp > 15) return [C.walkA, frameOf(C.walkA, now * Math.max(0.6, sp / C.walk))];
  return [C.idle, frameOf(C.idle, now)];
}
function drawP2(camX) {
  if (!p2.on || WORLD !== 9) return;
  const [nm, i] = p2Sheet(); if (!SPR[nm]) return;
  const blink = p2.inv > 0 && Math.floor(performance.now() / 80) % 2;
  drawSprite(nm, i, p2.x - camX, p2.y, p2.facing, 1, blink ? 0.45 : 1);
  // a little "2" over his head, so a young player can find himself
  const C = P2C(), hx = p2.x - camX, hy = p2.y - (p2.low ? C.lowH : C.h) - 30;
  ctx.save(); ctx.fillStyle = "rgba(255,215,90,0.92)"; ctx.beginPath(); ctx.moveTo(hx - 9, hy); ctx.lineTo(hx + 9, hy); ctx.lineTo(hx, hy + 10); ctx.closePath(); ctx.fill();
  ctx.font = "bold 15px sans-serif"; ctx.textAlign = "center"; ctx.fillStyle = "#3a2a10"; ctx.fillText("2", hx, hy - 3); ctx.restore();
}
// arrows and javelins in flight (drawStones skips them: s.p2)
function drawP2Shots(camX) {
  for (const s of stones) {
    if (s.p2 !== "arrow" && s.p2 !== "javelin") continue;
    const ang = Math.atan2(s.vy, s.vx), x = s.x - camX;
    ctx.save(); ctx.translate(x, s.y);
    if (s.p2 === "arrow" && ITEM.jonathan_arrow && ITEM.jonathan_arrow.naturalWidth) {
      // Glen's arrow is drawn tilted up about 14 degrees, tip on the right: turned level, then along its flight
      const img = ITEM.jonathan_arrow, w = 92, h = img.naturalHeight * w / img.naturalWidth;
      if (s.vx < 0) { ctx.scale(-1, 1); ctx.rotate(Math.atan2(s.vy, -s.vx) + 0.244); } else ctx.rotate(ang + 0.244);
      ctx.drawImage(img, -w * 0.8, -h / 2, w, h);
    } else {   // the javelin: a light shaft and an iron head
      ctx.rotate(ang);
      ctx.strokeStyle = "#3a2410"; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(-96, 0); ctx.lineTo(20, 0); ctx.stroke();   // outline, so it reads small
      ctx.strokeStyle = "#a8743e"; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-95, 0); ctx.lineTo(20, 0); ctx.stroke();
      ctx.fillStyle = "#3a2410"; ctx.beginPath(); ctx.moveTo(16, -8); ctx.lineTo(44, 0); ctx.lineTo(16, 8); ctx.closePath(); ctx.fill();
      ctx.fillStyle = "#c9ccd2"; ctx.beginPath(); ctx.moveTo(18, -6); ctx.lineTo(40, 0); ctx.lineTo(18, 6); ctx.closePath(); ctx.fill();
    }
    ctx.restore();
  }
}

// key P: the one controller plays Player 2, the keyboard plays David (main.js pollInput reads p2Swap)
addEventListener("keydown", e => {
  if (e.code !== "KeyP" || WORLD !== 9 || e.repeat) return;
  p2Swap = !p2Swap;
  toast(p2Swap ? "The controller is Player 2 now. The keyboard plays David. (P to switch back)" : "The controller plays David again.");
});

// ---------------------------------------------------------------------------
// 9-3, the Training Ground: a word at each station (only while there's a Player 2), and the end card
// ---------------------------------------------------------------------------
const P2_STATIONS = LEVEL_NAME !== "9-3" ? [] : [
  [14, "A little tunnel! The armor-bearer can crawl in: hold Down."],
  [36, "Benaiah can push the boulder: walk into it. Under the high ledge, it makes a step."],
  [60, "Dead branches across the nook. Benaiah's smash (Up + B) breaks them."],
  [88, "Animals ahead! Abishai's spear, Jonathan's bow or Asahel's javelins (B) drive them off."],
  [116, "Asahel's running jump carries far."],
  [141, "Jonathan's high shot (Up + B) reaches the gourds."],
].map(([c, say]) => ({ x: c * T, say, done: false }));
const p2End = { x: (setPieces.find(p => p.kind === "p2end") || {}).x, card: null, told: false };
function updateP2Stage(dt) {
  if (LEVEL_NAME !== "9-3") return;
  if (!p2.on && !p2End.told && david.x > 3 * T) { p2End.told = true; toast("Player 2: press a button on the second controller (or the number pad). P hands this controller to Player 2."); }
  if (p2.on) for (const s of P2_STATIONS) if (!s.done && Math.max(david.x, p2.x) > s.x) { s.done = true; toast(s.say); }
  if (p2End.card) p2End.card.t += dt;
  else if (p2End.x && david.x > p2End.x) { p2End.card = { t: 0 }; sfx("stage_clear", undefined, 0.6); }
}
function p2HoldDavid(d, dt) {
  if (!p2End.card) return false;
  d.vx = 0; d.charging = false; d.throwT = -1;
  d.vy = Math.min(TUNE.MAX_FALL, d.vy + TUNE.GRAVITY * dt); collideBody(d, BODY_W, d.h, dt);
  if (d.state !== "idle") setState("idle");
  if (p2End.card.t > 2 && (pressed("a") || pressed2("a"))) location.reload();
  return true;
}
function drawP2Over() {
  const e = p2End.card; if (!e) return;
  const a = Math.min(1, e.t / 1.2);
  ctx.save(); ctx.globalAlpha = a * 0.88; ctx.fillStyle = "#0d0a08"; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = a;
  ctx.textAlign = "center"; ctx.fillStyle = "#f3e6c8";
  ctx.font = "bold 46px Georgia, serif"; ctx.fillText("The Training Ground", W / 2, 230);
  ctx.font = "22px sans-serif"; ctx.fillText("David, Part Two: the Player 2 test. Thanks for playing!", W / 2, 330);
  ctx.font = "20px sans-serif"; ctx.fillStyle = "#cdb98f";
  ctx.fillText(`Olives gathered: ${david.gathered || 0}`, W / 2, 380);
  if (e.t > 2) { ctx.font = "22px sans-serif"; ctx.fillStyle = "#ffd76a"; ctx.fillText("A: play again", W / 2, 520); }
  ctx.restore();
}
