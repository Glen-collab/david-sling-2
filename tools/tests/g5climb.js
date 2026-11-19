// (11-18) out of the pool onto the rocks left of the falls (a leap at the surface)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("pool"); moveParty((r.c0 + 81) * T, r.water + 100); snapCamera(); } },
  { keys: [], n: 120 }, { n: 1, fn() { dialog.t = 0; region.script.length = 0; log("swim " + !!g5.swim + " y " + Math.round(david.y)); } },
  { keys: ["KeyZ", "ArrowRight"], n: 2 }, ...Array.from({ length: 16 }, () => [{ keys: ["ArrowRight"], n: 4 }, { n: 1, fn() { log("col " + (david.x / T - roomById("pool").c0).toFixed(1) + " y " + Math.round(david.y) + " vy " + Math.round(david.vy) + " g " + david.onGround + " sw " + !!g5.swim); } }]).flat(), { keys: [], n: 20 },
  { n: 1, fn() { const r = roomById("pool"); log("after leap: col " + (david.x / T - r.c0).toFixed(1) + " y " + Math.round(david.y) + " ground " + david.onGround + " swim " + !!g5.swim); } }, { keys: [], n: 5, snap: true }]);
