// (Glen 11-10) David peeking round the stone Ezel while he hides (david_peek, Glen's still)
if (location.hash !== "#9-6") throw new Error("not in Ramah");
startSetup = () => {}; setup.active = false; R2.SIGHT = R2.SIGHT_LOW = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
testRun([
  { n: 3, fn() { region.save.taken = region.save.taken.filter(k => !/^r2_/.test(k)); for (const r of REGION.rooms) regionAdd("explored", r.id); for (const k of ["r2_window","r2_samuel","r2_naioth","r2_ezel","r2_feast","r2_gateshut"]) regionAdd("taken", k); r2ArrowsStart(); } },
  ...Array.from({ length: 30 }, () => ({ keys: [], n: 10, fn: skip })),
  { keys: [], n: 1, snap: true, fn() { log("pose " + JSON.stringify(region.pose) + " img " + SPR.david_peek.img.naturalWidth + " camX-ezel " + Math.round(camX - r2.ezelX)); } },
]);
