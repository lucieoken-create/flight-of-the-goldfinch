import test from 'node:test';
import assert from 'node:assert/strict';
import { shopPassageGeometry, shopFlightOffset, shopPassage, woodworkSource } from '../src/shop-passage.js';

test('the environment cut stays covered by painted wood on desktop and phone', () => {
  for (const [w, h] of [[1920, 1080], [1280, 720], [686, 713], [390, 844], [320, 568]]) {
    const first = shopPassageGeometry(w, h, shopPassage.start);
    const last = shopPassageGeometry(w, h, shopPassage.end);
    assert.equal(first.boundary, w);
    assert.equal(last.boundary, 0);
    assert.ok(first.woodwork.x > w + 25);
    assert.ok(last.woodwork.x + last.woodwork.width < -25);
    for (let i = 0; i <= 200; i++) {
      const g = shopPassageGeometry(w, h, shopPassage.start + i / 200 * (shopPassage.end - shopPassage.start));
      const wood = g.woodwork;
      assert.ok(wood.y < -20 && wood.y + wood.height > h + 20);
      if (g.boundary > 0 && g.boundary < w) {
        assert.ok(g.boundary - (wood.x + wood.backingX) > 32);
        assert.ok(wood.x + wood.backingX + wood.backingWidth - g.boundary > 32);
      }
      assert.ok(Math.abs(wood.imageWidth / wood.imageHeight - woodworkSource.imageWidth / woodworkSource.imageHeight) < 1e-10);
      const scale = wood.imageWidth / woodworkSource.imageWidth;
      const visibleTop = (-wood.y - wood.imageY) / scale;
      const visibleBottom = (h - wood.y - wood.imageY) / scale;
      assert.ok(visibleTop >= woodworkSource.y && visibleBottom <= woodworkSource.y + woodworkSource.height);
      // Both brass handles (source y=550..680) stay in the vertical camera crop.
      assert.ok(wood.y + wood.imageY + 550 * scale > 0);
      assert.ok(wood.y + wood.imageY + 680 * scale < h);
    }
  }
});

test('both camera plates cover their viewport throughout the passage', () => {
  for (const [w, h] of [[1920, 1080], [1280, 720], [686, 713], [390, 844]]) {
    for (let i = 0; i <= 250; i++) {
      const g = shopPassageGeometry(w, h, 28.2 + i / 100);
      for (const camera of [g.shop, g.vegas]) {
        const left = w / 2 + camera.x - g.plane.width * camera.scale / 2;
        const right = left + g.plane.width * camera.scale;
        const top = h / 2 + (camera.y || 0) - g.plane.height * camera.scale / 2;
        assert.ok(left <= 0 && right >= w);
        assert.ok(top <= 0 && top + g.plane.height * camera.scale >= h);
      }
    }
  }
});

test('pause and rewind preserve the cut and the bird settles onto its existing route', () => {
  const times = Array.from({ length: 201 }, (_, i) => 27.8 + i / 60);
  const sample = t => [shopPassageGeometry(1280, 720, t), shopFlightOffset(t)];
  assert.deepEqual(times.map(sample), [...times].reverse().map(sample).reverse());
  for (const t of [0, 27.9, 30.65, 60]) {
    const bird = shopFlightOffset(t);
    assert.equal(bird.x, 0);
    assert.equal(Math.abs(bird.y), 0);
    assert.equal(bird.scale, 1);
    assert.equal(Math.abs(bird.angle), 0);
  }
  const before = shopPassageGeometry(1280, 720, 28.35);
  assert.ok(Math.abs(before.shop.scale - 1.08) < .002);
  assert.equal(Math.abs(before.shop.x), 0);
  const settled = shopPassageGeometry(1280, 720, 31);
  assert.equal(settled.vegas.x, 0);
  assert.equal(settled.vegas.y, 0);
  assert.equal(settled.vegas.shade, 0);
});
