// (11-19) the water in the pits: a soft surface line, no dashes
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
let o;
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); o = g5.pools[0]; TEST_ERRORS.push("INFO pools " + g5.pools.length + " first in " + o.room); g5.guards.length = 0; moveParty(o.x0 - 150, FOOT); snapCamera(); } }, { keys: [], n: 10 }, { n: 1, fn: clear }, { keys: [], n: 2, snap: true }]);
