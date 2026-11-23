// (11-23) David's card: "A: read the Journal" once he's written pages as he goes; it opens on the newest, Left turns back
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { regionAdd("taken", "z7_sent"); regionAdd("taken", "z7_pursue"); const r = roomById("road"); moveParty((r.c0 + 10) * T, GR * T); snapCamera(); } },
  { keys: [], n: 10 }, { keys: [], n: 2, snap: true }, { n: 1, fn() { bookOpen(1); region.mapT = 1; } }, { keys: [], n: 3 }, { keys: [], n: 2, snap: true },
  { keys: ["KeyZ"], n: 1 }, { keys: [], n: 3 }, { n: 1, fn() { log("jscene " + !!region.jscene + " view " + (region.jscene && region.jscene.view) + " done " + (region.jscene && region.jscene.done)); } }, { keys: [], n: 2, snap: true },
  { keys: ["ArrowLeft"], n: 1 }, { keys: [], n: 3 }, { keys: [], n: 2, snap: true }]);
