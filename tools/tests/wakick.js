// (Glen 11-17) the wild donkey's new kick; David standing by gets a double or triple kick
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let b, seen = [];
testRun([{ n: 1, fn() { regionAdd("taken", "z5_warned"); const r = roomById("maon"); moveParty((r.c0 + 60) * T, FOOT); david.facing = 1; snapCamera(); david.hp = 999; } }, { keys: [], n: 10 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 6 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 6 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 10, fn() { dialog.t = 0; dialog.hold = false; region.script.length = 0; } },
  { n: 1, fn() { b = region.beasts.find(q => q.kind === "wildass" && q.room === "maon"); david.x = b.x - 150; log("ass at " + Math.round(b.x) + " state " + b.state); } },
  { keys: [], n: 24, snap: true, fn() { log("state " + b.state + " f " + frameOf("wildass_kick", b.t) + " kicked " + b.kicked); } },
  { keys: [], n: 40, snap: true, fn() { log("state " + b.state + " kicked " + b.kicked + " facing " + b.facing); } },
  { keys: [], n: 60, snap: true, fn() { log("state " + b.state + " kicked " + b.kicked + " cool " + b.cool.toFixed(2)); } }]);
