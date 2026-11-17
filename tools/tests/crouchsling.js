// (Glen 11-17) crouched (hold Down), the sling: down on one knee, whirling overhead, the stone low
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { const r = roomById("hereth"); moveParty((r.c0 + 62) * T, GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 20 },
  { keys: ["ArrowDown"], n: 15 }, { keys: ["ArrowDown", "KeyX"], n: 6, snap: true, fn() { log("h " + david.h + " charging " + david.charging); } },
  { keys: ["ArrowDown", "KeyX"], n: 30, snap: true }, { keys: ["ArrowDown"], n: 8, snap: true, fn() { log("stones " + stones.length + (stones[0] ? " y " + Math.round(david.y - stones[0].y) : "")); } }]);
