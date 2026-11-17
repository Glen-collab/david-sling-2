// (Glen 11-17) his new sword clips: walk, run, jump straight up, the forward flip, the landing
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const air = st => () => { david.y = FOOT - 200; david.vy = st === "jump" ? -TUNE.JUMP_SPEED * 0.5 : 0; david.onGround = false; setState(st); };
testRun([{ n: 1, fn() { skills.add("heavySword"); const r = roomById("nobroad"); moveParty((r.c0 + 20) * T, FOOT); david.facing = 1; snapCamera(); } }, { keys: [], n: 20 },
  { keys: ["ArrowRight"], n: 10, snap: true, fn() { log("walk " + david.state + " sx " + Math.round(david.x - camX) + " sy " + Math.round(david.y - (typeof regionCamY==="function"?regionCamY():0))); } },
  { keys: ["ArrowRight"], n: 30, snap: true, fn() { log("run " + david.state); } },
  { keys: [], n: 40 }, { n: 1, fn: air("jump") }, { keys: [], n: 3, snap: true, fn() { log("jump " + david.state + " sx " + Math.round(david.x - camX)); } },
  { n: 1, fn: air("flip") }, { keys: [], n: 5, snap: true, fn() { log("flip " + david.state + " sx " + Math.round(david.x - camX)); } },
  { keys: [], n: 60, snap: true, fn() { log("after " + david.state); } }]);
