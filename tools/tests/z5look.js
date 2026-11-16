// (11-15) Hachilah's lookouts with Glen's Ziphites: watching (ziphite_watch), seeing David (ziphite_spot), running
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const L = () => z5.lookouts[0];
testRun([
  { n: 1, fn() { ["z5_ziph_told", "z5_ziphites", "z5_warned", "z5_erem", "z5_jonathan", "z5_jonathan_gone"].forEach(k => regionAdd("taken", k)); at("hachilah", 22); } }, { keys: [], n: 30 },
  { n: 1, fn() { L().facing = -1; L().t = 0; log("x " + Math.round(L().x - camX)); } }, { keys: [], n: 5, snap: true },
  { n: 1, fn() { L().state = "spot"; L().t = 0; } }, { keys: [], n: 12, snap: true },
  { keys: [], n: 14, snap: true },
  { n: 1, fn() { log("lookout " + L().state); } },
]);
