// (Glen 11-07) after Naioth's chase, Naioth's door goes straight to Jonathan at the stone Ezel
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const skipE = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } };
testRun([{ n: 2, fn() { for (const f of ["r2_window", "r2_samuel", "r2_naioth"]) if (!r2Has(f)) regionAdd("taken", f); region.save.taken = region.save.taken.filter(f => f !== "r2_ezel"); r2.story.jon = "wait";
    const o = region.doors.find(q => q.id === "d_naiothdown"); moveParty(o.x, GR * T); snapCamera(); } },
  { keys: [], n: 30, fn: skipE }, { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 90, fn: skipE },
  { keys: [], n: 1, fn() { log("after door: room " + region.room.id + " x " + Math.round(david.x / T - roomById(region.room.id).c0)); } },
  ...Array.from({ length: 30 }, () => ({ keys: ["ArrowLeft"], n: 4, fn: skipE })),
  { keys: [], n: 1, snap: true, fn() { log("jon " + r2.story.jon + " ezel " + r2Has("r2_ezel")); } }]);
