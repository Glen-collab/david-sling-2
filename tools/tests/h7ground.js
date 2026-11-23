// (11-23) Glen: "I can't step on this ground. It is fake?" The Wilderness of Ziph's far end: walk it, column by column
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) dialog.t = 0; };
const steps = [];
for (const k of [56, 62, 66, 68, 74, 80, 90, 94]) steps.push({ n: 1, fn() { const r = roomById("wild"); moveParty((r.c0 + k) * T, GR * T - 40); snapCamera(); david.inv = 99; } },
  { keys: [], n: 40, fn: skip }, { n: 1, fn() { log(`col ${k}: y ${Math.round(david.y)} onGround ${david.onGround} (want ${GR * T})`); } });
steps.push({ n: 1, fn() { const r = roomById("wild"); moveParty((r.c0 + 62) * T, GR * T); snapCamera(); } }, { keys: [], n: 20, fn: skip }, { keys: [], n: 2, snap: true });
testRun(steps);
