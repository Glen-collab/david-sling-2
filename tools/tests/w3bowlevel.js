if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("bow"); skills.delete("heavySword");
testRun([{ n: 3, fn() { moveParty(583, GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 30 },
  { keys: ["ArrowUp", "ArrowRight", "KeyV"], n: 2 }, { keys: ["ArrowUp", "ArrowRight"], n: 3, snap: true }, { keys: ["ArrowUp", "ArrowRight"], n: 5, snap: true }]);
