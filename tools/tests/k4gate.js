// (11-14) Glen's gate kit: the town gate from the floors, the inner gate, the gate closing on the run
startSetup = () => {}; setup.active = false;
const at = (rm, k, y = GR * T) => { const r = roomById(rm); david.hp = 52; moveParty((r.c0 + k) * T, y); snapCamera(); };
const go = (rm, k) => [{ n: 1, fn() { at(rm, k); } }, { keys: [], n: 40 }, { n: 1, fn() { at(rm, k); } }, { keys: [], n: 3 }, { keys: [], n: 1, snap: true }];
const drop = id => ({ n: 1, fn() { region.save.taken = region.save.taken.filter(t => t !== id); } });
testRun([drop("k4_floors"), drop("k4_ephod"), ...go("floors", 96), { n: 1, fn() { regionAdd("taken", "k4_floors"); } }, ...go("floors", 96),
  ...go("town", 96), { n: 1, fn() { regionAdd("taken", "k4_ephod"); } }, ...go("town", 96),
  ...go("escape", 205), { n: 1, fn() { region.save.taken = region.save.taken.filter(t => t !== "k4_escaped"); } }, { keys: [], n: 5 }, ...[0.3, 0.6, 0.99].map(v => ({ n: 1, fn() { k4RunStart(); k4.run.t = k4.run.close * v; k4.run.shut = v; }, snap: true }))]);
