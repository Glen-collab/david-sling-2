// World 4: a look at the rooms (Glen 11-13 rework: small pictures far off, his floors, the kit ledges)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (id, px, y = GR * T) => () => { const r = roomById(id); moveParty(r.c0 * T + px, y); region.camFootY = y; david.olives = 20; snapCamera(); };
const S = [];
for (const [id, px, y] of [["mouth", 900], ["camp", 1500], ["roost", 600], ["roost", 700, -600], ["lamphall", 900], ["lamphall", 2200], ["warren", 900],
  ["narrows", 900], ["ledges", 300], ["well", 700, -2900], ["river", 900, 560], ["flooded", 950, 600], ["spring", 700]])
  S.push({ n: 1, fn: at(id, px, y ?? GR * T) }, { keys: [], n: 40, fn() { log(id + " y " + Math.round(david.y)); } }, { keys: [], n: 1, snap: true });
testRun(S);
