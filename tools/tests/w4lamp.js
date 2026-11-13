// World 4: the Lamp Hall with Glen's resaved columns (full height) and his stairs into the tunnel
startSetup = () => {}; setup.active = false;
const at = k => () => { const r = roomById("lamphall"); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const S = [];
for (const k of [20, 90, 160]) S.push({ n: 1, fn: at(k) }, { keys: [], n: 90 }, { n: 1, fn: at(k) }, { keys: [], n: 10 }, { keys: [], n: 1, snap: true });
testRun(S);
