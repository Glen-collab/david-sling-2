// World 4: Up at the tunnel under the Flooded Tunnel's water while swimming over it (Glen 11-13)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([
  { n: 1, fn() { const o = r4.tunnels.find(t => t.id === "flood_under"); roomById("flooded").dark = 0; moveParty(o.x, o.y - 120); snapCamera(); } },
  { keys: [], n: 10, fn() { log("swimming " + !!r4.swim + " y " + Math.round(david.y)); } },
  { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 8, fn() { log("walk " + !!r4.walk + " swim " + !!r4.swim + " trans " + !!region.trans); } }, { keys: [], n: 1, snap: true },
  { keys: [], n: 120, fn() { log("then: " + (roomAt(david.x) || {}).id); } },
]);
