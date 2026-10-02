import { mkdirSync, statSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const destination = 'public/assets/optimized';
mkdirSync(destination, { recursive: true });
const sources = [
  ['painting', 'goldfinch-painting.jpg', 1800],
  ['painting-empty', 'generations/painting-empty-v1.png', 1800],
  ['met', 'generations/met-v1.png', 1672],
  ['met-rain-entrance', 'generations/met-rain-entrance-v1.png', 1672],
  ['shop', 'generations/shop-calibration-v1.png', 1672],
  ['vegas-day', 'generations/vegas-day-v1.png', 1672],
  ['vegas-night', 'generations/vegas-dusk-v1.png', 1672],
  ['amsterdam', 'generations/amsterdam-calibration-v4.png', 1672],
  ...['bosschaert', 'burton', 'okeeffe-skull', 'monet', 'okeeffe-clouds']
    .map(name => [name, 'art/' + name + '.jpg', 1500]),
];
const manifest = [];
for (const [name, source, size] of sources) {
  const output = destination + '/' + name + '.jpg';
  const input = 'public/assets/' + source;
  execFileSync('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '82', '-Z', String(size), input, '--out', output], { stdio: 'ignore' });
  manifest.push({ output, origin: input, bytes: statSync(output).size });
}
writeFileSync('generations/optimized-assets.json', JSON.stringify(manifest, null, 2) + '\n');
console.log('Prepared ' + manifest.length + ' images: ' + (manifest.reduce((n, x) => n + x.bytes, 0) / 1e6).toFixed(2) + ' MB');
