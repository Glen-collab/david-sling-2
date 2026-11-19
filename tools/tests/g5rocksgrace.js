// (11-19) the Rocks: the ravens wait a moment after he comes in, and the ibex gives him a second after he's up the cliff
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const rv = () => region.beasts.filter(b => b.room === "rocks" && b.kind === "raven").map(b => b.state + " c" + b.cool.toFixed(1)).join(", ");
const ib = () => { const b = region.beasts.find(b => b.room === "rocks" && b.kind === "ibex"); return b.state + " c" + b.cool.toFixed(1) + " x" + Math.round(b.x / T - roomById("rocks").c0); };
const st = w => ({ n: 1, fn() { log(w + ": ravens " + rv() + " | ibex " + ib() + " | david " + david.state + " climb " + (region.climb && region.climb.kind) + " hearts " + david.hearts + " inv " + david.inv.toFixed(2)); } });
testRun([{ n: 1, fn() { region.crawl = null; g5.crawl = null; dialog.t = 0; region.script.length = 0; g5.guards.length = 0; learnSkill("wallClimb"); const r = roomById("spring"); moveParty((r.c0 + 60) * T, GR * T); snapCamera(); } }, { keys: [], n: 20 },
  { n: 1, fn() { dialog.t = 0; regionGo((roomById("rocks").c0 + 6) * T, 1); } }, { keys: [], n: 40 }, st("just in"), { keys: [], n: 1, snap: true }, { keys: [], n: 40 }, st("1.3s in"), { keys: [], n: 60 }, st("2.3s+ in"), { keys: [], n: 60 }, st("later"),
  { n: 1, fn() { dialog.t = 0; region.script.length = 0; for (const b of region.beasts) if (b.kind === "raven") b.gone = b.dead = true; david.hearts = david.maxHearts; david.inv = 0; moveParty((roomById("rocks").c0 + 11) * T + 20, GR * T); david.facing = 1; } }, { keys: [], n: 10 },
  { keys: ["ArrowRight", "ArrowUp"], n: 4 }, { keys: ["ArrowUp"], n: 30 }, st("climbing"), { keys: ["ArrowUp"], n: 30 }, st("climbing 2"), { keys: ["ArrowUp"], n: 30 }, st("climbing 3"), { keys: ["ArrowUp"], n: 30 }, st("climbing 4"), { keys: ["ArrowUp"], n: 30, snap: true }, st("climbing 5"),
  { keys: [], n: 10 }, st("top +0.2"), { keys: [], n: 20, snap: true }, st("top +0.6"), { keys: [], n: 40 }, st("top +1.4"), { keys: [], n: 40, snap: true }, st("top +2.2")]);
