// (11-20) Carmel: the sermon crawl before the camp
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => k !== "crawl"); regionCrawlStart(); } }, { keys: [], n: 300, snap: true }, { keys: [], n: 300, snap: true }]);
