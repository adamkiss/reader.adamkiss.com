<template>
	<div class="container">
		<h1>Table <em>of</em> Contents:</h1>
		<ol class='list-none'>
			<li v-for='chapter in chapters' :key='chapter.index' class='ml-6 pt-1'><nuxt-link :to='chapter.link'>
				<b v-if='chapter.current' class='text-bold text-sepia-600 dark:text-gray-600'>{{ chapter.name }}</b>
				<span v-else>{{ chapter.name }}</span>
			</nuxt-link></li>
		</ol>
	</div>
</template>

<script>
export default {
	props: ['chapters']
}
</script>

<style>

</style>
