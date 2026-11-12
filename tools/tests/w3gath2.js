// (Glen 11-12) the lookout's rope ladder: shoot the knot, it drops, climb it; the climbing tree; the fallen tree and the sword
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("bow"); learnSkill("heavySword");
region.save.taken = region.save.taken.filter(k => !["r3_ladder_lookout", "r3_log_gathroad"].includes(k));
for (const n of ["w3_climbtree", "w3_deadtree", "w3_log_l", "w3_log_r", "w3_ladder_1", "w3_ladder_2", "w3_ladder_3", "w3_ladder_4", "f_tower"]) kitImg(n);
const log = m => TEST_ERRORS.push("INFO " + m);
const X = k => (roomById("gathroad").c0 + k) * T;
const lad = () => r3.ladders[0], wl = () => r3.walls.find(w => w.kind === "log");
const quiet = () => { r3.vines.length = 0; r3.vineT = 99; david.inv = 99; };
testRun([
  { n: 2, fn() { quiet(); const o = lad(); moveParty(o.x - 357, GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 25, fn: quiet },
  { keys: ["ArrowUp", "KeyV"], n: 2 }, { keys: ["ArrowUp"], n: 4, snap: true, fn() { quiet(); log("shot: " + lad().state); } },
  { keys: [], n: 20, snap: true, fn() { quiet(); log("then: " + lad().state); } },
  { n: 2, fn() { quiet(); moveParty(lad().x, GR * T); } }, { keys: [], n: 5 }, { keys: ["ArrowUp"], n: 70, fn: quiet }, { keys: ["ArrowRight"], n: 12, snap: true, fn() { log("up the ladder: y " + Math.round(david.y) + " (top " + Math.round(lad().top) + ") stone " + r3Has("r3_stone_gathroad")); } },
  // the fallen tree: Up by it, mash
  { n: 2, fn() { quiet(); moveParty(X(90), GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 10, fn: quiet },
  { keys: ["ArrowUp"], n: 2, fn() { log("might: " + !!r3.might); } },
  ...Array.from({ length: 60 }, (_, i) => ({ keys: [i % 2 ? "KeyZ" : "KeyX"], n: 1 })),
  { keys: [], n: 90, snap: true, fn() { log("log broken " + wl().broken + " hp " + wl().hp.toFixed(1)); } },
  // the climbing tree: up the branches
  { n: 2, fn() { quiet(); moveParty(X(110), GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 10 },
  { keys: ["ArrowRight", "KeyZ"], n: 14 }, { keys: [], n: 20, snap: true, fn() { log("tree: y " + Math.round(GR * T - david.y) + " above ground, onGround " + david.onGround); } },
]);
