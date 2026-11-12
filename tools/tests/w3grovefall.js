// (Glen 11-12) the Tall Trees: from the climbing tree's highest branch an arrow aims itself at the coil and the rope comes
//  down; stepping down branch by branch costs nothing; a long drop costs a heart (anywhere), and from the treetops puts
//  him back up where he was
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false; learnSkill("bow"); arrowSet(3);
region.beasts = region.beasts.filter(b => !WILD[b.kind]);
const log = m => TEST_ERRORS.push("INFO " + m);
const G = roomById("grove"), TOPY = Math.round((FOOT - R3.GROVE.TOP) / T) * T, xD = (G.c0 + R3.GROVE.D) * T + T / 2;
const coil = () => r3.ladders.find(l => l.id === "r3_rope_grove");
const hiB = R3_TRUNK_D.ledges.reduce((a, b) => b.top < a.top ? b : a), x0 = xD - R3_TRUNK_D.mid, tY = FOOT - KIT.w3_trunk_bare.h + 6;
let h0 = 0;
testRun([
  { n: 2, fn() { const y = tY + hiB.top + 4; moveParty(x0 + (hiB.x0 + hiB.x1) / 2, y); david.facing = 1; snapCamera(); log("highest branch " + Math.round(FOOT - y) + " up; the tops " + Math.round(FOOT - TOPY) + " up; rope ends " + Math.round(FOOT - (r3.swings.find(q => q.room === "grove").ay + r3.swings.find(q => q.room === "grove").len)) + " up"); } },
  { keys: [], n: 20 }, { keys: ["ArrowUp", "KeyV"], n: 2 }, { keys: ["ArrowUp"], n: 20 }, { keys: [], n: 30, snap: true, fn() { log("coil after the shot: " + coil().state); } },
  // down branch by branch: Down + A drops through one at a time
  ...Array.from({ length: 8 }, () => [{ keys: ["ArrowDown", "KeyZ"], n: 3 }, { keys: [], n: 30, fn() { if (!h0) h0 = david.hearts; } }]).flat(),
  { keys: [], n: 10, fn() { log("down the branches: y " + Math.round(david.y) + " hearts " + h0 + " -> " + david.hearts); } },
  { n: 2, fn() { moveParty((G.c0 + 21) * T, TOPY); david.inv = 0; snapCamera(); } }, { keys: [], n: 20, fn() { log("on the first tree's top: safe " + JSON.stringify(r3.canopySafe && Math.round(r3.canopySafe.y))); h0 = david.hearts; } },
  { keys: ["ArrowRight"], n: 40 }, { keys: [], n: 60, snap: true, fn() { log("walked off the top: y " + Math.round(david.y) + " hearts " + h0 + " -> " + david.hearts); } },
]);
