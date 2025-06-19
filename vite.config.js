import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        // 👇 Treat .js files as JSX (required for lucide-react)
        '.js': 'jsx',
      },
      // 👇 Specifically include lucide-react
      include: ['lucide-react'],
    },
  },
});
