// (Glen 11-17) sizes in Ziph: a hyrax family in Maon, one of Saul's men by David in the hills
startSetup = () => {}; setup.active = false;
const clear = [{ keys: [], n: 30 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 }];
const at = (rm, k, f) => [{ n: 1, fn() { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); david.facing = 1; snapCamera(); } }, ...clear,
  { n: 1, fn() { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); if (f) f(); } }, { keys: [], n: 40, snap: true }];
testRun([{ n: 1, fn() { ["z5_ziph_told", "z5_warned", "z5_jonathan", "z5_erem"].forEach(t => regionAdd("taken", t)); david.inv = 999; } },
  ...at("maon", 78), ...at("hills", 25, () => { const g = z5.guards.find(g => g.room === "hills"); g.x = david.x + 130; g.facing = -1; g.state = "turn"; g.t = 0; })]);
