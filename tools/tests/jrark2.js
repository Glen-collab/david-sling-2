// (11-25) the words over the ark's films, checked on still frames of Glen's clips (headless Chrome doesn't run video)
startSetup = () => {}; setup.active = false; helpT = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const snap = { keys: [], n: 2, snap: true };
const clean = () => { region.save.taken = region.save.taken.filter(k => !/^(jr|hb)_/.test(k)); regionWrite(); };
window.JR_FILMS = true;
const still = (src, t, dur) => { const im = new Image(); im.src = src; Object.assign(im, { videoWidth: 1280, videoHeight: 720, readyState: 4, currentTime: t, duration: dur, ended: false, play: () => Promise.resolve(), pause() {} }); return im; };
let f1, f2;
testRun([
  { n: 1, fn() { f1 = still("_f1.png", 3, 6); f2 = still("_f2.png", 3, 10); clean(); ["hb_ask", "hb_judah", "hb_pool", "hb_chase", "hb_grave", "hb_feasted", "hb_end", "jr_taunt", "jr_leap", "jr_end"].forEach(k => regionAdd("taken", k)); region.jscene = null;
    const r = roomById("zion"); regionGo((r.c0 + 8) * T, 1, () => { snapCamera(); jrArk(); }); } },
  { keys: [], n: 150 }, { n: 1, fn() { let i = 0; while (region.script.length && !preFilm.active && i++ < 20) { const s = region.script.shift(); if (s.fn) s.fn(); } dialog.t = 0; preFilm.clip = f1; } },
  { keys: [], n: 120 }, snap,
  { n: 1, fn() { f1.ended = true; } }, { keys: [], n: 60 }, { n: 1, fn() { log("film2 " + preFilm.opts.src.split("/").pop()); preFilm.clip = f2; } }, { keys: [], n: 120 }, snap,
  { n: 1, fn() { f2.ended = true; } }, { keys: [], n: 120 }, snap,
  { n: 1, fn() { log("ark " + regionHas("taken", "jr_ark") + " journal " + (region.jscene ? "page " + (region.jscene.view + 1) + " of " + region.jscene.pages.length : "none") + " song " + !!(CARD_SONG && !CARD_SONG.paused) + " jmusic " + (typeof journalMusic !== "undefined" && !journalMusic.paused)); region.jscene = null; if (CARD_SONG) CARD_SONG.pause(); clean(); } },
]);
