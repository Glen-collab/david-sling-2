// (11-24) Glen's stills of David's men in burned Ziklag: weeping (sitting, lying), then turned toward David (30:6)
startSetup = () => {}; setup.active = false; helpT = 0;
testRun([{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^z7_(burned|stones|pursue)/.test(k)); regionAdd("taken", "z7_sent"); regionAdd("taken", "z7_burned"); region.script.length = 0; } },
  { n: 1, fn() { const r = roomById("ziklag"); moveParty((r.c0 + 24) * T, GR * T); snapCamera(); } }, { keys: [], n: 10 }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { const r = roomById("ziklag"); moveParty((r.c0 + 41) * T, GR * T); snapCamera(); } }, { keys: [], n: 10 }, { n: 1, fn() { dialog.t = 0; } }, { keys: [], n: 2, snap: true }]);
