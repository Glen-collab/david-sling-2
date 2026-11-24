// (11-24) Hebron, first build: every beat. The cut scene at Ziklag (the messenger, the lament, "Shall I go up?"), the
// road with the families, Hebron (Judah), the pool of Gibeon, the chase as Asahel (the warnings, the end), Abner's grave,
// the tribes and the table, the gate (all Israel) and the last Journal page
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) dialog.t = 0; };
const run = (n, keys = []) => ({ keys, n, fn: skip });
const at = (id, k, y = GR * T) => { const r = roomById(id); moveParty((r.c0 + k) * T, y); snapCamera(); };
const where = () => (region.room ? region.room.id : "?") + " col " + (david.x / T - (region.room ? region.room.c0 : 0)).toFixed(1);
const until = test => ({ n: 1, fn() { let i = 0; while (region.script.length && !test() && i++ < 80) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; region.wait = 0; } });
const drain = () => until(() => false);
const snap = { keys: [], n: 2, snap: true };
const jDone = [{ keys: [], n: 3 }, { n: 1, fn() { if (region.jscene) region.jscene.t = region.jscene.done + 0.1; } }, { keys: [], n: 3 }, snap,
  { n: 1, fn() { log("journal " + (region.jscene ? "page " + (region.jscene.view + 1) + " of " + region.jscene.pages.length : "none")); region.jscene = null; } }];
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); region.save.jSp = []; region.script.length = 0; hb.cine = hb.lament = hb.weep = null; hb.harp = hb.kneel = false; } }, snap];
// 1 Ziklag
steps.push({ n: 1, fn() { at("ziklag", 5); } }, { keys: [], n: 30 }, snap, { n: 1, fn() { log("cine " + !!hb.cine + " " + where()); } },
  until(() => hb.msgOn), { keys: [], n: 50 }, until(() => hb.weep), { keys: [], n: 4 }, snap,
  until(() => hb.lament && hb.lament.i >= 3), { keys: [], n: 30 }, snap,
  until(() => region.jscene), ...jDone, until(() => hb.abiathar.spr === "abiathar_ephod"), { keys: [], n: 3 }, snap, drain(),
  { n: 1, fn() { log("ask " + hbHas("hb_ask") + " right " + roomById("ziklag").right); } });
// 2 the road
steps.push({ n: 1, fn() { at("road", 6); } }, run(10), drain(), { keys: ["ArrowRight"], n: 60 }, { keys: [], n: 20 }, snap,
  { n: 1, fn() { log("followers " + hb.follow.map(f => Math.round((f.x - david.x) / T)).join(",") + " on " + hb.followOn); } });
// 3 Hebron
steps.push({ n: 1, fn() { at("hebron", 34); } }, run(5), { keys: ["ArrowRight"], n: 25 }, { n: 1, fn() { log("judah script " + region.script.length); } },
  until(() => hb.kneel), { keys: [], n: 20 }, snap, until(() => region.jscene), ...jDone, drain(), { keys: [], n: 90 },
  { n: 1, fn() { log("after Judah: " + where() + " judah " + hbHas("hb_judah")); } }, { keys: [], n: 20 }, snap);
// 4 Gibeon
steps.push(until(() => /Joab/.test(JSON.stringify(region.script[0] || {}))), { keys: [], n: 3 }, snap, drain(), { n: 1, fn() { log("pool " + hbHas("hb_pool") + " asahel " + hbAsahel() + " run " + TUNE.RUN_SPEED); } });
// 5 the chase
steps.push({ n: 1, fn() { at("chase", 8); } }, run(5), { keys: ["ArrowRight"], n: 40 }, snap, { n: 1, fn() { log("chase: " + where() + " abner col " + (hb.abner.x / T - roomById("chase").c0).toFixed(1)); } },
  { n: 1, fn() { hb.abner.x = hbRoomX("chase", 62); at("chase", 52); } }, { keys: [], n: 3 }, { n: 1, fn() { log("warn script " + region.script.length + " warned " + hb.abner.warned); } }, { keys: [], n: 2 }, snap, drain(),
  { n: 1, fn() { hb.abner.x = hbRoomX("chase", 112); at("chase", 104); } }, { keys: [], n: 3 }, drain(),
  { n: 1, fn() { hb.abner.x = hbRoomX("chase", 158); at("chase", 153); } }, { keys: [], n: 3 }, { n: 1, fn() { log("end st " + hb.abner.st + " script " + region.script.length); } },
  until(() => hb.dark), { keys: [], n: 3 }, snap, until(() => hb.dark && (performance.now() / 1000 - hb.dark.at) > 0), { keys: [], n: 60 }, snap, drain(), { keys: [], n: 90 },
  { n: 1, fn() { log("after the chase: " + where() + " chase " + hbHas("hb_chase") + " run " + TUNE.RUN_SPEED); } });
// 6 Abner's grave
steps.push(until(() => hb.weep), { keys: [], n: 40 }, snap, until(() => region.jscene), ...jDone, drain(), { keys: [], n: 90 }, { n: 1, fn() { log("after the grave: " + where()); } });
// 7 the feast: welcome each tribe, carry its food to the table
steps.push(drain(), { keys: [], n: 3 }, snap);
for (let i = 0; i < 12; i++) steps.push(
  { n: 1, fn() { const t = hb.tribes[i]; t.x = t.slot; t.st = "here"; moveParty(t.x - 40, GR * T); } }, { keys: [], n: 2 }, { keys: ["ArrowUp"], n: 1 }, { keys: [], n: 2 },
  { n: 1, fn() { const f = hb.foods[hb.foods.length - 1]; if (f) moveParty(f.x, GR * T); } }, { keys: [], n: 4 },
  { n: 1, fn() { at("feast", 15); } }, { keys: [], n: 2 }, { keys: ["ArrowUp"], n: 1 }, { keys: [], n: 2 },
  ...(i === 3 ? [{ n: 1, fn() { const t = hb.tribes[4]; t.x = t.slot + 200; t.st = "come"; const u = hb.tribes[5]; u.x = u.slot; u.st = "here"; at("feast", 60); } }, { keys: [], n: 3 }, snap] : []));
steps.push({ n: 1, fn() { log("table " + hb.table.length + " welcomed " + hb.tribes.filter(t => t.st === "leave" || t.st === "home").length + " script " + region.script.length); } },
  until(() => region.jscene), ...jDone, drain(), { n: 1, fn() { log("feasted " + hbHas("hb_feasted") + " right " + roomById("feast").right); } });
// 8 the gate
steps.push({ n: 1, fn() { at("gate", 16); } }, run(5), { keys: ["ArrowRight"], n: 25 }, until(() => hb.kneel), { keys: [], n: 30 }, snap,
  until(() => region.jscene), { keys: [], n: 3 }, { n: 1, fn() { if (region.jscene) region.jscene.t = region.jscene.done + 0.1; } }, { keys: [], n: 3 }, snap,
  { keys: ["ArrowLeft"], n: 1 }, { keys: [], n: 3 }, { keys: ["ArrowLeft"], n: 1 }, { keys: [], n: 3 }, snap,
  { n: 1, fn() { log("end " + hbHas("hb_end") + " journal " + (region.jscene ? "page " + (region.jscene.view + 1) + " of " + region.jscene.pages.length : "none")); region.jscene = null; } });
steps.push({ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^hb_/.test(k)); region.save.jSp = []; regionWrite(); } });   // (leave the test save as found)
testRun(steps);
