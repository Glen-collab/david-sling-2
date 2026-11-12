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
  wildass:   { idle: "wildass_walk", act: "wildass_kick", k: 1.6, hp: 2, walk: 40, near: 200, box: [-110, 110, 180], kick: [-260, -40], actFrames: [3, 7], fleeSheet: "wildass_walk" },
  caracal:   { idle: "caracal_walk", run: "caracal_run", k: 2, hp: 1, walk: 60, speed: 380, near: 380, box: [-80, 80, 100], leap: 640, runFor: 1.6 },
  ibex:      { idle: "ibex_walk", run: "ibex_run", k: 1.7, tough: true, walk: 40, speed: 520, near: 560, box: [-100, 100, 170], runFor: 3 },
  // (Glen 11-12: "put the swarm in there and add a bunch of the single ones so it looks more natural") his swarm picture
  //  (three frames) in the middle, single bugs darting round it; a hit and they scatter (cut_w3_swarms.py)
  locusts:   { idle: "locusts_fly", k: 1, hp: 1, swarm: true, speed: 85, box: [-230, 230, 120],
               bugs: { swarm: "w3_locust_swarm", single: "w3_locust_single", n: 60, r: 120, k: 0.7, s: 1, a: 0 } },   // (his swarm picture left out: as a block it read as a rectangle; singles only)
  flies:     { idle: "flies_fly", k: 1, hp: 1, swarm: true, speed: 95, box: [-200, 200, 110],
               bugs: { swarm: "w3_fly_swarm", single: "w3_fly_single", n: 34, r: 85, k: 1, s: 1.4 } },
  // (Glen 11-12: "the hornets ... and the honey bees from David 1") hornets chase him; bees buzz round their hive, harmless
  hornet:    { idle: "hornet_fly", k: 0.75, hp: 1, swarm: true, speed: 170, box: [-50, 50, 70] },
  bee:       { idle: "bee_fly", k: 0.5, orbit: true },
  partridge: { idle: "partridge_idle", run: "partridge_run", k: 1, shy: true, speed: 330, near: 210,
               tell: "A partridge! Saul hunted David “as when one hunts a partridge in the mountains.” (1 Samuel 26:20)" },
  hyrax:     { idle: "hyrax_walk", run: "hyrax_walk", k: 1, shy: true, walk: 22, speed: 280, near: 190,
               tell: "Rock hyraxes! “The hyraxes are but a feeble folk, yet make they their houses in the rocks.” (Proverbs 30:26)" },
  hoopoe:    { idle: "hoopoe_walk", run: "hoopoe_walk", k: 1, shy: true, walk: 18, speed: 260, near: 180 },
};
// TREE: a caracal up in a tree (o.tree: the branch's y), as Part One's leopard: it sees him (SEE px), watches WATCH s,
//  picks its spot PICK s before, and drops on it (DROP s). HOP: the most a charger jumps (tiles high, tiles wide)
const WILD_TUNE = { TREE: { SEE: 330, WATCH: 1.4, PICK: 0.5, DROP: 0.7 }, HOP: { H: 3, W: 5 }, HIT_COOL: 0.3, FLASH: 0.25, REST: 1.4, FLEE: 1.5, LEASH: 16, GRAV: 2200, SWARM_LEASH: 520, AHEAD: 40, SWARM_HURT: 0.8 };
// a road animal: kind, room, column; o.range: tiles it paces either side of home; o.y: the floor (px) or, for a swarm,
//  the height it hovers at
const rWild = (kind, room, c, o = {}) => beast(kind, room, c, Object.assign({ state: "idle", hp: WILD[kind].hp || 1, alpha: 1 }, o, { range: (o.range || 3) * T,
  facing: o.facing || -1 }, o.y != null ? { y: o.y, hy: o.y } : {}, kind === "locusts" || kind === "flies" || kind === "hornet" || kind === "bee" ? { y: o.y || GR * T - 70, hy: o.y || GR * T - 70 } : {}));
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
// (Glen 11-12: "it has to go around and on top of objects") an animal on its feet: walls and rocks in the way are hopped
//  up onto (up to HOP.H tiles; taller stops it), it walks along their tops and drops off the far side, and it won't walk
//  into a pit. stop: it couldn't go on (a tall wall, a pit's edge)
function wildMove(b, vx, dt) {
  const Tn = WILD_TUNE, dir = Math.sign(vx), feet = Math.round(b.y / T), c = Math.floor((b.x + dir * Tn.AHEAD) / T);
  const solid = (cc, r) => isSolid(cc, r), floor = (cc, r) => isSolid(cc, r) || isOneway(cc, r);
  let stop = false;
  if (dir && solid(c, feet - 1)) {   // something in the way at its feet
    let h = 0; while (h <= Tn.HOP.H && solid(c, feet - 1 - h)) h++;
    if (!b.air && h <= Tn.HOP.H) { b.vy = -Math.sqrt(2 * Tn.GRAV * (h * T + 34)); b.air = true; }
    else if (!b.air || solid(c, Math.floor((b.y - 2) / T))) stop = true;
  }
  if (dir && !b.air && !stop && !floor(c, feet)) {   // an edge: a little drop is fine, a pit isn't
    let k = 1; while (k <= 4 && !floor(c, feet + k)) k++;
    if (k > 4) stop = true;
  }
  if (!stop) b.x += vx * dt;
  const cc = Math.floor(b.x / T);
  if (!b.air && !floor(cc, Math.round(b.y / T))) { b.air = true; b.vy = 0; }
  if (b.air) {
    b.vy += Tn.GRAV * dt; const ny = b.y + b.vy * dt;
    if (b.vy >= 0) for (let r = Math.ceil(b.y / T - 0.01); r * T <= ny + 0.01; r++) if (floor(cc, r) && r * T >= b.y - 1) { b.y = r * T; b.vy = 0; b.air = false; break; }
    if (b.air) b.y = ny;
    if (b.y > (GR + 8) * T) { b.dead = true; b.gone = true; }
  }
  return { stop };
}
const wildDur = n => SPR[n] ? SPR[n].frames * SPR[n].ms / 1000 : 1;
function updateWild(b, dt, r) {
  const W_ = WILD[b.kind], d = david, dx = d.x - b.x, dy = d.y - b.y, Tn = WILD_TUNE;
  b.flash = Math.max(0, (b.flash || 0) - dt); b.blockT = Math.max(0, (b.blockT || 0) - dt);
  if (b.dead) return;
  if (b.tree != null && !b.down) {   // (Glen 11-12: "like the leopard in David 1") up in the tree, then down on him
    const Tr = Tn.TREE;
    if (b.state === "idle") { b.state = "perch"; b.t = 0; }
    if (b.state === "perch") { if (b.tx == null) b.tx = b.hx; b.hx = b.x = b.tx; b.y = b.tree;   // (its tree: hx moves to where it lands)
      if (b.t > 1 && Math.abs(dx) < Tr.SEE && d.deadT <= 0) { b.state = "watch"; b.t = 0; b.mark = d.x;
      if (!wildTold.caracal) { wildTold.caracal = true; toast("Something's watching from the branches... a wild cat! Keep moving!"); } } }
    else if (b.state === "watch") { b.facing = Math.sign(dx) || b.facing; if (b.t < Tr.WATCH - Tr.PICK) b.mark = d.x; if (b.t > Tr.WATCH) { b.state = "drop"; b.t = 0; b.ax = b.x; b.ay = b.y; } }
    else if (b.state === "drop") {
      const f = Math.min(1, b.t / Tr.DROP); b.x = b.ax + (b.mark - b.ax) * f; b.y = b.ay + (b.hy - b.ay) * f - Math.sin(f * Math.PI) * 60;
      b.facing = Math.sign(b.mark - b.ax) || b.facing;
      if (touchesDavid(wildBox(b))) wildHurt(b);
      if (f >= 1) { b.y = b.hy; b.down = true; b.state = "idle"; b.t = 0; b.cool = 0.6; b.hx = b.x; }
    }
    return;
  }
  const lo = b.hx - b.range, hi = b.hx + b.range, far = Tn.LEASH * T;
  const pace = () => {   // (off its patch after a charge: it walks back. Glen 11-12: up onto rocks and low walls, like David)
    if (!W_.walk) { if (b.air) wildMove(b, 0, dt); return; }
    if (b.x < lo) b.facing = 1; else if (b.x > hi) b.facing = -1;
    if (wildMove(b, b.facing * W_.walk * (b.x < lo || b.x > hi ? 2 : 1), dt).stop) b.facing *= -1;
  };
  if (b.state === "flee") {   // running off, fading
    b.x += b.facing * (W_.speed || 300) * (W_.shy ? 1 : 1.2) * dt; b.alpha = Math.max(0, 1 - b.t / Tn.FLEE);
    if (b.t > Tn.FLEE) { b.dead = true; b.gone = true; }
    return;
  }
  if (W_.orbit) { const a = b.t * 2.2 + (b.ph || 0); b.x = b.hx + Math.cos(a) * 46; b.y = b.hy + Math.sin(a * 1.7) * 18; b.facing = Math.sin(a) > 0 ? -1 : 1; return; }   // (round the hive)
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
    if (b.cool <= 0 && touchesDavid(wildBox(b))) { wildHurt(b); b.cool = Tn.SWARM_HURT; }
    return;
  }
  if (b.kind === "viper") {
    if (b.state === "idle") {
      if (Math.abs(dx) < W_.near * 1.6) b.facing = dx > 0 ? 1 : -1;
      if (b.cool <= 0 && Math.abs(dx) < W_.near && Math.abs(dy) < 90) { b.state = "act"; b.t = 0; }
    } else if (b.t > wildDur(W_.act)) { b.state = "idle"; b.t = 0; b.cool = 1.1; }
    if (touchesDavid(wildBox(b))) wildHurt(b);
    return;
  }
  if (b.kind === "wildass") {
    if (b.state === "idle") { pace(); if (b.cool <= 0 && Math.abs(dx) < W_.near && Math.abs(dy) < 100) { b.state = "act"; b.t = 0; b.facing = dx > 0 ? -1 : 1; } }   // (turns its back on him)
    else { const q = wildKickBox(b); if (q && touchesDavid(q)) wildHurt(b); if (b.t > wildDur(W_.act)) { b.state = "idle"; b.t = 0; b.cool = 1.2; } }
    return;
  }
  // the chargers: ostrich, caracal, ibex
  if (b.state === "idle") {
    pace();
    if (b.cool <= 0 && !b.air && Math.abs(dx) < W_.near && Math.abs(dy) < 150) {
      b.state = "run"; b.t = 0; b.facing = dx > 0 ? 1 : -1;
      if (W_.leap) { b.vy = -W_.leap; b.air = true; }
    }
  } else if (b.state === "run") {
    const m = wildMove(b, b.facing * W_.speed, dt), past = b.facing > 0 ? b.x - d.x : d.x - b.x;
    if (!b.air && (b.t > W_.runFor || past > 320 || m.stop || Math.abs(b.x - b.hx) > far)) { b.state = "idle"; b.t = 0; b.cool = Tn.REST; b.facing *= -1; }
  }
  if (b.state === "run" && touchesDavid(wildBox(b))) wildHurt(b);
}
const wildTold = {};
// (Glen 11-12: "I have a shield ... it should block bees or donkey or ibex") a hit from in front while he holds the shield
//  is blocked: nothing lost, and the animal is knocked back (a charge ends, a swarm backs off)
function wildHurt(b) {
  const d = david;
  if (d.shield && Math.sign(b.x - d.x) === d.facing) {
    if (b.cool > 0.2 && b.blockT > 0) return;
    sfx("stone_hit", b.x, 0.5, 0.7); b.flash = 0.15; b.blockT = 0.4; b.cool = Math.max(b.cool, WILD_TUNE.REST);
    if (b.state === "run") { b.state = "idle"; b.t = 0; b.facing *= -1; }
    b.x += Math.sign(b.x - d.x) * 26;
    if (!wildTold.shield) { wildTold.shield = true; toast("Blocked with the shield!"); }
    return;
  }
  hurtDavid(b.x);
}
// a stone or the sword's edge: true if it hit
function wildHit(b, s) {
  const W_ = WILD[b.kind]; if (b.dead || b.state === "flee" || W_.shy || W_.orbit || b.state === "perch" || b.state === "watch") return false;
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
function drawSwarm(b, x) {   // his swarm (its three frames), and the single bugs round it, each on its own wobbly loop
  const B = WILD[b.kind].bugs, sw = kitImg(B.swarm), one = kitImg(B.single), t = b.t;
  const f = b.dead ? Math.min(1, t / 1.1) : 0; if (b.dead && f >= 1) return;
  ctx.save();
  if (sw && !b.dead && B.a !== 0) { const fw = sw.naturalWidth / 3, i = Math.floor(t * 9) % 3, w = fw * B.k, h = sw.naturalHeight * B.k;
    ctx.globalAlpha = (B.a ?? 0.9) * (b.flash > 0 ? 0.6 : 1); ctx.drawImage(sw, i * fw, 0, fw, sw.naturalHeight, x - w / 2, b.y - h / 2, w, h); }
  if (one) for (let j = 0; j < B.n; j++) {
    const ph = j * 2.399, r = B.r * (0.35 + (j % 7) / 7 * 0.8), sp = 1.4 + (j % 5) * 0.4, a = t * sp + ph;
    let px = Math.cos(a) * r * 1.7 + Math.sin(t * 3.1 + j) * 9, py = Math.sin(a * 1.3) * r * 0.55 + Math.cos(t * 2.7 + j) * 7;
    if (b.dead) { px += Math.cos(ph) * 420 * f; py += Math.sin(ph) * 240 * f - 90 * f; }
    const w = one.naturalWidth * B.s, h = one.naturalHeight * B.s, goingLeft = -Math.sin(a) < 0;
    ctx.globalAlpha = b.dead ? 1 - f : 1;
    ctx.save(); ctx.translate(x + px, b.y + py); if (goingLeft) ctx.scale(-1, 1); ctx.drawImage(one, -w / 2, -h / 2, w, h); ctx.restore();
  }
  ctx.restore();
}
function drawWild(b, x) {
  const W_ = WILD[b.kind], k = W_.k;
  if (W_.bugs) { drawSwarm(b, x); return; }
  if (b.dead) {
    if (b.state === "scatter" && W_.die && b.t < wildDur(W_.die)) drawSprite(W_.die, frameOf(W_.die, b.t), x, b.y, b.facing, k, Math.max(0, 1 - b.t / wildDur(W_.die)));
    return;
  }
  if (b.state === "perch" || b.state === "watch") {   // in the tree: still, and (watching) a shiver and its eyes catching the light
    const sh = b.state === "watch" ? Math.sin(b.t * 40) * 1.5 : 0;
    drawSprite(W_.idle, 0, x + sh, b.y, b.facing, k);
    if (b.state === "watch") { ctx.save(); ctx.fillStyle = `rgba(255,236,140,${0.5 + 0.5 * Math.sin(b.t * 9)})`; const ex = x + b.facing * 52 * SCALE * k; ctx.beginPath(); ctx.arc(ex, b.y - 92 * SCALE * k, 3, 0, 7); ctx.fill(); ctx.restore(); }
    return;
  }
  if (b.state === "drop") { drawSprite(W_.run, 4, x, b.y, b.facing, k); return; }
  const n = b.state === "act" ? W_.act : (b.state === "run" || b.state === "flee") ? (W_.run || W_.fleeSheet || W_.idle) : W_.idle;
  // (standing still, a walk sheet would walk on the spot: the shy ones and the viper only loop when moving or idle by design)
  const f = b.kind === "viper" && b.state === "idle" ? 0 : frameOf(n, b.t);   // (Glen 11-12: the coiled viper lies still; it moves when it strikes)
  drawSprite(n, f, x, b.y, b.facing, k, b.alpha == null ? 1 : b.alpha, b.flash > 0 ? "brightness(2.2)" : "");
}
