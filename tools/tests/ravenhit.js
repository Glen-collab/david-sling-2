// (Glen 11-06) a stone through a flying raven's body hits it (the box was above the drawn bird)
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const R = region.beasts.filter(b => b.kind === "raven");
let res = [];
for (const [i, dy] of [[0, 20], [1, 50], [2, 0], [3, -20]]) { const b = R[i]; b.state = "fly"; b.dead = false; res.push(`stone at bird centre ${dy >= 0 ? "+" : ""}${dy - 20}: ${stoneHitsRegion({ x: b.x, y: b.y + dy }) ? "HIT" : "miss"}`); }
log(res.join("  |  "));
testRun([{ keys: [], n: 2 }]);
