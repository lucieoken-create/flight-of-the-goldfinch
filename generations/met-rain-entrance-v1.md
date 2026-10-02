# Rain and Met entrance study

Created September 28, 2026 with the built-in image generation tool. This is a generated connecting environment, not an original museum photograph or a literal floor-plan reconstruction. The retained gallery is unchanged.

Output: `public/assets/generations/met-rain-entrance-v1.png`, 1672 × 941. Runtime derivative: `public/assets/optimized/met-rain-entrance.jpg`. The original generation is preserved. JPEG conversion uses macOS sips at quality 86.

References: the retained `public/assets/optimized/met.jpg` for paint material and the Met's official Fifth Avenue facade photograph for architecture. The latter was inspected on [the museum's official visit page](https://www.metmuseum.org/plan-your-visit) and saved as a reference-only browser capture in `.impeccable/review/rain-entrance/reference-only-met-facade.png`. It is not shipped as artwork.

## Motion thesis

Rain arrives after the prologue clears. The closer sheet peaks during the crouch and first wingbeats. Wet steps emerge underneath the departing panel; the camera approaches the dark entrance. A measured opening in the foreground stone reveals the existing gallery, whose warmth recovers as the rain falls away. This is a compressed cinematic passage, not a literal route through the Great Hall.

All motion uses the same scroll position. Rain uses deterministic particle positions, without its own clock. One bounded canvas, capped at 480 strokes and 1.5 device-pixel ratio, supplies the weather. Two copies of one entrance image supply the depth and stone shell. No new runtime dependency.

The passage adds four scroll units between the first full flight pose and gallery arrival. `storyTime` preserves the established downstream score, quote holds and Met-to-shop geometry. Original bird pose transforms are untouched.

## Exact built-in tool prompt

Use case: stylized-concept.
Asset type: one wide 16:9 painted environment plate, ideally 2048x1152, for a scroll-controlled cinematic artwork.
Input image 1: existing painted museum gallery, STYLE and COLOR/TEXTURE reference only. Preserve this traditional oil paint material, broken brushwork, muted stone, old varnish and believable architectural perspective in the new exterior.
Input image 2: official photograph of the Metropolitan Museum of Art Fifth Avenue facade, ARCHITECTURE reference only. Depict this specific museum, no library lions, no fantasy castle.
Create a new close, almost frontal but very gently oblique view from near the top of the rain-wet main stairs toward the central museum entrance. Camera at a small bird's flight height, moving slightly upward toward the doorway. Only the upper six broad wet stone treads fill the lower quarter of the image. Monumental paired fluted columns with Corinthian capitals and familiar limestone blocks frame a deep rectangular doorway just right of centre, around 53% across. Above it, a cropped tall arched window and familiar mouldings establish the Met. Building fills the whole frame; no wide plaza or skyline.
The open doorway's inner dark rectangular aperture should occupy approximately x 44%-62%, y 37%-73% of the image. It is the camera destination: unobstructed dark brown-black interior, soft warm amber glow very deep inside, no closed doors, glass, grilles, people or objects crossing this opening. Solid well-defined straight stone jambs on each side of it. Keep verticals nearly vertical, restrained perspective. The final image must work when cropped to its central third for a phone.
Weather and light: overcast rainy late morning, muted blue-grey silver daylight on damp limestone, wet step highlights, subtly warmer darkness within the door. Paint the weather through wet surfaces and distant haze. Falling foreground rain will be animated later, so NO large rain streaks, droplets on lens, fog curtain, or rain graphics baked into this image. No hard sunlight. Match the gallery's soft edge handling and pigment texture, with a cooler exterior palette.
No bird, no people, no signage, no text, no logo, no banner, no watermarks. Full bleed image, no frame. Believable architecture, painterly material with discernible brushwork; not photographic sharpness, glossy 3D, watercolor, charcoal or a flat illustration.
