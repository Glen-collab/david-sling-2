if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
learnSkill("bow");
const log = m => TEST_ERRORS.push("INFO " + m);
const steps = [{ n: 3, fn() { moveParty(583, GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 20 }, { keys: ["ArrowUp", "KeyV"], n: 2 }];
for (let i = 0; i < 30; i++) steps.push({ keys: i < 18 ? ["ArrowUp"] : [], n: 1, fn() { const a = stones.find(s => s.bow); if (a) log(`x ${Math.round(a.x)} y ${Math.round(a.y)} vx ${Math.round(a.vx)} vy ${Math.round(a.vy)}`); } });
testRun(steps);
