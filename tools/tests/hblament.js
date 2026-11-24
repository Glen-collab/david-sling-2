// (11-24) the lament at its own pace: David at his harp, a line of the song on screen
startSetup = () => {}; setup.active = false; helpT = 0;
testRun([{ n: 1, fn() { region.script.length = 0; hb.cine = null; const r = roomById("ziklag"); moveParty((r.c0 + 30) * T, GR * T); snapCamera(); hb.harp = true; rPlay(hbLament()); } },
  { keys: [], n: 20 }, { keys: [], n: 2, snap: true }, { keys: [], n: 500 }, { keys: [], n: 2, snap: true }]);
