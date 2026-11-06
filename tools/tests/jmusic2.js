// (Glen 11-06) the gate's last Journal page: the journal harp only (no song, no stage music), on under the card after
startSetup = () => {}; setup.active = false; audioUnlocked = true;
const log = m => TEST_ERRORS.push("INFO " + m);
const vol = a => a && !a.paused && a.volume > 0.01 ? a.volume.toFixed(2) : "off";
const playing = () => `journal ${vol(journalMusic)}  song ${vol(CARD_SONG)}  day ${vol(dayMusic)}`;
region.save.jAt = 9;
testRun([
  { keys: [], n: 30, fn() { region.save.taken.push("g_exit_open"); jsceneOpen(true); } },
  { keys: [], n: 90, fn() { log("gate page: " + playing()); } },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 20 }, { keys: ["KeyZ"], n: 2 },
  { keys: [], n: 90, fn() { log("card open " + region.mapOpen + ": " + playing()); } },
  { keys: ["KeyZ"], n: 2 }, { keys: [], n: 30, fn() { log("A on the card: " + playing()); } },
  { keys: [], n: 2, snap: true },
]);
