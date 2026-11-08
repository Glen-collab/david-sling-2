// Jonathan's bow back in Gibeah: two shots, a Philistine
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const fc = roomById("fields").c0; let n = 0;
testRun([
  { n: 3, fn() { learnSkill("bow"); dialog.t = 0; moveParty((fc + 62) * T, GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 10 },
  { keys: ["ArrowUp", "KeyV"], n: 2, fn() { n = Math.max(n, stones.filter(s => s.bow).length); } }, { keys: ["ArrowUp"], n: 20, fn() { n = Math.max(n, stones.filter(s => s.bow).length); } },   // (11-07: he draws first; the arrow goes on the release)
  { keys: [], n: 60 },
  { keys: ["ArrowUp", "KeyV"], n: 2 }, { keys: ["ArrowUp"], n: 20, fn() { log("second arrow in the air: " + stones.filter(s => s.bow).length + " (first: " + n + ")"); } },
  { keys: [], n: 40, fn() { const P = region.beasts.filter(b => b.kind === "phil" && b.room === "fields"); log("Philistines: " + P.map(b => b.state + " hp " + b.hp).join(", ")); } },
]);
