// (11-27, Glen: "I can't jump to any of the other rocks up ... I can't go any higher") the watercourse played for real:
//  in from the gorge, up the first pillar, and from the fourth ledge up the second pillar
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const snap = { keys: [], n: 2, snap: true };
const hush = { n: 1, fn() { region.script = []; dialog.t = 0; hb.cine = null; region.wait = 0; toastTime = 0; } };
const rx = () => roomById("shaft").c0 * T;
const where = () => "x " + Math.round(david.x - rx()) + " y " + Math.round(david.y) + " climb " + (region.climb ? region.climb.kind : "-") + " ground " + david.onGround + " room " + (region.room && region.room.id);
const noWater = { n: 1, fn() { if (jr.water) { jr.water.y = david.y + 900; jr.water.t = -99; } jr.rocks.length = 0; jr.rockT = 99; } };
const hold = (k, n) => [...Array(Math.ceil(n / 10))].flatMap(() => [{ keys: k, n: 10 }, noWater]);
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted", "hb_end", "jr_taunt", "jr_course", "jr_leap"].forEach(k => regionAdd("taken", k)); region.script.length = 0; hb.cine = null; dialog.t = 0; region.wait = 0; learnSkill("wallClimb"); learnSkill("leap"); } },
  { n: 1, fn() { const g = roomById("gorge"); regionGo((g.c0 + g.w - 3) * T, 1, () => { david.y = GR * T; snapCamera(); }); } }, { keys: [], n: 40 }, hush,
  ...hold(["ArrowRight"], 20), { keys: [], n: 30 }, hush, { n: 1, fn() { log("in: " + where()); } }, snap,
  ...hold(["ArrowLeft"], 60), { keys: [], n: 4 }, ...hold(["ArrowUp"], 220), { keys: [], n: 20 }, { n: 1, fn() { log("pillar 1: " + where()); } },
  // no shortcuts: Up on the first ledge by the left pillar, and Up on the floor by the right one
  { n: 1, fn() { const L = jr.ledges[0]; david.x = L.x + 240; david.y = L.y; david.vy = 0; region.climb = null; snapCamera(); } }, { keys: [], n: 10 }, noWater,
  ...hold(["ArrowLeft"], 20), { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 2 }, ...hold(["ArrowUp"], 60), { n: 1, fn() { log("ledge 0 Up (no climb): " + where()); } },
  { n: 1, fn() { david.x = rx() + 1040; david.y = GR * T; david.vy = 0; region.climb = null; snapCamera(); } }, { keys: [], n: 10 }, noWater,
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 2 }, ...hold(["ArrowUp"], 60), { n: 1, fn() { log("floor Up by pillar 2 (no climb): " + where()); } },
  // the fourth ledge, then right into the second pillar and Up
  { n: 1, fn() { const L = jr.ledges[3]; david.x = L.x + 60; david.y = L.y; david.vy = 0; region.climb = null; snapCamera(); log("ledge 3 " + Math.round(L.x - rx()) + ".." + Math.round(L.x1 - rx()) + " y " + L.y + " wall2 x0 " + Math.round(region.walls.filter(w => w.room === "shaft")[1].x0 - rx())); } }, { keys: [], n: 10 }, noWater,
  ...hold(["ArrowRight"], 30), { keys: [], n: 10 }, { n: 1, fn() { log("at pillar 2: " + where()); } },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 2 }, { n: 1, fn() { log("grab 2 (Up once, standing): " + where()); } }, ...hold(["ArrowUp"], 20), snap,
  ...hold(["ArrowUp"], 300), { keys: [], n: 20 }, { n: 1, fn() { log("pillar 2 top: " + where()); } }, snap,
  // the third: from the 8th ledge (216, -720) left to the left pillar, Up
  { n: 1, fn() { const L = jr.ledges[7]; david.x = L.x + 120; david.y = L.y; david.vy = 0; region.climb = null; snapCamera(); } }, { keys: [], n: 10 }, noWater,
  ...hold(["ArrowLeft"], 30), { keys: [], n: 10 }, { n: 1, fn() { log("at pillar 3: " + where()); } },
  { keys: ["ArrowUp"], n: 3 }, { keys: [], n: 2 }, { n: 1, fn() { log("grab 3: " + where()); } }, ...hold(["ArrowUp"], 300), { keys: [], n: 20 }, { n: 1, fn() { log("pillar 3 top: " + where()); } }, snap,
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); regionWrite(); } },
]);
