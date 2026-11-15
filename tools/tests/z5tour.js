// (11-15) Ziph's first pass: every room; Jonathan and the stranger in Horesh; a lookout; the mountain mid-siege
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const _say = sayLine; sayLine = (w, t) => { log("say: " + w + " | " + String(t).slice(0, 60)); return _say(w, t); };
const at = (rm, k, y = GR * T) => { const r = roomById(rm); david.hp = 52; moveParty((r.c0 + k) * T, y); snapCamera(); };
const go = (rm, k, y) => [{ n: 1, fn() { at(rm, k, y); } }, { keys: [], n: 50 }, { n: 1, fn() { at(rm, k, y); } }, { keys: [], n: 3 }, { keys: [], n: 1, snap: true }];
const zTalk = (n, snapAt = -1) => { const s = []; for (let i = 0; i < n; i++) s.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40, snap: i === snapAt }); return s; };
const steps = [
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !k.startsWith("z5_") && k !== "g_exit_open"); } },
  ...go("hills", 30),
  ...go("horesh", 30), { keys: ["ArrowRight"], n: 20 }, { keys: [], n: 30 },
  ...zTalk(3, 2), { keys: ["KeyZ"], n: 2 }, { keys: [], n: 60, snap: true }, { keys: [], n: 40 }, ...zTalk(3), { keys: [], n: 60 },
  { n: 1, fn() { log("jonathan " + regionHas("taken", "z5_jonathan") + " courage " + skills.has("courage") + " max " + david.maxHearts); } },
  ...go("horesh", 74), { keys: ["ArrowRight"], n: 14 }, { keys: [], n: 40 }, ...zTalk(1), { keys: [], n: 50, snap: true }, ...zTalk(7, 3), { keys: [], n: 30 },
  { n: 1, fn() { log("erem " + regionHas("taken", "z5_erem")); } },
  ...go("hachilah", 12), ...zTalk(3), ...go("hachilah", 22), { keys: ["ArrowRight"], n: 20 }, { keys: [], n: 20, snap: true },
  ...go("maon", 12), ...zTalk(3), ...go("maon", 60),
  ...go("mountain", 16), ...zTalk(2), { keys: ["ArrowRight"], n: 120 }, { keys: [], n: 1, snap: true }, { keys: ["ArrowRight"], n: 200 }, { keys: [], n: 1, snap: true },
  { n: 1, fn() { log("siege t " + (z5.siege && z5.siege.t.toFixed(1)) + " hp " + david.hp + " scouts " + z5.scouts.length); } },
];
testRun(steps);
