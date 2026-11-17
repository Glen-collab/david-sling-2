// (Glen 11-17) Test Your Might with his new smash clip: straining while you mash, the smash, the blade on the ground
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let w;
testRun([{ n: 1, fn() { skills.add("heavySword"); w = r3.walls.find(q => !q.broken); region.beasts.length = 0; const r = REGION.rooms.find(q => q.id === w.room); moveParty(w.x0 - 70, FOOT); david.facing = 1; snapCamera(); log("wall " + w.room + " " + w.kind); } },
  { keys: [], n: 15 }, { n: 1, fn() { dialog.t = 0; region.script.length = 0; r3MightStart(w); log("sx " + Math.round(david.x - camX)); } },
  { keys: ["KeyX"], n: 2 }, { keys: [], n: 2 }, { keys: ["KeyX"], n: 2 }, { keys: [], n: 2 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 6, snap: true, fn() { log("phase " + r3.might.phase); } },
  ...[1,2,3,4,5,6,7].map(() => ({ keys: [], n: 12, snap: true, fn() { log("phase " + (r3.might && r3.might.phase) + " t " + (r3.might ? r3.might.t.toFixed(2) : "")); } }))]);
