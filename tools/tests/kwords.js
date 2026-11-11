// (Glen 11-11) keyboard words in Part Two: the mash box at Gath's gate says Z and X to a keyboard player
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; lastInput = "keyboard";
region.save.taken = region.save.taken.filter(k => !["r3_gath", "r3_mad", "g_exit_open"].includes(k));
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } };
const lines = n => Array.from({ length: n }, () => ({ keys: [], n: 6, fn: skip }));
testRun([
  { n: 3, fn() { r3.caughtT = 0; const r = roomById("gath"); moveParty((r.c0 + 12) * T, GR * T); david.facing = 1; snapCamera(); } },
  ...lines(4), { keys: ["ArrowRight"], n: 14 }, ...lines(8),
  { keys: [], n: 30, snap: true, fn() { log("mash " + mash.on + " kw " + keyWords("Mash A and B!") + " / " + keyWords("press A") + " / " + keyWords("Press Start (or Enter)")); } },
  { n: 2, fn() { lastInput = "pad"; padRest = null; kbCache.t = -1e9; log("pad kind " + controllerKind() + " kw " + keyWords("Mash A and B!")); } },
]);
