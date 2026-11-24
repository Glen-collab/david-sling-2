// (11-24) the brook Besor's water (Glen's stream art) and Ziklag's fires catching (frames 1, 2) then burning (3, 4)
startSetup = () => {}; setup.active = false; helpT = 0;
testRun([{ n: 1, fn() { for (const k of ["z7_sent", "z7_burned", "z7_stones", "z7_pursue", "z7_besor"]) regionAdd("taken", k); region.save.taken = region.save.taken.filter(k => !/^z7_fire/.test(k)); region.script.length = 0; } },
  { n: 1, fn() { const r = roomById("besor"); moveParty((r.c0 + 23) * T, GR * T); snapCamera(); } }, { keys: [], n: 2, snap: true }, { keys: [], n: 20 }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { const r = roomById("ziklag"); moveParty((r.c0 + 66) * T, GR * T); snapCamera(); zkEnter(r); region.script.length = 0; dialog.t = 0; } }, { keys: [], n: 3 }, { keys: [], n: 2, snap: true },
  { keys: [], n: 40 }, { keys: [], n: 2, snap: true }, { keys: [], n: 100 }, { keys: [], n: 2, snap: true }, { keys: [], n: 50 }, { keys: [], n: 2, snap: true }]);
