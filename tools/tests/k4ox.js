// (Glen 11-17) the ox in the town's gate at the end of the floors: his head and nose seen in the gateway
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { regionAdd("taken", "k4_floors"); const r = roomById("floors"); moveParty((r.c0 + 96) * T, FOOT); david.facing = 1; snapCamera(); } }, { keys: [], n: 40, snap: true }]);
