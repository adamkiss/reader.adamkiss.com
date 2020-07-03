<template>
	<div>
		<header class='px-8 py-4 sm:py-6 md:py-8 lg:py-12 text-center'>
			<h1 class='tracking-wider font-headline text-3xl leading-tight'>{{ parsed.title }}</h1>
			<p class='flex items-center justify-center'><span class='italic text-sepia-500 dark:text-gray-400'>from </span><a class='italic underline' :href='parsed.url' target='_blank'>{{ parsed.domain }}</a><span class='px-2 text-base'>◆</span><nuxt-link class='italic' to='/'>home</nuxt-link></p>
		</header>

		<hr class='border-sepia-200 dark:border-gray-700' />

		<Reader :content="parsed.content" class='py-16' />

		<hr class='border-sepia-200 dark:border-gray-700' />

		<div class="flex justify-center items-center px-8 py-16">
			<nuxt-link to='/'>Back home</nuxt-link><span class='px-4 text-base'>◆</span><a :href='parsed.url' class='underline' target='_blank'>Visit original</a>
		</div>

		<ScrollToTop />
	</div>
</template>

<script>
const isUrlValid = require('~/lib/is-valid-url')

export default {
	middleware: ['validate-url', 'redirect-url'],

	async asyncData({ $axios, params, error }) {
		const parsed = await $axios.$post('.netlify/functions/get', {provider: 'default', url: params.pathMatch})
		// const parsed = await $axios.$get(`.netlify/functions/get?provider=default&url=${params.pathMatch}`)
		return {
			parsed
		}
	}
}
</script>

<style>

</style>
