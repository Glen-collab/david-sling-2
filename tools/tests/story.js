// the story scenes from a clean save: the women's song (town), Jonathan's covenant (halls), Michal (halls, after the harp room).
// Shots: 1 women running in, 2 the song, 3 Saul's line, 4 Saul walking off, 5 Jonathan's first line, 6 his gifts,
// 7 the two-shot, 8 after (the toast), 9 Michal.
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const A = () => { dialog.hold = false; dialog.t = 0; };   // press A on a line
const C = id => roomById(id).c0;
const put = (id, c, f = 1) => ({ n: 2, fn() { A(); region.climb = null; setState("idle"); moveParty((C(id) + c) * T + T / 2, 16 * T); david.facing = f; snapCamera(); } });
const said = () => dialog.t > 0 ? dialog.who : "-";
testRun([
  { n: 1, fn() { region.save.taken = region.save.taken.filter(id => !["g_song", "g_jonathan", "g_michal", "g_harp_done"].includes(id)); storyBuild(C);
      log("sword before Jonathan: " + regionSword()); } },
  put("town", 14), { keys: ["ArrowRight"], n: 70 }, { keys: [], n: 25, snap: true },
  { n: 60, fn() { log("town line 1: " + said()); }, snap: true },
  { n: 1, fn() { A(); } }, { n: 50, snap: true, fn() { log("town line 2: " + said() + " saul " + region.story.saul.mode); } },
  { n: 1, fn() { A(); } }, { n: 60, snap: true, fn() { log("after: saul " + region.story.saul.mode + ", women " + region.story.women.map(w => w.mode).join("/")); } },
  put("halls", 16), { keys: ["ArrowRight"], n: 60 }, { keys: [], n: 10, snap: true, fn() { log("halls line 1: " + said() + " jon " + region.story.jon.mode); } },
  { n: 1, fn() { A(); } }, { n: 120, snap: true, fn() { log("jon " + region.story.jon.mode); } },
  { n: 69, fn() { log("david x before the two-shot " + Math.round(david.x - camX)); } }, { n: 60, snap: true, fn() { log("jon " + region.story.jon.mode + " davidHidden " + !!region.pose); } },
  { n: 120 }, { n: 1, fn() { log("halls line 2: " + said()); A(); } }, { n: 20, snap: true, fn() { log("after: sword " + regionSword() + " hearts " + david.hearts + "/" + david.maxHearts + " toast " + (typeof toastText !== "undefined" ? toastText : "?")); } },
  { keys: ["KeyV"], n: 2 }, { keys: [], n: 3, fn() { log("V swings the sword: " + (david.swordT >= 0)); } },
  { n: 1, fn() { regionAdd("taken", "g_harp_done"); } }, put("halls", 59, -1), { keys: ["ArrowLeft"], n: 30 }, { keys: [], n: 20, snap: true, fn() { log("michal line: " + said() + " mode " + region.story.michal.mode); } },
  { n: 1, fn() { A(); } }, { n: 10, fn() { log("michal line 2: " + said()); A(); } },
]);
