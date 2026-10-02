> Archived: Lucie rejected this cutout study on September 29. It is rolled back; current evidence is in `../bird-slim-v4/verification.md`.

# Original-body bird study

September 29, 2026. Lucie's side-by-side screenshots showed that the previous generated crouch still had a fuller torso and different silhouette. The previous endpoint-only correction did not address the intervening body poses.

## Construction

One runtime contour samples the head, torso and tail from the original painting throughout the journey. The body rotates up to 24 degrees and translates within its canvas. Its transform has unit scale and determinant one at every pose. There is no generated torso, shear, squash, body crossfade or body-pose substitution.

Two feather-only regions from the existing atlas supply separate wings, attached at the shoulder. The far wing is behind the body; the near wing is in front. Both rotate continuously with scroll. The toes stay planted before lift, and the small feet extension becomes hidden as the bird enters flight. Landing reverses the same lean and wing opening.

The original painting remains underneath the empty-perch plate during departure, and the exact painted cutout stays opaque above both. The return uses the previously tightened background handoff. The approved paths, scene cameras, added final viewing distance, artwork order and all quotations are unchanged.

This is an articulated painted-cutout motion study. It changes the visual character of flight and awaits Lucie's review. No source media file or dependency was added or modified. The previous renderer is retained here as `bird-before.js` for comparison only and is not imported by the application.

## Verification

26 tests pass. Older generated-pose-specific tests were replaced with original-body identity checks, constant head-to-tail length and body area, toe/head anchoring, continuous reversible wing motion and complete padded bounds. The body and both full wing crop rectangles stay inside the 576 x 576 canvas with at least 16px clearance through the sampled movement. Other scene and score tests continue to pass.

Production build passes: HTML 10.71 kB, CSS 9.99 kB, JavaScript 158.08 kB. Compressed sizes are 3.26 kB, 3.02 kB and 60.94 kB.

Visual review at 1280 x 720 and 390 x 844 covers the departure handoff, lean, opening wings, return wing fold and restored original. Desktop gallery samples cover raised and lowered wing positions at the retained lower route. No console warnings or errors were reported. Captures and their measured scroll positions are in `audit.json`.

The paused screenshot was byte-identical across separated captures. Rewinding by 0.25 viewport restored scroll position 32090 and displayed score 71.150, with the same visible pose. Screenshot comparison was not byte-identical, including a follow-up from a settled baseline, so this pass does not claim exact raster equality after browser scrolling. Pure body and wing state reversal is covered by the passing deterministic tests.

This is focused visual and geometry verification, not physical-device performance testing, cross-browser certification or final artistic approval. No deployment or commit was made.
