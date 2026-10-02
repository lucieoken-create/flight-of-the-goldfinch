import test from 'node:test';
import assert from 'node:assert/strict';
import { storyTime, RETURN_INTERVAL, quotations, END, SCROLL_UNIT_VH } from '../src/score.js';
import { skyPassage, skyPassageGeometry, skySourceWindow, skyWindows, skyFlightOffset } from '../src/sky-passage.js';

test('the extra sky travel occupies only the gap between complete quotation holds', () => {
  assert.equal(storyTime(skyPassage.start), 34.5);
  assert.equal(storyTime(skyPassage.end), 36.2);
  assert.ok(Math.abs(storyTime(END) - 65.5) < 1e-10);
  for (const [, start, end] of quotations.slice(2)) {
    const offset = start >= 58.7 ? 10.6 + RETURN_INTERVAL.added : start >= 40.8 ? 10.6 : start >= 36.2 ? 7 : 4;
    for (let i = 0; i <= 20; i++) {
      const score = start + (end - start) * i / 20;
      assert.ok(Math.abs(storyTime(score + offset) - score) < 1e-10);
    }
  }
  assert.ok(Math.abs(69.5 * SCROLL_UNIT_VH - 3714) < 1e-10);
});

test('both cameras cover the viewport and the overlap contains only measured clear sky', () => {
  for (const [w, h] of [[1920,1080], [1280,720], [686,713], [390,844], [320,568]]) {
    for (let i = 0; i <= 470; i++) {
      const g = skyPassageGeometry(w, h, skyPassage.start + i / 100);
      for (const name of ['vegas', 'amsterdam']) {
        const crop = skySourceWindow(w, h, g[name]);
        assert.ok(crop.x >= -1e-10 && crop.y >= -1e-10);
        assert.ok(crop.x + crop.width <= 1 + 1e-10 && crop.y + crop.height <= 1 + 1e-10);
        assert.ok(Math.abs(crop.width / crop.height * (1672 / 941) - w / h) < 1e-10);
        if (g.blend > 0 && g.blend < 1) {
          const rect = skyWindows[name];
          assert.ok(crop.x >= rect.left && crop.y >= rect.top);
          assert.ok(crop.x + crop.width <= rect.right && crop.y + crop.height <= rect.bottom);
        }
      }
    }
  }
});

test('sky flight stops and rewinds with scroll and settles onto the original route', () => {
  const times = Array.from({length:481}, (_, i) => 38.45 + i / 100);
  const sample = t => [skyPassageGeometry(1280,720,t), skyFlightOffset(t)];
  assert.deepEqual(times.map(sample), [...times].reverse().map(sample).reverse());
  for (const t of [0, skyPassage.start, skyPassage.end, END]) {
    const g = skyFlightOffset(t);
    assert.equal(g.x, 0);
    assert.equal(Math.abs(g.y), 0);
    assert.equal(g.scale, 1);
    assert.ok(Math.abs(g.angle) < 1e-10);
  }
  assert.equal(skyPassageGeometry(1280,720,skyPassage.start).vegas.y, 0);
  assert.equal(skyPassageGeometry(1280,720,skyPassage.end).amsterdam.y, 0);
});
