// the climbing tree: from its top branch, shoot the rope's knot up in the crown; climb it to the Truth
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("bow");
region.save.taken = region.save.taken.filter(k => !["r3_rope_tree", "r3_truth_tree"].includes(k));
for (let i = 1; i <= 4; i++) kitImg("w3_rope_" + i); kitImg("w3_climbtree_tall");
const log = m => TEST_ERRORS.push("INFO " + m);
const o = () => r3.ladders.find(l => l.id === "r3_rope_tree");
testRun([
  { n: 2, fn() { o().state = "up"; for (let i = ladders.length - 1; i >= 0; i--) if (ladders[i].rope && ladders[i].room === "gathroad") ladders.splice(i, 1); r3.vineT = 99; const k = KIT.w3_climbtree, tb = R3_CLIMBTREE.find(b => b.top === 382), tx = o().x; moveParty(o().x - 236, o().top - R3.CROWN.TOP + tb.top + 4 - 2); david.facing = 1; snapCamera(); for (const b of region.beasts) if (b.room === "gathroad") b.dead = true; } },
  { keys: [], n: 20, fn() { log("on branch: y " + Math.round(david.y) + " ground " + david.onGround + " knot " + Math.round(o().x) + "," + Math.round(o().top)); } },
  { keys: ["ArrowUp", "KeyV"], n: 2 }, { keys: ["ArrowUp"], n: 14, snap: true, fn() { log("rope " + o().state); } },
  { keys: [], n: 20, snap: true, fn() { log("rope then " + o().state); } },
  { n: 2, fn() { moveParty(o().x, GR * T); } }, { keys: [], n: 4 }, { keys: ["ArrowUp"], n: 200 }, { keys: ["ArrowLeft"], n: 20, snap: true, fn() { log("top: y " + Math.round(david.y) + " truth " + r3Has("r3_truth_tree")); } },
]);
