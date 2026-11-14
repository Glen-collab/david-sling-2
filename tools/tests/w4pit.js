// (Glen 11-14) his pit pictures: the Mouth's sandstone, the Lamp Hall's orange, the Warren's dark; the floor spider turns at the edge
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); david.hp = 52; moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const go = (rm, k) => [{ n: 1, fn() { regionAdd("taken", "r4_lamp"); at(rm, k); } }, { keys: [], n: 60 }, { n: 1, fn() { at(rm, k); } }, { keys: [], n: 3 }, { keys: [], n: 1, snap: true }];
testRun([
  ...go("mouth", 36), ...go("mouth", 74),
  ...go("lamphall", 34), ...go("lamphall", 58),
  ...go("warren", 45), ...go("warren", 89),
]);
