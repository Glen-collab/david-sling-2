// (Glen 11-11) Nob's two doorway buildings: the priests' house (into the Hall of the Tribes) and the cellar house (the stair down)
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
["w3_nob_stairhouse", "w3_nob_hallhouse"].forEach(kitImg);
const C = () => roomById("nob").c0;
testRun([
  { n: 3, fn() { moveParty((C() + 16) * T, GR * T); snapCamera(); } }, { keys: [], n: 20, snap: true },
  { keys: ["ArrowUp"], n: 1 }, { keys: [], n: 80, fn() { log("hall door -> " + region.room.id); } },
  { n: 3, fn() { const r = roomById("nob"); moveParty((r.c0 + 29 + 60) * T, GR * T); snapCamera(); } }, { keys: [], n: 20, snap: true },
  { keys: ["ArrowUp"], n: 1 }, { keys: [], n: 80, fn() { log("stair -> " + region.room.id); } },
]);
