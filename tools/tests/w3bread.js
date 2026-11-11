// (Glen 11-11) Nob's holy bread: walk up to Ahimelech, the three lines, his clip (the give, the eating, Doeg slipping off), after
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
region.save.taken = region.save.taken.filter(k => k !== "r3_bread");
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } };
testRun([{ n: 1, fn() { breadSet(0); } },
  { n: 3, fn() { const r = roomById("nob"); moveParty(r3.breadAt - 3 * T, GR * T); david.facing = 1; snapCamera(); } },
  ...Array.from({ length: 6 }, () => ({ keys: [], n: 5 })),
  { keys: ["ArrowRight"], n: 30 }, { keys: [], n: 1, fn() { log("x " + Math.round(david.x) + " at " + r3.breadAt + " ahim " + r3.breadX + " script " + region.script.length + " wait " + region.wait); } },
  ...Array.from({ length: 6 }, () => ({ keys: [], n: 4, fn: skip })),
  { keys: [], n: 20 }, { keys: [], n: 1, snap: true, fn() { log("give: scene " + (r3.scene && r3.scene.t.toFixed(1))); } },
  { keys: [], n: 60 }, { keys: [], n: 1, snap: true, fn() { log("eat: scene " + (r3.scene && r3.scene.t.toFixed(1))); } },
  { keys: [], n: 90 }, { keys: [], n: 1, snap: true, fn() { log("end: scene " + (r3.scene && r3.scene.t.toFixed(1))); } },
  { keys: [], n: 120 }, { keys: [], n: 1, snap: true, fn() { log("after: scene " + !!r3.scene + " bread " + r3Has("r3_bread") + " doeg " + r3.people.some(p => p.tag === "doeg") + " loaves " + breadCount()); } },
]);
