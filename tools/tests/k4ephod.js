// (11-15) the ephod scene with Glen's Abiathar: holding the ephod out, then hands up while David asks
startSetup = () => {}; setup.active = false;
const drop = id => { region.save.taken = region.save.taken.filter(t => t !== id); };
testRun([{ n: 1, fn() { ["k4_floors", "k4_abiathar", "k4_saul"].forEach(t => regionAdd("taken", t)); drop("k4_ephod");
    const r = roomById("town"); moveParty((r.c0 + 10) * T, GR * T); snapCamera(); } }, { keys: [], n: 20 },
  { n: 1, fn() { const k = k4.rocks.find(o => o.id === "ephod"); moveParty(k.x - 70, GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 20 },
  { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 40 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 }, { keys: [], n: 1, snap: true }, { keys: [], n: 90 }, { keys: [], n: 1, snap: true }]);
