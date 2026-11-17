// (Glen 11-17) everyone says something: Up by the woman, the boy, and a soldier in Keilah's town
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = k => { const r = roomById("town"); moveParty((r.c0 + k) * T - 50, FOOT); david.facing = 1; snapCamera(); };
testRun([{ n: 1, fn() { region.save.taken = region.save.taken.filter(t => !["k4_ephod", "k4_saul", "k4_escaped"].includes(t)); regionAdd("taken", "k4_floors"); regionAdd("taken", "k4_abiathar"); at(9); } }, { keys: [], n: 20, snap: true },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 30, snap: true, fn() { log("woman: " + JSON.stringify(dialog).slice(0, 200)); dialog.t = 0; dialog.hold = false; } },
  { keys: [], n: 10 }, { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 10, fn() { log("woman 2: " + JSON.stringify(dialog).slice(0, 200)); dialog.t = 0; dialog.hold = false; } },
  { n: 1, fn() { at(72); } }, { keys: [], n: 10 }, { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 30, snap: true, fn() { log("soldier: " + JSON.stringify(dialog).slice(0, 200)); } }]);
