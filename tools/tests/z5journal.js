// (11-16) Ziph's Journal page at the end, with Erem's line in the margin
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([
  { keys: [], n: 20, fn() { ["z5_jonathan", "z5_ziphites", "z5_surrounded", "z5_rescued", "z5_erem"].forEach(k => regionAdd("taken", k)); jsceneOpen(true); } },
  { keys: [], n: 1500 }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { log("aside " + region.jscene.aside); } },
]);
