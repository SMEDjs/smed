import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: adapter(),
		csrf: {
			checkOrigin: false,
		}
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};
