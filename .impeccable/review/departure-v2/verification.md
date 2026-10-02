# Departure study verification

September 28, 2026. Local preview at http://127.0.0.1:5173/. No deployment.

## Changed

Generated painted bird atlas, four preparation/takeoff poses, twelve flight poses, head/foot registration and a forward camera move. The title and painting now fit the 686 × 713 preview panel. Original environments, all quote text, the gallery originals and the Met-to-shop camera geometry remain intact.

## Evidence

- Six tests pass, including camera handoff, deterministic reverse pose selection, wingbeat wrap, anchored toes, portal coverage and quote order. Production build passes: JS 144.71 kB (55.78 kB gzip), CSS 8.82 kB (2.79 kB gzip).
- Browser inspection at 1280 × 720, 686 × 713 and 390 × 844. Two inspection rounds: the first found pose crossfade ghosting; the second confirmed single silhouettes after that blend was removed.
- Desktop captures: perched registration at score 7.590, preparation at 8.213, departure at 9.045 and doorway at 19.962. Phone captures: crouch at 7.840 and departure at 9.668.
- Phone pause: bird and camera transforms and the resolved playhead stayed identical. Pixel comparison changed only the native scrollbar strip, bounds x376–390/y120–152. All artwork pixels remained unchanged.
- Forward one arrow step and reverse one step returned to score 9.668 with byte-identical full-viewport screenshots and identical bird/camera transforms.
- Browser console returned no errors or warnings during the passage.
- PNG inspected as RGBA with genuine transparency. Crops follow measured feather bounds. Exact prompt is embedded in the PNG and recorded in `generations/goldfinch-painted-atlas-v2.md`.
- No current critique snapshot was returned for index.html. Source whitespace check passed.

## Limits

This is a study for Lucie's artistic review. The painted twelve-frame wingbeat is a different motion treatment from the previous video cycle. Its cadence and restricted heading still need judgment in use. Later destination joins and final landing remain unfinished. No rain or museum exterior was added. Native reduced-motion switching, throttling and deliberate image failure were not retested in this pass. This evidence is not whole-project approval.


## Crouch correction after Lucie's review

The two-point head/foot transform uniformly enlarged the crouched pose. At its switch, measured alpha area jumped by about 53%. Registering the tail as a third point keeps body length continuous and reduces that discontinuity to about 8%, which comes from the source silhouettes. No source image was edited.

Seven tests and the production build pass. The new regression checks head/tail continuity and bounds the area jump. Desktop inspection sampled 7.694 and 7.798 on either side of the pose change; phone inspection covered crouch and lift-off. Browser logs had no errors or warnings. Refined desktop and phone captures are saved alongside the earlier evidence. This is a focused takeoff correction, not a new whole-project validation.


## Open-wing distortion and clipping correction

Lucie's next screenshots exposed two defects that the earlier sampled captures missed: the stance transform sheared raised wings, and the 384-pixel canvas clipped wings that crossed its bounds. The stance transform is now limited to the closed-wing crouch. Subsequent takeoff poses register the head/tail axis with rotation and uniform scale only. A 576-pixel canvas adds a 96-pixel transparent margin on each side; its CSS size and offset preserve the existing visible scale and path.

Nine tests pass. The new checks sweep 3,211 takeoff/flight positions, require the complete transformed source rectangle to clear every canvas edge by at least 16 pixels, and reject nonuniform scaling or shear in open-wing poses. Production build passes: JS 145.53 kB (56.09 kB gzip), CSS 8.82 kB (2.79 kB gzip). Desktop 1280 × 720 and phone 390 × 844 captures show intact wings. Browser logs have no errors or warnings. A development-only contact sheet records sixteen poses around the transition boundaries; it is not part of the production build. All original image assets are unchanged.
