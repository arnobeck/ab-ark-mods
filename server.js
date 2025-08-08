const server = Bun.serve({
    port: process.env.PORT || 3000,
    fetch(req) {
        const url = new URL(req.url);
        let path = url.pathname;
        
        // Handle BASE_PATH if defined
        const basePath = process.env.BASE_PATH || '';
        if (basePath && path.startsWith(basePath)) {
            path = path.slice(basePath.length);
        }

        try {
            // Pour les assets statiques (js, css, images, etc.)
            if (path.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/)) {
                const file = Bun.file(`build${path}`);
                const exists = await file.exists();
                if (exists) {
                    return new Response(file);
                }
            }

            // Pour tout le reste, on sert index.html (SPA behavior)
            const indexHtml = Bun.file('build/index.html');
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