startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^h7_/.test(k)); const r = roomById("wild"); moveParty((r.c0 + 10) * T, GR * T); snapCamera(); } }, { keys: [], n: 60 },
  { n: 1, fn() { log("room " + region.room.id + " script " + region.script.length + " wait " + region.wait + " trans " + !!region.trans + " dialog " + dialog.t + " started " + h7.started); } },
  { keys: [], n: 30, snap: true }]);
