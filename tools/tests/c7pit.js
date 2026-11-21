// (11-21) Glen's Carmel pit edges, on the mountain road's first pit (col 18)
startSetup = () => {}; setup.active = false; helpT = 0;
testRun([{ n: 1, fn() { region.script.length = 0; region.wait = 0; dialog.t = 0;
  const r = roomById("road"); moveParty((r.c0 + 14) * T, GR * T); snapCamera(); } },
  { keys: [], n: 420, fn() { region.script.length = 0; dialog.t = 0; } }, { keys: [], n: 2, snap: true },
  { n: 1, fn() { TEST_ERRORS.push("INFO room " + region.room.id + " edges " + region.props.filter(p => /pit_(left|right)$/.test(p.n)).length + " old " + region.props.filter(p => p.n === "p_left").length); } }]);
