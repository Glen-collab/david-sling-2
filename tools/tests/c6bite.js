// (11-20) the jackal and the lion turn on David when he's near
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; region.crawl = null; };
const log = m => TEST_ERRORS.push("INFO " + m);
let h;
const near = (rm, kind) => ({ n: 1, fn() { clear(); const r = roomById(rm); h = c6.hunters.find(o => o.room === rm && o.kind === kind); Object.assign(h, { state: "prowl", alpha: 1, x: h.hx, cool: 99, atkCool: 0 });
  moveParty(h.x - 200, GR * T); snapCamera(); david.facing = 1; david.hearts = david.maxHearts; david.inv = 0; c6.inT = 99; } });
const steps = [{ n: 1, fn() { clear(); region.save.taken = region.save.taken.filter(k => !/^c6_/.test(k) || k === "c6_intro"); } }];
for (const [rm, kind] of [["fields", "jackal"], ["hills", "lion"]])
  steps.push(near(rm, kind), { keys: [], n: 1 }, { n: 1, fn() { h.atkCool = 0; c6.inT = 99; david.x = h.x - 200; } }, { keys: [], n: 14, snap: true }, { keys: [], n: 50, fn() { clear(); } },
    { n: 1, fn() { log(kind + " state " + h.state + " hearts " + david.hearts + "/" + david.maxHearts); } });
testRun(steps);
