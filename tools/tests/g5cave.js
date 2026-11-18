// (11-18) Up at the cave behind the falls: in, the Truth, back out
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
testRun([{ n: 1, fn() { region.crawl = null; region.save.taken = region.save.taken.filter(k => k !== "g5_truth_falls"); } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); const r = roomById("pool"); moveParty((r.c0 + 92) * T, G5.POOL_LEDGE); snapCamera(); g5.swim = null; } }, { keys: [], n: 30 }, { n: 1, fn() { clear(); } }, { keys: [], n: 20, snap: true },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 40, snap: true }, { keys: [], n: 40 },
  { n: 1, fn() { log("truth taken " + g5Has("g5_truth_falls") + ", dialog " + (dialog.t > 0)); } }, { keys: [], n: 10, snap: true }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 60, snap: true },
  { n: 1, fn() { log("cave done " + !g5.cave + " x " + Math.round(david.x / T - roomById("pool").c0)); } }]);
