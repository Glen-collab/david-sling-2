// (11-19) the eagle on its high perch past the crag, a soldier by the rocks; then it goes up and swoops
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.crawl = null; region.save.taken.push("g5_goats"); g5RoomFood("spring").forEach(f => region.save.taken.push(f.id)); } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("rocks"); moveParty((r.c0 + 47) * T, FOOT); snapCamera(); } },
  { keys: [], n: 3, snap: true },
  { n: 1, fn() { const e = region.beasts.find(b => b.kind === "eagle"); log("eagle " + e.state + " y " + Math.round(e.y) + " guards here " + g5.guards.filter(g => g.room === "rocks" && g5Active(g)).length); e.state = "perch"; } },
  { keys: ["ArrowRight"], n: 12 }, { keys: [], n: 1 },
  ...Array.from({ length: 10 }, () => [{ keys: [], n: 9 }, { n: 1, fn() { const e = region.beasts.find(b => b.kind === "eagle"); log("eagle " + e.state + " y " + Math.round(e.y) + " david " + Math.round(david.y)); } }]).flat(),
  { keys: [], n: 1, snap: true }]);
