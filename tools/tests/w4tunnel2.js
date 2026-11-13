// World 4: the walk into the tunnel, frame by frame
startSetup = () => {}; setup.active = false;
const steps = [{ n: 3, fn() { const r = roomById("mouth"); moveParty((r.c0 + 57) * T, GR * T); snapCamera(); } }, { keys: [], n: 40 }, { keys: ["ArrowUp"], n: 2 }];
for (let i = 0; i < 8; i++) steps.push({ keys: [], n: 8, fn() { TEST_ERRORS.push("INFO t " + (r4.walk ? r4.walk.t.toFixed(2) : "-")); } }, { keys: [], n: 1, snap: true });
testRun(steps);
