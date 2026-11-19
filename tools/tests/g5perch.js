// (11-19) the eagle sitting on its high perch
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("rocks"); moveParty((r.c0 + 52) * T, FOOT); snapCamera(); const e = region.beasts.find(b => b.kind === "eagle"); e.cool = 99; } },
  { keys: [], n: 3, snap: true }]);
