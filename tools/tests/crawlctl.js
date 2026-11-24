// (11-24) the crawl's controls: Right pauses (it stays put), Up backs up the page, Down speeds it on
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
let t0;
testRun([{ n: 1, fn() { regionCrawlStart(); region.crawl.t = 20; } }, { keys: [], n: 120 }, { n: 1, fn() { log("playing: t " + region.crawl.t.toFixed(2)); } },
  { keys: ["ArrowRight"], n: 1 }, { keys: [], n: 1, fn() { t0 = region.crawl.t; } }, { keys: [], n: 120 }, { n: 1, fn() { log("paused " + region.crawl.paused + ": moved " + (region.crawl.t - t0).toFixed(2)); } }, { keys: [], n: 2, snap: true },
  { keys: ["ArrowUp"], n: 120 }, { n: 1, fn() { log("after Up: t " + region.crawl.t.toFixed(2)); } },
  { keys: ["ArrowDown"], n: 60 }, { n: 1, fn() { log("after Down: t " + region.crawl.t.toFixed(2)); } }, { keys: [], n: 2, snap: true }]);
