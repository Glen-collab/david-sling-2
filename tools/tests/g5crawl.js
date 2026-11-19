// (11-19) out of the camp: Glen's clip of David squeezing out of the hidden mouth, then play
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 }, { n: 1, fn() { clear(); const r = roomById("camp"); moveParty((r.c0 + 50) * T, FOOT); snapCamera(); } }, { keys: [], n: 90 },
  { n: 1, fn() { clear(); const r = roomById("camp"); moveParty((r.c0 + 57) * T, FOOT); snapCamera(); } }, { keys: ["ArrowRight"], n: 14 }, { keys: [], n: 60 },
  { n: 1, fn() { clear(); const v = g5Video("crawl_out"); log("crawl " + !!g5.crawl + " t " + (v && v.currentTime.toFixed(1)) + " room " + region.room.id); } }, { keys: [], n: 3, snap: true },
  { keys: [], n: 120, snap: true }, { keys: [], n: 180 }, { n: 1, fn() { clear(); log("after: crawl " + !!g5.crawl + " col " + Math.round(david.x / T - region.room.c0)); } }, { keys: ["ArrowRight"], n: 30, snap: true }]);
