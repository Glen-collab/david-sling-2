// (11-27) Glen's dark pit picture: the gorge, Hebron's road pit, the chase's pits; each with it and without (before)
startSetup = () => {}; setup.active = false; helpT = 0;
const snap = { keys: [], n: 2, snap: true };
const hush = { n: 1, fn() { region.script = []; dialog.t = 0; hb.cine = null; region.wait = 0; } };
const at = (id, k) => ({ n: 1, fn() { const r = roomById(id); regionGo((r.c0 + k) * T, 1, () => { david.y = GR * T; david.vy = 0; snapCamera(); }); } });
const pic = REGION.pitPic, both = [{ n: 1, fn() { REGION.pitPic = null; } }, { keys: [], n: 2 }, snap, { n: 1, fn() { REGION.pitPic = pic; } }, { keys: [], n: 2 }, snap];
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); ["hb_lament", "hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted", "hb_end", "jr_taunt"].forEach(k => regionAdd("taken", k)); region.script.length = 0; hb.cine = null; dialog.t = 0; region.wait = 0; } },
  at("gorge", 18), { keys: [], n: 60 }, hush, { n: 1, fn() { for (let k = jr.g0; k <= jr.g1; k++) jrStone(k); david.x = (jr.g0 + jr.g1) / 2 * T; snapCamera(); } }, { keys: [], n: 6 }, ...both,
  { n: 1, fn() { for (let k = jr.g0; k <= jr.g1; k++) oneway[GR][k] = false; jr.found = {}; } },
  at("road", 31), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, ...both,
  at("chase", 27), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, ...both,
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); regionWrite(); } },
]);
