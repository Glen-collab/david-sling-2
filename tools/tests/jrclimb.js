// (11-27) the new watercourse: up the first pillar (Up at it), the rocks rolling down the ledges, the Jebusites at the top
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const snap = { keys: [], n: 2, snap: true };
const hush = { n: 1, fn() { region.script = []; dialog.t = 0; hb.cine = null; region.wait = 0; toastTime = 0; } };
const rx = () => roomById("shaft").c0 * T;
const where = () => "x " + Math.round(david.x - rx()) + " y " + Math.round(david.y) + " climb " + (region.climb ? region.climb.kind : "-");
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted", "hb_end", "jr_taunt", "jr_leap"].forEach(k => regionAdd("taken", k)); region.script.length = 0; hb.cine = null; dialog.t = 0; region.wait = 0; learnSkill("wallClimb"); learnSkill("leap"); } },
  { n: 1, fn() { regionGo(rx() + 300, 1, () => { david.y = GR * T; snapCamera(); }); } }, { keys: [], n: 40 }, hush,
  { keys: ["ArrowLeft"], n: 14 }, { keys: [], n: 4 }, { n: 1, fn() { log("at face: " + where()); } },
  { keys: ["ArrowUp"], n: 8 }, { n: 1, fn() { log("grab: " + where()); } }, snap,
  { keys: ["ArrowUp"], n: 200 }, { keys: [], n: 20 }, { n: 1, fn() { log("climbed: " + where() + " hearts " + david.hearts + " water " + (jr.water && Math.round(jr.water.y)) + " rocks " + jr.rocks.length); } }, snap,
  // double jump straight up from the floor must not reach the first ledge run
  { n: 1, fn() { david.x = rx() + 640; david.y = GR * T; david.vy = 0; region.climb = null; jr.water.y = FOOT + 300; snapCamera(); } }, { keys: [], n: 10 },
  { keys: ["KeyZ"], n: 12 }, { keys: [], n: 2 }, { keys: ["KeyZ"], n: 10 }, { keys: [], n: 40 }, { n: 1, fn() { log("double jump from floor: " + where()); } },
  // halfway: the rocks
  { n: 1, fn() { const m = jr.mid; david.x = (m.x + m.x1) / 2; david.y = m.y; david.vy = 0; jr.water.y = m.y + 600; jr.water.t = -99; snapCamera(); } }, { keys: [], n: 150 }, hush, snap,
  { n: 1, fn() { log("mid rocks: " + jr.rocks.map(k => Math.round(k.x - rx()) + "," + Math.round(k.y) + (k.on ? "r" : "f")).join(" ") + " hearts " + david.hearts); } },
  { keys: [], n: 90 }, snap,
  // the top: on the way out, the Jebusites still there
  { n: 1, fn() { const m = jr.top; david.x = m.x + 40; david.y = m.y; david.vy = 0; jr.water.y = m.y + 700; snapCamera(); } }, { keys: [], n: 30 }, snap,
  { n: 1, fn() { const m = jr.ledges[8]; david.x = m.x + 230; david.y = m.y; david.vy = 0; jr.water.y = m.y + 700; snapCamera(); } }, { keys: [], n: 60 }, snap,
  { n: 1, fn() { const m = jr.top; david.x = m.x + 220; david.y = m.y; david.vy = 0; jr.water.y = m.y + 700; snapCamera(); } }, { keys: [], n: 50 }, snap,
  { n: 1, fn() { log("top: " + where() + " room " + region.room.id + " rocks " + jr.rocks.length); } },
  { keys: ["ArrowRight"], n: 60 }, { keys: [], n: 120 }, hush, { keys: [], n: 30 }, { n: 1, fn() { log("after walking in: room " + region.room.id + " " + where()); } }, snap,
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); regionWrite(); } },
]);
