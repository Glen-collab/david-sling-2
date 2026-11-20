// (11-20) Nabal at his feast, seated on the cobbles: size check
startSetup = () => {}; setup.active = false;
testRun([{ n: 1, fn() { region.script.length = 0; region.wait = 0; dialog.t = 0;
  const sh = roomById("shearing"); moveParty((sh.c0 + 18) * T, GR * T); snapCamera(); } },
  { keys: [], n: 30 }, { n: 1, fn() { region.script.length = 0; dialog.t = 0; c7.on = false; c7.nabalScene = true; c6.pose = { hide: true, t: 0 }; c6.nabal.spr = "nabal_feast"; c6.nabal.t = 0; c6.nabal.dir = 1; } },
  { keys: [], n: 60, snap: true }]);
