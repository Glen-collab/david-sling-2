// (Glen 11-10) World 3's rooms, a picture of each: the road to Nob, Nob's court, under Nob, the road down to Gath, Gath, Achish's court
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const go = (id, k, up = 0) => ({ n: 3, fn() { r3.caughtT = 0; region.wait = 0; for (const g of r3.guards) g.seen = 0; const r = roomById(id);   // (a sneak guard may have seen him: no fade back to the gate)
  moveParty((r.c0 + k) * T, GR * T - up); snapCamera(); } });
const wait = Array.from({ length: 12 }, () => ({ keys: [], n: 10, fn: skip }));
const snap = id => ({ keys: [], n: 1, snap: true, fn() { log(id + " room " + (region.room && region.room.id)); } });
testRun([
  ...wait,
  go("nobroad", 30), ...wait, snap("nobroad"),
  go("nob", 14), ...wait, snap("nob left"), go("nob", 51), ...wait, snap("nob"),
  go("crack", 20), ...wait, snap("crack"),
  go("gathroad", 60), ...wait, snap("gathroad"),
  go("gath", 20), ...wait, snap("gath"),
  go("streets", 22), ...wait, snap("streets"), go("court", 28), ...wait, snap("court"),
]);
