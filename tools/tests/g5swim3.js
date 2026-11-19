// (11-19) Glen's three swims: treading still at the top, the crawl along the top, the breaststroke under
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); const r = roomById("pool"); moveParty((r.c0 + 40) * T, r.water + 120); snapCamera(); } },
  { keys: [], n: 90 }, { n: 1, fn() { clear(); log("tread " + !!(g5.swim && g5.swim.tread) + " y " + Math.round(david.y)); } }, { keys: [], n: 3, snap: true },
  { keys: ["ArrowRight"], n: 40 }, { n: 1, fn() { clear(); log("surf y " + Math.round(david.y)); } }, { keys: ["ArrowRight"], n: 3, snap: true },
  { keys: ["ArrowRight", "ArrowDown"], n: 50 }, { n: 1, fn() { clear(); log("under y " + Math.round(david.y)); } }, { keys: ["ArrowRight"], n: 3, snap: true },
  { keys: ["ArrowRight"], n: 12, snap: true },
]);
