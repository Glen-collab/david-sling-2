// World 4: the 400 (Glen 11-13): a newcomer hiding in the Cave Mouth; Up, the words (A), he gets up and goes; the Camp
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let m;
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(x => !x.startsWith("r4_man_")); m = r4.men.find(o => o.id === "r4_man_0"); m.state = "hide"; moveParty(m.x + 70, GR * T); david.facing = -1; snapCamera(); } },
  { keys: [], n: 60 }, { keys: [], n: 1, snap: true },
  { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 10 }, { keys: [], n: 1, snap: true },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 10 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 30, fn() { log("state " + m.state); } }, { keys: [], n: 1, snap: true },
  { keys: [], n: 60, fn() { log("then " + m.state + "; taken " + regionHas("taken", "r4_man_0")); } }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { const r = roomById("camp"); moveParty((r.c0 + 45) * T, GR * T); snapCamera(); } }, { keys: [], n: 60 }, { n: 1, fn() { const r = roomById("camp"); moveParty((r.c0 + 45) * T, GR * T); snapCamera(); } }, { keys: [], n: 5 }, { keys: [], n: 1, snap: true },
]);
