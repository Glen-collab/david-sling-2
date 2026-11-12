// (Glen 11-12) charging the sling standing, Goliath's sword on his back: frames 4-6 only
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
if (typeof learnSkill === "function") learnSkill("heavySword");
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([
  { n: 3, fn() { const r = roomById("nobroad"); moveParty((r.c0 + 20) * T, GR * T); snapCamera(); } },
  { keys: [], n: 20 },
  { keys: ["KeyX"], n: 6, snap: true }, { keys: ["KeyX"], n: 5, snap: true }, { keys: ["KeyX"], n: 5, snap: true }, { keys: ["KeyX"], n: 5, snap: true, fn() { log("charging " + david.charging); } },
  { keys: [], n: 20, snap: true },
]);
