// (11-20) Glen's clip of David's anger: stewing (25:21), the sword (25:13), storming off
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; region.crawl = null; };
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
testRun([{ n: 1, fn() { clear(); at("camp", 25); david.facing = 1; c6.pose = { angry: true, t: 0 }; } }, { keys: [], n: 150, snap: true },
  { n: 1, fn() { c6.pose = { sword: true, t: 0 }; } }, { keys: [], n: 50, snap: true },
  { n: 1, fn() { c6.pose = { walk: true, t: 0 }; } }, { keys: [], n: 40, snap: true },
  { n: 1, fn() { TEST_ERRORS.push("INFO x " + Math.round(david.x)); c6.pose = null; } }, { keys: [], n: 10, snap: true }]);
