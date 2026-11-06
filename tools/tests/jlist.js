// (Glen 11-06) the Journal's found list: the first stone sits him down to write; later finds join the list; "of N" at the gate
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clr = () => { setup.active = false; dialog.t = 0; dialog.hold = false; };
const take = kind => { const f = region.relics.find(f => f.kind === kind && !regionHas("taken", f.id)); region.save.taken.push(f.id); return f.id; };
region.save.taken = []; region.save.jAt = 0; region.save.jW = {};
const closeJ = [{ keys: ["KeyZ"], n: 2 }, { keys: [], n: 10 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 40, fn() { clr(); log("closed " + !region.jscene); } }];
testRun([
  { keys: [], n: 20, fn() { clr(); log("took " + take("stone")); } },
  { keys: [], n: 30, fn() { clr(); log("first stone: Journal open " + !!region.jscene); } },
  { keys: [], n: 120, snap: true }, ...closeJ,
  { keys: [], n: 20, fn() { clr(); take("pomegranate"); log("a pomegranate: Journal open " + !!region.jscene); } },
  { keys: [], n: 20, fn() { clr(); take("stone"); take("truth"); region.save.taken.push("g_song", "g_jonathan"); } },
  { keys: [], n: 30, fn() { clr(); log("two story moments: Journal open " + !!region.jscene); } },
  { keys: [], n: 400, snap: true }, ...closeJ,
  { keys: [], n: 10, fn() { clr(); region.save.taken.push("g_exit_open"); jsceneOpen(true); } },
  { keys: [], n: 40 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 30, snap: true },
]);
