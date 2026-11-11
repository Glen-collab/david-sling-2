// (Glen 11-11) Gath: the guard knows him at the gate, the mash (scribbling), the guards laugh; Achish's court: the mash,
// Achish ("Do I lack madmen?"), the mash past the elite guards, out
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
region.save.taken = region.save.taken.filter(k => !["r3_gath", "r3_mad", "g_exit_open"].includes(k));
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } if (typeof Journal !== "undefined" && Journal.active) Journal.active = false; };
const lines = n => Array.from({ length: n }, () => ({ keys: [], n: 6, fn: skip }));
const mashKeys = n => [{ keys: [], n: 40 }].concat(Array.from({ length: n }, (_, i) => [{ keys: [i % 2 ? "KeyX" : "KeyZ"], n: 1 }, { keys: [], n: 1 }]).flat());
const at = (id, k) => ({ n: 3, fn() { r3.caughtT = 0; const r = roomById(id); moveParty((r.c0 + k) * T, GR * T); david.facing = 1; snapCamera(); } });
testRun([
  at("gath", 12), ...lines(4), { keys: ["ArrowRight"], n: 14 },
  { keys: [], n: 8, snap: true, fn() { log("gate: script " + region.script.length + " guard " + r3Who("guard1").name); } },
  ...lines(8), { keys: [], n: 10, snap: true, fn() { log("mash on " + mash.on + " mad " + !!r3.mad); } },
  ...mashKeys(80), { keys: [], n: 1, snap: true, fn() { log("after gate mash: on " + mash.on + " level " + mash.level.toFixed(2) + " presses " + mash.presses + " t " + mash.t.toFixed(1)); } },
  ...lines(2), { keys: [], n: 2, snap: true, fn() { log("laughing: " + r3Who("guard1").name + " r3_gath " + r3Has("r3_gath")); } },
  ...lines(8),
  at("court", 22), ...lines(3), { keys: ["ArrowRight"], n: 30 }, ...lines(6),
  { keys: [], n: 10, snap: true, fn() { log("court mash on " + mash.on + " x " + Math.round(david.x) + " at " + r3.courtAt + " room " + region.room.id + " script " + region.script.length + " wait " + region.wait.toFixed(2) + " dialog " + dialog.t.toFixed(1) + " J " + (typeof Journal !== "undefined" && Journal.active) + " js " + (typeof jscene !== "undefined" ? JSON.stringify(jscene).slice(0,80) : "")); } },
  ...mashKeys(90), ...lines(2), { keys: [], n: 2, snap: true, fn() { log("achish: " + r3Who("achish").name); } },
  ...lines(3), { keys: [], n: 2, fn() { log("guards mash on " + mash.on + " ready " + mash.ready.toFixed(1) + " t " + mash.t.toFixed(1)); } },
  ...mashKeys(100).slice(1), { keys: [], n: 1, fn() { log("guards level " + mash.level.toFixed(2) + " on " + mash.on + " presses " + mash.presses + " t " + mash.t.toFixed(1) + " retry " + mash.retry.toFixed(1)); } }, ...lines(2), { keys: [], n: 2, snap: true, fn() { log("out: " + (dialog.t > 0 ? dialog.say : "")); } },
  ...lines(10), { keys: [], n: 4, fn() { log("end: r3_mad " + r3Has("r3_mad") + " exit " + r3Has("g_exit_open")); } },
]);
