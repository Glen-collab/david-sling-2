// (11-19) the Spring's hyraxes: in the open past the rubble, and seen running off before they fade
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const hx = () => region.beasts.filter(b => b.kind === "hyrax" && b.room === "spring").map(b => b.state + "@" + Math.round(b.x / T - roomById("spring").c0) + " sx" + Math.round(b.x - camX) + " y" + Math.round(b.y) + " foot" + FOOT + " dead" + !!b.dead + " a" + (b.alpha ?? 1).toFixed(2)).join(", ");
testRun([{ n: 1, fn() { region.crawl = null; g5.crawl = null; dialog.t = 0; region.script.length = 0; g5.guards.length = 0; const r = roomById("spring"); moveParty((r.c0 + 92) * T, GR * T); snapCamera(); } }, { keys: [], n: 40, snap: true },
  { n: 1, fn() { log("start: " + hx()); } }, { keys: ["ArrowRight"], n: 40 }, { keys: [], n: 1, snap: true }, { n: 1, fn() { log("near: " + hx()); } },
  { keys: [], n: 25, snap: true }, { n: 1, fn() { log("running: " + hx()); } }, { keys: [], n: 60 }, { n: 1, fn() { log("later: " + hx()); } }]);
