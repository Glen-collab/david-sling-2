// (11-19) the sword under water, in the pool (and Adullam with ?#9-8)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const peek = w => log(w + " swim " + !!(typeof g5 !== "undefined" ? g5.swim : r4.swim) + " swordT " + david.swordT + " throwT " + david.throwT + " shield " + david.shield + " rs " + regionSword() + " harp " + david.harp);
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); const r = (typeof G5 !== "undefined") ? roomById("pool") : REGION.rooms.find(o => o.water); log("room " + r.id); moveParty((r.c0 + 20) * T, r.water + 200); snapCamera(); } },
  { keys: ["ArrowRight"], n: 30 }, { n: 1, fn() { clear(); peek("before"); log("x " + Math.round(david.x - camX) + " y " + Math.round(david.y)); } }, { keys: [], n: 1, snap: true }, { keys: ["KeyV"], n: 2 }, { keys: [], n: 60 }, { n: 1, fn() { peek("mid"); } }, { keys: ["KeyV"], n: 1 }, { n: 1, fn() { peek("p1"); } }, { keys: ["KeyV"], n: 1 }, { n: 1, fn() { peek("p2"); } }, { keys: [], n: 3 }, { n: 1, fn() { peek("after"); } }, { keys: [], n: 1, snap: true }]);
