// (Glen 11-07) a little hop onto a terrace wall or low wall: he stands on the stones' top, never down in the top row
startSetup = () => {}; setup.active = false;
const skipW = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; for (const w of r2.wolves) w.dead = true; };
const tops = () => region.tops.filter(t => roomAt(t.x0) && roomAt(t.x0).id === "road");
const res = [];
const tryAt = (i, h) => [{ n: 2, fn() { skipW(); const t = tops()[i]; moveParty(t.x0 + 60, t.low); david.vy = 0; david.onGround = true; snapCamera(); } },
  { keys: [], n: 20, fn: skipW }, { keys: [], n: 1, fn() { const t = tops()[i]; res.push(i + ":" + Math.round(t.top - david.y)); } }];
testRun([{ keys: [], n: 30, fn: skipW }, { n: 1, fn() { TEST_ERRORS.push("INFO walls " + tops().map(t => Math.round(t.low - t.top)).join(",")); } },
  ...tryAt(0), ...tryAt(1), ...tryAt(2), ...tryAt(3),
  { n: 1, snap: true, fn() { TEST_ERRORS.push("INFO stood (0 = on the stones' top) " + res.join(" ")); } }]);
