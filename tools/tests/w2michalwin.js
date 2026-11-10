// (Glen 11-09) Michal in the window over the palace wall, letting the rope down, while David climbs down below her
if (location.hash !== "#9-6") throw new Error("not in Ramah");
startSetup = () => {}; setup.active = false; R2.SIGHT = R2.SIGHT_LOW = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
testRun([
  { n: 3, fn() { for (const r of REGION.rooms) regionAdd("explored", r.id); region.save.taken = region.save.taken.filter(k => !/^r2_/.test(k)); regionAdd("taken", "r2_window");
      const P = r2.palaceStart; regionGo(P.x, 1, () => { david.y = P.y; david.vy = 0; region.camFootY = P.y; snapCamera(); if (P.land) P.land(); }); } },
  ...Array.from({ length: 10 }, () => ({ keys: [], n: 10, fn: skip })),
  { keys: [], n: 1, snap: true, fn() { log("props with draw " + region.props.filter(p => p.draw).length + " wins " + JSON.stringify(region.props.filter(p => p.room === "palace" && /win/.test(p.n)).map(p => [p.n, !!p.draw]))  + " room " + region.room.id + " mwT " + r2.mwT.toFixed(1) + " img " + SPR.michal_window.img.naturalWidth + " ms " + SPR.michal_window.ms + " w " + SPR.michal_window.w + " h " + SPR.michal_window.h + " drawRet " + region.props.find(p => p.draw).draw(region.props.find(p => p.draw), camX)); } },
  ...Array.from({ length: 50 }, () => ({ keys: [], n: 10, fn: skip })),
  { keys: [], n: 1, snap: true, fn() { log("held on rope: mwT " + r2.mwT.toFixed(1) + " state " + david.state); } },
  ...Array.from({ length: 30 }, () => ({ keys: ["ArrowDown"], n: 10, fn: skip })),
  { keys: [], n: 1, fn() { log("down: state " + david.state + " mwT " + r2.mwT.toFixed(1)); } },
  ...Array.from({ length: 12 }, () => ({ keys: [], n: 10, fn: skip })),
  { keys: [], n: 1, snap: true, fn() { log("going in: mwT " + r2.mwT.toFixed(1)); } },
  ...Array.from({ length: 40 }, () => ({ keys: [], n: 10, fn: skip })),
  { keys: [], n: 1, snap: true, fn() { log("gone: mwT " + r2.mwT.toFixed(1)); } },
]);
