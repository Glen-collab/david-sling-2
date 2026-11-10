// (Glen 11-10) Saul at his table: saul_feast_eat while they talk, saul_feast_throw, the spear leaving his hand
if (location.hash !== "#9-6") throw new Error("not in Ramah");
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const S = { keys: [], n: 1, snap: true, fn() { const F = r2.feast; log("phase " + (F && F.phase) + " t " + (F && F.t.toFixed(2)) + " spear " + (r2.spear ? Math.round(r2.spear.x - r2.saulX) + "," + Math.round(r2.spear.y - GR * T) : "-")); } };
testRun([
  { n: 3, fn() { region.save.taken = region.save.taken.filter(k => !/^r2_/.test(k)); for (const k of ["r2_window","r2_samuel","r2_naioth","r2_ezel"]) regionAdd("taken", k); const r = roomById("feast"); moveParty((r.c0 + 20) * T, GR * T); region.room = r; snapCamera(); r2FeastStart(); } },
  { keys: [], n: 40 }, S,
  ...Array.from({ length: 40 }, () => ({ keys: [], n: 5, fn: skip })),
  ...[0.6, 1.2, 1.36, 1.55].map(t => ({ keys: [], n: 1, snap: true, fn() { const F = r2.feast; region.script.length = 0; F.phase = "throw"; F.t = t; r2.spear = null; david.x = r2.saulX - 900; log("t " + t); } })),
  { keys: [], n: 6, fn: () => {} }, S,
]);
