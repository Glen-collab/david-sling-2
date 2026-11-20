// (11-20) Abigail's half: the young man's news, the storerooms, the road, the valley, her words, the end
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
let noSkip = false;
const skip = () => { if (!noSkip && dialog.t > 0) dialog.t = 0; };   // (lets the script run on: each say closes)
const where = () => region.room.id + " x" + Math.round(david.x - region.room.c0 * T) + " abi " + c7.on + " ride " + c7.ride + " anger " + Math.round(c7.anger);
const run = (n, fn) => ({ keys: [], n, fn() { skip(); fn && fn(); } });
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^c[67]_/.test(k)); region.save.taken.push("c6_intro", "c6_fields", "c6_hills", "c6_night", "c6_insult"); region.script.length = 0; region.wait = 0; dialog.t = 0;
  const cp = roomById("camp"); moveParty((cp.c0 + 30) * T, GR * T); snapCamera(); } }];
for (let i = 0; i < 20; i++) steps.push(run(10));
steps.push({ n: 1, fn() { log("stores: " + where()); } }, { keys: [], n: 30, snap: true });
// the gifts: walk her to each in turn
steps.push({ n: 1, fn() { for (const w of c7.watch) w.x = -99999; } });
for (let k = 0; k < 9; k++) steps.push({ n: 1, fn() { const g = c7.gifts[k]; if (g && !g.got) { david.x = g.x; david.y = g.y - 2; david.vy = 0; } } }, run(3));
steps.push({ n: 1, fn() { log("gifts " + c7.got + "/" + c7.gifts.length); david.x = c7.donkey.x - 60; david.y = GR * T; } }, run(5), { keys: ["ArrowUp"], n: 2 }, run(60), { keys: [], n: 2, snap: true });
for (let i = 0; i < 30; i++) steps.push(run(10));
steps.push({ n: 1, fn() { log("road: " + where()); } }, { keys: ["ArrowRight"], n: 14 }, { keys: ["ArrowRight", "KeyZ"], n: 6, snap: true }, { keys: ["ArrowRight"], n: 30 },
  { n: 1, fn() { log("road fell: " + where() + " hp " + david.hp); } }, { keys: [], n: 90, snap: true }, { n: 1, fn() { log("road after: " + where()); } });
steps.push({ n: 1, fn() { const r = roomById("road"); david.x = (r.c0 + r.w - 3) * T; david.y = GR * T; } });
for (let i = 0; i < 12; i++) steps.push(run(10));
steps.push({ n: 1, fn() { log("valley: " + where()); } }, { keys: ["ArrowRight"], n: 60 }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { log("david at " + Math.round(c7.david.x - david.x) + " anger " + Math.round(c7.anger)); } }, { keys: ["ArrowDown"], n: 2 });
for (let i = 0; i < 12; i++) steps.push(run(10));
steps.push({ n: 1, fn() { log("bowed " + c7.bowed + " choice " + !!c7.choice + " round " + c7.round); } }, { keys: [], n: 2, snap: true });
// answer: one wrong, then all right
steps.push({ n: 1, fn() { const C = c7.choice; C.i = C.opts.findIndex(o => o !== C.right); } }, { keys: ["KeyZ"], n: 2 });
for (let i = 0; i < 6; i++) steps.push(run(10));
steps.push({ n: 1, fn() { log("after wrong: anger " + Math.round(c7.anger) + " round " + c7.round); } });
for (let k = 0; k < 6; k++) {
  steps.push({ n: 1, fn() { const C = c7.choice; if (C) C.i = C.opts.indexOf(C.right); } }, { keys: ["KeyZ"], n: 2 });
  for (let i = 0; i < 6; i++) steps.push(run(10));
  steps.push({ n: 1, fn() { log("round " + c7.round + " anger " + Math.round(c7.anger)); } });
}
steps.push({ keys: [], n: 2, snap: true });
for (let i = 0; i < 40; i++) steps.push({ n: 10, keys: [], fn() { if (c7.nabalScene && c6.nabal.spr === "nabal_feast") noSkip = true; skip(); } });
steps.push({ n: 1, fn() { log("nabal? " + where() + " spr " + c6.nabal.spr); } }, { keys: [], n: 2, snap: true }, { n: 1, fn() { noSkip = false; } });
for (let i = 0; i < 60; i++) steps.push(run(10));
steps.push({ n: 1, fn() { log("end: " + where() + " c6_end " + c6Has("c6_end") + " meeting " + c6Has("c6_meeting")); } }, { keys: [], n: 2, snap: true });
steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 }, { keys: [], n: 2, snap: true });
testRun(steps);
