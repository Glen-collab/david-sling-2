// (Glen 11-17) the night street's townsmen and women beside David
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { ["k4_floors", "k4_abiathar", "k4_saul", "k4_ephod"].forEach(t => regionAdd("taken", t)); region.save.taken = region.save.taken.filter(t => t !== "k4_escaped"); const r = roomById("escape"); moveParty((r.c0 + 26) * T, GR * T); snapCamera(); } }, { keys: [], n: 30, snap: true },
  { n: 1, fn() { const w = k4.throwers[0]; if (w) { const r = roomById("escape"); moveParty(w.x - 150, GR * T); snapCamera(); } } }, { keys: [], n: 4, snap: true }]);
