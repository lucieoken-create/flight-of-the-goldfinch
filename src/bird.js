import { ease, mix } from './score.js';
import { PAINTED_REST, PAINTED_REST_OUTLINE, paintedRestPose } from './painted-rest.js';

// Measured alpha bounds and registration landmarks in the generated atlas.
// Crops include the real feather edges; no geometric silhouette or matte is used.
const poses = [
  { rect: [32, 82, 239, 252], foot: [204, 316], head: [231, 120], tail: [38, 327] },
  { rect: [319, 140, 294, 191], foot: [510, 316], head: [576, 177], tail: [325, 315] },
  { rect: [641, 115, 293, 218], foot: [813, 319], head: [891, 197], tail: [657, 326] },
  { rect: [964, 14, 283, 324], foot: [1099, 320], head: [1210, 174], tail: [980, 327] },
  { rect: [32, 347, 279, 295], head: [273, 508], tail: [38, 636] },
  { rect: [342, 383, 284, 258], head: [589, 511] },
  { rect: [644, 445, 290, 197], head: [899, 508] },
  { rect: [948, 452, 299, 189], head: [1211, 509] },
  { rect: [21, 743, 287, 207], head: [267, 775] },
  { rect: [335, 742, 292, 205], head: [584, 775] },
  { rect: [647, 743, 287, 152], head: [893, 775] },
  { rect: [959, 741, 288, 160], head: [1208, 775] },
  { rect: [32, 981, 283, 230], head: [273, 1085] },
  { rect: [348, 945, 291, 269], head: [595, 1087] },
  { rect: [665, 933, 285, 281], head: [910, 1086] },
  { rect: [975, 938, 279, 277], head: [1220, 1087] },
].map(pose => {
  // The new art has a longer body axis. Normalize the complete bird uniformly
  // to the established perch and flight coordinates, without changing anatomy.
  const scale = point => point.map(value => value * .94);
  return { ...pose, source: pose.rect, rect: scale(pose.rect),
    head: scale(pose.head), foot: pose.foot && scale(pose.foot), tail: pose.tail && scale(pose.tail) };
});

export const ATLAS_SOURCE = '/assets/generations/goldfinch-painted-atlas-v4.png';

export const BIRD_SPACE = 384;
export const BIRD_PADDING = 96;
export const BIRD_CANVAS_SIZE = BIRD_SPACE + BIRD_PADDING * 2;
export const PERCH_ANCHOR = [200 / BIRD_SPACE, 292 / BIRD_SPACE];

export function configureBirdCanvas(canvas) {
  canvas.width = canvas.height = BIRD_CANVAS_SIZE;
  // Keep the original scene coordinates and displayed bird size. Only its
  // transparent drawing surface grows, including space above raised wings.
  canvas.style.width = canvas.style.height = BIRD_CANVAS_SIZE / BIRD_SPACE * 100 + '%';
  canvas.style.left = canvas.style.top = -BIRD_PADDING / BIRD_SPACE * 100 + '%';
  return canvas.getContext('2d');
}

export function birdPose(time) {
  const beats = [7.58, 7.95, 8.16, 8.39, 8.56];
  if (time <= beats[0]) return { first: 0, second: 0, blend: 0 };
  if (time < beats.at(-1)) {
    const first = beats.findIndex((end, i) => i < 4 && time < beats[i + 1]);
    return { first, second: first + 1, blend: ease(time, beats[first], beats[first + 1]) };
  }
  const phase = (time - beats.at(-1)) * 12;
  const frame = Math.floor(phase);
  return { first: 4 + frame % 12, second: 4 + (frame + 1) % 12, blend: phase - frame };
}

export function birdFrame(time, usePaintedRest = false) {
  const sequence = usePaintedRest ? [paintedRestPose(), ...poses.slice(1)] : poses;
  const { first, second, blend } = birdPose(time);
  const index = blend < .5 ? first : second;
  const { rect: [x, y, width, height], head, foot, original, source: sourceCrop } = sequence[index];
  const origin = foot || head;
  const anchor = foot ? [200, 292] : [290, 170];
  let matrix = [1, 0, 0, 1, 0, 0];
  if (first < 4) {
    const landmarks = pose => {
      const origin = pose.foot || pose.head;
      const anchor = pose.foot ? [200, 292] : [290, 170];
      const place = point => point.map((v, i) => v - origin[i] + anchor[i]);
      return {
        foot: pose.foot ? anchor : [184, 270],
        head: place(pose.head),
        tail: place(pose.tail),
      };
    };
    const a = landmarks(sequence[first]);
    const b = landmarks(sequence[second]);
    const source = landmarks(sequence[index]);
    const target = {
      foot: a.foot.map((v, i) => mix(v, b.foot[i], blend)),
      head: a.head.map((v, i) => mix(v, b.head[i], blend)),
      tail: a.tail.map((v, i) => mix(v, b.tail[i], blend)),
    };
    if (first === 0 && usePaintedRest) {
      // Keep the actual painted bird proportional as it settles. Its head and
      // toes guide rotation and uniform scale, without shearing the body.
      const sx = source.head[0] - source.foot[0], sy = source.head[1] - source.foot[1];
      const tx = target.head[0] - target.foot[0], ty = target.head[1] - target.foot[1];
      const lengthSquared = sx * sx + sy * sy;
      const c = (tx * sx + ty * sy) / lengthSquared;
      const s = (ty * sx - tx * sy) / lengthSquared;
      matrix = [c, s, -s, c,
        target.foot[0] - c * source.foot[0] + s * source.foot[1],
        target.foot[1] - s * source.foot[0] - c * source.foot[1]];
    } else if (first === 0) {
      // The small closed-wing stance change keeps its perch contact.
      const sh = source.head.map((v, i) => v - source.foot[i]);
      const st = source.tail.map((v, i) => v - source.foot[i]);
      const th = target.head.map((v, i) => v - target.foot[i]);
      const tt = target.tail.map((v, i) => v - target.foot[i]);
      const determinant = sh[0] * st[1] - sh[1] * st[0];
      const xx = (th[0] * st[1] - tt[0] * sh[1]) / determinant;
      const xy = (tt[0] * sh[0] - th[0] * st[0]) / determinant;
      const yx = (th[1] * st[1] - tt[1] * sh[1]) / determinant;
      const yy = (tt[1] * sh[0] - th[1] * st[0]) / determinant;
      matrix = [xx, yx, xy, yy,
        target.foot[0] - xx * source.foot[0] - xy * source.foot[1],
        target.foot[1] - yx * source.foot[0] - yy * source.foot[1]];
    } else {
      // Open wings must retain the source anatomy. Register the body axis
      // with rotation and uniform scale; never shear or stretch a wing.
      const sx = source.head[0] - source.tail[0];
      const sy = source.head[1] - source.tail[1];
      const tx = target.head[0] - target.tail[0];
      const ty = target.head[1] - target.tail[1];
      const lengthSquared = sx * sx + sy * sy;
      const c = (tx * sx + ty * sy) / lengthSquared;
      const s = (ty * sx - tx * sy) / lengthSquared;
      matrix = [c, s, -s, c,
        target.tail[0] - c * source.tail[0] + s * source.tail[1],
        target.tail[1] - s * source.tail[0] - c * source.tail[1]];
    }
  }
  return {
    source: original ? PAINTED_REST.crop : sourceCrop,
    destination: [x - origin[0] + anchor[0], y - origin[1] + anchor[1], width, height],
    matrix,
    original: Boolean(original),
  };
}

let paintedOutline;
export function paintBird(context, atlas, time, painting = null) {
  const { source, destination, matrix, original } = birdFrame(time, Boolean(painting));
  context.clearRect(0, 0, BIRD_CANVAS_SIZE, BIRD_CANVAS_SIZE);
  context.save();
  context.translate(BIRD_PADDING, BIRD_PADDING);
  context.transform(...matrix);
  // One opaque painted pose per frame. The path and takeoff registration move
  // continuously, while the twelve wing poses keep paused silhouettes clean.
  if (original) {
    paintedOutline ||= new Path2D(PAINTED_REST_OUTLINE);
    const scale = destination[2] / source[2];
    context.translate(destination[0] - source[0] * scale, destination[1] - source[1] * scale);
    context.scale(scale, scale);
    context.clip(paintedOutline);
    context.drawImage(painting, 0, 0, PAINTED_REST.width, PAINTED_REST.height);
  } else {
    context.filter = 'saturate(.9) brightness(.96)';
    context.drawImage(atlas, ...source, ...destination);
  }
  context.restore();
}
