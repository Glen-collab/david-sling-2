startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k, y = GR * T) => { const r = roomById(rm); moveParty((r.c0 + k) * T, y); snapCamera(); };
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const go = (rm, k, y) => [{ n: 1, fn() { clear(); region.beasts.length = 0; at(rm, k, y); } }, { keys: [], n: 20 }, { n: 1, fn() { clear(); } }, { keys: [], n: 40, snap: true }];
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 10 },
  ...go("camp", 20), ...go("pens", 30), ...go("spring", 18), ...go("spring", 42), ...go("spring", 63), ...go("rocks", 12), ...go("rocks", 40, T), ...go("wild", 60)]);
