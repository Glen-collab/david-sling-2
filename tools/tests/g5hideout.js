// (11-19) Glen's hidden cave mouth: out of the camp's bright end beside it, Up back in, and on right to the pens
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const st = () => log("room " + region.room.id + " col " + Math.round(david.x / T - region.room.c0) + " y " + Math.round(david.y));
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); const r = roomById("camp"); moveParty((r.c0 + 57) * T, FOOT); snapCamera(); } }, { keys: ["ArrowRight"], n: 14 }, { keys: [], n: 50 }, { n: 1, fn() { clear(); st(); } }, { keys: [], n: 3, snap: true },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 90 }, { n: 1, fn() { clear(); st(); } }, { keys: [], n: 3, snap: true },
  { n: 1, fn() { clear(); const r = roomById("hideout"); moveParty((r.c0 + 40) * T, FOOT); snapCamera(); } }, { keys: [], n: 10, snap: true },
  { keys: ["ArrowRight"], n: 90 }, { keys: [], n: 30 }, { n: 1, fn() { clear(); st(); } }]);
