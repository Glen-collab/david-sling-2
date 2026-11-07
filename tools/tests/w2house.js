// (Glen 11-07) Michal's house: one Michal (at the window before, at the bed after)
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const go = k => ({ n: 3, fn() { dialog.t = 0; const r = roomById("house"); moveParty((r.c0 + k) * T, GR * T); snapCamera(); } });
testRun([go(14), { keys: [], n: 20 }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { region.save.taken.push("r2_window"); r2.story.michal = "after"; } }, go(14), { keys: [], n: 20 }, { keys: [], n: 1, snap: true }]);
