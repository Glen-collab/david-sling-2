// (11-14) Out of Keilah: a bot runs it (jump the carts, gaps and men, roll under the beams): can it be done in time?
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
{ let tr = region.trans; Object.defineProperty(region, "trans", { configurable: true, get: () => tr, set: v => { if (v && v.leave) { log("LEAVE"); return; } tr = v; } }); }
const c0 = () => roomById("escape").c0 * T;
const want_z = (jump, d) => jump && d.onGround && !window._z;
const bot = () => {
  const d = david, ahead = o => o - d.x;
  const carts = region.props.filter(p => p.room === "escape" && p.n === "w3_cart").map(p => p.x + KIT.w3_cart.w / 2 - T);
  const holes = region.holes.filter(h => h.room === "escape").map(h => h.x0);
  const men = k4.grabbers.filter(g => g.state !== "done").map(g => g.x);
  const jump = [...carts, ...holes, ...men].some(x => ahead(x) > 10 && ahead(x) < 130) || (d.onGround && Math.abs(d.vx) < 5);
  const roll = k4.beams.some(b => ahead(b.x) > 60 && ahead(b.x) < 150) || (ahead(k4.runGate) > 60 && ahead(k4.runGate) < 150 && (k4.run.shut || 0) > 0.4);
  const want = roll && d.onGround && d.state !== "roll" ? (window._dn ? ["ArrowDown", "KeyZ"] : ["ArrowDown"]) : jump && d.onGround ? (window._z ? [] : ["KeyZ"]) : d.vy < 0 && !d.onGround ? ["KeyZ"] : [];
  window._z = want_z(jump, d);
  window._dn = want.includes("ArrowDown");
  for (const k in keys) keys[k] = false; for (const k of want) keys[k] = true;
};
const steps = [{ n: 1, fn() { regionAdd("taken", "k4_ephod"); region.save.taken = region.save.taken.filter(x => x !== "k4_escaped"); const r = roomById("escape"); moveParty(c0() + 3 * T, GR * T); snapCamera(); } }];
for (let i = 0; i < 1400; i++) steps.push({ n: 1, fn() { bot(); if (i % 40 === 0) log(i + ": x " + Math.round((david.x - c0()) / T) + " " + david.state + " vx " + Math.round(david.vx) + " bumps " + k4.run.bumps + " hp " + david.hearts + (k4.run.fail ? " FAIL" : "") + " auto " + regionAutoRun() + " held " + held("right") + " keys " + Object.keys(keys).filter(k => keys[k]).join(",") + " grabT " + k4.run.grabT); } });
steps.push({ n: 1, fn() { log("run " + JSON.stringify({ x: Math.round((david.x - c0()) / T), t: k4.run.t.toFixed(1), close: k4.run.close.toFixed(1), bumps: k4.run.bumps, done: k4.run.done, hp: david.hearts, escaped: regionHas("taken", "k4_escaped") })); } }, { keys: [], n: 1, snap: true });
testRun(steps);
