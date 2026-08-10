import { readdir } from 'node:fs/promises';
import { join } from 'node:path';

export async function globby(patterns) {
  const roots = [...new Set(patterns.map((pattern) => pattern.split('/')[0]))];
  const files = [];
  for (const root of roots) await walk(root, files);
  return files.filter((file) => patterns.some((pattern) => file.endsWith(pattern.slice(pattern.indexOf('**/') + 3)) || (pattern.includes('*.') && file.endsWith(pattern.slice(pattern.lastIndexOf('*') + 1)))));
}

async function walk(dir, files) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path, files);
    else files.push(path);
  }
}
