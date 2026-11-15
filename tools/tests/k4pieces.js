// (11-15) Glen's prayer rock (Hereth), threshing floors (ground and terraces), the hung log on the night street
startSetup = () => {}; setup.active = false;
["w4_prayer_rock", "w4_threshing_floor", "w4_hanging_log"].forEach(kitImg);
const at = (rm, k, y = GR * T) => { const r = roomById(rm); david.hp = 52; moveParty((r.c0 + k) * T, y); snapCamera(); };
const go = (rm, k, y) => [{ n: 1, fn() { at(rm, k, y); } }, { keys: [], n: 40 }, { n: 1, fn() { at(rm, k, y); } }, { keys: [], n: 3 }, { keys: [], n: 1, snap: true }];
testRun([...go("hereth", 38), ...go("floors", 18), ...go("floors", 34, 450), ...go("escape", 40)]);
