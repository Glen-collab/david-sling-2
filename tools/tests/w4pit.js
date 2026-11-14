// (Glen 11-14) his pit picture down the Mouth's drops; the floor spider turns at the edge
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = k => { const r = roomById("mouth"); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
testRun([
  { n: 1, fn() { roomImg("w4/pit.png"); at(36); } }, { keys: [], n: 90 }, { n: 1, fn() { at(36); } }, { keys: [], n: 3 }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { at(74); } }, { keys: [], n: 40 }, { n: 1, fn() { at(74); } }, { keys: [], n: 3 }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { at(92); } }, { keys: [], n: 200, fn() { const b = region.beasts.find(b => b.kind === "spiderw" && b.room === "mouth"); if (b) log("spider x " + Math.round(b.x / T - roomById("mouth").c0)); } }, { keys: [], n: 1, snap: true },
]);
