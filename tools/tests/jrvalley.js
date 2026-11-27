// (11-27) Below Jerusalem: Glen's fortress wall and its gate, the floor painted in; the Jebusites on the wall-walk
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const snap = { keys: [], n: 2, snap: true };
const rx = () => roomById("jvalley").c0 * T;
const at = k => ({ n: 1, fn() { david.x = rx() + k * T; david.y = GR * T; snapCamera(); } });
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted", "hb_end", "jr_taunt"].forEach(k => regionAdd("taken", k));
    regionGo(rx() + 6 * T, 1, () => { david.y = GR * T; snapCamera(); }); } }, { keys: [], n: 40 }, snap,
  at(36), { keys: ["ArrowRight"], n: 12 }, { keys: [], n: 20 }, snap,
  at(56), { keys: [], n: 20 }, snap,
  { n: 1, fn() { log("w " + roomById("jvalley").w + " right " + roomById("jvalley").right + " feet " + david.y + " onGround " + david.onGround); } },
  { keys: ["ArrowRight"], n: 140 }, { keys: [], n: 30 }, { n: 1, fn() { log("room now " + (region.room && region.room.id)); } },
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); regionWrite(); } },
]);
