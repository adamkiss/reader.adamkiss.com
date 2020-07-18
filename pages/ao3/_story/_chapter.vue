
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

				<ChapterPrevNext
					v-if='!oneshot' link='true'
						:prev='prevChapterLink' :next='nextChapterLink'
						:current-chapter='currentChapter' :chapters='chapters' />
		<div class="h-4 sm:h-6 md:h-8 lg:h-12">&nbsp;</div>

		<article class='container'>
			<h2 class='py-4 text-center font-headline' v-if='!oneshot'>{{ currentChapter.name }}</h2>

			<div class='styled-html' v-html='content'></div>
		</article>

		<div v-if='!oneshot'>
			<div class='py-4 sm:py-6 md:py-8 lg:py-12' id='toc'>
				<ChapterPrevNext
					v-if='!oneshot'
						:prev='prevChapterLink' :next='nextChapterLink'
						:current-chapter='currentChapter' :chapters='chapters' />

			</div>
			<TableOfContents :chapters='chapters' />
		</div>

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
		const chapter = params.chapter

		const data = await $axios.$post('.netlify/functions/get', {provider: 'ao3', story, chapter})
		// const parsed = await $axios.$get(`.netlify/functions/get?provider=ffnet&story=${story}&chapter=${chapter}`)

		// add link for toc
		if (!data.oneshot) {
			data.chapters = data.chapters.map(
				ch => Object.assign(ch, {
					link: `/ao3/${story}/${ch.id}`,
					index: parseInt(ch.index, 10)
				})
			)
			data.currentChapter.index = parseInt(data.currentChapter.index, 10)
		}

		return {
			pageTitle: `${data.title}${data.oneshot ? '' : `, ${data.currentChapter.name}`}`,
			story, chapter, ...data
		}
	},
	computed: {
		prevChapterLink: function() {
			return !this.oneshot && this.currentChapter.index > 1
				? `/ao3/${this.story}/${this.chapters[this.currentChapter.index - 2].id}`
				: false
		},
		nextChapterLink: function() {
			return !this.oneshot && this.currentChapter.index < this.chapters.length
				? `/ao3/${this.story}/${this.chapters[this.currentChapter.index].id}`
				: false
		}
	}
}
</script>
