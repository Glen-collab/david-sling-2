// just load and run a moment (any world): errors?
startSetup = () => {}; setup.active = false;
testRun([{ keys: [], n: 60, fn() { TEST_ERRORS.push("INFO room " + ((typeof region !== "undefined" && region.room) || {}).id); } }]);
