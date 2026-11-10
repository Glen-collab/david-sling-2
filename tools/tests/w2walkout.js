// (Glen 11-09) Ramah's end: after the farewell (r2_arrows), Up by the stone Ezel takes the road to Nob (the line, the
// fade, then the land map). Also: the map's room names fit their boxes, and the book pages are silent.
if (location.hash !== "#9-6") throw new Error("not in Ramah");
startSetup = () => {}; setup.active = false; R2.SIGHT = R2.SIGHT_LOW = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
let gone = null;
testRun([
  { n: 3, fn() { for (const r of REGION.rooms) regionAdd("explored", r.id); regionAdd("taken", "r2_arrows"); regionAdd("taken", "r2_gateshut"); moveParty(r2.ezelX + 200, GR * T); snapCamera(); } },
  ...Array.from({ length: 8 }, () => ({ keys: [], n: 10, fn: skip })),
  { keys: [], n: 1, fn() { bookOpen(0); } }, { keys: [], n: 40 },
  { keys: [], n: 1, snap: true, fn() { log("book open: hushed " + regionHushed()); } },
  { keys: [], n: 1, fn() { bookClose(); } }, { keys: [], n: 20, fn: skip },
  { keys: ["ArrowLeft"], n: 12 }, { keys: [], n: 10 }, { keys: [], n: 1, snap: true, fn() { log("by the stone: " + Math.round(david.x - r2.ezelX)); } },
  { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 20 }, { keys: [], n: 1, snap: true, fn() { log("line: " + (dialog.t > 0 ? JSON.stringify(dialog.text || dialog.lines || dialog.line || dialog.say || "?").slice(0, 80) : "none")); } },
  ...Array.from({ length: 20 }, () => ({ keys: [], n: 10, fn() { skip(); if (region.trans && region.trans.leave) { region.trans.gone = true; gone = gone || "leaving"; } } })),
  { keys: [], n: 1, fn() { log("out: " + gone + " fade " + (region.fade || 0).toFixed(2)); } },
]);
