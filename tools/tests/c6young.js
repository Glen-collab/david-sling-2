// (11-20) the camp's own men stand before Nabal
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; region.crawl = null; };
testRun([{ n: 1, fn() { clear(); const r = roomById("shearing"); c6.cut = true; c6.pose = { hide: true, t: 0 }; moveParty((r.c0 + 18) * T, GR * T); snapCamera(); } }, { keys: [], n: 30, snap: true }]);
