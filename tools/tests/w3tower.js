// (Glen 11-11) the Road to Nob's watchtower: solid, sunk in; from the boulder a jump lands on top; the priests walk
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const C = () => roomById("nobroad").c0;
["f_tower_low", "f_rock", "f_lowwall"].forEach(kitImg);   // (asked for before the steps: the harness gives them no time to load later)
testRun([
  { n: 3, fn() { moveParty((C() + 61) * T, GR * T); snapCamera(); } },
  { keys: [], n: 20, snap: true },
  { keys: ["ArrowRight"], n: 60, fn() { log("blocked at col " + (david.x / T - C()).toFixed(1) + " y " + Math.round(GR * T - david.y)); } },
  { n: 2, fn() { moveParty((C() + 67.6) * T, GR * T - 113); david.facing = 1; } },
  { keys: [], n: 20, fn() { log("on boulder: up " + Math.round(GR * T - david.y)); } },
  { keys: ["ArrowRight", "KeyZ"], n: 30 }, { keys: ["ArrowRight"], n: 30 }, { keys: [], n: 20, snap: true, fn() { log("after jump: col " + (david.x / T - C()).toFixed(1) + " up " + Math.round(GR * T - david.y) + " ground " + david.onGround); } },
  { n: 3, fn() { const r = roomById("nob"); moveParty((r.c0 + 22) * T, GR * T); snapCamera(); log("priest x " + Math.round(r3.people.find(p => p.name === "nob_priest2_walk").x)); } },
  { keys: [], n: 60, fn() { log("priest x later " + Math.round(r3.people.find(p => p.name === "nob_priest2_walk").x)); } },
]);
