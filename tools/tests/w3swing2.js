// the ravine: wait for the first rope to swing toward him, run and jump into it
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; kitImg("w3_rope_4");
const log = m => TEST_ERRORS.push("INFO " + m);
const X = k => (roomById("nobroad").c0 + k) * T;
const st = () => r3.swing ? `on rope ${r3.swings.indexOf(r3.swing.q)} ang ${r3.swing.q.ang.toFixed(2)} w ${r3.swing.q.w.toFixed(2)}` : `free x ${Math.round(david.x - X(0))} y ${Math.round(david.y)} ${david.state}`;
const q0 = () => r3.swings[0];
const steps = [{ n: 2, fn() { moveParty(X(91), GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 10 }];
for (let i = 0; i < 120; i++) steps.push({ keys: [], n: 1, fn() { if (!window.GO && q0().ang < -0.2 && q0().w < 0) window.GO = 1; } });
const go = []; for (let i = 0; i < 8; i++) go.push({ keys: ["ArrowRight", "ShiftLeft"], n: 1 });
testRun([...steps.slice(0, 2), { keys: [], n: 1, fn() { log("rope0 ang " + q0().ang.toFixed(2)); } },
  ...Array.from({ length: 90 }, () => ({ keys: [], n: 1, fn() { if (window.GO === undefined && q0().ang < -0.25) { window.GO = 0; } } })),
  { keys: ["ArrowRight"], n: 6 }, { keys: ["ArrowRight", "KeyZ"], n: 2 }, { keys: ["ArrowRight", "KeyZ"], n: 12, snap: true, fn() { log("jump: " + st()); } },
  { keys: ["ArrowRight"], n: 10, snap: true, fn() { log("next: " + st()); } },
  ...Array.from({ length: 50 }, (_, i) => ({ keys: [(r3.swing && r3.swing.q.w > 0) || i < 3 ? "ArrowRight" : "ArrowLeft"], n: 1 })),
  { keys: [], n: 1, fn() { log("pumped: " + st()); } },
]);
