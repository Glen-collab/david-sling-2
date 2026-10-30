// Part Two test stage 9-1: En-Gedi, the rocks of the wild goats (1 Samuel 24). DESIGN.md, World 5.
// - The sword (X): a quick slash. Its edge reuses the stones' hit checks (a stone that isn't drawn, alive one frame).
// - The shield (Y, held): David stands behind it. (Nothing shoots here yet.)
// - Saul's men walk the shelves. David never strikes them (the sword passes them by): crouch behind a rock while one
//   looks your way, and go when his back is turned. Seen standing in front of one: back to the last campfire.
// - The cave by the sheep pens: David's men in the innermost part, Saul comes in, David creeps up behind him and the
//   sword only cuts the corner of his robe (24:4-7). Then out at the cave mouth: "My lord the king!" (24:8-17).
// Scripture: the World English Bible, checked on ebible.org 2026-10-26; "the LORD" where the WEB says "Yahweh".

const W9 = {
  SWORD_TIME: 0.33,              // the whole slash, seconds (Glen: fast)
  SWORD_HIT: [0.08, 0.24],       // when the edge can hit
  SWORD_REACH: [34, 84],         // how far in front of him the edge sweeps, px
  PATROL_WALK: 62,               // Saul's men's walking speed, px/s
  PATROL_WAIT: 1.8,              // how long one stands and looks at each end of his walk
  LOOK_UP: 1.0,                  // ...his hand comes up to shade his eyes this fast (Glen's look clip), and goes down again at the end
  TURN_T: 0.8,                   // then he turns around (the first half of Glen's turn clip)
  SIGHT: 7 * 36,                 // how far a soldier sees a standing David, px
  SIGHT_LOW: 2.2 * 36,           // ...and a crouching one
  HIDE_NEAR: 2.4 * 36,           // crouched this close to a rock (the soldier on its far side): hidden (the boulders are ~4 tiles wide)
  SEEN_T: 0.55,                  // the "!" before he calls out
  CAUGHT_FADE: 1.1,
  SAUL_HEAR: 7 * 36,             // in the cave: walking upright this close to Saul, he stirs
  CUT_REACH: 95,                 // the sword reaches his robe from this close behind him
};

// ---------------------------------------------------------------------------
// the sword and the shield
// ---------------------------------------------------------------------------
function updateSword(d, dt, busy) {
  if (d.swordT === undefined) d.swordT = -1;
  d.shield = held("y") && d.onGround && !busy && d.swordT < 0 && d.throwT < 0;
  if (d.shield) d.vx = 0;
  if (pressed("x") && d.swordT < 0 && !busy && !d.harp && d.throwT < 0 && !d.shield) {
    d.swordT = 0; d.swordHit = false; sfx("swing", undefined, 0.7, 1.1);
    if (caveSaul() && caveSaulReach(d)) { cutRobe(); return; }
  }
  if (d.swordT < 0) return;
  d.swordT += dt;
  const k = d.swordT;
  if (k > W9.SWORD_HIT[0] && k < W9.SWORD_HIT[1]) {
    const u = (k - W9.SWORD_HIT[0]) / (W9.SWORD_HIT[1] - W9.SWORD_HIT[0]);
    const reach = W9.SWORD_REACH[0] + (W9.SWORD_REACH[1] - W9.SWORD_REACH[0]) * Math.min(1, u * 1.6);
    const ex = d.x + d.facing * reach, ey = d.y - 110 + 90 * u;   // over his head and down in front
    stones.push({ x: ex, y: ey, vx: d.facing, vy: 0, life: 0.034, sword: true });
    for (const p of patrols) if (!w9.toldSpare && Math.abs(ex - p.x) < 40 && ey > p.y - 130 && ey < p.y) {
      w9.toldSpare = true; toast("David won't strike Saul's men. Hide from them instead.");
    }
  }
  if (d.swordT >= W9.SWORD_TIME) d.swordT = -1;
}

// drawn instead of the usual legs: mid-slash, behind the shield, or a pose a scene asks for
function drawSwordDavid(d, x, y) {
  if (w9.pose) { const p = w9.pose; drawSprite(p.name, p.frame !== undefined ? p.frame : frameOf(p.name, d.t), x, y, p.facing || d.facing); return true; }
  if (d.swordT >= 0) { drawSprite("david_sword_slash", Math.min(5, Math.floor(d.swordT / W9.SWORD_TIME * 6)), x, y, d.facing); return true; }
  if (d.shield) { drawSprite("david_shield_block", frameOf("david_shield_block", d.t), x, y, d.facing); return true; }
  return false;
}

// ---------------------------------------------------------------------------
// the hiding rocks and Saul's men
// ---------------------------------------------------------------------------
const w9 = { script: [], wait: 0, pose: null, caughtT: 0, toldSpare: false, toldSoldier: false, cave: null, saul: null, end: null };
const hides = setPieces.filter(p => p.kind === "hide").map(p => p.x);
for (const p of setPieces) if (p.kind === "hide") deco("boulder_tan", p.c, GR - 1, 0.34, "front");   // in front of David: he crouches behind it
const patrols = setPieces.filter(p => p.kind === "patrol").map(p => ({
  home: p.x, x: p.x, y: GR * T, from: p.from * T, to: p.to * T, facing: 1, state: "walk", t: 0, wait: p.wait || W9.PATROL_WAIT, seen: 0,
}));

function davidHidden(p) {   // crouched right behind a rock that stands between him and the soldier
  const d = david;
  if (d.h !== LOW_H) return false;
  return hides.some(hx => Math.abs(hx - d.x) < W9.HIDE_NEAR && Math.sign(hx - d.x) === Math.sign(p.x - d.x));
}
function sees(p) {
  const d = david, dx = d.x - p.x;
  if (cave.room || d.deadT > 0 || w9.caughtT > 0 || Math.sign(dx) !== p.facing || Math.abs(d.y - p.y) > 90) return false;
  if (davidHidden(p)) return false;
  return Math.abs(dx) < (d.h === LOW_H ? W9.SIGHT_LOW : W9.SIGHT);
}
function updatePatrols(dt) {
  for (const p of patrols) {
    p.t += dt;
    if (p.state === "walk") {
      p.x += p.facing * W9.PATROL_WALK * dt;
      if ((p.facing > 0 && p.x >= p.to) || (p.facing < 0 && p.x <= p.from)) { p.x = Math.max(p.from, Math.min(p.to, p.x)); p.state = "look"; p.t = 0; }
    } else if (p.state === "look" && p.t > p.wait) { p.state = "turn"; p.t = 0; }
    else if (p.state === "turn" && p.t > W9.TURN_T) { p.facing *= -1; p.state = "walk"; p.t = 0; }
    if (!w9.toldSoldier && Math.abs(david.x - p.x) < 11 * T && !cave.room) {
      w9.toldSoldier = true;
      toast("One of Saul's men! Crouch behind a rock (hold Down) while he looks your way. Go when his back is turned.");
    }
    if (sees(p)) { p.seen += dt; if (p.seen > W9.SEEN_T) caught(p); } else p.seen = Math.max(0, p.seen - dt * 2);
  }
}
function caught(p) {
  w9.caughtT = W9.CAUGHT_FADE; p.seen = 0; david.vx = 0;
  toast("He saw you! Back to the campfire. Crouch behind a rock while he looks your way.");
}
function drawPatrols(camX) {
  for (const p of patrols) {
    const x = p.x - camX; if (x < -300 || x > W + 300) continue;
    // where he's looking: a soft wedge of sight (a help for little players)
    const reach = W9.SIGHT, alert = p.seen > 0;
    const col = alert ? "255,70,40" : "255,214,90";
    const g = ctx.createLinearGradient(x, 0, x + p.facing * reach, 0);
    g.addColorStop(0, `rgba(${col},0.5)`); g.addColorStop(1, `rgba(${col},0.08)`);
    ctx.save(); ctx.fillStyle = g; ctx.strokeStyle = "rgba(255,255,255,0.85)"; ctx.lineWidth = 3; ctx.setLineDash([12, 9]);
    ctx.beginPath(); ctx.moveTo(x + p.facing * 20, p.y - 112); ctx.lineTo(x + p.facing * reach, p.y - 150); ctx.lineTo(x + p.facing * reach, p.y); ctx.lineTo(x + p.facing * 20, p.y - 70); ctx.closePath(); ctx.fill();
    ctx.beginPath(); ctx.moveTo(x + p.facing * 20, p.y - 112); ctx.lineTo(x + p.facing * reach, p.y - 150); ctx.moveTo(x + p.facing * 20, p.y - 70); ctx.lineTo(x + p.facing * reach, p.y); ctx.stroke(); ctx.restore();
    drawSoldier(p, x);
    if (alert) { ctx.fillStyle = "#ffdc4a"; ctx.font = "bold 40px sans-serif"; ctx.textAlign = "center"; ctx.fillText("!", x, p.y - 150); ctx.textAlign = "left"; }
  }
}

// Glen's soldier clips (2026-10-29): walk; stop and shade his eyes (the hand comes down again by playing it backwards);
// half of the turn; and the shout when he spots David, timed to the "!" (it plays back down if David hides in time)
function drawSoldier(p, x) {
  const last = n => SPR[n].frames - 1;
  if (p.seen > 0) { const n = "saul_soldier_alert"; drawSprite(n, Math.min(last(n), Math.floor(p.seen / W9.SEEN_T * SPR[n].frames)), x, p.y, p.facing); return; }
  if (p.state === "walk") { drawSprite("saul_soldier_walk", frameOf("saul_soldier_walk", p.t), x, p.y, p.facing); return; }
  if (p.state === "turn") { const n = "saul_soldier_turn"; drawSprite(n, Math.min(last(n), Math.floor(p.t / W9.TURN_T * SPR[n].frames)), x, p.y, p.facing); return; }
  const n = "saul_soldier_look", m = last(n), down = Math.min(W9.LOOK_UP * 0.6, p.wait / 3);
  const k = p.t < W9.LOOK_UP ? p.t / W9.LOOK_UP : p.t > p.wait - down ? Math.max(0, (p.wait - p.t) / down) : 1;
  drawSprite(n, Math.min(m, Math.floor(k * m + 0.5)), x, p.y, p.facing);
}

// ---------------------------------------------------------------------------
// scenes: lines one after another (A for each), the controls held while they play
// ---------------------------------------------------------------------------
function play(steps) { w9.script.push(...steps); }
function updateScript(dt) {
  if (dialog.t > 0 && dialog.hold) return;
  if (w9.wait > 0) { w9.wait -= dt; return; }
  const s = w9.script.shift(); if (!s) return;
  if (s.fn) s.fn();
  if (s.say) sayLine(s.say[0], s.say[1]);
  if (s.wait) w9.wait = s.wait;
}
function w9HoldDavid(d, dt) {
  if (WORLD !== 9) return false;
  if (w9.script.length || w9.wait > 0 || w9.caughtT > 0 || w9.end) {
    d.vx = 0; d.swordT = -1; d.shield = false; d.charging = false; d.throwT = -1;
    d.vy = Math.min(TUNE.MAX_FALL, d.vy + TUNE.GRAVITY * dt); collideBody(d, BODY_W, d.h, dt);
    if (d.state !== "idle" && !w9.pose) setState("idle");
    return true;
  }
  return false;
}

// ---------------------------------------------------------------------------
// the cave by the sheep pens
// ---------------------------------------------------------------------------
const CAVE9 = setPieces.find(p => p.kind === "cave9");
if (CAVE9) w9.cave = { c0: CAVE9.c, w: CAVE9.w, step: "enter" };   // enter > hiding > saul > cut > out > done
const caveSaul = () => w9.saul && w9.saul.on && !w9.saul.leaving;
function caveSaulReach(d) { const s = w9.saul; return d.x > s.x && d.x - s.x < W9.CUT_REACH && d.facing < 0; }
function inThisCave() { return w9.cave && cave.room && cave.room.c0 === w9.cave.c0; }

function updateCave9(dt) {
  const C = w9.cave; if (!C || !inThisCave() || w9.script.length || w9.wait > 0) return;
  const d = david, back = (C.c0 + C.w - 9) * T;
  if (C.step === "enter" && d.x > back) {
    C.step = "saul";
    play([
      { say: ["", "Now David and his men were staying in the innermost parts of the cave. (1 Samuel 24:3)"] },
      { fn() { w9.saul = { on: true, x: (C.c0 + 9) * T, y: GR * T, alpha: 0, t: 0 }; }, wait: 1.4 },
      { say: ["", "Saul came into the cave, alone. He didn't see them in the dark."] },
      { say: ["David's men", "“Behold, the day of which the LORD said to you, ‘Behold, I will deliver your enemy into your hand, and you shall do to him as it shall seem good to you.’” (1 Samuel 24:4)"] },
      { fn() { toast("Creep up behind Saul (hold Down). The sword (X) can only cut the corner of his robe."); } },
    ]);
  }
  if (caveSaul()) {
    const s = w9.saul;
    const loud = d.h !== LOW_H && Math.abs(d.vx) > 25 && d.x - s.x < W9.SAUL_HEAR;
    if (loud || d.x < s.x - 20) {   // walking upright close by, or in front of him where he'd see
      play([
        { say: ["", "Saul stirs... David slips back into the dark. (Creep low: hold Down.)"] },
        { fn() { d.x = back + 2 * T; d.facing = -1; snapCamera(); } },
      ]);
    }
    if (pressed("b")) toast("Not at the king.");
  }
}
function cutRobe() {
  const s = w9.saul; w9.cave.step = "cut"; s.cut = true; sfx("paper_rip", undefined, 0.5, 0.8);
  david.x = s.x + 74; david.facing = -1;   // just behind him, not in his robe
  play([
    { fn() { w9.pose = { name: "david_kneel_hold", facing: -1 }; }, wait: 0.9 },
    { say: ["", "Then David arose and cut off the skirt of Saul’s robe secretly. Afterward, David’s heart struck him because he had cut off Saul’s skirt. (1 Samuel 24:4-5)"] },
    { fn() { w9.pose = null; david.facing = 1; } },
    { say: ["David", "“The LORD forbid that I should do this thing to my lord, the LORD’s anointed, to stretch out my hand against him, since he is the LORD’s anointed.” (1 Samuel 24:6)"] },
    { say: ["", "So David checked his men with these words, and didn’t allow them to rise against Saul. Saul rose up out of the cave, and went on his way. (1 Samuel 24:7)"] },
    { fn() { s.leaving = true; }, wait: 1.2 },
    { fn() { s.on = false; w9.cave.step = "out"; toast("Follow Saul out of the cave (Up at the daylight)."); } },
  ]);
}
// out at the cave mouth: David calls after the king
function updateMouth9() {
  const C = w9.cave; if (!C || C.step !== "out" || cave.room || david.state === "cave" || w9.script.length) return;
  C.step = "done";
  const d = david, door = doors.find(o => o.room && o.room.c0 === C.c0);
  w9.saul = { on: true, outside: true, x: door.x - 7 * T, y: GR * T, alpha: 1, t: 0, facing: 1 };
  d.facing = -1;
  play([
    { say: ["David", "“My lord the king!” (1 Samuel 24:8)"] },
    { fn() { w9.saul.facing = -1; w9.pose = { name: "david_kneel_hold", facing: -1 }; } },   // he looks back
    { say: ["", "When Saul looked behind him, David bowed with his face to the earth, and showed respect. (1 Samuel 24:8)"] },
    { fn() { w9.pose = null; d.facing = -1; w9.showCorner = true; } },
    { say: ["David", "“...see the skirt of your robe in my hand; for in that I cut off the skirt of your robe and didn’t kill you, know and see that there is neither evil nor disobedience in my hand.” (1 Samuel 24:11)"] },
    { say: ["David", "“May the LORD judge between me and you, and may the LORD avenge me of you; but my hand will not be on you.” (1 Samuel 24:12)"] },
    { say: ["Saul", "“Is that your voice, my son David?” (1 Samuel 24:16)"] },
    { say: ["", "Saul lifted up his voice and wept. (1 Samuel 24:16)"] },
    { say: ["Saul", "“You are more righteous than I; for you have done good to me, whereas I have done evil to you.” (1 Samuel 24:17)"] },
    { fn() { w9.end = { t: 0 }; } },
  ]);
}
function drawCave9(camX) {
  const C = w9.cave; if (!C) return;
  if (inThisCave()) {   // David's men, in the innermost part
    const bx = (C.c0 + C.w - 4) * T - camX;
    drawSprite("soldier_sit", frameOf("soldier_sit", performance.now() / 1000), bx, GR * T, -1, 0.95, 1, "brightness(0.75)");
    drawSprite("guard_big_idle", frameOf("guard_big_idle", performance.now() / 1000), bx + 70, GR * T, -1, 0.8, 1, "brightness(0.7)");
    drawSprite("soldier_sit", 1, bx - 90, GR * T, -1, 0.9, 1, "brightness(0.65)");
  }
  const s = w9.saul;
  if (s && s.on && (s.outside ? !cave.room : inThisCave())) {
    s.t += 1 / 60;
    if (s.leaving) s.alpha = Math.max(0, s.alpha - 1 / 70); else s.alpha = Math.min(1, s.alpha + 1 / 50);
    const x = s.x - camX;
    drawSprite("saul_sad", frameOf("saul_sad", s.t), x, s.y, s.facing || 1, 0.9, s.alpha);   // (his sheet faces left: 1 = his back to the cave's depths)
    if (s.cut) {   // the missing corner of his robe
      ctx.save(); ctx.globalAlpha = s.alpha; ctx.fillStyle = "#1a1210";
      const fx = x + (s.facing || 1) * 26;
      ctx.beginPath(); ctx.moveTo(fx, s.y - 2); ctx.lineTo(fx + (s.facing || 1) * 26, s.y - 2); ctx.lineTo(fx + (s.facing || 1) * 26, s.y - 34); ctx.closePath(); ctx.fill(); ctx.restore();
    }
  }
  if (w9.showCorner && !cave.room) {   // the corner of the robe, held up
    const d = david, hx = d.x - camX + d.facing * 22, hy = d.y - 92;   // in his hand, at his side
    ctx.save(); ctx.fillStyle = "#9a1f2e"; ctx.strokeStyle = "#5a0f18"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(hx, hy); ctx.lineTo(hx + d.facing * 30, hy + 6); ctx.lineTo(hx + d.facing * 8, hy + 34); ctx.closePath(); ctx.fill(); ctx.stroke(); ctx.restore();
  }
}

// ---------------------------------------------------------------------------
// the end card
// ---------------------------------------------------------------------------
function drawEnd9() {
  const e = w9.end; if (!e) return;
  e.t += 1 / 60;
  const a = Math.min(1, e.t / 1.2);
  ctx.save(); ctx.globalAlpha = a * 0.88; ctx.fillStyle = "#0d0a08"; ctx.fillRect(0, 0, W, H); ctx.globalAlpha = a;
  ctx.textAlign = "center"; ctx.fillStyle = "#f3e6c8";
  ctx.font = "bold 46px Georgia, serif"; ctx.fillText("En-Gedi", W / 2, 190);
  ctx.font = "italic 26px Georgia, serif";
  const lines = ["They have prepared a net for my steps. My soul is bowed down.", "They dig a pit before me. They fall into the middle of it themselves."];
  lines.forEach((l, i) => ctx.fillText(l, W / 2, 290 + i * 40));
  ctx.font = "20px Georgia, serif"; ctx.fillStyle = "#cdb98f"; ctx.fillText("Psalm 57:6", W / 2, 390);
  ctx.font = "22px sans-serif"; ctx.fillStyle = "#f3e6c8"; ctx.fillText("David, Part Two: the En-Gedi test. Thanks for playing!", W / 2, 500);
  if (e.t > 2) { ctx.fillStyle = "#ffd76a"; ctx.fillText("A: play again", W / 2, 560); }
  ctx.restore();
}

// ---------------------------------------------------------------------------
// hooks (main.js)
// ---------------------------------------------------------------------------
function updateWorld9(dt) {
  if (WORLD !== 9) return;
  updateScript(dt);
  if (w9.caughtT > 0) {
    const before = w9.caughtT; w9.caughtT -= dt;
    if (before > W9.CAUGHT_FADE / 2 && w9.caughtT <= W9.CAUGHT_FADE / 2) {   // in the dark of the fade: back at the campfire
      const d = david; d.x = checkpoint.x; d.y = checkpoint.y; d.vx = d.vy = 0; d.inv = 1; setState("idle"); snapCamera();
      for (const p of patrols) Object.assign(p, { x: p.home, facing: 1, state: "walk", t: 0, seen: 0 });
    }
  }
  updatePatrols(dt);
  updateCave9(dt);
  updateMouth9();
  if (w9.end && w9.end.t > 2 && pressed("a")) location.reload();
}
function drawWorld9(camX) {
  if (WORLD !== 9) return;
  drawPatrols(camX);
  drawCave9(camX);
}
function drawWorld9Over(camX) {
  if (WORLD !== 9) return;
  if (w9.caughtT > 0) { const k = 1 - Math.abs(w9.caughtT - W9.CAUGHT_FADE / 2) / (W9.CAUGHT_FADE / 2); ctx.fillStyle = `rgba(0,0,0,${k})`; ctx.fillRect(0, 0, W, H); }
  drawEnd9();
}
