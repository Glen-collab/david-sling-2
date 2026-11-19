// (11-19) on top of the first cliff at its right edge; Down there climbs down
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.crawl = null; region.save.taken.push("g5_goats"); learnSkill("wallClimb"); g5RoomFood("spring").forEach(f => region.save.taken.push(f.id)); } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; region.beasts.length = 0; g5.guards.length = 0; const w = region.walls.find(w => w.room === "rocks"); moveParty(w.x1 - 20, w.top); snapCamera(); log("wall " + w.x0 + "-" + w.x1 + " top " + w.top); } },
  { keys: [], n: 30, snap: true },
  { n: 1, fn() { const w = region.walls.find(w => w.room === "rocks"); log("pre onGround " + david.onGround + " skill " + hasSkill("wallClimb") + " room " + roomAt(david.x).id + " climb " + !!region.climb + " state " + david.state); } }, { keys: ["ArrowDown"], n: 3 }, { n: 1, fn() { log("climb " + JSON.stringify(region.climb && region.climb.kind) + " y " + Math.round(david.y)); } },
  { keys: ["ArrowDown"], n: 40, snap: true },
  ...Array.from({length: 8}, () => [{ keys: ["ArrowDown"], n: 15 }, { n: 1, fn() { log("y " + Math.round(david.y) + " climb " + !!region.climb + " st " + david.state + " GRT " + GR * T); } }]).flat(), { n: 1, fn() { log("after: climb " + !!region.climb + " y " + Math.round(david.y) + " x " + Math.round(david.x)); } }]);
