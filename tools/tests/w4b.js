// World 4: the lamp hall's front, the well's top, the water rooms
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (id, px, y = GR * T) => () => { const r = roomById(id); moveParty(r.c0 * T + px, y); region.camFootY = y; david.olives = 20; snapCamera(); };
const S = [];
for (const [id, px, y] of [["lamphall", 900, GR * T], ["well", 300, -3767], ["well", 600, -1500], ["river", 640, 560], ["flooded", 650, GR * T], ["deep", 1400, 500], ["spring", 640, GR * T], ["roost", 600, GR * T]])
  S.push({ n: 1, fn: at(id, px, y) }, { keys: [], n: 45, fn() { log(id + " in " + region.room.id + " y " + Math.round(david.y) + " swim " + !!r4.swim); } }, { keys: [], n: 1, snap: true });
testRun(S);
