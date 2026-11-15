// (11-14) Glen's layers: the forest and the road
startSetup = () => {}; setup.active = false;
const at = (rm, k, y = GR * T) => { const r = roomById(rm); david.hp = 52; moveParty((r.c0 + k) * T, y); snapCamera(); };
const go = (rm, k) => [{ n: 1, fn() { at(rm, k); } }, { keys: [], n: 60 }, { n: 1, fn() { at(rm, k); } }, { keys: [], n: 3 }, { keys: [], n: 1, snap: true }];
testRun([...go("hereth", 12), ...go("hereth", 75), ...go("hereth", 110), ...go("road", 20), ...go("road", 80), ...go("road", 130)]);
