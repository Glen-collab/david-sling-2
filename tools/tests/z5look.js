// (11-16) Hachilah's lookouts, each one man: the watcher (watch, hand to brow, run) and the pointer (stand, point, run)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const Ls = () => z5.lookouts;
testRun([
  { n: 1, fn() { ["z5_ziph_told", "z5_ziphites", "z5_warned", "z5_erem", "z5_jonathan", "z5_jonathan_gone"].forEach(k => regionAdd("taken", k)); at("hachilah", 4); } }, { keys: [], n: 30 },
  { n: 1, fn() { at("hachilah", 72); Ls().forEach(l => { l.facing = l.who === "pointer" ? -1 : 1; l.t = 0; }); log("who " + Ls().map(l => l.who + "@" + Math.round(l.x - camX)).join(" ")); } }, { keys: [], n: 3, snap: true },
  { n: 1, fn() { at("hachilah", 70); Ls().slice(1).forEach(l => { l.state = "spot"; l.t = 0; }); } }, { keys: [], n: 14, snap: true },
  { keys: [], n: 16, snap: true },
]);
