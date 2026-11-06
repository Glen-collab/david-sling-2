startSetup = () => {}; region.save.jAt = 9;   // (no Journal scene: tests/journal.js covers it)
 setup.active = false;
for (const id of ["g_song", "g_jonathan", "g_michal"]) if (!regionHas("taken", id)) region.save.taken.push(id); storyBuild(id => roomById(id).c0);   // (the story scenes would hold David: tests/story.js covers them)
const clr = () => { setup.active = false; dialog.t = 0; dialog.hold = false; };
const log = m => TEST_ERRORS.push("INFO " + m);
learnSkill("rope");
const C = id => roomById(id).c0;
const go = (id, c) => ({ n: 3, fn() { clr(); david.inv = 99; region.climb = null; david.harp = false; setState("idle"); moveParty((C(id) + c) * T + T / 2, 16 * T); snapCamera(); } });
const room = () => roomAt(david.x).id;
const check = (what, want, keys, n = 120) => [{ keys: [], n: 20, fn() { clr(); } }, { keys, n, fn() { clr(); } }, { keys: [], n: 60, fn() { clr(); log((room() === want ? "OK   " : "FAIL ") + what + " -> " + room() + " (want " + want + ")"); } }];
const RW = id => roomById(id).w;
testRun([
  go("deep", 2), ...check("deep cellar, off the left edge", "cisterns", ["ArrowLeft"]),
  go("cisterns", RW("cisterns") - 3), ...check("cisterns, off the right edge", "deep", ["ArrowRight"], 30),
  go("deep", 65), ...check("deep cellar, up the rope", "cellars", ["ArrowUp"], 240),
  go("town", 56), ...check("town, down the well (rope)", "cisterns", ["ArrowUp"], 6),
  go("cisterns", 4), ...check("cisterns, up the rope to the well", "town", ["ArrowUp"], 300),
]);
