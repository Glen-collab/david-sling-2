// (11-14) Keilah's first pass: every room, and the forest's story (the runner, the rock twice)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const _say = sayLine; sayLine = (w, t) => { log("say: " + w + " | " + String(t).slice(0, 60)); return _say(w, t); };
const at = (rm, k, y = GR * T) => { const r = roomById(rm); david.hp = 52; moveParty((r.c0 + k) * T, y); snapCamera(); };
const go = (rm, k, y) => [{ n: 1, fn() { at(rm, k, y); } }, { keys: [], n: 50 }, { n: 1, fn() { at(rm, k, y); } }, { keys: [], n: 3 }, { keys: [], n: 1, snap: true }];
const steps = [
  ...go("hereth", 26),
  { keys: ["ArrowRight"], n: 30 }, { keys: [], n: 20 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 10 },
  { n: 1, fn() { at("hereth", 41); } }, { keys: [], n: 5 }, { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 60 }, { keys: [], n: 1, snap: true },
];
for (let i = 0; i < 4; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 });
steps.push({ keys: ["ArrowUp"], n: 2 }, { keys: [], n: 60 });
for (let i = 0; i < 3; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 });
steps.push({ n: 1, fn() { log("asked " + regionHas("taken", "k4_asked")); } });
steps.push(...go("hereth", 90), ...go("road", 60), ...go("floors", 30), ...go("floors", 60, 300), ...go("town", 60), ...go("escape", 40), ...go("hills", 25));
testRun(steps);
