# Commentary and bird refinement

October 1, 2026. Focused local review in the Codex in-app browser.

## Changes

- Removed all repeated visible reflection labels. Accessible commentary names remain.
- Dark panel fill is 60% opaque; gold borders remain. The flight invitation has neither border nor backing, including in the reading article.
- Flying bird is 15% larger than its prior size: 1.08 × 1.15 = 1.242 times the original. Growth still tapers away at departure and landing.
- The restart uses a separately generated 1254 × 1254 transparent bird. It loads near the gallery without blocking the journey. The existing atlas is a fallback if decoding fails or is incomplete at activation. The image source is fixed for each pass. Timing and path stay unchanged; restart canvas resolution is capped at 2 device-pixel ratio.

## Evidence

- All 31 Node tests pass. The production build passes: CSS 13.18 kB (3.74 gzip), JS 167.91 kB (65.12 gzip). `git diff --check` passes.
- Desktop 1280 × 720: shop note has no label and computed rgba(23,18,14,0.6) backing. Its text remains legible over the environment. `desktop-shop.png`.
- Desktop gallery at reading 72.980/story 44.280: enlarged bird uses the established lower route. `desktop-gallery.png`.
- Phone 390 × 844: the long opening quote and reflection fit above the painting; no horizontal overflow and no label elements. `phone-commentary.png`.
- Phone rain invitation at reading 18.713: plain line, computed transparent background and 0px border. `phone-invitation.png`.
- Desktop restart captures `restart-0.png` through `restart-4.png`: source reports high-resolution throughout. Feather and face detail are visibly sharper than the previous atlas crop. The completed pass returns to reading 0 and scrollY 0, with the overlay inactive.
- Phone restart also reports high-resolution source, then returns to reading 0/scrollY 0 with overlay inactive. `phone-restart.png`.
- Browser reported no warning or error logs after review. Temporary viewport override was reset and the preview left at the opening.

## Limits

This is focused viewport emulation, not a physical-device or cross-browser check. Network failure of the optional restart image was not deliberately exercised. Existing tests cover geometry and timing; they do not establish artistic approval. The main journey retains its existing atlas, enlarged in code. The new close-pass bird has more detailed generated brushwork and awaits Lucie's review. No publishing or rights clearance occurred.
