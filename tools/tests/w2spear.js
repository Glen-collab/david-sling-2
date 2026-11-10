startSetup = () => {}; setup.active = false; region.save.jAt = 9;
if (typeof region !== "undefined") { region.save.taken = region.save.taken.filter(k => !/^r2_/.test(k)); for (const k of ["r2_window","r2_samuel","r2_naioth","r2_ezel"]) region.save.taken.push(k); }
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } };
let jumped = false;
testRun([
  { n: 3, fn() { const r = roomById("feast"); moveParty((r.c0 + 7) * T, GR * T); snapCamera(); } },
  ...Array.from({ length: 30 }, () => ({ keys: [], n: 5, fn() { skip(); } })),
  ...Array.from({ length: 50 }, () => ({ keys: [], n: 2, fn() { skip(); const sp = r2.spear; if (sp) log(`sp ${Math.round(sp.x - david.x)} hit ${!!sp.hit} dy ${Math.round(david.y)} gr ${david.onGround} ph ${r2.feast.phase}`); if (sp && sp.x - david.x < 200 && david.onGround && !jumped) { jumped = true; david.vy = -TUNE.JUMP_SPEED; david.onGround = false; setState("jump"); } } })),
]);
