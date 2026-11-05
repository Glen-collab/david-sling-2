startSetup = () => {}; setup.active = false;
for (const id of ["g_song", "g_jonathan", "g_michal"]) if (!regionHas("taken", id)) region.save.taken.push(id); storyBuild(id => roomById(id).c0);   // (the story scenes would hold David: tests/story.js covers them)
const clr = () => { setup.active = false; dialog.t = 0; dialog.hold = false; };
const log = m => TEST_ERRORS.push("INFO " + m);
learnSkill("rope");
const C = id => roomById(id).c0;
const go = (id, c) => ({ n: 3, fn() { clr(); david.inv = 99; region.climb = null; david.harp = false; setState("idle"); moveParty((C(id) + c) * T + T / 2, 16 * T); snapCamera(); } });
const room = () => roomAt(david.x).id;
const check = (what, want, keys, n = 120) => [{ keys: [], n: 20, fn() { clr(); } }, { keys, n, fn() { clr(); } }, { keys: [], n: 60, fn() { clr(); log((room() === want ? "OK   " : "FAIL ") + what + " -> " + room() + " (want " + want + ")"); } }];
const RW = id => roomById(id).w;
const steps = [];
const first = k => region.beasts.findIndex(b => b.kind === k);
for (const kind of ["rat2", "spiderw"]) for (const dist of [70, 150, 250, 400]) for (const aim of [[], ["ArrowDown"]]) for (const hold of [2, 15]) {
  const i = first(kind);
  steps.push({ n: 2, fn() { clr(); for (const b of region.beasts) b.dead = false; const b = region.beasts[i]; b.x = b.hx; b.state = "walk";
      david.x = b.x - dist; david.y = GR * T; david.vx = 0; david.facing = 1; setState("idle"); david.throwT = -1; snapCamera(); } },
    { keys: [...aim, "KeyX"], n: hold }, { keys: aim, n: 40, fn() { const b = region.beasts[i]; log((b.dead ? "OK   " : "MISS ") + kind + " dist " + dist + (aim.length ? " down" : "") + " hold " + hold); } }, { keys: [], n: 10 });
}
testRun(steps);
