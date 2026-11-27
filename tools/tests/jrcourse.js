// (11-27) Under the Stronghold: Glen's painting; David walks up to the watercourse's mouth and sees it (5:8)
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const snap = { keys: [], n: 2, snap: true };
const until = test => ({ n: 1, fn() { let i = 0; while (region.script.length && !test() && i++ < 80) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; } });
const rx = () => roomById("jcourse").c0 * T;
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted", "hb_end", "jr_taunt"].forEach(k => regionAdd("taken", k)); jr.coursing = false; } },
  { n: 1, fn() { log("valley right " + roomById("jvalley").right); regionGo(rx() + 4 * T, 1, () => { david.y = GR * T; snapCamera(); }); } }, { keys: [], n: 40 }, snap,
  { n: 1, fn() { log("right before " + roomById("jcourse").right); } },
  { keys: ["ArrowRight"], n: 100 }, { keys: [], n: 20 }, snap, { n: 1, fn() { log("at " + Math.round((david.x - rx()) / T) + " script " + region.script.length); } },
  until(() => false), { keys: [], n: 10 }, { n: 1, fn() { log("seen " + hbHas("jr_course") + " right " + roomById("jcourse").right); } },
  { n: 1, fn() { david.x = rx() + 45 * T; snapCamera(); } }, { keys: [], n: 10 }, snap,
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); regionWrite(); } },
]);
