// (11-21) debug: the first pits' edges after the story
startSetup = () => {}; setup.active = false; helpT = 0;
testRun([{ n: 1, fn() { region.save.taken.push("c6_end"); const r = roomById("road"); moveParty((r.c0 + 23) * T, GR * T); snapCamera(); } },
  { keys: [], n: 120 }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { const r = roomById("road"); TEST_ERRORS.push("INFO " + region.props.filter(p => p.room === "road" && /pit/.test(p.n)).slice(0, 4).map(p => p.n + "@" + Math.round(p.x / T - r.c0) + " img " + !!kitImg(p.n)).join(", ") + " | all road props " + region.props.filter(p => p.room === "road").length); } }]);
