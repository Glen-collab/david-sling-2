// World 4: look at the Cave Mouth and the Camp
startSetup = () => {}; setup.active = false;
const at = (id, k) => () => { const r = roomById(id); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
testRun([
  { n: 3, fn: at("mouth", 6) }, { keys: [], n: 40 }, { keys: [], n: 1, snap: true },
  { n: 1, fn: at("mouth", 34) }, { keys: [], n: 30 }, { keys: [], n: 1, snap: true },
  { n: 1, fn: at("camp", 14) }, { keys: [], n: 40 }, { keys: [], n: 1, snap: true },
  { n: 1, fn: at("camp", 52) }, { keys: [], n: 30 }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { for (const r of REGION.rooms) if (!regionHas("explored", r.id)) region.save.explored.push(r.id); bookOpen(0); } }, { keys: [], n: 20 }, { keys: [], n: 1, snap: true },
]);
