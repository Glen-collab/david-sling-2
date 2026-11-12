// (Glen 11-11) Goliath's sword waits for the priests' key from the Hall of the Tribes
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
region.save.taken = region.save.taken.filter(k => k !== "r3_hall_key");
if (typeof forgetSkill === "function") forgetSkill("heavySword");
testRun([
  { n: 3, fn() { if (!r3Has("r3_bread")) regionAdd("taken", "r3_bread"); moveParty(r3.swordX, GR * T); snapCamera(); } },
  { keys: [], n: 10 }, { keys: ["ArrowUp"], n: 4 }, { keys: [], n: 30, snap: true, fn() { log("no key: script " + region.script.length + " dialog " + !!(dialog && dialog.t > 0) + " sword " + hasSkill("heavySword")); regionAdd("taken", "r3_hall_key"); } },
  { keys: [], n: 5 }, { keys: ["ArrowUp"], n: 4 }, { keys: [], n: 10, snap: true, fn() { log("key: script " + region.script.length + " dialog " + !!(dialog && dialog.t > 0)); } },
]);
