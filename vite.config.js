import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
  },
  build: {
    rollupOptions: {
      external: ['react-router-dom'], // Externalize 'react-router-dom' to avoid build issues
    },
  },
});
