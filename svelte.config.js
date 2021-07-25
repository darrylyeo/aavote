import preprocess from 'svelte-preprocess'
import staticAdapter from '@sveltejs/adapter-static'
import houdini from 'houdini-preprocess'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		houdini(),
		preprocess(),
	],

	kit: {
		adapter: staticAdapter(),

		// hydrate the <div id="svelte"> element in src/app.html
		target: '#svelte',

        vite: {
            resolve: {
                alias: {
                    '$houdini': path.resolve('.', '$houdini')
                }
            }
        }
	}
};

export default config;
