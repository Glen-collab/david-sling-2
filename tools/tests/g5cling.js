// (11-19) Glen: jump at a rock face and hold Up: David grabs it in the air
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
let w;
testRun([{ n: 1, fn() { region.crawl = null; learnSkill("wallClimb"); } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); region.beasts.length = 0; g5.guards.length = 0; w = region.walls.find(o => o.room === "rocks"); moveParty(w.x0 - 90, FOOT); david.facing = 1; snapCamera(); log("wall top " + w.top + " x0 " + w.x0); } }, { keys: [], n: 20 },
  { n: 1, fn: clear }, { keys: ["KeyZ", "ArrowRight"], n: 10 }, { keys: ["ArrowRight", "ArrowUp"], n: 4 },
  { n: 1, fn() { log("climb " + (region.climb && region.climb.kind) + " y " + Math.round(david.y) + " ground " + david.onGround); } }, { keys: [], n: 30, snap: true },
  { n: 1, fn() { log("still " + (region.climb && region.climb.kind) + " y " + Math.round(david.y)); } }, { keys: ["ArrowUp"], n: 30 }, { n: 1, fn() { log("up " + (region.climb && region.climb.kind) + " y " + Math.round(david.y)); } }, { keys: [], n: 2, snap: true }]);
