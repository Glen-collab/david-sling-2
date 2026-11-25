// (11-25) Simeon's banner resaved solid (Glen): standing and walking at the feast
startSetup = () => {}; setup.active = false; helpT = 0;
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); };
const show = (pairs) => ({ n: 1, fn() { region.script.length = 0; dialog.t = 0; region.wait = 0; region.jscene = null; hb.cine = null;
  for (const t of hb.tribes) t.st = "wait"; for (const [i, dx, st] of pairs) { const t = hb.tribes[i]; t.x = david.x + dx; t.st = st; } } });
testRun([{ n: 1, fn() { clean(); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave"].forEach(k => regionAdd("taken", k)); const r = roomById("feast"); moveParty((r.c0 + 40) * T, GR * T); snapCamera(); } },
  { keys: [], n: 10 }, show([[1, 220, "here"]]), { keys: [], n: 8 }, { keys: [], n: 2, snap: true },
  show([[1, 600, "come"]]), { keys: [], n: 6 }, { keys: [], n: 2, snap: true }, { n: 1, fn: clean }]);
