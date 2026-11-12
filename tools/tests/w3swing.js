// (Glen 11-12) the ravine on the Road to Nob: jump, catch a swinging rope, swing, let go to the next
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; kitImg("w3_rope_4");
const log = m => TEST_ERRORS.push("INFO " + m);
const X = k => (roomById("nobroad").c0 + k) * T;
const st = () => r3.swing ? `on rope ${r3.swings.indexOf(r3.swing.q)} ang ${r3.swing.q.ang.toFixed(2)}` : `free x ${Math.round(david.x - X(0))} y ${Math.round(david.y)} ${david.state}`;
const steps = [{ n: 2, fn() { moveParty(X(92), GR * T); david.facing = 1; snapCamera(); david.inv = 9; } }, { keys: [], n: 20, snap: true },
  { keys: ["ArrowRight", "KeyZ"], n: 2 }, { keys: ["ArrowRight", "KeyZ"], n: 10 }, { keys: ["ArrowRight"], n: 10, snap: true, fn() { log("after jump: " + st()); } }];
for (let i = 0; i < 40; i++) steps.push({ keys: [i % 30 < 15 ? "ArrowRight" : "ArrowLeft"], n: 1, fn: i % 8 ? null : () => log(i + ": " + st()) });
steps.push({ keys: ["ArrowRight"], n: 1, fn() { log("before let go: " + st() + " w " + (r3.swing ? r3.swing.q.w.toFixed(2) : "")); } });
// wait for the forward swing, then let go
for (let i = 0; i < 40; i++) steps.push({ keys: ["ArrowRight"], n: 1, fn() { if (r3.swing && r3.swing.q.ang > 0.3 && r3.swing.q.w > 0 && !window.LET) { window.LET = 1; } } });
steps.push({ keys: ["ArrowRight", "KeyZ"], n: 2, snap: true, fn() { log("let go: " + st()); } });
steps.push({ keys: ["ArrowRight"], n: 30, snap: true, fn() { log("then: " + st()); } });
steps.push({ keys: ["ArrowRight"], n: 60, fn() { log("later: " + st() + " hearts " + david.hearts); } });
testRun(steps);
