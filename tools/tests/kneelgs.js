// (Glen 11-17) Down: down on one knee, then lower to hide; a low sling throw, then held on one knee while Down is held
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { skills.add("heavySword"); const r = roomById("nobroad"); moveParty((r.c0 + 20) * T, FOOT); david.facing = 1; snapCamera(); } }, { keys: [], n: 20 },
  { keys: ["ArrowDown"], n: 12, snap: true }, { keys: ["ArrowDown"], n: 50, snap: true, fn() { log("state " + david.state + " t " + david.t.toFixed(2)); } },
  { keys: ["ArrowDown", "KeyX"], n: 3 }, { keys: ["ArrowDown"], n: 60, snap: true, fn() { log("after throw " + david.state + " kneel " + david.kneelAfterThrow + " throwT " + david.throwT); } }]);
