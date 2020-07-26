
<template>
	<main>
		<header class='px-8 py-4 sm:py-6 md:py-8 lg:py-12 text-center'>
			<h1 class='tracking-wider font-headline text-3xl leading-tight'>{{ title }}</h1>
			<p class='italic'>by {{ author }}</p>

			<div class="flex justify-center items-center text-lg pt-2 sm:pt-4 lg:pt-8" data-turbolinks='false'>
				<a target='_blank' class='underline' :href="url">Original</a>
				<span class='px-4 text-sm'>◆</span>
				<a target='_blank' :href="download"><span class='underline'>Download</span> ⤓</a>
			</div>
		</header>

		<div class="h-4 sm:h-6 md:h-8 lg:h-12">&nbsp;</div>

		<article class='container'>
			<div class='styled-html' v-html='content'></div>
		</article>

		<div class='h-12 sm:h-16 lg:h-20'>&nbsp;</div>

		<ScrollToTop />
	</main>
</template>

<script>
const titleMixin = require('@/lib/title-mixin')

export default {
	mixins: [titleMixin],
	async asyncData({ $axios, params, error }) {
		const story = params.story

		const data = await $axios.$post('.netlify/functions/get', {provider: 'ao3', story})
		// const parsed = await $axios.$get(`.netlify/functions/get?provider=ffnet&story=${story}&chapter=${chapter}`)

		return {
			pageTitle: data.title,
			story, ...data
		}
	}
}
</script>
