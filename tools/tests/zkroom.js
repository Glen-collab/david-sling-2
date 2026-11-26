// (11-25) Glen's Ziklag (far and mid): standing in the room, the start and partway along
startSetup = () => {}; setup.active = false; helpT = 0;
const snap = { keys: [], n: 2, snap: true };
const at = (id, k) => { const r = roomById(id); regionGo((r.c0 + k) * T, 1, () => { david.y = GR * T; snapCamera(); }); };
testRun([
  { n: 1, fn() { region.script = []; hb.cine = null; dialog.t = 0; region.save.taken.push("hb_lament"); at("ziklag", 10); } }, { keys: [], n: 60 }, { n: 1, fn() { region.script = []; dialog.t = 0; hb.cine = null; } }, { keys: [], n: 10 }, snap,
  { n: 1, fn() { at("ziklag", 40); } }, { keys: [], n: 60 }, { n: 1, fn() { region.script = []; dialog.t = 0; hb.cine = null; } }, { keys: [], n: 10 }, snap,
]);
