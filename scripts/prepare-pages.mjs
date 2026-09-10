import { spawn } from 'node:child_process';
import { cp, mkdir, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const repository = 'prueba_saas';
const port = 4173;
const root = process.cwd();
const output = path.resolve(root, 'pages-dist');

if (path.dirname(output) !== root) {
  throw new Error('La salida de Pages debe permanecer dentro del proyecto.');
}

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });

const server = spawn(
  process.execPath,
  [path.join(root, 'node_modules', 'vinext', 'dist', 'cli.js'), 'start', '--port', String(port), '--hostname', '127.0.0.1'],
  {
    cwd: root,
    env: process.env,
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);

server.stdout.on('data', (chunk) => process.stdout.write(chunk));
server.stderr.on('data', (chunk) => process.stderr.write(chunk));

async function renderHome() {
  const url = `http://127.0.0.1:${port}/${repository}/`;
  let lastError;

  for (let attempt = 0; attempt < 50; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return await response.text();
    } catch (error) {
      lastError = error;
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  }

  throw new Error('No se pudo renderizar ' + url + ': ' + String(lastError));
}

try {
  const html = await renderHome();
  const client = path.join(root, 'dist', 'client');

  await Promise.all([
    cp(path.join(client, repository, '_next'), path.join(output, '_next'), { recursive: true }),
    cp(path.join(client, 'images'), path.join(output, 'images'), { recursive: true }),
    cp(path.join(client, 'references'), path.join(output, 'references'), { recursive: true }),
    cp(path.join(client, 'favicon.svg'), path.join(output, 'favicon.svg')),
  ]);

  await Promise.all([
    writeFile(path.join(output, 'index.html'), html, 'utf8'),
    writeFile(path.join(output, '404.html'), html, 'utf8'),
    writeFile(path.join(output, '.nojekyll'), '', 'utf8'),
  ]);

  console.log(`GitHub Pages preparado en ${path.relative(root, output)}/`);
} finally {
  server.kill('SIGTERM');
}
