// (Glen 11-07) Naioth's scroll shelves: only in clear spots (no walkway braces or ladders through them)
startSetup = () => {}; setup.active = false;
const skipH = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const sh = () => region.props.filter(p => p.n === "hall_scrolls");
const waitH = n => Array.from({ length: n }, () => ({ keys: [], n: 10, fn: skipH }));
testRun([{ n: 3, fn() { moveParty((roomById("naioth").c0 + 18) * T, GR * T); snapCamera(); } }, ...waitH(30), { n: 1, fn() { TEST_ERRORS.push("INFO shelves " + sh().map(p => Math.round(p.x / T - roomById("naioth").c0) + "@" + Math.round(GR * T - p.y)).join(" ")); } }, { keys: [], n: 1, snap: true },
  { n: 3, fn() { moveParty((roomById("naioth").c0 + 38) * T, GR * T); snapCamera(); } }, ...waitH(20), { keys: [], n: 1, snap: true }]);
