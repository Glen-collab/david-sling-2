if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; kitImg("w3_climbtree_tall");
const log = m => TEST_ERRORS.push("INFO " + m);
const p = () => region.props.find(q => q.n === "w3_climbtree_tall");
testRun([{ n: 2, fn() { const t = p(), b = R3_CLIMBTREE[5]; moveParty(t.x + (b.x0 + b.x1) / 2, t.y + b.top + 2); snapCamera(); for (const q of region.beasts) if (q.room === "gathroad") q.dead = true; } },
  { keys: [], n: 30, snap: true, fn() { log("on ledge 5: y " + Math.round(david.y) + " ground " + david.onGround + " camY " + Math.round(camY)); } },
  { keys: ["KeyZ"], n: 2 }, { keys: ["KeyZ", "ArrowRight"], n: 18 }, { keys: [], n: 20, snap: true, fn() { log("after a jump right: y " + Math.round(david.y) + " ground " + david.onGround); } }]);
