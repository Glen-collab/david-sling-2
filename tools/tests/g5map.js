// (11-19) the En-Gedi map: Cave Mouth's name stacked like the Hidden Cave Mouth's
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { region.crawl = null; g5.crawl = null; dialog.t = 0; region.script.length = 0; for (const r of REGION.rooms) if (!regionHas("explored", r.id)) regionAdd("explored", r.id); } }, { keys: [], n: 10 },
  { n: 1, fn() { bookOpen(0); } }, { keys: [], n: 40, snap: true }]);
