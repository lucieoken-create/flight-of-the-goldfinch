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
  gold-deep: "#986111"
  gilt: "#c9a24b"
  red-wax: "#70453c"
  canal-blue: "#33445f"
typography:
  display:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(2.25rem, 5.2vw, 5rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.02em"
  quote:
    fontFamily: "EB Garamond, Georgia, serif"
    fontSize: "clamp(1.45rem, 2.45vw, 2.55rem)"
    fontWeight: 400
    lineHeight: 1.28
    letterSpacing: "-0.01em"
  apparatus:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "0.72rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "0.13em"
components:
  restart-button:
    backgroundColor: "transparent"
    textColor: "{colors.plaster}"
    typography: "{typography.apparatus}"
---

## Overview

**Creative North Star: “The world inside the panel, filmed on old stock.”**

This is an Experience surface. The interface withdraws so the visitor inhabits one continuous artwork. Scenes retain real architecture, perspective, light, and spatial depth, but the final impression is a painting seen through haze, grain, warm varnish, and time.

The bird is the visual continuity device. Its path joins every location; its wingbeat is produced from a fluid source-video cycle and advances only with the visitor's scroll.

**Key Characteristics:**

- Old-master warmth interrupted by the cold canal blue of Amsterdam.
- Crisp literary typography floating over atmospheric imagery.
- Continuous dissolves and camera drift rather than page-like transitions.
- Real paintings presented as themselves in the gallery finale.

## Colors

The palette is sampled from the Fabritius painting and extended only where the narrative requires it. Night and panel shadow form the surround; plaster and feather create readable warmth; gilt carries the wing bar and rare highlights; red wax is reserved for the bird and chain-adjacent accents. Canal blue belongs to Amsterdam and should not become a general interface color.

**The Scarcity Rule.** Gilt, red wax, and canal blue earn attention because they are rare. Do not distribute them evenly through the experience.

## Typography

EB Garamond carries the title and every word quoted from Donna Tartt. Source Serif 4 carries apparatus such as the opening credit, colophon, and restart control. No sans-serif is used.

Quotes remain live HTML and use a readable, balanced measure. They appear without repeated bylines because the opening establishes the source once.

**The Two Voices Rule.** Literature and apparatus may differ in scale, case, spacing, and posture, but never introduce a third typographic voice.

## Layout

The viewport is a fixed stage and the document height drives a single GSAP timeline. Scene worlds stack full-bleed and dissolve through each other. The bird remains one persistent overlay. Quotes are positioned compositionally against each scene rather than within a repeating section template.

Desktop and mobile carry the same narrative length. Mobile may use its own bird coordinates, artwork scale, crop, and quote position to preserve the composition.

The gallery is a horizontal passage within the vertical scroll timeline. It provides an unobstructed viewing interval for all five works before the deliberate empty-frame portal.

## Elevation & Depth

Depth comes from the imagery, a soft vignette, bounded light overlays, and restrained shadows beneath the painting, framed artworks, and bird. Avoid glossy interface elevation. Shadows should feel cast inside the depicted space rather than added as UI decoration.

## Shapes

The dominant shapes are the rectangular painting panel, traditional gallery frames, and organic bird silhouette. Controls remain typographic and restrained. Do not introduce rounded-card geometry, pills, or app-like containers.

## Components

### World layer

A full-bleed fixed image with scene-specific crop and a shared warm, muted grade. Additional light or darkness overlays must serve the location and must not leak into the following world.

### Quote

Live EB Garamond text with scene-specific placement. Short quotations pass through the timeline; the two long passages receive deliberate reading holds.

### Bird

An 882 × 588 transparent canvas rendering 33 WebP frames. Scroll controls frame selection and direction. CSS transforms control its path, scale, and subtle orientation. It freezes whenever scroll stops.

### Gallery track

A horizontal sequence of the five real artworks in the locked journey order, followed by one intentional empty frame. No generated substitutes or decorative filler works.

### Restart control

A quiet Source Serif 4 text control at the colophon that scrolls back to the beginning.

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
- **Don't** add motion that continues independently of scrolling.
