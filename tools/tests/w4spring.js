// World 4: the long Hidden Spring (Glen 11-13: left all the way to under the Four Tunnels)
startSetup = () => {}; setup.active = false;
const at = k => () => { const r = roomById("spring"); r.dark = 0; moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const S = [];
for (const k of [200, 150, 100, 70]) S.push({ n: 1, fn: at(k) }, { keys: [], n: 90 }, { n: 1, fn: at(k) }, { keys: [], n: 10 }, { keys: [], n: 1, snap: true });
testRun(S);
