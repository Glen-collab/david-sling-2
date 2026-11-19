// (11-19) Glen's moving falls at the Spring; in behind the pool's falls to the new cave, the Truth there, out into the camp
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const st = () => log("room " + (region.room && region.room.id) + " x " + Math.round(david.x / T - region.room.c0) + " y " + Math.round(david.y) + " truth " + g5Has("g5_truth_falls"));
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); region.beasts.length = 0; moveParty(g5.falls - 300, FOOT); snapCamera(); } }, { keys: [], n: 40 }, { n: 1, fn: clear }, { keys: [], n: 3, snap: true },
  { n: 1, fn() { clear(); const r = roomById("pool"); moveParty((r.c0 + 86) * T, G5.POOL_LEDGE); snapCamera(); } }, { keys: [], n: 30 }, { n: 1, fn: clear },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 100 }, { n: 1, fn() { clear(); st(); } }, { keys: [], n: 20, snap: true },
  { n: 1, fn() { clear(); const r = roomById("hollow"); moveParty((r.c0 + 37) * T, 370 - 2); snapCamera(); } }, { keys: [], n: 20 }, { n: 1, fn() { st(); } }, { n: 1, fn: clear }, { keys: [], n: 3, snap: true },
  { n: 1, fn() { clear(); const r = roomById("hollow"); moveParty((r.c0 + 3) * T, FOOT); snapCamera(); } }, { keys: ["ArrowLeft"], n: 75 }, { keys: [], n: 1, snap: true }, { n: 1, fn() { clear(); st(); log("cam " + Math.round(camX - roomById("camp").c0 * T) + " pose " + JSON.stringify(g5.pose && g5.pose.name) + " hide " + !!(g5.pose && g5.pose.hide) + " trans " + !!region.trans); } }, { keys: [], n: 90 }, { n: 1, fn() { clear(); st(); } }, { keys: [], n: 3, snap: true }]);
