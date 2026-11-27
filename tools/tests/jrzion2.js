// (11-27, Glen at Zion's olive press: "what do I do at this room? I killed everyone?") back at the press, the battle starts
//  again and can be won (run after a seed: the save at Zion's press, the stronghold not taken)
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const fs = () => jr.foes.map(f => f.kind + ":" + f.hp + ":" + f.st).join(" ");
testRun([
  { n: 1, fn() { learnSkill("wallClimb"); REGION.sword = () => true; log("start " + (region.room && region.room.id) + " battle " + jr.battle + " foes " + fs()); } },
  { n: 1, fn() { let i = 0; while (region.script.length && i++ < 40) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; } }, { keys: [], n: 30 },
  { n: 1, fn() { log("battle " + jr.battle + " cine " + !!hb.cine); for (const b of region.beasts) if (b.room === "zion" && b.kind === "phil") b.state = "flee"; for (const f of jr.foes) { f.y = f.y || 400; f.hp = 0; } } },
  { keys: [], n: 30 }, { n: 1, fn() { log("street won " + hbHas("jr_street") + " script " + region.script.length); } },
  { n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^j[rx]_/.test(k)); region.script.length = 0; regionWrite(); } },
]);
