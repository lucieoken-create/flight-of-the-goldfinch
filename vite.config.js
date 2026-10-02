import { defineConfig } from 'vite';
import { readFile, readdir, mkdir, copyFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

// Keep source studies locally; ship only media referenced by the application.
export default defineConfig(({ command }) => ({
  publicDir: command === 'build' ? false : 'public',
  plugins: [{
    name: 'copy-used-media',
    apply: 'build',
    async closeBundle() {
      const sources = ['index.html', ...(await readdir('src'))
        .filter(name => /\.(js|css)$/.test(name)).map(name => `src/${name}`)];
      const assets = new Set();
      for (const file of sources) {
        const text = await readFile(file, 'utf8');
        for (const match of text.matchAll(/\/assets\/[\w./-]+/g)) assets.add(match[0]);
      }
      for (const asset of assets) {
        const target = resolve('dist', asset.slice(1));
        await mkdir(dirname(target), { recursive: true });
        await copyFile(resolve('public', asset.slice(1)), target);
      }
      console.log(`Packaged ${assets.size} referenced media files.`);
    },
  }],
}));
