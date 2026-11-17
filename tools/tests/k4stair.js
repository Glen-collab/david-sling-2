// (Glen 11-17) the town stair hidden behind a house in Keilah
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { regionAdd("taken", "k4_floors"); const r = roomById("town"); moveParty((r.c0 + 22) * T, FOOT); david.facing = 1; snapCamera(); } }, { keys: [], n: 90, snap: true }]);
