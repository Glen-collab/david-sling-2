// (11-20) Glen's Carmel pictures: David's camp in Paran, and Nabal's house and the shearing
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; region.crawl = null; };
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
testRun([{ n: 1, fn() { clear(); at("camp", 20); } }, { keys: [], n: 30, snap: true },
  { n: 1, fn() { clear(); at("camp", 45); } }, { keys: [], n: 30, snap: true },
  { n: 1, fn() { clear(); at("shearing", 15); } }, { keys: [], n: 30, snap: true },
  { n: 1, fn() { clear(); at("shearing", 40); } }, { keys: [], n: 30, snap: true }]);
