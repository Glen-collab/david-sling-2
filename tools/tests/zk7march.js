// (11-24) Aphek's cut scene: the marching army between the mid and near pictures (Glen)
startSetup = () => {}; setup.active = false; helpT = 0;
testRun([{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^z7_/.test(k)); region.script.length = 0; const r = roomById("aphek"); moveParty((r.c0 + 8) * T, GR * T); snapCamera(); } },
  { keys: [], n: 20 }, { keys: [], n: 2, snap: true }, { keys: [], n: 260 }, { keys: [], n: 2, snap: true }]);
