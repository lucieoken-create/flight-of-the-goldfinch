import { cover, ease, mix, storyTime, SKY_INTERVAL } from './score.js';

export const skyPassage = { ...SKY_INTERVAL, climbEnd: 40.1, blendEnd: 41.45 };
// Clear painted sky in the retained plates, away from roofs, trees and hills.
export const skyWindows = {
  vegas: { left: .38, top: .04, right: .72, bottom: .30 },
  amsterdam: { left: .46, top: .07, right: .68, bottom: .30 },
};

function skyCamera(width, height, plane, rect) {
  const scale = Math.max(width / (plane.width * (rect.right - rect.left)),
    height / (plane.height * (rect.bottom - rect.top))) * 1.12;
  return {
    x: (.5 - (rect.left + rect.right) / 2) * plane.width * scale,
    y: (.5 - (rect.top + rect.bottom) / 2) * plane.height * scale,
    scale,
  };
}

export function skyPassageGeometry(width, height, travelTime) {
  const plane = cover(width, height);
  const time = storyTime(travelTime);
  const climb = ease(travelTime, skyPassage.start, skyPassage.climbEnd);
  const descent = ease(travelTime, skyPassage.blendEnd, skyPassage.end);
  const blend = ease(travelTime, skyPassage.climbEnd, skyPassage.blendEnd);
  const drift = width * .06 * (ease(travelTime, skyPassage.start, skyPassage.end) - .5);
  const vegasSky = skyCamera(width, height, plane, skyWindows.vegas);
  const canalSky = skyCamera(width, height, plane, skyWindows.amsterdam);
  return {
    active: travelTime > skyPassage.start && travelTime < skyPassage.end,
    climb, descent, blend,
    vegas: {
      ...plane,
      x: (vegasSky.x + drift) * climb, y: vegasSky.y * climb,
      scale: mix(mix(1.06, 1, ease(time, 29, 35)), vegasSky.scale, climb),
    },
    amsterdam: {
      ...plane,
      x: (canalSky.x + drift) * (1 - descent), y: canalSky.y * (1 - descent),
      scale: mix(canalSky.scale, mix(1.08, 1, ease(time, 35, 40)), descent),
    },
  };
}

// Source rectangle in normalized image coordinates. Drawing just this window
// keeps the sky canvas bounded by the viewport, even during the close sky crop.
export function skySourceWindow(width, height, camera) {
  const fullWidth = camera.width * camera.scale;
  const fullHeight = camera.height * camera.scale;
  return {
    x: .5 - (width / 2 + camera.x) / fullWidth,
    y: .5 - (height / 2 + camera.y) / fullHeight,
    width: width / fullWidth, height: height / fullHeight,
  };
}

export function skyFlightOffset(travelTime) {
  const climb = ease(travelTime, skyPassage.start, skyPassage.climbEnd);
  const descent = ease(travelTime, skyPassage.blendEnd, skyPassage.end);
  const lift = climb * (1 - descent);
  return {
    x: .10 * lift, y: -.25 * lift, scale: 1 - .20 * lift,
    angle: -14 * Math.sin(Math.PI * climb) + 8 * Math.sin(Math.PI * descent),
  };
}

export function paintSkyPassage(context, width, height, state, vegasImage, canalImage) {
  context.clearRect(0, 0, width, height);
  const plate = (image, camera, filter, opacity) => {
    const crop = skySourceWindow(width, height, camera);
    context.save();
    context.globalAlpha = opacity;
    context.filter = filter;
    context.drawImage(image, crop.x * image.naturalWidth, crop.y * image.naturalHeight,
      crop.width * image.naturalWidth, crop.height * image.naturalHeight, 0, 0, width, height);
    context.restore();
  };
  if (state.blend < 1) plate(vegasImage, state.vegas, 'saturate(.87) brightness(.87)', 1);
  if (state.blend > 0) plate(canalImage, state.amsterdam, 'saturate(.83) brightness(.9)', state.blend);
  // Match the existing scene grades at both endpoints. Ground atmosphere
  // leaves the frame during the climb and returns with the canal below.
  const heat = (1 - state.climb) * (1 - state.blend);
  const canal = state.descent * state.blend;
  if (heat > 0) {
    const grade = context.createLinearGradient(0, 0, 0, height);
    grade.addColorStop(0, 'transparent');
    grade.addColorStop(1, `rgba(108,51,21,${33 / 255 * heat})`);
    context.fillStyle = grade;
    context.fillRect(0, 0, width, height);
  }
  if (canal > 0) {
    const grade = context.createLinearGradient(0, 0, 0, height);
    grade.addColorStop(0, 'transparent');
    grade.addColorStop(.5, 'transparent');
    grade.addColorStop(1, `rgba(8,12,20,${66 / 255 * canal})`);
    context.fillStyle = grade;
    context.fillRect(0, 0, width, height);
  }
}
