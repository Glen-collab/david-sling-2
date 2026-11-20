// (11-20) Carmel first pass, all of half one: the fields and hills folded, the thorns, the night, the young men and Nabal
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const foldAll = rm => { for (const s of c6RoomStrays(rm)) if (s.state !== "folded" && s.state !== "thorns") { c6Folded(s); c6Arrived(rm); } };
const steps = [{ n: 1, fn() { region.crawl = null; region.save.taken = region.save.taken.filter(k => !/^c6_/.test(k) || k === "c6_intro"); clear(); foldAll("fields"); log("fields done " + c6Has("c6_fields")); clear(); at("hills", 60); } }, { keys: [], n: 20 },
  // the sheep in the thorns: the sword cuts it free, and it walks home
  { n: 1, fn() { clear(); const o = c6RoomStrays("hills").find(s => s.thorns); david.x = o.x - 60; david.facing = 1; for (const h of c6.hunters) h.state = "gone"; } }, { keys: [], n: 5 }, { keys: ["KeyV"], n: 2 }, { keys: [], n: 20, snap: true },
  { n: 1, fn() { const o = c6RoomStrays("hills").find(s => s.thorns); log("thorns sheep: " + o.state); } }, { keys: [], n: 400 },
  { n: 1, fn() { const o = c6RoomStrays("hills").find(s => s.thorns); log("thorns sheep after its walk: " + o.state); clear(); foldAll("hills"); log("hills done " + c6Has("c6_hills")); clear(); at("hills", 6); } }, { keys: ["ArrowLeft"], n: 90 },
  { n: 1, fn() { log("room " + region.room.id + " night " + !!c6.night + " c6Night " + c6Night() + " script " + region.script.length + " trans " + !!region.trans); } }, { keys: [], n: 10 }];
for (let i = 0; i < 3; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 });
steps.push({ n: 1, fn() { clear(); at("fields", 20); david.facing = 1; } }, { keys: [], n: 240, snap: true }, { n: 1, fn() { log("night t " + c6.night.t.toFixed(1) + " wolves " + c6.hunters.filter(h => h.night).map(h => h.state).join(",") + " home " + c6Home("fields")); } },
  // morning: every lamb back in (any scattered ones too)
  { n: 1, fn() { c6.night.t = C6.NIGHT.LEN + 1; for (const h of c6.hunters) if (h.night) h.state = "gone"; foldAll("fields"); } }, { keys: [], n: 10 });
for (let i = 0; i < 3; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 30 });
steps.push({ n: 1, fn() { log("night done " + c6Has("c6_night") + " night " + !!c6.night); clear(); at("fields", 3); } }, { keys: ["ArrowLeft"], n: 70 }, { n: 1, fn() { log("room " + region.room.id + " script " + region.script.length); } });
for (let i = 0; i < 4; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40 });
steps.push({ keys: [], n: 10, snap: true }, { n: 1, fn() { log("in the cutaway: room " + region.room.id + " cut " + c6.cut); } });
for (let i = 0; i < 3; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40 });
steps.push({ keys: [], n: 10, snap: true });
for (let i = 0; i < 6; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40 });
steps.push({ n: 1, fn() { log("after: room " + region.room.id + " insult " + c6Has("c6_insult")); } }, { keys: [], n: 10, snap: true });
testRun(steps);
