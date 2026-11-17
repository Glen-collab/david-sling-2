// (Glen 11-17) the townspeople of Keilah beside David: their sizes
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = k => [{ n: 1, fn() { const r = roomById("town"); moveParty((r.c0 + k) * T, FOOT); david.facing = 1; snapCamera(); } }, { keys: [], n: 30, snap: true }];
testRun([{ n: 1, fn() { regionAdd("taken", "k4_floors"); regionAdd("taken", "k4_abiathar"); region.save.taken = region.save.taken.filter(t => !["k4_ephod", "k4_saul"].includes(t)); } }, ...at(43), ...at(64), ...at(89), ...at(14)]);
