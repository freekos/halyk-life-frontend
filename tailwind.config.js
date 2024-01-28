/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		screens: {
			sm: { max: '375px' },

			md: { max: '475px' },

			lg: { max: '768px' },

			xl: { max: '1024px' },

			'2xl': { min: '1440px' },
		},
		extend: {
			colors: {
				primary: '#00805f',
				secondary: '#fbae16',
				inherit: '#ededed',
			},
		},
	},
	plugins: [],
}
