// (11-15) Glen's kit in Ziph: the stronghold and hiding rocks, a signal fire cold and lit, the rock of escape
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const go = (rm, k, f) => [{ n: 1, fn() { at(rm, k); } }, { keys: [], n: 40 }, { n: 1, fn() { at(rm, k); if (f) f(); } }, { keys: [], n: 8 }, { keys: [], n: 1, snap: true }];
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !k.startsWith("z5_")); ["z5_ziph_told", "z5_ziphites", "z5_warned"].forEach(k => regionAdd("taken", k)); } },
  ...go("hills", 14),
  ...go("hachilah", 22, () => { z5.lookouts[0].lit = true; z5.lookouts[0].state = "watch"; }),
  ...go("mountain", 74, () => { regionAdd("taken", "z5_rescued"); }),
]);
