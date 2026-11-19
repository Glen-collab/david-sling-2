// (11-19) a long drop: the arms-out fall, then the super hero landing and up again
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const st = w => ({ n: 1, fn() { log(w + ": " + david.state + " t " + david.t.toFixed(2) + " y " + Math.round(david.y) + " og " + david.onGround); } });
testRun([{ n: 1, fn() { region.crawl = null; dialog.t = 0; region.script.length = 0; const r = roomById("pens"); g5.crawl = null; moveParty((r.c0 + 8) * T, GR * T); snapCamera(); } }, { keys: [], n: 20 },
  { n: 1, fn() { dialog.t = 0; david.y = GR * T - 420; david.onGround = false; david.airTop = david.y; david.vy = 0; setState("jump"); } },
  { keys: [], n: 8, snap: true }, st("falling"), { keys: [], n: 9 }, st("t1"), { keys: [], n: 1, snap: true }, { keys: [], n: 18, snap: true }, st("down"), { keys: [], n: 14, snap: true }, st("rising"), { keys: [], n: 20, snap: true }, st("after")]);
