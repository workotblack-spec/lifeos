import { cp, mkdir, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('public/index.html', 'dist/index.html');
await cp('styles/globals.css', 'dist/styles.css');
await cp('dist-ts/app.js', 'dist/app.js');
await cp('dist-ts/lifeos.js', 'dist/lifeos.js');
console.log('Built static LifeOS app in dist/');
