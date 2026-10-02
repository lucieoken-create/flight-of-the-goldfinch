# Glass-front cabinet integration

September 29, 2026. Local study using Lucie's selected option 3.

## Change

The shop-to-Vegas foreground now uses the generated glass-front cabinet. The full source width is retained, with the vertical camera crop around the solid body and brass handles. Scale stays proportional. A backing inside the cabinet closes the source's slight transparency; the environment cut tracks its central door stile. Reduced blur and a lighter grade preserve the shelves, books and ceramics.

The optimized 1024 × 1536 WebP is 353,066 bytes. The original generated PNG and exact prompt remain in the project. Scroll duration, quotation timing, bird route offsets and surrounding scene images are unchanged.

## Verification

- Fifteen tests pass. The passage checks now place the cut inside the opaque backing, verify proportional rendering, and keep both brass handles within the vertical viewport crop. Coverage checks include 1920×1080, 1280×720, 686×713, 390×844 and 320×568.
- Production build passes: JS 149.89 kB (57.87 kB gzip), CSS 9.80 kB (3.01 kB gzip).
- Desktop browser at 1280×720, scroll 33.158: both glass doors, paired handles and cabinet contents are visible. The cabinet covers the environment cut while the bird emerges on its right. Two stationary full-viewport PNGs were byte-identical.
- Desktop forward/reverse returned to scroll offset 12,758 and the same resolved time, cabinet transform and shop clip boundary. The forward/reverse check compares DOM state; it does not claim pixel-exact reversal.
- Phone browser at 390×844, scroll 33.160: the close pass fills the phone briefly, with the center seam, both handles and shelves visible. No stretched furniture or exposed environment cut was observed.
- Desktop arrival at scroll 34.655: the foreground is hidden, the desert is unobstructed and the Vegas quotation is readable.
- Phone arrival at scroll 34.657: the foreground is hidden and the Vegas quotation is readable. The fresh review tab recorded no console warnings or errors.
- `git diff --check` passes; the design registry parses.

## Evidence and limits

`desktop-crossing.png`, `desktop-arrival.png`, `phone-crossing.png`, `phone-arrival.png`.

This is a representative viewport review of the selected cabinet pass. Physical-device frame rate, native preference switching and throttled loading are outside this check. The image-loading fallback appeared during live development while the derivative was still being encoded; a reload after encoding restored the cinematic view. The complete journey and later joins still require review.
