// This can be false if you're using a fallback (i.e. SPA mode)
// export const prerender = true;

// export const trailingSlash = 'always';


// Configuration SPA pour SvelteKit 2.0
export const trailingSlash = 'never';  // Nouveau dans SvelteKit 2.0

export const ssr = false;
export const prerender = false;
export const csr = true;

// Ajouter cette fonction pour gérer le hash routing
export function load({ url }) {
    // Si on a un hash, on l'utilise comme chemin
    const hash = typeof window !== 'undefined' ? window.location.hash.slice(1) : '';
    if (hash) {
        return {
            path: hash
        };
    }
    return {
        path: url.pathname
    };
}
