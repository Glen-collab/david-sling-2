// (11-21) the valley: she gets down and bows; the donkey stays by her
startSetup = () => {}; setup.active = false; helpT = 0;
const skip = () => { if (dialog.t > 0) dialog.t = 0; };
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^c[67]_/.test(k)); region.save.taken.push("c6_intro", "c6_fields", "c6_hills", "c6_night", "c6_insult", "c7_begin"); region.script.length = 0; region.wait = 0; dialog.t = 0;
  c7.on = true; c7.ride = true; c7.anger = 50; const v = roomById("valley"); moveParty((v.c0 + 6) * T, GR * T); snapCamera(); } }];
for (let i = 0; i < 10; i++) steps.push({ keys: [], n: 10, fn: skip });
steps.push({ n: 1, fn() { david.x = c7.david.x - 200; } }, { keys: [], n: 10, fn: skip }, { keys: ["ArrowDown"], n: 3 }, { keys: [], n: 90, snap: true },
  { n: 1, fn() { TEST_ERRORS.push("INFO bowed " + c7.bowed + " donkey on " + c7.vdonkey.on + " at " + Math.round(c7.vdonkey.x - david.x)); } });
testRun(steps);
