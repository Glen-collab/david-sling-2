// (Glen 11-07) Naioth: its creatures (where, and that a few stones take them)
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 2, fn() { const r = roomById("naioth"); log("naioth beasts " + JSON.stringify(region.beasts.filter(b => b.room === "naioth").map(b => [b.kind, Math.round(b.x / T - r.c0), Math.round(b.y)]))); } },
  { n: 3, fn() { dialog.t = 0; const r = roomById("naioth"); moveParty((r.c0 + 30) * T, -250); david.y = -250; region.camFootY = -250; snapCamera(); } },
  { keys: [], n: 200, fn() { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; } }, { keys: [], n: 1, snap: true, fn() { log("alive " + david.hearts); } }]);
