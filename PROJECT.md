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

## Working rules

- User instructions outrank historical planning documents.
- Preserve one uninterrupted scroll experience. Do not add chapters, scene navigation, a progress bar, sound, or a return-to-Hijinx control.
- Backward scrolling rewinds the same timeline.
- The bird moves only in response to scrolling. It never flaps while the visitor is still.
- Keep the full narrative on desktop and mobile, with separately tuned composition where required.
- Credit Donna Tartt and the novel once in the opening. Do not repeat a byline under every quotation.
- Keep quotation wording aligned with `docs/quotes.md`; ask before trimming or rewriting it.
- Composite the five real gallery artworks. Never generate replacements.
- Amsterdam contains no literal snow or whiteout transition.
- The gallery holds long enough to view all five paintings before the empty-frame portal.
- The closing control returns to the beginning of the experience.
- Do not deploy or publish without Lucie's explicit request.

## Current status

Grey-box v2 has become the working production prototype. All six environments and the five real gallery artworks are integrated. The bird uses 33 transparent frames extracted from the stronger two-wingbeat Seedance source video and is scrubbed by scroll in both directions. The current build passes.

Next: capture Lucie's remaining critiques in `docs/final-build.md`, implement the approved final pass, verify desktop and mobile, optimize heavy imagery, and prepare the Vercel deployment.
