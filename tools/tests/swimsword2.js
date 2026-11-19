// (11-19) the sword under water kills a fish in front of him: En-Gedi's pool (#9-11) and Adullam (#9-8)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
const clear = () => { dialog.t = 0; region.script.length = 0; region.wait = 0; };
const E5 = location.hash.includes("9-11");
const list = () => E5 ? g5.fish : r4.fish;
let r, f;
testRun([{ n: 1, fn() { region.crawl = null; } }, { keys: [], n: 30 },
  { n: 1, fn() { clear(); f = list().find(o => roomById(o.room).water); r = roomById(f.room); log("room " + r.id + " fish " + f.kind); moveParty(f.x0 + 60, r.water + 200); snapCamera(); } },
  { keys: ["ArrowRight"], n: 20 }, { keys: [], n: 5 },
  { n: 1, fn() { clear(); david.inv = 99; david.facing = 1; for (const o of list()) if (o !== f) o.gone = true; f.x = david.x + 75; f.y = david.y - 55; f.x0 = f.x - 5; f.x1 = f.x + 5; f.state = "swim"; f.gone = false; log("swim " + !!(E5 ? g5.swim : r4.swim) + " img " + SPR.david_swim_swipe.img.naturalWidth + " " + SPR.david_swim_swipe.img.complete + " src " + SPR.david_swim_swipe.img.src); } },
  { n: 1, fn() { const o = drawSprite; window.__ds = []; drawSprite = function (n, i, x, y) { if (/david/.test(n)) __ds.push(n + ":" + i + "@" + Math.round(x) + "," + Math.round(y)); return o.apply(this, arguments); }; } }, { keys: ["KeyV"], n: 2 }, { n: 1, fn() { log("drawn " + __ds.slice(-6).join(" ")); } }, { keys: [], n: 2, snap: true }, { keys: [], n: 3, snap: true }, { keys: [], n: 3, snap: true }, { keys: [], n: 4, snap: true }, { keys: [], n: 20 }, { n: 1, fn() { log("fish gone " + f.gone); } }]);
