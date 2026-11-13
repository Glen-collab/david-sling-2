// World 4: every room (and up the tall ones), after the lamp
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (id, px, y = GR * T) => () => { const r = roomById(id); moveParty(r.c0 * T + px, y); region.camFootY = y; david.olives = 20; snapCamera(); };
const S = [];
for (const [id, px, y] of [["roost", 600, GR * T], ["roost", 300, -272], ["roost", 600, -1182], ["lamphall", 900, GR * T], ["lamphall", 2300, GR * T],
  ["warren", 700, 468], ["narrows", 640, GR * T], ["ledges", 640, GR * T], ["ledges", 640, -972], ["ledges", 1100, -1707],
  ["well", 300, -3767], ["well", 700, -2000], ["well", 600, GR * T], ["river", 640, 560], ["flooded", 650, GR * T], ["deep", 1400, 500], ["spring", 640, GR * T]])
  S.push({ n: 1, fn: at(id, px, y) }, { keys: [], n: 45, fn() { log(id + " y " + Math.round(david.y) + " swim " + !!r4.swim); } }, { keys: [], n: 1, snap: true });
S.push({ n: 1, fn() { for (const r of REGION.rooms) if (!regionHas("explored", r.id)) region.save.explored.push(r.id); bookOpen(0); } }, { keys: [], n: 20 }, { keys: [], n: 1, snap: true });
testRun(S);
