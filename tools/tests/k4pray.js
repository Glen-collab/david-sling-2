// (Glen 11-16) David at the prayer rock: kneels, then prays (Glen's clip, david_pray)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { regionAdd("taken", "k4_news"); const k = k4.rocks.find(o => o.id !== "ephod"); log("rock " + k.id + " in " + k.room); const r = roomById(k.room); moveParty((r.c0 + 5) * T, GR * T); snapCamera(); } }, { keys: [], n: 20 },
  { n: 1, fn() { const k = k4.rocks.find(o => o.id !== "ephod"); moveParty(k.x - 70, GR * T); david.facing = 1; snapCamera(); log("rock x " + k.x + " david " + david.x + " room " + region.room.id + " script " + region.script.length + " wait " + region.wait); } }, { keys: [], n: 20 },
  { n: 1, fn() { k4AskScene(k4.rocks.find(o => o.id !== "ephod")); } }, { keys: [], n: 30, snap: true, fn() { log("kneel t " + (k4.kneel && k4.kneel.t.toFixed(2)) + " david " + david.x); } }, { keys: [], n: 120, snap: true, fn() { log("kneel t " + (k4.kneel && k4.kneel.t.toFixed(2))); } }]);
