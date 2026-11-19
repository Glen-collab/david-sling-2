// (11-19) the Wilderness ibex in front of the thorn-hidden cave, not behind it
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); g5.guards.length = 0; const r = roomById("wild"); moveParty((r.c0 + 140) * T, FOOT); snapCamera();
    const b = region.beasts.find(o => o.kind === "ibex" && roomAt(o.x) === r); if (b) { b.x = (r.c0 + 149) * T; b.home = b.x; } TEST_ERRORS.push("INFO ibex " + !!b); } },
  { keys: [], n: 2 }, { n: 1, fn: clear }, { keys: [], n: 3, snap: true }]);
