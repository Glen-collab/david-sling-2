// World 4: out of the water onto a ledge (A at the surface), and the sword in the water against a fish (Glen 11-13)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let r, f;
testRun([
  { n: 1, fn() { r = roomById("river"); r.dark = 0; moveParty((r.c0 + 15) * T, r.water + 70); region.camFootY = GR * T; snapCamera(); } },
  { keys: [], n: 40, fn() { log("treading y " + Math.round(david.y) + " tread " + !!(r4.swim && r4.swim.tread)); } },
  { keys: ["KeyZ", "ArrowRight"], n: 3 }, { keys: ["ArrowRight"], n: 30, fn() { log("after A: y " + Math.round(david.y) + " swim " + !!r4.swim); } },
  { keys: [], n: 40, fn() { log("landed: y " + Math.round(david.y) + " onGround " + david.onGround + " swim " + !!r4.swim + " (ledge at 16: 300)"); } }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { f = r4.fish.find(o => o.room === "river" && o.kind === "tilapia"); moveParty(f.x - 70, f.y + 30); david.facing = 1; david.inv = 5; } },
  { keys: [], n: 2 }, { keys: ["KeyV"], n: 2 }, { keys: [], n: 25, fn() { log("sword at the fish: gone " + !!f.gone); } }, { keys: [], n: 1, snap: true },
]);
