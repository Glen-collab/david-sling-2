// World 4: is it dark below the Lamp Hall? (a pixel far from David)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() { const r = roomById("warren"); moveParty(r.c0 * T + 700, GR * T); david.olives = 20; snapCamera(); } }, { keys: [], n: 40 },
  { n: 1, fn() { const p = ctx.getImageData(1100, 300, 1, 1).data; const q = r4DarkCanvas.getContext("2d").getImageData(950, 420, 1, 1).data, s = ctx.getImageData(950, 420, 1, 1).data; log("darkcanvas " + [...q] + " screen " + [...s] + " camY " + camY + " W " + W + "x" + H + " cw " + r4DarkCanvas.width); log("room " + region.room.id + " dark " + region.room.dark + " lamp " + r4Lamp() + " pixel " + [...p].slice(0, 3)); } }, { keys: [], n: 1, snap: true }]);
