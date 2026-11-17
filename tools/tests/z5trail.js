// (Glen 11-17) his trail at each side path's start
startSetup = () => {}; setup.active = false;
const go = (room, k) => ({ n: 1, fn() { const r = roomById(room); moveParty((r.c0 + k - 3) * T, FOOT); david.facing = 1; snapCamera(); dialog.t = 0; } });
testRun([go("hills", 66), { keys: [], n: 40, snap: true }, go("horesh", 20), { keys: [], n: 40, snap: true }, go("maon", 24), { keys: [], n: 40, snap: true }]);
