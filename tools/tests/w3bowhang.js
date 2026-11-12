// (Glen 11-12) the bow up high on the Road to Nob: Up + X shoots up; olives in the tree come down; a stone doesn't
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
learnSkill("bow");
const log = m => TEST_ERRORS.push("INFO " + m);
const h0 = () => r3.hangs[0];
let aimX = 0, ol = 0;
testRun([
  { n: 3, fn() { const h = h0(); aimX = h.x - (h.y - (GR * T - 72)) / Math.tan(0.62) * -1; moveParty(h.x - Math.round((GR * T - 72 - h.y) / Math.tan(0.62)), GR * T); david.facing = 1; snapCamera(); log("hang at x " + Math.round(h.x) + " y " + Math.round(h.y) + " david " + Math.round(david.x)); } },
  { keys: [], n: 30, snap: true },
  { keys: ["ArrowUp", "KeyV"], n: 2 }, { keys: ["ArrowUp"], n: 20 }, { keys: [], n: 8, snap: true, fn() { log("after shot: " + h0().state + " arrows " + stones.filter(s => s.bow).length); } },
  { keys: [], n: 40, fn() { log("then: " + h0().state); ol = david.olives; moveParty(h0().x, GR * T); } },
  { keys: [], n: 10, snap: true, fn() { log("picked: " + h0().state + " olives +" + (david.olives - ol)); } },
]);
