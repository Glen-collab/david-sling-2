// (11-25) Glen's Gemini rooms: the road, Hebron, the gate, Gibeon, the chase, the feast
startSetup = () => {}; setup.active = false; helpT = 0;
const snap = { keys: [], n: 2, snap: true };
const hush = { n: 1, fn() { region.script = []; dialog.t = 0; hb.cine = null; region.wait = 0; } };
const at = (id, k) => ({ n: 1, fn() { const r = roomById(id); regionGo((r.c0 + k) * T, 1, () => { david.y = GR * T; snapCamera(); }); } });
testRun([
  { n: 1, fn() { ["hb_lament", "hb_ask"].forEach(k => region.save.taken.includes(k) || region.save.taken.push(k)); } },
  at("road", 30), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("hebron", 20), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("hebron", 70), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("gate", 24), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("gibeon", 30), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("chase", 30), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  at("feast", 30), { keys: [], n: 60 }, hush, { keys: [], n: 10 }, snap,
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); } },
]);
