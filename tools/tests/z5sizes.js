// (Glen 11-17) sizes in Ziph: Jonathan by David, Saul's men by David, a hyrax family
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k, f) => [{ n: 1, fn() { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); david.facing = 1; snapCamera(); if (f) f(); } }, { keys: [], n: 30, snap: true }];
testRun([{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !k.startsWith("z5_")); regionAdd("taken", "z5_ziph_told"); } },
  ...at("horesh", 36, () => { region.script.length = 0; }),
  ...at("hills", 25, () => { const g = z5.guards[0]; g.x = david.x + 160; g.facing = 1; g.state = "look"; }),
  ...at("maon", 80), ...at("horesh", 42)]);
