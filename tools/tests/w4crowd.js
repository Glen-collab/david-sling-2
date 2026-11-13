// World 4: the Camp's crowd (Glen's three pictures) with 0, 4 and 8 newcomers found
startSetup = () => {}; setup.active = false;
const at = k => () => { const r = roomById("camp"); moveParty((r.c0 + k) * T, GR * T); david.facing = 1; snapCamera(); toastTime = 0; };
const found = n => () => { region.save.taken = region.save.taken.filter(x => !x.startsWith("r4_man_")); for (let i = 0; i < n; i++) regionAdd("taken", "r4_man_" + i); };
const S = [{ n: 1, fn: at(55) }, { keys: [], n: 120 }];
for (const n of [0, 4, 8]) S.push({ n: 1, fn: found(n) }, { n: 1, fn: at(55) }, { keys: [], n: 5 }, { keys: [], n: 1, snap: true });
testRun(S);
