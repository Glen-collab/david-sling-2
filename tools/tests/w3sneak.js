// (Glen 11-10, "like Metal Gear Solid") the streets of Gath: seen in the open -> back to the gate; crouched behind his
// sacks -> safe; in the alcove (Up) -> safe. Snaps: the guard's "!", crouched, in the alcove
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; r3.told.sneak = true; };
const wait = n => Array.from({ length: n }, () => ({ keys: [], n: 5, fn: skip }));
const c0 = () => roomById("streets").c0;
const g0 = () => r3.guards[0];
const hide = n => r3.hides.find(h => h.n === n);
const fix = (x, f) => { const g = g0(); g.x = x; g.facing = f; g.state = "look"; g.t = -99; g.seen = 0; };   // (he stands and looks, a long time)
testRun([
  { n: 3, fn() { moveParty((c0() + 20) * T, GR * T); snapCamera(); } }, ...wait(10),
  // 1: standing in the open, 4 tiles in front of him
  { n: 2, fn() { fix(david.x + 4 * T, -1); } }, { keys: [], n: 8, snap: true, fn() { log("open: seen " + g0().seen.toFixed(2)); } },
  ...wait(8), { n: 1, fn() { log("after: caught fade " + r3.caughtT.toFixed(2) + " david col " + Math.round(david.x / T - c0())); } },
  ...wait(12),
  // 2: crouched behind the sacks, him looking straight at them
  { n: 3, fn() { const h = hide("w3_hide_sacks"); moveParty(h.x, GR * T); snapCamera(); fix(h.x + 3 * T, -1); } },
  { keys: ["ArrowDown"], n: 30 }, { keys: ["ArrowDown"], n: 2, snap: true, fn() { log("crouched: h " + david.h + " hidden " + r3Hidden() + " seen " + g0().seen.toFixed(2) + " caught " + (r3.caughtT > 0)); } },
  // 3: in the alcove
  { n: 3, fn() { const h = hide("w3_hide_alcove"); moveParty(h.x, GR * T); snapCamera(); fix(h.x + 3 * T, 1); } }, ...wait(4),   // (his back turned while David steps in)
  { keys: ["ArrowUp"], n: 1 }, { keys: [], n: 2, fn() { const h = hide("w3_hide_alcove"); fix(h.x + 3 * T, -1); } }, { keys: [], n: 30 }, { keys: [], n: 2, snap: true, fn() { log("alcove: inDoor " + !!r3.inDoor + " seen " + g0().seen.toFixed(2) + " caught " + (r3.caughtT > 0)); } },
  { keys: ["ArrowRight"], n: 1 }, { keys: [], n: 3, fn() { log("stepped out: inDoor " + !!r3.inDoor); } },
]);
