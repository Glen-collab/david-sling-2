// (Glen 11-07) the well at Secu: Up at the well, down the rope from the top of the tall shaft to the floor; the tunnel; the crack
startSetup = () => {}; setup.active = false; region.save.jAt = 9; learnSkill("rope");
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } };
testRun([{ n: 3, fn() { const o = region.doors.find(q => q.id === "d_secuwell"); moveParty(o.x, GR * T); snapCamera(); } },
  { keys: ["ArrowUp"], n: 4 }, ...Array.from({ length: 8 }, () => ({ keys: [], n: 30, fn() { skip(); if (!this.l) { this.l = 1; log("t climb " + (region.climb && region.climb.kind) + " " + region.room.id + " y " + Math.round(david.y) + " trans " + !!region.trans); } } })),
  { keys: [], n: 1, snap: true, fn() { log("on rope " + JSON.stringify(region.climb && region.climb.kind) + " room " + region.room.id + " y " + Math.round(david.y)); } },
  { keys: ["ArrowDown"], n: 150 }, { keys: [], n: 1, snap: true, fn() { log("mid y " + Math.round(david.y)); } },
  { keys: ["ArrowDown"], n: 400 }, { keys: [], n: 1, snap: true, fn() { log("floor y " + Math.round(david.y) + " climb " + !!region.climb); } },
  { keys: ["ArrowUp"], n: 4 }, ...Array.from({ length: 20 }, () => ({ keys: ["ArrowUp"], n: 30, fn() { skip(); if (!this.l) { this.l = 1; log("up: " + (region.climb && region.climb.kind) + " " + region.room.id + " y " + Math.round(david.y) + " tr " + !!region.trans); } } })), { keys: [], n: 90, fn: skip }, { keys: [], n: 1, snap: true, fn() { log("back up: room " + region.room.id); } }]);
