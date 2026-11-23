// (11-23) the brook Besor: in from the near bank, he falls in; jump to the rock and over
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) dialog.t = 0; region.script.length = 0; };
const at = (id, k, y = GR * T) => { const r = roomById(id); moveParty((r.c0 + k) * T, y); snapCamera(); };
const where = () => region.room.id + " col " + (david.x / T - region.room.c0).toFixed(1) + " y " + Math.round(david.y);
const steps = [{ n: 1, fn() { regionAdd("taken", "z7_besor"); at("besor", 23); } }, { keys: [], n: 20, fn: skip }, { keys: [], n: 2, snap: true }];
const hop = to => { for (let f = 0; f < 50; f++) steps.push({ n: 1, fn() { for (const k in keys) keys[k] = false; const x = david.x / T - roomById("besor").c0; if (x < to - 0.5) keys.ArrowRight = true; if (f < 14) keys.KeyZ = true; } }); steps.push({ n: 1, fn() { for (const k in keys) keys[k] = false; log("hop: " + where()); } }, { keys: [], n: 20, fn: skip }); };
steps.push({ keys: ["ArrowRight"], n: 18, fn: skip }, { n: 1, fn() { log("at the edge: " + where()); } });
steps.push({ n: 1, fn() { at("besor", 25.3); } }, { keys: [], n: 10, fn: skip }); hop(31);
steps.push({ keys: [], n: 2, snap: true }); hop(38.5); steps.push({ n: 1, fn() { log("over: " + where()); } }, { keys: [], n: 2, snap: true });
testRun(steps);
