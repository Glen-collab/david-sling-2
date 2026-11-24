// (11-24) Glen's twelve tribes' leaders at the feast: each with his banner and donkey; Reuben and Gad together;
// Benjamin and Manasseh on the walking-stick man till theirs come
startSetup = () => {}; setup.active = false; helpT = 0;
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); };
const show = (pairs) => ({ n: 1, fn() { region.script.length = 0; dialog.t = 0; region.wait = 0; region.jscene = null; hb.cine = null;
  for (const t of hb.tribes) t.st = "wait"; for (const [i, dx, st] of pairs) { const t = hb.tribes[i]; t.x = david.x + dx; t.st = st; } } });
testRun([{ n: 1, fn() { clean(); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave"].forEach(k => regionAdd("taken", k)); const r = roomById("feast"); moveParty((r.c0 + 40) * T, GR * T); snapCamera(); } },
  { keys: [], n: 10 }, show([[0, 220, "here"], [11, 560, "come"]]), { keys: [], n: 8 }, { keys: [], n: 2, snap: true },
  show([[3, 220, "here"], [7, 560, "leave"], [5, 900, "come"]]), { keys: [], n: 8 }, { keys: [], n: 2, snap: true },
  show([[5, 220, "here"], [8, 560, "come"]]), { keys: [], n: 8 }, { keys: [], n: 2, snap: true }, { n: 1, fn: clean }]);
