// World 4 long rooms (Glen 11-13: "Make the rooms long and fun"): a look along each, the dark off
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (id, k, y = GR * T) => () => { const r = roomById(id); r.dark = 0; moveParty((r.c0 + k) * T, y); region.camFootY = Math.min(y, GR * T); david.olives = 20; snapCamera(); };
const S = [];
for (const [id, k, y] of [["mouth", 45], ["mouth", 84], ["mouth", 125], ["camp", 85], ["lamphall", 60], ["lamphall", 108], ["warren", 60], ["warren", 95], ["warren", 135],
  ["narrows", 80], ["river", 52, 590], ["river", 88, 590], ["flooded", 70, 600], ["deep", 72, 600], ["spring", 60]])
  S.push({ n: 1, fn: at(id, k, y ?? GR * T) }, { keys: [], n: 25, fn() { log(id + " " + k + " x " + Math.round(david.x - roomById(id).c0 * T) + " y " + Math.round(david.y) + " hp " + david.hp); } }, { keys: [], n: 1, snap: true });
testRun(S);
