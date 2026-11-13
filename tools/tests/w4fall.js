// a long fall costs half his meter (Glen 11-13); and where the Bat Roost's top tunnel is
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let h0;
testRun([
  { n: 1, fn() { const r = roomById("camp"); moveParty((r.c0 + 40) * T, GR * T - 700); h0 = david.hearts; log("max " + david.maxHearts + " hearts " + h0); } },
  { keys: [], n: 90, fn() { log("after the fall: hearts " + david.hearts + " (lost " + (h0 - david.hearts) + ")"); } },
  { n: 1, fn() { const o = r4.tunnels.find(t => t.id === "roost_side"), r = roomById("roost"); r.dark = 0; log("roost_side x k " + (o.x / T - r.c0).toFixed(1) + " y " + o.y); moveParty(o.x, o.y - 4); region.camFootY = o.y; snapCamera(); } },
  { keys: [], n: 25, fn() { log("David y " + Math.round(david.y) + " onGround " + david.onGround + " camY " + Math.round(camY)); } }, { keys: [], n: 1, snap: true },
]);
