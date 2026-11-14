// (Glen 11-14) the end of World 4: all eight found, Gad waits at the Camp; Up by him, the scene, then Adullam done
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const _say = sayLine; sayLine = (w, t) => { log("say: " + w + " | " + String(t).slice(0, 70)); return _say(w, t); };
const say = () => {};
{ let tr = region.trans; Object.defineProperty(region, "trans", { configurable: true, get: () => tr, set: v => { if (v && v.leave) { log("LEAVE (to the land map); exit " + regionHas("taken", "g_exit_open")); return; } tr = v; } }); }
const steps = [
  { n: 1, fn() { region.save.taken = region.save.taken.filter(x => x !== "g_exit_open"); for (let i = 0; i < 8; i++) regionAdd("taken", "r4_man_" + i); for (const m of r4.men) if (m.id) m.state = "gone";
    const r = roomById("camp"); moveParty((r.c0 + 23.5) * T, GR * T); david.facing = 1; snapCamera(); } }, { keys: [], n: 60 },
  { n: 1, fn() { const r = roomById("camp"); moveParty((r.c0 + 23.5) * T, GR * T); snapCamera(); } }, { keys: [], n: 5 }, { keys: [], n: 1, snap: true },
  { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 30, fn: say }, { keys: [], n: 1, snap: true },
];
for (let i = 0; i < 7; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40, fn: say });
steps.push({ n: 1, fn() { log("exit " + regionHas("taken", "g_exit_open") + " trans " + JSON.stringify(region.trans)); } });
testRun(steps);
