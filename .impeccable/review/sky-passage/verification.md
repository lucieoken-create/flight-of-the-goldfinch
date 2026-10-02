# Vegas-to-Amsterdam sky passage

September 29, 2026. Local study of the approved climb-and-descent route.

## Scope

The bird climbs into the retained Vegas dusk sky, crosses into Amsterdam's painted sky, and descends toward the canal. The overlap contains clear sky only; buildings and trees enter on descent. Both original environment images remain intact. No media, dependencies, quote edits, snow or independent animation are added.

The journey runs at scroll 38.5–43.2. Three new scroll units fit inside the existing story gap 34.5–36.2. Each quotation keeps its former physical scroll distance. The playhead now ends at 72.5 and still maps onto the original 0–65.5 story score.

## Checks

- Eighteen tests pass. New geometry checks cover full viewport coverage, proportional source cropping, measured clear-sky overlap, and deterministic reversal. Sizes: 1920×1080, 1280×720, 686×713, 390×844 and 320×568.
- Reading-hold checks sample every quotation after the opening. The inserted time changes only the quotation-free journeys; all holds and the final story coordinate remain intact.
- Production build passes: JS 152.36 kB (58.74 kB gzip), CSS 9.95 kB (3.04 kB gzip). `git diff --check` passes and the design registry parses.
- Desktop 1280×720: climb at scroll 39.297, sky overlap at 40.794, descent at 42.421, arrival at 43.807. The sky crop contains no structures during overlap. On descent, rooftops enter before the canal composition settles. The original Amsterdam layer is restored and its quotation is readable at arrival.
- Forward/reverse returned to scroll 40.794, offset 15,696 and the same bird transform. This is DOM-state evidence of reversal, not a pixel-exact reversal claim. Two paused full-viewport screenshots at that point were byte-identical.
- Phone 390×844: the bird stays visible against the painted sky at scroll 40.794. Rooftops enter during descent at 42.422, and the bridge, reflections and complete quotation are visible at arrival 43.807. The sky canvas is hidden at arrival; the same route uses a narrower source crop with proportional scaling.
- The fresh browser review recorded no console warnings or errors during the desktop and phone passes.

## Rendering and limits

A canvas bounded by the viewport, at up to 1.5 device-pixel ratio, draws only the visible source rectangles. It redraws on a changed resolved scroll position or resize. Both source images must decode before the transition can appear. Existing scene grades are matched at the endpoints; the normal scene layers resume after arrival. The reading alternative retains the same scenes and quotations.

Captures are stored beside this note. This checks representative viewport compositions, pause and reverse behavior. It does not measure physical-device frame rate or certify every browser. Native reduced-motion switching, throttled loading and deliberate image failure were not exercised in this pass. The gallery entrance, return and final whole-artwork review remain open.
