# Rain and Met entrance verification

September 28, 2026. Local study only; nothing published.

## Scope

Painting departure → rain → wet upper steps → doorway → retained Met gallery. One new generated exterior and deterministic canvas weather; the corrected bird atlas and Met-to-shop geometry remain intact. Four extra scroll units preserve all downstream quotation holds.

## Checks

- `npm test`: 12 passing tests. Added monotonic score insertion/continuity and unchanged reading intervals; entrance plane coverage at 1920×1080, 1280×720, 686×713 and 390×844; deterministic rain coordinates and envelope under pause/reverse. Existing bird clipping and distortion sweeps still pass.
- `npm run build`: passed. JS 148.17 kB (57.19 kB gzip), CSS 9.29 kB (2.89 kB gzip). New runtime exterior JPEG approximately 681 kB. Original generated PNG retained with exact prompt metadata.
- Browser inspection at 1280×720 and 390×844: rain over takeoff, wet steps, doorway crossing and gallery arrival. The first pass exposed rectangular haze edges and uncovered strips of the arrival grade. The fix paints the haze gradient without rectangle clipping and grades the complete gallery image plane. Recaptures confirm both corrections.
- At phone scroll 11.601, two full-viewport PNG captures were byte-identical across a pause. Bird and entrance transforms, scroll offset and resolved time were also identical.
- Reverse scrolling from the doorway returned to the takeoff composition. Pure-function tests separately confirm exact reverse evaluation of rain and entrance geometry.
- On phone gallery arrival at scroll 15.531, rain is hidden and the first Met quotation is readable. Console warnings/errors: none.
- All ten quotation blocks and five real gallery works remain in the reading alternative. The new exterior has descriptive alternative text and intrinsic dimensions.
- At 844×390, the short-viewport reading mode activates and contains ten quotations, five gallery figures and the new entrance image. Native OS reduced-motion switching remains outside this check.
- At desktop scroll 23.952 (story score 19.952), the retained Met-to-shop doorway and bird occlusion still render correctly; `desktop-met-to-shop.png` records that check.

## Evidence

`desktop-takeoff.png`, `desktop-steps.png`, `desktop-threshold.png`, `desktop-arrival.png`, `desktop-gallery.png`; corresponding phone takeoff, steps, threshold and gallery captures. `reference-only-met-facade.png` is an architectural reference capture from the museum's official image, not generated artwork or a shipped asset.

## Limits

This checks the local passage and representative viewport sizes, not physical-device frame rate or all browsers. Native reduced-motion preference switching, throttled loading and deliberate image failure were not exercised in this pass. The bird's limited headings, later scene joins and return choreography still need development and review.
