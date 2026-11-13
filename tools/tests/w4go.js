// World 4 (Glen 11-13 rework): tunnels by id, and out of the Crumbling Ledges at the left (he was stuck there)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const where = () => (roomAt(david.x) || {}).id + " x " + Math.round(david.x - roomAt(david.x).c0 * T) + " y " + Math.round(david.y);
const toTun = id => () => { const o = r4.tunnels.find(t => t.id === id); david.hearts = david.maxHearts; david.fallTop = null; moveParty(o.x, o.y); region.camFootY = o.y; snapCamera(); };
const S = [];
for (const id of ["mouth_in", "camp_in", "lamp_down", "warren_back", "n3", "ledges_top", "well_top", "flood_under", "deep_in", "n4", "climb_top", "climb_secret", "under_in", "cs_top", "camp_side"])
  S.push({ n: 1, fn: toTun(id) }, { keys: [], n: 20 }, { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 150, fn() { log(id + " -> " + where()); } });
S.push({ n: 1, fn() { const r = roomById("ledges"); moveParty(r.c0 * T + 60, GR * T); snapCamera(); } }, { keys: ["ArrowLeft"], n: 90, fn() { log("ledges left edge -> " + where()); } });
S.push({ n: 1, fn() { const r = roomById("narrows"); moveParty((r.c0 + r.w) * T - 60, GR * T); snapCamera(); } }, { keys: ["ArrowRight"], n: 90, fn() { log("narrows right edge -> " + where()); } }, { keys: [], n: 1, snap: true });
S.push({ n: 1, fn() { const r = roomById("spring"); moveParty((r.c0 + r.w) * T - 60, GR * T); snapCamera(); } }, { keys: ["ArrowRight"], n: 60, fn() { log("spring right edge -> " + where()); } });
S.push({ n: 1, fn() { const r = roomById("spring"); moveParty(r.c0 * T + 60, GR * T); snapCamera(); } }, { keys: ["ArrowLeft"], n: 60, fn() { log("spring left edge -> " + where()); } });
S.push({ n: 1, fn() { const r = roomById("deep"); moveParty(r.c0 * T + 60, 500); snapCamera(); } }, { keys: ["ArrowLeft"], n: 60, fn() { log("deep left edge -> " + where()); } });
S.push({ n: 1, fn() { const r = roomById("under"); moveParty(r.c0 * T + 60, GR * T); snapCamera(); } }, { keys: ["ArrowLeft"], n: 60, fn() { log("under left edge -> " + where()); } });
S.push({ n: 1, fn() { const r = roomById("climb"); moveParty((r.c0 + r.w) * T - 60, GR * T); snapCamera(); } }, { keys: ["ArrowRight"], n: 60, fn() { log("climb right edge -> " + where()); } });
testRun(S);
