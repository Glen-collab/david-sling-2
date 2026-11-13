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
- Tall rooms (set6, 800x3200 shafts, 1120x2240 walls; painted ledges become platforms, measured from the art like w3_trunk_full):
  Old Well Shaft = set6_shaft_sunlit_ropes (sky at the top, pool at the bottom) over set6_shaft_sunlit_far_mist.
  Upper climbing wall = set6_wall_limestone_ledges over set6_wall_far_mist. Middle = set6_wall_dark_ledges_grass,
  set6_shaft_purple_thorns (danger shaft). Maybe: set6_shaft_planks_dark (paint out the carved swirl blocks: not Israel).
  Skip: set6_shaft_blue_thornrings (fantasy thorn wreaths).
- Kit (set7): set7_ledges_five_colors: ledges small/medium/large + rock piles in 5 rocks: dark (middle/lower),
  red-brown (Lamp Hall, orange cracks), sand and pale (upper: Cave Mouth, Camp, limestone), mossy (by the water).
  set7_props_sheet: stepping stones, stalactite, stalagmites, oil lamp (the lamp David carries / lamps to refill at), big storage jar,
  pitcher, small pot, basket, waterskin, bedroll, bowl, bread, sling-bag: the Camp of the 400, the water from Bethlehem (pitcher/waterskin).

## Built 2026-11-13 (game/adullam.js, "#9-8", Play World 4, Adullam (test).bat)
All 13 rooms: Cave Mouth -(tunnel)-> Camp (sunbeam hall) -> Bat Roost (tall) -> Lamp Hall (the lamp; stairs down) ->
Rat Warren -> Four Tunnels -(3rd arch)-> Crumbling Ledges (tall, up) -(top tunnel)-> Old Well Shaft (down) -> Underground
River -> Flooded Tunnel -(tunnel under the water)-> Deep Pool -> Hidden Spring (Gad, 22:5).
Working: Up-arrow tunnels (r4Tunnel; to: null = a side cave still to make: camp, roost top, warren x3, four tunnels x2);
the dark with the lamp burning olives (R4.DARK); swimming with a breath meter (R4.SWIM, Glen's david_swim); bats, rats;
painted ledges measured from his pictures (r4Painted) plus kit ledges where a gap was too big. On the land map after Gath.
Not yet: the 400 / people, side caves, treading-water clip, a way back up the well, the end scene.

## Rework after Glen's first play (2026-11-13)
Glen: the pictures too blown up next to David, rooms too quick, stuck in the Crumbling Ledges, painted jars he couldn't
break, standing on air on painted ledges, no floor. Then: "the whole cave isn't that big. We can make small areas", and
his floors (set8_floor_limestone / sandstone / dark / pebbles, set8_near_rockpile).
- His pictures now far off and small (R4.BG: half size, slow scroll, mirrored tiles, shaded; the roof going dark over
  them); stalactites along the top, rubble just behind David (make_w4_layers.py), his floors under him (r4Floor).
- Every ledge he can stand on is a kit ledge (r4L; tall rooms: r4Zig zigzags). No painted ledges are walkable now.
- Jars: rBreak jars (r4Jar) in every room, many in the Camp and the Hidden Spring.
- Tunnels by id (r4Tunnel id -> id), each with a mouth cut from his pictures (w4_arch, w4_arch_sand, w4_tunnel_lit);
  every tunnel goes both ways; the Crumbling Ledges open at the left to the Four Tunnels; the well's top tunnel goes back.
- Fixed: the dark never showed (its canvas was made before the screen was).
Art that would help: real green-screen tunnel mouths (one per rock color), and the camp's people.

## Long rooms and Glen's panoramas (2026-11-13, later)
Glen: "Make the rooms long and fun. Each room should be like a level in a game ... not just a pass through. Those are only
side rooms." The main rooms are now levels (Mouth 150, Camp 110, Lamp Hall 172, Warren 190, Four Tunnels 120, River 170,
Flooded 130, Deep 170, Spring 90): drops in the floor (r4Pit, some with a floor that gives way), stepping stones, runs of
ledges up and along (r4Run), rat nests, bats, olive presses partway, a pomegranate in each. In the water rooms the rock
comes down into the water (r4Lid): swim under it on your breath. The side caves (to: null tunnels) will be the small rooms.
Pictures: his 4:1 panoramas cut and rejoined with his middle pieces between (tools/make_w4_panos.py; set9_*), one per room,
floor to roof, spread over the whole room (R4.FILL_P). His tall 1:2 pictures (set10_*) in the climbing rooms; the well's twice.
Glen is making tileable middles: add them to LONG in make_w4_panos.py.
Fish (Glen's two sheets and his clip, tools/make_w4_fish.py; R4.FISH): tilapia and perch swim back and forth, the biter
darts at David when he's in the water near it and bites (jaws open: the end of his clip). A touch costs health. In the
River, the Flooded Tunnel and the Deep Pool, two biters by the long rock in the Deep Pool.

## The loop back and the secret way (2026-11-13, Glen: "so I am not all the way at the end and no way back")
- The Deep Pool is under the water now (waterline 170): rock over it nearly all the way, air at 0-10, 38-44, 74-80, 110-116,
  146-152, 162-170. Fish, olives on the bottom, the pomegranate under the long rock.
- The Hidden Spring opens at the right onto The Long Climb (tall, dark), up to the Four Tunnels' fourth arch (n4).
- Halfway up the Long Climb, a secret crack (no arch, no Up arrow; "Cool air is blowing..." when he's near): down to
  Beneath the Warren (130, rats, drops, a pomegranate), then right into The Shaft to the Camp, up to the Camp's side cave.
- Still rubble (not open yet): the Bat Roost's top, the Warren's two side caves, the Four Tunnels' second arch.
- (later, Glen: "Drop the pool down underneath the flooded tunnel ... connect it to the hidden spring going left") The map's
  bottom row: Long Climb | Hidden Spring | Deep Pool (under the Flooded Tunnel). In from the Flooded Tunnel at the Deep
  Pool's right end, swim left to the Spring, on left to the Long Climb. The map is 28 cells wide now (was 36).
- (later, Glen: "Hidden spring should go left all the way to four tunnels and then go up from there. Then there is a secret
  to connect it to beneath the warren") The Spring is long now (220): in from the Deep Pool at the right, left along the
  shore to the Long Climb (under the Four Tunnels), up to the fourth arch. The crack partway up the Climb comes out at
  the right end of Beneath the Warren; its left end opens onto the Shaft to the Camp.
- (later) Glen's rubble piles (set11, make_w4_rubble.py) in front of the side caves not open yet. Rubble across the way
  from the Shaft to the Camp into Beneath the Warren: shut until he's been up the Long Climb, then Up with Goliath's sword
  breaks it for good (r4.wall, "r4_wall_under"). The map's edge gaps on tall rooms are at their bottom cell now.
- Water: A near the surface leaps him out (R4.SWIM.LEAP 1050, onto the ledges); the sword works in the water and gets rid
  of a fish (back when he comes back into the room). The Truth at the far end of the Flooded Tunnel: Psalm 142:5.
- (Glen: "David's heart health is too much ... If he dies he dies") all of Part Two: the meter 2 px a point (was 4); every
  4 pomegranates +5 (was +10); each strength level +2 (was +5).
- Part One's World 3 pit-trap check (world3.js) is off in the regions (it killed him beside the rubble wall).
- Side rooms (Glen approved): The Bats' Nook (top of the Bat Roost; Truth, Psalm 57:1), The Rats' Larder (Warren's first
  side cave, rubble: Goliath's sword; a pomegranate), The Fallen Stones (Warren's second, rubble; a stone of remembrance),
  The Oil Store (the Four Tunnels' second arch; an oil jar). r4Tunnel(..., rubble = true): Up with the sword breaks it.
- The map (Glen): the Crumbling Ledges on top of the Four Tunnels, the Old Well Shaft 2 wide, the side rooms along the top.
- The Lamp Hall: Glen resaved lamp/mid.png (full-height columns) and kit/w4_stairs_tunnel.png (708x640; his original kept
  as david-sling-2-art/caves/set2_stairs_to_tunnel_glen_resave.png, the game's copy with its right and bottom edges softened).
