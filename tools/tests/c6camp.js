// (11-20) Glen's second camp mid, farther off
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; region.crawl = null; };
const at = (k) => { const r = roomById("camp"); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
testRun([{ n: 1, fn() { clear(); at(20); } }, { keys: [], n: 60, fn() { clear(); } }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { clear(); at(45); } }, { keys: [], n: 30, fn() { clear(); } }, { keys: [], n: 2, snap: true }]);
