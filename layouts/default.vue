<template>
	<div class='min-h-screen bg-sepia-100 dark:bg-gray-900 text-sepia-700 dark:text-gray-200 antialiased font-text text-xl sm:text-2xl md:text-3xl leading-relaxed'>
		<Nuxt />
	</div>
</template>

<style>
	html, body {
		width: 100%;
		overflow-x: hidden;
		font-feature-settings: 'liga' 1, 'lnum' 1;
	}
	body {scroll-behavior: smooth}

	.container {
		@apply px-8 max-w-2xl mx-auto
	}
	@screen md { .container { @apply px-16 }}
	@screen lg { .container { @apply px-20 }}
	@screen xl { .container { @apply max-w-3xl }}

	.ignore-margin { @apply -mx-8 }
	@screen md { .ignore-margin { @apply -mx-16 }}
	@screen lg { .ignore-margin { @apply -mx-20 }}

	.caps {
		font-variant-caps: small-caps
	}

	.styled-html {
		& h2, & h3, & h4 {
			@apply font-semibold mt-6
		}

		& p, & ul, & ol, & blockquote, & figure, & hr, & pre {
			& + p, & + ul, & + ol, & + blockquote, & + figure, & + hr, & + pre {
				@apply mt-6
			}
		}

		& pre, & p > code {
			@apply p-1 bg-blackop-20;
			font-size: .8em;
		}
		& pre {
			@apply overflow-scroll
		}
		& em, & strong { @apply font-semibold }
		& li { @apply pt-1 ml-4 }
		& ul li { @apply list-disc }
		& ol li { @apply list-decimal }

		& hr { @apply relative border border-sepia-300 }
		@screen dark { & hr { @apply border-gray-800 }}
	}

	.ignore-margin, .styled-html pre { @apply -mx-8 }
	@screen md { .ignore-margin, .styled-html pre { @apply -mx-16 }}
	@screen lg { .ignore-margin, .styled-html pre { @apply -mx-20 }}
</style>
