// (11-16) the Mountain's clefts (w4_arch_sand + rocks) and a scout stepping out of one
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const zTalk = n => { const s = []; for (let i = 0; i < n; i++) s.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40 }); return s; };
testRun([
  { n: 1, fn() { ["z5_ziph_told", "z5_ziphites", "z5_warned", "z5_erem", "z5_jonathan", "z5_jonathan_gone", "z5_maon"].forEach(k => regionAdd("taken", k)); at("mountain", 28); } }, { keys: [], n: 40 },
  ...zTalk(3),
  { n: 1, fn() { log("siege " + !!z5.siege + " script " + region.script.length); const k = z5.clefts[0]; z5.scouts.push({ room: "mountain", x: k.x, from: k.x - 4 * T, to: k.x + 4 * T, y: FOOT, facing: -1, state: "walk", t: 0, life: 0, seen: 0, alpha: 0 }); } },
  { keys: [], n: 25, snap: true },
  { keys: [], n: 60, snap: true },
]);
