// (Glen 11-12) the road animals, from his green-screen clips (tools/cut_w3_animals.py, art in david-sling-2-art/w3/animals).
// They're region beasts (region.js: region.beasts; updateBeasts / drawBeasts / stoneHitsRegion hand them over here).
//   viper    coiled in the road; strikes when he comes near in front of it
//   ostrich  paces; sees him and charges, runs on past, comes again (Job 39:18). Two hits: it runs off
//   wildass  grazes along; come too close and it turns and kicks with both back legs (Job 39:5-8). Two hits: it runs off
//   caracal  prowls; pounces at him in a long leap
//   ibex     too tough for a stone: it charges across, head down. Jump over it
//   locusts, flies   a swarm that drifts after him; one hit and it breaks up (Gath: Baal-zebub's flies, 2 Kings 1:2)
//   partridge, hyrax, hoopoe   shy: they run off when he comes near (nothing to fight)
// Stork and owl are birds (region.js BIRD: they perch, then fly at him like the crows).
// Box: [x0, x1, h] in sheet pixels (facing right; David is 240 tall in the sheets), turned into the game's by SCALE * k.
const WILD = {
  viper:     { idle: "viper_coil", act: "viper_strike", k: 1.5, hp: 1, near: 230, box: [-150, 60, 40], reach: 250, actFrames: [2, 7] },
  ostrich:   { idle: "ostrich_walk", run: "ostrich_run", k: 0.85, hp: 2, walk: 55, speed: 470, near: 520, box: [-60, 70, 260], runFor: 2.4 },
  wildass:   { idle: "wildass_walk", act: "wildass_kick", k: 0.8, hp: 2, walk: 40, near: 200, box: [-110, 110, 180], kick: [-260, -40], actFrames: [3, 7], fleeSheet: "wildass_walk" },
  caracal:   { idle: "caracal_walk", run: "caracal_run", k: 1, hp: 1, walk: 60, speed: 380, near: 380, box: [-80, 80, 100], leap: 640, runFor: 1.6 },
  ibex:      { idle: "ibex_walk", run: "ibex_run", k: 0.85, tough: true, walk: 40, speed: 520, near: 560, box: [-100, 100, 170], runFor: 3 },
  locusts:   { idle: "locusts_fly", die: "locusts_scatter", k: 1, hp: 1, swarm: true, speed: 85, box: [-160, 160, 70] },
  flies:     { idle: "flies_fly", die: "flies_scatter", k: 1.15, hp: 1, swarm: true, speed: 95, box: [-140, 140, 80] },
  partridge: { idle: "partridge_idle", run: "partridge_run", k: 1, shy: true, speed: 330, near: 210,
               tell: "A partridge! Saul hunted David “as when one hunts a partridge in the mountains.” (1 Samuel 26:20)" },
  hyrax:     { idle: "hyrax_walk", run: "hyrax_walk", k: 1, shy: true, walk: 22, speed: 280, near: 190,
               tell: "Rock hyraxes! “The hyraxes are but a feeble folk, yet make they their houses in the rocks.” (Proverbs 30:26)" },
  hoopoe:    { idle: "hoopoe_walk", run: "hoopoe_walk", k: 1, shy: true, walk: 18, speed: 260, near: 180 },
};
const WILD_TUNE = { HIT_COOL: 0.3, FLASH: 0.25, REST: 1.4, FLEE: 1.5, LEASH: 16, GRAV: 2200, SWARM_LEASH: 520, AHEAD: 40, SWARM_HURT: 0.8 };
// a road animal: kind, room, column; o.range: tiles it paces either side of home; o.y: the floor (px) or, for a swarm,
//  the height it hovers at
const rWild = (kind, room, c, o = {}) => beast(kind, room, c, Object.assign({ range: (o.range || 3) * T, state: "idle", hp: WILD[kind].hp || 1, alpha: 1,
  facing: o.facing || -1 }, o.y != null ? { y: o.y, hy: o.y } : {}, kind === "locusts" || kind === "flies" ? { y: o.y || GR * T - 70, hy: o.y || GR * T - 70 } : {}));
const wildSc = W_ => SCALE * W_.k;
function wildBox(b) {
  const W_ = WILD[b.kind], s = wildSc(W_), f = b.facing;
  let [a, z, h] = W_.box;
  if (b.state === "act" && W_.reach) { const i = frameOf(W_.act, b.t); if (i >= W_.actFrames[0] && i <= W_.actFrames[1]) z = W_.reach; }
  const x0 = b.x + (f > 0 ? a : -z) * s, x1 = b.x + (f > 0 ? z : -a) * s;
  if (W_.swarm) return { x0, x1, y0: b.y - h * s / 2, y1: b.y + h * s / 2 };
  return { x0, x1, y0: b.y - h * s, y1: b.y };
}
function wildKickBox(b) {   // the wild ass's back legs, behind it, while they're out
  const W_ = WILD[b.kind], s = wildSc(W_), i = frameOf(W_.act, b.t);
  if (!(i >= W_.actFrames[0] && i <= W_.actFrames[1])) return null;
  const [a, z] = W_.kick, f = b.facing;
  return { x0: b.x + (f > 0 ? a : -z) * s, x1: b.x + (f > 0 ? z : -a) * s, y0: b.y - 120 * s, y1: b.y };
}
const wildDur = n => SPR[n] ? SPR[n].frames * SPR[n].ms / 1000 : 1;
function updateWild(b, dt, r) {
  const W_ = WILD[b.kind], d = david, dx = d.x - b.x, dy = d.y - b.y, Tn = WILD_TUNE;
  b.flash = Math.max(0, (b.flash || 0) - dt);
  if (b.dead) return;
  const lo = b.hx - b.range, hi = b.hx + b.range, far = Tn.LEASH * T;
  const pace = () => { if (!W_.walk) return; b.x += b.facing * W_.walk * (b.x < lo || b.x > hi ? 2 : 1) * dt; if (b.x < lo) b.facing = 1; else if (b.x > hi) b.facing = -1; };   // (off its patch after a charge: it walks back)
  if (b.state === "flee") {   // running off, fading
    b.x += b.facing * (W_.speed || 300) * (W_.shy ? 1 : 1.2) * dt; b.alpha = Math.max(0, 1 - b.t / Tn.FLEE);
    if (b.t > Tn.FLEE) { b.dead = true; b.gone = true; }
    return;
  }
  if (W_.shy) {
    pace();
    if (Math.abs(dx) < W_.near && Math.abs(dy) < 160) { b.state = "flee"; b.t = 0; b.facing = dx > 0 ? -1 : 1; if (W_.tell && typeof toast === "function" && !wildTold[b.kind]) { wildTold[b.kind] = true; toast(W_.tell); } }
    return;
  }
  if (W_.swarm) {   // drifts after him (not too far from home), bobbing
    const tx = Math.max(b.hx - Tn.SWARM_LEASH, Math.min(b.hx + Tn.SWARM_LEASH, Math.abs(dx) < 700 ? d.x : b.hx)), ty = Math.abs(dx) < 700 ? d.y - 50 : b.hy;
    const vx = Math.sign(tx - b.x) * Math.min(W_.speed, Math.abs(tx - b.x) * 2);
    b.x += vx * dt; b.y += (ty + Math.sin(b.t * 2.2) * 18 - b.y) * Math.min(1, dt * 0.9);
    if (Math.abs(vx) > 5) b.facing = Math.sign(vx);
    if (b.cool <= 0 && touchesDavid(wildBox(b))) { hurtDavid(b.x); b.cool = Tn.SWARM_HURT; }
    return;
  }
  if (b.kind === "viper") {
    if (b.state === "idle") {
      if (Math.abs(dx) < W_.near * 1.6) b.facing = dx > 0 ? 1 : -1;
      if (b.cool <= 0 && Math.abs(dx) < W_.near && Math.abs(dy) < 90) { b.state = "act"; b.t = 0; }
    } else if (b.t > wildDur(W_.act)) { b.state = "idle"; b.t = 0; b.cool = 1.1; }
    if (touchesDavid(wildBox(b))) hurtDavid(b.x);
    return;
  }
  if (b.kind === "wildass") {
    if (b.state === "idle") { pace(); if (b.cool <= 0 && Math.abs(dx) < W_.near && Math.abs(dy) < 100) { b.state = "act"; b.t = 0; b.facing = dx > 0 ? -1 : 1; } }   // (turns its back on him)
    else { const q = wildKickBox(b); if (q && touchesDavid(q)) hurtDavid(b.x); if (b.t > wildDur(W_.act)) { b.state = "idle"; b.t = 0; b.cool = 1.2; } }
    return;
  }
  // the chargers: ostrich, caracal, ibex
  if (b.state === "idle") {
    pace();
    if (b.cool <= 0 && Math.abs(dx) < W_.near && Math.abs(dy) < 150) {
      b.state = "run"; b.t = 0; b.facing = dx > 0 ? 1 : -1;
      if (W_.leap) { b.vy = -W_.leap; b.air = true; }
    }
  } else if (b.state === "run") {
    const nx = b.x + b.facing * W_.speed * dt, ac = Math.floor((nx + b.facing * Tn.AHEAD) / T), rr = Math.floor(b.hy / T);
    const open = Math.abs(nx - b.hx) < far && (isSolid(ac, rr) || isOneway(ac, rr)) && !isSolid(ac, rr - 1);   // (ground ahead, no wall: never into a pit or through the tower)
    if (open || b.air) b.x = nx;
    if (b.air) { b.vy += Tn.GRAV * dt; b.y += b.vy * dt; if (b.y >= b.hy) { b.y = b.hy; b.air = false; b.vy = 0; } }
    const past = b.facing > 0 ? b.x - d.x : d.x - b.x;
    if (!b.air && (b.t > W_.runFor || past > 320 || !open)) { b.state = "idle"; b.t = 0; b.cool = Tn.REST; b.facing *= -1; }
  }
  if (b.state === "run" && touchesDavid(wildBox(b))) hurtDavid(b.x);
}
const wildTold = {};
// a stone or the sword's edge: true if it hit
function wildHit(b, s) {
  const W_ = WILD[b.kind]; if (b.dead || b.state === "flee" || W_.shy) return false;
  const q = wildBox(b);
  if (!(s.x > q.x0 - 8 && s.x < q.x1 + 8 && s.y > q.y0 - 8 && s.y < q.y1 + 8)) return false;
  if (b.cool > 0 && s.sword) return true;
  if (W_.tough) { if (!wildTold.ibex) { wildTold.ibex = true; toast("The ibex is too tough for that. Jump over it!"); } if (typeof stoneHit === "function" && !s.sword) stoneHit(s, 0.3); b.cool = 0.3; return true; }
  b.cool = s.sword ? WILD_TUNE.HIT_COOL : 0.05; b.flash = WILD_TUNE.FLASH;
  b.hp -= s.charged || s.power ? 9 : 1;
  if (typeof stoneHit === "function" && !s.sword) stoneHit(s, 0.6);
  if (b.hp <= 0) {
    if (W_.swarm) { b.dead = true; b.state = "scatter"; b.t = 0; }
    else if (W_.hp > 1) { b.state = "flee"; b.t = 0; b.facing = s.x < b.x ? 1 : -1; }
    else { b.dead = true; b.gone = true;
      const col = b.kind === "viper" ? ["#c9a66b", "#8a6a3a"] : ["#b9763a", "#5a3a1e"];
      for (let i = 0; i < 10; i++) bits.push({ x: b.x, y: b.y - 20, vx: (Math.random() - 0.5) * 260, vy: -Math.random() * 260, life: 0.9, color: col[i % 2] }); }
  }
  return true;
}
function drawWild(b, x) {
  const W_ = WILD[b.kind], k = W_.k;
  if (b.dead) {
    if (b.state === "scatter" && W_.die && b.t < wildDur(W_.die)) drawSprite(W_.die, frameOf(W_.die, b.t), x, b.y, b.facing, k, Math.max(0, 1 - b.t / wildDur(W_.die)));
    return;
  }
  const n = b.state === "act" ? W_.act : (b.state === "run" || b.state === "flee") ? (W_.run || W_.fleeSheet || W_.idle) : W_.idle;
  // (standing still, a walk sheet would walk on the spot: the shy ones and the viper only loop when moving or idle by design)
  const f = b.kind === "viper" && b.state === "idle" ? 0 : frameOf(n, b.t);   // (Glen 11-12: the coiled viper lies still; it moves when it strikes)
  drawSprite(n, f, x, b.y, b.facing, k, b.alpha == null ? 1 : b.alpha, b.flash > 0 ? "brightness(2.2)" : "");
}
