// (Glen 11-10) the button mash: David acting mad at Gath. Mash A/B fast -> the bar fills (snap 1 mid-mash), then done;
// then a second one left alone -> it runs out, "They see through it!" (snap 2)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } };
const tap = Array.from({ length: 30 }, (_, i) => [{ keys: [i % 2 ? "KeyX" : "KeyZ"], n: 1 }, { keys: [], n: 1 }]).flat();
testRun([
  { n: 30, fn: skip },
  { n: 1, fn() { startMash({ title: "David acts mad before Achish!", onDone: () => log("DONE at " + mash.t.toFixed(2) + "s, " + mash.presses + " presses") }); } },
  { keys: [], n: 80 },
  ...tap.slice(0, 40),
  { keys: [], n: 1, snap: true, fn() { log("mid level " + mash.level.toFixed(2) + " t " + mash.t.toFixed(2) + " presses " + mash.presses); } },
  ...tap, ...tap,
  { keys: [], n: 20, fn() { log("on " + mash.on + " level " + mash.level.toFixed(2)); startMash({ title: "Too slow test", onFail: () => log("FAILED as it should") }); } },
  { keys: [], n: 100 }, ...tap.slice(0, 20), { keys: [], n: 320 },
  { keys: [], n: 1, snap: true },
]);
