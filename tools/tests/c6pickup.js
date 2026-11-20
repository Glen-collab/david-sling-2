// (11-20) Glen's new pickup: David lifts the lamb onto his shoulders, holds it, walks with it
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; region.crawl = null; };
testRun([{ n: 1, fn() { clear(); region.save.taken = region.save.taken.filter(k => !/^c6_/.test(k) || k === "c6_intro"); const r = roomById("fields"); moveParty((r.c0 + 40) * T, GR * T); snapCamera(); } }, { keys: [], n: 10 },
  { n: 1, fn() { clear(); for (const h of c6.hunters) h.state = "gone"; const s = c6RoomStrays("fields").find(s => s.state === "stray"); s.x = david.x + 50; s.y = FOOT; s.runT = 0; david.facing = 1; } }, { keys: [], n: 5 },
  { keys: ["ArrowDown"], n: 2 }, { keys: [], n: 14, snap: true }, { keys: [], n: 40, snap: true },
  { keys: ["ArrowRight"], n: 30, snap: true }, { keys: [], n: 20 }, { keys: ["ArrowDown"], n: 2 }, { keys: [], n: 10, snap: true }]);
