// (11-19) Glen's new wall climb: up the first cliff's left face, over the top (his pull-over), and back down (it backwards)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const st = () => { const c = region.climb; log((c ? c.kind + (c.dir ? " dir " + c.dir : "") : "none") + " x " + Math.round(david.x) + " y " + Math.round(david.y) + " ground " + david.onGround); };
testRun([{ n: 1, fn() { region.crawl = null; region.save.taken.push("g5_goats"); learnSkill("wallClimb"); } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; region.beasts.length = 0; g5.guards.length = 0; const w = region.walls.find(w => w.room === "rocks"); moveParty(w.x0 - 30, FOOT); david.facing = 1; snapCamera(); log("wall " + w.x0 + " top " + w.top); } },
  { keys: ["ArrowUp"], n: 2 }, { n: 1, fn: st }, { keys: ["ArrowUp"], n: 40, snap: true }, { n: 1, fn: st },
  { keys: ["ArrowUp"], n: 30 }, { n: 1, fn: st }, { keys: [], n: 2, snap: true }, { keys: [], n: 10, snap: true }, { n: 1, fn: st }, { keys: [], n: 30, snap: true }, { n: 1, fn: st },
  { keys: ["ArrowLeft"], n: 6 }, { keys: [], n: 2 }, { n: 1, fn: st }, { keys: ["ArrowDown"], n: 2 }, { n: 1, fn: st }, { keys: [], n: 14, snap: true }, { n: 1, fn: st },
  { keys: [], n: 60 }, { n: 1, fn: st }, { keys: ["ArrowDown"], n: 50, snap: true }, { n: 1, fn: st }, { keys: ["ArrowDown"], n: 60 }, { n: 1, fn: st }]);
