startSetup = () => {}; region.save.jAt = 9;   // (no Journal scene: tests/journal.js covers it)
 setup.active = false;
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
const kinds = {}; region.beasts.forEach((b, i) => { (kinds[b.kind] = kinds[b.kind] || []).push(i); });
log("beasts: " + Object.entries(kinds).map(([k, v]) => k + " x" + v.length).join(", "));
for (const [kind, idx] of Object.entries(kinds)) for (const weapon of ["KeyX", "DownX", "KeyV"]) {
  const i = idx[0];
  steps.push({ n: 2, fn() { clr(); for (const b of region.beasts) { b.dead = false; b.state = b.state === "dust" ? "walk" : b.state; } const b = region.beasts[i]; b.x = b.hx; b.y = b.hy; b.t = 0; b.vx = 0; b.vy = 0;
      david.x = b.x - 70; david.y = GR * T; david.vx = 0; david.facing = 1; setState("idle"); snapCamera(); } },
    { keys: weapon === "DownX" ? ["ArrowDown", "KeyX"] : [weapon], n: 2 }, { keys: [], n: 40, fn() { const b = region.beasts[i]; log((b.dead ? "OK   " : "MISS ") + kind + " (" + b.room + ") by " + ({ KeyX: "sling", DownX: "sling aimed down", KeyV: "sword" }[weapon]) + " state " + b.state + " beast y " + Math.round(b.y)); } });
}
// the cracked wall: with the sword it's open; walk through it
const cr = region.crack;
steps.push({ n: 2, fn() { clr(); david.x = (cr.c - 2) * T; david.y = GR * T; david.facing = 1; setState("idle"); snapCamera(); } },
  { keys: ["ArrowRight"], n: 45, fn() { log((david.x > (cr.c + cr.w) * T ? "OK   " : "FAIL ") + "through the cracked wall: x col " + (david.x / T - cr.c).toFixed(1) + " (wall " + cr.w + " wide)"); } },
  { keys: [], n: 2, snap: true });
// the map with the deep cellar explored
steps.push({ n: 2, fn() { clr(); regionAdd("explored", "deep"); regionAdd("explored", "cisterns"); regionAdd("explored", "cellars"); } },
  { keys: ["ShiftLeft"], n: 2 }, { keys: [], n: 20, snap: true });
testRun(steps);
