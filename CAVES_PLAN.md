# World 4: The Cave of Adullam (plan, started 2026-11-12)

Comes right after Gath on the land map (landmap.js: Gath, then Adullam, then Keilah). World 3 already ends on
"So David departed from there, and escaped to the cave of Adullam. (1 Samuel 22:1)". Nothing is built yet; Nob and Gath come first.

## What Glen asked for
- Big, beautiful caves in the same painted 3D look as the rest of the game.
- A maze. The Journal map stays as boxes (rooms show up as you find them).
- Tunnels that lead **away from the camera**: David turns, walks into one, and the game cuts back to the
  side view in a different section of the cave.
- Water in the lower levels. Rats and bats everywhere.

## The story (verify the quotes on ebible.org/eng-web before using them)
- 1 Samuel 22:1-2: David's brothers and his father's household come down to him; "everyone who was in distress,
  everyone who was in debt, and everyone who was discontented" gathers to him: about 400 men. He becomes their captain.
- 1 Samuel 22:3-4: he takes his father and mother to the king of Moab to keep them safe.
- 1 Samuel 22:5: the prophet Gad: "Don't stay in the stronghold. Depart, and go into the land of Judah." (that's the way out: on to Keilah)
- 2 Samuel 23:13-17: three of his mighty men break through the Philistine camp to bring him water from the well
  of Bethlehem, at the cave of Adullam, and he pours it out to the LORD. **That ties in with the water.**
- Psalm 142 ("when he was in the cave") and Psalm 57 ("when he fled from Saul, in the cave"). Psalm 57 is Glen's
  song, My Heart Is Steadfast (SONG_PSALM57.md), so this world is where it belongs.
- Ideas for the game: people arrive across the world (each one you find and lead out to the camp counts toward the 400),
  the family scene, and the Moab trip. The water from Bethlehem could be the big scene at the end.

## Three levels down
| Level | Look | Dangers |
|---|---|---|
| Upper caves | the entrance, daylight coming down through cracks, dry, the camp of the 400 | bats on the ceiling, a few rats |
| Middle caves | stalactites, narrow ledges, dark (lamp light, uses the oil jars) | swarms of bats, rat nests, falling rock |
| Lower caves | an underground river, pools, flooded tunnels | water (wading slows him; deep water means swimming), rats on the banks, bats over the water |

About 12 to 16 rooms, drawn on the map in three bands like Beneath Nob is now.

## The "turn into the cave" tunnels (how it fits the game we already have)
It's an ordinary door, just one drawn going **into the picture** instead of off the side:
1. A cave room's painted backdrop shows tunnel mouths going away into the dark. Glen's art; each mouth is also a separate
   cut-out piece so it can be placed anywhere.
2. Up at a mouth: David turns his back and walks into it while the camera pushes in and the light fades. That
   needs a short clip of **David walking away from the camera** and one of him **walking toward it** for coming out.
3. A cut to the other room, side view again, with David walking out of a tunnel mouth in the back wall.
4. On the Journal map, tunnels into the picture get their own mark (like a little arch), so the maze makes sense.

All of that is the doors system that's already built (`rKitDoor` with Up), plus a new walk-in/walk-out transition. It's not a whole new engine.

## Creatures
- **Bats:** hang from the ceiling, wake when he's close, swoop in a group, and the shield turns them. Some only fly through as a swarm (like the World 3 locusts).
- **Rats:** run along the floor and ledges, come out of holes in groups, nip and run. One stone or a swing of the sword gets rid of each. Bigger nests deeper down.
- Maybe: cave crickets/spiders as harmless background life (like the World 3 hoopoes).

## Art Glen will need (prompts get written in ART_PROMPTS_W4.md once we start)
- 6 to 8 wide cave backdrops (upper, middle and lower looks), with tunnel mouths in the back wall.
- Tunnel mouth pieces (green screen), stalactites, rock ledges, the water surface (a loop), a waterfall, lamps and torches.
- David: walking away from the camera, walking toward it, wading, swimming. Lamp held up, if we do the dark.
- Bats: hanging, flying (a loop), swooping. Rats: running, biting, scurrying out of a hole.
- People of the 400, David's brothers, his father and mother, Gad the prophet, the three mighty men with the water.

## Glen's answers (2026-11-12)
- **Dark, with lamps.** The top level has cracks letting some daylight in. It gets darker and more dangerous the farther down you go.
- **Swimming with a breath meter.** We already have the sprite: `assets/sprites/david_swim.png`, 12 frames, a
  front crawl (made when Part Two's engine was copied in; no game code uses it yet, in either game). Swimming under rocks gets you to
  the deeper places, and the breath meter makes that the challenge. Needs a breath meter on the screen,
  air pockets / surfacing to refill, and probably a treading-water clip for the surface.
- **The 400:** some men are already in the cave when David arrives, and more keep coming as word gets out.
  Side quest: find the newcomers scattered around the cave, greet them (Up), and lead them back to the main camp,
  the other men. A count on the Journal page (like the pomegranates). Going back to the camp shows it getting bigger.
