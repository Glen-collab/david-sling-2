// World 4: Glen's new swim and his sword stroke in the water (mid-swing, held there for the picture)
startSetup = () => {}; setup.active = false;
testRun([
  { n: 1, fn() { const r = roomById("river"); r.dark = 0; moveParty((r.c0 + 60) * T, r.water + 130); region.camFootY = GR * T; snapCamera(); } },
  { keys: ["ArrowRight"], n: 30 }, { keys: ["ArrowRight"], n: 1, snap: true },
  { n: 1, fn() { david.swordT = 0.17; W9.SWORD_TIME = 99; } }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { david.swordT = 0.24; } }, { keys: [], n: 1, snap: true },
]);
