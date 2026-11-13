// World 4: the Old Well Shaft (Glen 11-13: no water halfway, fog): walking down it from the top, then the bottom
startSetup = () => {}; setup.active = false;
const at = y => () => { const r = roomById("well"); moveParty((r.c0 + 20) * T, y); region.camFootY = y; snapCamera(); };
const S = [];
for (const y of [612, -800, -1800, -2900]) S.push({ n: 1, fn: at(y) }, { keys: [], n: 40 });
for (const y of [-2900, -1800, -800, 612]) S.push({ n: 1, fn: at(y) }, { keys: [], n: 30 }, { keys: [], n: 1, snap: true });
testRun(S);
