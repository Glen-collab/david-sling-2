// (11-27, Glen: the tribes' gifts "takes forever" after a couple of times) the quick feast once it's been held: all twelve
//  come in, their gifts on the table, about 20 s; and Up skips
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const snap = { keys: [], n: 2, snap: true };
const drain = () => ({ n: 1, fn() { let i = 0; while (region.script.length && i++ < 40) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; region.jscene = null; } });
const start = { n: 1, fn() { localStorage.setItem(slotKey("david2FeastSeen"), "1"); region.save.taken = region.save.taken.filter(k => !/^hb_(tribes|feasted|end)$/.test(k));
  for (const t of hb.tribes) { t.st = "wait"; t.x = hbRoomX("feast", 116); t.tabled = false; } hb.table.length = 0; hb.feasting = false; hb.quick = false; hb.quickT = 0;
  regionGo(hbRoomX("feast", 30), 1, () => { david.y = GR * T; snapCamera(); }); } };
testRun([
  start, { keys: [], n: 40 }, drain(), { n: 1, fn() { log("quick " + hb.quick); } },
  { keys: [], n: 300 }, snap, { n: 1, fn() { log("10s: table " + hb.table.length + " " + hb.tribes.map(t => t.st[0]).join("")); } },
  { keys: [], n: 360 }, { n: 1, fn() { log("22s: table " + hb.table.length + " feasting " + !!hb.feasting + " script " + region.script.length); } }, snap,
  { n: 1, fn() { localStorage.removeItem(slotKey("david2FeastSeen")); drain().fn(); } },
]);
