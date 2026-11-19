// (11-19) the pool's far end: the cave mouth behind the falls
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("pool"); moveParty((r.c0 + 86) * T, G5.POOL_LEDGE); snapCamera(); } },
  { keys: [], n: 30 }, { n: 1, fn() { dialog.t = 0; region.script.length = 0; log("T " + T + " camX " + Math.round(camX) + " c0 " + roomById("pool").c0 + " y " + Math.round(david.y)); } }, { keys: [], n: 3, snap: true }]);
