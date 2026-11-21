// (11-21) dusk in the Hill Pastures heading back to the fields; the night deepening in; the morning coming up slowly
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const quiet = () => { region.script.length = 0; region.wait = 0; dialog.t = 0; };
const at = (id, k) => { const r = roomById(id); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^c[67]_/.test(k)); region.save.taken.push("c6_intro", "c6_fields", "c6_hills"); quiet(); at("hills", roomById("hills").w - 4); } },
  { keys: [], n: 60, fn: quiet }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { at("hills", 55); } }, { keys: [], n: 30, fn: quiet }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { at("hills", 4); } }, { keys: [], n: 30, fn: quiet }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { at("fields", roomById("fields").w - 6); } }, { keys: [], n: 20, fn: quiet }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { log("night " + !!c6.night + " t " + (c6.night && c6.night.t.toFixed(1))); } }, { keys: [], n: 300, fn: quiet }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { c6.dawn = { t: 0 }; } }, { keys: [], n: 50, fn: quiet }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { log("pre-dawn bg " + region.room.bg); } }, { keys: [], n: 150, fn: quiet }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { log("dawn bg " + region.room.bg + " t " + (c6.dawn && c6.dawn.t.toFixed(1))); } }, { keys: [], n: 300, fn: quiet }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { log("after: dawn " + !!c6.dawn); } }];
testRun(steps);
