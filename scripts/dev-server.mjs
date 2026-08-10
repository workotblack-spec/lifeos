import { createReadStream } from 'node:fs';
import { stat, realpath } from 'node:fs/promises';
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

export async function resolveStaticFile(requestPath, directories = staticDirectories) {
  const urlPath = decodeURIComponent(new URL(requestPath, 'http://localhost').pathname);
  const relativePath = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');

  for (const directory of directories) {
    try {
      const candidate = resolve(directory, relativePath);
      // Resolve symlinks to prevent serving files that point outside the static directory
      const real = await realpath(candidate);

      if (!isInsideDirectory(real, directory)) {
        continue;
      }

      const st = await stat(real);
      if (!st.isFile()) continue;

      return real;
    } catch (e) {
      // If realpath/stat fail, continue to next directory
      continue;
    }
  }

  return null;
}

export async function serveStaticFile(request, response) {
  const filePath = await resolveStaticFile(request.url ?? '/');

  if (!filePath) {
    response.writeHead(403);
    response.end('Forbidden');
    return;
  }

  try {
    const fileStat = await stat(filePath);

    if (!fileStat.isFile()) {
      response.writeHead(404);
      response.end('Not found');
      return;
    }

    response.writeHead(200, {
      'content-type': contentTypes.get(extname(filePath)) ?? 'application/octet-stream',
    });
    createReadStream(filePath).pipe(response);
  } catch {
    response.writeHead(404);
    response.end('Not found');
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 4173);
  createServer(serveStaticFile).listen(port, () => {
    console.log(`LifeOS dev server listening on http://localhost:${port}`);
  });
}
