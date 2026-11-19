// (11-18) David treading at the surface by the falls: no line across him
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("pool"); moveParty((r.c0 + 40) * T, r.water + 120); snapCamera(); } },
  { keys: [], n: 90 }, { n: 1, fn() { dialog.t = 0; region.script.length = 0; } }, { keys: [], n: 5, snap: true }]);
