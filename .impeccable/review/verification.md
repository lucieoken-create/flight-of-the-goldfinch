# First-passage verification

September 15–16, 2026. Local development preview only; no deployment.

- `npm test`: three tests pass. Checks cover doorway fill/centering at four viewport dimensions, all five gallery holds plus the empty frame, deterministic reverse mapping, path endpoints and quotation order.
- `npm run build`: passes after reviewer fixes. Vite output JS 143.00 kB (54.98 kB gzip), CSS 9.01 kB (2.86 kB gzip).
- All ten quotation blocks compare exactly with the baseline; `docs/quotes.md` unchanged.
- Browser checked at 1280×720 and 390×844. First frame, long prologue, departure, Met, doorway passage and return sampled; keyboard return button reaches scroll zero.
- Full-viewport screenshots and bird/camera DOM transforms were identical across a paused interval. A clipped screenshot caused viewport-related resets in the browser tooling; normal viewport captures were used for evidence.
- Reduced-motion behavior checked with a local fixture forcing only the relevant media query. It contains all ten quotes and all five artwork images, which loaded when reached. Native OS preference switching was not exercised.
- Reading images reserve intrinsic dimensions before loading. The image loading strategy is selective by scene, with a visible waiting state and complete reading fallback on failure; network throttling and deliberate request failure were not exercised.
- Browser console checks returned no errors or warnings.
- Detector ran once; gated `data-src` images caused static broken-image warnings. Remaining colors/type findings describe drift from previous design documentation. The documenter updates the approved first passage without claiming new identity or finished later joins.

The screenshot evidence and review verdict concern a working first passage. Flight material/heading, later continuous joins, and final landing choreography still require creative work and review.
