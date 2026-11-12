// every room explored, the map page open (for Glen's art references)
startSetup = () => {}; setup.active = false;
testRun([
  { n: 5, fn() { for (const r of REGION.rooms) if (!regionHas("explored", r.id)) region.save.explored.push(r.id); bookOpen(0); } },
  { keys: [], n: 20 }, { keys: [], n: 1, snap: true },
]);
