import { BRIDGE_INTERVAL, clamp, cover, ease, mix } from './score.js';
import { skySourceWindow } from './sky-passage.js';

export const bridgePassage = { ...BRIDGE_INTERVAL, clear: 50.65 };
// Inside the central arch of the retained 1672 x 941 canal painting. The
// irregular curve follows the stone's inner lip, leaving the bulbs in front.
export const bridgeArch = {
  start: [594, 650],
  curves: [
    [600, 617, 622, 593, 652, 581],
    [678, 570, 708, 568, 735, 575],
    [770, 583, 800, 612, 810, 651],
  ],
  bottomRight: [810, 657], bottomLeft: [594, 657],
  // Conservative rectangle fully inside the traced opening.
  safe: { left: 654, right: 750, top: 603, bottom: 643 },
};

export function bridgePassageGeometry(width, height, time) {
  const plane = cover(width, height);
  const r = bridgeArch.safe;
  const cx = (r.left + r.right) / 2 / 1672;
  const cy = (r.top + r.bottom) / 2 / 941;
  const finishScale = Math.max(width / (plane.width * (r.right - r.left) / 1672),
    height / (plane.height * (r.bottom - r.top) / 941)) * 1.12;
  const advance = ease(time, bridgePassage.start, bridgePassage.clear);
  const aim = ease(time, bridgePassage.start, 49.0);
  // Reciprocal depth gives a gentle approach followed by the close stone pass.
  const startScale = 1.08 - .08 * ease(39.9, 35, 40);
  const scale = 1 / mix(1 / startScale, 1 / finishScale, advance);
  const camera = {
    ...plane, scale,
    x: clamp((.5 - cx) * plane.width * scale * aim,
      -(plane.width * scale - width) / 2, (plane.width * scale - width) / 2),
    y: clamp((.5 - cy) * plane.height * scale * aim,
      -(plane.height * scale - height) / 2, (plane.height * scale - height) / 2),
  };
  const aperture = {
    x: width / 2 + camera.x + (cx - .5) * plane.width * scale,
    y: height / 2 + camera.y + (cy - .5) * plane.height * scale,
    width: plane.width * (r.right - r.left) / 1672 * scale,
    height: plane.height * (r.bottom - r.top) / 941 * scale,
  };
  const arrival = ease(time, 49.3, bridgePassage.end);
  return {
    active: time > bridgePassage.start && time < bridgePassage.clear,
    camera, aperture, arrival,
    opening: ease(time, 48.15, 49.25),
    canalShade: 1 - ease(time, 47.2, 49.0),
    gallery: {
      x: (aperture.x - width / 2) * (1 - arrival),
      y: (aperture.y - height / 2) * (1 - arrival),
      scale: mix(.72, 1, arrival),
      shade: .97 * (1 - arrival),
    },
    flight: {
      approach: ease(time, bridgePassage.start, 48.4),
      emerge: ease(time, 49.2, bridgePassage.end),
      shade: 1 - .65 * ease(time, 48.0, 48.65) * (1 - arrival),
      behindStone: time >= 48.4 && time < bridgePassage.clear,
      // Keep the artworks and the full gallery quotation clear. Begin rising
      // into the empty frame only after that quotation has finished.
      galleryCruise: ease(time, 49.75, bridgePassage.end) * (1 - ease(time, 66.6, 69.0)),
      clearY: height * .87,
    },
  };
}

export function bridgeFlight(state, x, y, size, angle) {
  const weight = state.flight.approach * (1 - state.flight.emerge);
  return [
    mix(x, state.aperture.x, weight),
    mix(mix(y, state.flight.clearY, state.flight.galleryCruise), state.aperture.y, weight),
    size * mix(1, .64, weight),
    angle - 8 * Math.sin(Math.PI * weight),
  ];
}

export function paintBridgePassage(context, width, height, state, image) {
  context.clearRect(0, 0, width, height);
  const crop = skySourceWindow(width, height, state.camera);
  context.save();
  context.filter = 'saturate(.83) brightness(.9)';
  context.drawImage(image, crop.x * image.naturalWidth, crop.y * image.naturalHeight,
    crop.width * image.naturalWidth, crop.height * image.naturalHeight, 0, 0, width, height);
  context.restore();
  if (state.canalShade > 0) {
    const shade = context.createLinearGradient(0, 0, 0, height);
    shade.addColorStop(0, 'transparent');
    shade.addColorStop(.5, 'transparent');
    shade.addColorStop(1, `rgba(8,12,20,${66 / 255 * state.canalShade})`);
    context.fillStyle = shade;
    context.fillRect(0, 0, width, height);
  }
  // Erase only the measured tunnel. The gallery is behind the real masonry,
  // so no full-screen dissolve overlaps the houses and the first painting.
  if (state.opening > 0) {
    const point = ([x, y]) => [
      width / 2 + state.camera.x + (x / 1672 - .5) * state.camera.width * state.camera.scale,
      height / 2 + state.camera.y + (y / 941 - .5) * state.camera.height * state.camera.scale,
    ];
    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.globalAlpha = state.opening;
    context.fillStyle = '#000';
    context.filter = 'blur(1.25px)';
    context.beginPath();
    context.moveTo(...point(bridgeArch.start));
    for (const curve of bridgeArch.curves) {
      context.bezierCurveTo(...point(curve.slice(0, 2)), ...point(curve.slice(2, 4)), ...point(curve.slice(4)));
    }
    context.lineTo(...point(bridgeArch.bottomRight));
    context.lineTo(...point(bridgeArch.bottomLeft));
    context.closePath();
    context.fill();
    context.restore();
  }
}
