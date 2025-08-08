const server = Bun.serve({
    port: process.env.PORT || 3000,
    async fetch(req) {
        const url = new URL(req.url);
        let path = url.pathname;
        
        // Handle BASE_PATH if defined
        const basePath = process.env.BASE_PATH || '';
        if (basePath && path.startsWith(basePath)) {
            path = path.slice(basePath.length);
        }

        try {
            // Liste des extensions pour les fichiers statiques
            const staticFileExtensions = /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot|json|map)$/;

            // Si c'est un fichier statique
            if (path.match(staticFileExtensions)) {
                const filePath = `build${path}`;
                const file = Bun.file(filePath);
                const exists = await file.exists();
                
                if (exists) {
                    return new Response(file);
                }
                // Si le fichier statique n'existe pas, retourner 404
                return new Response('Not Found', { status: 404 });
            }

            // Pour toutes les autres routes, servir index.html (comportement SPA)
            const indexHtml = Bun.file('build/index.html');
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
            console.error('Error serving file:', error);
            return new Response('Server Error', { status: 500 });
        }
    },
});

console.log(`SPA server running on http://localhost:${server.port}`);