// (11-19) a sling throw that was going as he went into the water must not lock his sword there
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = typeof G5 !== "undefined" && location.hash.includes("9-11") ? roomById("pool") : REGION.rooms.find(o => o.water); moveParty((r.c0 + 30) * T, GR * T - 80); snapCamera(); } },
  { keys: ["ArrowRight"], n: 20 }, { n: 1, fn() { david.throwT = 0; david.charging = true; } }, { keys: [], n: 10 },
  { keys: ["KeyV"], n: 1 }, { keys: [], n: 3 }, { n: 1, fn() { log("swim " + !!(location.hash.includes("9-11") ? g5.swim : r4.swim) + " throwT " + david.throwT + " swordT " + david.swordT); } }]);
