// (11-27, Glen: "The stronghold of Zion can be like 'pre stronghold' then the wall up close for fighting with the door") the
//  street fight, then the gate of the stronghold: slingers on the wall, spearmen on the ground; all run, Up at the gate
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const snap = { keys: [], n: 2, snap: true };
const drain = (test = () => false) => ({ n: 1, fn() { let i = 0; while (region.script.length && !test() && i++ < 80) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; } });
const st = rm => jr.foes.filter(f => f.room === rm).map(f => f.kind + ":" + f.hp + ":" + f.st).join(" ") + " spears " + jrSpears(rm).length;
const rout = rm => ({ n: 1, fn() { for (const f of jr.foes) if (f.room === rm) { f.hp = 0; } for (const b of region.beasts) if (b.room === rm && b.kind === "phil") { b.state = "drop"; b.t = 0; } } });
const go = (id, k) => ({ n: 1, fn() { regionGo((roomById(id).c0 + k) * T, 1, () => { david.y = GR * T; snapCamera(); }); } });
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^j[rx]_/.test(k)); ["jr_taunt", "jr_course", "jr_leap"].forEach(k => regionAdd("taken", k)); region.script.length = 0; hb.cine = null; dialog.t = 0; region.wait = 0;
    learnSkill("wallClimb"); REGION.sword = () => true; jrZionFoes(roomById("zion").c0); log("zion foes " + st("zion") + " | citadel " + st("citadel") + " right " + roomById("zion").right); } },
  go("zion", 8), { keys: [], n: 40 }, drain(() => jr.battle), { keys: [], n: 10 }, { n: 1, fn() { log("street battle " + jr.battle); david.x = (roomById("zion").c0 + 48) * T; snapCamera(); } }, { keys: [], n: 4 }, snap,
  rout("zion"), { keys: [], n: 90 }, { n: 1, fn() { log("street won " + hbHas("jr_street") + " right " + roomById("zion").right + " script " + region.script.length); } }, drain(),
  go("citadel", 4), { keys: [], n: 60 }, drain(), { keys: [], n: 10 }, { n: 1, fn() { log("citadel battle " + jr.battle + " " + st("citadel")); } }, snap,
  { n: 1, fn() { david.x = (roomById("citadel").c0 + 20) * T; snapCamera(); const f = jr.foes.find(q => q.room === "citadel" && q.kind === "sling"); f.st = "up"; f.t = 0.5; } }, { keys: [], n: 6 }, snap,
  { keys: [], n: 120 }, { n: 1, fn() { log("under fire: hearts " + david.hearts); david.hearts = 54; } },
  rout("citadel"), { keys: [], n: 90 }, drain(), { n: 1, fn() { log("citadel won " + jr.won); } },
  { n: 1, fn() { david.x = (roomById("citadel").c0 + 51) * T; snapCamera(); } }, { keys: [], n: 10 }, snap, { keys: ["ArrowUp"], n: 2 }, { keys: [], n: 10 },
  { n: 1, fn() { log("in the gate: " + jr.inGate + " script " + region.script.length); } }, drain(() => region.jscene), { keys: [], n: 4 },
  { n: 1, fn() { log("end " + hbHas("jr_end") + " jscene " + !!region.jscene); region.jscene = null; region.script.length = 0; hb.cine = null; region.save.taken = region.save.taken.filter(k => !/^j[rx]_/.test(k)); regionWrite(); } },
]);
