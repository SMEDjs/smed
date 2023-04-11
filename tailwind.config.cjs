const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		colors: {
			background: {
				DEFAULT: '#161617',
				light: '#161617'
			},
			primary: {
				DEFAULT: '#ffbb00',
				light: '#edb964'
			},
			secondary: {
				DEFAULT: '#ffffff',
				light: '#9EAAB7'
			},
			dark: {
				DEFAULT: '#000000'
			}
		},
		extend: {}
	},

	plugins: []
};

module.exports = config;
