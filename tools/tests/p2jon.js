// (Glen 11-06) Player 2 in Gibeah: the armor-bearer first; Jonathan joins after the covenant; both climb the ladders
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const hc = roomById("halls").c0, L = ladders.filter(l => l.room === "walls")[5];
testRun([
  { n: 3, fn() { dialog.t = 0; moveParty((hc + 10) * T, GR * T); snapCamera(); } },
  { n: 2, fn() { region.save.taken = region.save.taken.filter(t => t !== "g_jonathan" && t !== "g_jon_warn"); region.story.jon.mode = "idle"; } },
  { keys: ["Numpad6"], n: 2 }, { keys: [], n: 10, fn() { log("joined as " + p2.who + " roster " + p2Roster()); } },
  ...Array.from({ length: 40 }, () => ({ keys: ["ArrowRight"], n: 10, fn() { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } } })),
  ...Array.from({ length: 30 }, () => ({ keys: [], n: 20, fn() { if (dialog.t > 0) { dialog.hold = false; dialog.t = 0; } } })),
  { keys: [], n: 1, snap: true, fn() { log("after covenant: p2 " + p2.who + " taken " + regionHas("taken", "g_jonathan") + " roster " + p2Roster()); } },
  { n: 3, fn() { dialog.t = 0; moveParty(L.x, L.botY); snapCamera(); } }, { keys: [], n: 20, fn() { p2.x = L.x + 10; p2.y = L.botY; p2.vy = 0; log("script " + region.script.length); } },
  { keys: ["ArrowUp", "Numpad8"], n: 50 }, { keys: [], n: 1, snap: true, fn() { log("ladder: d y " + Math.round(david.y) + " p2 y " + Math.round(p2.y) + " top " + L.topY + " bot " + L.botY + " p2 ladder " + !!p2.ladder); } },
  { keys: ["ArrowUp", "Numpad8"], n: 60 }, { keys: [], n: 20, fn() { log("top: d y " + Math.round(david.y) + " p2 y " + Math.round(p2.y) + " ground " + p2.onGround); } },
  { keys: ["Numpad5"], n: 1 }, { keys: ["Numpad5"], n: 30 }, { keys: [], n: 1, snap: true, fn() { log("down: p2 y " + Math.round(p2.y) + " ladder " + !!p2.ladder); } },
]);
