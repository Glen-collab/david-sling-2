// (11-20) bitten while carrying: he drops the lamb
startSetup = () => {}; setup.active = false;
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; region.crawl = null; };
const log = m => TEST_ERRORS.push("INFO " + m);
let h, s;
testRun([{ n: 1, fn() { clear(); region.save.taken = region.save.taken.filter(k => !/^c6_/.test(k) || k === "c6_intro");
    h = c6.hunters.find(o => o.room === "fields" && o.kind === "jackal"); Object.assign(h, { state: "prowl", alpha: 1, x: h.hx, cool: 99, atkCool: 99 });
    s = c6RoomStrays("fields").find(o => Math.abs(o.y - FOOT) < 10); moveParty(s.x + 30, GR * T); snapCamera(); david.facing = -1; david.hearts = david.maxHearts; } },
  { n: 1, fn() { s.state = "carried"; c6.carry = s; david.carrying = true; lamb.carried = true; setState("carry"); } }, { keys: [], n: 5 },
  { n: 1, fn() { log("carrying " + !!david.carrying + " c6.carry " + !!c6.carry + " hearts " + david.hearts); david.x = h.x - 200; david.facing = 1; h.atkCool = 0; c6.inT = 99; david.inv = 0; } },
  { keys: [], n: 40, fn() { clear(); } }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { log("after bite: carrying " + !!david.carrying + " c6.carry " + !!c6.carry + " lamb " + s.state + " hearts " + david.hearts); } }]);
