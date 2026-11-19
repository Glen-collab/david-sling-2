// (11-19) the sword under water, deep by the bottom, swimming at the fish
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const fishes = () => (g5.fish || []).filter(f => f.room === "pool").map(f => f.kind + "@" + Math.round(f.x - david.x) + "," + Math.round(f.y - david.y) + (f.gone ? " GONE" : "")).join(" | ");
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("pool"); moveParty((r.c0 + 20) * T, GR * T - 5); snapCamera(); log("fish " + fishes()); } },
  { keys: ["ArrowRight"], n: 40 }, { n: 1, fn() { log("y " + Math.round(david.y) + " GR " + GR * T + " fish " + fishes()); } },
  { keys: ["ArrowRight", "KeyV"], n: 2 }, { keys: ["ArrowRight"], n: 8, snap: true }, { n: 1, fn() { log("swordT " + david.swordT + " stones " + stones.filter(s => s.sword).map(s => Math.round(s.x - david.x) + "," + Math.round(s.y - david.y)).join(" ")); } },
  { keys: ["ArrowRight"], n: 30 }, { keys: ["KeyV"], n: 2 }, { keys: [], n: 8, snap: true }, { n: 1, fn() { log("fish " + fishes()); } }]);
