// (Glen 11-11) the holy bread as five loaves: the HUD count, and a hit that would finish him eats one instead
if (location.hash !== "#9-7") throw new Error("not in World 3");
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([
  { n: 3, fn() { breadSet(BREAD_GIVEN); const r = roomById("nob"); moveParty((r.c0 + 10) * T, GR * T); snapCamera(); log("loaves " + breadCount()); } },
  { n: 2, fn() { david.inv = 0; david.hearts = 1; const lives = david.lives; hurtDavid(david.x + 50); log("after hit: hearts " + david.hearts + "/" + david.maxHearts + " lives " + david.lives + "/" + lives + " dead " + david.deadT + " loaves " + breadCount()); } },
  { keys: [], n: 20, snap: true, fn() { log("screen x " + Math.round(david.x - camX) + " y " + Math.round(david.y - david.h) + " camY " + camY + " pop " + breadPop.toFixed(2)); } },
  { n: 2, fn() { breadSet(0); david.inv = 0; david.hearts = 1; hurtDavid(david.x + 50); log("no bread: dead " + (david.deadT > 0)); } },
]);
