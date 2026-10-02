# Framed notes and restart verification

October 1, 2026 follow-up. Lucie approved approach B, the exact intro addition, full-name attributions and the foreground bird-wipe restart.

## Implemented

All eleven personal passages use a thin gilt frame, dark translucent fill, cream text and a gold author label. Seven quote-linked notes appear after the literary passage, through a deterministic scroll-based fade. The intro adds "Along the way, I've added my own reflections." Attributions have a dash and the approved names. Original literary excerpts and the existing 8% flying-bird enlargement remain intact.

Pointer restart plays a 1.65-second pass of the existing bird atlas, with an opaque shadow during the page reset. Keyboard and reading-mode restart return directly. Reduced motion also takes the direct path. The controller guards repeat activation, releases its overlay and scroll lock, and completes safely on mode changes or a hidden tab.

## Verification

- All 31 tests and the production build pass. New tests check the quote-before-note sequence and the restart's covered reset and offscreen endpoints at phone, desktop and large desktop dimensions.
- `git diff --check` passes. Production CSS: 13.38 kB; JavaScript: 167.64 kB, 64.95 kB gzip. No new dependency or image asset.
- Browser console returned no errors or warnings in the final check.
- Desktop note composition inspected at 1280 pixels wide. `desktop-notes.png` records the first quotation, attribution and framed reflection.
- Phone introduction and long prologue inspected. At 390 × 844, the longest note ends at y=576.23; the painting begins at y=600.00 and ends at y=822.90. `mobile-notes.png` records the corrected layout.
- The first inspection found the added frames touched the phone painting and the shop bird's wing. Both were corrected in one batch using measured text heights. The confirmation showed the shop note ends at y=539.45 and the bird's containing box begins at y=581.99 at 390 × 892.
- Actual pointer restart verified on phone and desktop. Desktop capture showed the end at progress .254 and the opening at progress .624 while the shadow was opaque. Captures `restart-0.png` through `restart-4.png` record the pass. On completion the overlay clears, scroll position is zero, focus is on the semantic opening heading, and ordinary scrolling works again.
- Keyboard restart verified independently: immediate return, no wipe, focus on the opening heading.
- The 390 × 500 reading view contains all eleven personal notes and ten literary excerpts with no horizontal overflow. Its restart returns immediately.
- Browser pointer clicks initially failed after viewport changes. Reloading the preview at the intended test size resolved this; pointer activation was then observed directly. This supersedes the inconclusive pointer check in the previous editorial review.

## Detector triage and limits

The type detector reported advisory values already present in the invitation, phone title, quote and supporting-text styles. These remain standing; this pass does not redesign those roles. No new suppression was added. The earlier file-scoped lazy-image exception remains unchanged. The design hook stopped additional hints after its edit-count limit; the focused type scan, tests and browser checks above were completed separately.

Native reduced-motion preference switching, physical devices, network throttling and deliberate asset failure were not retested. The reading fallback was exercised through its real short-viewport condition. Mode-change and hidden-tab cleanup are implemented but were not separately exercised during the running wipe. The enlarged foreground sprite is deliberately soft at close range and remains subject to Lucie's visual review.

No deployment, rights-holder outreach, license purchase or artwork substitution occurred. Public-use questions remain in `docs/rights-review.md`.
