// (11-24) a region's crawl, part way up: ?at=seconds (the tests' copy doesn't start one by itself)
startSetup = () => {}; setup.active = false; helpT = 0;
const at = Number(new URLSearchParams(location.search).get("at") || 10);
testRun([{ n: 1, fn() { regionCrawlStart(); region.crawl.t = at; } }, { keys: [], n: 2 }, { keys: [], n: 2, snap: true }]);
