// (11-23) Hachilah's own pit edges (assets/rooms/w7/kit/h7_pit_*.png), the Hill of Hachilah's first gap, by day (after)
startSetup = () => {}; setup.active = false; helpT = 0;
const at = (id, k, y = GR * T) => { const r = roomById(id); moveParty((r.c0 + k) * T, y); snapCamera(); };
const steps = [{ n: 1, fn() { if (!region.save.taken.includes("h7_end")) region.save.taken.push("h7_end"); region.script.length = 0; at("hill", 24); } },
  { keys: [], n: 40, fn() { dialog.t = 0; } }, { keys: [], n: 2, snap: true }];
testRun(steps);
