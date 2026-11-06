// (Glen 11-06) near the top of the watchtower: standing on a ledge, then mid-jump: what changes behind him
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
const ledges = region.props.filter(p => p.room === "tower" && /tw_ledge|tw_beam/.test(p.n)).sort((a, b) => a.y - b.y);
const L = ledges[2], deck = L.y + KIT[L.n].deck;
log("ledge " + L.n + " deck " + deck);
testRun([
  { n: 3, fn() { dialog.t = 0; setState("idle"); moveParty(L.x + KIT[L.n].w / 2, deck); snapCamera(); } },
  { keys: [], n: 60, snap: true, fn() { log("standing: camY " + Math.round(camY) + " room " + region.room.id + " fade " + region.fade); } },
  { keys: ["KeyZ"], n: 14, snap: true, fn() { log("jumping: camY " + Math.round(camY) + " room " + region.room.id + " fade " + region.fade + " y " + Math.round(david.y)); } },
]);
