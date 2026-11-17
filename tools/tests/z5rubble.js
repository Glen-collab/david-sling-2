// (Glen 11-17) the hiding rubble in the hills, on David's path: standing by it, then crouched behind it
startSetup = () => {}; setup.active = false;
const at = k => ({ n: 1, fn() { const r = roomById("hills"); moveParty((r.c0 + k) * T, FOOT); david.facing = 1; snapCamera(); for (const g of z5.guards) g.x = -9999; } });
testRun([at(36), { keys: [], n: 30, snap: true }, at(38), { keys: ["ArrowDown"], n: 30, snap: true }]);
