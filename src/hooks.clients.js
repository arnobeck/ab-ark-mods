import { goto } from '$app/navigation';

// Convertit les URLs normales en URLs avec hash
export function handleClientError({ error, event }) {
    const path = event.url.pathname + event.url.search;
    goto('#' + path, { replaceState: true });
}

// Intercepte la navigation pour utiliser le hash
export function handleClient({ event }) {
    const hash = window.location.hash.slice(1);
    if (hash && !event.url.pathname.includes(hash)) {
        goto(hash, { replaceState: true });
    }
}
