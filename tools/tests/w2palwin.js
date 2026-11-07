// (Glen 11-07) out of Michal's window: on the rope below the window, climb down to the first walkway; up the rope: in
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } };
let PW;
testRun([{ n: 3, fn() { skip(); PW = region.doors.find(q => q.id === "d_palacewin"); moveParty(PW.x, PW.y); PW.land(); } },
  ...Array.from({ length: 30 }, () => ({ keys: [], n: 10, fn: skip })), { keys: [], n: 1, snap: true, fn() { log("arrive " + david.state + " y " + Math.round(david.y) + " sill " + PW.y); } },
  { keys: ["ArrowDown"], n: 90 }, { keys: [], n: 20, snap: true, fn() { log("down " + david.state + " y " + Math.round(david.y) + " ground " + david.onGround); } },
  ...Array.from({ length: 6 }, () => ({ keys: ["ArrowUp"], n: 3, fn() { log("u " + david.state + " y " + Math.round(david.y) + " vy " + Math.round(david.vy) + " g " + david.onGround + " lad " + (david.ladder ? david.ladder.x + "," + david.ladder.topY : "-")); } })),
  { keys: ["ArrowUp"], n: 30, fn() { log("up30 " + david.state + " y " + Math.round(david.y) + " x " + Math.round(david.x)); } }, { keys: ["ArrowUp"], n: 120, fn() { log("up150 " + david.state + " y " + Math.round(david.y) + " trans " + !!region.trans); } }, { keys: [], n: 60, snap: true, fn() { log("up: room " + region.room.id + " " + david.state); } }]);
