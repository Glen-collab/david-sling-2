// (Glen 11-17) his repainted somersault (no sword): heads no longer cut off
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const air = () => { david.y = FOOT - 220; david.vy = 0; david.onGround = false; setState("flip"); };
testRun([{ n: 1, fn() { const r = roomById("hereth"); moveParty((r.c0 + 62) * T, FOOT); david.facing = 1; snapCamera(); } }, { keys: [], n: 20 },
  { n: 1, fn: air }, { keys: [], n: 3, snap: true }, { n: 1, fn: air }, { keys: [], n: 9, snap: true, fn() { log("state " + david.state + " sx " + Math.round(david.x - camX)); } }]);
