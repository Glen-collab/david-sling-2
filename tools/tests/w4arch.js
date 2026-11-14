// (Glen 11-14) the Warren's side-cave arches, open, by lamplight (lamp made big to see them)
startSetup = () => {}; setup.active = false;
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const go = (rm, k) => [{ n: 1, fn() { regionAdd("taken", "r4_lamp"); for (const o of r4.tunnels) if (o.might) o.might.broken = true; roomById("warren").dark = 0.2; at(rm, k); } }, { keys: [], n: 60 }, { n: 1, fn() { at(rm, k); } }, { keys: [], n: 3 }, { keys: [], n: 1, snap: true }];
testRun([...go("warren", 83), ...go("warren", 37)]);
