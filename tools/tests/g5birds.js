// (11-19) ravens in the dead trees, vultures on the acacias and the ground
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const at = k => ({ n: 1, fn() { clear(); g5.guards.length = 0; const r = roomById("wild"); moveParty((r.c0 + k) * T, FOOT); snapCamera(); camX += 9 * T; david.inv = 99; } });
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  at(14), { keys: [], n: 2 }, { n: 1, fn: clear }, { keys: [], n: 2, snap: true },
  at(60), { keys: [], n: 2 }, { n: 1, fn: clear }, { keys: [], n: 2, snap: true }]);
