// World 4: the rock down into the water (r4Lid): at the surface it stops him; diving, he gets under and through
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let r;
testRun([
  { n: 1, fn() { r = roomById("river"); moveParty((r.c0 + 42) * T, r.water + 60); region.camFootY = GR * T; snapCamera(); } },
  { keys: [], n: 30, fn() { log("start k " + (david.x / T - r.c0).toFixed(1) + " y " + Math.round(david.y) + " swim " + !!r4.swim); } },
  { keys: ["ArrowRight"], n: 90, fn() { log("surface, right 1.5s: k " + (david.x / T - r.c0).toFixed(1) + " y " + Math.round(david.y) + " (lid 46-56)"); } },
  { keys: ["ArrowRight", "ArrowDown"], n: 150, fn() { log("diving right 2.5s: k " + (david.x / T - r.c0).toFixed(1) + " y " + Math.round(david.y) + " breath " + r4.breath.toFixed(1)); } },
  { keys: ["ArrowRight"], n: 120, fn() { log("then right 2s: k " + (david.x / T - r.c0).toFixed(1) + " y " + Math.round(david.y) + " breath " + r4.breath.toFixed(1)); } },
  { keys: [], n: 1, snap: true },
]);
