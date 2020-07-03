<template>
	<div>
		<hr class='border-sepia-200 dark:border-gray-700' />

		<div class="py-2 sm:py-4 md:py-8 flex justify-center items-center">
			<nuxt-link v-if='prev' :to='prev' class="rounded rounded py-2 px-6 md:px-8 bg-white dark:bg-blackop-40">←</nuxt-link>
			<span v-else class="rounded py-2 px-6 md:px-8 dark:bg-blackop-20 text-sepia-500 dark:text-gray-500" >←</span>

			<a class="rounded px-8 text-sepia-700 dark:text-gray-300" href='#toc'>
				<span class='font-bold text-sepia-800 dark:text-white'>{{ currentChapter.index }}</span>/{{ chapters.length }}<span v-if="link"> ▾</span>
			</a>

			<nuxt-link v-if='next' :to='next' class="rounded rounded py-2 px-6 md:px-8 bg-white dark:bg-blackop-40">→</nuxt-link>
			<span v-else class="rounded py-2 px-6 md:px-8 dark:bg-blackop-20 text-sepia-500 dark:text-gray-500" >→</span>
		</div>

		<hr class='border-sepia-200 dark:border-gray-700' />
	</div>
</template>

<script>
export default {
	props: {
		prev: {},
		currentChapter: {},
		next: {},
		chapters: {},
		link: {
			default: false
		},
	}
}
</script>
