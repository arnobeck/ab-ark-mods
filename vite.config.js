import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    base: process.env.NODE_ENV === 'production' ? process.env.BASE_PATH || '/' : '/',
    // Optimisations pour le build client
    build: {
        rollupOptions: {
            output: {
                manualChunks: undefined
            }
        },
        // Désactive le SSR
        ssr: false
    }
});