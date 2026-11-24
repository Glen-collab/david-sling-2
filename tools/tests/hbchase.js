// (11-24) the chase as a climb (Glen: "fast and easy ... go up a hill"): the ledges, Abner's route and pace, his
// warnings, losing him (too far behind; down a gully), and the end on the Hill of Ammah
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); };
const lv = l => HB.CHASE_H[l] || GR * T;
const at = (k, l = 0) => { const r = roomById("chase"); moveParty((r.c0 + k) * T, lv(l)); david.vy = 0; snapCamera(); };
const acol = () => (hb.abner.x / T - roomById("chase").c0).toFixed(1);
const where = () => "david col " + (david.x / T - roomById("chase").c0).toFixed(1) + " y " + Math.round(david.y) + " abner col " + acol() + " y " + Math.round(hb.abner.y) + " st " + hb.abner.st + " warned " + hb.abner.warned;
const drain = { n: 1, fn() { let i = 0; while (region.script.length && i++ < 80) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; region.jscene = null; } };
const snap = { keys: [], n: 2, snap: true };
const steps = [{ n: 1, fn() { clean(); ["hb_ask", "hb_judah", "hb_pool"].forEach(k => regionAdd("taken", k)); at(8); } }, { n: 1, fn() { region.jscene = null; } }, { keys: [], n: 20 }, drain,
  { n: 1, fn() { log("start: " + where() + " run " + TUNE.RUN_SPEED + " free " + hbFree() + " cine " + JSON.stringify(hb.cine) + " auto " + JSON.stringify(hb.auto) + " blow " + JSON.stringify(hb.blow) + " dark " + JSON.stringify(hb.dark) + " fallen " + hb.fallen + " trans " + !!region.trans + " jscene " + !!region.jscene); } },
  // run at the first gap and the climb: Abner goes on ahead, up the ledges
  { keys: ["ArrowRight"], n: 60 }, { n: 1, fn() { log("1s: " + where()); } }, snap,
  { n: 1, fn() { hb.abner.x = hbRoomX("chase", 60); at(50, 4); } }, { keys: [], n: 2 }, snap,
  { n: 1, fn() { hb.abner.x = hbRoomX("chase", 38); at(30); } }, { keys: [], n: 2 }, { n: 1, fn() { log("abner on the climb: " + where()); } }, snap,
  // up on the ridge, above the screen: over the top; the first warning on the way down
  { n: 1, fn() { hb.abner.x = hbRoomX("chase", 87); at(82, 2); } }, { keys: [], n: 3 }, { n: 1, fn() { log("ridge: " + where() + " script " + region.script.length); } }, snap, drain,
  // lost: too far behind
  { n: 1, fn() { hb.abner.x = hbRoomX("chase", 75); hb.abner.st = "run"; at(55, 5); hb.abner.x = david.x + 1600; } }, { keys: [], n: 3 }, { n: 1, fn() { log("lost: " + where() + " back " + hb.abner.back); } },
  // fall into the gully
  { n: 1, fn() { at(60, 0); david.y = GR * T + 3 * T; } }, { keys: [], n: 3 }, { n: 1, fn() { log("gully: " + where()); } },
  // on to the second stretch: the warning on the ground
  { n: 1, fn() { at(92); } }, { keys: [], n: 5 }, { n: 1, fn() { hb.abner.x = hbRoomX("chase", 108); hb.abner.st = "run"; at(103); } }, { keys: [], n: 3 }, { n: 1, fn() { log("second: " + where() + " script " + region.script.length); } }, drain,
  // the Hill of Ammah: Abner waits on top; at its foot the cut scene takes over (Glen: "climbing up the last ridge and then wham")
  { n: 1, fn() { hb.abner.x = hbRoomX("chase", 158); hb.abner.st = "run"; hb.abner.warned = 2; hb.abner.back = 2; at(118); } }, { keys: [], n: 10 },
  { n: 1, fn() { log("cut scene: " + where() + " auto " + !!hb.auto + " script " + region.script.length); } }, { keys: [], n: 25 }, snap,
  { keys: [], n: 60 }, { n: 1, fn() { log("up top: " + where() + " auto " + !!(hb.auto && hb.auto.kind) + " dialog " + (dialog.t > 0)); } }, snap,
  { keys: [], n: 1, fn() { if (dialog.t > 0) dialog.t = 0; } }, { keys: [], n: 15 }, { keys: [], n: 1, fn() { if (dialog.t > 0) dialog.t = 0; } }, { keys: [], n: 15 },
  { n: 1, fn() { log("charge: " + where() + " blow " + !!hb.blow); } }, { keys: [], n: 1, snap: true }, { keys: [], n: 6 },
  { n: 1, fn() { log("blow " + !!hb.blow + " " + where()); } }, { keys: [], n: 1, snap: true }, { keys: [], n: 8 }, snap, { keys: [], n: 90 }, snap,
  { n: 1, fn() { region.script.length = 0; hb.cine = null; hb.dark = null; hb.fallen = false; hb.blow = hb.auto = null; } }, { n: 1, fn: clean }];
testRun(steps);
