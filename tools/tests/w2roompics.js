// (Glen 11-10) his room pictures: Michal's house and Naioth (ramah/house_strip, ramah/naioth_strip)
if (location.hash !== "#9-6") throw new Error("not in Ramah");
startSetup = () => {}; setup.active = false; R2.SIGHT = R2.SIGHT_LOW = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const go = (id, col, row) => ({ n: 3, fn() { const r = roomById(id); region.room = r; moveParty((r.c0 + col) * T, (row || GR) * T); snapCamera(); } });
const wait = Array.from({ length: 10 }, () => ({ keys: [], n: 6, fn: skip }));
testRun([
  { n: 3, fn() { region.save.taken = region.save.taken.filter(k => !/^r2_/.test(k)); for (const k of ["r2_window","r2_samuel","r2_naioth"]) regionAdd("taken", k); } },
  go("house", 10), ...wait, { keys: [], n: 1, snap: true, fn() { log("house left"); } },
  go("house", 34), ...wait, { keys: [], n: 1, snap: true, fn() { log("house right"); } },
  go("naioth", 30), ...wait, { keys: [], n: 1, snap: true, fn() { log("naioth floor"); } },
  go("naioth", 30, GR - 18), ...wait, { keys: [], n: 1, snap: true, fn() { log("naioth up " + Math.round(camY)); } },
]);
