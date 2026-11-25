# World 8, stop 2: Jerusalem (2 Samuel 5:6-25; 6; Joshua 15:63). Plan, 11-25

The second stop on Hebron's stage (`#9-14`, saved as `hebron`), in `game/jerusalem.js`, loaded after hebron.js. It adds
its rooms to `HEB` the way zk7.js adds Ziklag's to Hachilah's. On the land map it comes after Hebron (room `jvalley`).
Its own crawl: `CRAWLS.jerusalem` in region.js (why the city wasn't Israel's: Joshua 15:63).

## Glen's answers (11-25)
- The Leap of Faith (the old test stage 9-2, leap.js) goes here, **before he enters the water shaft**.
- The stones **don't show** as he walks out. Only Glen's sand-toss film (leap_end.mp4) shows the bridge, and then it
  stays drawn.
- No new art for now: build with what we have. (Remind Glen about Hebron's missing art later.)

## Built (first pass, 11-25)
| Room | What happens | Bible |
|---|---|---|
| Below Jerusalem (`jvalley`) | Cut scene: the Jebusites laugh from the walls; David: "let him go up to the watercourse…" | 2 Sam 5:6, 8 |
| The Gorge (`gorge`) | Glen's leap film at the edge. A bridge no one can see: walking finds each stone, running or jumping falls through (no heart lost, back to where he stood). Across: the sand-toss film shows the bridge | Psalm 18:36 |
| The Watercourse (`shaft`) | Up a tall shaft of ledges (World 4's Old Well Shaft art) while the water rises. Caught: back down (halfway, once he's passed it), no heart lost | 5:8 |
| The Stronghold of Zion (`zion`) | Cut scene: "David took the stronghold of Zion"; "David grew greater and greater"; the last Journal page (Psalm 122:1-2) | 5:7, 9-10 |

Tuning: `JR` at the top of jerusalem.js (the water's speed `WATER.RATE`, the gorge's width `GORGE`, the Jebusites'
height on the wall `WALL_Y`). Test: `tools/tests/jerusalem.js`.

## Still to come
- **The valley of Rephaim (5:17-25), the final boss.** Ask the LORD; "You shall not go up. Circle around behind them";
  wait for "the sound of marching in the tops of the mulberry trees", then attack. Attacking early is the mistake.
- **The ark comes into the city (6:12-15).** David dances; everyone you recruited in the crowd; the whole Psalm 57 song.
  Then the last Journal page moves there.
- Art (when Glen has room again): Jerusalem's walls and gate, Jebusites, the gorge, the watercourse, Zion, the
  mulberry trees, the ark.
