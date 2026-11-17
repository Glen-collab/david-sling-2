// (Glen 11-17) the wider mountain: the lines close steadily the whole minute, and stand (not walk in place) when stopped
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = t => ({ n: 1, fn() { const S = z5.siege; S.t = t; S.extra = 0; region.script.length = 0; dialog.t = 0; const E = z5SiegeEdges(), c0 = roomById("mountain").c0; log("t " + t + ": lines at cols " + (E[0] / T - c0).toFixed(1) + " / " + (E[1] / T - c0).toFixed(1)); } });
testRun([{ n: 1, fn() { ["z5_jonathan", "z5_jonathan_gone", "z5_erem", "z5_warned"].forEach(t => regionAdd("taken", t)); region.save.taken = region.save.taken.filter(t => !["z5_surrounded", "z5_rescued", "g_exit_open"].includes(t)); const r = roomById("mountain"); moveParty((r.c0 + 20) * T, FOOT); david.facing = 1; snapCamera(); } },
  { keys: [], n: 20 }, { n: 1, fn() { if (!z5.siege) z5SiegeStart(); } }, { keys: [], n: 5 },
  at(0), at(15), at(30), at(45), at(59.5),
  { n: 1, fn() { z5.siege.t = 30; region.script.length = 0; dialog.t = 0; dialog.hold = false; z5.pose = null; david.x = z5SiegeEdges()[0] + 300; snapCamera(); } }, { keys: [], n: 20, snap: true, fn() { log("room w " + roomById("mountain").w + " t " + z5.siege.t.toFixed(1)); } }]);
