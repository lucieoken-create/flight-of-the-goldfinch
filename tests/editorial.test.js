import test from 'node:test';
import assert from 'node:assert/strict';
import { END, quotations, storyTime } from '../src/score.js';
import { READING_END, readingIntervals, readingState, reflectionReveal, speakers, reflections } from '../src/editorial.js';

test('reading distance is continuous, monotone and exactly reversible across inserted passages', () => {
  let previous = 0;
  const forward = [];
  for (let i = 0; i <= 10000; i++) {
    const t = i / 10000 * READING_END;
    const state = readingState(t);
    assert.ok(state.travel >= previous - 1e-9);
    assert.ok(state.travel - previous < .02, 'no camera jump at a reading boundary');
    previous = state.travel;
    forward.push(state);
  }
  for (let i = 10000; i >= 0; i--) assert.deepEqual(readingState(i / 10000 * READING_END), forward[i]);
  assert.equal(readingState(READING_END).travel, END);
});

test('personal notes enter after the quote is fully visible and keep a readable hold', () => {
  for (const [id, start, end] of quotations.filter(([id]) => reflections[id])) {
    assert.equal(reflectionReveal(start + .5, start), 0, id + ': quote arrives alone');
    assert.equal(reflectionReveal(start + .62, start), 0);
    assert.equal(reflectionReveal(start + .96, start), 1);
    assert.ok(end - .5 - (start + .96) >= .9, id + ': note stays readable before exit');
  }
});

test('standalone reflections do not overlap a book quote and every quote has a speaker', () => {
  for (const slot of readingIntervals.filter(x => x.passage)) {
    const state = readingState((slot.from + slot.to) / 2);
    assert.equal(state.opacity, 1);
    assert.equal(state.travel, slot.start);
    const story = storyTime(state.travel);
    assert.ok(!quotations.some(([, start, end]) => story >= start && story <= end));
  }
  assert.deepEqual(Object.keys(speakers).sort(), quotations.map(([id]) => id).sort());
  assert.equal(Object.keys(reflections).length, 7);
});
