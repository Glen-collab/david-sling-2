// (11-19) Glen's hidden mouth: his clean picture at David's size; his clip of David crawling out as he leaves the camp,
//  straight into play, and Up at the mouth: his clip of crawling back in, then the camp
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const st = w => log(w + ": crawl " + (g5.crawl && g5.crawl.clip) + " room " + region.room.id + " col " + Math.round(david.x / T - region.room.c0));
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 }, { n: 1, fn() { clear(); const r = roomById("camp"); moveParty((r.c0 + 50) * T, FOOT); snapCamera(); } }, { keys: [], n: 90 },
  { n: 1, fn() { clear(); const r = roomById("camp"); moveParty((r.c0 + 57) * T, FOOT); snapCamera(); } }, { keys: ["ArrowRight"], n: 14 }, { keys: [], n: 60 },
  { n: 1, fn() { clear(); st("coming out"); } }, { keys: [], n: 3, snap: true }, { keys: [], n: 150, snap: true },
  { keys: [], n: 200 }, { n: 1, fn() { clear(); st("after"); } }, { keys: [], n: 3, snap: true },
  { keys: ["ArrowUp"], n: 3 }, { n: 1, fn() { const v = g5Video("crawl_in"); log("in: t " + v.currentTime.toFixed(2) + " ready " + v.readyState + " ended " + v.ended + " paused " + v.paused + " crawl " + JSON.stringify(g5.crawl)); } }, { keys: [], n: 20 }, { n: 1, fn() { const v = g5Video("crawl_in"); log("in+20: t " + v.currentTime.toFixed(2) + " crawl " + JSON.stringify(g5.crawl)); } }, { keys: [], n: 20, snap: true }, { keys: [], n: 60, snap: true }, { keys: [], n: 300 }, { n: 1, fn() { clear(); st("gone in"); } }]);
