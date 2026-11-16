// (11-16) any pit, ledge or wall sitting inside a terrace or low wall (region.tops)
startSetup = () => {}; setup.active = false;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 1, fn() {
  const rm = x => (region.rooms || []).find(r => x >= r.c0 * T && x < (r.c0 + r.w) * T), nm = x => { const r = rm(x); return r ? r.id + "@" + Math.round(x / T - r.c0) : "?"; };
  const tops = region.tops || []; let n = 0;
  for (const t of tops) {
    for (const h of region.holes || []) if (h.x0 < t.x1 && h.x1 > t.x0) { n++; log("pit in wall cols " + Math.round(t.x0 / T) + "-" + Math.round(t.x1 / T) + " pit " + h.room + " " + h.c + "+" + h.w + " room c0 " + roomById(h.room).c0); }
    for (const l of region.ledges || []) if (l.c * T < t.x1 && (l.c + l.w) * T > t.x0 && l.y > t.top - 70) { n++; log("ledge on wall " + nm(t.x0) + " ledge " + nm(l.c * T) + " y " + l.y + " top " + t.top); }
    for (const u of tops) if (u !== t && u.x0 < t.x1 && u.x1 > t.x0 && u.x0 >= t.x0) { n++; log("wall in wall " + nm(t.x0) + " / " + nm(u.x0)); }
  }
  log("checked " + tops.length + " walls, " + n + " overlaps");
} }, { keys: [], n: 2 }]);
