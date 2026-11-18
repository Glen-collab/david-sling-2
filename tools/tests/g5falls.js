startSetup = () => {}; setup.active = false;
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 }, { n: 1, fn() { clear(); region.beasts.length = 0; at("spring", 58); } }, { keys: [], n: 20 }, { n: 1, fn() { clear(); } }, { keys: [], n: 40, snap: true }]);
