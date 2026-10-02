import test from 'node:test';
import assert from 'node:assert/strict';
import { restartFrame, RESTART_RESET } from '../src/restart-wipe.js';

test('restart crosses the viewport once and fully conceals the reset on desktop and phone', () => {
  for (const [width, height] of [[1280, 720], [390, 844], [2560, 1440]]) {
    let lastX = -Infinity;
    for (let i = 0; i <= 1000; i++) {
      const frame = restartFrame(i / 1000, width, height);
      assert.ok(frame.x > lastX);
      assert.ok(Object.values(frame).every(Number.isFinite));
      assert.ok(frame.shade >= 0 && frame.shade <= 1);
      lastX = frame.x;
    }
    assert.equal(restartFrame(RESTART_RESET, width, height).shade, 1);
    for (const position of [0, 1]) {
      const frame = restartFrame(position, width, height);
      assert.equal(frame.shade, 0);
      // Include the rotated wings, not just the body's unrotated bounds.
      const radius = frame.width * .62;
      assert.ok(position === 0 ? frame.x + radius < 0 : frame.x - radius > width);
    }
  }
});
