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

## The map Glen liked (2026-11-12)
```
 UPPER (cracks of daylight)   Cave Mouth | The Camp (400) | Lamp Hall (1) | Bat Roost
 MIDDLE (dark, lamp only)     Rat Warren (1) | The Narrows | Crumbling Ledges (2)      Old Well Shaft (tall, down to the water)
 LOWER (water, darkest)       Underground River (2) | Flooded Tunnel (swim) | The Deep Pool | Hidden Spring
```
(1)/(2): tunnels through the back wall that join rooms not next to each other; on the Journal map, matching numbered arches.
Order of play: Mouth, Camp (family, 22:1), Lamp Hall (get the lamp), middle (rats, bats, newcomers, oil), Well Shaft down,
lower (swimming, breath), Hidden Spring (Bethlehem's water, 2 Sam 23), back to a full camp, Gad: on to Keilah.

## The look: far / mid / near, like David 1's caves
Every cave room gets three painted layers that scroll at different speeds (Super Mario World): **far** = the back wall
of the chamber (slowest, jpg), **mid** = columns, stalactites, rock shelves (png, see-through), **near** = the rubbly floor and
rocks in front (png). That's how Part One's caves.js draws its caves (assets/backgrounds/cave_far/mid/near), and the
stages use the same three layers (main.js BG, BG_LAYER_HEIGHTS).
**Already in Part Two** (copied with the engine, game/caves.js): the cave layers, Glen's turn-around clips
`david_turn_away` and `david_walk_away`, `david_light_lamp`, the lamp's circle of light burning olive oil, `bat_hang` / `bat_fly`.
So the into-the-picture tunnels and the dark with the lamp mostly already exist. New for World 4: a set of layers for each look
(upper with light shafts, middle, lower with water), the water itself, rats, swimming, the breath meter, the 400.

## Ledges that match (Glen 2026-11-12: "rock ledges and stuff to match the color and topography of the caves")
For each look (upper, middle, lower), a kit of separate pieces cut from green screen in the same rock color and lighting as that
look's layers: ledges (short, long, sloped), stalagmite pillars, rock steps, a crumbling ledge (falls when stood on), a hanging rock shelf
under the ceiling, a narrow crack to squeeze through, and wet slick rock for the lower level. Placed the way the World 3 kit is
(kitImg / platAt: the drawn top of a piece is where he stands). Prompts: generate the far/mid/near layers first, then make the
ledges "in the same rock and light as this picture" from them, so the colors match.

## Glen's cave art so far (Desktop/david-sling-2-art/caves, sorted 2026-11-13)
Light, from the top down: daylight (limestone) -> sunbeams through the roof -> orange glowing cracks -> cold blue -> teal water.
- Cave Mouth: set5_far_cave_mouth_hills (the hills outside, a pool, a tunnel on to the right). Road there: set5_far_outside_canyon
  (far; the cave in the cliff), set5_near_outside_rocks_whitebg (near; white background, maybe).
- The Camp: set5_far_limestone_hall. Bat Roost: set5_far_light_shafts.
- Lamp Hall (darker): set1 far/mid/near (orange cracks), set2_stairs_to_tunnel (the way down, Up to go in).
- Middle: set2_far_tunnels (tunnels into the picture), set3_far_four_arches (pick-a-tunnel maze room),
  set3_ledge_stairs_piece (playable ledge). Maybe: set2_mid_stairs_columns, set3_mid_stacked_stairs (only as real climbable rooms).
- Lower: set5_far_underwater_tunnel and set4_far_pool_underwater (swimming), set4_far_pool_underwater_wide (flatter style, maybe),
  set4_far_lake_hall (Hidden Spring, the end). Skipped: set4_cutaway_lightning.
Still needed: mid/near layers for middle and lower, water surface loop, waterfall, rats, bats, David walking toward the camera.
