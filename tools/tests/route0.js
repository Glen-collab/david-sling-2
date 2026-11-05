startSetup = () => {}; setup.active = false;
const clr = () => { setup.active = false; dialog.t = 0; dialog.hold = false; };
const log = m => TEST_ERRORS.push("INFO " + m);
learnSkill("rope");
const C = id => roomById(id).c0;
const go = (id, c) => ({ n: 3, fn() { clr(); david.inv = 99; region.climb = null; david.harp = false; setState("idle"); moveParty((C(id) + c) * T + T / 2, 16 * T); snapCamera(); } });
const room = () => roomAt(david.x).id;
const check = (what, want, keys, n = 120) => [{ keys: [], n: 20, fn() { clr(); } }, { keys, n, fn() { clr(); } }, { keys: [], n: 60, fn() { clr(); log((room() === want ? "OK   " : "FAIL ") + what + " -> " + room() + " (want " + want + ")"); } }];
const RW = id => roomById(id).w;
testRun([
go("fields", RW("fields") - 3), ...check("fields, off the right edge", "town", ["ArrowRight"]),
  go("town", RW("town") - 3), ...check("town, off the right edge", "walls", ["ArrowRight"]),
  go("town", 2), ...check("town, off the left edge", "fields", ["ArrowLeft"]),
  go("walls", 55), ...check("walls, up at the gate", "halls", ["ArrowUp"], 6),
  go("halls", 5), ...check("halls, up at the door", "walls", ["ArrowUp"], 6),
]);
