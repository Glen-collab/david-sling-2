// (Glen 11-07) Gibeah's gate: Up at its door out of the city (not the screen's edge); on into the field bars it; back
// at it: barred, the men at it, can't pass
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const skipG = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const goG = (id, k) => ({ n: 3, fn() { skipG(); const r = roomById(id); moveParty((r.c0 + k) * T, GR * T); snapCamera(); } });
const waitG = n => Array.from({ length: n }, () => ({ keys: [], n: 10, fn: skipG }));
testRun([{ n: 1, fn() { region.save.taken = region.save.taken.filter(f => !["r2_gateshut", "r2_naioth", "r2_arrows"].includes(f)); } },
  goG("rooftops", 112), ...waitG(30), { keys: [], n: 1, snap: true },
  { keys: ["ArrowRight"], n: 60 }, ...waitG(5), { keys: [], n: 1, fn() { log("edge: " + region.room.id + " x " + Math.round(david.x / T - region.room.c0)); } },
  goG("rooftops", 119), ...waitG(3), { keys: ["ArrowUp"], n: 2 }, ...waitG(15),
  { keys: [], n: 1, snap: true, fn() { log("up at gate: " + region.room.id + " x " + Math.round(david.x / T - region.room.c0)); } },
  goG("gibgate", 40), { keys: ["ArrowRight"], n: 40 }, ...waitG(10), { keys: [], n: 1, fn() { log("then " + region.room.id + " shut " + r2GateShut()); } },
  goG("gibgate", 14), ...waitG(30), { keys: ["ArrowLeft"], n: 90 }, ...waitG(5),
  { keys: [], n: 1, snap: true, fn() { log("back: " + region.room.id + " x " + Math.round(david.x / T - region.room.c0)); } }]);
