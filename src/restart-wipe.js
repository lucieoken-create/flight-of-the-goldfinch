import gsap from 'gsap';
import { birdFrame } from './bird.js';
import { ease, mix } from './score.js';

// A single close wing pass. The opaque shadow conceals the actual page reset,
// including the transparent gaps between the bird's source feathers.
export const RESTART_RESET = .52;
export function restartFrame(position, width, height) {
  const span = Math.max(width * 1.45, height * 1.5);
  return {
    x: mix(-span * .7, width + span * .7, position),
    y: mix(height * .66, height * .42, ease(position, 0, 1)),
    width: span * mix(.88, 1, ease(position, .05, .65)),
    angle: mix(-.12, .05, ease(position, 0, 1)),
    shade: ease(position, .18, .43) * (1 - ease(position, .64, .96)),
  };
}

export function createRestartWipe(atlas) {
  const canvas = document.createElement('canvas');
  canvas.className = 'restart-wipe';
  canvas.setAttribute('aria-hidden', 'true');
  document.body.append(canvas);
  const context = canvas.getContext('2d');
  const fallbackSource = birdFrame(8.56).source;
  const closeBird = new Image();
  closeBird.decoding = 'async';
  let load, closeBirdReady = false;
  let birdImage = atlas, source = fallbackSource;
  let animation, finish, reset, resetDone = false;

  function preload() {
    if (!load) {
      closeBird.src = '/assets/generations/goldfinch-restart-v1.png';
      load = closeBird.decode().then(() => { closeBirdReady = true; }).catch(() => {
        // The existing atlas keeps restart available if this optional image fails.
      });
    }
    return load;
  }

  function close() {
    animation?.kill();
    animation = null;
    canvas.classList.remove('is-active');
    delete canvas.dataset.progress;
    context.clearRect(0, 0, canvas.width, canvas.height);
    const complete = finish;
    finish = reset = undefined;
    complete?.();
  }

  function completeReset() {
    if (!resetDone && reset) {
      resetDone = true;
      reset();
    }
  }

  function paint(position) {
    const width = window.innerWidth, height = window.innerHeight;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(width * ratio) || canvas.height !== Math.round(height * ratio)) {
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
    }
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);
    const frame = restartFrame(position, width, height);
    // Even a delayed frame must conceal the reset before revealing the start.
    const shade = !resetDone && position >= RESTART_RESET ? 1 : frame.shade;
    context.fillStyle = 'rgba(20, 16, 12, ' + shade + ')';
    context.fillRect(0, 0, width, height);
    context.save();
    context.translate(frame.x, frame.y);
    context.rotate(frame.angle);
    const birdHeight = frame.width * source[3] / source[2];
    context.imageSmoothingQuality = 'high';
    context.drawImage(birdImage, ...source, -frame.width / 2, -birdHeight / 2, frame.width, birdHeight);
    context.restore();
    canvas.dataset.progress = position.toFixed(3);
    if (position >= RESTART_RESET) completeReset();
  }

  // A hidden tab or a changed motion preference must never leave input locked.
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && animation) { completeReset(); close(); }
  });

  return {
    preload,
    get active() { return Boolean(animation); },
    cancel() { if (animation) { completeReset(); close(); } },
    play(onReset, onComplete) {
      if (animation) return;
      preload();
      // Lock one complete source for the pass, even if decoding finishes midflight.
      birdImage = closeBirdReady ? closeBird : atlas;
      source = closeBirdReady ? [0, 0, closeBird.naturalWidth, closeBird.naturalHeight] : fallbackSource;
      canvas.dataset.source = closeBirdReady ? 'high-resolution' : 'atlas';
      reset = onReset;
      finish = onComplete;
      resetDone = false;
      canvas.classList.add('is-active');
      const playhead = { position: 0 };
      paint(0);
      animation = gsap.to(playhead, {
        position: 1, duration: 1.65, ease: 'none',
        onUpdate: () => paint(playhead.position),
        onComplete: () => { completeReset(); close(); },
      });
    },
  };
}
