// (Glen 11-17) side paths: Up at a trail, he turns and walks off into the picture; the side room's far end brings him back out
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const col = () => region.room.id + " col " + (david.x / T - region.room.c0).toFixed(0);
testRun([{ n: 1, fn() { const r = roomById("hills"); moveParty((r.c0 + 66) * T, FOOT); david.facing = 1; snapCamera(); region.beasts = region.beasts.filter(b => b.room !== "hills"); z5.guards.length = 0; } },
  { keys: [], n: 20, snap: true, fn() { log("at trail: " + col() + " paths " + region.paths.length); dialog.t = 0; } },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 18, snap: true, fn() { log("walking " + !!region.pathWalk); } }, { keys: [], n: 60, snap: true, fn() { log("in: " + col()); } },
  { n: 1, fn() { const r = roomById("goatpath"); region.beasts = region.beasts.filter(b => b.room !== "goatpath"); moveParty((r.c0 + 96) * T, FOOT); snapCamera(); } }, { keys: ["ArrowRight"], n: 50 }, { keys: [], n: 40, fn() { log("out: " + col()); } },
  { n: 1, fn() { bookOpen("map"); } }, { keys: [], n: 30, snap: true }]);
