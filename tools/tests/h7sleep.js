// (11-21) Glen's three sleeping soldiers in the Place of the Wagons: the row by the carts, and the far end (turning over)
startSetup = () => {}; setup.active = false; helpT = 0;
const at = (id, k, y = GR * T) => { const r = roomById(id); moveParty((r.c0 + k) * T, y); snapCamera(); };
const steps = [{ n: 1, fn() { at("wagons", 64, GR * T - 3 * T - 2); } }, { keys: [], n: 30, snap: true },
  { n: 1, fn() { at("wagons", 101); } }, { keys: [], n: 60, snap: true }, { keys: [], n: 150, snap: true }];
testRun(steps);
