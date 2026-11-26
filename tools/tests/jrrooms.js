// (11-26) Glen's Jerusalem rooms: the wall (the Jebusites on it), the gorge's cliffs, the watercourse, Zion
startSetup = () => {}; setup.active = false; helpT = 0;
const snap = { keys: [], n: 2, snap: true };
const hush = { n: 1, fn() { region.script = []; dialog.t = 0; hb.cine = null; region.wait = 0; } };
const at = (id, k, y = GR * T) => ({ n: 1, fn() { const r = roomById(id); regionGo((r.c0 + k) * T, 1, () => { david.y = y; david.vy = 0; snapCamera(); }); } });
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted", "hb_end", "jr_taunt"].forEach(k => regionAdd("taken", k)); } },
  at("jvalley", 8), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("jvalley", 38), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("gorge", 18), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap, { n: 1, fn() { for (let k = jr.g0; k <= jr.g1; k++) jrStone(k); david.x = (jr.g0 + jr.g1) / 2 * T; david.y = GR * T; snapCamera(); } }, { keys: [], n: 6 }, snap, { n: 1, fn() { for (let k = jr.g0; k <= jr.g1; k++) oneway[GR][k] = false; jr.found = {}; } },
  at("gorge", 40), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("shaft", 10), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  { n: 1, fn() { david.y = jr.mid.y; david.x = (jr.mid.x + jr.mid.x1) / 2; david.vy = 0; snapCamera(); } }, { keys: [], n: 20 }, hush, snap,
  { n: 1, fn() { david.y = jr.top.y; david.x = (jr.top.x + jr.top.x1) / 2; david.vy = 0; snapCamera(); } }, { keys: [], n: 8 }, hush, snap,
  { n: 1, fn() { regionAdd("taken", "jr_end"); } }, at("zion", 30), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); regionWrite(); } },
]);
