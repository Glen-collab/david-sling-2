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
  go("halls", RW("halls") - 3), ...check("halls, off the right edge", "harp", ["ArrowRight"]),
  go("harp", 2), ...check("harp room, off the left edge", "halls", ["ArrowLeft"]),
  go("walls", 125), ...check("walls, up at the stair", "cellars", ["ArrowUp"], 6),
  go("cellars", 4), ...check("cellars, up the stair", "walls", ["ArrowUp"], 6),
  go("cellars", 36), ...check("cellars, into the hole", "deep", ["ArrowRight"], 30),
]);
