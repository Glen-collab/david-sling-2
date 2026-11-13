// World 4: where to stand a tunnel so it's in Glen's painted arch (at a room's start or end): solves x = camX(x) + where
//  the arch's middle (px in his picture, sx) is on the screen
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const J = [["mouth", 2272, 141], ["camp", 903, 17], ["warren", 152, 4], ["warren", 3857, 184], ["narrows", 151, 4], ["deep", 245, 6]];
const S = [{ keys: [], n: 30 }];
for (const [id, sx, k0] of J) S.push({ n: 1, fn() {
  const r = roomById(id), im = roomImg(r.pic), B = R4.BG, k = B.BOT / im.naturalHeight, w = im.naturalWidth * k;
  const p = Math.min(R4.FILL_P, Math.max(0, (w - W) / (r.w * T - W))), off = (W - w) / 2 + (r.w * T - W) / 2 * p;
  let x = (r.c0 + k0) * T;
  for (let i = 0; i < 12; i++) { moveParty(x, GR * T); snapCamera(); const rel = camX - r.c0 * T; x = camX + (-rel * p + off + sx * k); }
  log(id + " sx " + sx + " -> k " + (x / T - r.c0).toFixed(1) + " (camX rel " + Math.round(camX - r.c0 * T) + ")");
} });
testRun(S);
