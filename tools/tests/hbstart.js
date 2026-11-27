// (11-27, Glen: "start Hebron in only Hebron levels") a fresh Hebron: in Hebron with the families behind him, walking up
//  to the men of Judah (run after clearing Hebron's save)
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const snap = { keys: [], n: 2, snap: true };
testRun([
  { n: 1, fn() { log("start " + region.room.id + " col " + Math.round(david.x / T - region.room.c0) + " taken " + region.save.taken.join(",")); } }, { keys: [], n: 20 }, snap,
  { keys: ["ArrowRight"], n: 200 }, { keys: [], n: 20 }, { n: 1, fn() { log("walked: col " + Math.round(david.x / T - region.room.c0) + " script " + region.script.length + " follow " + hb.followOn + " " + hb.follow.map(f => Math.round(f.x / T - region.room.c0)).join(",")); } }, snap,
]);
