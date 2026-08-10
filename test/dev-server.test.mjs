import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, symlink, writeFile } from 'node:fs/promises';
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

test('resolveStaticFile falls back to the next allowed directory when the first file is missing', async () => {
  const publicDirectory = await mkdtemp(join(tmpdir(), 'lifeos-public-'));
  const distDirectory = await mkdtemp(join(tmpdir(), 'lifeos-dist-'));
  await writeFile(join(distDirectory, 'index.html'), '<h1>LifeOS</h1>');

  assert.equal(await resolveStaticFile('/', [publicDirectory, distDirectory]), resolve(distDirectory, 'index.html'));
});

test('resolveStaticFile refuses symlinks that resolve outside an allowed directory', async (t) => {
  if (process.platform === 'win32') {
    t.skip('symlink creation may require elevated privileges on Windows');
    return;
  }

  const staticDirectory = await mkdtemp(join(tmpdir(), 'lifeos-static-'));
  const secretDirectory = await mkdtemp(join(tmpdir(), 'lifeos-secret-'));
  const secretFile = join(secretDirectory, 'secret.txt');
  const exposedFile = join(staticDirectory, 'leak.txt');

  await writeFile(secretFile, 'secret');
  await symlink(secretFile, exposedFile);

  assert.equal(await resolveStaticFile('/leak.txt', [staticDirectory]), null);
});
