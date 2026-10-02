// Keep the existing physical scroll distance for each reading interval.
export const SCROLL_UNIT_VH = 3714 / 69.5;
export const RETURN_REST_UNITS = 100 / SCROLL_UNIT_VH;
export const SKY_INTERVAL = { start: 38.5, end: 43.2, storyStart: 34.5, storyEnd: 36.2, added: 3 };
export const BRIDGE_INTERVAL = { start: 46.9, end: 51.4, storyStart: 39.9, storyEnd: 40.8, added: 3.6 };
export const RETURN_INTERVAL = { start: 66.6, end: 73.5 + RETURN_REST_UNITS, storyStart: 56, storyEnd: 58.7, added: 4.2 + RETURN_REST_UNITS };
export const END = 80.3 + RETURN_REST_UNITS;
export const clamp = (n, min = 0, max = 1) => Math.min(max, Math.max(min, n));
export const mix = (a, b, p) => a + (b - a) * p;
export const progress = (time, start, end) => clamp((time - start) / (end - start));
export const smooth = (p) => p * p * (3 - 2 * p);
export const ease = (time, start, end) => smooth(progress(time, start, end));
export const visibility = (time, start, end, fade = 0.5) =>
  ease(time, start, start + fade) * (1 - ease(time, end - fade, end));

// Additional travel sits inside quotation-free intervals: four units for the
// rainy entrance, three for the sky, and 3.6 for the bridge. Reading holds stay intact.
export function storyTime(time) {
  if (time <= 8.56) return time;
  if (time < 14.5) return mix(8.56, 10.5, progress(time, 8.56, 14.5));
  if (time <= SKY_INTERVAL.start) return time - 4;
  if (time < SKY_INTERVAL.end) return mix(SKY_INTERVAL.storyStart, SKY_INTERVAL.storyEnd, progress(time, SKY_INTERVAL.start, SKY_INTERVAL.end));
  if (time <= BRIDGE_INTERVAL.start) return time - 7;
  if (time < BRIDGE_INTERVAL.end) return mix(BRIDGE_INTERVAL.storyStart, BRIDGE_INTERVAL.storyEnd, progress(time, BRIDGE_INTERVAL.start, BRIDGE_INTERVAL.end));
  if (time <= RETURN_INTERVAL.start) return time - 10.6;
  if (time < RETURN_INTERVAL.end) return mix(RETURN_INTERVAL.storyStart, RETURN_INTERVAL.storyEnd, progress(time, RETURN_INTERVAL.start, RETURN_INTERVAL.end));
  return time - 10.6 - RETURN_INTERVAL.added;
}

export const quotations = [
  ['q7', 1.4, 3.8], ['q3', 4.0, 7.3],
  ['q1', 10.8, 14.0], ['q2', 14.5, 18.0],
  ['q9', 21.7, 25.5], ['q6', 25.8, 28.4],
  ['q4', 30.0, 34.5], ['q8', 36.2, 39.9],
  ['q10', 52.0, 56.0], ['q12', 58.7, 62.3],
];

// The doorway's aperture, measured in the original 1672 × 941 Met image.
export const doorway = { left: 0.392, top: 0.239, right: 0.531, bottom: 0.701 };

export function cover(width, height, ratio = 1672 / 941) {
  const w = Math.max(width, height * ratio);
  return { width: w, height: w / ratio };
}

export function departureCamera(width, height, time) {
  const advance = ease(time, 8.15, 9.6);
  const scale = mix(1, 1.8, advance);
  // Track a point ahead of the bird. The panel grows past the left shoulder.
  return {
    x: -width * .15 * (scale - 1),
    y: height * .06 * (scale - 1),
    scale,
    opacity: 1 - ease(time, 8.12, 9.55),
  };
}

// Measured inside the generated 1672 x 941 entrance plate. The slightly sloped
// lintel stays in the shell; this inscribed rectangle guarantees full coverage.
export const entranceDoor = { left: .53, top: .36, right: .67, bottom: .739 };

export function entranceGeometry(width, height, time) {
  const plane = cover(width, height);
  const cx = (entranceDoor.left + entranceDoor.right) / 2;
  const cy = (entranceDoor.top + entranceDoor.bottom) / 2;
  const apertureW = plane.width * (entranceDoor.right - entranceDoor.left);
  const apertureH = plane.height * (entranceDoor.bottom - entranceDoor.top);
  const finishScale = Math.max(width / apertureW, height / apertureH) * 1.12;
  const travel = progress(time, 9.4, 14.3);
  const approach = ease(time, 8.1, 10.0);
  const scale = mix(1.12 + .10 * approach, finishScale, travel ** 2.5);
  const aim = ease(time, 9.4, 13.8);
  const initialX = width <= 720 ? width * .06 - (cx - .5) * plane.width * scale : 0;
  const x = mix(initialX, -(cx - .5) * plane.width * scale, aim);
  const y = -(cy - .5) * plane.height * scale * aim;
  return {
    ...plane, x, y, scale,
    aperture: {
      x: width / 2 + x + (cx - .5) * plane.width * scale,
      y: height / 2 + y + (cy - .5) * plane.height * scale,
      width: apertureW * scale,
      height: apertureH * scale,
    },
  };
}

export function portalGeometry(width, height, time) {
  const plane = cover(width, height);
  const p = ease(time, 18.0, 21.3);
  const cx = (doorway.left + doorway.right) / 2;
  const cy = (doorway.top + doorway.bottom) / 2;
  const apertureW = plane.width * (doorway.right - doorway.left);
  const apertureH = plane.height * (doorway.bottom - doorway.top);
  const finishScale = Math.max(width / apertureW, height / apertureH) * 1.12;
  // A camera accelerates into the opening without an end-of-tween brake.
  const travel = progress(time, 18.0, 21.3);
  const scale = mix(1.13, finishScale, travel * travel * (0.7 + 0.3 * travel));
  const x = -(cx - 0.5) * plane.width * scale * p;
  const y = -(cy - 0.5) * plane.height * scale * p;
  return {
    ...plane, x, y, scale,
    aperture: {
      x: width / 2 + x + (cx - 0.5) * plane.width * scale,
      y: height / 2 + y + (cy - 0.5) * plane.height * scale,
      width: apertureW * scale,
      height: apertureH * scale,
    },
  };
}

// Catmull–Rom interpolation keeps travel continuous between the authored poses.
export function samplePath(points, time) {
  if (time <= points[0][0]) return points[0].slice(1);
  const last = points.length - 1;
  if (time >= points[last][0]) return points[last].slice(1);
  let i = 0;
  while (time > points[i + 1][0]) i++;
  const t = progress(time, points[i][0], points[i + 1][0]);
  const a = points[Math.max(0, i - 1)];
  const b = points[i];
  const c = points[i + 1];
  const d = points[Math.min(last, i + 2)];
  return b.slice(1).map((_, k) => {
    const j = k + 1;
    return 0.5 * ((2 * b[j]) + (-a[j] + c[j]) * t +
      (2 * a[j] - 5 * b[j] + 4 * c[j] - d[j]) * t * t +
      (-a[j] + 3 * b[j] - 3 * c[j] + d[j]) * t * t * t);
  });
}

export function galleryPosition(centres, time) {
  const p = progress(time, 40.8, 51.8) * (centres.length - 1);
  const i = Math.min(Math.floor(p), centres.length - 2);
  const local = smooth(clamp((p - i - 0.28) / 0.44));
  return mix(centres[i], centres[i + 1], local);
}
