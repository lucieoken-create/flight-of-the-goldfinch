#!/usr/bin/env python3
"""Remove a connected white video background while preserving white plumage."""

from pathlib import Path
import argparse

import numpy as np
from PIL import Image, ImageDraw


def matte_frame(
    source: Path,
    destination: Path,
    max_width: int,
    threshold: int,
    all_near_white: bool,
) -> None:
    image = Image.open(source).convert("RGB")

    if image.width > max_width:
        height = round(image.height * max_width / image.width)
        image = image.resize((max_width, height), Image.Resampling.LANCZOS)

    pixels = np.asarray(image)
    distance_from_white = 255 - pixels.min(axis=2)

    if all_near_white:
        connected_background = distance_from_white < threshold
    else:
        near_white = Image.fromarray(
            np.where(distance_from_white < threshold, 255, 0).astype(np.uint8),
            mode="L",
        ).copy()

        for corner in (
            (0, 0),
            (near_white.width - 1, 0),
            (0, near_white.height - 1),
            (near_white.width - 1, near_white.height - 1),
        ):
            ImageDraw.floodfill(near_white, corner, 128, thresh=1)

        connected_background = np.asarray(near_white) == 128
    alpha = np.full(distance_from_white.shape, 255, dtype=np.uint8)
    feather = np.clip(
        (distance_from_white.astype(np.float32) - 2) / max(threshold - 2, 1) * 255,
        0,
        255,
    ).astype(np.uint8)
    alpha[connected_background] = feather[connected_background]

    clean_pixels = pixels.copy()
    partial_edge = connected_background & (alpha > 0) & (alpha < 255)
    edge_alpha = alpha[partial_edge].astype(np.float32)[:, None] / 255
    clean_pixels[partial_edge] = np.clip(
        (pixels[partial_edge].astype(np.float32) - 255 * (1 - edge_alpha)) / edge_alpha,
        0,
        255,
    ).astype(np.uint8)
    clean_pixels[connected_background & (alpha == 0)] = 0

    rgba = Image.fromarray(clean_pixels, mode="RGB").convert("RGBA")
    rgba.putalpha(Image.fromarray(alpha, mode="L"))

    rgba.save(
        destination,
        "WEBP",
        quality=88,
        alpha_quality=95,
        method=6,
        exact=True,
    )


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("source_dir", type=Path)
    parser.add_argument("destination_dir", type=Path)
    parser.add_argument("--max-width", type=int, default=882)
    parser.add_argument("--threshold", type=int, default=48)
    parser.add_argument("--all-near-white", action="store_true")
    args = parser.parse_args()

    args.destination_dir.mkdir(parents=True, exist_ok=True)
    sources = sorted(args.source_dir.glob("frame-*.png"))
    if not sources:
        raise SystemExit(f"No extracted PNG frames in {args.source_dir}")

    for index, source in enumerate(sources):
        destination = args.destination_dir / f"goldfinch-flight-{index:02d}.webp"
        matte_frame(
            source,
            destination,
            args.max_width,
            args.threshold,
            args.all_near_white,
        )

    print(f"Matted {len(sources)} frames to {args.destination_dir}")


if __name__ == "__main__":
    main()
