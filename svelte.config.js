import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		alias: {
			'@api': 'src/routes/api',
			'@auth': 'src/myAuth',
			'@classes': 'src/lib/classes',
			'@client': './src/client',
			'@collections': './src/collections/*',
			'@common': './src/common',
			'@components': './src/lib/components/*',
			'@db': './src/db',
			'$db': './src/db',
			'$lib': './src/lib',
			'$locales': './src/locales',
			'$routes': './src/routes',
			'@root': './',
			'@src': './src/*',
			'@schemas': './src/schemas',
			'@server': './src/server',
			'@static': 'static/',
			'@store': './src/lib/stores/store',
			'@stores3': './src/lib/stores3/*',
			'@stores': './src/lib/stores/*',
			'$styles': './src/styles',
			'@tests': './tests',
			'$ui': './src/lib/components/ui',
			'@ui': './src/lib/components/ui',
			'@utils': './src/utils/*',
			'@types': './src/common/types',
			'@/*': './src/lib/*',
			'@v3config': './src/config',
			'@vyjs': './src/lib/vyjs',
			"$icons/*": "src/lib/components/icons/*"
		},
	}
};

export default config;
