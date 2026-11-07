// (Glen 11-06) World 2's story, start to finish: the window (drill), Samuel, the chase at Naioth, the stone Ezel, the
// feast (as Jonathan, jump the spear), the arrows (answer), the bow, the Journal. Logs each story flag as it lands.
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } if (drill.on) drillFinish(); };
const flags = () => ["r2_window", "r2_samuel", "r2_naioth", "r2_ezel", "r2_feast", "r2_arrows", "g_exit_open"].filter(r2Has).join(",");
const at = (id, k, y) => ({ n: 3, fn() { skip(); if (david.state === "climb") { david.ladder = null; setState("idle"); } const r = roomById(id); moveParty((r.c0 + k) * T, GR * T); if (y != null) { david.y = y; } david.hearts = david.maxHearts; snapCamera(); } });
const wait = (n, keys = []) => Array.from({ length: n }, () => ({ keys, n: 10, fn() { skip(); david.hearts = david.maxHearts; } }));
testRun([
  at("house", 30), ...wait(4, ["ArrowRight"]), ...wait(30),
  { keys: [], n: 1, snap: true, fn() { log("after window: " + flags() + " room " + region.room.id + " y " + Math.round(david.y) + " rope " + hasSkill("rope")); } },
  at("ramah", 30), ...wait(6, ["ArrowRight"]), ...wait(20),
  { keys: [], n: 1, fn() { log("after Samuel: " + flags() + " samuel " + r2.story.samuel); } },
  at("naioth", 16), ...wait(4, ["ArrowRight"]), ...wait(6),
  { keys: [], n: 1, snap: true, fn() { log("chase: " + JSON.stringify(r2.chase) + " men " + r2.men.length); } },
  // lead them to Samuel: walk right to him and wait
  ...wait(30, ["ArrowRight"]), ...wait(140),
  { keys: [], n: 1, snap: true, fn() { log("after chase: " + flags() + " men " + r2.men.map(m => m.state + "@" + Math.round(m.x / T - roomById("naioth").c0)).join(" ") + " chase " + JSON.stringify(r2.chase) + " d " + Math.round(david.x / T - roomById("naioth").c0) + "," + Math.round(david.y) + " script " + region.script.length + " saul " + (r2.saul && r2.saul.state)); } },
  at("field", 10), ...wait(4, ["ArrowRight"]), ...wait(20),
  { keys: [], n: 1, fn() { log("after Ezel talk: " + flags()); } },
  { n: 2, fn() { moveParty(r2.ezelX - 10, GR * T); } }, ...wait(8, ["ArrowDown"]), ...wait(10),
  { keys: [], n: 1, snap: true, fn() { log("feast: room " + region.room.id + " phase " + (r2.feast && r2.feast.phase)); } },
  // jump the spear: wait for it to come, then jump
  ...Array.from({ length: 60 }, () => ({ keys: [], n: 3, fn() { skip(); const sp = r2.spear; if (sp && !sp.jumped && sp.x - david.x < 200 && david.onGround) { sp.jumped = true; david.vy = -TUNE.JUMP_SPEED; david.onGround = false; setState("jump"); } } })),
  ...wait(20),
  { keys: [], n: 1, snap: true, fn() { log("after feast: " + flags() + " room " + region.room.id + " tries " + (r2.feast && r2.feast.tries)); } },
  ...wait(40),
  { keys: [], n: 1, snap: true, fn() { log("choice up: " + !!r2.choice); } },
  { keys: ["ArrowRight"], n: 2 }, { keys: [], n: 2 }, { keys: ["KeyZ"], n: 2 }, ...wait(40),
  { keys: [], n: 1, snap: true, fn() { log("end: " + flags() + " bow " + hasSkill("bow") + " jscene " + !!region.jscene); } },
]);
