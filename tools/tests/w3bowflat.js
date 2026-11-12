if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("bow");
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 3, fn() { moveParty(583, GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 20 },
  { keys: ["ArrowUp", "ArrowRight", "KeyV"], n: 2 }, { keys: ["ArrowUp", "ArrowRight"], n: 18, fn() { const a = stones.find(s => s.bow); log("flat: vy " + (a ? Math.round(a.vy) : "none")); } }]);
