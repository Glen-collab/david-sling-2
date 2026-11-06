// (Glen 11-06) the Philistines and walls: the boulder they hop; the watchtower stops them (they pace behind it)
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const c0 = roomById("fields").c0, P = region.beasts.filter(b => b.kind === "phil" && b.room === "fields");
const put = c => { david.x = (c0 + c) * T; david.y = GR * T; david.vx = 0; david.vy = 0; david.hearts = david.maxHearts; };
const show = tag => log(tag + ": " + P.map(b => `${b.state} c${(b.x / T - c0).toFixed(1)} up${Math.round((b.hy - b.y) / T * 10) / 10}`).join("  /  "));
testRun([
  { keys: [], n: 5, fn() { put(62); } },
  ...Array.from({ length: 6 }, () => ({ keys: [], n: 8, fn() { put(62); show("David between tower and boulder"); } })),
  { keys: [], n: 2, snap: true },
  { keys: [], n: 2, fn() { put(49); Object.assign(P[0], { x: (c0 + 62) * T, y: P[0].hy, state: "run", air: false, vy: 0, t: 0 }); } },
  ...Array.from({ length: 8 }, () => ({ keys: [], n: 12, fn() { put(49); show("David left of the tower"); } })),
  { keys: [], n: 2, snap: true },
  ...Array.from({ length: 6 }, () => ({ keys: [], n: 30, fn() { put(30); show("David gone: back to his post"); } })),
]);
