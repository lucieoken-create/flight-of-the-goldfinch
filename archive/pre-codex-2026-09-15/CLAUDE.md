# goldfinch — agent guide

A scroll-driven web experience after Donna Tartt's *The Goldfinch*: the Fabritius bird lifts off its painted perch, travels the novel's settings (the Met, the antique shop, Las Vegas, Amsterdam), and returns to a gallery of loved artworks. Built with Claude Code, deployed on Vercel, featured on Lucie Oken's site. This folder is the project home; any agent picking up work starts here.

## Read these first, in order

1. `docs/plan.md` — process, phases, production model (the stage model)
2. `docs/storyboard.md` — scene-by-scene structure, canonical, decisions locked
3. `docs/art-direction.md` — the 80/20 principle, palette, type, gauze recipe, generation prompts
4. `docs/quotes.md` — canonical quote text and placements (verbatim source of truth)

## Folder map

- `CLAUDE.md` — this guide; keep its status section current
- `docs/` — the four documents above
- `bird/` — Fabritius repro + goldfinch flight/perch photo refs (species note in docs/art-direction.md)
- `art/` — the five gallery-finale works (plus an unused Escher). Composite these actual files at build time; never generate substitutes
- `scenes/met|shop|vegas|amsterdam/` — scene references; `scenes/reference-sheet.html` — curated candidates
- `style/` — film-grain photography + Van Gogh Amsterdam views: the grade/mood references
- `design-kit/` — component cards (open `index.html` for the grid), `style-tile.html`, `tokens.css`
- `prototype/` — `greybox-v1.html`, the annotated scroll-mechanic proof (GSAP ScrollTrigger)
- `generations/` — calibration and final AI-generated assets land here (create subfolders per scene)

## Locked decisions — do not change without Lucie

- Ten quotes, placed per `docs/quotes.md`. Q10 and Q12 are the only long pinned passages. Quotes are always live HTML text, never baked into imagery, always attributed.
- Gallery finale: five works in journey order (Bosschaert → Burton → O'Keeffe skull → Monet → O'Keeffe clouds) then the one empty frame. Escher is out.
- The bird is one persistent overlay layer (never unmounts), a European goldfinch (Carduelis carduelis) painted à la Fabritius. Scroll drives its path; time drives the wing flap.
- Art direction: ~80% painting, 20% real — photographic bones under a painted gauze (haze, grain, varnish). Palette and type live in `design-kit/tokens.css`; fonts are EB Garamond (all Tartt words) and Source Serif 4 (apparatus) only, all-serif, no sans.
- Production model: fixed stage, scenes crossfade in code, at most one scrubbed frame-sequence hero segment (the final push into the painting). Grey-box before final assets, always.
- Desktop-first with graceful simplified mobile; a prefers-reduced-motion fallback is required, not optional.
- The chain motif recurs: prologue (slackens at lift-off), Vegas (chain-link fence), progress thread UI, the close (settles).

## Build stack

Single-page Vite app · GSAP ScrollTrigger · Lenis smooth scroll · canvas for frame-sequence scrubbing · deploy to Vercel. Lazy-load scene imagery; preload one scene ahead; keep the first-paint path lean. Colophon credits the novel, Fabritius/Mauritshuis, every artwork, and image sources.

## Status — September 8, 2026

Done: storyboard locked · art direction locked (style tile + tokens) · component kit v1 (9 cards) · grey-box v1 (mechanic proof).
In progress: Lucie is running calibration generations (shop + Amsterdam prompts + bird sheet from the style tile) → save results to `generations/`.
Next: grey-box v2 — real six-scene structure, canonical quotes, kit components, Lenis + ScrollTrigger — then swap in calibrated assets, polish pass (performance, reduced motion, mobile), repo + Vercel deploy.

## Working agreements for agents

Update the relevant `docs/` file when a decision changes, and this status section when phases move. Ask Lucie before touching: quote text or placement, the gallery lineup, fonts, palette values, or the scene order. Prototype cheap before producing expensive assets. Keep everything attributable: this is a public tribute on a business site.
