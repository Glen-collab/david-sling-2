// (11-23) Ziklag, first build: each room and beat (Aphek, the road, Ziklag burned: the stones, the prayer, the ephod, a
// fire put out; the Negev; the brook Besor; the Egyptian fed; the camp: a raider, a family freed, all freed; the sharing)
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) dialog.t = 0; };
const run = (n, keys = []) => ({ keys, n, fn: skip });
const at = (id, k, y = GR * T) => { const r = roomById(id); moveParty((r.c0 + k) * T, y); snapCamera(); };
const where = () => region.room.id + " col " + (david.x / T - region.room.c0).toFixed(1);
const drain = () => ({ n: 1, fn() { let i = 0; while (region.script.length && i++ < 60) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; } });
const up = () => [{ n: 1, fn() { log(`before up: ${where()} free ${zkFree()} act ${zk.act && zk.act.kind} jar ${zk.jar} script ${region.script.length} wait ${region.wait} dialog ${dialog.t}`); } }, { keys: ["ArrowUp"], n: 1 }, { keys: [], n: 1 }, { n: 1, fn() { log(`after up: act ${zk.act && zk.act.kind}`); } }];
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^z7_/.test(k)); region.script.length = 0; } }];
// 1 Aphek
steps.push({ n: 1, fn() { at("aphek", 8); } }, run(20), { keys: [], n: 2, snap: true }, run(30), { n: 1, fn() { log("aphek start " + zkHas("z7_start") + " script " + region.script.length); } }, drain());
steps.push({ keys: ["ArrowRight"], n: 110 }, { n: 1, fn() { log("by Achish: " + where() + " script " + region.script.length); } }, run(5), { keys: [], n: 2, snap: true }, drain(), { n: 1, fn() { log("sent " + zkHas("z7_sent") + " right " + roomById("aphek").right); } });
// 2 the road
steps.push({ n: 1, fn() { at("road", 40); } }, run(30), { keys: [], n: 2, snap: true });
// 3 Ziklag
steps.push({ n: 1, fn() { at("ziklag", 8); } }, run(20), { keys: [], n: 2, snap: true }, drain());
steps.push({ keys: ["ArrowRight"], n: 110 }, { n: 1, fn() { log("ziklag: " + where() + " stones " + zkHas("z7_stones")); } }, run(3), { keys: [], n: 2, snap: true });
steps.push({ n: 1, fn() { while (region.script.length && !zk.pray) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; } }, { keys: [], n: 30 }, { keys: [], n: 2, snap: true }, drain(), { n: 1, fn() { log("pursue " + zkHas("z7_pursue")); } }, run(10), { keys: [], n: 2, snap: true });
steps.push({ n: 1, fn() { at("ziklag", 52); } }, run(10), ...up(), { keys: [], n: 70 }, { n: 1, fn() { log("jar " + zk.jar); at("ziklag", 58.5); david.facing = 1; } }, run(10), ...up(), { keys: [], n: 50 }, { keys: [], n: 2, snap: true }, { keys: [], n: 120 },
  { n: 1, fn() { log("fire out " + zk.fires[0].out + " jar " + zk.jar); } }, { keys: [], n: 2, snap: true });
// 4 the Negev, 5 Besor
steps.push({ n: 1, fn() { for (const f of zk.fires) { f.out = true; for (let r = GR - ZK.FIRE_H; r < GR; r++) solid[r][f.c] = 0; } at("negev", 55); } }, run(30), { keys: [], n: 2, snap: true });
steps.push({ n: 1, fn() { at("besor", 20); } }, run(20), { keys: [], n: 2, snap: true }, drain(), { n: 1, fn() { at("besor", 24.5); david.facing = 1; } }, run(5), ...up(), { keys: [], n: 70 }, { n: 1, fn() { log("besor jar " + zk.jar); } });
// 6 the field: the food, the Egyptian
steps.push({ n: 1, fn() { for (const o of zk.foods) { o.got = true; regionAdd("taken", "z7_" + o.name); } at("field", 54); } }, run(20), { keys: [], n: 2, snap: true }, ...up(), run(2),
  { n: 1, fn() { log("egy feed script " + region.script.length + " st " + zk.egy.st); } }, { n: 1, fn() { while (region.script.length && zk.egy.st !== "revive") { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; } }, { keys: [], n: 30 }, { keys: [], n: 2, snap: true }, drain(),
  { keys: ["ArrowRight"], n: 40 }, { keys: [], n: 2, snap: true }, { n: 1, fn() { log("egypt " + zkHas("z7_egypt") + " egy x-david " + Math.round(zk.egy.x - david.x) + " right " + roomById("field").right); } });
// 7 the camp
steps.push({ n: 1, fn() { at("camp", 6); } }, run(20), drain(), { keys: [], n: 2, snap: true }, { keys: ["ArrowRight"], n: 40 }, { keys: [], n: 20 }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { log("raiders " + region.beasts.filter(b => b.room === "camp").map(b => b.state).join(",") + " hearts " + david.hearts); } });
steps.push({ n: 1, fn() { for (const b of region.beasts) if (b.room === "camp") b.dead = true; at("camp", 22); } }, run(5), ...up(), run(10), { keys: [], n: 2, snap: true },
  { n: 1, fn() { for (const q of zk.captives) if (!q.free) { q.free = true; q.t = 0; } zkWon(); } }, { keys: [], n: 40 }, { keys: [], n: 2, snap: true }, drain());
// 8 the sharing
steps.push({ n: 1, fn() { at("besor", 12); zkEnter(roomById("besor")); log("share script " + region.script.length); } }, run(10), { keys: [], n: 2, snap: true }, drain(), { keys: [], n: 60 }, { n: 1, fn() { log("end " + zkHas("z7_end") + " jscene " + !!region.jscene); } }, { keys: [], n: 2, snap: true });
testRun(steps);
