// (11-27) a finished Jerusalem plays again from the walls (Glen: "it just ends ... nothing to do")
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const snap = { keys: [], n: 2, snap: true };
testRun([
  { n: 1, fn() { log("start room " + (region.room && region.room.id) + " taken jr " + region.save.taken.filter(k => /^j[rx]_/.test(k)).join(",") + " foes " + jr.foes.length + " pages " + jSpreads().map(s => s.id).join(",")); } },
  { keys: [], n: 60 }, snap,
  { n: 1, fn() { log("script " + region.script.length + " cine " + !!hb.cine); } },
  { n: 1, fn() { region.script.length = 0; hb.cine = null; region.save.taken = region.save.taken.filter(k => !/^j[rx]_/.test(k)); regionWrite(); } },
]);
