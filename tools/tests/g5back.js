// (11-19) the back way home: the crack at the Wilderness's end, the Flooded Cave (swim), out into the Cave Behind the Falls
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const st = w => log(w + ": room " + region.room.id + " col " + Math.round(david.x / T - region.room.c0) + " y " + Math.round(david.y) + " swim " + !!g5.swim);
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); region.beasts.length = 0; g5.guards.length = 0; const r = roomById("wild"); moveParty((r.c0 + 146) * T, FOOT); snapCamera(); } }, { keys: [], n: 20 }, { n: 1, fn: clear }, { keys: [], n: 3, snap: true },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 150 }, { n: 1, fn() { clear(); st("in"); } }, { keys: [], n: 3, snap: true },
  { n: 1, fn() { clear(); david.inv = 0; const r = roomById("backway"); moveParty((r.c0 + 30) * T, r.water + 160); snapCamera(); } }, { keys: ["ArrowRight"], n: 30 }, { n: 1, fn() { clear(); st("swimming"); } }, { keys: ["ArrowRight"], n: 3, snap: true },
  { n: 1, fn() { clear(); const r = roomById("backway"); moveParty((r.c0 + 66) * T, G5.POOL_LEDGE); snapCamera(); } }, { keys: [], n: 10 }, { keys: ["ArrowRight"], n: 24 }, { keys: [], n: 50 }, { n: 1, fn() { clear(); st("out"); } }, { keys: [], n: 3, snap: true },
  { n: 1, fn() { clear(); log("HUD need spring " + g5Need("spring") + " of " + g5RoomFood("spring").length); } }]);
