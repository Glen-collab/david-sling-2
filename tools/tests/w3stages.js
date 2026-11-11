// (Glen 11-10) his five cracked-wall stages: whole, after hits 1-3, broken through (one snap each)
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
region.save.taken = region.save.taken.filter(k => !/^r3_/.test(k));
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const w3w = () => r3.walls.find(w => w.room === "crack");
const wait = n => Array.from({ length: n }, () => ({ keys: [], n: 5, fn: skip }));
const st = (hits, broken) => ({ keys: [], n: 2, snap: true, fn() { const w = w3w(); w.hits = hits; w.broken = broken; if (broken) r3WallOpen(w); TEST_ERRORS.push("INFO stage " + r3WallStage(w)); } });
testRun([
  { n: 3, fn() { const w = w3w(); moveParty(w.x0 - 200, GR * T); david.facing = 1; snapCamera(); } },
  ...wait(20), st(0, false), st(1, false), st(2, false), st(3, false), st(3, true),
  { keys: ["ArrowRight"], n: 40 }, { keys: [], n: 2, snap: true, fn() { TEST_ERRORS.push("INFO walked to x " + Math.round(david.x) + " wall x1 " + w3w().x1); } },
]);
