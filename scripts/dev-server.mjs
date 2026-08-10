import { createReadStream } from 'node:fs';
import { realpath, stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, isAbsolute, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const rootDirectory = resolve(fileURLToPath(new URL('..', import.meta.url)));
const staticDirectories = [resolve(rootDirectory, 'public'), resolve(rootDirectory, 'dist')];

const contentTypes = new Map([
  ['.css', 'text/css; charset=utf-8'],
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml'],
]);

function isInsideDirectory(filePath, directory) {
  const relativePath = relative(directory, filePath);
  return relativePath === '' || (!relativePath.startsWith('..') && !isAbsolute(relativePath));
}

async function resolveExistingStaticFile(requestPath, directories = staticDirectories) {
  const urlPath = decodeURIComponent(new URL(requestPath, 'http://localhost').pathname);
  const relativePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');

  for (const directory of directories) {
    const candidate = resolve(directory, relativePath);

    try {
      const realCandidate = await realpath(candidate);

      if (!isInsideDirectory(realCandidate, directory)) {
        continue;
      }

      const fileStat = await stat(realCandidate);
      if (fileStat.isFile()) {
        return realCandidate;
      }
    } catch {
      continue;
    }
  }

  return null;
}

export async function resolveStaticFile(requestPath, directories = staticDirectories) {
  return resolveExistingStaticFile(requestPath, directories);
}

export async function serveStaticFile(request, response) {
  const filePath = await resolveStaticFile(request.url ?? '/');

  if (!filePath) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }

  response.writeHead(200, {
    'content-type': contentTypes.get(extname(filePath)) ?? 'application/octet-stream',
  });
  createReadStream(filePath).pipe(response);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4173);
  createServer((request, response) => {
    void serveStaticFile(request, response);
  }).listen(port, () => {
    console.log(`LifeOS dev server listening on http://localhost:${port}`);
  });
}
