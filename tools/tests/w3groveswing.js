// (Glen 11-12) the Tall Trees: a bot makes the two swings back across the tops, from the climbing tree to the third and
//  from the second to the first, on the long ropes hung from out of sight. Animals out of the way
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
region.beasts = region.beasts.filter(b => !WILD[b.kind]);
const log = m => TEST_ERRORS.push("INFO " + m);
const G = roomById("grove"), TOPY = Math.round((FOOT - R3.GROVE.TOP) / T) * T, tx = k => (G.c0 + k) * T + T / 2;
const ropes = r3.swings.filter(q => q.room === "grove");
let legPhase = 0, runT = -1, gotRope = 0, aimX = 0;
const bot = (q, edge) => {   // swing left: from a limb tip at edge (px), across to the next tree
  const sw = r3.swing, d = david;
  if (sw) { gotRope++; return q.ang < -0.12 && q.w < 0 ? ["ArrowLeft", "KeyZ"] : [q.w <= 0 ? "ArrowLeft" : "ArrowRight"]; }
  if (d.onGround && d.x > edge - 10 && Math.abs(d.y - TOPY) < 4) {
    if (runT < 0) { if (d.x < edge + 70) return ["ArrowRight"]; if (q.ang > 0.02 && q.w < 0) runT = 0; else return []; }
    runT++; return runT < 6 ? ["ArrowLeft"] : ["ArrowLeft", "KeyZ"];
  }
  runT = -1; if (d.onGround) return []; if (!gotRope) return ["ArrowLeft", "KeyZ"];   // (in the air: steer for the middle of the next tree's top, as a player would)
  return Math.abs(d.x - aimX) < 30 ? [] : [d.x > aimX ? "ArrowLeft" : "ArrowRight"];
};
const steps = [];
const leg = (name, q, startX, edge, landX0, landX1) => {
  steps.push({ n: 2, fn() { moveParty(startX, TOPY); david.facing = -1; david.inv = 99; snapCamera(); gotRope = 0; aimX = (landX0 + landX1) / 2; } }, { keys: [], n: 10 });
  for (let i = 0; i < 360; i++) steps.push({ n: 1, fn() { for (const k in keys) keys[k] = false; for (const k of bot(q, edge)) keys[k] = true; } });
  steps.push({ keys: [], n: 20, snap: true, fn() { const d = david; log(name + ": gotRope " + (gotRope > 0) + " now x " + (d.x / T - G.c0).toFixed(1) + " y " + Math.round(d.y) + " on the tops " + (Math.abs(d.y - TOPY) < 4) + " landed on it " + (d.x > landX0 && d.x < landX1)); } });
};
leg("D to C", ropes[0], tx(R3.GROVE.D) - 200, tx(R3.GROVE.D) - 264, tx(R3.GROVE.C) - 270, tx(R3.GROVE.C) + 270);
leg("B to A", ropes[1], tx(R3.GROVE.B) - 200, tx(R3.GROVE.B) - 264, tx(R3.GROVE.A) - 270, tx(R3.GROVE.A) + 270);
testRun(steps);
