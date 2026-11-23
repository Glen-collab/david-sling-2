// (11-23) land on a sleeper in the wagons: he shoves David off, the men round him stir
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const at = (id, k, y = GR * T) => { const r = roomById(id); moveParty((r.c0 + k) * T, y); snapCamera(); };
const steps = [{ n: 1, fn() { region.save.taken = region.save.taken.filter(k => !/^h7_/.test(k) || k === "h7_start" || k === "h7_camp"); region.script.length = 0; at("wagons", 3); } }, { keys: [], n: 30 },
  { n: 1, fn() { const s = h7.sleepers.find(o => o.room === "wagons"); window._s = s; log("room " + region.room.id + " sleeper x0 " + Math.round(s.x0 + s.off) + " hearts " + david.hearts); moveParty(s.x0 + s.off + 70, GR * T - 140); } }];
for (let i = 0; i < 30; i++) steps.push({ keys: [], n: 1, fn() { if (i % 3 === 0 || david.onGround) log(i + ": y " + Math.round(david.y) + " ground " + david.onGround + " air " + h7.air + " x-x0 " + Math.round(david.x - window._s.x0 - window._s.off) + " inv " + david.inv.toFixed(2) + " hearts " + david.hearts + " room " + region.room.id); } });
steps.push({ keys: [], n: 2, snap: true });
testRun(steps);
