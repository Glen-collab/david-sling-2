// (11-19) Saul's men turn back at a pit's edge (Glen: "he walks over the pit")
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let over = 0, n = 0;
const watch = () => { for (const g of g5.guards) if (g.room === "wild") { n++; if (region.holes.some(h => h.room === "wild" && g.x > h.x0 && g.x < h.x1)) over++; } };
const steps = [{ n: 1, fn() { region.crawl = null; region.save.taken.push("g5_load_spring", "g5_load_rocks"); for (const f of g5.food) if (f.room !== "wild") region.save.taken.push(f.id); } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("wild"); moveParty((r.c0 + 2) * T, FOOT); snapCamera(); david.inv = 999; log("active " + g5.guards.filter(g => g.room === "wild" && g5Active(g)).length + " stage " + g5Stage()); } }];
for (let i = 0; i < 60; i++) steps.push({ keys: [], n: 20 }, { n: 1, fn: watch });
steps.push({ n: 1, fn() { log("checks " + n + " over a pit " + over); } });
testRun(steps);
