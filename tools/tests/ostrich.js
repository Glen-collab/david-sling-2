// (Glen 11-17) the ostrich in Maon: after a charge, close to David, it backs off in one go (no flicker), then comes again
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let O = null, flips = 0, lastF = 0;
testRun([{ n: 1, fn() { ["z5_ziph_told", "z5_warned"].forEach(t => regionAdd("taken", t)); const r = roomById("maon"); moveParty((r.c0 + 26) * T, GR * T); david.inv = 999; snapCamera(); } }, { keys: [], n: 30 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 }, { n: 1, fn() { const r = roomById("maon"); moveParty((r.c0 + 26) * T, GR * T); } }, { keys: [], n: 10 },
  { n: 1, fn() { O = region.beasts.find(b => b.kind === "ostrich"); Object.assign(O, { x: david.x + 60, state: "idle", cool: 1.4, t: 0, facing: -1 }); lastF = O.facing; } },
  ...Array.from({ length: 90 }, () => ({ keys: [], n: 1, fn() { if (O.facing !== lastF) { flips++; lastF = O.facing; } } })),
  { n: 1, snap: true, fn() { log("facing flips in 1.5 s: " + flips + " state " + O.state + " dx " + Math.round(O.x - david.x)); } },
  { keys: [], n: 120, fn() { log("retreat " + O.retreat + " script " + region.script.length + " wait " + region.wait + " room " + region.room.id + " t " + O.t.toFixed(2)); log("then " + O.state + " dx " + Math.round(O.x - david.x)); } }]);
