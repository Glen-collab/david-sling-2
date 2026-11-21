// (11-21) after the story, Carmel walks through (hills > shearing > stores > road > valley); the road's scorpions and eagles
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) dialog.t = 0; };
const run = (n, keys = []) => ({ keys, n, fn() { skip(); } });
const at = (id, k) => { const r = roomById(id); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const sc = i => c7.scorps[i];
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^c[67]_/.test(k)); region.save.taken.push("c6_intro", "c6_fields", "c6_hills", "c6_night", "c6_insult", "c7_begin", "c6_meeting", "c6_end"); region.script.length = 0; region.wait = 0; dialog.t = 0;
  const r = roomById("hills"); at("hills", r.w - 3); } }, run(50, ["ArrowRight"]), run(80)];
steps.push({ n: 1, fn() { log("hills right -> " + region.room.id); const r = roomById("shearing"); at("shearing", r.w - 3); } }, run(50, ["ArrowRight"]), run(80));
steps.push({ n: 1, fn() { log("shearing right -> " + region.room.id); const r = roomById("stores"); at("stores", r.w - 3); } }, run(50, ["ArrowRight"]), run(80));
steps.push({ n: 1, fn() { log("stores right -> " + region.room.id + " scorps " + c7.scorps.length); const r = roomById("road"); at("road", r.w - 3); } }, run(50, ["ArrowRight"]), run(80));
steps.push({ n: 1, fn() { log("road right -> " + region.room.id); at("road", 23); } }, run(300), { keys: [], n: 2, snap: true });
// squash one: drop on it from above
steps.push({ n: 1, fn() { david.x = sc(0).x; david.y = GR * T - 160; david.vy = 300; david.onGround = false; } }, run(30),
  { n: 1, fn() { log("dropped on scorpion: dead " + sc(0).dead); } });
// stung: stand on the next one
steps.push({ n: 1, fn() { david.inv = 0; at("road", 40); } }, run(20), { n: 1, fn() { const h = david.hearts; david.inv = 0; david.x = sc(1).x; david.y = GR * T; window.H0 = h; } }, run(4),
  { n: 1, fn() { log("stung: hearts " + H0 + " -> " + david.hearts + " slowT " + c7.slowT.toFixed(2) + " walk " + TUNE.WALK_SPEED); } }, { keys: [], n: 2, snap: true });
// the eagle on its ledge
steps.push({ n: 1, fn() { david.inv = 0; at("road", 46); } }, run(120), { keys: [], n: 2, snap: true }, { keys: ["ArrowRight"], n: 40 }, { keys: [], n: 2, snap: true });
// on the donkey (during the story)
steps.push({ n: 1, fn() { region.save.taken = region.save.taken.filter(k => k !== "c6_end" && k !== "c6_meeting"); david.inv = 0; at("road", 68); c7.on = true; c7.ride = true; } }, run(60), { keys: [], n: 2, snap: true },
  { n: 1, fn() { log("riding: on " + c7.on + " ride " + c7.ride + " walk " + TUNE.WALK_SPEED); } });
testRun(steps);
