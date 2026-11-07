// (Glen 11-07) the tunnel under Secu, and the cracked wall
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const go = (id, k) => ({ n: 3, fn() { dialog.t = 0; const r = roomById(id); moveParty((r.c0 + k) * T, GR * T); snapCamera(); } });
testRun([go("wtunnel", 30), { keys: [], n: 150 }, { keys: [], n: 1, snap: true }, go("wtunnel", 48), { keys: [], n: 30 }, { keys: [], n: 1, snap: true },
  go("wcrack", 12), { keys: [], n: 30 }, { keys: [], n: 1, snap: true }]);
