// (Glen 11-07) Naioth's ladders: not stacked one over another
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const goL = (k, y) => ({ n: 3, fn() { dialog.t = 0; const r = roomById("naioth"); moveParty((r.c0 + k) * T, y); david.y = y; region.camFootY = y; snapCamera(); } });
const hold = { keys: [], n: 150, fn() { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; } };
testRun([{ n: 1, fn() { const r = roomById("naioth"); log("ladders " + JSON.stringify(region.ladders.filter(l => l.room === "naioth").map(l => [Math.round(l.x / T - r.c0 - 1), l.top, l.bot]))); } },
  goL(12, 170), hold, { keys: [], n: 1, snap: true }, goL(40, 170), hold, { keys: [], n: 1, snap: true }]);
