// (11-24) Hebron (2:4): the men of Judah and the elder who anoints David (Glen: no Samuel; no one twice on a screen)
startSetup = () => {}; setup.active = false; helpT = 0;
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); };
const place = () => { const r = roomById("hebron"); moveParty((r.c0 + 36) * T, GR * T); snapCamera(); region.script.length = 0; dialog.t = 0; hb.cine = null; region.jscene = null; };
testRun([{ n: 1, fn() { clean(); regionAdd("taken", "hb_ask"); place(); } }, { keys: [], n: 10 }, { n: 1, fn: place }, { keys: [], n: 3, snap: true },
  { n: 1, fn() { hb.kneel = true; hb.elder.x = david.x + 70; } }, { keys: [], n: 3, snap: true }, { n: 1, fn() { hb.kneel = false; clean(); } }]);
