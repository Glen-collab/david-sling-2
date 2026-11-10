// (Glen 11-09) Player 2 stays for the whole game: saved from an earlier stage, they come back on their own; Ramah: the armor-bearer only
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
localStorage.setItem(P2_KEY, "abishai"); p2.on = false; p2.rejoined = false;
testRun([
  { keys: [], n: 30 }, { keys: [], n: 1, snap: true, fn() { log("on " + p2.on + " who " + p2.who + " roster " + p2Roster().join(",")); } },
  { keys: [], n: 1, fn() { p2Leave(); log("left: on " + p2.on + " saved " + p2Saved()); } }, { keys: [], n: 30 },
  { keys: [], n: 1, fn() { log("after: on " + p2.on); } },
]);
