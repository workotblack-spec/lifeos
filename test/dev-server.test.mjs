import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { resolveStaticFile } from '../scripts/dev-server.mjs';

test('resolveStaticFile refuses path traversal outside allowed static directories', async () => {
  const staticDirectory = await mkdtemp(join(tmpdir(), 'lifeos-static-'));
  const secretDirectory = await mkdtemp(join(tmpdir(), 'lifeos-secret-'));
  await writeFile(join(secretDirectory, 'secret.txt'), 'secret');

  const traversal = `/%2e%2e%2f${secretDirectory.split('/').pop()}%2fsecret.txt`;

  assert.equal(resolveStaticFile(traversal, [staticDirectory]), null);
});

test('resolveStaticFile resolves normal files inside an allowed static directory', async () => {
  const staticDirectory = await mkdtemp(join(tmpdir(), 'lifeos-static-'));
  await writeFile(join(staticDirectory, 'index.html'), '<h1>LifeOS</h1>');

  assert.equal(resolveStaticFile('/', [staticDirectory]), resolve(staticDirectory, 'index.html'));
});
