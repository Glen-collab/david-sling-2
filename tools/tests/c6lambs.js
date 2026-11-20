// (11-20) the strays: a few slow steps, then a long stop to graze
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; region.crawl = null; };
const log = [];
const steps = [{ n: 1, fn() { clear(); region.save.taken = region.save.taken.filter(k => !/^c6_/.test(k) || k === "c6_intro");
  for (const h of c6.hunters) h.state = "gone"; const r = roomById("fields"); moveParty((r.c0 + 20) * T, GR * T); snapCamera(); } }];
for (let i = 0; i < 40; i++) steps.push({ keys: [], n: 15, snap: i === 10 || i === 25, fn() {} },
  { n: 1, fn() { clear(); for (const h of c6.hunters) h.state = "gone";
    const s = c6.strays.find(o => o.room === "fields" && o.state === "stray" && Math.abs(o.y - FOOT) < 10);
    if (s) log.push((s.walkT > 0 ? "W" : s.graze ? "g" : "s") + Math.round(s.x)); } });
steps.push({ n: 1, fn() { TEST_ERRORS.push("INFO " + log.join(" ")); } });
testRun(steps);
