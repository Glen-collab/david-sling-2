if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("heavySword");
region.save.taken = region.save.taken.filter(k => k !== "r3_log_gathroad");
["w3_deadtree", "w3_log_l", "w3_log_r"].forEach(kitImg);
const log = m => TEST_ERRORS.push("INFO " + m);
const X = k => (roomById("gathroad").c0 + k) * T, wl = () => r3.walls.find(w => w.kind === "log");
testRun([
  { n: 2, fn() { r3.vineT = 99; david.inv = 0; moveParty(X(90), GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 10, snap: true, fn() { log("david " + Math.round(david.x - X(0)) + "," + Math.round(david.y) + " log x0 " + Math.round(wl().x0 - X(0))); } },
  { keys: ["ArrowUp"], n: 2 }, ...Array.from({ length: 30 }, (_, i) => ({ keys: [i % 2 ? "KeyZ" : "KeyX"], n: 1 })), { keys: [], n: 1, snap: true },
  { keys: [], n: 160, fn() { log("after1 might " + (r3.might && r3.might.phase) + " hp " + wl().hp.toFixed(1) + " x " + Math.round(david.x - X(0))); } }, { n: 1, fn() { wl().hp = 1; } }, { keys: ["ArrowUp"], n: 2, fn() { log("might2 " + (r3.might && r3.might.phase) + " hp " + wl().hp); } }, ...Array.from({ length: 70 }, (_, i) => ({ keys: [i % 2 ? "KeyZ" : "KeyX"], n: 1 })), { keys: [], n: 160, snap: true, fn() { log("broken " + wl().broken); } },
  { keys: ["ArrowRight"], n: 40, fn() { log("walked to " + Math.round(david.x - X(0))); } },
]);
