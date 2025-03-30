// import adapter from '@sveltejs/adapter-auto';
import adapter from '@sveltejs/adapter-static';
// import adapter from '@sveltejs/adapter-node';
import { redirect, fail } from '@sveltejs/kit';
// import adapter from 'svelte-adapter-bun';
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

		// bun
		// adapter: adapter({
		// 	// default options are shown. On some platforms
		// 	// these options are set automatically — see below
		// 	out: 'build',
		// 	precompress: true,
		// 	envPrefix: '',
		// }),

		// static
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: 'index.html',
			precompress: false,
			strict: true
		}),

		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},

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
				} else if (path === '/edit/') {
					redirect(307, '/edit');
					return;
				}

				// otherwise fail the build
				// throw new Error(message);
				fail(401, {'error.message': message});
				return;
			}
		}
	}
};

export default config;
