// (11-27) the battle for Zion: the intro, the archers and slingers rising, the shield turning arrows, all driven off -> taken
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const snap = { keys: [], n: 2, snap: true };
const rx = () => roomById("zion").c0 * T;
const until = test => ({ n: 1, fn() { let i = 0; while (region.script.length && !test() && i++ < 80) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; } });
const st = () => "foes " + jr.foes.map(f => f.kind + ":" + f.hp + ":" + f.st + ":" + (f.y === null ? "?" : Math.round(f.y))).join(" ") + " spears " + jrSpears().length + " shots " + jr.shots.length + " hearts " + david.hearts;
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted", "hb_end", "jr_taunt", "jr_leap"].forEach(k => regionAdd("taken", k)); learnSkill("wallClimb"); REGION.sword = () => true; jrZionFoes(roomById("zion").c0); } },   // (a real save has Jonathan's sword and shield by now)
  { n: 1, fn() { regionGo(rx() + 8 * T, 1, () => { david.y = GR * T; snapCamera(); jrZionBattle(); }); } }, { keys: [], n: 30 }, snap,
  until(() => jr.battle), { keys: [], n: 4 }, { n: 1, fn() { log("battle " + jr.battle + " " + st()); } },
  // the spearmen first: in their charge (then gone, for the rest)
  { keys: ["ArrowRight"], n: 30 }, { keys: [], n: 40 }, snap, { n: 1, fn() { log("street: x " + Math.round((david.x - rx()) / T) + " " + st()); for (const b of jrSpears()) { b.state = "drop"; b.t = 0; } david.hearts = 54; } },
  // no shield: arrows hit; then the shield toward the archer
  { n: 1, fn() { david.x = rx() + 16 * T; david.facing = -1; snapCamera(); jr.hitsBefore = david.hearts; } }, { keys: [], n: 240 }, { n: 1, fn() { log("no shield: hearts " + jr.hitsBefore + " -> " + david.hearts + " " + st()); david.hearts = 54; } },
  { keys: ["KeyG"], n: 60 }, snap, { keys: ["KeyG"], n: 180 }, { n: 1, fn() { log("shield: hearts 54 -> " + david.hearts + " told " + !!jr.shieldTold + " " + st()); } },
  // the citadel wall
  { n: 1, fn() { david.x = rx() + 36 * T; david.y = GR * T; david.facing = 1; david.hearts = 54; snapCamera(); } }, { keys: [], n: 70 }, snap, { n: 1, fn() { const f = jr.foes.find(q => q.kind === "sling"); f.st = "up"; f.t = 0.5; } }, { keys: [], n: 4 }, snap, { n: 1, fn() { log("wall: " + st()); } },
  // drive everyone off
  { n: 1, fn() { for (const f of jr.foes) { f.st = "up"; jrFoeHit({ x: f.x, y: f.y - 40 }); f.st = "up"; jrFoeHit({ x: f.x, y: f.y - 40 }); } for (const b of jrSpears()) { b.state = "drop"; b.t = 0; } log("hit all: " + st()); } },
  { keys: [], n: 120 }, { n: 1, fn() { log("won " + jr.won + " script " + region.script.length); } }, until(() => region.jscene), { keys: [], n: 4 },
  { n: 1, fn() { log("end " + hbHas("jr_end") + " jscene " + !!region.jscene); region.jscene = null; region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); regionWrite(); } },
]);
