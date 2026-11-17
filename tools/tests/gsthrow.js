// (Glen 11-17) his new sword sling clips: standing whirl and throw, running whirl and the throw from a run
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { skills.add("heavySword"); regionAdd("taken", "r3_gath"); regionAdd("taken", "r3_mad"); const r = roomById("gath"); moveParty((r.c0 + 20) * T, FOOT); david.facing = 1; snapCamera(); } }, { keys: [], n: 20 },
  { keys: ["KeyX"], n: 14, snap: true, fn() { log("whirl " + david.charging + " sx " + Math.round(david.x - camX)); } },
  { keys: [], n: 6, snap: true, fn() { log("throw " + david.throwT.toFixed(2)); } },
  { keys: [], n: 30 }, { keys: ["ArrowRight"], n: 22 }, { keys: ["ArrowRight", "KeyX"], n: 8, snap: true, fn() { log("run whirl " + david.state + " vx " + Math.round(david.vx) + " sx " + Math.round(david.x - camX)); } },
  { keys: ["ArrowRight"], n: 3, snap: true, fn() { log("run throw " + david.runThrow + " " + david.throwT.toFixed(2)); } }]);
