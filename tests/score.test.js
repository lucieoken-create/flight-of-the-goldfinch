import test from 'node:test';
import assert from 'node:assert/strict';
import { END, quotations, portalGeometry, samplePath, galleryPosition } from '../src/score.js';

test('the measured doorway covers the viewport at the end on desktop and mobile', () => {
  for (const [width, height] of [[1440, 900], [1280, 720], [390, 844], [844, 390]]) {
    const { aperture } = portalGeometry(width, height, 21.3);
    assert.ok(aperture.width >= width);
    assert.ok(aperture.height >= height);
    assert.ok(Math.abs(aperture.x - width / 2) < 0.001);
    assert.ok(Math.abs(aperture.y - height / 2) < 0.001);
  }
});

test('every artwork receives a stable centred interval in either scroll direction', () => {
  const centres = [300, 1200, 1900, 2800, 3600, 4500];
  for (let i = 0; i < centres.length; i++) {
    const time = 40.8 + i / 5 * 11;
    assert.ok(Math.abs(galleryPosition(centres, time) - centres[i]) < 0.001);
  }
  const forward = Array.from({ length: 101 }, (_, i) => galleryPosition(centres, 40.8 + i / 100 * 11));
  const reverse = Array.from({ length: 101 }, (_, i) => galleryPosition(centres, 51.8 - i / 100 * 11)).reverse();
  forward.forEach((x, i) => assert.ok(Math.abs(x - reverse[i]) < 0.001));
});

test('path endpoints and quote order stay deterministic across the full score', () => {
  const points = [[0, 1, 2], [5, 3, 4], [10, 2, 6]];
  assert.deepEqual(samplePath(points, -1), [1, 2]);
  assert.deepEqual(samplePath(points, 5), [3, 4]);
  assert.deepEqual(samplePath(points, 11), [2, 6]);
  assert.deepEqual(quotations.map(q => q[0]), ['q7', 'q3', 'q1', 'q2', 'q9', 'q6', 'q4', 'q8', 'q10', 'q12']);
  quotations.forEach((q, i) => {
    assert.ok(q[1] < q[2] && q[2] < END);
    if (i) assert.ok(q[1] >= quotations[i - 1][2]);
  });
});
