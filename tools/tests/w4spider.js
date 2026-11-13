// World 4: spiders in the caves; bats over the water only (Glen 11-13)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (id, k, y = GR * T) => () => { const r = roomById(id); r.dark = 0; moveParty((r.c0 + k) * T, y); region.camFootY = GR * T; snapCamera(); };
let h0;
testRun([
  { keys: [], n: 60 },
  { n: 1, fn: at("mouth", 96) }, { keys: [], n: 90 }, { keys: [], n: 1, snap: true },
  { n: 1, fn: at("warren", 26) }, { keys: [], n: 90 }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { at("river", 20, 590)(); h0 = david.hearts; } },
  { keys: [], n: 240, fn() { const bats = region.beasts.filter(b => b.room === "river" && b.kind === "bat2"); log("river: hearts " + h0 + " -> " + david.hearts + "; bats y " + bats.map(b => Math.round(b.y) + b.state[0]).join(" ") + " water " + roomById("river").water); } },
  { keys: [], n: 1, snap: true },
]);
