// (11-14) Keilah's end: out in the hills, 23:13-14, then the Journal (the last page)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const _say = sayLine; sayLine = (w, t) => { log("say: " + w + " | " + String(t).slice(0, 60)); return _say(w, t); };
{ let tr = region.trans; Object.defineProperty(region, "trans", { configurable: true, get: () => tr, set: v => { if (v && v.leave) { log("LEAVE"); return; } tr = v; } }); }
const steps = [{ n: 1, fn() { for (const k of ["k4_asked", "k4_floors", "k4_ephod", "k4_escaped"]) regionAdd("taken", k); region.save.taken = region.save.taken.filter(x => x !== "g_exit_open");
  const r = roomById("hills"); moveParty((r.c0 + 10) * T, GR * T); snapCamera(); } }, { keys: [], n: 30 }, { keys: ["ArrowRight"], n: 50 }, { keys: [], n: 10 }];
for (let i = 0; i < 3; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40 });
steps.push({ keys: [], n: 60, fn() { log("exit " + regionHas("taken", "g_exit_open") + " jscene " + !!region.jscene); } }, { keys: [], n: 1, snap: true });
testRun(steps);
