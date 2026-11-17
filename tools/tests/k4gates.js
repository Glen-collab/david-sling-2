// (Glen 11-17) Keilah's open gates: he stops at them; Up takes him through
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { ["k4_floors", "k4_abiathar", "k4_saul"].forEach(t => regionAdd("taken", t)); region.save.taken = region.save.taken.filter(t => t !== "k4_ephod"); const r = roomById("floors"); moveParty((r.c0 + 96) * T, FOOT); david.facing = 1; snapCamera(); } },
  { keys: ["ArrowRight"], n: 60, snap: true, fn() { log("floors: room " + region.room.id + " col " + (david.x / T - region.room.c0).toFixed(1)); } },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 60, fn() { log("after Up: room " + region.room.id); } },
  { n: 1, fn() { regionAdd("taken", "k4_ephod"); const r = roomById("town"); moveParty((r.c0 + 92) * T, FOOT); david.facing = 1; snapCamera(); } },
  { keys: ["ArrowRight"], n: 60, snap: true, fn() { log("town: room " + region.room.id + " col " + (david.x / T - region.room.c0).toFixed(1)); } },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 60, fn() { log("after Up: room " + region.room.id); } }]);
