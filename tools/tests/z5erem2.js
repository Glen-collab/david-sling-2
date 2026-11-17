// (Glen 11-17) the stranger: after the talk, a dip to standing, he limps to the men's fire and sits
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const Z = (n = 1) => { const s = []; for (let i = 0; i < n; i++) s.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 }); return s; };
const st = () => { const E = z5.erem; return E.spr + " x " + Math.round(E.x / T - roomById("horesh").c0) + " a " + (E.alpha ?? 1).toFixed(2) + " erem " + z5Has("z5_erem"); };
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !k.startsWith("z5_")); ["z5_jonathan", "z5_jonathan_gone", "z5_ziph_told"].forEach(k => regionAdd("taken", k)); } },
  { n: 1, fn() { at("horesh", 68); } }, { keys: [], n: 40 }, { n: 1, fn() { at("horesh", 68); } }, { keys: [], n: 5 },
  { keys: ["ArrowRight"], n: 60 }, { keys: [], n: 20 }, ...Z(1), { keys: [], n: 60 }, ...Z(1), { keys: [], n: 110 }, ...Z(6),
  { keys: [], n: 20, snap: true, fn() { log(st()); } }, { keys: [], n: 100, snap: true, fn() { log(st()); } }, { keys: [], n: 150, snap: true, fn() { log(st()); } }, { keys: [], n: 200, fn() { log(st()); } },
]);
