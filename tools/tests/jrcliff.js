// (11-27) the gorge's cliffs faded into the road, the dark wider under them: from the left lip, the middle, the right lip
startSetup = () => {}; setup.active = false; helpT = 0;
const snap = { keys: [], n: 2, snap: true };
const hush = { n: 1, fn() { region.script = []; dialog.t = 0; hb.cine = null; region.wait = 0; toastTime = 0; } };
const put = x => ({ n: 1, fn() { david.x = x(); david.y = GR * T; david.vy = 0; snapCamera(); toastTime = 0; } });
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); ["hb_lament", "hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted", "hb_end", "jr_taunt"].forEach(k => regionAdd("taken", k)); } },
  { n: 1, fn() { const r = roomById("gorge"); regionGo((r.c0 + 10) * T, 1, () => { david.y = GR * T; snapCamera(); }); } }, { keys: [], n: 60 }, hush,
  { n: 1, fn() { for (let k = jr.g0; k <= jr.g1; k++) platAt(k, GR * T, 1); } },
  put(() => (jr.g0 - 3) * T), { keys: [], n: 4 }, hush, snap,
  put(() => (jr.g0 + jr.g1) / 2 * T), { keys: [], n: 4 }, hush, snap,
  put(() => (jr.g1 + 4) * T), { keys: [], n: 4 }, hush, snap,
  { n: 1, fn() { for (let k = jr.g0; k <= jr.g1; k++) oneway[GR][k] = false; region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); regionWrite(); } },
]);
