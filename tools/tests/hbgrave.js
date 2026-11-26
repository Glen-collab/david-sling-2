// (11-25) Glen's grave for Abner, in Hebron after the chase
startSetup = () => {}; setup.active = false; helpT = 0;
const hush = { n: 1, fn() { region.script = []; dialog.t = 0; hb.cine = null; region.wait = 0; hb.weep = null; } };
testRun([
  { n: 1, fn() { ["hb_lament", "hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave"].forEach(k => region.save.taken.includes(k) || region.save.taken.push(k));
    const r = roomById("hebron"); regionGo((r.c0 + 66) * T, 1, () => { david.y = GR * T; snapCamera(); }); } },
  { keys: [], n: 60 }, hush, { keys: [], n: 90 }, { n: 1, fn() { TEST_ERRORS.push("INFO img " + !!roomImg("w8/hebron/grave.png") + " " + (roomImg("w8/hebron/grave.png") || {}).naturalWidth + " chase " + hbHas("hb_chase") + " room " + region.room.id + " gx " + Math.round(hb.grave.x - camX)); } }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); } },
]);
