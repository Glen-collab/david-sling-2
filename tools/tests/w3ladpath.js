if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("bow");
const log = m => TEST_ERRORS.push("INFO " + m);
const lad = () => r3.ladders[0];
const st = [{ n: 2, fn() { const o = lad(); moveParty(o.x - 357, GR * T); david.facing = 1; snapCamera(); log("knot " + Math.round(o.x) + "," + Math.round(o.top + 14) + " room " + region.room.id); } }, { keys: [], n: 25, fn() { log("david " + Math.round(david.x) + "," + Math.round(david.y) + " onGround " + david.onGround + " GR*T " + GR * T); } }, { keys: ["ArrowUp", "KeyV"], n: 2 }];
for (let i = 0; i < 16; i++) st.push({ keys: ["ArrowUp"], n: 1, fn() { const a = stones.find(s => s.bow); if (a) log(`x ${Math.round(a.x)} y ${Math.round(a.y)} d ${Math.round(r3SegDist(a, lad().x, lad().top + 14))}`); } });
testRun(st);
