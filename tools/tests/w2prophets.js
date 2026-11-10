// (Glen 11-10) the prophets at Naioth: prophet_old, prophet_lyre, prophet_drum around Samuel
if (location.hash !== "#9-6") throw new Error("not in Ramah");
startSetup = () => {}; setup.active = false; R2.SIGHT = R2.SIGHT_LOW = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([
  { n: 3, fn() { region.save.taken = region.save.taken.filter(k => !/^r2_/.test(k)); for (const k of ["r2_window","r2_samuel","r2_naioth"]) regionAdd("taken", k); const r = roomById("naioth"); david.x = r2.samNX - 200; david.y = GR * T; region.room = r; } },
  ...Array.from({ length: 12 }, () => ({ keys: [], n: 10, fn() { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } } })),
  { keys: [], n: 1, snap: true, fn() { log("room " + (region.room && region.room.id) + " imgs " + ["prophet_old","prophet_lyre","prophet_drum"].map(n => SPR[n].img.naturalWidth).join(",") + " camX-sam " + Math.round(camX - r2.samNX)); } },
]);
