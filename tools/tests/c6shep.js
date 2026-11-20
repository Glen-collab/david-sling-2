// (11-20) Glen's new shepherd at the fold
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; region.crawl = null; };
testRun([{ n: 1, fn() { clear(); region.save.taken = region.save.taken.filter(k => !/^c6_/.test(k) || k === "c6_intro"); const r = roomById("fields"); moveParty((r.c0 + 63) * T, GR * T); snapCamera(); for (const h of c6.hunters) h.state = "gone"; } },
  { keys: [], n: 60, fn() { clear(); } }, { keys: [], n: 2, snap: true }]);
