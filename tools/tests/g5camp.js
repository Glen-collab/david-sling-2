// (11-18) the camp's men: five different people
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("camp"); moveParty((r.c0 + 16) * T, FOOT); snapCamera(); log("men " + g5.men.map(p => p.spr + (SPR[p.spr] ? "" : "(MISSING)")).join(", ")); } },
  { keys: [], n: 30, snap: true }]);
