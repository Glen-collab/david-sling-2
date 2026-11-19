// (11-19) the eagle's perch seen from up high (Glen: "not on his rock" once the camera's risen)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("rocks"); const w = region.walls.filter(w => w.room === "rocks").sort((a, b) => a.top - b.top)[0]; moveParty((w.x0 + w.x1) / 2, w.top); snapCamera(); const e = region.beasts.find(b => b.kind === "eagle"); e.cool = 99; log("camY " + Math.round(camY) + " eagle " + Math.round(e.x) + "," + Math.round(e.y) + " wall top " + w.top); } },
  { keys: [], n: 3, snap: true },
  { n: 1, fn() { const r = roomById("rocks"); moveParty((r.c0 + 50) * T, 150); snapCamera(); log("camY " + Math.round(camY)); } }, { keys: [], n: 3, snap: true }]);
