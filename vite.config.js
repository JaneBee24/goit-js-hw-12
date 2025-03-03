import { defineConfig } from 'vite';
import { glob } from 'glob';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    root: 'src',
    base: '/goit-js-hw-12/',
    build: {
      sourcemap: true,
      rollupOptions: {
        external: ['izitoast'],
        input: glob.sync('./src/*.html'),
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: chunkInfo => {
            if (chunkInfo.name === 'commonHelpers') {
              return 'commonHelpers.js';
            }
            return '[name].js';
          },
          assetFileNames: assetInfo => {
            if (assetInfo.name && assetInfo.name.endsWith('.html')) {
              return '[name]-[hash].[ext]';
            }
            return 'assets/[name]-[hash][extname]';
          },
        },
      },
      outDir: '../dist',
      emptyOutDir: true,
    },
    plugins: [
      FullReload(['./src/**/**.html']),
      SortCss({
        sort: 'mobile-first',
      }),
      {
        name: 'custom-headers',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            res.setHeader('X-Content-Type-Options', 'nosniff');
            next();
          });
        }
      }
    ],
  };
});
