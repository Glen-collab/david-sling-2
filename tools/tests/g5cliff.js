// (11-18) the first cliff on the Rocks: the picture covers the rock
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.crawl = null; region.save.taken.push("g5_goats"); g5RoomFood("spring").forEach(f => region.save.taken.push(f.id)); } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; region.beasts.length = 0; const r = roomById("rocks"); moveParty((r.c0 + 12) * T, FOOT); snapCamera(); log("camX " + Math.round(camX) + " c0x " + r.c0 * T + " camY " + Math.round(camY)); } },
  { keys: [], n: 30, snap: true }]);
