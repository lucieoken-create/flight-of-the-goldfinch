# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Portfolio visitors are the audience. Lucie is the creator and final editorial reviewer. Visitors may move quickly or linger; the experience must not force a fixed viewing duration.

## Product Purpose

Create a self-contained visual artwork inspired by *The Goldfinch* that demonstrates Lucie's design and vibe-coding practice. Success means the visitor feels carried through one continuous, emotionally coherent flight rather than reading a conventional case study or navigating a sequence of slides.

## Positioning

The work turns scrolling into the passage of time: one persistent goldfinch connects settings, quotations, and favorite artworks while the visitor controls pace and can rewind by scrolling backward.

## Operating Context

The piece will be deployed on Vercel and linked from `hijinx.studio/work#experiments`. It is a standalone experience without a custom domain requirement. Desktop and mobile contain the same full narrative, with device-specific composition where needed.

## Capabilities and Constraints

- One continuous smooth-scroll timeline; no chapter navigation or progress UI.
- Approximately four minutes at a contemplative pace, while allowing much faster traversal.
- No sound in this iteration.
- The bird's flight frames advance and reverse with scroll and freeze when scrolling stops.
- The closing control returns to the beginning, not to Hijinx.
- Public website and future Substack use are within the October 1 rights review in `docs/rights-review.md`; several permissions and image-source questions remain unresolved.
- Existing stack: Vite, GSAP ScrollTrigger, Lenis, and canvas-rendered frame sequences.

## Brand Commitments

- Working title: **Flight of the Goldfinch**.
- The experience should feel like an artwork.
- Visual principle: approximately 80% painting and 20% reality—real spatial and lighting logic beneath haze, grain, varnish, and painterly atmosphere.
- Literary text uses EB Garamond; apparatus uses Source Serif 4. The experience remains all-serif.
- The bird is a European goldfinch with Fabritius-informed coloring and one continuous identity.

## Evidence on Hand

- Canonical quotations and narrative decisions in `docs/`.
- Original Fabritius painting, five real gallery artworks, and completed generated environments in `public/assets/`.
- Thirty-three transparent bird-flight frames derived from the selected two-wingbeat Seedance video.
- A working responsive implementation with a passing production build.

## Product Principles

1. Let the work behave as art; interface should recede.
2. Let the visitor own time through scrolling and reversible motion.
3. Preserve continuity through one bird, one timeline, and gradual visual transitions.
4. Keep literature and real artworks intact; generation supports the world around them.
5. Prefer deliberate atmosphere over extra controls or effects.

## Accessibility & Inclusion

No formal accessibility target has been set for this experimental artwork. Preserve semantic text, keyboard-operable controls, and the existing reduced-motion fallback where they do not compromise the intended experience.
