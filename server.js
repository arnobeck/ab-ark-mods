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

        // Serve static files from the build directory
        try {
            if (path === '/') path = '/index.html';
            const file = Bun.file(`build${path}`);
            const exists = await file.exists();
            
            if (exists) {
                return new Response(file);
            }
            // Fallback to index.html for SPA routing
            return new Response(Bun.file('build/index.html'));
        } catch (error) {
            console.error('Error serving file:', error);
            return new Response('Server Error', { status: 500 });
        }
    },
});

console.log(`Listening on http://localhost:${server.port}`);
