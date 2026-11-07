// (Glen 11-07) the gate with a finished story in the save
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { for (const f of ["r2_window", "r2_samuel", "r2_naioth", "r2_gateshut"]) if (!r2Has(f)) regionAdd("taken", f); const r = roomById("gibgate"); moveParty((r.c0 + 13) * T, GR * T); snapCamera(); } },
  ...Array.from({ length: 30 }, () => ({ keys: [], n: 10, fn() { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } } })),
  { keys: [], n: 1, snap: true, fn() { log("shut " + r2GateShut() + " arrows " + r2Has("r2_arrows") + " night " + r2NightAmount(region.room).toFixed(2) + " room " + region.room.id); } }]);
