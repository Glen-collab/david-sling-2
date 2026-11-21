// (11-21) World 7, the Hill of Hachilah (stand-ins): the start, the rooms, a sleeper in the way, a wagon to crawl under,
// a cart to stand on, Saul's head (26:7-12), the far mountain's call (26:13-25), the Journal
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) dialog.t = 0; };
const run = (n, keys = []) => ({ keys, n, fn: skip });
const at = (id, k, y = GR * T) => { const r = roomById(id); moveParty((r.c0 + k) * T, y); snapCamera(); };
const where = () => region.room.id + " col " + (david.x / T - region.room.c0).toFixed(1) + " y " + Math.round(GR * T - david.y);
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^h7_/.test(k)); region.script.length = 0; at("wild", 10); } }];
for (let i = 0; i < 30; i++) steps.push(run(10));
steps.push({ n: 1, fn() { log("start: h7_start " + h7Has("h7_start") + " abi " + h7.abi.on); } }, { keys: ["ArrowRight"], n: 30 }, { keys: [], n: 20, snap: true });
steps.push({ n: 1, fn() { at("hill", 36); } }, run(60), { keys: [], n: 2, snap: true });
// the wagons: walk into the first sleeper
steps.push({ n: 1, fn() { at("wagons", 6); } }); for (let i = 0; i < 8; i++) steps.push(run(10));
steps.push({ keys: ["ArrowRight"], n: 60 }, { n: 1, fn() { log("walked at a sleeper: " + where()); } }, { keys: [], n: 2, snap: true });
// crawl under the first loaded wagon (cols 32-39)
steps.push({ n: 1, fn() { at("wagons", 30); } }, run(10), { keys: ["ArrowRight"], n: 40 }, { n: 1, fn() { log("standing at the wagon: " + where()); } },
  { keys: ["ArrowDown", "ArrowRight"], n: 90 }, { n: 1, fn() { log("crawled: " + where()); } }, { keys: ["ArrowDown"], n: 2, snap: true });
// on a cart
steps.push({ n: 1, fn() { at("wagons", 45, GR * T - 4 * T - 2); } }, run(30), { n: 1, fn() { log("on the cart: " + where() + " ground " + david.onGround); } }, { keys: [], n: 2, snap: true });
// Saul's fire
steps.push({ n: 1, fn() { at("fire", 18); } }, run(20), { keys: [], n: 2, snap: true }, { keys: ["ArrowRight"], n: 20 });
for (let i = 0; i < 4; i++) steps.push(run(10));
steps.push({ n: 1, fn() { log("at Saul: script " + region.script.length + " taken " + h7Has("h7_taken")); } }, { keys: [], n: 2, snap: true });
for (let i = 0; i < 20; i++) steps.push(run(10));
steps.push({ n: 1, fn() { log("after: taken " + h7Has("h7_taken") + " right " + region.room.right); } }, { keys: [], n: 2, snap: true });
// the far mountain: on top
steps.push({ n: 1, fn() { at("mountain", 52, GR * T - 400 - 2); } }, run(20), { n: 1, fn() { log("top: " + where() + " call " + !!h7.call); } }, { keys: [], n: 2, snap: true });
for (let i = 0; i < 40; i++) steps.push(run(10));
steps.push({ n: 1, fn() { log("end: h7_end " + h7Has("h7_end") + " dawn " + (h7.dawn && h7.dawn.t.toFixed(1))); } }, { keys: [], n: 2, snap: true });
testRun(steps);
