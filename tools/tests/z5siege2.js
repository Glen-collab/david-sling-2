// (Glen 11-17) the mountain faster: the lines rush in, a cleft warns before its scout runs out
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const st = () => { const S = z5.siege, E = z5SiegeEdges(); return S ? "t " + S.t.toFixed(1) + " edges " + E.map(e => Math.round(e / T - roomById("mountain").c0)).join("-") + " extra " + Math.round(S.extra) + " warn " + z5.clefts.map(k => (k.warn || 0).toFixed(1)).join(",") + " scouts " + z5.scouts.map(g => g.state).join(",") : "none"; };
testRun([
  { n: 1, fn() { ["z5_ziph_told", "z5_ziphites", "z5_warned", "z5_erem", "z5_jonathan", "z5_jonathan_gone", "z5_maon"].forEach(k => regionAdd("taken", k)); region.save.taken = region.save.taken.filter(t => !/z5_(rescued|surrounded)/.test(t)); at("mountain", 28); } }, { keys: [], n: 40 },
  ...Array.from({ length: 4 }, () => [{ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40 }]).flat(),
  { n: 1, fn() { david.inv = 999; at("mountain", 80); } },
  { keys: [], n: 120, fn() { log(st()); } }, { keys: [], n: 1, snap: true, fn() { log(st()); } },
  { keys: [], n: 240 }, { keys: [], n: 1, snap: true, fn() { log(st()); } },
  { keys: [], n: 240 }, { keys: [], n: 1, snap: true, fn() { log(st()); } },
  { n: 1, fn() { const k = z5.clefts.find(k => k.x > z5SiegeEdges()[0] && k.x < z5SiegeEdges()[1]) || z5.clefts[1]; k.warn = 0.9; moveParty(k.x + 3 * T, GR * T); snapCamera(); } }, { keys: [], n: 20, snap: true }, { keys: [], n: 50, snap: true, fn() { log(st()); } },
]);
