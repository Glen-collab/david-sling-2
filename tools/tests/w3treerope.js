// (Glen 11-12) the Road Down to Gath's climbing tree, his branchy column: up the branches to the top one (the pomegranate);
//  the rope tied in the crown, already down: climb it to the Truth. Animals out of the way
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
region.beasts = region.beasts.filter(b => !WILD[b.kind] && !BIRD[b.kind]);
region.save.taken = region.save.taken.filter(k => !["r3_truth_tree", "r3_pom_tree"].includes(k));
["w3_trunk_full", "w3_crown", "w3_limb", "w3_rope_4", "w3_knot_branch"].forEach(kitImg);
const log = m => TEST_ERRORS.push("INFO " + m);
const o = () => r3.ladders.find(l => l.id === "r3_rope_tree"), tp = () => region.props.find(p => p.n === "w3_trunk_full");
const hi = () => R3_TRUNK_FULL.ledges.reduce((m, b) => b.top < m.top ? b : m);
testRun([
  { n: 2, fn() { const b = hi(); moveParty(tp().x + (b.x0 + b.x1) / 2, tp().y + b.top + 2); david.facing = 1; snapCamera(); } },
  { keys: [], n: 30, snap: true, fn() { log("top branch: y " + Math.round(david.y) + " ground " + david.onGround + " pomegranate " + r3Has("r3_pom_tree") + "; rope " + o().state + " crown " + Math.round(FOOT - o().top) + " up"); } },
  { n: 2, fn() { moveParty(o().x, GR * T); snapCamera(); } }, { keys: [], n: 4 }, { keys: ["ArrowUp"], n: 330 },
  { keys: ["ArrowLeft"], n: 24 }, { keys: [], n: 20, snap: true, fn() { log("top: y " + Math.round(david.y) + " truth " + r3Has("r3_truth_tree")); } },
]);
