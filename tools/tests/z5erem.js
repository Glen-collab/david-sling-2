// (11-15) Glen's Erem in Horesh: lying hurt, waking, drinking, talking, getting up; then at the fire. A Ziphite lookout.
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const Z = (n = 1) => { const s = []; for (let i = 0; i < n; i++) s.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 }); return s; };
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !k.startsWith("z5_")); ["z5_jonathan", "z5_jonathan_gone", "z5_ziph_told"].forEach(k => regionAdd("taken", k)); } },
  { n: 1, fn() { at("horesh", 68); } }, { keys: [], n: 40 }, { n: 1, fn() { at("horesh", 68); } }, { keys: [], n: 5, snap: true },
  { keys: ["ArrowRight"], n: 60 }, { keys: [], n: 20 }, ...Z(1), { keys: [], n: 40, snap: true },
  { keys: [], n: 60 }, ...Z(1), { keys: [], n: 50, snap: true }, { keys: [], n: 60 },
  ...Z(4), { keys: [], n: 1, snap: true }, ...Z(2), { keys: [], n: 50, snap: true }, { keys: [], n: 80 },
  { n: 1, fn() { log("erem " + regionHas("taken", "z5_erem")); at("horesh", 92); } }, { keys: [], n: 20, snap: true },
  { n: 1, fn() { at("hachilah", 26); } }, { keys: [], n: 30 }, { n: 1, fn() { at("hachilah", 26); } }, { keys: [], n: 30, snap: true },
]);
