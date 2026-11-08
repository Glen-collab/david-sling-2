// (Glen 11-08) Abishai (or ?who=benaiah) as Player 2: his rope climb (frames picked by hand), ladder climb (back view), jump and hit
startSetup = () => {}; setup.active = false; R2.SIGHT = R2.SIGHT_LOW = 0; roomById("palace").night = false;
const skipR = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const log = m => TEST_ERRORS.push("INFO " + m);
let L;
testRun([{ n: 3, fn() { L = ladders.filter(l => l.room === "palace" && l.rope)[1]; moveParty(L.x - 120, L.botY); snapCamera(); } },
  ...Array.from({ length: 20 }, () => ({ keys: [], n: 10, fn: skipR })),
  { n: 2, fn() { if (!p2.on) p2Join(); p2.who = new URLSearchParams(location.search).get("who") || "abishai"; for (const g of r2.guards) g.room = "none"; moveParty(L.x - 30, L.botY); p2.x = L.x; p2.y = L.botY - 120; p2.ladder = L; p2.climbD = 0; snapCamera(); } },
  { keys: [], n: 30, fn() { p2.x = L.x; p2.y = L.botY - 120; p2.ladder = L; p2.climbD = 40; p2.inv = 0; } }, { keys: [], n: 1, snap: true, fn() { log("rope " + p2Sheet()); } },
  { keys: [], n: 4, fn() { L.rope = false; p2.x = L.x; p2.y = L.botY - 120; p2.ladder = L; p2.climbD = 40; } }, { keys: [], n: 1, snap: true, fn() { log("ladder " + p2Sheet()); } },
  { keys: [], n: 1, fn() { L.rope = true; p2.ladder = null; p2.x = L.x + 120; p2.y = L.botY - 90; p2.vy = -500; p2.onGround = false; p2.inv = 0; } }, { keys: [], n: 1, snap: true, fn() { log("jump up " + p2Sheet()); } },
  { keys: [], n: 1, fn() { p2.x = L.x + 120; p2.y = L.botY - 90; p2.vy = 400; p2.onGround = false; } }, { keys: [], n: 1, snap: true, fn() { log("jump down " + p2Sheet()); } },
  { keys: [], n: 1, fn() { p2.x = L.x + 120; p2.y = L.botY; p2.vy = 0; p2.onGround = true; p2.hitT = 0.4; } }, { keys: [], n: 1, snap: true, fn() { log("hit " + p2Sheet()); } }]);
