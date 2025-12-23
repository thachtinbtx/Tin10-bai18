import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  return {
    plugins: [react()],
    define: {
      // Map process.env.API_KEY to the Vite environment variable for the Google GenAI SDK
      'process.env.API_KEY': JSON.stringify(env.API_KEY || ''),
    },
    server: {
      host: true
    }
  };
});