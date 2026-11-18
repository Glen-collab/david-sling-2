// (11-18) En-Gedi first pass: every room, and the HUD
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k, y = GR * T) => { const r = roomById(rm); moveParty((r.c0 + k) * T, y); snapCamera(); };
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
testRun([
  { n: 1, fn() { region.crawl = null; } }, { keys: [], n: 40 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 20, snap: true },
  { n: 1, fn() { clear(); log("food " + g5.food.length + " guards " + g5.guards.length + " stage " + g5Stage()); at("pens", 30); } }, { keys: [], n: 30 }, { n: 1, fn() { clear(); } }, { keys: [], n: 30, snap: true },
  { n: 1, fn() { at("spring", 56); } }, { keys: [], n: 40, snap: true },
  { n: 1, fn() { clear(); at("rocks", 10); } }, { keys: [], n: 30 }, { n: 1, fn() { clear(); } }, { keys: [], n: 30, snap: true },
  { n: 1, fn() { at("rocks", 40, -16 * T); } }, { keys: [], n: 40, snap: true },
  { n: 1, fn() { at("wild", 60); } }, { keys: [], n: 40, snap: true },
]);
