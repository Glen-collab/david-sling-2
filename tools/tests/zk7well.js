// (11-24) Ziklag's well: standing in the street (Glen: it stood back, floating), the Up hint, filling the jar
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { for (const k of ["z7_sent", "z7_burned", "z7_stones", "z7_pursue"]) regionAdd("taken", k); region.save.taken = region.save.taken.filter(k => k !== "z7_jar" && !/^z7_fire/.test(k)); region.script.length = 0; } },
  { n: 1, fn() { const r = roomById("ziklag"); moveParty((r.c0 + 50) * T, GR * T); snapCamera(); zk.jar = false; } }, { keys: [], n: 2, snap: true },
  { keys: ["ArrowRight"], n: 8 }, { keys: [], n: 20 }, { keys: [], n: 2, snap: true },
  { keys: ["ArrowUp"], n: 1 }, { keys: [], n: 70 }, { n: 1, fn() { log("jar " + zk.jar); } }, { keys: [], n: 2, snap: true }]);
