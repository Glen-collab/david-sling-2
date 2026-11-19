// (11-18) the Spring's pits: plain water, no pool picture
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; region.beasts.length = 0; const r = roomById("spring"); moveParty((r.c0 + 37) * T, FOOT); snapCamera(); } },
  { keys: [], n: 30, snap: true }]);
