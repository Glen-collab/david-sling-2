// World 4: the map sheet with every room explored (Glen 11-13: room for the words)
startSetup = () => {}; setup.active = false;
testRun([
  { n: 1, fn() { for (const r of REGION.rooms) regionAdd("explored", r.id); region.mapOpen = true; region.mapT = 1; } },
  { keys: [], n: 40 }, { keys: [], n: 1, snap: true },
]);
