// (11-20) the fold in the middle: the fields and hills from end to end
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; region.crawl = null; };
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const steps = [{ n: 1, fn() { clear(); region.save.taken = region.save.taken.filter(k => !/^c6_/.test(k) || k === "c6_intro"); } }];
for (const [rm, k] of [["fields", 12], ["fields", 38], ["fields", 70], ["fields", 102], ["fields", 128], ["hills", 18], ["hills", 55], ["hills", 90]])
  steps.push({ n: 1, fn() { clear(); for (const h of c6.hunters) h.state = "gone"; at(rm, k); } }, { keys: [], n: 20, snap: true });
testRun(steps);
