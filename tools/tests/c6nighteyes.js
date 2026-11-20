// (11-20) the night watch with no glowing eyes
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; region.crawl = null; };
const steps = [{ n: 1, fn() { clear(); region.save.taken = region.save.taken.filter(k => !/^c6_/.test(k) || k === "c6_intro"); region.save.taken.push("c6_fields", "c6_hills");
  const r = roomById("fields"); moveParty((r.c0 + 66) * T, GR * T); snapCamera(); } }];
for (let i = 0; i < 30; i++) steps.push({ keys: [], n: 10 }, { n: 1, fn() { clear(); } });
steps.push({ keys: [], n: 2, snap: true }, { n: 1, fn() { TEST_ERRORS.push("INFO night " + JSON.stringify(c6.night) + " trans " + !!region.trans + " dlg " + dialog.t + " wolves " + c6.hunters.filter(h => h.night).map(h => h.state + "@" + Math.round(h.x - david.x)).join(",")); } });
testRun(steps);
