// (Glen 11-07) Naioth's door out (left end, on the floor)
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 3, fn() { dialog.t = 0; const r = roomById("naioth"); moveParty((r.c0 + 8) * T, GR * T); snapCamera(); } },
  ...Array.from({ length: 60 }, () => ({ keys: [], n: 10, fn() { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; } })),
  { keys: [], n: 1, snap: true, fn() { log("loaded door " + !!kitImg("hall_door") + " walk " + !!kitImg("walk_left")); } }]);
