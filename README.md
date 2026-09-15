# Flight of the Goldfinch

A scroll-driven portfolio artwork inspired by Donna Tartt’s *The Goldfinch*.

This repository is tool-neutral. Codex reads `AGENTS.md`, Claude Code reads `CLAUDE.md`, and both point to the shared `PROJECT.md` so decisions remain synchronized.

## Run locally

On a Mac, double-click `Open Flight of the Goldfinch.command`. It starts the local preview and opens the experience in your browser.

The source `index.html` is part of a Vite project and is not intended to be opened directly as a file; doing so may show source text or a broken page.

For terminal use:

```sh
npm install
npm run dev
```

The current production prototype uses the project’s real quotations, generated environments, responsive composition, and continuous bird path. The quotations match the canonical trims in `docs/quotes.md`; the experience credits the novel once at the opening rather than repeating a byline after every passage.

The first environment calibration is documented in `generations/calibration-v1.md`; its shop and Amsterdam images are currently installed in the live experience.

Production images for the Met and the matched Las Vegas day/dusk transition are documented in `generations/met-vegas-v1.md` and installed in the experience. The real gallery artworks remain composited from the supplied source files.

The persistent bird was generated from the supplied European-goldfinch anatomy and Fabritius painting references. Its 33-frame, two-wingbeat cycle is scrubbed directly by scroll: it advances or reverses with the visitor and freezes when scrolling stops. It never plays autonomously.
