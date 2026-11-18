// (11-18) the camp's men: five different people; the two by the fire hungry, then eating once a load is home
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = () => { dialog.t = 0; region.script.length = 0; const r = roomById("camp"); moveParty((r.c0 + 30) * T, FOOT); snapCamera(); };
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { at(); log("men " + g5.men.map(p => p.spr + (SPR[p.spr] ? "" : "(MISSING)")).join(", ") + "; stage " + g5Stage()); } },
  { keys: [], n: 30, snap: true },
  { n: 1, fn() { g5RoomFood("spring").forEach(f => region.save.taken.push(f.id)); at(); log("stage " + g5Stage()); } }, { keys: [], n: 40, snap: true }]);
