// (11-24) the camp's raiders: the dancing one (far) and the one coming at David (near), side by side for size
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { for (const k of ["z7_sent", "z7_burned", "z7_stones", "z7_pursue", "z7_besor", "z7_egypt", "z7_camp"]) regionAdd("taken", k); region.save.taken = region.save.taken.filter(k => k !== "z7_won"); region.script.length = 0; } },
  { n: 1, fn() { const r = roomById("camp"); moveParty((r.c0 + 9) * T, GR * T); snapCamera(); } }, { keys: [], n: 2, snap: true },
  { keys: [], n: 25 }, { keys: [], n: 2, snap: true }, { n: 1, fn() { log(region.beasts.filter(b => b.room === "camp").slice(0, 3).map(b => b.state + "@" + Math.round(b.x / T - roomById("camp").c0)).join(" ")); } },
  { keys: [], n: 20 }, { keys: [], n: 2, snap: true }]);
