// (11-20) Carmel first pass: the camp, the fields, a lamb carried home, a jackal driven off
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const at = (rm, k) => { const r = roomById(rm); moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
const st = w => ({ n: 1, fn() { log(w + ": room " + region.room.id + " state " + david.state + " carrying " + david.carrying + " carry " + (c6.carry && c6.carry.id) + " home " + c6Home("fields") + "/" + c6RoomStrays("fields").length + " hunters " + c6.hunters.filter(h => h.room === region.room.id).map(h => h.kind + ":" + h.state + "@" + Math.round(h.x / T - region.room.c0)).join(",")); } });
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30, snap: true }, st("camp"),
  { n: 1, fn() { clear(); at("fields", 28); } }, { keys: [], n: 20, snap: true }, st("fields"),
  { n: 1, fn() { clear(); const s = c6RoomStrays("fields")[0]; at("fields", (s.x / T - roomById("fields").c0) - 1); david.facing = 1; } }, { keys: [], n: 5 },
  { keys: ["ArrowDown"], n: 2 }, { keys: [], n: 50 }, st("picked"), { keys: [], n: 1, snap: true },
  { keys: ["ArrowLeft"], n: 60 }, st("walked"), { keys: [], n: 10 }, { keys: ["ArrowDown"], n: 2 }, { keys: [], n: 40 }, st("set down"), { keys: [], n: 1, snap: true },
  { n: 1, fn() { clear(); at("fields", 70); } }, { keys: [], n: 120 }, st("jackals"), { keys: [], n: 1, snap: true }]);
