// (Glen 11-09) the arrows and the goodbye: the boy picks up the arrow (boy_stone, as is); then the two-shots
//  dj_bow, dj_embrace, dj_givebow (Glen's clip), and the bow skill
if (location.hash !== "#9-6") throw new Error("not in Ramah");
startSetup = () => {}; setup.active = false; R2.SIGHT = R2.SIGHT_LOW = 0;
const log = m => TEST_ERRORS.push("INFO " + m);
const skip = () => { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } david.hearts = david.maxHearts; };
const shots = {};
const tick = () => { if (r2.choice) { r2.choice.sel = 1; r2.choice.t = 1; }
  const B = r2.boy, J = r2.jonW;
  if (B && B.mode === "pick" && !shots.pick) shots.pick = 1;
  if (J && J.mode === "two" && J.t > 1.2 && !shots[J.clip]) shots[J.clip] = 1;
};
const want = k => ({ keys: [], n: 1, snap: true, fn() { log(k + ": img " + (SPR.dj_bow && SPR.dj_bow.img.naturalWidth) + " J.x-ezel " + (r2.jonW && Math.round(r2.jonW.x - r2.ezelX)) + " camX-ezel " + Math.round(camX - r2.ezelX) + " boy " + (r2.boy && r2.boy.mode) + " jon " + (r2.jonW && (r2.jonW.mode + " " + (r2.jonW.clip || ""))) + " arrows " + r2.arrows.length + " gap " + Math.round(david.x - (r2.jonW ? r2.jonW.x : 0))); } });
const until = (k, test) => [...Array.from({ length: 50 }, () => ({ keys: [], n: 6, fn() { tick(); if (!test()) skip(); } })), want(k)];
testRun([
  { n: 3, fn() { for (const r of REGION.rooms) regionAdd("explored", r.id); for (const k of ["r2_window","r2_samuel","r2_naioth","r2_ezel","r2_feast","r2_gateshut"]) regionAdd("taken", k); r2ArrowsStart(); } },
  ...Array.from({ length: 30 }, () => ({ keys: [], n: 10, fn() { tick(); if (!r2.choice) skip(); } })),
  { keys: [], n: 1, fn: tick }, { keys: ["KeyZ"], n: 3 },
  { keys: [], n: 1, fn() { log("choice gone " + !r2.choice); } },
  ...Array.from({ length: 30 }, () => ({ keys: [], n: 4, fn() { tick(); if (!(r2.boy.mode === "pick" && r2.boy.t > 1)) skip(); } })), want("pick"),
  ...until("bow", () => r2.jonW.mode === "two" && r2.jonW.clip === "dj_bow" && r2.jonW.t > 1.4),
  ...until("embrace", () => r2.jonW.mode === "two" && r2.jonW.clip === "dj_embrace" && r2.jonW.t > 2),
  ...until("givebow", () => r2.jonW.mode === "two" && r2.jonW.clip === "dj_givebow" && r2.jonW.t > 2),
  ...until("after", () => region.jscene || r2Has("r2_arrows")),
  { keys: [], n: 1, fn() { log("done: arrows taken " + r2Has("r2_arrows") + " bow " + (typeof hasSkill === "function" ? hasSkill("bow") : "?")); } },
]);
