// (11-24) welcoming a tribe at the feast brings Jacob's blessing on it, from the Hall of the Tribes (Genesis 49)
startSetup = () => {}; setup.active = false; helpT = 0;
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); regionWrite(); };
testRun([{ n: 1, fn() { clean(); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave"].forEach(k => regionAdd("taken", k)); const r = roomById("feast"); moveParty((r.c0 + 40) * T, GR * T); snapCamera(); } },
  { keys: [], n: 10 }, { n: 1, fn() { region.script.length = 0; dialog.t = 0; region.wait = 0; region.jscene = null; hb.cine = null; const t = hb.tribes[0]; t.x = david.x + 60; t.st = "here"; } },
  { keys: [], n: 3 }, { keys: ["ArrowUp"], n: 1 }, { keys: [], n: 20 }, { n: 1, fn() { TEST_ERRORS.push("INFO dialog " + (dialog.t > 0) + " script " + region.script.length + " st " + hb.tribes[0].st); } }, { keys: [], n: 2, snap: true }, { n: 1, fn: clean }]);
