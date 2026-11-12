if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("bow"); learnSkill("heavySword");
const log = m => TEST_ERRORS.push("INFO " + m);
const st = [{ n: 3, fn() { moveParty(583, GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 30 }, { keys: ["ArrowUp", "KeyV"], n: 1 }];
for (let i = 0; i < 30; i++) st.push({ keys: ["ArrowUp"], n: 1, fn() { const B = r2.bowShot; log(i + " t " + (B ? (r2.bowClock - B.t0).toFixed(3) : "-") + " fired " + (B && B.fired)); } });
testRun(st);
