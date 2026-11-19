// (11-19) the Cave Behind the Falls as one big pit over dark water: up the ledges, and a fall is a death
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const st = (w) => log(w + ": col " + Math.round(david.x / T - roomById("hollow").c0) + " y " + Math.round(david.y) + " ground " + david.onGround + " deadT " + david.deadT.toFixed(2) + " room " + region.room.id);
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); region.beasts.length = 0; const r = roomById("hollow"); moveParty((r.c0 + 64) * T, FOOT); snapCamera(); david.facing = -1; } }, { keys: [], n: 20 }, { n: 1, fn() { clear(); } },
  { keys: ["ArrowLeft"], n: 6 }, { keys: ["ArrowLeft", "KeyZ"], n: 14 }, { keys: ["ArrowLeft"], n: 4 }, { keys: [], n: 30 }, { n: 1, fn() { st("jump to the first ledge"); } }, { keys: [], n: 3, snap: true },
  { n: 1, fn() { clear(); const r = roomById("hollow"); moveParty((r.c0 + 30) * T, 300); snapCamera(); } }, { keys: [], n: 60 }, { n: 1, fn() { st("dropped in the gap"); } }, { keys: [], n: 3, snap: true }]);
