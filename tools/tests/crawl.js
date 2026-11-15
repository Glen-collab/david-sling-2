// (11-15) the crawl before a region (the tests skip it; this starts it): early, middle, late
startSetup = () => {}; setup.active = false;
testRun([{ keys: [], n: 5 }, { n: 1, fn() { regionCrawlStart(); } }, { keys: [], n: 150, snap: true }, { keys: [], n: 300, snap: true }, { keys: [], n: 300, snap: true }]);
