import { clamp, cover, ease, mix, progress } from './score.js';

// Approved glass-front cabinet. Keep both door faces, their handles and shelves.
// Crop only above and below the solid body; preserve the image's proportions.
export const woodworkSource = {
  x: 0, y: 128, width: 1024, height: 1248, imageWidth: 1024, imageHeight: 1536,
  cutX: 490, backingX: 150, backingWidth: 730,
};
export const shopPassage = { start: 28.35, end: 29.95 };

export function shopPassageGeometry(width, height, time) {
  const { x: sourceX, y: sourceY, width: sourceWidth, height: sourceHeight, imageWidth, imageHeight, cutX, backingX, backingWidth } = woodworkSource;
  const materialScale = Math.max(width * .32 / sourceWidth, (height + 64) / sourceHeight);
  const woodWidth = sourceWidth * materialScale;
  const woodHeight = sourceHeight * materialScale;
  const margin = Math.max(32, width * .035);
  const sweep = progress(time, shopPassage.start, shopPassage.end);
  const x = mix(width + margin, -woodWidth - margin, sweep);
  // The central door stile covers the cut. A backing inside the solid cabinet
  // body closes the source's slight alpha transparency without changing edges.
  const boundary = clamp(x + (cutX - sourceX) * materialScale, 0, width);
  const opening = ease(time, 28.5, 30.15);
  const arrival = ease(time, 29.25, 30.65);
  const plane = cover(width, height);
  return {
    sweep, boundary,
    woodwork: {
      x, y: (height - woodHeight) / 2, width: woodWidth, height: woodHeight,
      imageWidth: imageWidth * materialScale, imageHeight: imageHeight * materialScale,
      imageX: -sourceX * materialScale, imageY: -sourceY * materialScale,
      backingX: (backingX - sourceX) * materialScale, backingWidth: backingWidth * materialScale,
    },
    shop: {
      x: -width * .055 * opening,
      scale: mix(mix(1, 1.08, ease(time, 21.3, 28.6)), 1.22, opening),
    },
    vegas: {
      x: width * .04 * (1 - arrival),
      y: height * .015 * (1 - arrival),
      scale: mix(1.16, mix(1.06, 1, ease(time, 29, 35)), arrival),
      shade: .22 * (1 - ease(time, 28.8, 30.2)),
    },
    plane,
  };
}

// A shallow climb cues the exit, then settles onto the existing Vegas route.
// Offsets and their first derivatives are zero at both boundaries.
export function shopFlightOffset(time) {
  const lift = ease(time, 27.9, 28.65) * (1 - ease(time, 29.25, 30.65));
  return { x: .055 * lift, y: -.075 * lift, scale: 1 - .10 * lift, angle: -6 * lift };
}
