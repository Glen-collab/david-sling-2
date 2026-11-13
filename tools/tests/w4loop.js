// World 4: the loop back (Glen 11-13): the Deep Pool under the water, the Long Climb, its secret crack, Beneath the Warren, the shaft to the Camp
startSetup = () => {}; setup.active = false;
const at = (id, k, y = GR * T) => () => { const r = roomById(id); r.dark = 0; moveParty((r.c0 + k) * T, y); region.camFootY = Math.min(y, GR * T); snapCamera(); };
const toTun = id => () => { const o = r4.tunnels.find(t => t.id === id); roomById(o.room).dark = 0; moveParty(o.x + 30, o.y); region.camFootY = o.y; snapCamera(); };
const S = [{ keys: [], n: 30 }];
for (const f of [at("deep", 40, 300), at("deep", 100, 500), at("climb", 20), toTun("climb_secret"), at("under", 64), at("campshaft", 20, -800)]) S.push({ n: 1, fn: f }, { keys: [], n: 120 }, { n: 1, fn: f }, { keys: [], n: 20 }, { keys: [], n: 1, snap: true });
testRun(S);
