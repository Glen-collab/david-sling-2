# Gibeah headless tests

Start the server (`python tools/serve.py 8766`), then run from the repo root:

    node tools/shot.mjs "#9-5" tools/tests/route0.js      # room connections, part 1 of 3 (~8 s each)
    node tools/shot.mjs "#9-5" tools/tests/route1.js
    node tools/shot.mjs "#9-5" tools/tests/route2.js
    node tools/shot.mjs "?allskills#9-5" tools/tests/fight.js crack.png map.png   # sling/sword on each creature, cracked wall, map
    node tools/shot.mjs "?allskills#9-5" tools/tests/sling_low.js                 # sling vs ground creatures by distance, flat vs aimed down
    node tools/shot.mjs "?allskills#9-5" tools/tests/sling_air.js                 # sling vs the bat and the hanging spider at their roosts

Lines read `OK` / `FAIL` / `MISS` (they print under "ERRORS:" because they go through TEST_ERRORS).

**Watch out:** a case script's top-level names share the page with the game. Declaring a name the game already has
(`W`, the canvas width in main.js, for one) kills the script on load and the run hangs to TIMEOUT. shot.mjs now
prints the page's errors when it times out, and `SHOT_TIMEOUT=15000` shortens the wait.
