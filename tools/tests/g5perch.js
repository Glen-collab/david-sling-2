// (11-19) the eagle sitting on its high perch (held sitting: set after the room's own reset on entering)
startSetup = () => {}; setup.active = false;
const hold = () => { const e = region.beasts.find(b => b.kind === "eagle"); Object.assign(e, { x: e.hx, y: e.hy, state: "perch", cool: 99 }); };
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; const r = roomById("rocks"); moveParty((r.c0 + 46) * T, FOOT); snapCamera(); } },
  { keys: [], n: 5 }, { n: 1, fn: hold }, { keys: [], n: 3 }, { n: 1, fn() { const e = region.beasts.find(b => b.kind === "eagle"); TEST_ERRORS.push("INFO now " + e.state + " " + Math.round(e.y)); } }, { keys: [], n: 1, snap: true }]);
