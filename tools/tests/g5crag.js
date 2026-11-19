// (11-19) on top of the high crag (the hive), at its right edge: the wider cliff over the painted rocks
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { region.crawl = null; region.save.taken.push("g5_goats"); learnSkill("wallClimb"); } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; region.beasts.length = 0; g5.guards.length = 0; const w = region.walls.filter(w => w.room === "rocks")[1]; moveParty(w.x1 - 20, w.top); snapCamera(); } },
  { keys: [], n: 30, snap: true }]);
