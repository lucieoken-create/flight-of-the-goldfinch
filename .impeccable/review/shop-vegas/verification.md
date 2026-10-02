# Shop to Vegas verification

September 29, 2026. Local passage study; nothing published.

## Scope

The bird makes a shallow climb out of the shop. A close crop of the existing painted cabinet passes in front of it, covers the environment cut, and reveals the retained Vegas image. The camera settles onto the existing desert route. No new artwork, dependencies, scroll duration or quotation edits.

## Checks

- `npm test`: 15 passing tests. New checks cover the hidden environment cut, full-height foreground coverage, proportional image scaling, camera coverage and deterministic passage geometry. Tested geometry at 1920×1080, 1280×720, 686×713, 390×844 and 320×568. Existing bird, score and rain checks pass.
- `npm run build`: passed. JS 149.49 kB (57.75 kB gzip), CSS 9.67 kB (2.96 kB gzip). `git diff --check` passed and the design registry parses.
- Browser review at 1280×720 and 390×844 covers the shop lead-in, foreground crossing and Vegas arrival. The cabinet covers the cut and occludes the bird; the next quotation appears after the foreground clears.
- Desktop forward and reverse samples at scroll 33.049 returned to the same scroll offset, cabinet transform and shop clipping boundary. Their screenshot files were not byte-identical, so this is DOM-state evidence of reversal, not a pixel-exact claim.
- Two subsequent full-viewport screenshots at the stationary desktop crossing were byte-identical. No independent passage motion was observed while paused.
- Browser console warnings/errors: none during the checked passage.
- The existing loading gate now requires the shop, foreground crop and Vegas image together during the crossing. The decorative crop has no duplicate entry in the reading view. Canonical quotation intervals and the Met-to-shop route are unchanged.

## Evidence

`desktop-shop.png` (scroll 31.775), `desktop-crossing.png` (33.049), `desktop-vegas.png` (34.640); `phone-shop.png` (31.757), `phone-crossing.png` (33.047), and `phone-vegas.png` (34.657). Subtract four from these scroll values for the story score after the inserted rain passage.

## Limits

This review covers the local passage at representative viewport sizes. It does not measure physical-device frame rate or certify every browser. Native reduced-motion switching, throttled loading and deliberate image failure were not exercised in this pass. Vegas-to-Amsterdam, the gallery and the return remain for later development and review.
