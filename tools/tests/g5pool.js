// (11-18) the Pool Below the Falls: in from the Spring's falls, swim, the skin on the bottom, out at the cave
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const at = (rm, k, y = GR * T) => { const r = roomById(rm); moveParty((r.c0 + k) * T, y); snapCamera(); };
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); region.beasts.length = 0; at("spring", 58); } }, { keys: [], n: 20 }, { n: 1, fn() { clear(); } },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 150 },
  { n: 1, fn() { clear(); log("room " + region.room.id + " y " + Math.round(david.y)); } }, { keys: [], n: 10, snap: true },
  { keys: ["ArrowRight"], n: 60 }, { keys: ["ArrowRight", "ArrowDown"], n: 60 }, { n: 1, fn() { log("swim " + !!g5.swim + " y " + Math.round(david.y) + " breath " + g5.breath.toFixed(1)); } }, { keys: [], n: 5, snap: true },
  { n: 1, fn() { const f = g5.food.find(q => q.room === "pool"); david.x = f.x; david.y = f.y; } }, { keys: [], n: 5 }, { n: 1, fn() { log("pack " + g5.pack.length); clear(); } },
  { n: 1, fn() { at("pool", 90, G5.POOL_LEDGE); g5.swim = null; } }, { keys: [], n: 30 }, { n: 1, fn() { clear(); log("on ledge y " + Math.round(david.y) + " swim " + !!g5.swim); } }, { keys: [], n: 10, snap: true },
]);
