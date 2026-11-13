// World 4: into a tunnel, his back turned (Glen 11-13): the Camp's way back to the Cave Mouth
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([
  { n: 1, fn() { const o = r4.tunnels.find(t => t.id === "camp_in"); moveParty(o.x, o.y); snapCamera(); } }, { keys: [], n: 30 },
  { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 10 }, { keys: [], n: 1, snap: true }, { keys: [], n: 20 }, { keys: [], n: 1, snap: true },
  { keys: [], n: 90, fn() { log("then: " + (roomAt(david.x) || {}).id); } },
]);
