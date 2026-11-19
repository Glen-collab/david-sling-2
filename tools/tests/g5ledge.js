// (11-18) where the rocks by the falls are: columns on screen
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("pool"); moveParty((r.c0 + 88) * T, G5.POOL_LEDGE); snapCamera(); } },
  { keys: [], n: 30 }, { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("pool"); log("T " + T + " camX " + Math.round(camX) + " c0x " + r.c0 * T + " water " + r.water + " camY " + camY + " dx " + Math.round(david.x - camX) + " dy " + Math.round(david.y));
    window.__grid = true; } },
  { keys: [], n: 5, snap: true }]);
