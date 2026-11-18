// (11-18) En-Gedi: the provisions loop, the drop, the pack after being seen, the delivery, and the end
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (rm, k, y = GR * T) => { const r = roomById(rm); moveParty((r.c0 + k) * T, y); snapCamera(); };
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const quiet = () => { region.beasts.length = 0; if (typeof critters !== "undefined") critters.length = 0; };
const takeAll = rm => { for (const f of g5RoomFood(rm)) { david.x = f.x; david.y = f.y; g5Update(1 / 60, roomById(f.room)); } };
const steps = [
  { n: 1, fn() { region.crawl = null; region.save.taken = region.save.taken.filter(k => !/^g5_(f_|load|cut|called)/.test(k) && k !== "g_exit_open"); g5.pack.length = 0; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); quiet(); at("spring", 20); } }, { keys: [], n: 10 },
  { n: 1, fn() { clear(); takeAll("spring"); log("pack after spring: " + g5.pack.length); david.hearts -= 5; } }, { keys: [], n: 4 },
  { n: 1, fn() { log("pack after a hit: " + g5.pack.length + ", drops " + g5.drops.length); } }, { keys: [], n: 40 },
  { n: 1, fn() { const o = g5.drops[0]; if (o) { david.x = o.x; david.y = o.floor; } } }, { keys: [], n: 4 },
  { n: 1, fn() { log("pack after grabbing it back: " + g5.pack.length); } },
  // seen: keeps the pack
  { n: 1, fn() { g5.caughtTo = david.x; g5.caughtT = G5.SNEAK.CAUGHT_FADE; } }, { keys: [], n: 100 },
  { n: 1, fn() { log("pack after being seen: " + g5.pack.length); } },
  // the way on is shut: walk off the Spring's right end
  { n: 1, fn() { clear(); at("spring", 126); } }, { keys: ["ArrowRight"], n: 40 },
  { n: 1, fn() { log("room trying to leave the Spring loaded: " + region.room.id); clear(); } },
  // home
  { n: 1, fn() { clear(); at("camp", 36); } }, { keys: ["ArrowLeft"], n: 70 },
  { keys: [], n: 10, snap: true }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 20 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 20 },
  { n: 1, fn() { clear(); g5.pose = null; log("stage after the spring load: " + g5Stage() + ", open rocks " + g5Open("rocks")); } },
  // death empties the pack
  { n: 1, fn() { at("rocks", 10); clear(); takeAll("rocks"); log("pack in the rocks: " + g5.pack.length); david.deadT = 1; } }, { keys: [], n: 2 },
  { n: 1, fn() { log("pack after dying: " + g5.pack.length); david.deadT = 0; david.hearts = david.maxHearts; } }, { keys: [], n: 20 },
  { n: 1, fn() { clear(); quiet(); at("rocks", 10); takeAll("rocks"); takeAll("wild"); log("pack, rocks then the wilderness (shut): " + g5.pack.length + " deadT " + david.deadT + " taken " + g5RoomFood("rocks").filter(f => g5Has(f.id)).length); at("camp", 36); } }, { keys: ["ArrowLeft"], n: 70 },
  { n: 1, fn() { clear(); g5.pose = null; quiet(); at("wild", 10); takeAll("wild"); at("camp", 36); } }, { keys: ["ArrowLeft"], n: 70 },
  { n: 1, fn() { log("stage " + g5Stage() + ", script " + region.script.length); } },
];
for (let i = 0; i < 12; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40 });
steps.push({ n: 1, fn() { log("saul: " + (g5.saul && g5.saul.mode + " " + g5.saul.step)); } }, { keys: [], n: 10, snap: true },
  // creep up behind him
  { n: 1, fn() { david.x = g5.saul.x - 70; david.facing = 1; } }, { keys: ["ArrowDown"], n: 6 }, { keys: ["ArrowDown", "KeyV"], n: 2 }, { keys: [], n: 30, snap: true });
for (let i = 0; i < 8; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 60 });
steps.push({ keys: [], n: 300 }, { n: 1, fn() { log("cut " + g5Has("g5_cut") + ", saul " + !!g5.saul); at("pens", 6); } }, { keys: [], n: 60, snap: true });
for (let i = 0; i < 14; i++) steps.push({ keys: ["KeyZ"], n: 2 }, { keys: [], n: 40 });
steps.push({ n: 1, fn() { log("called " + g5Has("g5_called") + ", exit " + g5Has("g_exit_open")); } });
testRun(steps);
