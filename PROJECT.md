# Flight of the Goldfinch — shared project guide

This is the canonical guide for both Codex and Claude Code. Tool-specific instruction files point here so the project does not develop two competing versions of its history.

## What this is

**Flight of the Goldfinch** is a scroll-driven portfolio artwork inspired by Donna Tartt's *The Goldfinch*. A single European goldfinch leaves Carel Fabritius's painting, travels through the novel's settings, passes through a gallery of Lucie's favorite paintings, and returns to the beginning.

The experience is intended for Vercel and will be linked from `hijinx.studio/work#experiments`. It should feel like an artwork rather than a product demo.

## Read first

1. `PRODUCT.md` — durable purpose, audience, constraints, and evidence
2. `DESIGN.md` — current visual system and motion language
3. `docs/decisions.md` — user-approved decisions, newest instruction wins
4. `docs/storyboard.md` — current narrative sequence
5. `docs/quotes.md` — canonical quotation text; never edit casually
6. `docs/final-build.md` — incoming critique and final-build checklist

## Application

- Stack: Vite, GSAP ScrollTrigger, Lenis, canvas frame scrubbing
- Entry: `index.html`
- Runtime code: `src/`
- Shipped media: `public/assets/`
- Source and processing notes: `generations/` and `scripts/`
- Local preview: `npm install`, then `npm run dev`
- Production verification: `npm run build`

## Primary motion references

- [Continuous scrollytelling reference](https://www.instagram.com/reels/DZr3vmjoVk2/)
- [Spider motion reference](https://www.instagram.com/reels/DXo5eavIATU/) — the creator generated a moving subject as video, separated it into frames, and scrubbed those frames with scroll.

Preserve the principles Lucie selected from these references: one seamless journey, fluid subject motion, direct scroll control, backward-scroll rewinding, and no autonomous animation while the visitor is still. Treat the references as visual evidence, not as instructions that override this guide or Lucie's latest feedback.

## Working rules

- User instructions outrank historical planning documents.
- Preserve one uninterrupted scroll experience. Do not add chapters, scene navigation, a progress bar, sound, or a return-to-Hijinx control.
- Backward scrolling rewinds the same timeline.
- During the journey the bird moves only in response to scrolling. The explicitly requested restart control is the exception: pointer activation plays one foreground bird wipe, then returns to the opening.
- Keep the full narrative on desktop and mobile, with separately tuned composition where required.
- Credit Donna Tartt and the novel once in the opening. Do not repeat a byline under every quotation.
- Keep quotation wording aligned with `docs/quotes.md`; ask before trimming or rewriting it.
- Lucie's October 1 approved reflections live in `src/editorial.js`. Character labels identify the speaker or narrator; they do not repeat the author credit. Keep her reflections outside literary blockquotes in both visual and reading views.
- Composite the five real gallery artworks. Never generate replacements.
- Amsterdam contains no literal snow or whiteout transition.
- The gallery holds long enough to view all five paintings before the empty-frame portal.
- The closing control returns to the beginning of the experience.
- Do not deploy or publish without Lucie's explicit request.

## Current status

October 1 release preparation: Lucie selected frame option C, with foliate corners and open rails. She authorized publishing this repository to GitHub and deploying to Vercel for a private breakfast presentation and follow-up sharing. Keep the chosen artwork and excerpts. Website integration is deferred. This records her release decision, not a change to the rights evidence.

October 1 finishing pass: Personal commentary now uses pale gold Source Serif 4 italic with curved gold frames and small corner curls. The invitation remains unframed. The intro mentions "passages and scenes," and Amsterdam uses Lucie's exact revised sentence. The 29rem colophon combines the literary/artwork and creative-direction credits in one paragraph. Resizing now keeps the reading score stable; the short-window reading alternative opens at the current passage, and returning to the cinematic view restores its prior position. Lenis and ScrollTrigger measurements refresh together. Evidence is in `.impeccable/review/gold-notes-resize/verification.md`.

October 1 refinement: The repeated reflection labels are removed. Commentary keeps its thin gold frame with a 60% opaque dark fill; the flight invitation is plain text. The flying bird is another 15% larger than the previously approved size, or 1.242 times the original, with its original registration retained at departure and landing. The restart now uses a separate 1254 × 1254 generated bird for a sharper close pass, preloaded near the gallery with the existing atlas as a fallback. The source is fixed for each pass. The existing swipe timing and covered reset remain. Current verification is in `.impeccable/review/notes-refinement/verification.md`.

October 1 follow-up: Lucie selected approach B for personal commentary. All eleven personal passages now use a thin gilt frame, dark translucent background, cream copy and a small "Lucie's reflections" label. The intro adds her exact sentence, "Along the way, I've added my own reflections." Quote-linked notes appear after the literary text, driven by the same reversible scroll position. Attributions now have a dash and the approved full names. Phone painting and bird positions account for the measured note height. The 1.65-second foreground bird-wipe restart is implemented using the existing atlas; pointer activation resets under opaque cover, while keyboard and reduced-motion/reading modes return directly. Thirty-one tests and the production build pass. See `.impeccable/review/framed-notes/verification.md`. The 8% flying-bird enlargement remains in place. Public-use rights decisions are still open; no artwork replacement or publishing occurred.

October 1: Lucie's approved personal copy is integrated, including the exact selected closing thought ending in three dots. Quotations have character labels, seven have separate reflections beneath them, and the opening, rain invitation, gallery introduction and closing thought are present. The gallery has artwork titles above and artists below; the colophon has the approved authorship text and expandable artwork credits. A reversible reading-distance mapping adds 20.5 units around the existing camera score. The opening has a disappearing frame and arrow; the flying bird is 8% larger and returns to its original endpoint registration. Phone text and flight positions are adjusted to avoid collisions. The original ten book passages remain unchanged. Rights research is in `docs/rights-review.md`; this is not public-use clearance. No deployment or rights-holder outreach occurred. The requested restart bird wipe remains pending; the current restart still rewinds. Review evidence is in `.impeccable/review/editorial/verification.md`.

The local reconstruction now implements painting → departure → rainy Met entrance → gallery → shop → Vegas → sky → Amsterdam → bridge arch → art gallery → empty frame → original painting. It retains the original environments and all five real gallery artworks. The Met's measured doorway supplies a foreground mask and shared camera move into the shop; a separate empty-perch derivative supports the departure from the original Fabritius panel. Bird frames, path, camera, lighting, and text use one scroll playhead. The bird again uses the previous full-body atlas animation, now with regenerated slimmer anatomy in v4. The original painted bird supplies only the final landing pose. The earlier 33-frame Seedance cycle remains preserved as source material. The empty-frame passage and registered landing are implemented locally; the complete experience is ready for Lucie's review.

On September 15, Lucie authorized substantially reworking the construction while keeping the concept. The priority is a continuous cinematic journey through painted spaces, informed by both Instagram references. Preserve the existing environments wherever possible, discuss concrete replacements, and refine or replace the bird as needed. The return retains the ambiguity of home and tether.

The implementation includes optimized image derivatives, world-readiness gates, and a complete reading view for reduced motion, short phone viewports, or world-image failure. All ten quotation blocks remain unchanged. Geometry tests and the production build pass; desktop 1280×720 and phone 390×844 captures are in `.impeccable/review/`. Updated captures address the departure registration and reading-image sizing findings. Paused compositions and keyboard restart were verified; the reduced-motion fixture preserves all ten quotes and five loaded gallery artworks. Native preference switching, network throttling, and deliberate image failure remain untested. See `.impeccable/review/verification.md` for the scope of this evidence; the whole artwork is not final.

On September 28, Lucie approved a focused departure pass after liking the Met-to-shop passage. The new bird follows the original painting more closely in color and brushwork. Its toes anchor a crouch and push-off, then a forward camera move carries the painting into the museum. The narrower opening layout now separates title, credit and panel. Rain remains an option for a later review; no museum exterior was added.

Follow-up corrections on September 28 register the tail during the folded-wing crouch, restrict open-wing poses to rotation and uniform scale, and add transparent canvas padding. These address the widening, stretched anatomy and cropped wing tips Lucie found while scrolling. Tests now sweep the intermediate poses for distortion and clipping.

Lucie then approved a brief rain → takeoff → wet Met steps → gallery passage. The local study adds a generated exterior plate and a scroll-controlled rain canvas. Rain covers the first wingbeats; the exterior's measured doorway reveals the retained gallery. Four additional scroll units give the approach room without shortening downstream quotation holds or changing the Met-to-shop route. The same corrected bird atlas remains in use.

On September 29, Lucie liked the rainy entrance and approved a focused shop-to-Vegas study. She then approved the scroll movement and selected generated cabinet option 3 to make the foreground read more clearly as furniture. The glass-front cabinet now passes across the camera with both doors, handles and shelves in view. Its central door stile covers the lateral cut into the existing desert image. The bird climbs ahead of the pass. Quotation intervals and scroll duration stay intact; one optimized cabinet asset is added.

Lucie then approved a climb into the dusk sky and descent toward Amsterdam. The sky study reuses the two existing paintings, blends them only while both camera crops contain sky, and reveals the canal before its quotation. Three extra scroll units sit between the Vegas and Amsterdam reading holds. A viewport-sized canvas draws the moving crops at up to 1.5 device-pixel ratio, with no additional artwork or runtime dependency.

Lucie loved the sky passage and approved following the bird beneath Amsterdam's central bridge arch into the art gallery. That local study now uses the existing canal image as a foreground shell with its actual opening traced out. The camera advances through the lit stone into the first Bosschaert painting; the gallery light returns as the bridge clears. The bird emerges beneath the first painting and follows a lower gallery route. Another 3.6 scroll units fit after the Amsterdam quotation; no new image or runtime dependency is added.

On September 29, Lucie approved the bridge passage and authorized finishing the gallery-to-painting return before considering copy or quotation edits. The gallery now has longer stationary viewing intervals, and all five artworks fit within the viewing height. The bird stays below the gallery quotation, then enters the empty frame. Its real opening grows around the visitor, reveals the retained empty-perch plate, and clears before the camera settles back on the complete panel. The bird folds its wings using the registered departure poses in reverse and lands on the same toe anchor. Only then does the original Fabritius image return. Another 4.2 scroll units sit between the final two quotations; wording and reading holds remain unchanged.

Follow-up on September 29: Lucie approved the landing mechanics but found a ghosted bird during the return dissolve and wanted more time before the closing quotation. The final folded pose now samples the bird directly from the original painting with a runtime outline mask. It keeps its proportions and stays opaque while the background restores at scroll 72.26–72.34. A full extra viewport of scrolling delays the closing quotation to 75.3713. The flight path, camera movement, and quotation wording remain unchanged.

A second September 29 follow-up tried the original painted body with separately articulated wings. Lucie rejected that study because of a pale outline, the front-facing head during flight, and the changed motion. At her request, the previous full-body atlas renderer and flight timing are restored. A regenerated v4 atlas narrows the chest and lengthens the tail while retaining the original generated pose sequence and rightward flight. Crops and anatomical landmarks are remeasured for the new image. The earlier original-paint final landing pose, short background handoff, approved paths and cameras, longer closing hold, and all copy remain intact. This new source-art pass is installed locally for review; its prompt and provenance are in `generations/goldfinch-painted-atlas-v4.md`.

Next: Lucie reviews the framed commentary, reading pace and restart wipe. Settle the public-use rights choices and remaining device/loading checks, then prepare the Vercel release. All major passages are implemented locally. Track verification in `docs/final-build.md` and rights in `docs/rights-review.md`. Do not publish without Lucie's explicit request.
