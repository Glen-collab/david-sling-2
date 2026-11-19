// (11-19) the pool's fish (adullam.js's) and Glen's crisper swim and sword swipe under the water
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); const r = roomById("pool"); moveParty((r.c0 + 20) * T, r.water + 200); snapCamera(); } }, { keys: [], n: 10 },
  { n: 1, fn() { clear(); log("fish " + g5.fish.length + " swim " + !!g5.swim); } },
  { keys: ["ArrowRight", "ArrowDown"], n: 20 }, { keys: ["ArrowRight"], n: 3, snap: true },
  { n: 1, fn() { david.inv = 0; } }, { keys: ["KeyV"], n: 2 }, { keys: [], n: 2, snap: true }, { n: 1, fn() { log("swordT " + david.swordT.toFixed(2) + " fish left " + g5.fish.filter(f => !f.gone).length); } },
  { keys: [], n: 3, snap: true }]);
