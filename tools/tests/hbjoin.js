// (11-25) where Glen's second pictures join the first: the road's hills, the chase's hills and ground, the tribes' camp
startSetup = () => {}; setup.active = false; helpT = 0;
const snap = { keys: [], n: 2, snap: true };
const hush = { n: 1, fn() { region.script = []; dialog.t = 0; hb.cine = null; region.wait = 0; } };
const at = (id, k) => ({ n: 1, fn() { const r = roomById(id); regionGo((r.c0 + k) * T, 1, () => { david.y = GR * T; snapCamera(); }); } });
testRun([
  { n: 1, fn() { ["hb_lament", "hb_ask"].forEach(k => region.save.taken.includes(k) || region.save.taken.push(k)); } },
  at("road", 108), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("chase", 72), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("chase", 108), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("feast", 100), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); } },
]);
