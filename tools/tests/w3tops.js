if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const c0 = roomById("gathroad").c0;
testRun([{ n: 2, fn() { TEST_ERRORS.push("INFO tops " + JSON.stringify((region.tops || []).map(t => [Math.round(t.x0 / T - c0), Math.round(t.x1 / T - c0), t.top]))); } }]);
