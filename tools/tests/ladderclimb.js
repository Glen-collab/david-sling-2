// (Glen 11-06) his ladder climb sprite, partway up a ladder on the Walls
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const L = ladders.filter(l => l.room === "walls")[5];
testRun([
  { n: 3, fn() { dialog.t = 0; setState("idle"); moveParty(L.x, L.botY); snapCamera(); } }, { keys: [], n: 20 },
  { keys: ["ArrowUp"], n: 30 }, { keys: [], n: 1, snap: true, fn() { TEST_ERRORS.push("INFO state " + david.state); } },
  { keys: ["ArrowUp"], n: 8 }, { keys: [], n: 1, snap: true },
]);
