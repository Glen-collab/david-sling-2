// (Glen 11-06) the right page: only the words until the gate; at the gate the title comes last, big, with a light
startSetup = () => {}; setup.active = false;
const clr = () => { setup.active = false; dialog.t = 0; dialog.hold = false; };
region.save.taken = ["g_song", "g_stone_fields"]; region.save.jAt = 0; region.save.jW = {};
testRun([
  { keys: [], n: 30, fn() { clr(); } }, { keys: [], n: 200, snap: true },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 10 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 40, fn() { clr(); region.save.taken.push("g_jonathan", "g_harp_done", "g_michal", "g_exit_open"); jsceneOpen(true); } },
  { keys: [], n: 30, fn() { const J = region.jscene; TEST_ERRORS.push(`INFO title at ${J.titleAt.toFixed(1)}s of ${J.done.toFixed(1)}s`); J.t = J.titleAt - 0.6; } },
  { keys: [], n: 1, snap: true },
  { keys: [], n: 150, snap: true },
]);
