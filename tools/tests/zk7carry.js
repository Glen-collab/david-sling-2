// (11-24) David carrying Saul's jar full (Glen's clips): standing, then walking to the fire
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { for (const k of ["z7_sent", "z7_burned", "z7_stones", "z7_pursue"]) regionAdd("taken", k); region.save.taken = region.save.taken.filter(k => !/^z7_fire/.test(k)); region.script.length = 0; } },
  { n: 1, fn() { const r = roomById("ziklag"); moveParty((r.c0 + 51) * T, GR * T); snapCamera(); zk.jar = true; david.facing = 1; } }, { keys: [], n: 20 }, { keys: [], n: 2, snap: true },
  { keys: ["ArrowRight"], n: 12 }, { keys: ["ArrowRight"], n: 1, snap: true }, { keys: ["ArrowRight"], n: 6 }, { keys: ["ArrowRight"], n: 1, snap: true }, { n: 1, fn() { log("state " + david.state + " jar " + zk.jar); } }]);
