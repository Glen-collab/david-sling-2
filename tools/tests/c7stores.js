// (11-21) the storerooms: the boy's size, the steward standing at his post and turning (facing the way he looks), hiding
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) dialog.t = 0; };
const run = (n, fn) => ({ keys: [], n, fn() { skip(); fn && fn(); } });
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^c[67]_/.test(k)); region.save.taken.push("c6_intro", "c6_fields", "c6_hills", "c6_night", "c6_insult"); region.script.length = 0; region.wait = 0; dialog.t = 0;
  const cp = roomById("camp"); moveParty((cp.c0 + 30) * T, GR * T); snapCamera(); } }];
for (let i = 0; i < 20; i++) steps.push(run(10));
steps.push({ keys: [], n: 30, snap: true });
// behind the first jar (col 24), crouched, through several of his turns
let saw = 0;
steps.push({ n: 1, fn() { const r = region.room; david.x = (r.c0 + 24) * T; david.y = GR * T; snapCamera(); log("steward at " + Math.round((c7.watch[0].x - david.x)) + " dir " + c7.watch[0].dir); } });
for (let i = 0; i < 40; i++) steps.push({ keys: ["ArrowDown"], n: 10, fn() { skip(); if (region.script.length) saw++; } });
steps.push({ n: 1, fn() { log("hidden 400 frames: caught " + saw + " room " + region.room.id + " x " + Math.round(david.x / T - region.room.c0)); c7.watch[0].dir = -1; c7.watch[0].look = 5; } }, { keys: ["ArrowDown"], n: 10, snap: true });
// stand up in his sight
steps.push({ n: 1, fn() { c7.watch[0].dir = -1; c7.watch[0].look = 5; } }, { keys: [], n: 20 }, { n: 1, fn() { log("standing in sight: script " + region.script.length + " dialog " + (dialog.t > 0)); } }, { keys: [], n: 2, snap: true });
testRun(steps);
