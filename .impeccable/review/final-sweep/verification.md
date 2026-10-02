# Final design and motion sweep

October 1, 2026. Local review using Impeccable and Emil Kowalski's design engineering skill. Baseline: private GitHub repository `lucieoken-create/flight-of-the-goldfinch`, commit `ba5385a956ca39543e81058e7e968799d4faf2aa`. GitHub main matched the checkout before these edits. This sweep made no commit, push or deployment.

## Design judgment

Keep frame C. Its foliate corners and open gold rails distinguish Lucie's commentary without competing with the paintings. The pale gold italic text and dark backing remain legible in the inspected scenes. The enlarged bird, camera passages and restart wipe belong to the established visual direction. No additional decorative animation is needed.

## Fixes

| Before | After | Why |
| --- | --- | --- |
| Expanded phone credits had 946px of content in a 743px area; wheel input moved the story while the credits stayed at scrollTop 0. | Native nested scrolling reaches scrollTop 203; story position stays 101. | Credits and restart remain reachable. |
| At 320x568, a quote and reflection extended to y=610. | Measured text fit selects the complete reading layout when the cinematic text will not fit. | Preserve the complete prose without clipping. |
| A resize round trip changed reading position 38 to 48.170. | Resize holds the position before the next frame; the same round trip returns to 38.000. | Keep the reader's place. |
| An opening image that failed before listeners attached could leave the loading message indefinitely. | The loader resolves completed failures and selects the reading layout. | Failure has a usable recovery. |

The loading stall was P1. Credits scrolling, clipped text and passage drift were P2. All four reproduced findings are fixed locally.

## Commentary and scrolling

The quotation completes its 12px entrance before the note fades in. Note entrances span approximately 23-51% of a viewport of scrolling; fully visible holds span 140-209% before exit begins. The longest opening reflection has the longest entrance. These are scroll distances, not timers, so visitors choose their reading pace.

Desktop q9: at reading 37.701, quotation opacity was 1 and reflection opacity 0.0002. Scrolling down 0.2 pages reached 38.075 and reflection opacity 0.7549. With scrolling stopped, the reading position, reflection opacity, quotation transform and bird transform remained identical across observations. Scrolling back 0.2 pages returned to 37.701 and opacity 0.0002. The scene remained under scroll control.

Phone q7: scrolling from position 6 by 0.55 pages reached 7.028 with reflection opacity 1. The quote/reflection ended at y=422.7 in an 844px viewport, with no horizontal overflow. The painting remained separate below it. See `phone-commentary.png`.

The existing tests verify continuous reading-distance mapping and exact reverse states across 10,001 samples, delayed commentary entry and readable holds for all seven quote-linked reflections, and no literary quotation overlap with standalone reflections. Timing was retained after review.

## Verification

- 35 tests passed, including four image-loader regression tests. Production build and `git diff --check` passed.
- Build: 169.02kB JavaScript (65.55kB gzip), 13.45kB CSS (3.83kB gzip), 17 referenced media files. The expected SVG runtime-path notice remains; the build copies that asset.
- Desktop 1280x720 checkpoints: departure 17, shop reflection 38, sky 53, Amsterdam 61, gallery 74, return 92. Screenshots saved here.
- Phone 390x844: framed commentary, expanded credits and keyboard restart. Keyboard restart reached position zero without the wipe and focused the opening heading. Pointer restart completed the wipe, returned to zero and released the scroll lock.
- Small phone 320x568: reading layout and no horizontal overflow. Resizing from desktop to this layout and back preserved position 38.000 after the correction.
- Deliberately missing initial painting image: reading layout and error status appeared; all ten literary blocks remained.
- Reduced-motion fixture: all ten quotations and five gallery figures retained. This fixture overrides the media query; it does not validate native OS preference switching.
- Impeccable detector: zero anti-pattern findings; 12 advisory notes for existing palette/type documentation mismatches and a static HTML color observation. The page imports CSS through JavaScript, so the static h1 color observation does not describe its rendered color. No design-system migration was included.

## Scoped audit scores

These are review judgments for the inspected states, not accessibility certification or hardware performance measurements.

| Dimension | Score | Evidence and limit |
| --- | --- | --- |
| Accessibility | 3/4 | Reading alternative, labeled controls and keyboard restart checked; no complete screen-reader or contrast audit. |
| Performance | 3/4 | Optimized media, deferred images and bounded canvas sizes; no device frame-time profiling. |
| Responsive behavior | 3/4 | Three viewport sizes, overflow fixes and resize preservation checked; physical touch devices untested. |
| Theming | 3/4 | Coherent fixed art direction and shared tokens; existing literal colors/type values remain. |
| Implementation integrity | 4/4 | Project-specific visual system, canonical copy, deterministic motion and zero detector anti-patterns. |
| Total | 16/20 | Good within this review's scope. |

Native preference switching, physical phone input and throttled first-load behavior remain untested. These local fixes need Lucie's review and explicit authorization before any push that could deploy production.
