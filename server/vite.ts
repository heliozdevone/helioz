import { createServer as createViteServer } from 'vite';

export async function createViteApp(root = process.cwd()) {
  return await createViteServer({
    root,
    server: { middlewareMode: true }
  });
}
