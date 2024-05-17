export const prerender = false;

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
    return {
        'ArkModList_param': params.modlist,
    };
}
