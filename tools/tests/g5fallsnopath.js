// (11-19) the Spring's falls: no trail picture over them, and Up still goes to the pool
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.crawl = null; g5.crawl = null; dialog.t = 0; region.script.length = 0; region.beasts.length = 0; g5.guards.length = 0; const r = roomById("spring"); moveParty((r.c0 + 54) * T, GR * T); snapCamera(); } }, { keys: [], n: 30, snap: true },
  { n: 1, fn() { dialog.t = 0; david.x = (roomById("spring").c0 + 58) * T + T / 2; } }, { keys: [], n: 5 }, { keys: ["ArrowUp"], n: 4 }, { keys: [], n: 120 },
  { n: 1, fn() { log("room after Up: " + region.room.id); } }]);
