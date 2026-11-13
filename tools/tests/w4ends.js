// World 4: the tunnels in Glen's painted arches (at a room's start or end, where the camera stands still), the side caves
startSetup = () => {}; setup.active = false;
const at = (id, k) => () => { const r = roomById(id); r.dark = 0; moveParty((r.c0 + k) * T, GR * T); region.camFootY = GR * T; snapCamera(); };
const S = [];
for (const [id, k] of [["mouth", 139.4], ["camp", 20.2], ["camp", 33], ["warren", 4.6], ["warren", 183.4], ["narrows", 4.5], ["narrows", 38], ["deep", 6.8], ["lamphall", 162]])
  S.push({ n: 1, fn: at(id, k) }, { keys: [], n: 20 }, { keys: [], n: 1, snap: true });
S.push({ n: 1, fn: at("camp", 20.2) }, { keys: [], n: 10 }, { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 12 }, { keys: [], n: 1, snap: true });
testRun(S);
