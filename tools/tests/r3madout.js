// (Glen 11-17) acting mad: before the king in the court; thrown out; again for the guard at the door; then away right
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const skipSay = () => { if (dialog.t > 0) { dialog.t = 0; dialog.hold = false; } };
const mashAll = n => Array.from({ length: n }, (_, i) => ({ keys: [i % 2 ? "KeyZ" : "KeyX"], n: 1, fn: skipSay }));
testRun([{ n: 1, fn() { regionAdd("taken", "r3_gath"); region.save.taken = region.save.taken.filter(t => t !== "r3_mad" && t !== "g_exit_open"); const r = roomById("court"); moveParty((r.c0 + 20) * T, FOOT); david.facing = 1; snapCamera(); } },
  { keys: ["ArrowRight"], n: 40 }, ...mashAll(400), { keys: [], n: 5, snap: true, fn() { log("room " + region.room.id + " mad " + r3Has("r3_mad") + " x " + Math.round(david.x / T - region.room.c0)); skipSay(); } },
  ...mashAll(200), { keys: [], n: 20, snap: true, fn() { log("room " + region.room.id + " mad " + r3Has("r3_mad") + " script " + region.script.length); skipSay(); } },
  { keys: ["ArrowRight"], n: 60 }, { keys: [], n: 10, snap: true, fn() { log("exit " + regionHas("taken", "g_exit_open") + " say " + dialog.say); } }]);
