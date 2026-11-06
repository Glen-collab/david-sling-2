// The Journal scene (region.js jscene): after two story moments he writes; then the gate's full page, then the card
startSetup = () => {}; setup.active = false;
const clr = () => { setup.active = false; dialog.t = 0; dialog.hold = false; };
const log = m => TEST_ERRORS.push("INFO " + m);
region.save.jAt = 0; region.save.taken = region.save.taken.filter(id => !["g_jfinal", "g_exit_open"].includes(id));
for (const id of ["g_song", "g_jonathan", "g_truth_song"]) if (!region.save.taken.includes(id)) region.save.taken.push(id);
testRun([
  { keys: [], n: 40, fn() { clr(); log("scene open " + !!region.jscene); } },
  { keys: [], n: 90, snap: true },                                   // writing
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 20, snap: true },          // finished
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 40, fn() { log("closed " + !region.jscene + " jAt " + region.save.jAt); for (const id of ["g_harp_done", "g_michal", "g_truth_spears", "g_pom_tower"]) if (!region.save.taken.includes(id)) region.save.taken.push(id); } },
  { keys: [], n: 40, fn() { clr(); log("second scene " + !!region.jscene + " prev " + (region.jscene && region.jscene.prev)); } },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 10 }, { keys: ["KeyZ"], n: 2 }, { keys: [], n: 40, fn() { clr(); region.save.taken.push("g_exit_open"); jsceneOpen(true); } }, { keys: [], n: 40 },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 20, snap: true },          // the gate: all of it
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 40, fn() { log("after gate: card open " + region.mapOpen + " page " + region.page + " leave " + region.bookLeave); } },
]);
