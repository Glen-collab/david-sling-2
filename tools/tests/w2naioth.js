// (Glen 11-07) Naioth's walls: whole storeys repeated up (no hangings cut in half)
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const goN = (k, y) => ({ n: 3, fn() { dialog.t = 0; const r = roomById("naioth"); moveParty((r.c0 + k) * T, y); david.y = y; region.camFootY = y; snapCamera(); } });
testRun([goN(24, -460), { keys: [], n: 200, fn() { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } } }, { keys: [], n: 1, snap: true }, goN(24, 612), { keys: [], n: 30 }, { keys: [], n: 1, snap: true }]);
