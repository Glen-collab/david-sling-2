// World 4: the climbing rooms with Glen's tall pictures, bottom and top; the Cave Mouth
startSetup = () => {}; setup.active = false;
const at = (id, k, y = GR * T) => () => { const r = roomById(id); r.dark = 0; moveParty((r.c0 + k) * T, y); region.camFootY = y; snapCamera(); };
const S = [];
for (const [id, k, y] of [["mouth", 20], ["mouth", 140], ["roost", 20], ["roost", 20, -1100], ["ledges", 20], ["ledges", 20, -1100], ["well", 20, -2900], ["well", 20, -1200], ["well", 20]])
  S.push({ n: 1, fn: at(id, k, y ?? GR * T) }, { keys: [], n: 25 }, { keys: [], n: 1, snap: true });
testRun(S);
