// (11-21) Nabal at his feast behind Glen's table, Abigail in front of it (25:36); then the morning: she tells him, he's a stone (25:37)
startSetup = () => {}; setup.active = false; helpT = 0;
testRun([{ n: 1, fn() { region.script.length = 0; region.wait = 0; dialog.t = 0;
  const sh = roomById("shearing"); moveParty((sh.c0 + 18) * T, GR * T); snapCamera(); } },
  { keys: [], n: 60 }, { n: 1, fn() { region.script.length = 0; dialog.t = 0; c7.on = false; c7.nabalScene = true; c7.feastAbi = "abigail_idle"; c6.pose = { hide: true, t: 0 }; c6.nabal.spr = "nabal_feast"; c6.nabal.t = 0; c6.nabal.dir = 1; c6.nabal.y = FOOT - C7.FEAST_LIFT; } },
  { keys: [], n: 60, snap: true },
  { n: 1, fn() { c6.nabal.spr = "nabal_stone"; c6.nabal.t = 0; c7.feastAbi = "abigail_talk"; } }, { keys: [], n: 60, snap: true }]);
