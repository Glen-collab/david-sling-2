// (Glen 11-12) the road down to Gath with his props: palms and dates, the lookout's rope ladder, thorns, vine balls,
// the fallen tree (Goliath's sword), the climbing tree
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("bow"); learnSkill("heavySword");
region.save.taken = region.save.taken.filter(k => !["r3_ladder_lookout", "r3_log_gathroad"].includes(k));
for (const n of ["w3_palm", "w3_palm_b", "w3_dates_1", "w3_dates_2", "w3_dates_3", "w3_climbtree", "w3_deadtree", "w3_log_l", "w3_log_r", "w3_thorns", "w3_vineball", "w3_ladder_1", "w3_ladder_2", "w3_ladder_3", "w3_ladder_4", "f_tower"]) kitImg(n);
const log = m => TEST_ERRORS.push("INFO " + m);
const X = k => (roomById("gathroad").c0 + k) * T;
const at = (k, n = 30, snap = true, fn) => [{ n: 2, fn() { moveParty(X(k), GR * T); david.facing = 1; snapCamera(); r3.vines.length = 0; r3.vineT = 99; david.inv = 99; } }, { keys: [], n, snap, fn }];
const lad = () => r3.ladders[0];
testRun([
  ...at(16),
  ...at(52, 30, true, () => log("ladder " + lad().state + " x " + Math.round(lad().x - X(0)) + " top " + Math.round(lad().top))),
  { n: 2, fn() { const o = lad(); moveParty(o.x - Math.round((GR * T - 72 - o.top - 14) / Math.tan(0.62)), GR * T); david.facing = 1; snapCamera(); } },
  { keys: ["ArrowUp", "KeyV"], n: 2 }, { keys: ["ArrowUp"], n: 20, fn() { log("after shot: " + lad().state); } },
  { keys: [], n: 20, snap: true, fn() { log("then: " + lad().state + " ladders " + ladders.filter(l => l.room === "gathroad").length); } },
  { n: 2, fn() { moveParty(lad().x, GR * T); } }, { keys: ["ArrowUp"], n: 60, snap: true, fn() { log("climbed: y " + Math.round(david.y) + " top " + Math.round(lad().top) + " state " + david.state); } },
  ...at(74, 30, true, () => { david.inv = 0; }),
  { n: 2, fn() { david.inv = 0; moveParty(X(68), GR * T); david.facing = 1; } }, { keys: ["KeyV"], n: 3 }, { keys: [], n: 20, fn() { log("thorns cut: " + r3.thorns.map(b => b.cut).join(",") + " hearts " + david.hearts.toFixed(1)); } },
  ...at(84, 30, true, () => log("log solid at " + solid[GR - 3][roomById("gathroad").c0 + 90])),
  ...at(112, 30, true),
  { n: 2, fn() { r3.vineT = 0; david.inv = 99; moveParty(X(50), GR * T); snapCamera(); } }, { keys: [], n: 40, snap: true, fn() { log("vines " + r3.vines.length); } },
]);
