// (11-18) the sheep in the pens, by David
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const [n, x] = g5.flock[0]; moveParty(x + 60, FOOT); snapCamera(); } }, { keys: [], n: 30, snap: true }]);
