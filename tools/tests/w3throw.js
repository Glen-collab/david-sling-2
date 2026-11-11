// (Glen 11-11) the sling with Goliath's sword on his back: charging standing (the whirl), the fling, charging on the
// run, and the alcove (the cloaked back walk, sword or not)
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const wait = n => Array.from({ length: n }, () => ({ keys: [], n: 5, fn: skip }));
const at = (id, k) => ({ n: 3, fn() { r3.caughtT = 0; const r = roomById(id); moveParty((r.c0 + k) * T, GR * T); david.facing = 1; snapCamera(); } });
testRun([
  { n: 2, fn() { skills.add("heavySword"); skills.add("charge"); } },
  at("nobroad", 6), ...wait(12),
  { keys: ["KeyX"], n: 40 }, { keys: ["KeyX"], n: 1, snap: true, fn() { log("x " + Math.round(david.x - camX) + " charging standing: throwT " + david.throwT + " charge " + david.charge.toFixed(2)); } },
  { keys: [], n: 5 }, { keys: [], n: 1, snap: true, fn() { log("x " + Math.round(david.x - camX) + " after release: thrown " + david.thrown + " stones " + stones.length); } },
  ...wait(6),
  { keys: ["ArrowRight"], n: 30 }, { keys: ["ArrowRight", "KeyX"], n: 40 }, { keys: ["ArrowRight", "KeyX"], n: 1, snap: true, fn() { log("x " + Math.round(david.x - camX) + " charging running: vx " + Math.round(david.vx) + " state " + david.state); } },
  { keys: ["ArrowRight"], n: 6 }, { keys: ["ArrowRight"], n: 1, snap: true, fn() { log("x " + Math.round(david.x - camX) + " run throw: runThrow " + david.runThrow + " thrown " + david.thrown); } },
]);
