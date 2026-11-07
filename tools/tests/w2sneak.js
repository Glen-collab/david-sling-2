// (Glen 11-06) World 2: Saul's men see David standing in front of them, not crouched in the dark; wolves; the bow
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const pc = roomById("palace").c0, g = r2.guards.find(q => q.room === "palace" && q.y === GR * T);
const place = (dx, crouch) => ({ n: 2, fn() { dialog.t = 0; Object.assign(g, { x: g.hx, facing: -1, f0: -1, state: "turn", t: -99, spot: 0 }); moveParty(g.hx - dx, GR * T); snapCamera(); r2.entry = { x: david.x - 200, y: GR * T, facing: 1, room: "palace" }; } });
testRun([
  place(250, false), { keys: [], n: 50 }, { keys: [], n: 1, snap: true, fn() { log("standing 250 in front: guard " + g.state + " spot " + g.spot.toFixed(2) + " lit " + r2Lit(david.x, david.y)); } },
  ...Array.from({ length: 20 }, () => ({ keys: [], n: 10 })),
  place(200, true), { keys: ["ArrowDown"], n: 50 }, { keys: ["ArrowDown"], n: 1, snap: true, fn() { log("crouched 200 in front: guard " + g.state + " spot " + g.spot.toFixed(2) + " state " + david.state + " h " + david.h + " lit " + r2Lit(david.x, david.y)); } },
  place(-200, false), { keys: [], n: 50 }, { keys: [], n: 1, fn() { log("standing behind him: guard " + g.state + " spot " + g.spot.toFixed(2)); } },
  // wolves and the bow on the road
  { n: 3, fn() { learnSkill("bow"); const w = r2.wolves[0]; moveParty(w.hx - 380, GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 10 },
  { keys: ["ArrowUp"], n: 2, fn() { log("before bow: hasSkill " + hasSkill("bow") + " wait " + region.wait + " trans " + !!region.trans + " state " + david.state + " throwT " + david.throwT + " cool " + r2.bowCool); } }, { keys: ["ArrowUp", "KeyV"], n: 2 }, { keys: ["ArrowUp"], n: 4, fn() { log("arrows in the air " + stones.filter(s => s.bow).length); } }, { keys: [], n: 30, snap: true, fn() { const w = r2.wolves[0]; log("wolf after arrow: dead " + w.dead + " hp " + w.hp + " state " + w.state); } },
]);
