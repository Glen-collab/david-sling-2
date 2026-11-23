// (11-23) Glen's clips at Hachilah: David creeping; Saul and Abner asleep; the taking; walking with the spear and the jar;
// Saul waking across the valley; the young man for the spear
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) dialog.t = 0; };
const run = (n, keys = []) => ({ keys, n, fn: skip });
const at = (id, k, y = GR * T) => { const r = roomById(id); moveParty((r.c0 + k) * T, y); snapCamera(); };
const where = () => region.room.id + " col " + (david.x / T - region.room.c0).toFixed(1);
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^h7_/.test(k) || k === "h7_start" || k === "h7_camp"); region.script.length = 0; } }];
// 1 creeping (the fire room's open ground)
steps.push({ n: 1, fn() { at("fire", 3); h7.abi.on = true; } }, run(10), { keys: ["ArrowRight"], n: 30 }, { keys: ["ArrowRight"], n: 2, snap: true });
steps.push({ n: 1, fn() { at("fire", 22); } }, run(5), { keys: ["ArrowRight"], n: 120 }, { n: 1, fn() { log("at Saul: " + where() + " script " + region.script.length); } });
// 2-4 the taking
for (let i = 0; i < 6; i++) steps.push(run(5));
steps.push({ n: 1, fn() { log("take " + !!h7.take); } }, { keys: [], n: 120 }, { keys: [], n: 2, snap: true }, { keys: [], n: 150 }, { keys: [], n: 2, snap: true });
steps.push({ keys: [], n: 160 }, { n: 1, fn() { log("after take: " + where() + " taken " + h7Has("h7_taken") + " take " + !!h7.take); } });
for (let i = 0; i < 4; i++) steps.push(run(10));
steps.push({ keys: [], n: 2, snap: true });
// 5 walking with the spear and the jar
steps.push({ keys: ["ArrowRight"], n: 40 }, { keys: ["ArrowRight"], n: 2, snap: true });
// 6-8 the call: Saul wakes (while the lines wait); the young man
steps.push({ n: 1, fn() { at("mountain", 52, GR * T - 400 - 2); } }, run(20), { n: 1, fn() { log("call " + !!h7.call); } });
for (let i = 0; i < 2; i++) steps.push(run(10));
steps.push({ keys: [], n: 400 }, { keys: [], n: 2, snap: true });
steps.push({ n: 1, fn() { while (region.script.length && !h7.young) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; log("young " + JSON.stringify(h7.young) + " facing " + david.facing); } });
steps.push({ keys: [], n: 150 }, { keys: [], n: 2, snap: true }, { keys: [], n: 280 }, { keys: [], n: 2, snap: true });
testRun(steps);
