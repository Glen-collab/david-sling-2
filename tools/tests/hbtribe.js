// (11-24) a tribe at the feast next to David: the leader, his donkey, his banner (Glen: the donkeys are super small)
startSetup = () => {}; setup.active = false; helpT = 0;
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); };
const steps = [{ n: 1, fn() { clean(); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave"].forEach(k => regionAdd("taken", k)); const r = roomById("feast"); moveParty((r.c0 + 40) * T, GR * T); snapCamera(); } },
  { keys: [], n: 10 }, { n: 1, fn() { region.script.length = 0; dialog.t = 0; region.wait = 0; const t = hb.tribes[0]; if (t) { t.x = david.x + 260; t.st = "here"; } const u = hb.tribes[1]; if (u) { u.x = david.x + 640; u.st = "leave"; } } },
  { keys: [], n: 10 }, { keys: [], n: 2, snap: true }, { n: 1, fn: clean }];
testRun(steps);
