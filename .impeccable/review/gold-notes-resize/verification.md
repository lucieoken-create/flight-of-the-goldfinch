# Gold commentary and resize repair

October 1, 2026. Focused local review in the Codex in-app browser.

## Changes

Commentary uses Source Serif 4 italic, with the real italic face added to the existing font request. Its pale gold text is #e4c579. A nine-slice SVG border draws curved shoulders and small corner curls at a consistent size. The translucent dark background remains; the rain invitation stays unframed. The intro mentions passages and scenes. Amsterdam uses Lucie's exact sentence supplied in this turn. Literary passages are unchanged. The colophon is capped at 29rem and combines attribution and creative direction in one paragraph.

The old short-viewport mode explicitly scrolled to zero. Ordinary height changes also changed the reading score because scroll pixels remained fixed while the narrative height changed. The revised controller maps ScrollTrigger progress directly to the score, synchronizes Lenis measurements in the same resize pass, and restores the prior score. Short-window mode aligns the reading article to the active passage; returning to cinematic mode restores its saved position. Destroyed scroll controllers are cleared, and the animated timeline intermediary has been removed.

## Checks

- All 31 existing tests pass. Production build passes: CSS 13.41 kB (3.81 gzip), JS 168.47 kB (65.38 gzip). `git diff --check` passes.
- Desktop commentary at reading 38.081: gold italic computed style, italic font available, complete curved frame. `desktop-commentary.png`.
- Resize from 1280 × 720 to a rendered 860 × 632 kept reading position exactly 38.081. The next scroll advanced to 39.951.
- At 860 × 452, the page switched to reading mode at the current shop passage, 0.44px from its top. Native scroll advanced from 4155px to 4607px. Restoring a tall viewport returned to reading score 39.951 in cinematic mode.
- The closing colophon measures 464px wide, with the requested credits in one paragraph. `desktop-credits.png`.
- Phone 390 × 844: introduction, long prologue pairing, and Amsterdam reflection fit with no horizontal overflow. `phone-introduction.png`, `phone-commentary.png`, `phone-amsterdam.png`.
- Amsterdam DOM text exactly matches: "Even when we feel overwhelmed by the vastness of a dark sea, there can still be a spark that helps center us."
- Reloaded phone view remained scrollable in both directions. Pointer restart selected the high-resolution bird and completed its covered reset. Input was released afterward.

## Limits

These checks use browser viewport overrides, not a physical phone or a separate Chrome session. The reported persistent Chrome freeze after reload was not independently reproduced; the reset and unstable resize position were reproduced and repaired. Existing tests cover score and geometry, while the resize regression was checked interactively. Native reduced-motion preference changes, throttled image loading and licensing remain outside this pass. No publishing occurred.
