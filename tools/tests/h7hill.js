// (11-23) the harder Hachilah: the wilderness's scorpions, viper and ibex; up the hill rock by rock (each jump tried for
// real); a crumbly rock; landing on a sleeper
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) dialog.t = 0; };
const run = (n, keys = []) => ({ keys, n, fn: skip });
const at = (id, k, y = GR * T) => { const r = roomById(id); moveParty((r.c0 + k) * T, y); snapCamera(); };
const W_ = { s: 3.6, m: 5.5, l: 7.5 };
// the way up (the build's rocks: column, size, surface)
const P = [[0, 9, 612], [10, "m", 504], [17.5, "s", 396], [12, "l", 288], [21, "m", 180], [27, "s", 72], [31.5, "l", -36], [41.5, "m", -36],
  [48.5, "l", -144], [65, "s", -36], [69, "m", 108], [75.5, "s", 324], [77, 12, 612]].map(([k, sz, y]) => ({ a: k, b: k + (typeof sz === "number" ? sz : W_[sz]), y }));
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^h7_/.test(k) || k === "h7_start" || k === "h7_camp"); region.script.length = 0; } }];
// 1-2 the wilderness
steps.push({ n: 1, fn() { at("wild", 52); h7.abi.on = true; } }, run(30), { keys: [], n: 2, snap: true });
steps.push({ n: 1, fn() { at("wild", 76); } }, run(30), { keys: [], n: 2, snap: true });
// 3-6 the hill: each jump
const hill = () => roomById("hill").c0;
for (let i = 0; i + 1 < P.length; i++) {
  const A = P[i], B = P[i + 1];
  steps.push({ n: 1, fn() {
    for (const k of h7.rocks) { if (k.state !== "whole") { k.state = "whole"; k.t = 0; platAt(k.c0, k.sy, k.w); } }
    const bc = (B.a + B.b) / 2, lo = A.a + 0.6, hi = A.b - 0.6;
    const sx = bc >= lo && bc <= hi ? bc : bc > hi ? hi : lo;   // (under the next one if it's overhead, else at the edge toward it)
    at("hill", sx, A.y - 2); david.facing = bc > sx ? 1 : -1; this.dir = bc > sx + 0.3 ? "ArrowRight" : bc < sx - 0.3 ? "ArrowLeft" : null;
    window._got = false; } }, run(12));
  const dirKeys = () => { const bc = (B.a + B.b) / 2, x = david.x / T - hill(); return Math.abs(x - bc) < 0.8 ? [] : [x < bc ? "ArrowRight" : "ArrowLeft"]; };
  for (let f = 0; f < 70; f++) steps.push({ n: 1, fn() { const want = (f < 16 ? ["KeyZ"] : []).concat(dirKeys()); for (const k in keys) keys[k] = false; for (const k of want) keys[k] = true; if (david.onGround && Math.abs(david.y - B.y) < 4) window._got = true; } });
  steps.push({ n: 1, fn() { for (const k in keys) keys[k] = false; } }, run(30), { n: 1, fn() { log(`jump ${i} -> ${i + 1}: y ${Math.round(david.y)} (want ${B.y}) col ${(david.x / T - hill()).toFixed(1)} ${window._got ? "OK (landed)" : "MISS"}`); } });
  if (i === 2 || i === 5 || i === 8) steps.push({ keys: [], n: 2, snap: true });
}
// 7 a crumbly rock: stand on it
steps.push({ n: 1, fn() { at("hill", 23.5, 180 - 2); } }, run(20), { n: 1, fn() { log("crumbly after 20f: " + h7.rocks.map(k => k.state).join(",")); } }, run(40),
  { n: 1, fn() { log("crumbly after 60f: " + h7.rocks.map(k => k.state).join(",") + " david y " + Math.round(david.y)); } }, { keys: [], n: 2, snap: true });
// 8 a sleeper: drop onto one
steps.push({ n: 1, fn() { const s = h7.sleepers.find(o => o.room === "wagons"); log("hearts " + david.hearts); moveParty(s.x0 + s.off + 70, GR * T - 140); snapCamera(); } },
  { keys: [], n: 30 }, { n: 1, fn() { log("after landing: hearts " + david.hearts + " stirred " + h7.sleepers.filter(o => o.stir > 0).length); } }, { keys: [], n: 2, snap: true });
testRun(steps);
