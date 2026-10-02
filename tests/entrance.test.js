import test from 'node:test';
import assert from 'node:assert/strict';
import { storyTime, END, RETURN_INTERVAL, entranceGeometry, quotations } from '../src/score.js';
import { rainState, rainDrop } from '../src/rain.js';

test('the added entrance preserves the complete downstream score and reading holds', () => {
  assert.equal(storyTime(0), 0);
  assert.equal(storyTime(8.56), 8.56);
  assert.equal(storyTime(14.5), 10.5);
  assert.ok(Math.abs(storyTime(END) - 65.5) < 1e-10);
  for (const [, start, end] of quotations.slice(2)) {
    const shift = start >= 58.7 ? 10.6 + RETURN_INTERVAL.added : start >= 40.8 ? 10.6 : start >= 36.2 ? 7 : 4;
    assert.ok(Math.abs(storyTime(start + shift) - start) < 1e-10);
    assert.ok(Math.abs(storyTime(end + shift) - end) < 1e-10);
  }
  let previous = -1;
  for (let i = 0; i <= END * 100; i++) {
    const current = storyTime(i / 100);
    assert.ok(current > previous);
    previous = current;
  }
  for (const join of [8.56, 14.5, 38.5, 43.2, 46.9, 51.4, 66.6, RETURN_INTERVAL.end]) {
    assert.ok(storyTime(join + 1e-7) - storyTime(join - 1e-7) < 3e-7);
  }
});

test('the entrance remains finite, covers the screen, and rewinds at each viewport', () => {
  for (const [width, height] of [[1920, 1080], [1280, 720], [686, 713], [390, 844]]) {
    const times = Array.from({ length: 651 }, (_, i) => 8 + i / 100);
    const forward = times.map(time => entranceGeometry(width, height, time));
    const reverse = [...times].reverse().map(time => entranceGeometry(width, height, time)).reverse();
    assert.deepEqual(forward, reverse);
    for (const g of forward) {
      assert.ok(Number.isFinite(g.x + g.y + g.scale));
      // The full plate has no uncovered outside edge during camera travel.
      assert.ok(width / 2 + g.x - g.width * g.scale / 2 <= .01);
      assert.ok(width / 2 + g.x + g.width * g.scale / 2 >= width - .01);
      assert.ok(height / 2 + g.y - g.height * g.scale / 2 <= .01);
      assert.ok(height / 2 + g.y + g.height * g.scale / 2 >= height - .01);
    }
  }
});

test('rain belongs only to the departure and stops and reverses with the scroll', () => {
  for (const t of [0, 5, 7.05, 14.15, 18, 60]) assert.equal(rainState(t).opacity, 0);
  assert.ok(rainState(8.15).curtain > .99);
  assert.ok(rainState(10.2).opacity > .99);
  const times = [7.2, 7.6, 8.2, 9.0, 10.4, 12.0, 13.6];
  const sample = time => Array.from({ length: 480 }, (_, i) => rainDrop(i, 1280, 720, time));
  const forward = times.map(sample);
  assert.deepEqual(forward, times.map(sample));
  assert.deepEqual(forward, [...times].reverse().map(sample).reverse());
});
