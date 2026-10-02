import test from 'node:test';
import assert from 'node:assert/strict';
import { createImageLoader } from '../src/image-loader.js';

class ImageFixture extends EventTarget {
  constructor({complete = false, width = 0, src = '/image.jpg'} = {}) {
    super(); Object.assign(this, {complete, naturalWidth: width, src, dataset: {}});
  }
  getAttribute(name) { return name === 'src' ? this.src : null; }
  async decode() { if (!this.naturalWidth) throw new Error('Image unavailable'); }
}

test('an image that failed before listeners were attached resolves false', async () => {
  const image = new ImageFixture({complete: true});
  assert.equal(await createImageLoader()(image), false);
});

test('a cached valid image resolves without waiting for another load event', async () => {
  assert.equal(await createImageLoader()(new ImageFixture({complete: true, width: 800})), true);
});

test('pending images share one promise and resolve when loading completes', async () => {
  const image = new ImageFixture();
  const load = createImageLoader();
  const first = load(image);
  assert.equal(first, load(image));
  image.naturalWidth = 800;
  image.dispatchEvent(new Event('load'));
  assert.equal(await first, true);
});

test('an error after listeners were attached also resolves false', async () => {
  const image = new ImageFixture();
  const pending = createImageLoader()(image);
  image.dispatchEvent(new Event('error'));
  assert.equal(await pending, false);
});
