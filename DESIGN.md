---
name: Flight of the Goldfinch
description: A scroll-controlled journey through a painted, filmic world.
colors:
  night: "#14100c"
  panel-shadow: "#4c4032"
  umber: "#645c4f"
  feather: "#a0917a"
  plaster-mid: "#c8bead"
  plaster: "#d8d0bf"
  gilt: "#c9a24b"
  reflection-gold: "#e4c579"
  quote-ivory: "#f0eadf"
  room-umber: "#30271e"
  museum-light: "#e9c99512"
  museum-shadow: "#100f0c"
  shop-light: "#e6bc7214"
  vegas-heat: "#6c331521"
  canal-shade: "#080c1442"
typography:
  display:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(3.3rem, 5.8vw, 6rem)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.03em"
  quote:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(1.4rem, 2.2vw, 2.35rem)"
    fontWeight: 400
    lineHeight: 1.27
    letterSpacing: "-0.015em"
  gallery-quote:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(1.4rem, 2.35vw, 2.4rem)"
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: "-0.015em"
  closing-quote:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(1.4rem, 2.3vw, 2.4rem)"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.015em"
  opening-credit:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(0.7rem, 0.86vw, 0.84rem)"
    fontWeight: 400
    lineHeight: 1.7
  reading-quote:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(1.5rem, 3vw, 2rem)"
    fontWeight: 400
    lineHeight: 1.45
  apparatus:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "0.72rem"
    fontWeight: 600
    letterSpacing: "0.12em"
  reflection:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontStyle: italic
    fontSize: "clamp(1rem, 1.18vw, 1.16rem)"
    fontWeight: 400
    lineHeight: 1.55
  personal-passage:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontStyle: italic
    fontSize: "clamp(1.1rem, 1.65vw, 1.5rem)"
    fontWeight: 400
    lineHeight: 1.6
  speaker:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "0.8rem"
    fontWeight: 400
    lineHeight: 1.5
  artwork-title:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "0.9rem"
    fontWeight: 400
    lineHeight: 1.45
components:
  restart-button:
    backgroundColor: "transparent"
    textColor: "{colors.gilt}"
    typography: "{typography.apparatus}"
    rounded: "0"
    padding: "0.9rem 0.25rem"
  restart-button-hover:
    textColor: "{colors.plaster}"
---

## Overview

**Creative North Star: “The world inside the panel, filmed on old stock.”**

This is an Experience surface. The interface withdraws so the visitor inhabits one continuous artwork. Scenes retain real architecture, perspective, light, and spatial depth, but the final impression is a painting seen through haze, grain, warm varnish, and time.

The bird is the visual continuity device. Camera, bird path and wingbeat, lighting, and text share one reversible scroll playhead. The implemented passage travels from the panel through rain and the Met entrance, into the gallery, through its doorway into the shop, past close woodwork into Vegas, through the dusk sky into Amsterdam, and beneath its illuminated bridge into the art gallery. The gallery now passes through the empty frame and returns to the original panel with a registered landing. The current bird cycle remains a study asset for final artistic review.

**Key Characteristics:**

- Old-master warmth interrupted by the cold canal blue of Amsterdam.
- Crisp literary typography floating over atmospheric imagery.
- Camera travel through retained painted architecture, controlled by scrolling.
- Real paintings presented as themselves in the gallery finale.

## Colors

The incumbent palette is sampled from the Fabritius painting and extended only where the narrative requires it. The tokens above record the current CSS surface; red wax and canal blue remain colors within the retained imagery, rather than additional interface tokens.

### Primary

Gilt marks the scroll arrow, selection, restart control, and the fine frames around Lucie's personal reflections. The literary quotations keep their ivory ink. Personal commentary uses a lighter gold for readable body text.

### Neutral

Night and panel shadow form the surround. Room umber lights the opening room and supplies dark gallery-quote ink. Plaster, plaster mid, and feather carry the supporting text and gallery wall; quote ivory carries quotations over the darker scenes. Umber remains an incumbent root token.

### Scene light

Museum light is a transparent warm wash over the retained image; museum shadow darkens that same world during its emotional change. Shop light is a bounded lamplight glow. Vegas heat tints the lower image, while canal shade darkens the lower Amsterdam view. Each overlay belongs to its own world and clears with that world. The sidecar records the actual gradient and grading treatments.

**The Scarcity Rule.** Gilt, red wax, and canal blue earn attention because they are rare. Do not distribute them evenly through the experience.

The closing colophon has a maximum width of 29rem. Literary/artwork credits and creative-direction credit share one paragraph.

## Typography

The October 1 copy pass separates the literary quote, the fictional speaker label, and Lucie's personal reflection. Reflections sit beneath quotations with a 1.5rem gap, use Source Serif 4 italic, and retain a maximum 52ch measure. Commentary is pale gold (#e4c579), separate from the ivory literary text. Its gilt frame has foliate corners and open fine rails drawn in a scalable SVG border. The dark fill remains 60% opaque (#17120e99). There is no repeated visible author label. The flight invitation is plain text without a frame or background. The personal opening and standalone transition thoughts use the larger personal-passage role. On phones, reflections use 1rem/1.5, the introduction uses 1rem/1.55, and the main quotation uses clamp(1.25rem, 5.3vw, 1.65rem). Speaker labels use .75rem on phones and a dash before the approved full name. These additions keep the existing all-serif identity.

EB Garamond carries the title and every word quoted from Donna Tartt. Source Serif 4 carries apparatus such as the opening credit, colophon, and restart control. No sans-serif is used.

Quotes remain live HTML and use a readable, balanced measure. They appear without repeated bylines because the opening establishes the source once.

### Hierarchy

- **Display:** italic EB Garamond for the title, with the desktop scale in the frontmatter. At widths through 720px it uses `clamp(2.8rem, 9.8vw, 3.8rem)` and line height `0.94`.
- **Quotation:** regular EB Garamond with scene-specific placement. Phone quotations use `clamp(1.32rem, 5.7vw, 1.85rem)` and line height `1.3`.
- **Long passages:** the gallery has its own quieter scale and a 500-weight final emphasis. The close is italic. On phones their sizes become `clamp(1.25rem, 5.3vw, 1.7rem)` and `clamp(1.22rem, 5.15vw, 1.65rem)` respectively; the closing line height is `1.42`.
- **Apparatus:** Source Serif 4 for credit, cue, colophon, captions, and restart. The frontmatter's apparatus role describes the restart control; opening credit has its own scale. Its phone size is `0.65rem` with line height `1.55`. The cue is uppercase with `0.15em` spacing (`0.68rem`, or `0.62rem` on phones).
- **Linear reading:** EB Garamond quotations use the reading scale with a maximum measure of `42rem`; they remain normal document content. Its centered italic title uses `clamp(3rem, 7vw, 5rem)` and line height `1`.

**The Two Voices Rule.** Literature and apparatus may differ in scale, case, spacing, and posture, but never introduce a third typographic voice.

## Layout

Personal note frames use 1.3rem 1.8rem padding on desktop and 1.1rem 1.4rem on phones. Quote-linked notes begin appearing at quote start + .62 score units and finish at + .96, after the quote's .5-unit entrance. Their opacity is a function of scroll, with no delayed timer. The opening phone painting fits within the measured space beneath the note with a 24px gap and a 2.5% lower margin. Met, shop and Vegas phone flight positions also account for the complete note height.

The October 1 editorial layer maps 20.5 additional reading units onto the unchanged travel score. Opening, gallery introduction and closing thought have separate intervals; quotation/reflection pairs receive longer distances. This map is deterministic in both directions. On phones the opening panel reduces to 60% of its former dimensions beneath the prose, then regains its exact takeoff registration before the bird appears. Artwork labels sit outside the frames: title above, artist below. The opening frame fades before the first reflection and the cue now has a downward SVG arrow. Flight size is 1.242 times the original, another 15% above the prior 8% increase. This addition tapers to zero at departure and landing. The restart uses a separate 1254px transparent bird for its close pass, with the existing atlas as a loading fallback.

In cinematic mode the viewport is a fixed stage. A scroll space of approximately `4491.1396vh` drives one GSAP playhead from 0 to 82.1713 in scroll units, not elapsed seconds. Its height comes from `END` and the existing 53.438849vh per scroll unit, so each reading hold keeps its physical distance. A `storyTime` mapping adds four units to the rainy entrance, three to the sky passage, 3.6 to the bridge approach, and 6.0713 to the return while retaining the established 0–65.5 story score and all quotation holds. ScrollTrigger maps its progress directly to the reading score, with Lenis smoothing the scroll input. A coordinated resize remeasures both systems and restores the same score position. A short-window mode change shows the corresponding passage in the reading article, then restores the cinematic position when the window is tall enough. The latest resolved position supplies every visual channel. A required-world image gate retains the previous complete composition until the requested world has decoded, then renders the latest requested position.

The complete Fabritius panel starts beside the title on desktop and below it on phones. A separately generated empty-perch derivative replaces the bird-bearing plate during departure. The generated bird registers to the upper perch, leans forward, opens its wings and lifts. Rain arrives after the prologue and thickens across the first wingbeats. The departing panel reveals a generated wet Met entrance at scroll 8.12–9.55. A measured doorway in its foreground stone grows around the visitor and reveals the retained gallery. Arrival completes at scroll 14.5 (story score 10.5), with the gallery's original 1.13 camera scale. A blue-grey arrival shade clears by scroll 15.3 so the existing warm light can return.

The entrance uses one 1672 × 941 JPEG twice, as depth and foreground shell. Its camera centres the door on phones and keeps the upper steps visible. A bounded canvas at up to 1.5 device-pixel ratio draws no more than 480 rain strokes. Rain positions and near-camera haze are deterministic functions of scroll; nothing moves while paused. Weather clears by scroll 14.15. The bird passes behind the entrance shell during the threshold crossing, then resumes its existing gallery route. This remains a composition study, not a literal museum floor-plan reconstruction. Asset provenance and the exact prompt are in `generations/met-rain-entrance-v1.md`.

The Met image is split into a depth plate and a foreground shell with its measured doorway cut out. Both share one cover-sized plane. Camera scale and translation grow that real aperture to cover the viewport while the shop sits behind it; the bird passes behind the shell during entry. This first passage uses layered still images and a clipped foreground, not a rendered 3D environment. Exact geometry and milestone limits belong in `docs/continuity-treatment.md`.

The shop exits laterally into Vegas at story 28.35–29.95. Lucie selected the generated glass-front cabinet (option 3) after approving the movement. Its 1024 × 1536 image retains the complete width; the vertical crop is y=128–1376. Uniform scale gives the solid body at least 64px of vertical overscan. Both door faces, brass handles and shelves pass through the view. The environment cut sits behind the central stile at source x=490; an opaque backing lies within the solid cabinet body to close the source's slight alpha transparency. A .6px depth blur, silhouette shadow, saturation .82 and brightness .88 retain readable detail. The shop camera tracks slightly right; the Vegas camera opens from scale 1.16 into its established view and settles by story 30.65. A brief umber arrival shade clears by 30.2. A shallow bird climb has zero offset at both ends and joins the existing flight route. No added timeline units or quotation edits belong to this passage.

Vegas-to-Amsterdam runs at scroll 38.5–43.2, inside the gap between their quotations. The camera climbs into a measured clear-sky region of the existing Vegas dusk image by 40.1. The two painted skies blend through 41.45; only then does the camera descend to the retained Amsterdam composition. A small lateral drift carries the crossing. The bird climbs, recedes slightly, levels out, and descends onto its existing route. A viewport-sized canvas at up to 1.5 device-pixel ratio draws only the required image crops, which avoids oversized transformed layers. Both source images must decode before the passage begins. Ground grading leaves with Vegas and returns with the canal; no snow, new imagery or autonomous motion is added.

Amsterdam-to-gallery occupies scroll 46.9–51.4, mapped onto story 39.9–40.8. It adds 3.6 units after the canal quotation. A viewport-sized canvas draws the retained canal image with an opening traced just inside the central arch lights. Uniform camera scale advances through that opening; the final crop fits fully within the measured inner rectangle before the shell clears at 50.65. The first painting grows from scale .72 to 1 behind the arch, and a warm tunnel shade clears by 51.4. A 1.25px mask feather matches the painted stone edge. The bird recedes into the opening, passes behind the masonry, and emerges at 87% viewport height beneath the first painting. It remains below the gallery quotation and begins rising into the empty frame only after that quotation ends. Both worlds must decode before the passage appears; canvas size is capped at 1.5 device-pixel ratio. No new image or dependency is added.

Quotes are positioned compositionally against each scene rather than within a repeating section template. Desktop placements occupy roughly 33–40% of the viewport width, with the two final long passages centered. Quotation intervals provide readable holds under visitor-controlled pacing.

Desktop and mobile carry the same complete narrative. At widths through 720px the title centers above the panel, the long prologue stays above the lowered painting, and most quotes use 84% of the viewport width. Panel sizing, flight scale, artwork scale, crop, and quote positions respond to the viewport.

The gallery is a horizontal passage within the vertical scroll timeline. Each 2.2-unit step holds its artwork at the centre for the outer 28% of the interval on either side; travel uses the middle 44%. Images retain their natural proportions with a maximum height of min(58vh, 560px), or min(51vh, 480px) on phones, and maximum width of 72vw or 75vw. This keeps the wide works within the same viewing height as the portraits.

The empty frame has a real 15px border (11px on phones), with an inner ratio of 1638/2500. At scroll 66.6–69.0, a measured rectangular aperture in the gallery wall expands with that frame. The existing empty-perch image sits behind it at the same position and dimensions. The aperture covers the viewport with 12% overscan before the gallery clears. The camera settles onto the complete panel by scroll 71.7. The bird begins folding its wings at the frame-4 boundary of 70.56 and reaches its original departure toe anchor at 72.25. The final resting pose samples the original painted bird. It stays opaque during the background handoff at 72.26–72.34, then the untouched full image supplies the identical silhouette. The closing quotation begins at 75.3713, with one extra viewport of scrolling added to the restored-painting hold. The added 6.0713 units preserve both long reading holds. No new image, canvas or runtime dependency is added.

Reduced motion, short viewports at most 520px high and 1000px wide, and failed world-image loading select a complete linear reading view. It uses normal page flow, a container of `min(90%, 58rem)`, all ten quotations, all five real gallery works with captions, and the restart control. Intrinsic image dimensions reserve image space before decoding. The stage is hidden from assistive technology; the reading article supplies the semantic narrative even during cinematic mode. This fallback needs JavaScript to construct the article.

## Elevation & Depth

Depth comes from the imagery, a soft vignette, bounded light overlays, and restrained shadows beneath the painting and framed artworks. The body retains the original painting colors throughout the journey. Only the separate atlas wing layers use saturation 0.9 and brightness 0.96. It has no separate drop shadow. Avoid glossy interface elevation. Shadows should feel cast inside the depicted space rather than added as UI decoration.

### Shadow Vocabulary

- **Panel:** `0 14px 42px #09070580` places the Fabritius panel against the dark room.
- **Gallery frame:** `0 10px 25px #35241652` keeps the artworks and empty frame on the wall.
- **Literary legibility:** `0 2px 22px #080604bd` supports quotation ink over scenes; the pale gallery uses dark ink without this shadow. The first Met quote and Vegas quote also have localized blurred darkness behind them.

## Shapes

The dominant shapes are the rectangular painting panel, traditional gallery frames, and organic bird silhouette. Controls remain typographic and restrained. Do not introduce rounded-card geometry, pills, or app-like containers.

## Components

### World layer

A cover-sized image plane with scene-specific crop and a warm, muted grade. Met and shop additionally use the shared doorway camera described above. Additional light or darkness overlays must serve the location and must not leak into the following world. Future continuous joins must be developed and reviewed; the later dissolves are implementation scaffolding.

### Quote

Live EB Garamond text with scene-specific placement. Each literary blockquote has a smaller Source Serif 4 speaker label. Lucie's reflections are sibling paragraphs, never part of the literary blockquote. Short quotations pass through the timeline; the two long passages receive deliberate reading holds. Opening reflections and the long prologue fit above a contained, smaller painting on phones. Met, shop and Vegas pairings have localized dark backing for legibility; their phone bird routes dip below the text.

### Bird

A 576 × 576 transparent canvas retains the central 384 × 384 scene coordinates and 96 pixels of padding on each side. The renderer draws one complete pose from the generated v4 atlas. It restores the full-body animation that preceded the rejected original-body cutout study. The new source art has a slimmer torso and longer tail, with a progressive head turn toward rightward flight. Native generated alpha supplies the edges. Source crops and anatomical landmarks are measured for this version; uniform .94 normalization fits it into the existing bird coordinates.

The original takeoff beats remain 7.58, 7.95, 8.16, 8.39 and 8.56. A brief closed-wing registration holds head, tail and toes through the first lean. Open-wing poses use only rotation and uniform scale. Twelve complete flight poses play once per scroll unit; one opaque pose is drawn at a time. Landing reverses those poses from the frame-4 boundary at 70.56. Only the final rest pose samples the original painting, as in the earlier landing polish. It stays opaque through the short background restoration. The longer closing hold remains.

The atlas must decode before drawing. Pose, path and camera depend only on the scroll position. The source-art pass awaits Lucie's visual review. Earlier atlases and the original 33-frame cycle remain preserved as sources. Generation mode, exact prompts and provenance are in `generations/goldfinch-painted-atlas-v4.md`; the renderer is `src/bird.js`.

### Gallery track

A horizontal sequence of the five real artworks in the locked journey order, followed by one intentional empty frame. No generated substitutes or decorative filler works.

### Reading article

A complete semantic copy of the opening, existing quotations, environment images, and real artworks. Reading images defer their sources until this mode is selected and use native lazy loading with explicit intrinsic dimensions. Gallery captions come from the existing artwork labels. Image failure exposes a status message alongside the available text.

### Restart control

An uppercase Source Serif 4 button at the colophon with gilt text and a gilt underline. Fine-pointer hover changes the ink to plaster; keyboard focus has a gilt outline offset by 6px. Active press scales to `0.97` with a `160ms` transition. Pointer activation in cinematic mode plays a 1.65-second close bird pass using the existing atlas. Its warm opaque shadow hides the immediate reset at 52% of the pass. The canvas is bounded to the viewport at up to 1.5 device-pixel ratio, receives input only during the wipe, and clears afterward. Keyboard activation, reduced motion and reading mode return immediately. Focus moves to the semantic opening heading. Reduced motion disables CSS transitions.

## Do's and Don'ts

### Do:

- **Do** make every transition feel continuous and reversible.
- **Do** preserve real perspective and photographic light beneath the painted treatment.
- **Do** keep the bird visually consistent and motionless when the visitor is motionless.
- **Do** let the gallery paintings remain clear, real, and unobstructed.

### Don't:

- **Don't** divide the experience into visible chapters or navigable scenes.
- **Don't** add sound, a progress indicator, or a return-to-Hijinx link in this iteration.
- **Don't** perform snow, a whiteout, or other literal effects in Amsterdam.
- **Don't** bake quotations into imagery or repeat their attribution after every passage.
- **Don't** add motion that continues independently of scrolling during the journey. The user-triggered restart wipe is the sole approved exception.
