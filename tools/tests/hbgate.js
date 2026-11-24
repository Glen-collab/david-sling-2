// (11-24) the elders at the gate of Hebron (Glen: the open-mouthed staff man out, the little one too small)
startSetup = () => {}; setup.active = false; helpT = 0;
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); };
const steps = [{ n: 1, fn() { clean(); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted"].forEach(k => regionAdd("taken", k)); const r = roomById("gate"); moveParty((r.c0 + 16) * T, GR * T); snapCamera(); } },
  { keys: [], n: 10 }, { n: 1, fn() { region.script.length = 0; dialog.t = 0; region.wait = 0; } }, { keys: ["ArrowRight"], n: 8 }, { keys: [], n: 20 }, { keys: [], n: 2, snap: true }, { n: 1, fn: clean }];
testRun(steps);
