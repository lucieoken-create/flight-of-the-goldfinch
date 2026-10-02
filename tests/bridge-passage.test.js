import test from 'node:test';
import assert from 'node:assert/strict';
import { storyTime, galleryPosition } from '../src/score.js';
import { skySourceWindow } from '../src/sky-passage.js';
import { bridgeArch, bridgePassage, bridgePassageGeometry, bridgeFlight } from '../src/bridge-passage.js';

const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-8, `${a} != ${b}`);

test('bridge travel fits after the canal quotation and preserves every gallery viewing interval', () => {
  near(storyTime(bridgePassage.start), 39.9);
  near(storyTime(bridgePassage.end), 40.8);
  for (let story = 40.8; story <= 56; story += .01) {
    near(storyTime(story + 10.6), story);
    near(galleryPosition([200, 600, 1000, 1400, 1800, 2200], storyTime(story + 10.6)),
      galleryPosition([200, 600, 1000, 1400, 1800, 2200], story));
  }
});

test('bridge camera covers each viewport and the final crop lies fully inside the opening', () => {
  for (const [w, h] of [[1920,1080], [1280,720], [1077,865], [686,713], [390,844], [320,568]]) {
    for (let i = 0; i <= 450; i++) {
      const state = bridgePassageGeometry(w, h, bridgePassage.start + i / 100);
      const crop = skySourceWindow(w, h, state.camera);
      assert.ok(crop.x >= -1e-10 && crop.y >= -1e-10);
      assert.ok(crop.x + crop.width <= 1 + 1e-10 && crop.y + crop.height <= 1 + 1e-10);
      near(crop.width / crop.height * (1672 / 941), w / h);
    }
    const clear = bridgePassageGeometry(w, h, bridgePassage.clear);
    const crop = skySourceWindow(w, h, clear.camera);
    assert.equal(clear.opening, 1);
    assert.ok(crop.x * 1672 >= bridgeArch.safe.left);
    assert.ok((crop.x + crop.width) * 1672 <= bridgeArch.safe.right);
    assert.ok(crop.y * 941 >= bridgeArch.safe.top);
    assert.ok((crop.y + crop.height) * 941 <= bridgeArch.safe.bottom);
    const end = bridgePassageGeometry(w, h, bridgePassage.end);
    near(end.gallery.x, 0);
    near(end.gallery.y, 0);
    near(end.gallery.scale, 1);
    near(end.gallery.shade, 0);
  }
});

test('bridge and bird rewind exactly, keep the artworks clear, and rejoin the return route', () => {
  const times = Array.from({ length: 461 }, (_, i) => 46.85 + i / 100);
  const sample = t => {
    const state = bridgePassageGeometry(1280, 720, t);
    return [state, bridgeFlight(state, 700, 470, 100, -4)];
  };
  assert.deepEqual(times.map(sample), times.map(sample));
  assert.deepEqual(times.map(sample), [...times].reverse().map(sample).reverse());
  for (const t of [0, bridgePassage.start, 69, 80.3]) {
    assert.deepEqual(bridgeFlight(bridgePassageGeometry(1280, 720, t), 700, 470, 100, -4), [700, 470, 100, -4]);
  }
  for (const t of [bridgePassage.end, 55, 60, 64, 66.6]) {
    const bird = bridgeFlight(bridgePassageGeometry(1280, 720, t), 700, 470, 100, -4);
    near(bird[1], 720 * .87);
    near(bird[2], 100);
  }
});
