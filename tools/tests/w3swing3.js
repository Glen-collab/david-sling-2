// a full crossing: a little bot. On the bank: waits for the first rope to swing back toward it, runs and jumps. On a
// rope: pumps with the swing, lets go on the forward swing. In the air: holds right.
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; kitImg("w3_rope_4");
const log = m => TEST_ERRORS.push("INFO " + m);
const X = k => (roomById("nobroad").c0 + k) * T;
let lastRope = -1, falls = 0, h0 = 0, runT = -1;
const bot = () => {
  const sw = r3.swing, d = david;
  if (sw) { const i = r3.swings.indexOf(sw.q); if (i !== lastRope) { log("caught rope " + i + " at " + Math.round(d.x - X(0))); lastRope = i; }
    return sw.q.ang > 0.45 && sw.q.w > 0 ? ["ArrowRight", "KeyZ"] : [sw.q.w >= 0 ? "ArrowRight" : "ArrowLeft"]; }
  if (d.onGround && d.x < X(94)) {   // on the near bank
    if (runT < 0) { if (d.x > X(92.5)) return ["ArrowLeft"]; if (r3.swings[0].ang < -0.04 && r3.swings[0].w < 0) runT = 0; else return []; }
    runT++; return runT < 8 ? ["ArrowRight"] : ["ArrowRight", "KeyZ"];
  }
  runT = -1;
  return d.onGround ? ["ArrowRight"] : ["ArrowRight", "KeyZ"];
};
const steps = [{ n: 2, fn() { moveParty(X(91), GR * T); david.facing = 1; snapCamera(); h0 = david.hearts; } }, { keys: [], n: 10 }];
for (let i = 0; i < 700; i++) steps.push({ n: 1, fn() { for (const k in keys) keys[k] = false; for (const k of bot()) keys[k] = true;
  if (i % 60 === 0) log(i + " rope0 ang " + r3.swings[0].ang.toFixed(2) + " w " + r3.swings[0].w.toFixed(2) + " runT " + runT + " x " + Math.round(david.x - X(0)) + " ground " + david.onGround);
  if (david.hearts < h0) { falls++; h0 = david.hearts; log("fell at " + Math.round(david.x - X(0))); }
  if (!window.SNAPPED && r3.swing && r3.swings.indexOf(r3.swing.q) === 1) { window.SNAPPED = 1; } } });
steps.push({ keys: [], n: 1, snap: true, fn() { log("end: x " + Math.round(david.x - X(0)) + " (far bank from " + 142 * T + ") room " + region.room.id + " falls " + falls); } });
testRun(steps);
