// (11-24) Glen's stills of David's men, wherever they sit: ROOM and COLS from the query (?room=camp&cols=30,44)
startSetup = () => {}; setup.active = false; helpT = 0;
const q = new URLSearchParams(location.search), room = q.get("room"), cols = (q.get("cols") || "10").split(",").map(Number), pre = (q.get("taken") || "").split(",").filter(Boolean);
const steps = [{ n: 1, fn() { for (const k of pre) regionAdd("taken", k); region.script.length = 0; } }];
for (const c of cols) steps.push({ n: 1, fn() { const r = roomById(room); moveParty((r.c0 + c) * T, GR * T); snapCamera(); } }, { keys: [], n: 15, fn() { dialog.t = 0; region.script.length = 0; } }, { keys: [], n: 2, snap: true });
testRun(steps);
