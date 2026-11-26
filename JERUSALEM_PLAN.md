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
| The Stronghold of Zion (`zion`) | Cut scene: "David took the stronghold of Zion"; "David grew greater and greater"; a Journal page (Psalm 122:1-2) | 5:7, 9-10 |
| The ark comes home (`jrArk`, 11-25) | 6:12, then Glen's two films (`assets/video/ark_enter.mp4`, `ark_dance.mp4`) with words over them, his Psalm 57 song under them (the first time it plays in Part Two), carried on into the last Journal page ("The Ark Comes Home", Psalm 24:7) and the card | 6:12-15 |

Tuning: `JR` at the top of jerusalem.js (the water's speed `WATER.RATE`, the gorge's width `GORGE`, the Jebusites'
height on the wall `WALL_Y`). Test: `tools/tests/jerusalem.js`.

## Still to come
- **The valley of Rephaim (5:17-25), the final boss.** Ask the LORD; "You shall not go up. Circle around behind them";
  wait for "the sound of marching in the tops of the mulberry trees", then attack. Attacking early is the mistake.
- The ark ending is in (Glen's films). The Rephaim boss goes between Zion and `jrArk()`.
- Art: Glen's rooms are in (11-26, `tools/key_jerusalem.py` -> `assets/rooms/w8/jerusalem/`): the wall drawn once with
  the Jebusites on its top edge (`JR.WALL`), the gorge's two cliffs at its edges (`JR.CLIFF`) with his rocky edge as
  its floor, the watercourse's cave, pillars and roots (`jrShaftBack`, `JR.SHAFT`), Zion's city. The valley of
  Rephaim's far/mid (the mulberry trees)/near are keyed, ready for the boss. Still to come: Jebusite people, the ark.
