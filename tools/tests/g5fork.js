// (11-19) the Fork in the Dark: off the Flooded Cave's far ledge, two mouths: to the Spring, to the camp
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const st = w => log(w + ": room " + region.room.id + " col " + Math.round(david.x / T - region.room.c0) + " y " + Math.round(david.y));
const go = (rm, k, y = FOOT) => ({ n: 1, fn() { clear(); region.beasts.length = 0; g5.guards.length = 0; const r = roomById(rm); moveParty((r.c0 + k) * T, y); snapCamera(); } });
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  go("backway", 66, G5.POOL_LEDGE), { keys: [], n: 10 }, { keys: ["ArrowRight"], n: 30 }, { keys: [], n: 60 }, { n: 1, fn() { clear(); st("off the ledge"); } },
  { n: 1, fn() { david.x = (region.room.c0 + 20) * T; snapCamera(); clear(); } }, { keys: [], n: 3, snap: true },
  go("fork", 13), { keys: [], n: 5 }, { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 180 }, { n: 1, fn() { clear(); st("spring mouth"); } }, { keys: [], n: 3, snap: true },
  go("fork", 31), { keys: [], n: 5 }, { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 180 }, { n: 1, fn() { clear(); st("camp mouth"); } },
  go("fork", 1), { keys: ["ArrowLeft"], n: 30 }, { keys: [], n: 60 }, { n: 1, fn() { clear(); st("back"); } }]);
