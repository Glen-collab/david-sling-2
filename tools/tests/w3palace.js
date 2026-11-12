if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 2, fn() { moveParty((roomById("streets").c0 + 99) * T, GR * T); snapCamera(); for (const g of r3.guards) g.x = -9999; } }, { keys: [], n: 20 }, { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 60, fn() { log("palace door -> " + region.room.id); } }]);
