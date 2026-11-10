// (Glen 11-10) World 3's rooms, a picture of each: the road to Nob, Nob's court, under Nob, the road down to Gath, Gath, Achish's court
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const go = (id, k, up = 0) => ({ n: 3, fn() { const r = roomById(id); moveParty((r.c0 + k) * T, GR * T - up); snapCamera(); } });
const wait = Array.from({ length: 12 }, () => ({ keys: [], n: 10, fn: skip }));
const snap = id => ({ keys: [], n: 1, snap: true, fn() { log(id + " room " + (region.room && region.room.id)); } });
testRun([
  ...wait,
  go("nobroad", 30), ...wait, snap("nobroad"),
  go("nob", 22), ...wait, snap("nob"),
  go("crack", 20), ...wait, snap("crack"),
  go("gathroad", 60), ...wait, snap("gathroad"),
  go("gath", 20), ...wait, snap("gath"),
  go("court", 30), ...wait, snap("court"),
]);
