import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],

    base: '',
    
    // Optimisations pour Vite 5
    build: {
        // Optimisation du bundle
        target: 'esnext',
        minify: 'esbuild',
        cssMinify: true,
        rollupOptions: {
            output: {
                manualChunks: (id) => {
                    // Sépare les node_modules dans un chunk vendor
                    if (id.includes('node_modules')) {
                        return 'vendor';
                    }
                }
            }
        },
        // Nouvelles options de Vite 5
        modulePreload: {
            polyfill: false // Désactive le polyfill de module preload si non nécessaire
        },
        // Optimisation des assets
        assetsInlineLimit: 4096, // Inline les petits fichiers en base64
        cssCodeSplit: true,
        sourcemap: process.env.NODE_ENV !== 'production'
    },
    
    // Optimisation du serveur de développement
    server: {
        fs: {
            strict: true
        },
        hmr: {
            overlay: true
        }
    },

    // Optimisation pour la production
    preview: {
        port: 3000,
        strictPort: true
    }
});
