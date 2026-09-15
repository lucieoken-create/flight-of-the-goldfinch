# The goldfinch scrollytelling — project plan

A scroll-driven web experience inspired by Donna Tartt's *The Goldfinch*, featuring quotes from the book and the Fabritius painting's bird traveling through the novel's settings. Built with Claude Code, deployed on Vercel, featured on Lucie's site.

## Locked decisions

- **The bird:** the actual Fabritius painting brought to life. The piece opens and closes on the painting; the painted bird lifts off its perch, travels the scenes, and returns. The chain is a recurring motif.
- **Scenes:** hybrid treatment. AI-generated painterly stills (or short frame sequences) for atmosphere; parallax, light, and transitions done in code.
- **Mobile:** desktop-first with a graceful, simplified mobile version (lighter assets, gentler motion, same text).
- **Quotes:** mostly trimmed to short excerpts; two longer passages (Q10, Q12) in pinned scenes where the reader controls pace. All attributed. (Tartt's prose is under copyright; the painting is public domain — Mauritshuis offers high-res reproductions.)

## Production model — the stage model

The viewport is a fixed stage; scrolling advances a timeline rather than moving a page. Layers back to front: scene backdrops → the bird → quotes as live HTML text.

- **The bird is a persistent overlay layer** ("spider reel" model) that never unmounts. One reusable asset kit: a glide/flap cycle (~12-24 transparent-background frames) plus lift-off, landing, and perched states. Scroll drives position along its path; time drives the wing flap. One asset everywhere = consistency across scenes.
- **Scene transitions happen in code:** stacked stills crossfading opacity while the bird glides above, untouched. Match dissolves are a generation-time decision (aligned compositions), still executed as an opacity fade in code.
- **Continuous "fly-through" moments** ("castle" model: one generated camera move exported as a scrubbed frame sequence) reserved for the hero segment — the final push into the painting. Heavy and unrevisable, so used once.
- **Grey box → asset spec:** the grey-box prototype locks all timing, paths, perch points, scene durations, and transition spans. Each placeholder becomes a precise generation work order; assets drop into named slots; choreography code doesn't change.

## Phases

1. **Storyboard** — done; see docs/storyboard.md.
2. **Art direction** — done; see docs/art-direction.md and design-kit/.
3. **Grey-box prototype** — v1 done (prototype/greybox-v1.html, mechanic proof). v2 next: real six-scene structure, canonical quotes, kit components, Lenis + GSAP ScrollTrigger.
4. **Asset production** — calibration generations first (shop + Amsterdam + bird sheet), then full production to fit the proven mechanic. Outputs land in generations/.
5. **Integrate, polish, ship** — swap placeholders, performance pass (preloading, lazy loading, prefers-reduced-motion fallback, mobile simplification), repo + Vercel deploy.

## Process principles

- Storyboard before design system: narrative drives design decisions.
- Prototype scroll feel before producing final assets.
- Quotes stay as real HTML text, never baked into imagery.
- Long quotes get pinned reading moments; scroll never rushes the reader.
