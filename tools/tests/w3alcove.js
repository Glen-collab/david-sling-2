// (Glen 11-11) the alcove: he walks in, turns and crouches (david_hide_crouch), then holds the crouch
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
kitImg("w3_hide_alcove");
const al = () => r3.hides.find(h => h.n === "w3_hide_alcove");
testRun([
  { n: 3, fn() { r3.guards.forEach(g => { g.x = -9999; }); moveParty(al().x, GR * T); snapCamera(); } }, { keys: [], n: 10 },
  { keys: ["ArrowUp"], n: 1 }, { keys: [], n: 12, snap: true, fn() { log("in: " + !!r3.inDoor); } },
  { keys: [], n: 30, snap: true }, { keys: [], n: 60, snap: true, fn() { log("held: " + !!r3.inDoor); } },
]);
