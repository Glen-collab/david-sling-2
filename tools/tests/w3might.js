// (Glen 11-10) "test your might": Goliath's sword at the cracked wall under Nob. Slow mashing: a dent (snap 1 mid-mash,
// snap 2 after the blow); then fast mashing: gold, the wall breaks in one (snap 3)
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
region.save.taken = region.save.taken.filter(k => !/^r3_/.test(k));
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const w3w = () => r3.walls.find(w => w.room === "crack");
const wait = n => Array.from({ length: n }, () => ({ keys: [], n: 5, fn: skip }));
const tap = (n, gap) => Array.from({ length: n }, (_, i) => [{ keys: [i % 2 ? "KeyX" : "KeyZ"], n: 1 }, { keys: [], n: gap }]).flat();
testRun([
  { n: 3, fn() { skills.add("heavySword"); const w = w3w(); w.broken = false; w.hp = R3.MIGHT.HP; moveParty(w.x0 - 40, GR * T); david.facing = 1; snapCamera(); } },
  ...wait(20),
  { keys: ["ArrowUp"], n: 1 }, { keys: [], n: 1, fn() { log("might started: " + !!r3.might); } },
  ...tap(8, 3), { keys: [], n: 1, snap: true, fn() { log("slow level " + r3.might.level.toFixed(2)); } },
  ...wait(14), { keys: [], n: 1, snap: true, fn() { log("after slow swing: hp " + Math.round(w3w().hp) + " broken " + w3w().broken); } },
  ...wait(14),
  { keys: ["ArrowUp"], n: 1, fn() { R3.MIGHT.NEED = 10; } }, ...tap(40, 1),   // (the test browser runs slowly: an easier bar, to see gold)
  { keys: [], n: 1, fn() { log("fast level " + (r3.might && r3.might.level.toFixed(2)) + " phase " + (r3.might && r3.might.phase)); } },
  ...wait(3), { keys: [], n: 1, snap: true, fn() { log("gold " + (r3.might && r3.might.gold) + " hp " + Math.round(w3w().hp) + " broken " + w3w().broken); } },
  ...wait(14), { keys: [], n: 1, snap: true, fn() { log("end: broken " + w3w().broken + " solid at hole " + isSolid(w3w().c + 2, GR - 1)); } },
]);
