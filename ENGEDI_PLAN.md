# World 5: En-Gedi (plan, 2026-11-18)

Comes after Ziph on the land map. Ziph ends with 23:29, "David went up from there and lived in the strongholds of En
Gedi." The old test stage `#9-1` (`engedi.js`, on the Part One engine) already has Saul's searching men, hiding rocks and
the robe cut in the dark; this world rebuilds it in region rooms (`engedi2.js` or similar, on region.js's hooks like
keilah.js and ziph.js) and reuses what fits.

## Glen's mission (11-18): provisions for the men
"For the mission for this one, David finds provisions and food for his men. Each level we can take a bunch and he has
to go back to his camp to deliver them before bringing more ... Each time he goes out he has to dodge Saul's soldiers
and other enemies. When he returns the last time is when we do the robe cut."

- **The camp is the cave.** 24:3: "David and his men were staying in the innermost parts of the cave", and the cave is
  by the sheep pens. So the hub of the world is that cave: David's men (Abishai at the fire), hungry, waiting.
- **A run:** David goes out from the cave to one supply room, gathers that room's provisions into his pack, and brings
  them back. At the camp he sets the pack down and the men carry it in; **the pile of food at the camp grows** with
  every run (baskets, jars, skins), and the men look better each time (sitting up, eating, talking).
- **The pack:** holds one room's load (about 6). The HUD shows it (a pack icon, "4 / 6"). The next supply room opens
  only after this load is home.
- **Getting hit** (an animal, a bee, a fall): one provision drops and bounces; for a few seconds it can be picked
  back up, then it's gone back to where it was found. **Seen by Saul's men:** as now ("!", no heart lost), back to the
  room's entrance, the pack kept. (Glen decides how hard.)
- **The way home is harder than the way out.** Saul's 3,000 men (24:2) close in: after each delivery more soldiers
  search the rooms near the camp, and their patrols shift, so every run home has a new route to find.
- **The last run home:** the men are fed. Then word comes: Saul is at the sheep pens. He walks into the cave alone
  (24:3) and the robe cut plays, then the call from the cave mouth.

## The rooms
| # | Room | Provisions | Dangers | New play |
|---|---|---|---|---|
| hub | **The Cave by the Sheep Pens** (the camp) | where everything is delivered | (none inside) | the growing pile; the men talk (new lines after each run) |
| - | **The Sheep Pens by the Way** (outside the cave mouth) | - | Saul's men, more every run | sneaking past them both ways, every run |
| 1 | **The Spring** (the oasis: palms, falls, pools) | water skins (fill at the spring), dates from the palms | slippery rocks, deep pools, snakes, wasps by the water | swimming (Adullam's); the hidden cave behind the falls (a Truth: Psalm 57's heading) |
| 2 | **The Rocks of the Wild Goats** (tall, several screens high) | honey out of the rock (Ps 81:16), partridge eggs on the ledges (1 Sam 26:20) | cliffs, falling rock, the bees at the honey, eagles, ibex that butt | **the wall climb** (this world's item), learned from the ibex (24:2) |
| 3 | **The Wilderness of En-Gedi** (dry ridges over the Dead Sea) | salt from the shore, wild figs, almonds | pits, scorpions, vipers, heat, a locust swarm | long jumps; the heat (rest in shade) |
| side | **Side paths** (turn-and-walk-in trails, as in Ziph) | extra food, relics, Truths | wildlife | shortcuts; one loops back near the camp |
| end | **The Cave**, then **the Cave Mouth** | - | - | the robe cut (24:3-7); the call (24:8-22); the Journal page; the land map |

Order of runs: Spring, Rocks, Wilderness (each one farther from the camp). The Rocks come second so the wall climb is in
hand for the Wilderness and the side paths.

## The story beats (1 Samuel 23:29; 24, WEB from ebible.org, checked 2026-11-18; the game says "the LORD" for "Yahweh")
- 23:29 David went up from there and lived in the strongholds of En Gedi. (arriving)
- 24:1 When Saul had returned from following the Philistines, he was told, "Behold, David is in the wilderness of En Gedi."
- 24:2 Then Saul took three thousand chosen men out of all Israel, and went to seek David and his men on the rocks of the wild goats. (the first run)
- 24:3 He came to the sheep pens by the way, where there was a cave; ... Now David and his men were staying in the innermost parts of the cave. (the last run home; the reason Saul went in is left out, as in #9-1)
- 24:4 David's men said to him, "Behold, the day of which the LORD said to you, 'Behold, I will deliver your enemy into your hand, and you shall do to him as it shall seem good to you.'" Then David arose and cut off the skirt of Saul's robe secretly.
- 24:5 Afterward, David's heart struck him because he had cut off Saul's skirt.
- 24:6 He said to his men, "The LORD forbid that I should do this thing to my lord, the LORD's anointed, to stretch out my hand against him, since he is the LORD's anointed."
- 24:7 So David checked his men with these words, and didn't allow them to rise against Saul. Saul rose up out of the cave, and went on his way.
- 24:8 David also arose afterward, and went out of the cave and cried after Saul, saying, "My lord the king!" When Saul looked behind him, David bowed with his face to the earth, and showed respect.
- 24:10 ... Some urged me to kill you, but I spared you. I said, "I will not stretch out my hand against my lord, for he is the LORD's anointed."
- 24:11 Moreover, my father, behold, yes, see the skirt of your robe in my hand; for in that I cut off the skirt of your robe and didn't kill you, know and see that there is neither evil nor disobedience in my hand. ...
- 24:12 May the LORD judge between me and you, and may the LORD avenge me of you; but my hand will not be on you.
- 24:16 ... Saul said, "Is that your voice, my son David?" Saul lifted up his voice and wept.
- 24:17 He said to David, "You are more righteous than I; for you have done good to me, whereas I have done evil to you."
- 24:20 Now, behold, I know that you will surely be king, and that the kingdom of Israel will be established in your hand.
- 24:22 David swore to Saul. Saul went home, but David and his men went up to the stronghold. (the end card)
- For the provisions: Psalm 81:16 "I will satisfy you with honey out of the rock." 1 Samuel 26:20 "... as when one hunts a partridge in the mountains."
- The Truth behind the falls: Psalm 57's heading, "A poem by David, when he fled from Saul, in the cave." and 57:1 "Be merciful to me, God, be merciful to me, for my soul takes refuge in you."

## What we have already
ibex walk and run; david_wallclimb_side and _back; david_swim (and the sword one); Abishai's set; Saul's soldiers
(walk, look, turn, alert, listen, kneel); saul_robe_cut, david_hold_robe, saul_look_back, saul_sad; the lamp sprites;
a waterfall; the bees, scorpions, vipers and the road animals (wildlife.js); the side-path trails.

## Art to ask Glen for
- Backgrounds (far, mid, near) for: the Sheep Pens with the cave mouth, the camp inside the cave, the Spring, the Rocks
  of the Wild Goats (tall), the Wilderness over the Dead Sea, and the side paths.
- Kit: palms (date clusters), the spring pool and falls pieces, cliff ledges, stone sheep pens, a beehive in a rock cleft.
- Items: a sheet of provisions (water skin, dates, honeycomb, partridge eggs, salt, figs, almonds) and the camp pile in
  four sizes (empty, some, a lot, full).
- Sprites: David with a full pack (walk, run), the men eating, a man carrying the pack into the cave.
