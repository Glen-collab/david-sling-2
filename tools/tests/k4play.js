// (11-14) Keilah: the raiders (hit them all, programmatically), the town's scenes (Abiathar, the ephod), the run
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const _say = sayLine; sayLine = (w, t) => { log("say: " + w + " | " + String(t).slice(0, 50)); return _say(w, t); };
{ let tr = region.trans; Object.defineProperty(region, "trans", { configurable: true, get: () => tr, set: v => { if (v && v.leave) { log("LEAVE"); return; } tr = v; } }); }
const at = (rm, k, y = GR * T) => { const r = roomById(rm); david.hp = 52; moveParty((r.c0 + k) * T, y); snapCamera(); };
const zap = () => { for (const q of k4.raiders) if (q.state === "walk" && Math.random() < 0.05) k4StoneHits({ x: q.x, y: q.y - 60 }); };
const steps = [
  { n: 1, fn() { regionAdd("taken", "k4_asked"); at("floors", 50); } }, { keys: [], n: 240, fn: zap }, { keys: [], n: 1, snap: true },
  { keys: [], n: 300, fn() { zap(); } }, { n: 1, fn() { log("raid " + JSON.stringify({ w: k4.raid.wave, n: k4.raid.n, stolen: k4.raid.stolen, live: k4.raiders.length, sacks: k4.floors.map(f => f.sacks) })); } }, { keys: [], n: 1, snap: true },
];
for (let i = 0; i < 12; i++) steps.push({ keys: [], n: 300, fn() { for (const q of k4.raiders) if (q.state === "walk" || q.state === "run") k4StoneHits({ x: q.x, y: q.y - 60 }); } });
steps.push({ n: 1, fn() { log("floors " + regionHas("taken", "k4_floors") + " wave " + k4.raid.wave); } });
for (let i = 0; i < 3; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 });
steps.push({ n: 1, fn() { at("town", 50); } }, { keys: [], n: 40 }, { keys: [], n: 1, snap: true });
for (let i = 0; i < 6; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40 });
steps.push({ n: 1, fn() { at("town", 67); } }, { keys: [], n: 10 }, { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 40 }, { keys: [], n: 1, snap: true });
for (let i = 0; i < 7; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40 });
steps.push({ n: 1, fn() { log("ephod " + regionHas("taken", "k4_ephod") + " skill " + hasSkill("ask")); at("town", 100); } }, { keys: [], n: 20 }, { keys: [], n: 1, snap: true });
steps.push({ n: 1, fn() { at("escape", 3); } }, { keys: [], n: 90 }, { keys: [], n: 1, snap: true }, { keys: [], n: 240, fn() { } },
  { n: 1, fn() { log("run " + JSON.stringify({ x: Math.round(david.x - roomById("escape").c0 * T), t: k4.run.t.toFixed(1), close: k4.run.close.toFixed(1), bumps: k4.run.bumps, shut: (k4.run.shut || 0).toFixed(2) })); } }, { keys: [], n: 1, snap: true });
testRun(steps);
