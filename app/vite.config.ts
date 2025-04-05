import path from 'path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import inject from '@rollup/plugin-inject';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      rollupOptions: {
        plugins: [
          inject({
            Buffer: ['buffer', 'Buffer'],
          }),
        ],
      },
      target: 'esnext',
    },
    base: './',
    define: {
      'process.env.DIALECT_SDK_CREDENTIALS': JSON.stringify((env.DIALECT_SDK_CREDENTIALS)),
    },
  }
})
