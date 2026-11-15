// (11-15) Hachilah: a Ziphite hunched by one of Saul's men while 23:19-22 are up
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const _say = sayLine; sayLine = (w, t) => { log("say: " + w + " | " + String(t).slice(0, 50)); return _say(w, t); };
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => k !== "z5_ziph_told"); ["z5_ziphites", "z5_warned", "z5_erem", "z5_jonathan", "z5_jonathan_gone"].forEach(k => regionAdd("taken", k)); at("maon", 60); } }, { keys: [], n: 20 },
  { n: 1, fn() { at("hachilah", 4); } }, { keys: [], n: 80, snap: true },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 40, snap: true }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 40, snap: true },
  { n: 1, fn() { log("whisper " + z5.whisper); } },
]);
