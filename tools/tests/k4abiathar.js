// (Glen 11-17) Abiathar: the arrow over him, and the ephod scene starts when David walks up
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.save.taken = region.save.taken.filter(t => !["k4_ephod", "k4_escaped"].includes(t)); ["k4_floors", "k4_abiathar", "k4_saul"].forEach(t => regionAdd("taken", t)); const r = roomById("town"); moveParty((r.c0 + 58) * T, FOOT); david.facing = 1; snapCamera(); } },
  { keys: [], n: 20, snap: true, fn() { log("abiathar sx " + Math.round(k4.abiathar.x - camX) + " script " + region.script.length); } },
  { keys: ["ArrowRight"], n: 40 }, { keys: [], n: 20, snap: true, fn() { log("script " + region.script.length + " say " + dialog.say); } }]);
