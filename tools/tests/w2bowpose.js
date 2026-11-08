// (Glen 11-07) David's bow frames: Up + sword: he draws (3 frames), lets go, and the arrow flies on the release
startSetup = () => {}; setup.active = false;
const skipB = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const nArrows = () => stones.filter(s => s.bow).length;
testRun([{ n: 3, fn() { if (!hasSkill("bow")) learnSkill("bow"); moveParty((roomById("ramah").c0 + 30) * T, GR * T); snapCamera(); david.facing = 1; } },
  ...Array.from({ length: 30 }, () => ({ keys: [], n: 10, fn: skipB })),
  { keys: ["ArrowUp", "KeyV"], n: 1 }, { keys: ["ArrowUp"], n: 6, snap: true, fn() { TEST_ERRORS.push("INFO drawing: arrows " + nArrows()); } },
  { keys: [], n: 10, snap: true, fn() { TEST_ERRORS.push("INFO released: arrows " + nArrows()); } }]);
