// import adapter from '@sveltejs/adapter-auto';
// import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-node';
import { redirect, fail } from '@sveltejs/kit';
import adapter from 'svelte-adapter-bun';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		// adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
		// If your environment is not supported or you settled on a specific environment, switch out the adapter.
		// See https://kit.svelte.dev/docs/adapters for more information about adapters.
		// adapter: adapter()

		// adapter: adapter({
		// 	// default options are shown. On some platforms
		// 	// these options are set automatically — see below
		// 	pages: 'build',
		// 	assets: 'build',
		// 	fallback: undefined,
		// 	precompress: false,
		// 	strict: true
		// }),

		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			out: 'build',
			precompress: true,
			envPrefix: ''
		}),
		prerender: {
			handleHttpError: ({ path, referrer, message }) => {
				// ignore deliberate link to shiny 404 page
				if (path === '/not-found') {
					return;
				}
				console.log("path",path)
				if (path === '' || path === '/') {
					redirect(302, 'https://curseforge.com/ark-survival-ascended/');
					return;
				}

				// otherwise fail the build
				// throw new Error(message);
				fail(401, {'error.message': message});
				return;
			}
		},
		static: {
			// cache everything in `static` for 1 hour
			cache: 3600
	  
			// // cache large images for one hour, small images for ten minutes, don't cache anything else
			// cache: ({ filename, size }) => {
			//   if (filename.startsWith('images') {
			// 	return size > 1_000_000 ? 3600 : 600;
			//   }
	  
			//   return 0;
			// }
		}
	}
};

export default config;
