// World 4: Up at the Cave Mouth's tunnel: he turns, walks in, comes out in the Camp
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([
  { n: 3, fn() { const r = roomById("mouth"); moveParty((r.c0 + 57) * T, GR * T); snapCamera(); } }, { keys: [], n: 30 }, { keys: [], n: 1, snap: true },
  { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 30 }, { keys: [], n: 1, snap: true },
  { keys: [], n: 40 }, { keys: [], n: 1, snap: true },
  { keys: [], n: 90, fn() { log("room " + roomAt(david.x).id + " walk " + !!r4.walk); } }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { const r = roomById("camp"); moveParty((r.c0 + 40) * T, GR * T); snapCamera(); } }, { keys: [], n: 30 }, { keys: [], n: 1, snap: true },
]);
