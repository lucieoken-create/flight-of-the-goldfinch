const DECODE_WAIT = 600;

// The opening image can finish (including fail) before JavaScript attaches.
export function createImageLoader() {
  const pending = new Map();
  return function loadImage(image) {
    if (pending.has(image)) return pending.get(image);
    const promise = new Promise(resolve => {
      let settled = false;
      const finish = async () => {
        if (settled) return;
        settled = true;
        image.removeEventListener('load', finish);
        image.removeEventListener('error', finish);
        // Some browsers leave decode() pending for an image that is not yet
        // painted, which held the opening on "Preparing" forever. A loaded
        // image is usable either way, so stop waiting after a moment.
        try { await Promise.race([image.decode(), new Promise(done => setTimeout(done, DECODE_WAIT))]); } catch { /* A failed image has no natural width. */ }
        resolve(image.naturalWidth > 0);
      };
      image.addEventListener('load', finish, { once: true });
      image.addEventListener('error', finish, { once: true });
      if (image.dataset.src) image.src = image.dataset.src;
      if (image.complete && image.getAttribute('src')) finish();
    });
    pending.set(image, promise);
    return promise;
  };
}
