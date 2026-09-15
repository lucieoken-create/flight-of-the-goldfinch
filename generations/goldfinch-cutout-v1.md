# Goldfinch cutout v1

Generated with the built-in image generation tool for the persistent foreground bird.

## References

- `bird/steve-harrris-gjTk9N8hYME-unsplash.jpg` — European-goldfinch anatomy and plumage
- `bird/0605_repro.jpg` — Fabritius painting treatment

## Final prompt

Create one complete European goldfinch with wings tucked, seen in a calm three-quarter side profile facing right, isolated on a genuinely transparent background. It should feel like the living bird has stepped out of a seventeenth-century oil painting: anatomically convincing real bird beneath restrained painterly brushwork. Preserve the red face, black-and-white head, warm buff body, black wing with one crisp golden-yellow bar, slim tail, and subtly tucked feet. Use an 80% old-master oil painting and 20% natural photographic treatment with soft feather edges and subtle canvas grain within the bird only. No perch, chain, branch, environment, frame, halo, drop shadow, text, or watermark. Exactly one static, wings-tucked European goldfinch.

## Output

- `public/assets/generations/goldfinch-cutout-v1.png`

## Scroll-scrubbed flight study

The Instagram spider reference uses generated motion segments scrubbed by scroll. This prototype applies the same principle with three genuine-alpha states: tucked, level glide, and downstroke. The sequence runs forward or backward only when scroll position changes and freezes immediately when scrolling stops.

- `public/assets/generations/goldfinch-flight-level-v1.png`
- `public/assets/generations/goldfinch-flight-down-v1.png`

The two flight frames were generated with the built-in image tool from the same identity reference. Rejected attempts that baked a checkerboard into the image were not installed.

### Installed flight prompt

Use the supplied transparent goldfinch as the exact identity, scale, placement, painterly treatment, lighting, and right-facing direction to preserve. Create the requested flight phase of the same European goldfinch: either a level glide with wings extended horizontally and slightly swept back, or a strong downstroke with wings driven diagonally below the body and primary feathers fanned. Keep the body level and the feet tucked. Preserve the same red mask, black-and-white head, buff body, black wings with golden-yellow bars, black tail with white marks, eye, beak, proportions, apparent body size, painterly brushwork, and warm upper-left lighting. Use genuine alpha transparency. Exactly one bird; no checkerboard pixels, environment, solid background, perch, chain, halo, shadow, motion blur, text, or watermark.
