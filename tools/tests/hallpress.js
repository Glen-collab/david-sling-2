// (Glen 11-06) the halls' save point is an olive press, not a campfire
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const c0 = roomById("halls").c0, f = fires.find(f => Math.abs(f.x / T - c0 - 46.5) < 1);
const px = () => { const d = ctx.getImageData(Math.round(f.x - camX), 560, 1, 1).data; return [...d].slice(0, 3).join(","); };
testRun([{ keys: [], n: 3, fn() { setState("idle"); moveParty((c0 + 52) * T, 16 * T); snapCamera(); } },
  { keys: [], n: 200, fn() { TEST_ERRORS.push("INFO pixel at press " + px() + " screen x " + Math.round(f.x - camX)); ctx.fillStyle = "red"; ctx.fillRect(f.x - camX - 3, 440, 6, 180); const im = kitImg("olive_press"); TEST_ERRORS.push("INFO img " + (im && im.src + " " + im.naturalWidth + "x" + im.naturalHeight) + " ret " + drawRegionFire(f, camX) + " transform " + JSON.stringify(ctx.getTransform()) + " alpha " + ctx.globalAlpha + " comp " + ctx.globalCompositeOperation); TEST_ERRORS.push("INFO after direct draw " + px()); } },
  { keys: [], n: 1, snap: true }]);
