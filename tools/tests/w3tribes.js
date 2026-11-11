// (Glen 11-11) the Hall of the Tribes: a wrong tablet drops him back to the door (no heart); the right ones, in the
// order of Jacob's blessing (Genesis 49), light up; all twelve: r3_tribes, the truth and the pomegranate show
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
region.save.taken = region.save.taken.filter(k => k !== "r3_tribes");
const log = m => TEST_ERRORS.push("INFO " + m);
const tile = n => r3.trial.tiles.find(t => t.name === n);
const onto = n => ({ n: 25, fn() { const t = tile(n); moveParty((t.x0 + t.x1) / 2, GR * T); snapCamera(); } });
testRun([
  { n: 3, fn() { r3.trial.next = 0; r3.trial.tiles.forEach(t => t.lit = false); const r = roomById("tribes"); moveParty((r.c0 + 6) * T, GR * T); snapCamera(); } },
  { keys: [], n: 30, snap: true, fn() { log("in " + region.room.id + " next " + r3.trial.next); } },
  onto("judah"), { keys: [], n: 8, snap: true, fn() { log("judah (wrong): crack " + tile("judah").crack.toFixed(2) + " open " + tile("judah").open); } },
  { keys: [], n: 60, snap: true, fn() { log("after fall: x " + Math.round(david.x - roomById("tribes").c0 * T) + " hearts " + david.hearts + " judah open " + tile("judah").open); } },
  ...["reuben", "simeon", "levi", "judah", "zebulun", "issachar"].map(onto),
  { keys: [], n: 10, snap: true, fn() { log("six: next " + r3.trial.next + " lit " + r3.trial.tiles.filter(t => t.lit).map(t => t.name).join(",")); } },
  ...["dan", "gad", "asher", "naphtali", "joseph", "benjamin"].map(onto),
  { keys: [], n: 10, fn() { log("all: next " + r3.trial.next + " taken " + r3Has("r3_tribes")); const r = roomById("tribes"); moveParty((r.c0 + r.w - 14) * T, GR * T); snapCamera(); } },
  { keys: [], n: 20, snap: true },
]);
