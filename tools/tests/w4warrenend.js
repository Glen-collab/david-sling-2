// (Glen 11-14) the Warren's end: walking off it goes nowhere now (Up into the arch only); the Four Tunnels' start the same
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
testRun([
  { n: 1, fn() { at("warren", 186); } }, { keys: ["ArrowRight"], n: 120 }, { n: 1, fn() { log("warren end: in " + region.room.id + " x " + (david.x / T - roomById("warren").c0).toFixed(1)); } },
  { n: 1, fn() { at("narrows", 3); } }, { keys: ["ArrowLeft"], n: 120 }, { n: 1, fn() { log("narrows start: in " + region.room.id + " x " + (david.x / T - roomById("narrows").c0).toFixed(1)); } },
  { n: 1, fn() { at("warren", 183.4); } }, { keys: [], n: 5 }, { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 150 }, { n: 1, fn() { log("up at the arch: in " + region.room.id); } },
]);
