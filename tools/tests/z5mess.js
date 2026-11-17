// (Glen 11-17) the end of the siege played out: David hides low, Saul's men march past, the messenger gallops to Saul
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.t = 0; dialog.hold = false; } };
testRun([{ n: 1, fn() { ["z5_jonathan", "z5_jonathan_gone", "z5_erem", "z5_warned"].forEach(t => regionAdd("taken", t)); region.save.taken = region.save.taken.filter(t => !["z5_surrounded", "z5_rescued", "g_exit_open"].includes(t)); const r = roomById("mountain"); moveParty((r.c0 + 120) * T, FOOT); david.facing = 1; snapCamera(); } },
  { keys: [], n: 10, snap: true }, { n: 1, fn() { if (!z5.siege) z5SiegeStart(); region.script.length = 0; skip(); z5.pose = null; } }, { keys: [], n: 3 },
  { n: 1, fn() { z5.siege.t = Z5.SIEGE.END - 0.05; david.x = z5.rockX + 20; snapCamera(); } }, { keys: [], n: 70, snap: true, fn() { log("mess t " + (z5.siege && z5.siege.mess ? z5.siege.mess.t.toFixed(2) : "-")); } },
  { keys: [], n: 90, snap: true, fn() { log("say " + dialog.say); } }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 30, snap: true }, { keys: [], n: 40, snap: true, fn() { log("after: " + (z5.siege && z5.siege.mess ? "go " + z5.siege.mess.go : "done") + " say " + dialog.say); } }]);
