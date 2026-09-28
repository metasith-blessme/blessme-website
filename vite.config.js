import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { readFile } from 'node:fs/promises';

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'development-article-bodies',
    configureServer(server) {
      server.middlewares.use('/blog-bodies', async (request, response, next) => {
        const id = request.url?.match(/^\/([a-z0-9-]+)\.json(?:\?.*)?$/)?.[1];
        if (!id) return next();
        try {
          const bodies = JSON.parse(await readFile(`${server.config.root}/src/content/blog-bodies.json`, 'utf8'));
          const data = Object.hasOwn(bodies, id) ? bodies[id] : null;
          response.statusCode = data ? 200 : 404;
          response.setHeader('Content-Type', 'application/json');
          response.setHeader('Cache-Control', 'no-store');
          response.end(JSON.stringify(data));
        } catch (error) { next(error); }
      });
    },
  }],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000,
  },
});
