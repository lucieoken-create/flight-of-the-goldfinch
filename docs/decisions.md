# Current decisions

This file reconciles earlier planning documents with Lucie's later feedback. The latest user instruction always wins.

## Experience

- The piece should feel like an artwork.
- It is one uninterrupted smooth-scroll experience, not a series of scenes or chapters.
- A small opening cue may indicate that the visitor should scroll.
- Backward scrolling rewinds.
- Contemplative completion is roughly four minutes, but visitors may move through rapidly.
- Desktop and mobile retain the same narrative length; compositions may be tuned separately.
- No sound in this iteration.
- The closing link returns to the beginning. There is no return-to-Hijinx link.

## Bird

- The bird is one persistent European goldfinch.
- It does not animate autonomously or perform while the visitor is still.
- Its flight must have real movement rather than a three-pose stop-motion effect.
- The selected source is the two-wingbeat Seedance video created on September 10, 2026.
- The current implementation extracts 33 transparent WebP frames and scrubs them with scroll.

## Content

- Working title: **Flight of the Goldfinch**.
- The opening says the experience is inspired by and uses quotations from Donna Tartt's *The Goldfinch*.
- Individual quotations do not repeat “Donna Tartt, The Goldfinch.”
- The existing sequence follows the novel and remains the working sequence.
- Keep the five real artworks in the gallery; do not generate substitutes.
- The gallery needs generous, unobstructed viewing time.
- The empty frame is intentional and acts as the return portal.
- Do not cut or re-trim quotation text without explicit approval.

## Scene corrections already accepted

- Las Vegas carries its quotation through the colorful daytime image and into dusk.
- Amsterdam contains no literal snow and no whiteout.
- Amsterdam atmosphere must not persist over the gallery wall.
- The bridge in Amsterdam reaches the far bank; nearby boats are modern houseboats.

## Hosting

- Deploy on Vercel after the final review.
- No custom domain requirement for this iteration.
- Link the finished piece from `https://hijinx.studio/work#experiments`.
