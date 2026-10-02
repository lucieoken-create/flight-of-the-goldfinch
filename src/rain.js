import { ease, mix, visibility } from './score.js';

const fract = n => n - Math.floor(n);
const seed = n => fract(Math.sin(n * 127.1 + 311.7) * 43758.5453);

// Positions are a pure function of scroll. No timer, evolving particle state,
// or random calls: reversing or pausing gives exactly the same sheet of rain.
export function rainState(time) {
  return {
    opacity: ease(time, 7.05, 7.72) * (1 - ease(time, 12.45, 14.15)),
    curtain: visibility(time, 7.25, 9.85, .9),
    drift: time - 7.05,
  };
}

export function rainDrop(index, width, height, time) {
  const depth = index % 3;
  const speed = [.42, .68, 1.02][depth];
  const phase = fract(seed(index + 1) + (time - 7.05) * speed);
  const length = (12 + seed(index + 501) * 30) * (1 + depth * .6);
  return {
    x: fract(seed(index + 101) - (time - 7.05) * speed * .13) * (width + 160) - 80,
    y: phase * (height + 240) - 120,
    length,
    width: [.55, .9, 1.65][depth],
    alpha: [.09, .18, .27][depth] * (.5 + seed(index + 901) * .5),
  };
}

export function paintRain(context, width, height, time) {
  const state = rainState(time);
  context.clearRect(0, 0, width, height);
  if (state.opacity <= .001) return;
  context.save();
  // Thin blue-grey atmosphere ties the paint to the wet limestone. The closer
  // sheet becomes strongest during the first wingbeats, never a white flash.
  context.fillStyle = `rgba(125, 142, 150, ${.06 + state.curtain * .16})`;
  context.fillRect(0, 0, width, height);
  const count = Math.round(Math.min(480, width * height / 2100));
  context.lineCap = 'round';
  for (let i = 0; i < count; i++) {
    const drop = rainDrop(i, width, height, time);
    context.strokeStyle = `rgba(212, 221, 218, ${drop.alpha * mix(.72, 1.65, state.curtain)})`;
    context.lineWidth = drop.width;
    context.beginPath();
    context.moveTo(drop.x, drop.y);
    context.lineTo(drop.x - drop.length * .24, drop.y + drop.length);
    context.stroke();
  }
  // Broad near-camera rain bands soften the painted-to-living handoff. Their
  // edges are optical haze, so the bird stays visible through the sheet.
  if (state.curtain > .001) {
    for (let i = 0; i < 4; i++) {
      const x = (fract(i * .271 - state.drift * .11) * 1.6 - .3) * width;
      const band = context.createLinearGradient(x - width * .14, 0, x + width * .14, height * .14);
      band.addColorStop(0, 'rgba(169, 183, 186, 0)');
      band.addColorStop(.5, `rgba(169, 183, 186, ${state.curtain * .13})`);
      band.addColorStop(1, 'rgba(169, 183, 186, 0)');
      context.fillStyle = band;
      // Paint the full gradient, including its transparent ends. Cropping the
      // fill to the band's nominal width leaves a visible rectangular edge.
      context.fillRect(0, 0, width, height);
    }
  }
  context.restore();
}
