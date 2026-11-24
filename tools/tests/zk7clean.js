// (11-24) empties Ziklag from the test save (the save stays between test runs: zk7flow then starts from nothing)
startSetup = () => {}; setup.active = false;
region.save.taken = region.save.taken.filter(k => !/^z7_|^crawl_ziklag$/.test(k)); region.save.jSp = []; regionWrite();
testRun([{ keys: [], n: 2, snap: true }]);
