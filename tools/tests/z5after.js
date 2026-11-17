// (Glen 11-17) the mountain after Saul's men go: ibex, birds, a caracal and the hyrax family come out
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const count = () => region.beasts.filter(b => b.room === "mountain" && !beastAway(b)).map(b => b.kind).join(",");
testRun([{ n: 1, fn() { region.save.taken = region.save.taken.filter(t => t !== "z5_rescued"); log("before: " + count()); regionAdd("taken", "z5_rescued"); log("after: " + count());
    const r = roomById("mountain"); moveParty((r.c0 + 156) * T, FOOT); david.facing = 1; snapCamera(); } },
  { keys: [], n: 40, snap: true }]);
