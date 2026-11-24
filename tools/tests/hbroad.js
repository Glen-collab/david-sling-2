// (11-24) the road to Hebron: the families following David (Glen: the boy was huge, use a different child)
startSetup = () => {}; setup.active = false; helpT = 0;
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); };
const steps = [{ n: 1, fn() { clean(); regionAdd("taken", "hb_ask"); const r = roomById("road"); moveParty((r.c0 + 6) * T, GR * T); snapCamera(); } },
  { keys: [], n: 5 }, { n: 1, fn() { region.script.length = 0; dialog.t = 0; region.wait = 0; } }, { keys: ["ArrowRight"], n: 50 }, { keys: [], n: 40 }, { keys: [], n: 2, snap: true }, { n: 1, fn: clean }];
testRun(steps);
