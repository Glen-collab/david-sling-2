// (Glen 11-12) Achish's court on a later visit (run w3mourn_set.js first: World 3 finished): the guards patrol; seen, he
//  acts mad again and is thrown out into the street. Puts the save back after
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m), key = regionSaveKey();
const restore = () => { const b = localStorage.getItem("w3mourn_backup"); if (b !== null) { if (b === "__none__") localStorage.removeItem(key); else localStorage.setItem(key, b); localStorage.removeItem("w3mourn_backup"); } };
const g = t => { const p = r3Who(t); return p ? Math.round(p.x / T - roomById("court").c0) + (p.facing > 0 ? ">" : "<") : "-"; };
testRun([
  { n: 2, fn() { moveParty((roomById("court").c0 + 7) * T, GR * T); david.facing = 1; snapCamera(); } },
  { keys: [], n: 30, snap: true, fn() { log("guards " + g("elite1") + " " + g("elite2") + " truth " + !!region.relics.find(f => f.id === "r3_truth_court") + " script " + region.script.length); } },
  { keys: ["ArrowRight"], n: 60, fn() {} },
  { keys: [], n: 10, snap: true, fn() { log("walked: x " + Math.round(david.x / T - roomById("court").c0) + " script " + region.script.length + " dialog " + !!(dialog && dialog.t > 0) + " guards " + g("elite1") + " " + g("elite2")); } },
  ...Array.from({ length: 4 }, () => [{ keys: ["KeyZ"], n: 2 }, { keys: [], n: 10 }]).flat(),
  ...Array.from({ length: 60 }, (_, i) => ({ keys: [i % 2 ? "KeyZ" : "KeyX"], n: 2 })),
  ...Array.from({ length: 4 }, () => [{ keys: ["KeyZ"], n: 2 }, { keys: [], n: 15 }]).flat(),
  { keys: [], n: 20, snap: true, fn() { log("after: room " + region.room.id + " mad " + !!r3.mad + " script " + region.script.length); restore(); } },
]);
