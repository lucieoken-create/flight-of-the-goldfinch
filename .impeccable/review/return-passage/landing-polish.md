# Landing clarity follow-up

September 29, 2026. Lucie approved the existing return mechanics and requested a clearer bird handoff plus more viewing space before the close.

## Result

The last folded-wing pose now samples the actual bird from the same original reproduction displayed by the panel. A runtime outline preserves its painted silhouette, including the tail below the perch. Head and toe registration use rotation and uniform scale. The existing camera and flight path are unchanged.

The bird stays opaque while the original background replaces the empty-perch plate at score 72.26–72.34. Once that completes, the extra bird layer disappears over the same source pixels. The generated and original resting birds no longer dissolve together. Original colors are retained for the original-paint pose; atlas color treatment is applied only to atlas poses.

Exactly 100vh of scroll is added before the final quotation, without shortening its reading hold. The completed original is visible from 72.34 until 75.3713 with neither darkening nor text, about 162vh of scrolling. All quotation wording remains unchanged. No media file was added or edited, and no dependency was added.

## Checks

- 27 tests pass. Added checks verify the head, toe and tail positions against the original panel at four viewport sizes; proportional, unclipped landing poses; full bird opacity during the background handoff; and the added physical scroll distance.
- Production build passes: HTML 10.71 kB, CSS 9.99 kB, JavaScript 158.73 kB; compressed 3.26 kB, 3.02 kB, and 61.19 kB.
- Desktop 1280 x 720 and phone 390 x 844 captures show a single bird at the middle of the background handoff. `desktop-handoff-midpoint.png` and `phone-handoff-midpoint.png` have approximately 50% empty-plate opacity while the bird remains fully opaque.
- `desktop-rest-hold.png` and `phone-rest-hold.png` show the unobstructed original after the earlier quote-entry time. Both quote and veil opacity are zero. The corresponding `closing-entry` captures show the delayed quotation starting normally.
- On phone, scrolling forward 0.3 viewport and backward restored score 72.300, scroll position 32609, and a byte-identical screenshot.
- The review tab reported no console warnings or errors. Whitespace checks pass.

This was a focused review of the revised landing and close, not another full-journey review or a physical-device performance check. Artistic approval remains with Lucie. No commit or deployment was made.
