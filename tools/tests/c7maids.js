// (11-21) the end in the storerooms: Abigail rides off with her five maids, all facing the way they go
startSetup = () => {}; setup.active = false; helpT = 0;
testRun([{ n: 1, fn() { region.script.length = 0; region.wait = 0; dialog.t = 0;
  const st = roomById("stores"); moveParty((st.c0 + 26) * T, GR * T); snapCamera(); c7End(st);
  c7.endAbi.spr = "abigail_ride"; c7.endAbi.t = 0; c7.endAbi.dir = 1; c7.endAbi.vx = 120; c7.maids.vx = 120; c7.maids.show = () => true; } },
  { keys: [], n: 50 }, { keys: [], n: 2, snap: true }]);
