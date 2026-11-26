// (11-25) Glen's crown and bracelet at David's feet in Ziklag (2 Samuel 1:10)
startSetup = () => {}; setup.active = false; helpT = 0;
const until = test => ({ n: 1, fn() { let i = 0; while (region.script.length && !test() && i++ < 80) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; } });
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); };
testRun([{ n: 1, fn() { clean(); region.script.length = 0; hb.cine = hb.lament = hb.weep = null; const r = roomById("ziklag"); moveParty((r.c0 + 5) * T, GR * T); snapCamera(); } },
  { keys: [], n: 30 }, until(() => hb.msgOn), { keys: [], n: 50 }, until(() => hb.crown), { keys: [], n: 20 },
  { n: 1, fn() { TEST_ERRORS.push("INFO crown " + hb.crown + " msg " + (hb.msg && Math.round(hb.msg.x - david.x))); } }, { n: 1, fn() { TEST_ERRORS.push("INFO bracelet " + (ITEM.hb_bracelet && ITEM.hb_bracelet.naturalWidth)); } }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { region.script.length = 0; hb.cine = null; hb.crown = false; dialog.t = 0; clean(); } }]);
