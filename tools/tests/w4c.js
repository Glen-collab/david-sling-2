// World 4: the tunnel at the top of the Crumbling Ledges, to the top of the well; the stairs in the Lamp Hall
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (id, px, y) => () => { const r = roomById(id); moveParty(r.c0 * T + px, y); region.camFootY = y; snapCamera(); };
testRun([
  { n: 1, fn: at("ledges", 1100, -1707) }, { keys: [], n: 40 }, { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 150, fn() { log("now " + region.room.id + " y " + Math.round(david.y) + " ground " + david.onGround); } }, { keys: [], n: 1, snap: true },
  { n: 1, fn: at("lamphall", 56 * 36 + 270, GR * T) }, { keys: [], n: 40 }, { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 150, fn() { log("now " + region.room.id + " y " + Math.round(david.y) + " ground " + david.onGround); } }, { keys: [], n: 1, snap: true },
]);
