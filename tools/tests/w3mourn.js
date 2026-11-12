// (Glen 11-12) Nob after Gath: empty, dark, quiet, Saul's dark music; by the altar what Doeg did (1 Samuel 22). Run w3mourn_set.js first
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m), key = regionSaveKey();
const restore = () => { const b = localStorage.getItem("w3mourn_backup"); if (b !== null) { if (b === "__none__") localStorage.removeItem(key); else localStorage.setItem(key, b); localStorage.removeItem("w3mourn_backup"); } };
let says = [];
testRun([
  { n: 2, fn() { moveParty((roomById("nob").c0 + 20) * T, GR * T); david.facing = 1; snapCamera(); } },
  { keys: [], n: 40, snap: true, fn() { log("mourn " + r3.mourn + ", people in nob " + r3.people.filter(p => p.room === "nob").length + ", quiet " + regionStageQuiet() + ", music " + (r3MournSong ? r3MournSong.volume.toFixed(2) : "none")); } },
  { n: 2, fn() { moveParty((roomById("nob").c0 + 29 + 8) * T, GR * T); snapCamera(); } },
  { keys: ["ArrowRight"], n: 30 }, { keys: [], n: 20, snap: true, fn() { log("script " + region.script.length + " dialog " + !!(dialog && dialog.t > 0)); } },
  ...Array.from({ length: 8 }, () => [{ keys: ["KeyZ"], n: 2 }, { keys: [], n: 25 }]).flat(),
  { keys: [], n: 10, fn() { log("r3_mourn taken " + r3Has("r3_mourn") + " script " + region.script.length); restore(); } },
]);
