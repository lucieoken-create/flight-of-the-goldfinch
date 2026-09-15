# The goldfinch — art direction v1.1

Rendered version: design-kit/style-tile.html (also pinned as an artifact in Lucie's Cowork sidebar). Tokens: design-kit/tokens.css.

## Principle (locked)

Inside the painting the whole time, but scenes keep photographic bones. **~80% painting, 20% real**: real perspective, light behavior and detail under a painted gauze — grain, haze, varnish. "The world inside the panel, filmed on old stock." Test for every asset: pause any frame and you should think painting first, photograph second — but the space should still behave like a place a bird could fly through.

## Palette (sampled programmatically from the Fabritius repro)

night #14100c · panel shadow #4c4032 · umber #645c4f · feather #a0917a · plaster mid #c8bead · plaster #d8d0bf · wing-bar gold #986111 (sampled) · gilt #c9a24b · sealing-wax red #70453c (sampled — chain and rare emphasis only) · canal blue #33445f (from Lucie's blue-hour Amsterdam photos — scene 04 only)

## Type (locked)

- **EB Garamond** 400/500 roman + italic — every Tartt word, display and long passages.
- **Source Serif 4** 400/600 — apparatus: attributions, scene tags, placards, colophon; small, letterspaced, uppercase, museum-placard style.
- All-serif system, no sans (the one modern anachronism the painted world doesn't need). Karma considered and cut. Scale: perfect fourth (1.333), base 18px.

## Gauze recipe

Generations carry the 80%: muted oil color, brushwork only in skies/edges/light, atmospheric haze, warm varnish cast, lifted blacks, craquelure in flat areas, photographic composition. The build carries the 20%: animated film grain (~2.5%), soft vignette, warm CSS filter on scene layers, live HTML type floating crisp in the haze.

## Generation prompts

House-style string and per-scene prompts live in design-kit/style-tile.html (copy-ready). Key rules: the bird sprite is a **European goldfinch (Carduelis carduelis)** — sealing-wax red face, black-and-white head, gold wing bar — painted à la Fabritius on transparent background, consistent size and light across all frames (glide/flap cycle + lift-off, landing, perched). American-goldfinch photos in bird/ are wing-anatomy references only, not plumage. Gallery-finale artworks are composited from art/ files at build time, never generated.

## Reference notes

style/ holds the grade references (film-grain city photography + Van Gogh Amsterdam views). scenes/amsterdam/ includes Lucie's own blue-hour photos — the lit bridge arches reflected in black water are a ready-made composition for the faint-spark beat; keep them in the Amsterdam prompts. Amsterdam refs are summer; night, winter and snow come from the generation prompts and the grade.
