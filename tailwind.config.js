const sansFamilies = [
	'-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', '"Noto Sans"', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'
]
const fontWithSans = font => {
	return [font, ...sansFamilies]
}

/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
	theme: {
		fontFamily: {
			sans: [...sansFamilies],
			text: ['alegreya', ...sansFamilies],
			headline: ['alegreya-sc', ...sansFamilies]
		},
		extend: {
			screens: {
				dark: {raw: '(prefers-color-scheme: dark)'}
			},
			colors: {
				gray: {
					100: '#EDEEEE',
					200: '#D2D3D5',
					300: '#B6B9BC',
					400: '#808589',
					500: '#495057',
					600: '#42484E',
					700: '#2C3034',
					800: '#212427',
					900: '#16181A',
				},
				sepia: {
					100: 'hsla(46, 56%, 91%, 1.00)',
					200: 'hsla(45, 55%, 85%, 1.00)',
					300: 'hsla(45, 60%, 79%, 1.00)',
					400: 'hsla(46, 66%, 73%, 1.00)',
					500: '#B1A16A',
					600: '#9F915F',
					700: '#6A6140',
					800: '#504830',
					900: '#353020',
				},
				blackop: {
					'20': 'rgba(0,0,0,.2)',
					'40': 'rgba(0,0,0,.4)'
				}
			}
		},
		darkSelector: ".dark-mode"
	},
	variants: {
		opacity: ['responsive', 'hover', 'focus', 'disabled'],
		cursor: ['responsive', 'disabled']
	},
	plugins: [],
	purge: {
		// Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
		enabled: process.env.NODE_ENV === 'production',
		content: [
			'components/**/*.vue',
			'layouts/**/*.vue',
			'pages/**/*.vue',
			'plugins/**/*.js',
			'nuxt.config.js'
		]
	},
	corePlugins: {
		textOpacity: false,
		backgroundOpacity: false
	}
}
