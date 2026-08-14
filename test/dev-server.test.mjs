import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { resolveStaticFile } from '../scripts/dev-server.mjs';

test('resolveStaticFile refuses path traversal outside allowed static directories', async () => {
  const staticDirectory = await mkdtemp(join(tmpdir(), 'lifeos-static-'));
  const secretDirectory = await mkdtemp(join(tmpdir(), 'lifeos-secret-'));
  await writeFile(join(secretDirectory, 'secret.txt'), 'secret');

  const traversal = `/%2e%2e%2f${secretDirectory.split('/').pop()}%2fsecret.txt`;

  assert.equal(await resolveStaticFile(traversal, [staticDirectory]), null);
});

test('resolveStaticFile resolves normal files inside an allowed static directory', async () => {
  const staticDirectory = await mkdtemp(join(tmpdir(), 'lifeos-static-'));
  await writeFile(join(staticDirectory, 'index.html'), '<h1>LifeOS</h1>');

  assert.equal(await resolveStaticFile('/', [staticDirectory]), resolve(staticDirectory, 'index.html'));
});

test('resolveStaticFile falls back to next static directory when first lacks file', async () => {
  const publicDir = await mkdtemp(join(tmpdir(), 'lifeos-public-'));
  const distDir = await mkdtemp(join(tmpdir(), 'lifeos-dist-'));
  await writeFile(join(distDir, 'index.html'), '<h1>Dist</h1>');

  const result = await resolveStaticFile('/', [publicDir, distDir]);
  assert.equal(result, resolve(distDir, 'index.html'));
});

test('resolveStaticFile refuses symlink that points outside allowed directories', async () => {
  const publicDir = await mkdtemp(join(tmpdir(), 'lifeos-public-'));
  const secretDir = await mkdtemp(join(tmpdir(), 'lifeos-secret-'));
  await writeFile(join(secretDir, 'secret.txt'), 'secret');
  // create symlink inside public that points to secret
  await symlink(join(secretDir, 'secret.txt'), join(publicDir, 'leak.txt'));

  const result = await resolveStaticFile('/leak.txt', [publicDir]);
  assert.equal(result, null);
});
