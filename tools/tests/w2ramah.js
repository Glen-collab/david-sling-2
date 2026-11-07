// (Glen 11-07) Ramah: the door to Naioth in its wall at the end; the townsfolk's sizes
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const go = k => ({ n: 3, fn() { dialog.t = 0; const r = roomById("ramah"); moveParty((r.c0 + k) * T, GR * T); snapCamera(); } });
testRun([go(74), { keys: [], n: 60, fn() { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } } }, { keys: [], n: 1, snap: true }, go(66), { keys: [], n: 30 }, { keys: [], n: 1, snap: true }]);
