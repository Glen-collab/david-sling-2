// (Glen 11-14) his pit pictures: the Mouth's sandstone, the Lamp Hall's orange, the Warren's dark; the floor spider turns at the edge
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); david.hp = 52; moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const go = (rm, k) => [{ n: 1, fn() { regionAdd("taken", "r4_lamp"); roomById("warren").dark = 0.2; at(rm, k); } }, { keys: [], n: 60 }, { n: 1, fn() { at(rm, k); } }, { keys: [], n: 3 }, { keys: [], n: 1, snap: true }];
testRun([
  ...go("mouth", 36), ...go("mouth", 119),
  ...go("lamphall", 36), ...go("lamphall", 83),
  ...go("warren", 44), ...go("warren", 75),
]);
