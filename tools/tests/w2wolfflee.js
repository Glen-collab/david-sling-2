// (Glen 11-10) a wolf driven off turns tail and runs (wolf_run) instead of vanishing
if (location.hash !== "#9-6") throw new Error("not in Ramah");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let w;
testRun([
  { n: 5, fn() { w = r2.wolves.find(v => v.room === (region.room && region.room.id)) || r2.wolves[0]; const rm = roomById(w.room); david.x = w.hx - 200; david.y = w.y; region.room = rm; log("room " + w.room + " state " + w.state); } },
  { keys: [], n: 20 },
  { keys: [], n: 1, fn() { david.hearts = david.maxHearts; w.hp = 1; r2StoneHits({ x: w.x, y: w.y - 40, power: 1 }); log("after hit " + w.state + " facing " + w.facing + " dead " + w.dead + " x-d " + Math.round(w.x - david.x)); } },
  { keys: [], n: 15, snap: true, fn() { david.hearts = david.maxHearts; log("running " + w.state + " x-d " + Math.round(w.x - david.x)); } },
  { keys: [], n: 120, fn() { log("later " + w.state + " dead " + w.dead); } },
]);
