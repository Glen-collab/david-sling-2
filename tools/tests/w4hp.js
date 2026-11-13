// the health meter (Glen 11-13: "too long. Let's shrink that"): what a well-grown David has now
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { david.maxHearts = 120; david.hearts = 90; log("str HP " + STR.HP + " pom " + RTUNE.POM_HP + " px " + RTUNE.METER_PX); } }, { keys: [], n: 10 }, { keys: [], n: 1, snap: true }]);
