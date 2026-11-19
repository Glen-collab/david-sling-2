// (11-19) the hornet by the Spring's falls is drawn in front of them
startSetup = () => {}; setup.active = false;
const steps = [
  { n: 1, fn() { region.crawl = null; dialog.t = 0; region.script.length = 0; const r = roomById("spring"); moveParty((r.c0 + 68) * T, GR * T); snapCamera();
    const h = region.beasts.find(b => b.kind === "hornet" && b.room === "spring"); if (h) { h.x = g5.falls; h.hx = h.x; h.y = h.hy = 520; } } },
  { keys: [], n: 3, snap: true },
];
testRun(steps);
