// (11-27) the bridge in Glen's rock: glowing as the film ends, then as it stays; and half found (walking out)
startSetup = () => {}; setup.active = false; helpT = 0;
const snap = { keys: [], n: 2, snap: true };
const hush = { n: 1, fn() { region.script = []; dialog.t = 0; hb.cine = null; region.wait = 0; toastTime = 0; jr.fade = 0; } };
const put = x => ({ n: 1, fn() { david.x = x(); david.y = GR * T; david.vy = 0; snapCamera(); toastTime = 0; } });
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); ["hb_lament", "hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted", "hb_end", "jr_taunt"].forEach(k => regionAdd("taken", k)); region.script.length = 0; hb.cine = null; dialog.t = 0; region.wait = 0; } },
  { n: 1, fn() { const r = roomById("gorge"); regionGo((r.c0 + 10) * T, 1, () => { david.y = GR * T; snapCamera(); }); } }, { keys: [], n: 60 }, hush,
  { n: 1, fn() { for (let k = jr.g0; k < jr.g0 + 9; k++) { jrStone(k); jr.found[k] = 5; } } }, put(() => (jr.g0 + 7) * T), { keys: [], n: 3 }, hush, snap,
  { n: 1, fn() { for (let k = jr.g0; k <= jr.g1; k++) { jrStone(k); jr.found[k] = 0.3; } } }, put(() => (jr.g0 + jr.g1) / 2 * T), { keys: [], n: 3 }, hush, snap,
  { n: 1, fn() { for (let k = jr.g0; k <= jr.g1; k++) jr.found[k] = 9; } }, { keys: [], n: 3 }, hush, snap,
  { n: 1, fn() { for (let k = jr.g0; k <= jr.g1; k++) oneway[GR][k] = false; jr.found = {}; region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); regionWrite(); } },
]);
