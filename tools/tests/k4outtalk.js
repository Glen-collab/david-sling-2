// (Glen 11-17) back in Out of Keilah after the run: the men who grabbed at him talk
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { ["k4_floors", "k4_abiathar", "k4_saul", "k4_ephod", "k4_escaped"].forEach(t => regionAdd("taken", t)); const r = roomById("escape"); moveParty((r.c0 + 30) * T, FOOT); david.facing = 1; snapCamera(); } },
  { keys: [], n: 30, fn() { dialog.t = 0; dialog.hold = false; region.script.length = 0; } }, { n: 1, fn() { const g = k4.grabbers[0]; david.x = g.x - 60; log("run " + JSON.stringify(k4.run && { on: k4.run.on, done: k4.run.done }) + " g " + g.state); } }, { keys: [], n: 10 },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 20, snap: true, fn() { log("say " + dialog.who + " | " + dialog.say); } }]);
