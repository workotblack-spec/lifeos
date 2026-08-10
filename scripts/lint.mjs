import { readFile } from 'node:fs/promises';
import { globby } from './tiny-globby.mjs';

const files = await globby(['src/**/*.ts', 'scripts/**/*.mjs', 'tests/**/*.mjs']);
const failures = [];
for (const file of files) {
  const text = await readFile(file, 'utf8');
  if (text.includes('\t')) failures.push(`${file}: contains tabs`);
  if (/console\.log/.test(text) && !file.startsWith('scripts/')) failures.push(`${file}: unexpected console.log`);
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`Lint passed for ${files.length} files.`);
