// World 4: the Camp as it plays, David in it (for Glen's crowd pictures)
startSetup = () => {}; setup.active = false;
const at = k => () => { const r = roomById("camp"); moveParty((r.c0 + k) * T, GR * T); david.facing = 1; snapCamera(); };
const S = [{ n: 1, fn: at(20) }, { keys: [], n: 400 }];
for (const k of [20, 55, 95]) S.push({ n: 1, fn: at(k) }, { keys: [], n: 60 }, { n: 1, fn() { at(k)(); toastTime = 0; toastText = ""; } }, { keys: [], n: 5 }, { keys: [], n: 1, snap: true });
testRun(S);
