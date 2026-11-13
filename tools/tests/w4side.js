// World 4: the side rooms (Glen 11-13): the Warren's rubble (Goliath's sword, Up), then in; a look at each room
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const where = () => (roomAt(david.x) || {}).id + " x " + Math.round(david.x - roomAt(david.x).c0 * T);
const toTun = id => () => { const o = r4.tunnels.find(t => t.id === id); roomById(o.room).dark = 0; david.hearts = david.maxHearts; moveParty(o.x, o.y); region.camFootY = o.y; snapCamera(); };
const at = (id, k) => () => { const r = roomById(id); r.dark = 0; moveParty((r.c0 + k) * T, GR * T); region.camFootY = GR * T; snapCamera(); };
const S = [{ n: 1, fn() { learnSkill("heavySword"); region.save.taken = region.save.taken.filter(x => !x.startsWith("r4_open_")); } }, { keys: [], n: 30 }];
S.push({ n: 1, fn: toTun("warren_side1") }, { keys: [], n: 60 }, { n: 1, fn: toTun("warren_side1") }, { keys: [], n: 10 }, { keys: [], n: 1, snap: true },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 30, fn() { log("Up once: open " + regionHas("taken", "r4_open_warren_side1") + " in " + where()); } }, { keys: [], n: 1, snap: true },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 120, fn() { log("Up again: " + where()); } });
for (const [id, k] of [["nook", 25], ["larder", 25], ["stones", 25], ["oilstore", 25]]) S.push({ n: 1, fn: at(id, k) }, { keys: [], n: 90 }, { n: 1, fn: at(id, k) }, { keys: [], n: 10 }, { keys: [], n: 1, snap: true });
testRun(S);
