// (11-15) Glen's ox in the gate at the floors; his townsman (lunging) and townswoman (throwing a pot) on the run
startSetup = () => {}; setup.active = false;
const at = (rm, k, y = GR * T) => { const r = roomById(rm); david.hp = 52; moveParty((r.c0 + k) * T, y); snapCamera(); };
testRun([{ n: 1, fn() { regionAdd("taken", "k4_floors"); at("floors", 97); } }, { keys: [], n: 90 }, { n: 1, fn() { at("floors", 97); } }, { keys: [], n: 3, snap: true },
  { n: 1, fn() { region.save.taken = region.save.taken.filter(t => t !== "k4_escaped"); at("escape", 24); } }, { keys: [], n: 30 },
  { n: 1, fn() { k4RunStart(); k4.run.potT = 99; } }, { keys: [], n: 10 },
  { n: 1, fn() { const g = k4.grabbers[0]; david.x = g.x0 - 300; snapCamera(); Object.assign(g, { state: "step", t: 0.5, x: g.x0 }); k4.throwers.push({ x: david.x + 600, t: 0.75, thrown: false }); } }, { keys: [], n: 8, snap: true }]);
