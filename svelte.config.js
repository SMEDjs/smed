import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';

export default {
	kit: {
		adapter: adapter()
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};
