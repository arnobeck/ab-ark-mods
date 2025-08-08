/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    // Ajouter des headers de sécurité
    const response = await resolve(event);
    
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    
    // Log des requêtes côté serveur
    console.log(`[${new Date().toISOString()}] ${event.request.method} ${event.url.pathname}`);
    
    return response;
}

/** @type {import('@sveltejs/kit').HandleServerError} */
export function handleError({ error, event }) {
    console.error('Server error:', error);
    return {
        message: 'Internal Server Error',
        code: error?.code ?? 'UNKNOWN'
    };
}