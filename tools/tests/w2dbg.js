startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 2, fn() { const r = roomById("palace"); log("palace ladders " + JSON.stringify(ladders.filter(l => l.room === "palace").map(l => [Math.round(l.x), l.topY, l.botY]))); log("win " + r2.winRope.x); } }]);
