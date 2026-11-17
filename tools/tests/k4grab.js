// (Glen 11-17) a raider stops at a floor, picks up the sack and runs off with it on his back (raider_pickup, raider_sack_run)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let Q = null;
const look = () => { david.inv = 99; moveParty(Q.x - Q.dir * 170, Q.y); snapCamera(); for (const o of k4.raiders) if (o !== Q) o.x = -9999; };
testRun([{ n: 1, fn() { regionAdd("taken", "k4_asked"); region.save.taken = region.save.taken.filter(t => t !== "k4_floors"); const r = roomById("floors"); moveParty((r.c0 + 50) * T, GR * T); snapCamera(); } },
  { keys: [], n: 300 },
  { n: 1, fn() { Q = k4.raiders[0]; log("raiders " + k4.raiders.length); if (!Q) return; const f = k4.floors[0]; Object.assign(Q, { f, x: f.x - 20, y: f.y, state: "grab", t: 0.9, dir: 1 }); look(); } },
  { keys: [], n: 3, snap: true, fn() { if (Q) { look(); log("state " + Q.state + " t " + Q.t.toFixed(2)); } } },
  { keys: [], n: 30, fn() { if (Q) look(); } }, { keys: [], n: 2, snap: true, fn() { if (Q) { look(); log("state " + Q.state + " carry " + Q.carry); } } }]);
