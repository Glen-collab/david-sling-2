// (11-25) Glen's table for the twelve tribes' gifts at the feast: empty, then all twelve on it
startSetup = () => {}; setup.active = false; helpT = 0;
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); };
const quiet = () => { region.script.length = 0; dialog.t = 0; region.wait = 0; region.jscene = null; hb.cine = null; for (const t of hb.tribes) t.st = "wait"; };
testRun([{ n: 1, fn() { clean(); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave"].forEach(k => regionAdd("taken", k)); const r = roomById("feast"); moveParty((r.c0 + HB.TABLE - 6) * T, GR * T); snapCamera(); } },
  { keys: [], n: 10 }, { n: 1, fn: quiet }, { keys: [], n: 6 }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { quiet(); hb.table.length = 0; for (const t of HB_TRIBES) hb.table.push(t[3]); } }, { keys: [], n: 4 }, { keys: [], n: 2, snap: true }, { n: 1, fn: clean }]);
