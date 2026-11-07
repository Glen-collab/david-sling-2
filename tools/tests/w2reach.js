// World 2: every walkway in the tall rooms has a way on (a rope or ladder down from it, or up to it)
startSetup = () => {}; setup.active = false; region.save.jAt = 9;
const log = m => TEST_ERRORS.push("INFO " + m);
testRun([{ n: 2, fn() {
  for (const room of ["palace", "naioth"]) {
    const L = region.ladders.filter(l => l.room === room);
    const decks = [...new Set(L.flatMap(l => [l.top, l.bot]))].sort((a, b) => a - b);
    const lone = [];
    // walkway decks are the platAt tops: list each ladder end and see if any deck has none
    const plats = []; for (const p of region.props) if (p.room === room && (p.n === "walk_left")) plats.push(Math.round(p.y + KIT.walk_left.deck));
    for (const y of [...new Set(plats)]) if (!L.some(l => Math.abs(l.top - y) < 2 || Math.abs(l.bot - y) < 2)) lone.push(y);
    log(room + ": ladders " + L.length + " (ropes " + L.filter(l => l.rope).length + "), walkway levels " + new Set(plats).size + ", levels with no rope or ladder: " + JSON.stringify(lone));
    // per walkway: does it touch a ladder end within its span?
    const walks = region.props.filter(p => p.room === room && p.n === "walk_left").map(p => { const y = Math.round(p.y + KIT.walk_left.deck), right = region.props.find(q => q.room === room && q.n === "walk_right" && Math.round(q.y + KIT.walk_right.deck) === y && q.x > p.x && q.x - p.x < 1200); return { x0: p.x, x1: right ? right.x + KIT.walk_right.w : p.x + 400, y }; });
    const stuck = walks.filter(w => !L.some(l => l.x > w.x0 - 10 && l.x < w.x1 + 10 && (Math.abs(l.top - w.y) < 2 || Math.abs(l.bot - w.y) < 2)));
    log(room + ": walkways " + walks.length + ", without any rope/ladder: " + stuck.map(w => Math.round(w.x0 / T - roomById(room).c0) + "@" + w.y).join(" "));
  }
} }]);
