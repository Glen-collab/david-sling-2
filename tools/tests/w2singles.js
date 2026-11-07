// (Glen 11-07) his Samuel with a staff (Ramah, Naioth), Saul face down at the chase's end (19:24), a wolf howling
startSetup = () => {}; setup.active = false;
const skipS = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const waitS = n => Array.from({ length: n }, () => ({ keys: [], n: 10, fn: skipS }));
testRun([{ n: 3, fn() { r2.story.samuel = "ramah"; moveParty(r2.samX - 200, GR * T); snapCamera(); } }, ...waitS(30), { keys: [], n: 1, snap: true },
  { n: 3, fn() { r2.story.samuel = "naioth"; moveParty(r2.samNX - 300, GR * T); snapCamera(); } }, ...waitS(20),
  { n: 1, fn() { r2.chase = { wave: 3, t: 0, phase: "done" }; r2.saul = { x: r2.samNX - 200, t: 2, state: "fall" }; } }, ...waitS(3), { keys: [], n: 1, snap: true },
  { n: 3, fn() { const w = r2.wolves[0]; moveParty(w.x - 450, GR * T); snapCamera(); } }, ...waitS(20),
  { n: 1, fn() { for (const w of r2.wolves) { w.howl = 5; w.ht = 9; } } }, { keys: [], n: 5, snap: true }]);
