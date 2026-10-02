# Slimmer full-body bird review

September 29, 2026. Local Vite preview only; no deployment or commit.

## Scope

Rolled back the rejected original-body/separate-wing renderer using the pre-study backup, then connected regenerated `goldfinch-painted-atlas-v4.png`. Full-body pose timing, flight routes and camera motion follow the previous version. Source crops and anatomical registration were remeasured; .94 uniform source normalization fits the longer bird into the same coordinates. The original-paint final rest pose and extended closing hold remain. The generated alpha is preserved. Prompts and generation provenance are in `generations/goldfinch-painted-atlas-v4.md`.

## Automated evidence

- All 27 tests pass, including single full-pose rendering, planted toes and continuous head/tail registration during the first lean, proportional open-wing frames, atlas/canvas crop bounds, repeatable pause/rewind, and existing return geometry.
- Production build passes, 19 modules; JavaScript 158.88 kB, gzip 61.24 kB.
- Both generated images are 1254 by 1254 RGBA with real transparency. Alpha-component inspection identified sixteen complete birds. The rightmost feather/beak antialias edge has two faint pixels at the image edge (alpha 25 and 37), no opaque edge pixels. Runtime crops include the complete source edge.

## Browser review

Viewed the opening lean, raised-wing departure, return fold and final original-paint settlement at 1280 by 720; viewed the lean, takeoff and return fold at 390 by 844. The complete raised wings fit the bird canvas. The head turns into rightward flight. No broad white cutout contour is visible in the reviewed generated poses. Screenshots are saved alongside this note. The folded phone composition remained at scroll 71.673 / y 32326 while paused. No browser errors were recorded. Temporary phone viewport override was reset.

## Limits

The regenerated silhouette is a closer, slimmer source-art study, not an exact reproduction in every pose. Lucie's approval of the visual match remains open. This pass does not certify every device, loading failure or every intermediate scroll pixel. The full artwork's remaining review items remain in `docs/final-build.md`.
