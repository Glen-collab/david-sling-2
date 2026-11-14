// (Glen 11-14) the Bat Roost's bats, up its height: they wake when he's under them and fly at him, there, not down at the floor
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let b;
testRun([
  { n: 1, fn() { b = region.beasts.filter(o => o.room === "roost" && o.kind === "bat2").sort((p, q) => p.hy - q.hy)[1]; david.hp = david.maxHp || david.hp; moveParty(b.x + 120, b.hy + 200); snapCamera(); log("bat at " + Math.round(b.hy)); } },
  { keys: [], n: 60, fn() { log("state " + b.state + " y " + Math.round(b.y) + " david " + Math.round(david.y)); } }, { keys: [], n: 1, snap: true },
]);
