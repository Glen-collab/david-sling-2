// World 4: Glen's new swim and his sword stroke in the water (mid-swing)
startSetup = () => {}; setup.active = false;
let st = -1;
const hold = () => { if (st >= 0) david.swordT = st; };
testRun([
  { n: 1, fn() { const r = roomById("river"); r.dark = 0; moveParty((r.c0 + 60) * T, r.water + 130); region.camFootY = GR * T; snapCamera(); } },
  { keys: ["ArrowRight"], n: 30 }, { keys: ["ArrowRight"], n: 1, snap: true },
  { n: 1, fn() { st = 0.15; hold(); } }, { keys: [], n: 1, fn: hold }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { st = 0.25; hold(); } }, { keys: [], n: 1, fn: hold }, { keys: [], n: 1, snap: true },
]);
