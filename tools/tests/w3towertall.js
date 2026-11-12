// (Glen 11-12) the tall lookout across the road to Gath: blocked; shoot the knot from the terrace; climb; over; the far ladder back
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("bow");
kitImg("w3_towertall"); for (let i = 1; i <= 4; i++) kitImg("w3_ladder_" + i);
const log = m => TEST_ERRORS.push("INFO " + m);
const X = k => (roomById("gathroad").c0 + k) * T, lad = () => r3.ladders.find(l => l.kind === "ladder");
const quiet = () => { r3.vines.length = 0; r3.vineT = 99; };
// (the road animals, wildlife.js, out of the way: this tests the bow / the climb)
region.beasts = region.beasts.filter(b => !WILD[b.kind]);
testRun([
  { n: 2, fn() { quiet(); const o = lad(); o.state = "up"; for (let i = ladders.length - 1; i >= 0; i--) if (ladders[i].room === "gathroad" && Math.abs(ladders[i].x - o.x) < 40) ladders.splice(i, 1); moveParty(X(62), GR * T); david.facing = 1; snapCamera(); } },
  { keys: ["ArrowRight"], n: 40, snap: true, fn() { log("walk into it: x " + Math.round(david.x / T - roomById("gathroad").c0 * 1) + " top " + Math.round(lad().top)); } },
  { n: 2, fn() { quiet(); moveParty(X(50), GR * T - 136); david.facing = 1; snapCamera(); } }, { keys: [], n: 20, fn() { log("on terrace y " + Math.round(david.y)); } },
  ...Array.from({ length: 10 }, (_, i) => [{ n: 1, fn() { quiet(); if (lad().state === "up") { moveParty(X(46 + i), GR * T - 136); david.facing = 1; } } }, { keys: [], n: 8 }, { keys: ["ArrowUp", "KeyV"], n: 2 }, { keys: ["ArrowUp"], n: 30 }]).flat(),
  { keys: [], n: 20, snap: true, fn() { log("ladder " + lad().state + " from x " + (david.x / T - roomById("gathroad").c0).toFixed(1)); } },
  { n: 2, fn() { quiet(); moveParty(lad().x, GR * T); } }, { keys: [], n: 4 }, { keys: ["ArrowUp"], n: 120 }, { keys: ["ArrowRight"], n: 20, snap: true, fn() { log("top: y " + Math.round(david.y) + " camY " + Math.round(camY) + " stone " + r3Has("r3_stone_gathroad")); } },
]);
