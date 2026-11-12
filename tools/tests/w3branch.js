if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const p = () => region.props.find(q => q.n === "w3_climbtree");
const st = [{ n: 2, fn() { const t = p(); log("tree x " + Math.round(t.x) + " y " + Math.round(t.y)); const b = R3_CLIMBTREE[2]; moveParty(t.x + 120, t.y + b.top + 2); snapCamera(); } }];
for (let i = 0; i < 6; i++) st.push({ keys: [], n: 3, fn() { log("y " + Math.round(david.y) + " x-tree " + Math.round(david.x - p().x) + " ground " + david.onGround); } });
testRun(st);
