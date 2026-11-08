// (Glen 11-07) Jonathan (Player 2) on a rope down the palace wall: side-on, hand over hand, his hands on the rope
startSetup = () => {}; setup.active = false; R2.SIGHT = R2.SIGHT_LOW = 0; roomById("palace").night = false;   // (lit, to see him)
const skipR = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
let L; const WHO = new URLSearchParams(location.search).get("who") || "jonathan";
testRun([{ n: 3, fn() { L = ladders.filter(l => l.room === "palace" && l.rope)[1]; moveParty(L.x - 120, L.botY); snapCamera(); } },
  ...Array.from({ length: 20 }, () => ({ keys: [], n: 10, fn: skipR })),
  { n: 2, fn() { if (!p2.on) p2Join(); p2.who = WHO; p2.x = L.x; p2.y = L.botY - 120; p2.ladder = L; p2.climbD = 0; for (const g of r2.guards) g.room = "none"; moveParty(L.x - 30, L.botY); p2.x = L.x; p2.y = L.botY - 120; p2.ladder = L; snapCamera(); TEST_ERRORS.push("INFO p2 " + p2.on + " " + p2.who + " rope " + !!L.rope); } },
  { keys: [], n: 60 }, { keys: [], n: 1, fn() { p2.climbD = 40; } }, { keys: [], n: 1, snap: true, fn() { TEST_ERRORS.push("INFO p2 on rope " + !!(p2.ladder && p2.ladder.rope) + " sheet " + p2Sheet()[0] + " on " + p2.on + " W " + WORLD + " hide " + p2.hide + " img " + SPR.jonathan_rope.img.naturalWidth + " cam " + Math.round(camY) + " y " + Math.round(p2.y) + " dy " + Math.round(david.y) + " at " + Math.round(p2.x - L.x) + "," + Math.round(p2.y - L.botY)); } }]);
