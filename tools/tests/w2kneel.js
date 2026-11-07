// (Glen 11-07) his kneeling soldier: Saul's men going down before Samuel at Naioth (19:20), and staying down
startSetup = () => {}; setup.active = false;
const skipK = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const waitK = n => Array.from({ length: n }, () => ({ keys: [], n: 10, fn: skipK }));
testRun([{ n: 3, fn() { moveParty(r2.samNX - 200, GR * T); snapCamera(); } }, ...waitK(30),
  { n: 1, fn() { r2.chase = { wave: 0, t: 0, phase: "wave" }; r2.men.length = 0;
    for (let i = 0; i < 3; i++) r2.men.push({ x: r2.samNX - 560 + i * 130, y: GR * T, facing: 1, state: "kneel", t: -i * 0.35, wave: 0, sheet: "saul_soldier_walk" }); } },
  { keys: [], n: 20, snap: true }, { keys: [], n: 70, snap: true }]);
