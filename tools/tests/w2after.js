// (Glen 11-07) after Naioth's chase: the arrow over the door out; Samuel says where Jonathan is
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 2, fn() { for (const f of ["r2_window", "r2_samuel", "r2_naioth"]) if (!r2Has(f)) regionAdd("taken", f); region.save.taken = region.save.taken.filter(f => f !== "r2_ezel");
    const r = roomById("naioth"); moveParty((r.c0 + 10) * T, GR * T); snapCamera(); } },
  ...Array.from({ length: 40 }, () => ({ keys: [], n: 10, fn() { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } } })), { keys: [], n: 1, snap: true },
  { n: 2, fn() { moveParty(r2.samNX + 40, GR * T); snapCamera(); } }, { keys: [], n: 20 }, { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 30, snap: true, fn() { log("dialog " + (dialog.t > 0)); } }]);
