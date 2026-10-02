# Bridge-to-gallery review, September 29, 2026

## Scope

Local study of Amsterdam's central bridge arch as the entrance to the art gallery. Lucie approved this pass after loving the sky passage. The existing canal image and five supplied artworks remain the sources. No new media, dependency, commit or deployment was created for this pass.

## Implementation

Scroll 46.9–51.4 maps onto story 39.9–40.8. The added 3.6 units sit after the Amsterdam quotation; every quotation and gallery viewing interval retains its physical scroll distance. Total scroll score is now 76.1; the original story score still ends at 65.5.

The central arch's inner stone edge supplies a traced aperture. A viewport-sized canvas uses uniform source cropping and erases that aperture while the gallery sits behind it. The final crop fits entirely inside the conservative measured opening before the foreground clears. A 1.25px feather softens the cut to match the painted edge. The first painting approaches from scale .72; the tunnel shade clears by gallery arrival. The bird recedes into shadow, passes behind the stone, then emerges below the first painting and follows a lower gallery route. Its existing return path resumes during the gallery quotation.

## Verification

- `npm test`: 21 passing tests. New checks cover viewport coverage at six sizes, proportional source cropping, the final crop within the arch, preserved gallery/quote timing, and deterministic bird/camera state in either scroll direction.
- `npm run build`: passed. JavaScript 155.31 kB (59.71 kB gzip), CSS 10.23 kB (3.07 kB gzip), HTML 10.79 kB (3.26 kB gzip).
- `git diff --check`: passed. The checkout contains inherited modified and untracked work; this is not a clean-checkout or deployment claim.
- Browser review: 1280 × 720 desktop and 390 × 844 phone, forward through approach, arch, threshold and first-painting arrival. The first review found the bird crossing the flowers during arrival. The correction places it below the first painting; the final desktop and phone arrival captures confirm the change.
- Desktop paused composition at scroll 49.327 was byte-identical across two full-viewport PNG captures. Forward/reverse at that position also matched exactly in the initial review. After the refinement, forward to arrival and reverse to scroll 50.021 / scrollY 19246 produced byte-identical threshold PNGs.
- Browser console: no warnings or errors in the review tab.
- DOM check: all five cinematic artwork images loaded; ten quote blocks and five figures remain in the semantic reading article.
- Normal viewport restored; temporary review tab closed. Existing user preview refreshed and positioned before the bridge approach.

## Captures

`desktop-approach.png`, `desktop-arch.png`, `phone-arch.png`, and `phone-threshold.png` record the initial inspection. `desktop-threshold.png`, `desktop-arrival.png`, and `phone-arrival.png` record the final confirmation after the softer edge and lower bird route.

## Limits

This review covers the bridge passage and first painting. The entire five-work gallery route, empty-frame portal and landing still need their focused artistic review. No real-device frame-rate measurement, cross-browser certification, native reduced-motion preference switching, throttled network or deliberate image-failure exercise was performed. The existing reading alternative is preserved; its content was checked in the DOM, not retested under every fallback trigger.
