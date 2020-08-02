/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
const defaultConfig = require('tailwindcss/defaultConfig')

module.exports = {
	theme: {
		colors: {
			black: '#111',
			white: '#fafafa',
			red: 'hsla(7, 61%, 44%, 1.00)', // it's called "well read!"
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
			}
		},
		fontFamily: {
			text: ['alegreya', ...defaultConfig.theme.fontFamily.sans],
			headline: ['alegreya-sc', ...defaultConfig.theme.fontFamily.sans]
		},
		extend: {
			screens: {
				dark: { raw: '(prefers-color-scheme: dark)' }
			},
		}
	},
	variants: {
		opacity: ['responsive', 'hover', 'focus', 'disabled'],
		cursor: ['responsive', 'disabled']
	},
	plugins: [require('tailwindcss-dark-mode')],
	purge: {
		// Learn more on https://tailwindcss.com/docs/controlling-file-size/#removing-unused-css
		enabled: process.env.NODE_ENV === 'production',
		content: [
			'site/*.html',
			'functions/shared/components.js',
			'functions/**/template.js',
		],
		options: {
			whitelistPatterns: [/styled-html/]
		}
	}
}
