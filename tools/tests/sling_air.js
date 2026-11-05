startSetup = () => {}; setup.active = false;
const clr = () => { setup.active = false; dialog.t = 0; dialog.hold = false; };
const log = m => TEST_ERRORS.push("INFO " + m);
learnSkill("rope");
const C = id => roomById(id).c0;
const go = (id, c) => ({ n: 3, fn() { clr(); david.inv = 99; region.climb = null; david.harp = false; setState("idle"); moveParty((C(id) + c) * T + T / 2, 16 * T); snapCamera(); } });
const room = () => roomAt(david.x).id;
const check = (what, want, keys, n = 120) => [{ keys: [], n: 20, fn() { clr(); } }, { keys, n, fn() { clr(); } }, { keys: [], n: 60, fn() { clr(); log((room() === want ? "OK   " : "FAIL ") + what + " -> " + room() + " (want " + want + ")"); } }];
const RW = id => roomById(id).w;
// the sling against the creatures up in the air (the bat, a spider hanging on its thread): flat, and aimed up (diagonal)
const steps = [];
const first = k => region.beasts.findIndex(b => b.kind === k);
for (const kind of ["bat2", "spider"]) for (const dist of [100, 200, 300]) for (const aim of [[], ["ArrowUp", "ArrowRight"]]) {
  const i = first(kind);
  steps.push({ n: 2, fn() { clr(); for (const b of region.beasts) b.dead = false; const b = region.beasts[i]; b.x = b.hx; b.y = b.hy; b.t = 0; b.vx = 0; b.vy = 0; b.state = kind === "bat2" ? "sleep" : "hang";
      david.x = b.x - dist; david.y = GR * T; david.vx = 0; david.facing = 1; setState("idle"); david.throwT = -1; david.swordT = -1; snapCamera(); } },
    { keys: [...aim, "KeyX"], n: 2 }, { keys: aim.filter(k => k === "ArrowUp"), n: 40, fn() { const b = region.beasts[i]; log((b.dead ? "OK   " : "MISS ") + kind + " (" + Math.round(GR * T - b.hy) + " px up) dist " + dist + (aim.length ? " aimed up" : " flat")); } }, { keys: [], n: 10 });
}
testRun(steps);
