// (Glen 11-12) his bow clips: drawing up and level, with Goliath's sword on his back; then without it
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("bow"); learnSkill("heavySword");
const log = m => TEST_ERRORS.push("INFO " + m);
const arrow = () => { const a = stones.find(s => s.bow); return a ? `arrow at dx ${Math.round(a.x - david.x)} dy ${Math.round(a.y - david.y)}` : "no arrow"; };
testRun([
  { n: 3, fn() { moveParty(583, GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 30 },
  { keys: ["ArrowUp", "KeyV"], n: 2 }, { keys: ["ArrowUp"], n: 3, snap: true }, { keys: ["ArrowUp"], n: 5, snap: true, fn() { log("up: " + arrow()); } },
  { keys: [], n: 40 },
  { keys: ["ArrowUp", "ArrowRight", "KeyV"], n: 2 }, { keys: ["ArrowUp", "ArrowRight"], n: 3, snap: true }, { keys: ["ArrowUp", "ArrowRight"], n: 5, snap: true, fn() { log("level: " + arrow()); skills.delete("heavySword"); } },
  { keys: [], n: 40 },
  { keys: ["ArrowUp", "KeyV"], n: 2 }, { keys: ["ArrowUp"], n: 3, snap: true }, { keys: ["ArrowUp"], n: 5, snap: true, fn() { log("no sword up: " + arrow()); } },
]);
