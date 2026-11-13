// World 4: the rubble into Beneath the Warren (Glen 11-13): shut from the shaft; once he's been up the Long Climb (and has
//  Goliath's sword), Up breaks it; and the side caves' rubble
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const R = () => roomById("under");
testRun([
  { keys: [], n: 30 },
  { n: 1, fn() { region.save.explored = region.save.explored.filter(x => x !== "climb"); region.save.taken = region.save.taken.filter(x => x !== "r4_wall_under"); skills.delete("heavySword");
    const r = roomById("campshaft"); r.dark = 0; R().dark = 0; moveParty((r.c0 + r.w) * T - 60, GR * T); snapCamera(); } },
  { keys: ["ArrowRight"], n: 120, fn() { log("walking in from the shaft: " + (roomAt(david.x) || {}).id + " k " + (david.x / T - R().c0).toFixed(1) + " open " + r4WallOpen()); } },
  { keys: [], n: 30 }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { regionAdd("explored", "climb"); learnSkill("heavySword"); } },
  { keys: [], n: 10, fn() { log("open now " + r4WallOpen()); } }, { keys: [], n: 1, snap: true },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 20, fn() { log("broken " + regionHas("taken", "r4_wall_under")); } }, { keys: [], n: 1, snap: true },
  { keys: ["ArrowRight"], n: 90, fn() { log("then right: k " + (david.x / T - R().c0).toFixed(1)); } },
  { n: 1, fn() { const r = roomById("warren"); r.dark = 0; moveParty((r.c0 + 39) * T + 80, GR * T); snapCamera(); } }, { keys: [], n: 60 }, { keys: [], n: 1, snap: true },
]);
