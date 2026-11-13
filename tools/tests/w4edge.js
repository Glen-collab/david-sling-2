// a tall room's sides (Glen 11-13): up the Crumbling Ledges, left doesn't take him out; at the bottom it does
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const where = () => (roomAt(david.x) || {}).id + " x " + Math.round(david.x - roomAt(david.x).c0 * T) + " y " + Math.round(david.y);
let L;
const S = [{ keys: [], n: 30 }, { n: 1, fn() {
  const r = roomById("ledges"); r.dark = 0;
  const ps = region.props.filter(p => p.room === "ledges" && p.n.startsWith("w4_ledge") && p.y < 300).sort((a, b) => a.x - b.x);
  const p = ps[0], k = KIT[p.n]; L = { x: p.x + 30, y: p.y + k.top + Math.round(k.h * R4.STAND) };
  moveParty(L.x, L.y); region.camFootY = L.y; snapCamera(); log("on the leftmost high ledge: " + where()); } },
  { keys: [], n: 10 }, { keys: ["ArrowLeft"], n: 40, fn() { log("left off it: " + where()); } }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { const r = roomById("ledges"); moveParty(r.c0 * T + 60, GR * T); region.camFootY = GR * T; snapCamera(); } }, { keys: ["ArrowLeft"], n: 60, fn() { log("at the bottom, left (stays: no side way out now): " + where()); } }];
testRun(S);
