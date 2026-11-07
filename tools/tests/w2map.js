// World 2: the map screen, and Player 2 (Jonathan) joining
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([
  { n: 3, fn() { const r = roomById("rooftops"); moveParty((r.c0 + 20) * T, GR * T); snapCamera(); } },
  { keys: ["Numpad6"], n: 2 }, { keys: [], n: 30, fn() { log("p2 " + p2.on + " " + p2.who + " hide " + !!p2.hide); } }, { keys: [], n: 1, snap: true },
  { keys: ["ShiftLeft"], n: 2 }, { keys: [], n: 20 }, { keys: [], n: 1, snap: true },
]);
