// (Glen 11-06) Philistines on the walkways: feet on the planks, and no shaking back and forth when David's near but not on his walkway
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const P = region.beasts.filter(b => b.room === "walls" && b.kind === "phil" && b.hy < 0 && b.hy > -1600).sort((a, b) => b.hy - a.hy)[0];
log("Philistine at y " + P.hy + ", feet " + P.y);
let flips = 0, lastDir = 0, states = new Set();
const watch = { keys: [], n: 1, fn() { const v = Math.sign(P.x - (P.px ?? P.x)); if (v && lastDir && v !== lastDir) flips++; if (v) lastDir = v; P.px = P.x; states.add(P.state); } };
const cases = [["David on the walkway above him", 0, -210], ["David across the gap, same height", 14 * T, 0], ["David right over him, one row up", 0, -150]];
const steps = [];
for (const [what, dx, dy] of cases) {
  steps.push({ n: 3, fn() { flips = 0; lastDir = 0; states = new Set(); P.state = "run"; P.x = P.hx; P.y = P.hy; dialog.t = 0; setState("idle"); moveParty(P.hx + dx, P.hy + dy); snapCamera(); david.hearts = david.maxHearts; } });
  for (let i = 0; i < 120; i++) steps.push({ ...watch, fn() { watch.fn(); david.x = P.hx + dx; if (i === 119) log(`${what}: ${flips} turns in 2 s, states ${[...states].join(",")}, feet ${Math.round(P.y)}`); } });
}
steps.push({ n: 3, fn() { moveParty(P.hx + 200, P.hy); snapCamera(); P.x = P.hx; P.state = "wait"; } }, { keys: [], n: 20, snap: true });
testRun(steps);
