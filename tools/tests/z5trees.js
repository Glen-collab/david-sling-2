// (Glen 11-17) his trees in Ziph and its side paths
startSetup = () => {}; setup.active = false;
const go = (room, k) => ({ n: 1, fn() { const r = roomById(room); moveParty((r.c0 + k) * T, FOOT); david.facing = 1; snapCamera(); dialog.t = 0; } });
testRun([go("thicket", 36), { keys: [], n: 40, snap: true }, go("wadi", 20), { keys: [], n: 40, snap: true }, go("horesh", 26), { keys: [], n: 40, snap: true }, go("goatpath", 40), { keys: [], n: 40, snap: true }]);
