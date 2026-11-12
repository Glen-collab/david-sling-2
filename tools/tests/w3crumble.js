// (Glen 11-11) a wrong tablet: he can't jump off it, it breaks in pieces and he goes down with it; all twelve: the key
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
region.save.taken = region.save.taken.filter(k => !["r3_tribes", "r3_hall_key"].includes(k));
const log = m => TEST_ERRORS.push("INFO " + m);
const tile = n => r3.trial.tiles.find(t => t.name === n);
const onto = n => ({ n: 25, fn() { const t = tile(n); moveParty((t.x0 + t.x1) / 2, GR * T); snapCamera(); } });
testRun([
  { n: 3, fn() { r3.trial.next = 0; r3.trial.tiles.forEach(t => t.lit = false); const r = roomById("tribes"); moveParty((r.c0 + 6) * T, GR * T); snapCamera(); } },
  { keys: [], n: 20 },
  { n: 2, fn() { const t = tile("judah"); moveParty((t.x0 + t.x1) / 2 + 20, GR * T); snapCamera(); } },
  { keys: [], n: 2 },
  { keys: ["KeyZ", "ArrowRight"], n: 16, snap: true, fn() { log("pressing jump on judah: y " + Math.round(david.y - GR * T) + " open " + tile("judah").open); } },
  { keys: [], n: 6, snap: true, fn() { log("falling: y " + Math.round(david.y - GR * T)); } },
  { keys: [], n: 60, fn() { log("after: x " + Math.round(david.x - roomById("tribes").c0 * T) + " judah open " + tile("judah").open + " wait " + region.wait.toFixed(2)); } },
  ...["reuben", "simeon", "levi", "judah", "zebulun", "issachar", "dan", "gad", "asher", "naphtali", "joseph", "benjamin"].map(onto),
  { keys: [], n: 10, fn() { log("all: " + r3Has("r3_tribes")); const r = roomById("tribes"); moveParty((r.c0 + r.w - 7) * T, GR * T); snapCamera(); } },
  { keys: ["ArrowRight"], n: 70, fn() { log("x " + Math.round(david.x/T - roomById("tribes").c0) + " wait " + region.wait + " script " + region.script.length + " dialog " + (dialog && dialog.t) + " state " + david.state); } },
  { keys: [], n: 40, snap: true, fn() { log("key " + r3Has("r3_hall_key")); } },
]);
