# Editorial pass verification

October 1, 2026. Scope: approved personal copy, character labels, artwork captions and credits, reading distance, opening frame/arrow, and the requested 8% flight-bird enlargement.

## Automated checks

- All 29 tests pass. The new reading-map tests sample 10,001 positions for continuity, monotonicity and reversal; they also check the standalone reading intervals against literary quote intervals.
- Production build passes. Vite reports 20 modules; final CSS is 12.68 kB and JavaScript is 165.09 kB before gzip.
- `git diff --check` passes.
- The preview console returned no warning or error entries during this review.

## Browser evidence

- Desktop at 1425 × 855: opening frame and arrow, paired prologue text, gallery introduction, exact selected closing, and expanded artwork credits inspected. Keyboard activation opens the credits and returns to the beginning.
- Phone viewport at 390 × 844: opening painting now fits below the long prologue; Met and shop quote/reflection pairs fit with the bird below the text. The shop text has a local dark backing over its busy background.
- Short viewport at 390 × 500: linear reading view contains ten literary excerpts, seven attached reflections, four standalone passages and five gallery artworks. No horizontal overflow or broken loaded images were found.
- Saved proof: `desktop-opening.png` shows the first quote and personal reflection; `mobile-prologue.png` shows the long second quote, reflection and complete painting.
- Temporary viewport overrides were reset. The local preview is left at the beginning.

## Detector triage

Fixed: clipped phone painting, phone bird/text crossings, shop text contrast, and stale design metadata.

Suppressed: the broken-image rule for `index.html` treats intentional `data-src` lazy loading as a missing image. The narrow file-scoped exception is recorded in `.impeccable/config.json`; real image assets, intrinsic dimensions and the failure reading view remain implemented.

Left standing: inherited small supporting text in the reading/off-ramp treatment remains advisory. No unrelated typography redesign was attempted.

## Limits and next work

This is browser viewport testing, not physical-device certification. Native reduced-motion preference, throttled network, deliberate asset failure and a complete cross-browser run were not repeated in this pass. Pointer activation of the credits was inconclusive through the browser automation; keyboard activation and the underlying native details element were verified.

The requested bird-wipe restart is still pending. No deployment, GitHub publication, rights-holder outreach, license purchase or artwork substitution occurred. Public-use decisions are in `docs/rights-review.md`.
