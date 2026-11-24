// (11-24) the olive press by the brook Besor: it's there, and saving at it
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { regionAdd("taken", "z7_besor"); const r = roomById("besor"); moveParty((r.c0 + 17) * T, GR * T); snapCamera(); log("presses in besor: " + fires.filter(f => f.x > r.c0 * T && f.x < (r.c0 + r.w) * T).length); } },
  { keys: [], n: 10 }, { keys: ["ArrowRight"], n: 30 }, { keys: [], n: 40 }, { n: 1, fn() { log("saved at " + region.save.atRoom + " " + region.save.atOff); } }, { keys: [], n: 2, snap: true }]);
