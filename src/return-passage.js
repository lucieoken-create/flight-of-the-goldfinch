import { RETURN_INTERVAL, ease, mix } from './score.js';
import { BIRD_SPACE, PERCH_ANCHOR } from './bird.js';

export const returnPassage = {
  ...RETURN_INTERVAL, threshold: 69.0, cameraSettled: 71.7,
  // This scroll value is a frame-4 wingbeat boundary. Reversing the shared
  // takeoff poses keeps landing continuous with the flight cycle.
  foldStart: 70.56, landed: 72.25, restoreStart: 72.26, restoreEnd: 72.34,
};

export function perchRegistration(panel) {
  const width = panel.height * .223 / 184 * BIRD_SPACE;
  const footX = panel.x + panel.width * .211;
  const footY = panel.y - panel.height * .012;
  return {
    x: footX - (PERCH_ANCHOR[0] - .5) * width,
    y: footY - (PERCH_ANCHOR[1] - .5) * width,
    width, footX, footY,
  };
}

export function returnGeometry(width, height, time, frame) {
  const mobile = width <= 720;
  const innerW = frame.width - 2 * frame.border;
  const innerH = frame.height - 2 * frame.border;
  const finalScale = Math.max(width / innerW, height / innerH) * 1.12;
  const enter = ease(time, returnPassage.start + .15, returnPassage.threshold);
  const frameScale = 1 / mix(1, 1 / finalScale, enter);
  const aperture = { x: width / 2, y: height / 2, width: innerW * frameScale, height: innerH * frameScale };
  const settle = ease(time, returnPassage.threshold + .1, returnPassage.cameraSettled);
  const homeH = Math.min(height * (mobile ? .50 : .76), mobile ? width * 1.05 : width * .85);
  const panelH = mix(aperture.height, homeH, settle);
  const panel = { x: width / 2, y: mix(height / 2, height * .51, settle), width: panelH * 1638 / 2500, height: panelH };
  return {
    active: time >= returnPassage.start,
    frameScale, aperture, panel,
    reveal: ease(time, returnPassage.start + .1, returnPassage.start + .9),
    galleryVisible: time < returnPassage.threshold,
    restore: ease(time, returnPassage.restoreStart, returnPassage.restoreEnd),
    // Keep the original-paint cutout opaque above the plate handoff. Its pixels
    // are already registered, so removing it at the end reveals the same bird.
    birdVisible: time < returnPassage.restoreEnd,
    perch: perchRegistration(panel),
  };
}

export function apertureMask(aperture) {
  const l = aperture.x - aperture.width / 2, r = aperture.x + aperture.width / 2;
  const t = aperture.y - aperture.height / 2, b = aperture.y + aperture.height / 2;
  return `polygon(evenodd, 0 0, 100% 0, 100% 100%, 0 100%, 0 0, ${l}px ${t}px, ${r}px ${t}px, ${r}px ${b}px, ${l}px ${b}px, ${l}px ${t}px)`;
}

export function landingPoseTime(time) {
  if (time < returnPassage.foldStart) return time;
  return mix(8.56, 7.58, ease(time, returnPassage.foldStart, returnPassage.landed));
}

export function returnFlight(state, time, width, height, original) {
  if (!state.active) return original;
  const [ox, oy, ow, oa] = original;
  const enter = ease(time, returnPassage.start, returnPassage.threshold);
  const approach = ease(time, returnPassage.threshold, returnPassage.landed);
  const { perch } = state;
  // The bird first crosses the frame, then follows the retreating camera toward
  // the perch. A shallow arc brings its feet down onto the registered contact.
  const distantWidth = Math.min(width * .10, 114);
  const flyX = mix(ox, width * .46, enter);
  const flyY = mix(oy, height * .40, enter);
  const flyWidth = mix(ow, distantWidth, enter);
  return [
    mix(flyX, perch.x, approach),
    mix(flyY, perch.y, approach) - height * .065 * Math.sin(Math.PI * approach),
    mix(flyWidth, perch.width, approach),
    mix(mix(oa, -6, enter), 0, approach),
  ];
}
