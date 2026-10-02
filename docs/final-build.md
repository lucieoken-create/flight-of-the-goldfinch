# Final-build review

## Status

### Final design and motion sweep: October 1

Impeccable and Emil Kowalski review completed locally. Frame C and commentary timing remain. Fixed independent scrolling in expanded credits, clipped text at 320x568, passage drift during responsive mode changes, and an already-failed opening image that could stall loading. Browser verification covered 1280x720, 390x844, 320x568, pointer and keyboard restart, pause/reverse commentary behavior, a reduced-motion fixture and deliberate image failure. All 35 tests and the build pass. Details and screenshots: `.impeccable/review/final-sweep/verification.md`.

No commit, push or deployment occurred during this sweep. The published baseline remains `ba5385a`. Native OS preference switching, physical phones and throttled loading remain untested.

### Gold commentary, finishing copy and resize repair: October 1

Commentary has pale gold Source Serif 4 italic text and a gold SVG frame with curved shoulders and small corner curls. The translucent backing and unframed invitation remain. The introduction mentions passages and scenes. Amsterdam uses Lucie's exact revised reflection; the literary excerpt is unchanged. The closing credits are narrowed to 29rem, and attribution and creative-direction text share one paragraph.

The cinematic score now follows ScrollTrigger progress directly. A coordinated measurement pass keeps its position stable during resizing and synchronizes Lenis. The short-window fallback no longer forces a return to the top; it aligns to the current passage and restores the cinematic position when the window grows. All 31 tests and the production build pass. Browser checks cover desktop, phone and the short-window mode switch. Evidence and limits are in `.impeccable/review/gold-notes-resize/verification.md`.

### Commentary correction and bird scale: October 1

Repeated visible author labels are removed. Commentary has a thin gold frame with a 60% opaque dark fill; the flight invitation is plain. The flying bird is another 15% larger than the previously approved size, with its original departure and landing registration retained. A dedicated 1254px transparent generated bird replaces the small atlas crop in the restart swipe. It preloads near the gallery; the old pose remains a fallback, and one source stays fixed throughout each pass.

All 31 tests, the production build and `git diff --check` pass. Focused desktop and phone review covers commentary, the plain invitation, gallery scale and high-resolution restart. Current evidence and limits are in `.impeccable/review/notes-refinement/verification.md`. No deployment occurred.

### Framed commentary and restart: October 1 follow-up

All personal passages have the approved gilt frame and author label; the intro includes Lucie's exact added sentence. Seven notes fade in after their literary quotation has fully appeared, with no wall-clock timer. Speaker labels now use a dash and the approved full names. Phone text measurements reserve clear space for the opening painting and the bird during the longer reading moments.

The restart control now performs one 1.65-second close bird pass on pointer activation. The original atlas supplies the complete feather silhouette; an opaque shadow conceals the reset. Input resumes after the pass. Keyboard, reduced-motion and reading-view activation return directly. The implementation cancels safely on mode changes or a hidden tab. Thirty-one tests and the production build pass. Verification, screen captures and limits are in `.impeccable/review/framed-notes/verification.md`.

### Personal copy and rights research: October 1

Approved personal text, character attributions, gallery labels and credits are integrated into cinematic and semantic reading views. The selected closing introduction ends with Lucie's three dots. The original ten book excerpts are unchanged. Extra reading distance sits around the existing score; tests sweep the added mapping for monotonicity, continuity, reversal and separation of standalone reflections from literary passages. The opening frame/arrow and 8% flying-bird increase are included, with original painting registration retained at both endpoints. Phone compositions keep text and bird apart.

29 tests and the Vite production build pass. Browser evidence and remaining limitations are in `.impeccable/review/editorial/verification.md`. Rights findings are in `rights-review.md`; the two O'Keeffe works and some older-image provenance require a public-use decision. No deployment or licensing request occurred. The requested giant-bird restart wipe remains a separate pending change.

### Regenerated slimmer bird and rollback: September 29

Lucie rejected the original-body cutout study because of its outline, fixed frontal head and altered motion. The earlier full-body atlas renderer and timing are restored. Two built-in image-generation edits produced the v4 source now used locally, with a slimmer torso and longer tail. New crops and anatomical landmarks fit all sixteen complete poses into the existing scene coordinates. The original-paint final landing pose, longer final hold, paths, cameras and all quotations remain as before the rejected study.

Twenty-seven tests and the production build pass. Checks cover the complete generated-pose draw, toe/head/tail registration, proportional open wings, canvas and atlas bounds, pause, rewind and the existing return. Browser evidence and limits are recorded in `.impeccable/review/bird-slim-v4/verification.md`. Artistic approval remains with Lucie. The cutout-study evidence remains archived and does not describe the current renderer. No deployment occurred.

### Landing clarity follow-up: September 29

Lucie approved the return mechanics and asked to remove the ghosted handoff and extend the rest before the closing quotation. The last folded pose now samples the original painted bird through a runtime outline mask. It retains its proportions and full opacity while the original background returns over a shorter interval. One additional viewport of scrolling holds the restored painting before darkening or text begins. No media asset was edited or added, and all quotation wording and reading distances remain intact.

Twenty-seven tests and the production build pass. Focused desktop and phone review covers the revised pose, the midpoint of the background handoff, and the extended hold. See `.impeccable/review/return-passage/landing-polish.md` for evidence and limits.

### Complete local journey and return: September 29

Lucie approved the bridge passage and asked to finish the return before making any copy or quote edits. The five real paintings now hold still for a larger portion of each gallery interval and fit within a shared maximum viewing height. The bird stays below the works and the entire gallery quotation. The empty frame becomes a measured opening in the wall, grows past the camera, and reveals the existing empty-perch plate. The camera settles on the full panel, the bird folds its wings onto the same registered toe position as departure, and the original Fabritius image returns after landing. The closing quotation follows.

Four-point-two extra scroll units fit between the last two quotations. All ten quotation texts and reading distances remain intact. No new imagery, canvas or dependency is added. Twenty-five tests and the production build pass. Desktop and phone milestone reviews cover all ten quotations, all five artwork holds and the return, with the current bird study. Evidence and limits are recorded in `.impeccable/review/return-passage/verification.md`. All major passages now exist locally; final artistic approval, Lucie's possible copy edits and the remaining device/loading checks are still open.

### Amsterdam-to-gallery bridge study: September 29

After approving the sky passage, Lucie approved the central bridge arch as the entrance to the art gallery. The local implementation traces the actual opening in the retained canal image, advances the camera through the lit masonry, and reveals the Bosschaert painting under a fading tunnel shade. The bird recedes into the arch, emerges beneath the first painting, and follows a lower gallery route. The original gallery track, artwork order, quotation text and reading distances remain intact.

The new passage uses one viewport-sized canvas, capped at 1.5 device-pixel ratio, and adds 3.6 scroll units after the Amsterdam quotation. Source cropping stays proportional and inside the image; the final viewport is entirely within the measured opening before the shell clears. Amsterdam and the gallery must decode together before the crossing. No new imagery or runtime dependency is added. Twenty-one tests and the production build pass. Browser review and its limits are in `.impeccable/review/bridge-passage/verification.md`. The empty-frame passage and return remain future work.

### Vegas-to-Amsterdam sky study: September 29

Lucie approved a climb into the dusk sky and descent toward the canal. The local study reuses the existing Vegas dusk and Amsterdam paintings. The camera clears the city before blending the measured sky crops, then descends before Amsterdam's quotation. The bird climbs and recedes slightly, levels out through the crossing, and settles onto its existing route. Three extra scroll units fit between quotation holds; all reading distances, wording and the earlier approved passages remain intact.

A viewport-sized canvas draws only the visible source rectangles at up to 1.5 device-pixel ratio. Both images must decode before the passage appears. Eighteen tests and the production build pass; the new checks cover sky-only overlap, complete viewport coverage, proportional cropping, preserved reading holds, pause and reverse. Browser evidence belongs in `.impeccable/review/sky-passage/verification.md`. The gallery entrance and return remain future passes.

### Shop-to-Vegas study: September 29

Lucie approved the rainy entrance and the next focused passage. She liked the shop-to-Vegas movement, then selected generated cabinet option 3 so the foreground would read more clearly as furniture. The glass-front cabinet now covers the lateral cut with its door faces, paired handles and shelves visible. The bird climbs into the pass, disappears behind the cabinet and emerges over the desert. Camera movement and a brief arrival shade support the change from interior to open sky. Current quotation timing, the rain opening, the Met-to-shop passage and the Vegas day/dusk pair remain intact. One 353 kB cabinet WebP is added; no runtime dependency is added.

Fifteen tests and the production build pass. Geometry checks cover the hidden cut, complete foreground height, proportional image scaling, visible handles and background coverage at desktop, intermediate and phone sizes. Original passage evidence is in `.impeccable/review/shop-vegas/verification.md`; the selected-cabinet review is in `.impeccable/review/cabinet-glass-v1/verification.md`.

Lucie's September 15 feedback reframes this as a reconstruction of the experience, using the earlier implementation as a mockup. The first painting → departure → Met → shop passage is now implemented locally, with the original environments, quotations, and real gallery artworks retained. The later camera routes in `docs/continuity-treatment.md` remain proposals. See `docs/decisions.md` for approved direction.

### Departure study: September 28

The later approved rain/entrance follow-up is now implemented. A generated wet Met exterior connects the panel to the retained gallery. Scroll-controlled rain peaks across takeoff; a measured doorway shell masks the threshold. A cool arrival shade clears as the gallery opens into its existing warm light. The passage adds four scroll units without shortening any quotation hold or changing the Met-to-shop choreography. The reading alternative also includes the new entrance image.

Twelve tests and the production build pass. New checks cover the inserted score interval, viewport coverage, and deterministic rain during pause and reverse. Current browser evidence is recorded in `.impeccable/review/rain-entrance/verification.md`. The notes below describe the earlier bird-only pass.

- A generated transparent atlas now carries Fabritius-informed color and brushwork. Four preparation poses lead to twelve registered flight poses. The earlier 33-frame source cycle remains intact.
- Head, tail and foot registration provides the crouch and push from the perch. A follow-up correction keeps body length consistent after Lucie noticed swelling in the first pose change. One silhouette is rendered per frame; an initial crossfade experiment was removed because it produced ghost outlines.
- Forward panel and museum camera movement replaces the earlier wall slide. At score coordinate 10.5 it hands off to the existing museum composition. The Met-to-shop doorway geometry is unchanged.
- Follow-up fixes limit stance deformation to the closed-wing crouch. Open wings keep their proportions, and a padded canvas prevents feather tips from being cut off.
- The 686 × 713 preview-panel layout and phone opening separate the title, credit and painting.
- Nine tests and the production build pass. Regression checks cover the crouch size jump, open-wing proportions and full source rectangles at over 3,000 intermediate positions. Current browser evidence is recorded in `.impeccable/review/departure-v2/verification.md`.
- At the end of the bird-only pass, rain and an exterior museum view had not yet been added. The follow-up above now includes them. Flight cadence, later routes and landing remain open.

### First-passage implementation — September 16

- The complete Fabritius panel has explicit dimensions and a contained image. A separate empty-perch derivative supports departure without altering the original; frame 0 holds at the painted head's registered position before translating.
- A measured aperture in the Met image cuts the foreground shell. A single camera move grows that opening while the shop is positioned behind it and the bird passes behind the shell.
- One resolved scroll playhead controls bird frames, interpolated path, camera, lighting, and quote timing. World-image readiness gates retain the previous complete composition until the requested world is ready.
- Optimized image derivatives replace oversized runtime stills. Source media remains available. The ten quotation blocks and their order remain unchanged.
- A complete linear reading article contains the opening, all ten quotations, the environment views, and all five gallery artworks with captions. Reduced motion, viewports at most 520px high and 1000px wide, and world-image failure select it automatically. Explicit intrinsic dimensions reserve lazy image space, including gallery images; reading-image sources stay deferred while the cinematic view runs.
- Geometry tests and the production build pass. Desktop 1280×720 and phone 390×844 screenshots are saved in `.impeccable/review/`. The initial reviewer's departure-registration and reserved-image-space corrections have been implemented and recaptured; the design documentation now matches the source. Paused full-viewport screenshots and bird/camera transforms were identical, keyboard restart reached scroll zero, and the browser console had no errors or warnings.
- A local fixture forced the reduced-motion query and verified all ten quotations and all five reachable, loaded gallery artworks. Native OS preference switching, network throttling, and deliberate image failure were not exercised. `.impeccable/review/verification.md` records the evidence and its limits; visual review covers this working first passage only.
- The independent reviewer's final disposition is **ship** for the three scored corrections: departure registration, reserved reading-image space, and design documentation are resolved. This verdict does not approve the unfinished bird material or the rest of the journey.

This is a representative passage study. Later joins remain dissolves; the gallery return remains scaffold choreography. The new bird's flight cadence and limited heading range still require review. Passing checks do not establish final artistic continuity or approval to publish.

## Present in the mockup

- Six-part continuous scroll timeline
- Opening source credit with no repeated quote bylines
- Las Vegas quotation timing
- Snow-free Amsterdam and clean transition into the gallery
- Extended gallery passage with five real artworks and one intentional empty frame
- Responsive desktop/mobile paths
- Thirty-three-frame scroll-controlled bird cycle
- Closing control returns to the beginning

## Reconstruction and final verification

- [x] Capture Lucie's September 15 direction: continuous cinematic travel, painterly surrealism, selective asset changes, and an ambiguous return
- [x] Establish and implement the first passage's continuous camera route; later routes remain proposed
- [x] Build the opening and departure, then carry the flight through the Met into the shop; complete visual review before extending it
- [x] Preserve the full Fabritius panel before departure and repair the image-sizing conflict
- [ ] Integrate the bird's material, heading, lighting, and foreground/background relationships
- [x] Drive bird frames and spatial choreography from one resolved scroll position
- [x] Extend the successful treatment through the existing environments and quotations
- [x] Resolve the gallery viewing intervals and the passage through the empty frame
- [ ] Review the bird against every scene at desktop and mobile sizes
- [x] Optimize large still images and implement loading/readiness gates
- [ ] Exercise throttled first-load behavior and deliberate image failure
- [ ] Verify forward and backward scroll choreography
- [x] Implement the complete reduced-motion and short-viewport reading alternative with reserved image space
- [x] Verify the reading fixture after the image-sizing fix, including all five loaded gallery artworks
- [ ] Exercise native reduced-motion preference switching
- [ ] Confirm final colophon wording and artwork credits
- [x] Run the production build and geometry/score tests
- [x] Check the browser console, paused composition, and keyboard restart in the representative passage
- [ ] Finish the whole-artwork visual review after the remaining continuous joins and bird development
- [ ] Prepare Vercel deployment; do not publish without explicit approval
