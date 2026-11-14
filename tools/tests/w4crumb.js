// (Glen 11-14) the pit's walls level with the crumbling slabs over it: the Mouth's c+64
startSetup = () => {}; setup.active = false;
const at = (rm, k) => { const r = roomById(rm); david.hp = 52; moveParty((r.c0 + k) * T, GR * T); snapCamera(); };
testRun([
  { n: 1, fn() { at("mouth", 60); } }, { keys: [], n: 60 }, { n: 1, fn() { at("mouth", 60); toastTime = 0; } }, { keys: [], n: 400, fn() { TEST_ERRORS.push("INFO " + JSON.stringify(region.crumbles.filter(k => k.room === "mouth")) + " img " + !!kitImg("p_crumble") + " GR*T " + GR * T + " camY " + camY + " T " + T + " camX " + camX + " dx " + david.x); } }, { keys: [], n: 1, snap: true },
]);
