// World 4: the Truth at the end of the Flooded Tunnel (Glen 11-13)
startSetup = () => {}; setup.active = false;
testRun([
  { n: 1, fn() { const r = roomById("flooded"); r.dark = 0; moveParty((r.c0 + 118) * T, 320); region.camFootY = GR * T; snapCamera(); } },
  { keys: [], n: 90 }, { n: 1, fn() { const r = roomById("flooded"); moveParty((r.c0 + 114) * T, 330); snapCamera(); } }, { keys: [], n: 20 }, { keys: [], n: 1, snap: true },
]);
