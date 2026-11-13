// World 4: still at the water's surface, David treads water (Glen's clip); swimming, his stroke
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([
  { n: 1, fn() { const r = roomById("river"); r.dark = 0; moveParty((r.c0 + 66) * T, r.water + 70); region.camFootY = GR * T; snapCamera(); } },
  { keys: [], n: 20 }, { keys: [], n: 50, fn() { log("still: tread " + !!(r4.swim && r4.swim.tread) + " y " + Math.round(david.y)); } }, { keys: [], n: 1, snap: true },
  { keys: [], n: 9 }, { keys: [], n: 1, snap: true },
  { keys: ["ArrowRight"], n: 20, fn() { log("moving: tread " + !!(r4.swim && r4.swim.tread)); } }, { keys: ["ArrowRight"], n: 1, snap: true },
]);
