// (Glen 11-12) the Road to Nob's tower: no dirt behind it, in front of the ground
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
kitImg("f_tower_low");
testRun([
  { n: 3, fn() { const r = roomById("nobroad"); moveParty((r.c0 + 66) * T, GR * T); snapCamera(); } },
  { keys: [], n: 400 }, { keys: [], n: 2, snap: true },
]);
