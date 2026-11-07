// (Glen 11-07) his feast table and cushions, the stone Ezel, Naioth's scroll shelves
startSetup = () => {}; setup.active = false;
const skipP = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const goP = (x) => ({ n: 3, fn() { skipP(); moveParty(x(), GR * T); snapCamera(); } });
const waitP = n => Array.from({ length: n }, () => ({ keys: [], n: 10, fn: skipP }));
testRun([goP(() => (roomById("feast").c0 + 20) * T), ...waitP(40), { keys: [], n: 1, snap: true },
  goP(() => r2.ezelX - 250), ...waitP(30), { keys: [], n: 1, snap: true },
  goP(() => (roomById("naioth").c0 + 30) * T), ...waitP(30), { keys: [], n: 1, snap: true },
  { n: 3, fn() { const u = region.props.find(p => p.n === "hall_scrolls" && p.s === R2.SHELF_WALK_K); moveParty(u.x, u.y + KIT.hall_scrolls.h * u.s - 4); snapCamera(); } }, ...waitP(30), { keys: [], n: 1, snap: true }]);
