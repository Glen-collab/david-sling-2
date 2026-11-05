// A headless case (tools/shot.mjs) that dumps the region's rooms: each one's tiles row by row ("1" ground, "2" rock,
// "3" stone wall, "-" a ledge you jump up through, "0" open), its doors, seals and the cracked wall. For blueprints:
//   node tools/shot.mjs "#9-5" tools/dump_rooms.js x.png | grep "INFO ROOMS" | sed 's/.*INFO ROOMS //' > rooms.json
//   python tools/make_blueprints.py rooms.json ../david-sling-2-art/blueprints/gibeah
startSetup = () => {}; setup.active = false;
const out = { T, ROWS, GR, rooms: [] };
for (const r of REGION.rooms) {
  const rows = [];
  for (let y = 0; y < ROWS; y++) {
    let s = "";
    for (let c = r.c0; c < r.c0 + r.w; c++) s += oneway[y][c] ? "-" : String(solid[y][c] || 0);
    rows.push(s);
  }
  out.rooms.push({ id: r.id, name: r.name, w: r.w, cave: !!r.cave, mx: r.mx, my: r.my, mw: r.mw, left: r.left || null, right: r.right || null, rows,
    doors: region.doors.filter(d => d.room === r.id).map(d => ({ id: d.id, kind: d.kind, c: d.c - r.c0, need: d.need })),
    seals: region.seals.filter(s => s.room === r.id).map(s => ({ id: s.id, need: s.need, c0: s.x0 / T - r.c0, c1: s.x1 / T - r.c0 })),
    crack: region.crack && region.crack.c >= r.c0 && region.crack.c < r.c0 + r.w ? { ...region.crack, c: region.crack.c - r.c0 } : null });
}
TEST_ERRORS.push("INFO ROOMS " + JSON.stringify(out));
testRun([{ n: 1, fn() {} }]);
