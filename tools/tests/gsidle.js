// (Glen 11-17) his new idle with the sword: breathing, then after a while he turns to face us
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { skills.add("heavySword"); regionAdd("taken", "r3_gath"); regionAdd("taken", "r3_mad"); region.beasts.length = 0; const r = roomById("gath"); moveParty((r.c0 + 20) * T, FOOT); david.facing = 1; snapCamera(); } },
  { keys: [], n: 60, snap: true, fn() { log("idle t " + david.t.toFixed(2) + " sx " + Math.round(david.x - camX)); } },
  { keys: [], n: 330, snap: true, fn() { log("idle t " + david.t.toFixed(2)); } },
  { keys: ["ArrowRight"], n: 3 }, { keys: [], n: 10, snap: true, fn() { log("after move " + david.state + " t " + david.t.toFixed(2)); } }]);
