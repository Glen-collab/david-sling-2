// (Glen 11-14) under water by a tunnel: Up goes straight through, swimming all the way (not stood up while it fades)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const st = () => log("t " + (region.trans ? region.trans.t.toFixed(2) : "-") + " swim " + !!r4.swim + " state " + david.state + " room " + region.room.id);
testRun([
  { n: 1, fn() { const o = r4.tunnels.find(o => o.id === "flood_under"); moveParty(o.x, o.y - 80); david.vy = 0; snapCamera(); } }, { keys: [], n: 40, fn: st },
  { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 8, fn: st }, { keys: [], n: 1, snap: true }, { keys: [], n: 8, fn: st }, { keys: [], n: 8, fn: st }, { keys: [], n: 8, fn: st }, { keys: [], n: 1, snap: true },
]);
