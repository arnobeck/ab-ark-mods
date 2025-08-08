import { readdir } from 'fs/promises';
import { join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const buildPath = join(process.cwd(), process.env.BUILD_DIR?.replace('./', '') || 'build');

const server = Bun.serve({
    port: process.env.PORT || 3000,
    async fetch(req) {
        const url = new URL(req.url);
        let path = url.pathname;
        
        console.log('Requested path:', path);
        console.log('Build path:', buildPath);
        
        const basePath = process.env.BASE_PATH || '';
        if (basePath && path.startsWith(basePath)) {
            path = path.slice(basePath.length);
        }

        try {
            const staticFileExtensions = /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|map)$/;

            if (path.match(staticFileExtensions)) {
                const filePath = join(buildPath, path);
                console.log('Trying to serve static file:', filePath);
                
                const file = Bun.file(filePath);
                const exists = await file.exists();
                
                if (exists) {
                    console.log('Static file found and served');
                    return new Response(file);
                }
                console.log('Static file not found:', filePath);
                return new Response('Not Found', { status: 404 });
            }

            console.log('Serving index.html for SPA route');
            const indexPath = join(buildPath, 'index.html');
            console.log('Looking for index.html at:', indexPath);
            const indexHtml = Bun.file(indexPath);
            const exists = await indexHtml.exists();

            if (!exists) {
                console.error('index.html not found at:', indexPath);
                // Liste le contenu du répertoire pour le debug
                try {
                    const files = await readdir(buildPath);
                    console.log('Build directory contents:', files);
                } catch (e) {
                    console.error('Could not list build directory:', e);
                }
                return new Response('Server Error: index.html not found', { status: 500 });
            }

            return new Response(indexHtml, {
                headers: {
                    'Content-Type': 'text/html; charset=utf-8'
                }
            });

        } catch (error) {
            console.error('Error serving file:', error, error.stack);
            return new Response('Server Error', { status: 500 });
        }
    },
});

// Debug logs
console.log(`SPA server running on http://localhost:${server.port}`);
console.log('Environment variables:');
console.log('- PORT:', process.env.PORT);
console.log('- BUILD_DIR:', process.env.BUILD_DIR);
console.log('- BASE_PATH:', process.env.BASE_PATH);
console.log('- NODE_ENV:', process.env.NODE_ENV);
console.log('Current working directory:', process.cwd());
console.log('Absolute build directory:', buildPath);
// console.log('Build directory exists:', await Bun.file(buildPath).exists());

// Liste le contenu du répertoire courant pour le debug
try {
    const files = await readdir(process.cwd());
    console.log('Current directory contents:', files);
} catch (e) {
    console.error('Could not list current directory:', e);
}