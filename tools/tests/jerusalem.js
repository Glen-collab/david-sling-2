// (11-25) Jerusalem, first build: the taunt below the walls, the hidden bridge (walk: there; leap: through), the sand toss
// (skipped in tests: the bridge shows), the watercourse (the water rises, catches you), the top: Zion and the last page
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const where = () => (region.room ? region.room.id : "?") + " col " + (david.x / T - (region.room ? region.room.c0 : 0)).toFixed(1) + " y " + Math.round(david.y);
const at = (id, k, y = GR * T) => { const r = roomById(id); regionGo((r.c0 + k) * T, 1, () => { david.y = y; snapCamera(); }); };
const atXY = (x, y) => { regionGo(x, 1, () => { david.y = y; david.vy = 0; snapCamera(); }); };
const until = test => ({ n: 1, fn() { let i = 0; while (region.script.length && !test() && i++ < 80) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; } });
const drain = () => until(() => false);
const snap = { keys: [], n: 2, snap: true };
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); regionWrite(); };
const steps = n => Array.from({ length: n }, (_, i) => i % 2 ? { keys: [], n: 4 } : { keys: ["ArrowRight"], n: 12 });
const found = () => Object.keys(jr.found).length;
testRun([
  { n: 1, fn() { clean(); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted", "hb_end"].forEach(k => regionAdd("taken", k)); region.jscene = null;
    for (let k = jr.g0; k <= jr.g1; k++) oneway[GR][k] = false; jr.found = {}; jr.ended = false; jr.film = false; jr.falls = 0;   // (a save from an earlier run built the bridge)
    at("jvalley", 6); } },
  { keys: [], n: 40 }, snap, { n: 1, fn() { log("taunt cine " + !!hb.cine + " script " + region.script.length + " " + where()); } },
  until(() => false), { keys: [], n: 4 }, snap, { n: 1, fn() { log("taunt done " + hbHas("jr_taunt") + " right " + roomById("jvalley").right); } },
  // running out: nothing there; a leap from the edge: nothing there
  { n: 1, fn() { at("gorge", jr.g0 - roomById("gorge").c0 - 14); } }, { keys: [], n: 40 },
  { keys: ["ArrowRight"], n: 70 }, { keys: [], n: 40 }, { n: 1, fn() { log("ran: " + where() + " found " + found() + " falls " + jr.falls); } },
  { n: 1, fn() { for (let k = jr.g0; k <= jr.g1; k++) oneway[GR][k] = false; jr.found = {}; at("gorge", jr.g0 - roomById("gorge").c0 - 1); } }, { keys: [], n: 40 },
  { keys: ["ArrowRight", "KeyZ"], n: 16 }, { keys: [], n: 60 }, { n: 1, fn() { log("leapt: " + where() + " found " + found() + " falls " + jr.falls); } },
  // the gorge: walk out
  { n: 1, fn() { at("gorge", jr.g0 - roomById("gorge").c0 - 4); } }, { keys: [], n: 40 },
  ...steps(10), { n: 1, fn() { log("walked: " + where() + " found " + found() + " falls " + jr.falls); } }, snap,
  // walk the whole way
  ...steps(90), { n: 1, fn() { log("across: " + where() + " found " + found() + " ended " + jr.ended + " leap " + hbHas("jr_leap")); } },
  drain(), { keys: [], n: 20 }, { n: 1, fn() { at("gorge", jr.g0 - roomById("gorge").c0 + 8); } }, { keys: [], n: 6 }, snap,
  // the watercourse
  { n: 1, fn() { at("shaft", 3); } }, { keys: [], n: 20 }, snap,
  { n: 1, fn() { atXY((jr.mid.x + jr.mid.x1) / 2, jr.mid.y); } }, { keys: [], n: 120 }, snap,
  { n: 1, fn() { log("shaft: " + where() + " water " + (jr.water && Math.round(jr.water.y)) + " on " + (jr.water && jr.water.on) + " cp " + !!jr.cp); } },
  { keys: [], n: 1200 }, { n: 1, fn() { log("caught? " + where() + " water " + Math.round(jr.water.y)); } }, snap,
  { n: 1, fn() { atXY((jr.top.x + jr.top.x1) / 2, jr.top.y); } }, { keys: [], n: 30 }, { keys: [], n: 60 }, snap,
  { n: 1, fn() { log("zion: " + where() + " cine " + !!hb.cine); } }, until(() => region.jscene), { keys: [], n: 3 },
  { n: 1, fn() { if (region.jscene) region.jscene.t = region.jscene.done + 0.1; } }, { keys: [], n: 3 }, snap,
  { n: 1, fn() { log("end " + hbHas("jr_end") + " journal " + (region.jscene ? "page " + (region.jscene.view + 1) + " of " + region.jscene.pages.length : "none")); region.jscene = null; clean(); } },
]);
