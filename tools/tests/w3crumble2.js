// (Glen 11-11) his cracked and broken frames: Gad (tent) cracking, then broken and dropping
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
for (const n of ["gad", "levi", "asher", "dan"]) { kitImg("w3_tribe_" + n + "_c1"); kitImg("w3_tribe_" + n + "_c2"); }
const tile = n => r3.trial.tiles.find(t => t.name === n);
testRun([
  { n: 3, fn() { r3.trial.next = 0; r3.trial.tiles.forEach(t => t.lit = false); } },
  { keys: [], n: 40 },
  { n: 2, fn() { const t = tile("gad"); moveParty((t.x0 + t.x1) / 2, GR * T); snapCamera(); } },
  { keys: [], n: 8, snap: true },
  { keys: [], n: 8, snap: true },
  { keys: [], n: 4, snap: true },
]);
