// (Glen 11-06) the Journal scene: only the journal harp, no stage music under it
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
audioUnlocked = true;
const playing = () => [["day", dayMusic], ["night", nightMusic], ["cave", caveMusic], ["theme", stageTheme], ["journal", journalMusic]]
  .filter(([, a]) => a && !a.paused && a.volume > 0.01).map(([n, a]) => n + " " + a.volume.toFixed(2)).join(", ") || "nothing";
region.save.jAt = 0;
for (const id of ["g_song", "g_jonathan"]) if (!region.save.taken.includes(id)) region.save.taken.push(id);
testRun([
  { keys: [], n: 60, fn() { log("Journal open " + !!region.jscene + ": " + playing()); } },
  { keys: [], n: 120, fn() { log("2s later: " + playing()); } },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 20 }, { keys: ["KeyZ"], n: 2 },
  { keys: [], n: 150, fn() { log("closed " + !region.jscene + ": " + playing()); } },
]);
