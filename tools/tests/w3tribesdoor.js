// (11-11) the door into the Hall of the Tribes, at the east end of Nob
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([
  { n: 3, fn() { const r = roomById("nob"); moveParty((r.c0 + 104.5) * T, GR * T); snapCamera(); } },
  { keys: [], n: 30, snap: true, fn() { log("room " + region.room.id); } },
  { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 80, fn() { log("after Up: room " + region.room.id); } },
]);
