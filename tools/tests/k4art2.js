// (11-14) Glen's layers: the floors (ground and up high), Keilah by day and by night, the street, the hills
startSetup = () => {}; setup.active = false;
const at = (rm, k, y = GR * T) => { const r = roomById(rm); david.hp = 52; moveParty((r.c0 + k) * T, y); snapCamera(); };
const go = (rm, k, y) => [{ n: 1, fn() { at(rm, k, y); } }, { keys: [], n: 60 }, { n: 1, fn() { at(rm, k, y); } }, { keys: [], n: 3 }, { keys: [], n: 1, snap: true }];
testRun([{ n: 1, fn() { region.save.taken = region.save.taken.filter(t => t !== "k4_ephod"); } }, ...go("floors", 30), ...go("floors", 60, 300), ...go("town", 40),
  { n: 1, fn() { regionAdd("taken", "k4_ephod"); } }, ...go("town", 80), ...go("escape", 60), ...go("hills", 25)]);
