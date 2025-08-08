import { join } from 'path';
import { fileURLToPath } from 'url';

// Obtenir le chemin absolu du répertoire courant
const __dirname = fileURLToPath(new URL('.', import.meta.url));
const buildPath = join(__dirname, 'build');

const server = Bun.serve({
    port: process.env.PORT || 3000,
    async fetch(req) {
        const url = new URL(req.url);
        let path = url.pathname;
        
        console.log('Requested path:', path);
        console.log('Build path:', buildPath);
        
        // Handle BASE_PATH if defined
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
                console.log('Static file not found');
                return new Response('Not Found', { status: 404 });
            }

            console.log('Serving index.html for SPA route');
            const indexHtml = Bun.file(join(buildPath, 'index.html'));
            const exists = await indexHtml.exists();

            if (!exists) {
                console.error('index.html not found in build directory');
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

console.log(`SPA server running on http://localhost:${server.port}`);
console.log('Current working directory:', process.cwd());
console.log('Build directory:', buildPath);
console.log('Build directory exists:', await Bun.file(buildPath).exists());