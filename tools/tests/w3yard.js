// (Glen 11-12) Achish's palace door, the cracked wall, Goliath's yard (pit, step, broken bridge with a rope, thorns, his door)
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("heavySword"); regionAdd("taken", "r3_wall_streets");
for (const n of ["w3_palace_door", "w3_goliath_door", "w3_bridge_l", "w3_bridge_m1", "w3_bridge_m2", "w3_bridge_r", "w3_thorns", "w3_rope_4"]) kitImg(n);
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (room, k, f) => [{ n: 2, fn() { moveParty((roomById(room).c0 + k) * T, GR * T); david.facing = 1; snapCamera(); r3.vines.length = 0; r3.vineT = 99; david.inv = 99; for (const g of r3.guards) g.x = -9999; if (f) f(); } }, { keys: [], n: 25, snap: true }];
testRun([
  ...at("streets", 99), ...at("giantyard", 14), ...at("giantyard", 40, () => log("yard c0 " + roomById("giantyard").c0)), ...at("giantyard", 60), ...at("giantyard", 85),
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 60, snap: true, fn() { log("after Up at his door: room " + region.room.id); } },
]);
