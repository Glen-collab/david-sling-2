// (Glen 11-07) Jonathan ducks Saul's spear at the feast (Down): his duck frames, and the spear goes over
startSetup = () => {}; setup.active = false;
const skipD = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } };
testRun([{ n: 3, fn() { moveParty((roomById("feast").c0 + 20) * T, GR * T); snapCamera(); } }, ...Array.from({ length: 30 }, () => ({ keys: [], n: 10, fn: skipD })),
  { n: 1, fn() { david.facing = 1; r2.spear = { x: david.x + 260, y: GR * T - R2.SPEAR.Y }; r2.feast = r2.feast || { phase: "fly", t: 0 }; r2.feast.phase = "fly"; } },
  { keys: ["ArrowDown"], n: 14, snap: true, fn() { TEST_ERRORS.push("INFO h " + david.h + " duckT " + (r2.duckT || 0).toFixed(2)); } },
  { keys: ["ArrowDown"], n: 30, fn() { TEST_ERRORS.push("INFO spear hit " + !!(r2.spear && r2.spear.hit) + " hearts " + david.hearts); } }]);
