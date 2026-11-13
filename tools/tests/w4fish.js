// World 4: the fish (make_w4_fish.py). David swims at a biter: it darts and bites; a look at each kind
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let r, h0;
testRun([
  { n: 1, fn() { r = roomById("river"); r.dark = 0; moveParty((r.c0 + 72) * T, r.water + 90); region.camFootY = GR * T; snapCamera(); } },
  { keys: [], n: 20, fn() { h0 = david.hearts; const b = r4.fish.find(f => f.room === "river" && f.kind === "biter"); log("biter x k " + (b.x / T - r.c0).toFixed(1) + " " + b.state + " dir " + b.dir + " hearts " + h0); } },
  { keys: [], n: 1, snap: true },
  { keys: ["ArrowRight"], n: 50, fn() { const b = r4.fish.find(f => f.room === "river" && f.kind === "biter"); log("after swimming at it: " + b.state + " David k " + (david.x / T - r.c0).toFixed(1) + " hearts " + david.hearts); } },
  { keys: [], n: 1, snap: true },
  { keys: [], n: 90, fn() { log("later hearts " + david.hearts); } },
  { n: 1, fn() { moveParty((r.c0 + 20) * T, r.water + 90); snapCamera(); } }, { keys: [], n: 20 }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { moveParty((r.c0 + 66) * T, r.water + 90); snapCamera(); } }, { keys: [], n: 20 }, { keys: [], n: 1, snap: true },
]);
