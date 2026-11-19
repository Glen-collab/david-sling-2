// (11-19) the Spring's falls and cave mouth (cut from the pool's picture)
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; region.beasts.length = 0; g5.guards.length = 0; moveParty(g5.falls - 260, FOOT); snapCamera(); } },
  { keys: [], n: 40 }, { n: 1, fn() { dialog.t = 0; region.script.length = 0; } }, { keys: [], n: 5, snap: true }]);
