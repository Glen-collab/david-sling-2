# Keilah (World 4, part two): plan, started 2026-11-14

Comes right after Adullam on the land map (landmap.js: `keilah`, World 4, after `adullam`, stage not built yet).
Adullam ends with Gad: "Don't stay in the stronghold. Depart, and go into the land of Judah," and "Then David departed,
and came into the forest of Hereth" (1 Samuel 22:5). So Keilah opens in the forest of Hereth.

## The story (WEB, checked word for word on ebible.org/eng-web/1SA23.htm, 11-14; "the LORD" for Yahweh)
- 23:1 David was told, "Behold, the Philistines are fighting against Keilah, and are robbing the threshing floors."
- 23:2 Therefore David inquired of the LORD, saying, "Shall I go and strike these Philistines?" The LORD said to David,
  "Go strike the Philistines, and save Keilah."
- 23:3 David's men said to him, "Behold, we are afraid here in Judah. How much more then if we go to Keilah against
  the armies of the Philistines?"
- 23:4 Then David inquired of the LORD yet again. The LORD answered him, and said, "Arise, go down to Keilah; for I will
  deliver the Philistines into your hand."
- 23:5 David and his men went to Keilah and fought with the Philistines, and brought away their livestock ... So David
  saved the inhabitants of Keilah. *(the middle, "killed them with a great slaughter", left out: in this game they run)*
- 23:6 When Abiathar the son of Ahimelech fled to David to Keilah, he came down with an ephod in his hand.
- 23:7 Saul was told that David had come to Keilah. Saul said, "God has delivered him into my hand, for he is shut in
  by entering into a town that has gates and bars."
- 23:8 Saul summoned all the people to war, to go down to Keilah to besiege David and his men.
- 23:9 David knew that Saul was devising mischief against him. He said to Abiathar the priest, "Bring the ephod here."
- 23:10-11 "O LORD, the God of Israel, your servant has surely heard that Saul seeks to come to Keilah to destroy the
  city for my sake. Will the men of Keilah deliver me up into his hand? Will Saul come down, as your servant has heard?
  LORD, the God of Israel, I beg you, tell your servant." The LORD said, "He will come down."
- 23:12 Then David said, "Will the men of Keilah deliver me and my men into the hand of Saul?" The LORD said, "They will
  deliver you up."
- 23:13 Then David and his men, who were about six hundred, arose and departed out of Keilah and went wherever they
  could go. Saul was told that David had escaped from Keilah; and he gave up going there.
- 23:14 David stayed in the wilderness in the strongholds, and remained in the hill country in the wilderness of Ziph.
  Saul sought him every day, but God didn't deliver him into his hand. *(the ending: on to Ziph)*

**The lesson:** David asks the LORD before he moves, every time, even when his men are scared, and again when the
answer is hard to hear. He saves a town that would hand him over anyway. The 400 have grown to 600.

## The world, in five parts (about 8 rooms, the same side-scrolling rooms as Adullam)
1. **The Forest of Hereth** (2 rooms). Trees, dappled light, the 400 camped among them. A runner brings the news (23:1).
   **Ask the LORD:** a flat rock where David kneels (Up; `david_kneel`). The answer: go (23:2). His men are scared (23:3):
   talk to three of them (the newcomers from Adullam, who you know now). Ask again (23:4): "Arise, go down to Keilah."
   Simple platforming: logs, roots, a stream, foxes, ravens, a bear at most.
2. **The Road down to Keilah** (1-2 rooms). Down out of the hills, terraces, olive groves, smoke rising ahead. Philistine
   scouts and archers (phil_*): hit them and they turn, run and fade, as in Part One.
3. **The Threshing Floors (the battle)** (1 wide room). Round stone floors outside the walls with grain heaped on them,
   oxen, the threshing sledges. Philistine raiders (raider_*) carrying off the grain in sacks. **The boss:** defend three
   floors at once. Raiders come in waves; one that reaches a floor grabs a sack and runs. Stop them before the edge of the
   screen. Then gather the Philistines' livestock (23:5: "brought away their livestock") into the town gate: herding,
   like Part One's sheep. Then the townspeople come out and cheer.
4. **Keilah Town** (2 rooms, a safe hub, no enemies). Walls, a gate with bars (23:7), market, well, houses with flat roofs
   to run across. Thankful people (villager_*). **Abiathar arrives** with the ephod (23:6; `abiathar_*` sprites already
   made for Nob). Then a runner: Saul is coming (23:7-8). Night falls on the town. **The ephod scene:** David asks the
   two questions (23:10-12), a short scene. The townspeople's faces turn; doors close.
5. **The Escape** (the chase, the DESIGN.md plan: "the gate closing, the town coming apart behind; run, roll, slide").
   Night. Torches. The gate is being shut and barred. Run through the streets and over the roofs, roll under a cart,
   slide under the closing gate, the 600 streaming out behind. Townsmen try to grab David (they don't hurt him; a grab
   costs time). Missing it costs a retry from the last torch, never the whole run. Out into the dark hills: 23:13-14,
   then the land map (Ziph next).

## Fits what's built
- Rooms, doors, ledges, enemies that turn and run, toasts, rPlay scenes, the Journal map: regions as in adullam.js.
- Ask the LORD: Adullam's design said "Get the lamp, shield and **Ask the LORD**". Here it becomes real: a kneel (Up at
  the rock, then with the ephod in town). It could stay a skill after Keilah: kneel at any altar stone for a hint.
- The herding: Part One's sheep code (and our flock sprites: sheep_*, goat_*, ox_*).
- The chase: a scrolling run with a closing gate; Part Two's roll and slide (david_roll, asahel_slide-style).

## Already have (no new art needed)
David: kneel, roll, run, sling, sword, Goliath's sword. Abiathar: walk, talk, hide. Philistines: phil_bow/charge/run/
sling/flee/drop. Raiders: walk/run/grab/flee/hit/down. Oxen, sheep, goats, donkeys, ravens, foxes. Villagers (men, women,
boys, girls: stand and run). Soldier1-5 and the camp men from Adullam. A messenger (messenger_*).

## Art Glen will need (the prompts below)
- **Backdrops, 3:1 wide** (as ART_PROMPTS_W4.md): the Forest of Hereth; the road down; the threshing floors outside the
  walls; Keilah's street (day); Keilah's street (night, torches); the gate (night, closing); the dark hills after.
- **Kit pieces (green screen):** a threshing floor (round, flat stones, a grain heap), a grain sack, a threshing sledge,
  the town gate with its bar (open and shut), a flat-roofed house front, a market stall, a cart, a torch on a wall,
  a prayer rock, forest logs and roots.
- **Clips (green screen):** David asking with the ephod (Abiathar holding it up, David kneeling), a townsman reaching to
  grab (and missing), raiders carrying a grain sack, a gatekeeper pushing the gate shut, David sliding under a gap.

## The backdrop prompt (fill in the [place]; 3:1 wide, 3072x1024 or bigger, or two 2:1 halves we stitch)
> Ultra-wide 3:1 panorama of [place] in ancient Judea, about 1000 BC, seen from far back with a wide-angle lens so
> everything looks small and far away. Stylized 3D animated-film look, soft painterly lighting, rich detail. The ground is
> a flat, plain strip along the bottom edge with nothing in front of it. No people, no animals. Even lighting from left to
> right, and the left and right edges match so the picture can repeat seamlessly.

| Room | [place] |
|---|---|
| Forest of Hereth | a forest of oaks and terebinths on rocky hills, dappled sunlight, campfire smoke rising between the trees |
| The road down | terraced hillsides with olive groves going down into a valley, a walled town far off, smoke rising from its fields |
| The threshing floors | wide flat fields of golden wheat stubble outside a stone-walled hill town, round stone threshing floors, smoke, morning |
| Keilah, day | a street inside a small walled town of mud-brick and stone houses with flat roofs, a market, a well, warm light |
| Keilah, night | the same street at night, torches on the walls, doors and shutters closed, blue moonlight |
| The gate, night | the inside of a thick town gate in a stone wall at night, torches, the heavy wooden doors half shut |
| The dark hills | rocky wilderness hills at night under stars, a thin moon, the walled town's torches far off behind |

Kit pieces and clips: the same green screen as World 4 (pure #00FF00 background, the object alone, side view, the same
3D look). The clips: 2-3 seconds, side view, feet on a flat line.

## Questions for Glen
1. The battle: three threshing floors to defend at once (a little tower-defense), or a straight fight down the floors?
2. The escape: a real chase (the camera pushing, the gate closing), or the D-pad drill (drill.js, as with Michal's rope)?
3. Ziph next, as on the land map, or does Keilah end World 4 with a Journal page first?
4. The men of Keilah: shown turning against David (faces, doors shutting), or kept off-screen and only told?
