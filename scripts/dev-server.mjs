import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, join } from 'node:path';

const port = Number(process.env.PORT ?? 3000);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8' };

createServer(async (req, res) => {
  const path = req.url === '/' ? '/index.html' : req.url ?? '/index.html';
  const file = path === '/app.js' || path === '/lifeos.js' ? join('dist-ts', path) : path === '/styles.css' ? 'styles/globals.css' : join('public', path);
  try {
    const content = await readFile(file);
    res.writeHead(200, { 'content-type': types[extname(file)] ?? 'application/octet-stream' });
    res.end(content);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
}).listen(port, () => console.log(`LifeOS running on http://localhost:${port}`));
