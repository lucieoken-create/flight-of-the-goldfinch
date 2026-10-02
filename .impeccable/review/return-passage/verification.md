# Gallery return verification

September 29, 2026. Local implementation, ready for Lucie's complete viewing before copy and quotation edits.

## Change

The five gallery artworks have longer stationary viewing intervals and share a maximum viewing height. The bird stays below the gallery quotation, then enters the empty frame. The measured opening expands around the camera and reveals the existing empty-perch painting. The camera retreats to the complete panel while the bird folds onto the same toe anchor used at departure. The original Fabritius image returns after the bird reaches its rest pose.

The added 4.2 scroll units preserve the existing quotation holds. All ten quotation blocks and five real artworks remain intact. No asset, canvas, or runtime dependency was added in this pass.

## Automated checks

- All 25 tests pass, including frame geometry at six viewport sizes, pose continuity, toe registration, and deterministic pause/rewind samples.
- Production build passes: HTML 10.71 kB, CSS 10.03 kB, JavaScript 157.14 kB. Compressed sizes are 3.25 kB, 3.03 kB, and 60.41 kB respectively.
- Whitespace check passes and the design JSON parses.

## Browser review

Reviewed the complete sequence at desktop 1280 x 720 and phone 390 x 844. Captured all ten quotation holds and all five centered artworks. The quote bounds and the centered artwork bounds fit both viewports. Inspected the return at the frame, camera crossing, landing approach, folded rest pose, restored original, and closing quotation.

The first phone review found the bird crossing the last lines of the gallery quotation. Its lower route now continues until the quotation clears. The final phone confirmation and `desktop-q10-final.png` show the correction. The files with `final` in their names supersede the earlier samples at those positions.

At phone scroll position 31873 (score 70.669), scrolling forward half a viewport and back restored an identical screenshot. A later paused screenshot was also byte-identical. Keyboard activation of the closing restart control returned the scroll position and score to zero. No warning or error entries were reported by the review tab's console.

`journey-audit.json` records milestone dimensions and quotation bounds. Contact sheets summarize the full journey and the detailed return. Screenshot checks use an emulated phone viewport, not physical phone hardware.

## Scope

Native reduced-motion preference changes, deliberate image failure, network throttling, physical-device frame rates, and cross-browser behavior were not exercised in this pass. Existing fallback behavior was retained. These checks do not constitute final artistic approval.

No commit, deployment, or publishing action was taken. The user-facing local preview is reset to the opening for a complete viewing; the temporary review tab is closed and the viewport override is cleared.
