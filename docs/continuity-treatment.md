# Continuity treatment — September 15, 2026

## Status

The September 15 reference study proposed the routes below; it changed no application code or media at that time. The first painting → departure → Met → shop passage was subsequently implemented locally on September 16. Lucie's approved choices are recorded in `decisions.md`; the later camera routes remain proposals, and no quotation wording, order, or narrative placement has changed.

### Implemented first passage, updated September 29

The original panel is presented in full, with an independently generated empty-perch plate used only during the departure composite. The regenerated v4 bird uses the restored full-body atlas animation. It leans about its toes, turns toward flight, opens its wings and lifts. The original-body cutout study was rejected and rolled back. The desktop panel shifts left for the prologue; the phone lowers it beneath the text.

The approved follow-up adds rain and one painted Met exterior. Rain begins at scroll 7.05, peaks across the first wingbeats, and clears by 14.15. The panel gives way to the wet steps at 8.12–9.55. The exterior camera then expands a measured doorway, whose foreground stone passes around the viewer. The dark depth plate clears at 10.3–11.8 and reveals the retained gallery behind the opening. The bird passes behind the shell at 10.6–14.5. Gallery arrival completes at scroll 14.5, and a cool arrival shade clears by 15.3.

Four added scroll units keep this approach from compressing the reading holds. The later sky passage adds three more the bridge approach adds 3.6, and the return adds 6.0713, so `storyTime` now maps 0–82.1713 scroll units onto the established 0–65.5 story score. Coordinates below are story coordinates unless explicitly labeled scroll positions. After Met arrival their scroll positions are four units later; after the sky passage they are seven units later; after the bridge approach they are 10.6 units later; after the return they are 16.6713 units later. The existing Met framing is still reached at story coordinate 10.5. Source and exact generation prompt: `generations/met-rain-entrance-v1.md`.

The Met's existing 1672 × 941 image supplies both the depth plate and foreground shell. Its doorway is measured at 39.2–53.1% across and 23.9–70.1% down. The shell clips out that opening. From score position 18.0 to 21.3, one camera transform centers and expands the aperture to cover the viewport with 12% overscan. The shop sits behind it and shares the aperture's position and scale; the bird travels toward the opening and is layered behind the shell during entry. These are layered still images with a geometric mask, not generated camera footage or a 3D scene.

One scroll playhead controls the camera, bird path and frame, lighting, and live HTML quotations. Required-world decoding gates preserve the prior complete frame before rendering the latest requested position. Optimized image derivatives retain the source assets. The reading alternative preserves all ten quotations and five gallery works, reserves their image dimensions before loading, and activates for reduced motion, short phone viewports, or world-image failure.

The departure registration and intrinsic-image sizing corrections are implemented and recaptured on desktop and phone. Geometry tests and the production build pass. Paused full-viewport compositions, keyboard restart, and the complete reduced-motion reading fixture were checked; native preference switching and throttled or deliberately failed image requests were not exercised. This status does not claim final whole-artwork approval: the new painted bird still needs flight-cadence and heading review, later destination joins remain scaffold dissolves, and the gallery/return still needs its continuous passage developed. Evidence and remaining checks are tracked in `final-build.md` and `.impeccable/review/verification.md`.

## Reference evidence

Both supplied Instagram reels by `marina_uiux` loaded and played in the browser on September 15. The text-fetch tool could not retrieve them; browser observation supplied the visual evidence. This was inspection of the recorded demonstrations, not testing the underlying websites.

- [Spider / persistent subject](https://www.instagram.com/reels/DXo5eavIATU/): the demonstration presents a large moving spider alongside changing page content. Its caption names Luma AI for visual generation and Replit for the website. The useful principle is continuity of a subject with articulated motion as the surrounding composition changes. The production footage also shows rejected motion attempts, including sliding instead of walking: moving a cutout across the screen is not sufficient to convey locomotion.
- [Castle / continuous camera](https://www.instagram.com/reels/DZr3vmjoVk2/): the demonstration moves between a castle above clouds and a warm interior passage, with website text placed along the travel. The footage describes a 15-second source video and shows content timing against it; the caption describes a scroll-transform animation and Framer component. The useful principle is camera travel through a connected view, with text staged along the route.

The desired Goldfinch experience combines persistent subject continuity with continuous camera travel. User-controlled pacing, backward rewinding, and stillness when scrolling stops remain project requirements; a recorded social video alone does not establish every detail of those runtime behaviors.

## Visual direction

**A continuous flight through a painted world.** Spaces have believable perspective, depth, light, and anatomy. Their surfaces retain the warmth, softness, grain, and brush quality of the current environments. Surrealism comes from a bird leaving paint and distant locations connecting through impossible but visually coherent passages. There is no need for a separate explanatory narrative about memories.

The novel's locations remain recognizable anchors, and Lucie's favorite quotations remain the literary structure. Their geographic separation does not require abrupt visual separation. A camera can keep travelling in a legible direction while the world changes around a doorway, foreground object, or frame.

Continuity must be designed into both assets and choreography. Matching camera direction, horizon, subject heading, and entry/exit composition matters more than increasing crossfade duration.

## Proposed passage structure

### Painting → departure → Met

Present the complete Fabritius panel clearly, then move toward the bird and chain alongside the existing prologue quotations. Match the living bird to the painted bird before departure so the handoff does not create two unrelated birds. Let the camera follow its movement across the edge of the panel into museum space. Preserve the real original painting; any edited working layer is an explicitly separate compositing asset.

### Met → Hobart & Blackwell

Keep the museum's existing emotional change. Establish a doorway or dark architectural edge that approaches the camera. While that foreground form occupies the view, connect its perspective and direction to the shop's passage. Reveal the existing warm shop composition with the bird still in a coherent part of the flight path. The transition needs matching framing; it cannot be assumed to work with two arbitrary existing crops.

### Shop → Las Vegas

Implemented as a focused September 29 study after Lucie's approval. The bird makes a shallow climb as the last shop quotation clears. Lucie approved the movement, then selected generated glass-front cabinet option 3 for a more recognizable furniture silhouette. Its doors and shelves pass right to left, and the environment cut stays behind the central door stile. The shop camera tracks a little right; the Vegas camera eases from a closer crop into its existing broad view. A short warm shade clears with the foreground. The foreground passes in front of the bird so the spatial handoff has a physical cover.

The source is the selected 1024 × 1536 cabinet study, shipped as a 353 kB WebP with alpha. The whole width is retained and y=128–1376 supplies the body crop. Scale remains uniform, with the door handles inside the vertical camera crop. The cut tracks source x=490; an opaque backing within the solid cabinet prevents the generated image's slight transparency from exposing it. The movement runs at story coordinates 28.35–29.95, with the Vegas camera settling by 30.65; visible scroll positions are four units later because of the rainy entrance. The original Vegas day/dusk pair, quote wording and reading intervals remain intact.

`src/shop-passage.js` contains the camera, crop and cut geometry. Readiness checks require the shop, foreground crop and Vegas images together before showing this passage. The reading alternative still presents the complete original scenes and quotations.

### Las Vegas → Amsterdam

Implemented as the September 29 sky study after Lucie approved the climb-and-descent proposal. Vegas's city lights drop below the camera, the bird climbs into the painted dusk, the sky cools during the crossing, and the camera descends toward the Amsterdam rooftops, bridge and reflections. The existing dusk and canal paintings are the only sources.

The journey occupies scroll 38.5–43.2, mapped onto story 34.5–36.2. This adds three scroll units inside a quotation-free interval. The physical scroll distance per unit remains unchanged, preserving every reading hold. Climb ends at 40.1; the sky-only blend runs to 41.45; descent completes at 43.2 before the Amsterdam quotation appears.

Clear-sky windows are normalized image rectangles: Vegas x=.38–.72, y=.04–.30; Amsterdam x=.46–.68, y=.07–.30. Camera coverage and overscan keep both visible crops inside those windows throughout the blend. A bounded canvas draws image source rectangles at the viewport dimensions, capped at 1.5 device-pixel ratio. The normal image layers resume at the endpoints with matching scale and scene grades. The bird's climb offsets, scale and angle settle onto its retained route. No snow, whiteout, new media or independent animation is added.

### Amsterdam → gallery

Implemented as a focused September 29 study after Lucie approved traveling beneath the central bridge arch. The existing 1672 × 941 canal painting supplies the foreground. Its opening is traced inside the lit stone lip, with a conservative inner rectangle at x=654–750, y=603–643. The camera aims at its centre and advances with reciprocal depth. Source cropping stays within the image at desktop and phone sizes. A viewport-sized canvas, capped at 1.5 device-pixel ratio, erases only the tunnel opening, with a 1.25px feather. The gallery sits behind the actual masonry.

Scroll 46.9–51.4 maps onto story 39.9–40.8, adding 3.6 units after the Amsterdam quotation. The tunnel opens at 48.15–49.25; the stone has fully left the viewport by 50.65. The first painting approaches from scale .72, and its shadow clears by 51.4. The bird recedes into the arch, passes behind the stone, and settles at 87% viewport height beneath the first painting. It stays below the full gallery quotation and begins rising into the frame once the text clears. All five viewing intervals and quotation holds retain their physical scroll distances. Both worlds decode before this passage appears.

### Gallery → painting, implemented September 29

Lucie approved finishing the return after loving the bridge passage. All five real artworks keep their order. The gallery's 2.2-unit steps now hold still through the outer 28% of each interval and travel through the middle 44%. Portraits and wide works share a maximum viewing height. The bird stays at the lower gallery route through the complete gallery quotation.

The empty frame has an actual border and a 1638/2500 inner aperture. At scroll 66.6–69.0, the gallery wall is clipped around that measured opening, and the empty-perch panel behind it uses exactly the same dimensions and position. The frame grows with reciprocal depth until its opening covers the entire viewport with 12% overscan. It clears before the camera retreats to the complete painting by 71.7. This is a physical aperture passage through retained imagery, without an overlapping gallery-to-painting dissolve.

The bird crosses the opening, follows the retreating camera, and starts folding at scroll 70.56, which is a frame-4 wingbeat boundary. The full-body takeoff poses run backward to the resting pose by 72.25. A shared `perchRegistration` function gives departure and return the same foot contact. The last rest pose uses the original painted bird, as in the earlier landing polish; the preceding generated poses use the slimmer v4 anatomy. The original background returns at 72.26–72.34 while that pose stays opaque; the original panel then takes over. The closing quotation begins at 75.3713 after an additional viewport of scrolling on the restored painting. The added 6.0713 units map to the existing quotation-free story interval 56–58.7. All quote wording and reading distances remain intact.

The chain remains visible in the source painting. The ending keeps comfort and tether together without resolving the meaning. Lucie will review the entire journey before any copy or quotation edits. No new imagery or runtime dependency belongs to this pass.

## Asset and construction approach

- Keep existing environments as the destination compositions and visual references. Discuss concrete replacements with Lucie before producing them.
- Add only the connecting material required by the camera route: foreground masks, extended edges, threshold views, and potentially short pre-rendered camera passages where a layered still cannot support the move.
- Develop a bird that works at its intended displayed scale, including departure, flight, turns, and return. Judge anatomy, edge quality, light, and continuity across adjacent frames against both dark and pale scenes.
- Start with layered imagery and masks. Use a small technical study to determine where generated camera footage or WebGL actually improves the result; the reference authors' tools do not prescribe this project's stack.
- Keep quoted text as HTML above the visual stage. Stabilize composition during reading intervals; the visitor retains control and can pause or reverse anywhere.
- Build one unified scroll mapping. Frame selection, subject path, camera, and text must agree during forward travel, stopping, and reversal.

## First implementation milestone

Build the opening → departure → Met → shop passage, including its quotation holds and the location-to-location connection, on desktop and mobile. This must prove more than the bird leaving the painting: it must demonstrate how two existing environments can become one continuous passage. Evaluate it for actual continuity before extending the treatment across the whole piece. The existing mockup remains useful as a content and asset inventory, while its construction can be replaced.
