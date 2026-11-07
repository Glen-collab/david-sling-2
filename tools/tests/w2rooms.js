// (Glen 11-06) World 2: a look at every room (snap each), and anything that throws
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const go = (id, k = 6, y = null) => ({ n: 3, fn() { dialog.t = 0; const r = roomById(id); moveParty((r.c0 + k) * T, y ?? GR * T); if (y != null) { david.y = y; region.camFootY = y; } snapCamera(); } });
const steps = [];
for (const [id, k, y] of [["house", 8], ["palace", 8, -900], ["palace", 30], ["rooftops", 26], ["field", 30], ["road", 40], ["secu", 24], ["shaft", 10], ["shaft", 18, -600], ["wtunnel", 20], ["wcrack", 14], ["ramah", 30], ["naioth", 20], ["naioth", 20, -460], ["feast", 8]]) {
  steps.push(go(id, k, y), { keys: [], n: 40, fn() { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } } }, { keys: [], n: 1, snap: true, fn() { log(id + " room " + (region.room && region.room.id) + " d " + Math.round(david.x / T) + "," + Math.round(david.y) + " guards " + r2.guards.filter(g => g.room === id).length + " wolves " + r2.wolves.filter(g => g.room === id).length + " ladders " + region.ladders.filter(l => l.room === id).length); } });
}
testRun(steps);
